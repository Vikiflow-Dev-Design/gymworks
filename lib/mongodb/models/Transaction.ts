import mongoose, { Document, Schema, model, models } from "mongoose";

export interface ITransaction extends Document {
  userId: string;
  membershipId?: mongoose.Types.ObjectId;
  reference: string;
  amount: number;
  status: "pending" | "success" | "failed" | "abandoned" | "timeout";
  paymentMethod: string;
  metadata: {
    planId: mongoose.Types.ObjectId;
    planName?: string;
    paymentType: "new_subscription" | "renewal";
    failureReason?: string;
    abandonedAt?: Date;
    timeoutAt?: Date;
  };
  paymentResponse?: any;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: String,
      required: true,
    },
    membershipId: {
      type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
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
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists before creating a new one
// This is important for Next.js with hot reloading and in serverless environments
const Transaction =
  models.Transaction || model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
