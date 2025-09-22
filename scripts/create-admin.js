/**
 * Script to manually set a user as admin
 * Run this script once to create your first admin user
 */

const { clerkClient } = require('@clerk/clerk-sdk-node');

async function createAdmin() {
  const ADMIN_EMAIL = 'your-email@example.com'; // Replace with your email
  
  try {
    const clerk = clerkClient({
      secretKey: process.env.CLERK_SECRET_KEY
    });

    // Find user by email
    const users = await clerk.users.getUserList({
      emailAddress: [ADMIN_EMAIL]
    });

    if (users.data.length === 0) {
      console.error('User not found with email:', ADMIN_EMAIL);
      return;
    }

    const user = users.data[0];

    // Update user's role to admin
    await clerk.users.updateUserMetadata(user.id, {
      publicMetadata: {
        role: 'admin'
      }
    });

    console.log(`Successfully set ${ADMIN_EMAIL} as admin!`);
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

createAdmin();
