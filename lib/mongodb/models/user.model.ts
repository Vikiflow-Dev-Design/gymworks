import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    membershipStatus: {
      type: String,
      enum: ["active", "inactive", "trial"],
      default: "inactive",
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists before creating it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
