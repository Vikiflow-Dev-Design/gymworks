"use server";

import { connect } from "@/lib/mongodb/connectDB";
import FreeTrialRequest from "@/lib/mongodb/models/FreeTrialRequest";

export async function getFreeTrialRequest(id: string) {
  try {
    await connect();

    const request = await FreeTrialRequest.findById(id).lean();

    if (!request) {
      return {
        success: false,
        error: "Free trial request not found",
      };
    }

    return {
      success: true,
      data: {
        _id: request._id.toString(),
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        fitnessGoals: request.fitnessGoals,
        createdAt: request.createdAt.toISOString(),
        status: "pending", // Default status for now
      },
    };
  } catch (error: any) {
    console.error("Error fetching free trial request:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch free trial request",
    };
  }
}
