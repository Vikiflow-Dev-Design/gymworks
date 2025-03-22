import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  name: string;
  duration: "month" | "3 months" | "6 months" | "year";
  price: number;
  features: string[];
  popular: boolean;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const planSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      enum: ["month", "3 months", "6 months", "year"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    popular: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.models.Plan || mongoose.model<IPlan>("Plan", planSchema);

export default Plan;
