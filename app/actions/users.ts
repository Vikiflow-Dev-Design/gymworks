"use server";

import { connect } from "@/lib/mongodb/connectDB";
import Membership from "@/lib/mongodb/models/Membership";
import User from "@/lib/mongodb/models/user";
import { User as UserType } from "@/types/user";

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

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        avatar: image_url,
        email: userEmail,
        username: username,
        role: "",
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

export async function getUsers(): Promise<{ users: UserType[] }> {
  try {
    await connect();
    const users = await User.find({}).lean();

    const transformedUsers = users.map((user: any) => ({
      id: user._id.toString(),
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      membership_status: user.membershipStatus,
      created_at: user.createdAt || new Date(),
      clerk_id: user.clerkId,
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      postal_code: user.postalCode || "",
    }));

    return { users: transformedUsers };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUserById(userId: string) {
  try {
    await connect();
    const user = await User.findById(userId).lean();

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      created_at: user.createdAt || new Date(),
      clerk_id: user.clerkId,
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      postal_code: user.postalCode || "",
      // Additional fields for detailed view
      account_status: user.accountStatus || "active",
      last_login: user.lastLogin,
      // Membership specific fields
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function getDashboardStats() {
  try {
    await connect();

    const [totalUsers, activeMembers, trialUsers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ membershipStatus: "active" }),
      User.countDocuments({ membershipStatus: "trial" }),
    ]);

    return {
      totalUsers,
      activeMembers,
      trialUsers,
      formSubmissions: 0,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw new Error("Failed to fetch dashboard stats");
  }
}

export async function updateUserRole(
  currentUserEmail: string,
  targetUserEmail: string,
  role: "admin" | "user"
) {
  if (!targetUserEmail) {
    throw new Error("Target user email is required");
  }

  try {
    await connect();

    // Check if current user is admin
    const currentUser = await User.findOne({ email: currentUserEmail });

    if (!currentUser || currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can modify user roles");
    }

    // Find target user to get their Clerk ID
    const targetUser = await User.findOne({ email: targetUserEmail });

    if (!targetUser) {
      throw new Error("Target user not found");
    }

    // Update user's role in Clerk's public metadata
    const { clerkClient } = await import("@clerk/nextjs/server");
    const clerk = await clerkClient();

    await clerk.users.updateUserMetadata(targetUser.clerkId, {
      publicMetadata: {
        role,
      },
    });

    return {
      success: true,
      message: `User role successfully updated to ${role}`,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}

export async function deleteClerkUser(clerkId: string) {
  try {
    const { clerkClient } = await import("@clerk/nextjs/server");
    const clerk = await clerkClient();
    await clerk.users.deleteUser(clerkId);
    return { success: true, message: "Clerk user deleted successfully" };
  } catch (error) {
    console.error("Failed to delete Clerk user:", error);
    throw new Error("Failed to delete Clerk user");
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connect();

    // Find user to get their MongoDB ID
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // Delete all memberships associated with the user
    await Membership.deleteMany({ userId: clerkId });

    // Delete user from MongoDB
    await User.findOneAndDelete({ clerkId });

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user");
  }
}
