import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: number;
  createdAt: Date;
  updatedAt: Date;
}

const adminEmails = [
  "victoruche3022@gmail.com",
  "vikiflowdesign@gmail.com",
  "vuetechsolutions@gmail.com",
];

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    postalCode: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

// Check if the model exists before creating it
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
