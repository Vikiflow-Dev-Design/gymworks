"use server";

import { connect } from "@/lib/mongodb/connectDB";
import User from "@/lib/mongodb/models/user";
import { currentUser } from "@clerk/nextjs/server";

async function createProfile(clerkUser: any) {
  try {
    const newUser = await User.create({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    });
    return newUser;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
}

export async function getProfile() {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await connect();
    let userProfile = await User.findOne({ clerkId: user.id });

    // If user profile doesn't exist, create one
    if (!userProfile) {
      userProfile = await createProfile(user);
    }

    const serializedUser = JSON.parse(JSON.stringify(userProfile));
    return { user: serializedUser };
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

export async function updateProfile(formData: {
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}) {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await connect();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: user.id },
      {
        $set: {
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    const serializedUser = JSON.parse(JSON.stringify(updatedUser));
    return {
      user: serializedUser,
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function deleteProfile() {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await connect();
    const deletedUser = await User.findOneAndDelete({ clerkId: user.id });

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
}
