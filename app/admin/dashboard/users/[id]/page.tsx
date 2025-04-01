"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  User,
  Clock,
  Check,
  CreditCard,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getUserById, deleteClerkUser } from "@/app/actions/users";
import { getUserMemberships } from "@/app/actions/membership";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Membership = {
  _id: string;
  planId: string;
  planName: string;
  price: number;
  startDate: string;
  renewalDate: string;
  endDate: string;
  status: string;
  paymentStatus: string;
  features: string[];
};

export default function UserDetails({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(params.id);
        if (!userData) {
          toast.error("User not found");
          return;
        }
        setUser(userData);

        // Fetch memberships using clerk_id
        const membershipData = await getUserMemberships(userData.clerk_id);
        setMemberships(membershipData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleDeleteUser = async () => {
    if (!user?.clerk_id) {
      toast.error("User ID not found");
      return;
    }

    try {
      setIsDeleting(true);
      await deleteClerkUser(user.clerk_id);
      toast.success("User deleted successfully");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <Link href="/admin/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          {/* User Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2 dark:text-white">
                  {user.first_name} {user.last_name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {/* <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.membership_status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : user.membership_status === "trial"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {(user.membership_status || "inactive")
                  .charAt(0)
                  .toUpperCase() +
                  (user.membership_status || "inactive").slice(1)}
              </span> */}
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Personal Information */}
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-3 dark:text-white">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone Number
                  </p>
                  <p className="font-medium dark:text-white">
                    {user.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="font-medium dark:text-white">
                    {user.address || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    City
                  </p>
                  <p className="font-medium dark:text-white">
                    {user.city || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    State
                  </p>
                  <p className="font-medium dark:text-white">
                    {user.state || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Postal Code
                  </p>
                  <p className="font-medium dark:text-white">
                    {user.postal_code || "Not provided"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Current Membership */}
          </div>

          {/* Membership History */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold dark:text-white">
                Membership History
              </h2>
            </div>
            <div className="space-y-6">
              {memberships.length > 0 ? (
                memberships.map((membership) => (
                  <div
                    key={membership._id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold dark:text-white">
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
                          ${membership.price}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {" "}
                            / month
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <div>
                            <p className="text-xs">Start Date</p>
                            <p className="font-medium">
                              {new Date(
                                membership.startDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <div>
                            <p className="text-xs">Start Date</p>
                            <p className="font-medium">
                              {new Date(
                                membership.renewalDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <div>
                            <p className="text-xs">End Date</p>
                            <p className="font-medium">
                              {new Date(
                                membership.endDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {membership.features &&
                        membership.features.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                              Features
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {membership.features.map(
                                (feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                      <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="dark:text-gray-300">
                                      {feature}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

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
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    No Memberships Found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    This user hasn't subscribed to any membership plans yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete User"
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the user account and remove all associated data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleDeleteUser}
                  >
                    Delete User
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
