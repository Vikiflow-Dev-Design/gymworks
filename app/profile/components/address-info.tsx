"use client";
import { MapPin } from "lucide-react";

type AddressInfoProps = {
  formData: {
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  profile: {
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  } | null;
};

export default function AddressInfo({ formData, profile }: AddressInfoProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Contact & Address Information
      </h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            Phone Number
          </label>
          <p className="font-medium dark:text-white">
            {profile?.phone || "Not set"}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            Address
          </label>
          <p className="font-medium dark:text-white">
            {profile?.address || "Not set"}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            City
          </label>
          <p className="font-medium dark:text-white">
            {profile?.city || "Not set"}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            State
          </label>
          <p className="font-medium dark:text-white">
            {profile?.state || "Not set"}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            Postal Code
          </label>
          <p className="font-medium dark:text-white">
            {profile?.postalCode || "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
}
