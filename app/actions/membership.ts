"use server";

import { connect } from "@/lib/mongodb/connectDB";
import Membership from "@/lib/mongodb/models/Membership";
import Plan from "@/lib/mongodb/models/Plan";
import mongoose, { Types } from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

interface PlanDocument {
  _id: Types.ObjectId;
  name: string;
  duration: string;
  price: number;
  features: string[];
  popular?: boolean;
  status: string;
}

interface MembershipDocument {
  _id: Types.ObjectId;
  userId: string;
  planId: Types.ObjectId;
  planName: string;
  price: number;
  features: string[];
  startDate: Date;
  endDate: Date;
  status: string;
  paymentStatus: string;
  renewedFrom?: Types.ObjectId;
}

interface SerializedMembership {
  _id: string;
  userId: string;
  planId: string;
  planName: string;
  price: number;
  features: string[];
  startDate: string;
  endDate: string;
  status: string;
  paymentStatus: string;
  renewedFrom?: string;
}

// Helper function to serialize MongoDB document
const serializeMembership = (membership: any) => {
  if (!membership) return null;

  const membershipObj = membership.toJSON ? membership.toJSON() : membership;

  // Create base serialized object
  const serialized: any = {
    ...membershipObj,
    _id: membershipObj._id.toString(),
    createdAt: membershipObj.createdAt
      ? new Date(membershipObj.createdAt).toISOString()
      : undefined,
    updatedAt: membershipObj.updatedAt
      ? new Date(membershipObj.updatedAt).toISOString()
      : undefined,
  };

  // Handle planId - could be string, ObjectId, or populated object
  if (membershipObj.planId) {
    if (typeof membershipObj.planId === "object" && membershipObj.planId._id) {
      serialized.planId = membershipObj.planId._id.toString();
      // Include plan details if populated
      serialized.plan = {
        name: membershipObj.planId.name,
        duration: membershipObj.planId.duration,
      };
    } else {
      serialized.planId = membershipObj.planId.toString();
    }
  }

  // Handle userId - could be string or populated object
  if (membershipObj.userId) {
    if (typeof membershipObj.userId === "object" && membershipObj.userId._id) {
      serialized.userId = membershipObj.userId._id.toString();
      // Include user details if populated
      serialized.user = {
        firstName: membershipObj.userId.firstName,
        lastName: membershipObj.userId.lastName,
        email: membershipObj.userId.email,
      };
    } else {
      serialized.userId = membershipObj.userId.toString();
    }
  }

  // If we have user data from our manual enhancement, keep it
  if (membershipObj.user) {
    serialized.user = membershipObj.user;
  }

  return serialized;
};

// Function to check if user has an active membership for a plan
export async function checkMembership(userId: string, planId: string) {
  try {
    await connect();
    const membership = await Membership.findOne({
      userId,
      planId,
      status: "active",
    });
    return serializeMembership(membership);
  } catch (error) {
    console.error("Error checking membership:", error);
    return null;
  }
}

// Function to update/renew membership
export async function updateMembership(
  existingMembership: MembershipDocument,
  selectedPlan: PlanDocument
) {
  const startDate = new Date();
  const endDate = new Date();

  switch (selectedPlan.duration) {
    case "month":
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case "3 months":
      endDate.setMonth(endDate.getMonth() + 3);
      break;
    case "6 months":
      endDate.setMonth(endDate.getMonth() + 6);
      break;
    case "year":
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    default:
      throw new Error("Invalid duration");
  }

  try {
    // Update the existing membership
    const updatedMembership = (await Membership.findByIdAndUpdate(
      existingMembership._id,
      {
        planId: selectedPlan._id,
        planName: selectedPlan.name,
        price: selectedPlan.price,
        features: selectedPlan.features,
        startDate,
        endDate,
        status: "active",
        paymentStatus: "pending",
      },
      { new: true }
    ).lean()) as unknown as MembershipDocument;

    if (!updatedMembership) {
      throw new Error("Failed to update membership");
    }

    return updatedMembership;
  } catch (error) {
    console.error("Error updating membership:", error);
    throw error;
  }
}

