"use server";

import { connect } from "@/lib/mongodb/connectDB";
import Membership from "@/lib/mongodb/models/Membership";
import Plan from "@/lib/mongodb/models/Plan";
import { Types } from "mongoose";
import { auth } from "@clerk/nextjs/server";

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

// Function to check if user has an active membership for a plan
async function checkMembership(userId: string, planId: string) {
  try {
    const membership = (await Membership.findOne({
      userId,
      planId,
      status: "active",
    }).lean()) as MembershipDocument | null;

    return membership;
  } catch (error) {
    console.error("Error checking membership:", error);
    throw error;
  }
}

// Function to update/renew membership
async function updateMembership(
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

export async function getUserMemberships(
  userId: string
): Promise<SerializedMembership[]> {
  await connect();

  try {
    const memberships = (await Membership.find({ userId })
      .lean()
      .exec()) as unknown as MembershipDocument[];

    // Return serialized data
    return memberships.map((membership) => ({
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
    }));
  } catch (error) {
    console.error("Error fetching user memberships:", error);
    throw new Error("Failed to fetch user memberships");
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
