"use server";

import { connect } from "@/lib/mongodb/connectDB";
import Transaction from "@/lib/mongodb/models/Transaction";
import { auth } from "@clerk/nextjs/server";

/**
 * Get all transactions for a user
 * @returns Array of transactions
 */
export async function getTransactions() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await connect();
    const transactions = await Transaction.find({ userId })
      .populate("metadata.planId", "name price duration")
      .sort({ createdAt: -1 });

    return { success: true, data: transactions };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, error: "Failed to fetch transactions" };
  }
}

/**
 * Get a specific transaction by ID
 * @param transactionId - The ID of the transaction to fetch
 * @returns Transaction object
 */
export async function getTransactionById(transactionId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await connect();
    const transaction = await Transaction.findOne({
      _id: transactionId,
      userId,
    }).populate("metadata.planId", "name price duration");

    if (!transaction) {
      return { success: false, error: "Transaction not found" };
    }

    return { success: true, data: transaction };
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return { success: false, error: "Failed to fetch transaction" };
  }
}

/**
 * Create a new transaction
 * @param data - Transaction data
 * @returns Created transaction object
 */
export async function createTransaction(data: {
  planId: string;
  amount: number;
  reference: string;
  paymentType: "new_subscription" | "renewal";
  planName: string;
  membershipId?: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await connect();

    const transactionExists = await Transaction.findOne({
      userId,
      "metadata.planId": data.planId,
      status: "pending",
    });

    if (transactionExists) {
      transactionExists.reference = data.reference;
      await transactionExists.save();

      console.log("Transaction already exists");
      return { success: false, error: "Transaction already exists" };
    }

    const transaction = await Transaction.create({
      userId,
      reference: data.reference,
      amount: data.amount,
      status: "pending",
      membershipId: data.membershipId,
      metadata: {
        planId: data.planId,
        planName: data.planName,
        paymentType: data.paymentType,
      },
    });

    return { success: true, data: transaction };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, error: "Failed to create transaction" };
  }
}

/**
 * Update transaction status
 * @param reference - Transaction reference
 * @param status - New status
 * @param paymentResponse - Optional payment gateway response
 * @returns Updated transaction
 */
export async function updateTransactionStatus({
  reference,
  status,
  paymentResponse,
}: {
  reference: string;
  status: "success" | "failed" | "abandoned" | "timeout";
  paymentResponse?: any;
}) {
  try {
    await connect();
    const transaction = await Transaction.findOne({ reference });

    if (!transaction) {
      return { success: false, error: "Transaction not found" };
    }

    transaction.status = status;
    if (paymentResponse) {
      transaction.paymentResponse = paymentResponse;
    }

    if (status === "abandoned") {
      transaction.metadata.abandonedAt = new Date();
    } else if (status === "timeout") {
      transaction.metadata.timeoutAt = new Date();
    } else if (status === "failed") {
      transaction.metadata.failureReason =
        paymentResponse?.message || "Payment failed";
    }

    await transaction.save();
    return { success: true, data: transaction };
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return { success: false, error: "Failed to update transaction status" };
  }
}
