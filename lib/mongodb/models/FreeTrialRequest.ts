import { Schema, model, models } from "mongoose";

export interface IFreeTrialRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fitnessGoals?: string;
  createdAt: Date;
  updatedAt: Date;
}

const freeTrialRequestSchema = new Schema<IFreeTrialRequest>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    fitnessGoals: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
freeTrialRequestSchema.index({ email: 1 });
freeTrialRequestSchema.index({ createdAt: -1 });

const FreeTrialRequest =
  models.FreeTrialRequest || model("FreeTrialRequest", freeTrialRequestSchema);

export default FreeTrialRequest;
