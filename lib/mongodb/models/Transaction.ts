import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    membershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
    },
    reference: {
      type: String,
      required: true,
      // unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "abandoned", "timeout"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: "paystack",
    },
    metadata: {
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
      },
      planName: String,
      paymentType: {
        type: String,
        enum: ["new_subscription", "renewal"],
        required: true,
      },
      failureReason: String,
      abandonedAt: Date,
      timeoutAt: Date,
    },
    paymentResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
