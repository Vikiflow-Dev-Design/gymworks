import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { connect } from "@/lib/mongodb/connectDB";
import { verifyWebhookSignature } from "@/lib/paystack";
import Transaction from "@/lib/mongodb/models/Transaction";
import Membership from "@/lib/mongodb/models/Membership";
import Plan from "@/lib/mongodb/models/Plan";

function calculateEndDate(startDate: Date, duration: string): Date {
  const endDate = new Date(startDate);
  switch (duration) {
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
  return endDate;
}

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const signature = headersList.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    const payload = await req.text();
    const isValid = verifyWebhookSignature(payload, signature);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(payload);

    await connect();

    switch (event.event) {
      case "charge.success":
        await handleSuccessfulPayment(event.data);
        break;

      case "charge.failed":
        await handleFailedPayment(event.data);
        break;

      case "charge.abandoned":
        await handleAbandonedPayment(event.data);
        break;

      case "charge.timedout":
        await handleTimeoutPayment(event.data);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(data: any) {
  const { reference, metadata } = data;
  const { userId, planId, planName } = metadata;

  // Update transaction
  const transaction = await Transaction.findOne({ reference });
  if (!transaction) {
    console.error("Transaction not found:", reference);
    return;
  }

  transaction.status = "success";
  transaction.paymentResponse = data;
  await transaction.save();

  try {
    // Get the plan details
    const plan = await Plan.findById(planId);
    if (!plan) {
      console.error("Plan not found:", planId);
      return;
    }

    // Check for existing active membership
    const existingMembership = await Membership.findOne({
      userId,
      planId,
    });

    const startDate = new Date();
    const renewalDate = new Date();
    const endDate = calculateEndDate(startDate, plan.duration);

    if (existingMembership) {
      // For renewal, create new membership period

      if (existingMembership.status === "active") {
        return { success: false, message: "Membership already active" };
      }

      await Membership.updateOne({
        planName: plan.name,
        price: plan.price,
        features: plan.features,
        renewalDate: new Date(), // renew from current date
        endDate: calculateEndDate(new Date(), plan.duration),
        status: "active",
        paymentStatus: "paid",
        renewedFrom: existingMembership._id,
      });
    } else {
      // Create new membership
      await Membership.create({
        userId,
        planId: plan._id,
        planName: plan.name,
        price: plan.price,
        features: plan.features,
        startDate,
        renewalDate,
        endDate,
        status: "active",
        paymentStatus: "paid",
      });
    }
  } catch (error) {
    console.error("Error creating membership:", error);
    // Note: We don't throw here as the payment was successful
    // We should implement a retry mechanism or alert admin
  }
}

async function handleFailedPayment(data: any) {
  const { reference } = data;

  // Update transaction
  const transaction = await Transaction.findOne({ reference });
  if (transaction) {
    transaction.status = "failed";
    transaction.paymentResponse = data;
    transaction.metadata.failureReason =
      data.gateway_response || "Payment failed";
    await transaction.save();
  }
}

async function handleAbandonedPayment(data: any) {
  const { reference } = data;

  const transaction = await Transaction.findOne({ reference });
  if (transaction) {
    transaction.status = "abandoned";
    transaction.paymentResponse = data;
    transaction.metadata.abandonedAt = new Date();
    await transaction.save();
  }
}

async function handleTimeoutPayment(data: any) {
  const { reference } = data;

  const transaction = await Transaction.findOne({ reference });
  if (transaction) {
    transaction.status = "timeout";
    transaction.paymentResponse = data;
    transaction.metadata.timeoutAt = new Date();
    await transaction.save();
  }
}
