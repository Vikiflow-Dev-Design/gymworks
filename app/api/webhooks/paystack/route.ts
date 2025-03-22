import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { connect } from "@/lib/mongodb/connectDB";
import { verifyWebhookSignature } from "@/lib/paystack";
import Transaction from "@/lib/mongodb/models/Transaction";
import Membership from "@/lib/mongodb/models/Membership";

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

      // Add more event handlers as needed
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
  const { userId, membershipId } = metadata;

  // Update transaction
  const transaction = await Transaction.findOne({ reference });
  if (transaction) {
    transaction.status = "success";
    transaction.paymentResponse = data;
    await transaction.save();
  }

  // Update membership
  const membership = await Membership.findById(membershipId);
  if (membership) {
    if (transaction?.metadata.paymentType === "renewal") {
      // For renewal, create new membership period
      const startDate = new Date(membership.endDate);
      const endDate = new Date(startDate);

      // Calculate new end date based on plan duration
      switch (membership.duration) {
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
      }

      await Membership.create({
        userId: membership.userId,
        planId: membership.planId,
        planName: membership.planName,
        price: membership.price,
        features: membership.features,
        startDate,
        endDate,
        status: "active",
        paymentStatus: "paid",
        renewedFrom: membership._id,
      });
    } else {
      // For new subscription, update existing membership
      membership.status = "active";
      membership.paymentStatus = "paid";
      await membership.save();
    }
  }
}

async function handleFailedPayment(data: any) {
  const { reference } = data;

  // Update transaction
  const transaction = await Transaction.findOne({ reference });
  if (transaction) {
    transaction.status = "failed";
    transaction.paymentResponse = data;
    await transaction.save();
  }

  // Note: We don't update membership status on failed payment
  // as discussed earlier
}
