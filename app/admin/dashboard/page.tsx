"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserTableSkeleton } from "@/components/ui/skeleton";
import { FreeTrialSubmissionsSkeleton } from "@/app/components/skeletons/FreeTrialSubmissionsSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Users,
  CreditCard,
  FileText,
  TrendingUp,
  Calendar,
  Dumbbell,
  Bell,
} from "lucide-react";
import type { User } from "@/types/user";
import type { DashboardStats } from "@/data/dashboard";
import Link from "next/link";
import { getUsers, getDashboardStats } from "@/app/actions/users";
import { getFreeTrialRequests } from "@/app/actions/freeTrialRequest";
import { toast } from "sonner";
import { format } from "date-fns";

interface FreeTrialRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fitnessGoals?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeMembers: 0,
    trialUsers: 0,
    formSubmissions: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [freeTrialRequests, setFreeTrialRequests] = useState<
    FreeTrialRequest[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState({
    stats: true,
    users: true,
    trials: true,
  });
  const [errors, setErrors] = useState({
    stats: null as string | null,
    users: null as string | null,
    trials: null as string | null,
  });
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Reset loading states
    setLoading({ stats: true, users: true, trials: true });
    setErrors({ stats: null, users: null, trials: null });

    // Fetch dashboard stats
    getDashboardStats()
      .then((dashboardStats) => {
        setStats(dashboardStats);
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats:", error);
        setErrors((prev) => ({
          ...prev,
          stats: "Failed to load dashboard statistics",
        }));
        toast.error("Failed to load dashboard statistics");
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, stats: false }));
      });

    // Fetch users
    getUsers()
      .then((usersData) => {
        if (usersData) {
          setUsers(usersData.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setErrors((prev) => ({ ...prev, users: "Failed to load user data" }));
        toast.error("Failed to load user data");
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, users: false }));
      });

    // Fetch free trial requests
    getFreeTrialRequests()
      .then((trialRequestsData) => {
        if (trialRequestsData.success) {
          setFreeTrialRequests(trialRequestsData.data);
          setStats((prev) => ({
            ...prev,
            formSubmissions: trialRequestsData.data.length,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching free trial requests:", error);
        setErrors((prev) => ({
          ...prev,
          trials: "Failed to load free trial requests",
        }));
        toast.error("Failed to load free trial requests");
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, trials: false }));
      });
  };

  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"users" | "submissions">("users");

  const statusOptions = [
    { value: "all", label: "All Users" },
    { value: "active", label: "Active" },
    { value: "trial", label: "Trial" },
    { value: "inactive", label: "Inactive" },
  ];

  // Add filteredUsers implementation
  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      selectedStatus === "all" || user.membership_status === selectedStatus;
    const matchesSearch =
      searchQuery.trim() === "" ||
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filter free trial requests
  const filteredRequests = freeTrialRequests.filter((request) => {
    const fullName = `${request.firstName} ${request.lastName}`.toLowerCase();
    const matchesSearch =
      submissionSearchQuery.trim() === "" ||
      fullName.includes(submissionSearchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(submissionSearchQuery.toLowerCase());
    return matchesSearch;
  });

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
  }) => (
    <Card className={`p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "users" || tab === "submissions") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: "users" | "submissions") => {
    setActiveTab(tab);
    router.push(`/admin/dashboard?tab=${tab}`);
  };

  if (errors.stats) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4">{errors.stats}</div>
        <Button onClick={fetchDashboardData}>Retry</Button>
      </div>
    );
  }

  return (
    <motion.div>
      <div className="container mx-auto p-4 sm:p-6 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 dark:text-white">
          Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {errors.stats ? (
            <div className="col-span-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{errors.stats}</p>
              <Button onClick={fetchDashboardData} className="mt-2">
                Retry
              </Button>
            </div>
          ) : (
            <>
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={Users}
                color="bg-blue-50 dark:bg-blue-900/20"
              />
              <StatCard
                title="Free Trial Requests"
                value={stats.formSubmissions}
                icon={TrendingUp}
                color="bg-purple-50 dark:bg-purple-900/20"
              />
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Link href="/admin/dashboard/plans">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <CreditCard className="w-4 h-4 mr-2" /> Manage Plans
              </Button>
            </Link>
            <Link href="/admin/dashboard/roles">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <CreditCard className="w-4 h-4 mr-2" /> Manage roles
              </Button>
            </Link>
            {/* <Link href="/admin/dashboard/expired-memberships">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <CreditCard className="w-4 h-4 mr-2" /> Expired Memberships
              </Button>
            </Link>
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <Bell className="w-4 h-4 mr-2" /> Notifications
            </Button> */}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-0">
            <button
              onClick={() => handleTabChange("users")}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => handleTabChange("submissions")}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "submissions"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Free Trial Requests
            </button>
          </div>
        </div>

        {/* Content Area */}
        <Card className="p-4 sm:p-6 overflow-hidden">
          {activeTab === "users" ? (
            <>
              {loading.users ? (
                <UserTableSkeleton />
              ) : errors.users ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">
                    {errors.users}
                  </p>
                  <Button onClick={fetchDashboardData} className="mt-2">
                    Retry
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="w-full">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b dark:border-gray-700">
                            <th className="text-left py-3 px-4 font-medium">
                              Name
                            </th>
                            <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">
                              Email
                            </th>
                            <th className="text-left py-3 px-4 font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr
                              key={user.id}
                              className="border-b dark:border-gray-700"
                            >
                              <td className="py-3 px-4">
                                <div>
                                  {user.first_name} {user.last_name}
                                </div>
                                <div className="text-xs text-gray-500 sm:hidden">
                                  {user.email}
                                </div>
                              </td>
                              <td className="py-3 px-4 hidden sm:table-cell">
                                {user.email}
                              </td>
                              <td className="py-3 px-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    router.push(
                                      `/admin/dashboard/users/${user.id}`
                                    )
                                  }
                                >
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {loading.trials ? (
                <FreeTrialSubmissionsSkeleton />
              ) : errors.trials ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">
                    {errors.trials}
                  </p>
                  <Button onClick={fetchDashboardData} className="mt-2">
                    Retry
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search free trial requests..."
                          value={submissionSearchQuery}
                          onChange={(e) =>
                            setSubmissionSearchQuery(e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((request) => (
                          <tr
                            key={request._id}
                            className="border-b dark:border-gray-700"
                          >
                            <td className="py-3 px-4">
                              <div>
                                {request.firstName} {request.lastName}
                              </div>
                              <div className="text-xs text-gray-500 sm:hidden">
                                {request.email}
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              {request.email}
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  router.push(
                                    `/admin/dashboard/submissions/${request._id}`
                                  )
                                }
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </Card>
      </div>
    </motion.div>
  );
}
