import User from "../models/user";
import { connect } from "../connectDB";

interface EmailAddress {
  email_address: string;
}

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting user:", error);
    throw error;
  }
};
