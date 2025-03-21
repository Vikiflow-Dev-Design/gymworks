"use client";

import { useUser } from "@clerk/nextjs";

type PersonalInfoProps = {
  formData: {
    phone: string;
  };
};

export default function PersonalInfo({ formData }: PersonalInfoProps) {
  const { user } = useUser();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            Email
          </label>
          <p className="font-medium">{user?.emailAddresses[0].emailAddress}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            First Name
          </label>
          <p className="font-medium">{user?.firstName || "Not set"}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            Last Name
          </label>
          <p className="font-medium">{user?.lastName || "Not set"}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            Phone
          </label>
          <p className="font-medium">{formData?.phone || "Not set"}</p>
        </div>
      </div>
    </div>
  );
}
