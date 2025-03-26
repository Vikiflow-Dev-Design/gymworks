import User from "../models/user.model";
import { connect } from "../connectDB";

interface EmailAddress {
  email_address: string;
}

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: EmailAddress[],
  username: string
) => {
  try {
    await connect();

    const userEmail = email_addresses[0].email_address;
    const adminEmails = [
      "victoruche3022@gmail.com",
      "vikiflowdesign@gmail.com",
      "vuetechsolutions@gmail.com",
    ];

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        avatar: image_url,
        email: userEmail,
        username: username,
        role: adminEmails.includes(userEmail) ? "admin" : "user",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: null,
      },
      { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.log("Error creating or updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting user:", error);
    throw error;
  }
};