export async function registerMembership(planId: string) {
  await connect();

  // Get the authenticated user's ID from Clerk
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      error: "User not authenticated",
    };
  }

  try {
    // Find the plan in the database
    const selectedPlan = (await Plan.findById(
      planId
    ).lean()) as PlanDocument | null;
    if (!selectedPlan) {
      return {
        success: false,
        error: "Invalid plan selected",
      };
    }

    // Check if user already has an active membership for this plan
    const existingMembership = await checkMembership(userId, planId);

    let membership: MembershipDocument;

    if (existingMembership) {
      // If there's an active membership, update/renew it
      membership = await updateMembership(existingMembership, selectedPlan);
    } else {
      // Create new membership if no active one exists
      const endDate = new Date();
      switch (selectedPlan.duration) {
        case "month":
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case "3 months":
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case "6 months":
          endDate.setMonth(endDate.getMonth() + 6);
          break;
        case "year":
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
        default:
          return {
            success: false,
            error: "Invalid duration",
          };
      }

      membership = (await Membership.create({
        userId,
        planId: selectedPlan._id,
        planName: selectedPlan.name,
        price: selectedPlan.price,
        features: selectedPlan.features,
        startDate: new Date(),
        endDate,
        status: "active",
        paymentStatus: "pending",
      })) as MembershipDocument;
    }

    // Return a plain object
    return {
      success: true,
      membership: {
        _id: membership._id.toString(),
        userId: membership.userId,
        planId: membership.planId.toString(),
        planName: membership.planName,
        price: membership.price,
        features: membership.features,
        startDate: membership.startDate.toISOString(),
        endDate: membership.endDate.toISOString(),
        status: membership.status,
        paymentStatus: membership.paymentStatus,
        renewedFrom: membership.renewedFrom?.toString(),
      },
    };
  } catch (error) {
    console.error("Error registering membership:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to register membership",
    };
  }
}

export async function getUserMemberships(userId: string) {
  try {
    await connect();
    const memberships = await Membership.find({ userId });
    return memberships.map(serializeMembership);
  } catch (error) {
    console.error("Error getting user memberships:", error);
    return [];
  }
}

export async function cancelMembership(
  membershipId: string
): Promise<SerializedMembership> {
  await connect();

  try {
    const membership = (await Membership.findByIdAndUpdate(
      membershipId,
      { status: "cancelled" },
      { new: true }
    )
      .lean()
      .exec()) as unknown as MembershipDocument;

    if (!membership) {
      throw new Error("Membership not found");
    }

    // Return serialized data
    return {
      _id: membership._id.toString(),
      userId: membership.userId,
      planId: membership.planId.toString(),
      planName: membership.planName,
      price: membership.price,
      features: membership.features,
      startDate: membership.startDate.toISOString(),
      endDate: membership.endDate.toISOString(),
      status: membership.status,
      paymentStatus: membership.paymentStatus,
    };
  } catch (error) {
    console.error("Error cancelling membership:", error);
    throw new Error("Failed to cancel membership");
  }
}

// Function to check and update expired memberships
export async function checkExpiredMemberships() {
  try {
    await connect();
    const currentDate = new Date();

    // Find all active memberships that have expired
    const expiredMemberships = await Membership.find({
      status: "active",
      endDate: { $lte: currentDate },
    });

    // Update status to expired for all expired memberships
    const updatePromises = expiredMemberships.map((membership) =>
      Membership.findByIdAndUpdate(
        membership._id,
        { status: "expired" },
        { new: true }
      )
    );

    const updatedMemberships = await Promise.all(updatePromises);

    return {
      success: true,
      updatedCount: updatedMemberships.length,
      updatedMemberships: updatedMemberships.map(serializeMembership),
    };
  } catch (error) {
    console.error("Error checking expired memberships:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to check expired memberships",
    };
  }
}

export async function getMembershipById(membershipId: string) {
  try {
    await connect();

    // Find the membership by ID
    const membership = await Membership.findById(membershipId).populate({
      path: "planId",
      model: "Plan",
      select: "name duration price features",
    });

    if (!membership) {
      return {
        success: false,
        error: "Membership not found",
      };
    }

    // Get user data
    const User = mongoose.models.User;
    const user = await User.findOne({
      clerkId: membership.userId,
    }).lean();

    // Enhance membership with user data
    const enhancedMembership = {
      ...membership.toJSON(),
      user: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
            phone: user.phone,
          }
        : null,
    };

    // Serialize the membership with populated data
    const serializedMembership = serializeMembership(enhancedMembership);

    return {
      success: true,
      membership: serializedMembership,
    };
  } catch (error) {
    console.error("Error fetching membership:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch membership",
    };
  }
}

export async function getAllMemberships(page: number = 1, limit: number = 20) {
  try {
    await connect();

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await Membership.countDocuments();

    // Find all memberships with pagination
    const memberships = await Membership.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit)
      .populate({
        path: "planId",
        model: "Plan",
        select: "name duration",
      });

    // Get all unique user IDs from the memberships
    const userIds = [...new Set(memberships.map((m) => m.userId))];

    // Fetch all users in one query
    const User = mongoose.models.User;
    const users = await User.find({
      clerkId: { $in: userIds },
    }).lean();

    // Create a map of user data by clerkId for quick lookup
    const userMap = users.reduce((map, user) => {
      map[user.clerkId] = user;
      return map;
    }, {});

    // Enhance memberships with user data
    const enhancedMemberships = memberships.map((membership) => {
      const membershipObj = membership.toJSON
        ? membership.toJSON()
        : membership;
      const user = userMap[membershipObj.userId];

      return {
        ...membershipObj,
        user: user
          ? {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }
          : null,
      };
    });

    // Serialize the memberships with populated data
    const serializedMemberships = enhancedMemberships.map(serializeMembership);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      success: true,
      memberships: serializedMemberships,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    };
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch memberships",
    };
  }
}
