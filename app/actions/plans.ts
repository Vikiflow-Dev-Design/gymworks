"use server";

import { connect } from "@/lib/mongodb/connectDB";
import Plan from "@/lib/mongodb/models/Plan";

export async function getPlans() {
  await connect();

  try {
    const plans = await Plan.find({ status: "active" })
      .sort({ price: 1 })
      .lean();
    return JSON.parse(JSON.stringify(plans));
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw new Error("Failed to fetch plans");
  }
}

export async function getPlanById(planId: string) {
  await connect();

  try {
    const plan = await Plan.findById(planId).lean();
    if (!plan) {
      throw new Error("Plan not found");
    }
    return JSON.parse(JSON.stringify(plan));
  } catch (error) {
    console.error("Error fetching plan:", error);
    throw new Error("Failed to fetch plan");
  }
}

export async function createPlan({
  name,
  duration,
  price,
  features,
  popular = false,
}: {
  name: string;
  duration: "month" | "year" | "3 months" | "6 months";
  price: number;
  features: string[];
  popular?: boolean;
}) {
  console.log(name, duration, price, features, popular);

  await connect();

  try {
    const plan = await Plan.create({
      name,
      duration,
      price,
      features,
      popular,
    });
    return JSON.parse(JSON.stringify(plan.toObject()));
  } catch (error) {
    console.error("Error creating plan:", error);
    throw new Error("Failed to create plan");
  }
}

export async function updatePlan(
  planId: string,
  {
    name,
    duration,
    price,
    features,
    popular,
    status,
  }: {
    name?: string;
    duration?: "month" | "year" | "3 months" | "6 months";
    price?: number;
    features?: string[];
    popular?: boolean;
    status?: "active" | "inactive";
  }
) {
  await connect();

  try {
    const plan = await Plan.findByIdAndUpdate(
      planId,
      {
        ...(name && { name }),
        ...(duration && { duration }),
        ...(price && { price }),
        ...(features && { features }),
        ...(typeof popular !== "undefined" && { popular }),
        ...(status && { status }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!plan) {
      throw new Error("Plan not found");
    }

    return JSON.parse(JSON.stringify(plan.toObject()));
  } catch (error) {
    console.error("Error updating plan:", error);
    throw new Error("Failed to update plan");
  }
}

export async function deletePlan(planId: string) {
  await connect();

  try {
    const plan = await Plan.findByIdAndDelete(planId);
    if (!plan) {
      throw new Error("Plan not found");
    }
    return JSON.parse(JSON.stringify(plan.toObject()));
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw new Error("Failed to delete plan");
  }
}
