"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserMemberships } from "@/app/actions/membership";
import { formatNaira } from "@/lib/utils";
import { format } from "date-fns";
import { Check, Calendar, CreditCard, Clock } from "lucide-react";

interface MembershipData {
  planName: string;
  price: number;
  startDate: string;
  renewalDate: string;
  endDate: string;
  status: string;
  features: string[];
  paymentStatus: string;
}

type MembershipInfoProps = {
  profile: {
    membership_type?: string;
    membership_start?: string;
    membership_end?: string;
  } | null;
};

export default function MembershipInfo({ profile }: MembershipInfoProps) {
  const { user } = useUser();
  const [memberships, setMemberships] = useState<MembershipData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemberships() {
      if (user?.id) {
        try {
          const fetchedMemberships = await getUserMemberships(user.id);
          const formattedMemberships = fetchedMemberships
            .sort(
              (a, b) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
            )
            .map((m) => ({
              planName: m.planName,
              price: m.price,
              endDate: format(new Date(m.endDate), "PPP"),
              startDate: format(new Date(m.startDate), "PPP"),
              renewalDate: format(new Date(m.renewalDate), "PPP"),
              status: m.status,
              features: m.features,
              paymentStatus: m.paymentStatus,
            }));
          setMemberships(formattedMemberships);
        } catch (error) {
          console.error("Error fetching memberships:", error);
        }
      }
      setLoading(false);
    }

    fetchMemberships();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-sm">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (memberships.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-sm">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">No Memberships Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            You haven't subscribed to any membership plans yet. Explore our
            plans to get started with your fitness journey.
          </p>
          <a
            href="/membership"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            View Plans
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Membership History</h2>
        <a
          href="/membership"
          className="text-primary hover:text-primary/90 transition-colors inline-flex items-center gap-2 text-sm font-medium"
        >
          View Available Plans
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      <div className="space-y-6">
        {memberships.map((membership, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">
                    {membership.planName}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      membership.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : membership.status === "cancelled"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {membership.status.charAt(0).toUpperCase() +
                      membership.status.slice(1)}
                  </span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {formatNaira(membership.price)}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <p className="text-xs">Start Date</p>
                    <p className="font-medium">{membership.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <div>
                    <p className="text-xs">Renewal Date</p>
                    <p className="font-medium">{membership.renewalDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <div>
                    <p className="text-xs">End Date</p>
                    <p className="font-medium">{membership.endDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Features
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {membership.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Payment Status:
                  </p>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      membership.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : membership.paymentStatus === "failed"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {membership.paymentStatus.charAt(0).toUpperCase() +
                      membership.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
