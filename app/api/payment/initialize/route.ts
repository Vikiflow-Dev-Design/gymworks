/**
 * Payment Initialization API Route
 * Handles the initialization of payment transactions with Paystack.
 * This route is called when a user wants to purchase or renew a membership plan.
 */

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connect } from "@/lib/mongodb/connectDB";
import {
  initializePayment,
  generateTransactionReference,
} from "@/lib/paystack";
import Transaction from "@/lib/mongodb/models/Transaction";
import Plan from "@/lib/mongodb/models/Plan";
import Membership from "@/lib/mongodb/models/Membership";
import { Types } from "mongoose";

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

/**
 * POST handler for payment initialization
 * @route POST /api/payment/initialize
 * @param {Request} req - The request object containing planId in the body
 * @returns {Promise<NextResponse>} JSON response with authorization URL and reference
 */
export async function POST(req: Request) {
  try {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await req.json();

    // Connect to database
    await connect();

    // Get the plan details
    const plan = await Plan.findById(planId);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Check for existing active membership
    const existingMembership = (await Membership.findOne({
      userId,
      planId,
      status: "active",
      endDate: { $gt: new Date() },
    })) as MembershipDocument;

    const paymentType = existingMembership ? "renewal" : "new_subscription";

    // Create a transaction record
    const reference = generateTransactionReference();
    const transaction = await Transaction.create({
      userId,
      reference,
      amount: plan.price,
      status: "pending",
      membershipId: existingMembership
        ? existingMembership._id.toString()
        : plan._id.toString(),
      metadata: {
        planId: plan._id,
        planName: plan.name,
        paymentType,
      },
    });

    // Initialize Paystack payment
    const paymentData = await initializePayment({
      email: req.headers.get("x-user-email") || "",
      amount: plan.price * 100, // Convert to kobo
      metadata: {
        userId,
        planId: plan._id.toString(),
        planName: plan.name,
        // Use membership ID for renewals, plan ID for new subscriptions
        membershipId: existingMembership
          ? existingMembership._id.toString()
          : plan._id.toString(),
        paymentType,
      },
      reference,
    });

    return NextResponse.json({
      success: true,
      data: {
        authorizationUrl: paymentData.authorization_url,
        reference: paymentData.reference,
      },
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}

/**
 * Calculates the end date for a membership based on its duration
 * @param {Date} startDate - The start date of the membership
 * @param {string} duration - Duration of the membership (month, 3 months, 6 months, year)
 * @returns {Date} The calculated end date
 * @throws {Error} If duration is invalid
 */
