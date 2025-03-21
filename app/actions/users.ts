"use server";

import { connect } from "@/lib/mongodb/connectDB";
import User from "@/lib/mongodb/models/user.model";
import { User as UserType } from "@/types/user";

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

export async function deleteUser(clerkId: string) {
  try {
    await connect();

    // Delete from MongoDB
    await User.findOneAndDelete({ clerkId });

    // Delete from Clerk
    const { clerkClient } = await import("@clerk/nextjs/server");

    await clerkClient.users.deleteUser(clerkId);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user");
  }
}
