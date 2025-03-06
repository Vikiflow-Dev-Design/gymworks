"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatNaira } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  membership_type: string;
  membership_start: string;
  membership_end: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Function to fetch profile data
  const fetchProfileData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error in profile fetch:", error);
    }
  };

  useEffect(() => {
    // Get the current user session
    const getUser = async () => {
      try {
        // First check for an existing session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setLoading(false);
          return;
        }
        
        const sessionUser = sessionData?.session?.user;

        if (sessionUser) {
          setUser(sessionUser);
          await fetchProfileData(sessionUser.id);
        } else {
          // Fallback to getUser if no session
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            console.error("User error:", userError);
            setLoading(false);
            return;
          }
          
          if (userData?.user) {
            setUser(userData.user);
            await fetchProfileData(userData.user.id);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (session?.user) {
          setUser(session.user);
          await fetchProfileData(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
        
        // Force a router refresh to ensure the UI updates
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          router.refresh();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please log in to view your profile
          </h1>
          <Button asChild>
            <a href="/auth/login">Log In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <Button variant="outline">Edit Profile</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      First Name
                    </label>
                    <p className="font-medium">
                      {profile?.first_name || "Not set"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      Last Name
                    </label>
                    <p className="font-medium">
                      {profile?.last_name || "Not set"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="font-medium">{profile?.phone || "Not set"}</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Membership Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      Membership Type
                    </label>
                    <p className="font-medium">
                      {profile?.membership_type || "No active membership"}
                    </p>
                  </div>
                  {profile?.membership_start && (
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">
                        Start Date
                      </label>
                      <p className="font-medium">
                        {new Date(
                          profile.membership_start
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {profile?.membership_end && (
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">
                        End Date
                      </label>
                      <p className="font-medium">
                        {new Date(profile.membership_end).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Activity History</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Your activity history will be displayed here once you start
                using our facilities.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}