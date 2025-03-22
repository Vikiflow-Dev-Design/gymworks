import mongoose from "mongoose";

let initialized = false;

export const connect = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (initialized) {
    console.log("MongoDB already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "gymworksng",
    });
    console.log("MongoDB connected");
    initialized = true;
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
};
