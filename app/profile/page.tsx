"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getProfile, updateProfile } from "../actions/profile";
import ProfileHeader from "./components/profile-header";
import PersonalInfo from "./components/personal-info";
import AddressInfo from "./components/address-info";
import MembershipInfo from "./components/membership-info";
import EditProfileDialog from "./components/edit-profile-dialog";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  membership_type: string;
  membership_start: string;
  membership_end: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  fitness_goals: string;
  health_conditions: string;
  profile_image_url: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { user } = await getProfile();
        setProfile(user);
        setFormData({
          phone: user.phone || "",
          address: user.address || "",
          city: user.city || "",
          state: user.state || "",
          postalCode: user.postalCode || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [isLoaded, isSignedIn, router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await updateProfile(formData);

      if (!user) {
        throw new Error("Failed to update profile");
      }

      setProfile(user);
      setFormData({
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        postalCode: user.postalCode || "",
      });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
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
            <ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PersonalInfo formData={formData} />
              <AddressInfo formData={formData} profile={profile} />
            </div>
          </div>

          {/* Membership Information */}
          <MembershipInfo profile={profile} />

          {/* Edit Profile Dialog */}
          <EditProfileDialog
            isOpen={isEditing}
            setIsOpen={setIsEditing}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </motion.div>
      </div>
    </main>
  );
}
