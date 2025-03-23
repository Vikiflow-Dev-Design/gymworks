"use server";

import { connect } from "@/lib/mongodb/connectDB";
import FreeTrialRequest, {
  IFreeTrialRequest,
} from "@/lib/mongodb/models/FreeTrialRequest";
import { revalidatePath } from "next/cache";

interface CreateFreeTrialRequestInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fitnessGoals?: string;
}

export async function createFreeTrialRequest(
  input: CreateFreeTrialRequestInput
) {
  try {
    await connect();

    // Check if user has already requested a free trial
    const existingRequest = await FreeTrialRequest.findOne({
      email: input.email,
    });
    if (existingRequest) {
      return {
        success: false,
        error: "You have already requested a free trial class",
      };
    }

    // Create new free trial request
    const freeTrialRequest = await FreeTrialRequest.create(input);

    revalidatePath("/");

    return {
      success: true,
      data: freeTrialRequest,
    };
  } catch (error: any) {
    console.error("Error creating free trial request:", error);
    return {
      success: false,
      error: error.message || "Failed to create free trial request",
    };
  }
}

export async function getFreeTrialRequests() {
  try {
    await connect();

    const requests = await FreeTrialRequest.find()
      .sort({ createdAt: -1 })
      .limit(100);

    return {
      success: true,
      data: requests,
    };
  } catch (error: any) {
    console.error("Error fetching free trial requests:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch free trial requests",
    };
  }
}

export async function deleteFreeTrialRequest(id: string) {
  try {
    await connect();

    await FreeTrialRequest.findByIdAndDelete(id);
    revalidatePath("/admin/free-trials");

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error deleting free trial request:", error);
    return {
      success: false,
      error: error.message || "Failed to delete free trial request",
    };
  }
}
