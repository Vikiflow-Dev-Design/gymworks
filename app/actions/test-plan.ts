"use server";

import { connect } from "@/lib/mongodb/connectDB";
import Plan from "@/lib/mongodb/models/Plan";
import Membership from "@/lib/mongodb/models/Membership";
import { auth } from "@clerk/nextjs/server";
import { createPlan } from "./plans";

/**
 * Creates a test plan that can be used for testing the membership expiration system
 */
export async function createTestPlan() {
  try {
    await connect();

    // Check if test plan already exists
    const existingPlan = await Plan.findOne({ name: "1-Minute Test Plan" });

    if (existingPlan) {
      return {
        success: true,
        message: "Test plan already exists",
        plan: JSON.parse(JSON.stringify(existingPlan.toObject())),
      };
    }

    // Create a new test plan
    const plan = await createPlan({
      name: "1-Minute Test Plan",
      duration: "month", // We'll override this when creating the membership
      price: 1000, // A small amount for testing
      features: ["Test feature", "Expires in 1 minute", "For testing only"],
      popular: false,
    });

    return {
      success: true,
      message: "Test plan created successfully",
      plan,
    };
  } catch (error) {
    console.error("Error creating test plan:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create test plan",
    };
  }
}

/**
 * Registers a membership with the test plan that expires in 5 minutes
 */
export async function registerTestMembership(planId: string) {
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
    const selectedPlan = await Plan.findById(planId).lean();
    if (!selectedPlan) {
      return {
        success: false,
        error: "Invalid plan selected",
      };
    }

    // Check if this is actually the test plan
    if (selectedPlan.name !== "1-Minute Test Plan") {
      return {
        success: false,
        error: "This function can only be used with the 1-Minute Test Plan",
      };
    }

    // Calculate start and end dates (end date is 1 minute from now)
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 1 * 60 * 1000); // 1 minute in milliseconds

    // Check if user already has an active membership for this plan
    const existingMembership = await Membership.findOne({
      userId,
      planId,
      status: "active",
    });

    let membership;

    if (existingMembership) {
      // Update the existing membership
      membership = await Membership.findByIdAndUpdate(
        existingMembership._id,
        {
          startDate,
          endDate,
          status: "active",
          paymentStatus: "paid", // Set as paid for testing
        },
        { new: true }
      ).lean();
    } else {
      // Create new membership
      membership = await Membership.create({
        userId,
        planId: selectedPlan._id,
        planName: selectedPlan.name,
        price: selectedPlan.price,
        features: selectedPlan.features,
        startDate,
        endDate,
        status: "active",
        paymentStatus: "paid", // Set as paid for testing
      });

      // Convert to plain object
      membership = membership.toObject();
    }

    // Return a plain object
    return {
      success: true,
      message:
        "Test membership created successfully. It will expire in 1 minute.",
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
        expiresIn: "1 minute",
      },
    };
  } catch (error) {
    console.error("Error registering test membership:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to register test membership",
    };
  }
}

/**
 * Manually triggers the check for expired memberships
 */
export async function triggerExpirationCheck() {
  try {
    // Import the checkExpiredMemberships function directly
    const { checkExpiredMemberships } = await import(
      "@/app/actions/membership"
    );

    // Call the function directly instead of making an HTTP request
    const result = await checkExpiredMemberships();

    return {
      success: true,
      message: "Expiration check triggered successfully",
      result,
    };
  } catch (error) {
    console.error("Error triggering expiration check:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to trigger expiration check",
    };
  }
}

/**
 * Renews an expired test membership for another 5 minutes
 */
export async function renewTestMembership(membershipId: string) {
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
    // Find the membership in the database
    const membership = await Membership.findById(membershipId);
    if (!membership) {
      return {
        success: false,
        error: "Membership not found",
      };
    }

    // Check if this is the user's membership
    if (membership.userId !== userId) {
      return {
        success: false,
        error: "You can only renew your own memberships",
      };
    }

    // Check if this is a test plan membership
    const plan = await Plan.findById(membership.planId);
    if (!plan || plan.name !== "1-Minute Test Plan") {
      return {
        success: false,
        error: "This function can only be used with the 1-Minute Test Plan",
      };
    }

    // Calculate new start and end dates (end date is 1 minute from now)
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 1 * 60 * 1000); // 1 minute in milliseconds

    // Update the membership
    const updatedMembership = await Membership.findByIdAndUpdate(
      membershipId,
      {
        startDate,
        endDate,
        status: "active",
        paymentStatus: "paid", // Set as paid for testing
      },
      { new: true }
    ).lean();

    if (!updatedMembership) {
      return {
        success: false,
        error: "Failed to renew membership",
      };
    }

    // Return a plain object
    return {
      success: true,
      message:
        "Test membership renewed successfully. It will expire in 1 minute.",
      membership: {
        _id: updatedMembership._id.toString(),
        userId: updatedMembership.userId,
        planId: updatedMembership.planId.toString(),
        planName: updatedMembership.planName,
        price: updatedMembership.price,
        features: updatedMembership.features,
        startDate: updatedMembership.startDate.toISOString(),
        endDate: updatedMembership.endDate.toISOString(),
        status: updatedMembership.status,
        paymentStatus: updatedMembership.paymentStatus,
        expiresIn: "1 minute",
      },
    };
  } catch (error) {
    console.error("Error renewing test membership:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to renew test membership",
    };
  }
}
