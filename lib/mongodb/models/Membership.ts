import mongoose, { Document, Schema, model, models } from "mongoose";

export type MembershipStatus = "active" | "expired" | "cancelled" | "pending";
export type PaymentStatus = "paid" | "pending" | "failed" | "expired";

export interface IMembership extends Document {
  userId: string;
  planId: mongoose.Types.ObjectId;
  planName: string;
  startDate: Date;
  renewalDate: Date;
  endDate: Date;
  price: number;
  status: MembershipStatus;
  features: string[];
  paymentStatus: PaymentStatus;
  renewedFrom?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const membershipSchema = new Schema<IMembership>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    renewalDate: {
      type: Date,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled", "pending"],
      default: "pending",
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed", "expired"],
      default: "pending",
      required: true,
    },
    renewedFrom: {
      type: Schema.Types.ObjectId,
      ref: "Membership",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for userId and planId
membershipSchema.index({ userId: 1, planId: 1 }, { unique: true });

// Check if the model exists before creating a new one
// This is important for Next.js with hot reloading and in serverless environments
const Membership =
  models.Membership || model<IMembership>("Membership", membershipSchema);

export default Membership;
