import mongoose, { Document, Schema, model, models } from "mongoose";

export type MembershipStatus = "active" | "expired" | "cancelled" | "pending";
export type PaymentStatus = "paid" | "pending" | "failed";

export interface IMembership extends Document {
  userId: string;
  planId: mongoose.Types.ObjectId;
  planName: string;
  startDate: Date;
  endDate: Date;
  price: number;
  status: MembershipStatus;
  features: string[];
  paymentStatus: PaymentStatus;
  renewedFrom?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Delete the existing model if it exists to prevent schema modification errors
if (models.Membership) {
  delete models.Membership;
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
      enum: ["paid", "pending", "failed"],
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

const Membership = model<IMembership>("Membership", membershipSchema);

export default Membership;
