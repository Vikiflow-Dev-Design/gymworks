/**
 * Payment Verification API Route
 * Handles the verification of payments after Paystack redirects back to our application.
 * This route is called automatically by Paystack after a payment attempt.
 */

import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/connectDB";
import { verifyPayment } from "@/lib/paystack";
import Transaction from "@/lib/mongodb/models/Transaction";
import Membership from "@/lib/mongodb/models/Membership";

/**
 * GET handler for payment verification
 * @route GET /api/payment/verify
 * @param {Request} request - The request object containing reference in query params
 * @returns {Promise<NextResponse>} Redirects to success or failure page
 */
export async function GET(request: Request) {
  try {
    // Extract reference from URL parameters
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.redirect("/payment/failed?error=no_reference");
    }

    // Connect to database
    await connect();

    // Verify payment with Paystack
    const paymentData = await verifyPayment(reference);

    // Find and update transaction
    const transaction = await Transaction.findOne({ reference });
    if (!transaction) {
      return NextResponse.redirect(
        "/payment/failed?error=transaction_not_found"
      );
    }

    // Update transaction with verification result
    transaction.status = paymentData.status;
    transaction.paymentResponse = paymentData;
    await transaction.save();

    if (paymentData.status === "success") {
      // Update membership status if payment was successful
      const membership = await Membership.findById(transaction.membershipId);
      if (membership) {
        membership.status = "active";
        membership.paymentStatus = "paid";
        await membership.save();
      }

      return NextResponse.redirect("/payment/success?reference=" + reference);
    } else {
      return NextResponse.redirect(
        "/payment/failed?error=payment_failed&reference=" + reference
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.redirect("/payment/failed?error=verification_failed");
  }
}
