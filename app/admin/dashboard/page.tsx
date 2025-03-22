"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { mockFormSubmissions } from "@/data/dashboard";
import type { User } from "@/types/user";
import type { DashboardStats } from "@/data/dashboard";
import Link from "next/link";
import { getUsers, getDashboardStats } from "@/app/actions/users";
import { toast } from "sonner";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState("");
  const [selectedSubmissionStatus, setSelectedSubmissionStatus] =
    useState<string>("all");

  const submissionStatusOptions = [
    { value: "all", label: "All Submissions" },
    { value: "pending", label: "Pending" },
    { value: "contacted", label: "Contacted" },
    { value: "scheduled", label: "Scheduled" },
  ];

  const filteredSubmissions = mockFormSubmissions.filter((submission) => {
    const matchesStatus =
      selectedSubmissionStatus === "all" ||
      submission.status === selectedSubmissionStatus;
    const matchesSearch =
      submissionSearchQuery.trim() === "" ||
      submission.name
        .toLowerCase()
        .includes(submissionSearchQuery.toLowerCase()) ||
      submission.email
        .toLowerCase()
        .includes(submissionSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashboardStats, usersData] = await Promise.all([
        getDashboardStats(),
        getUsers(),
      ]);

      if (!dashboardStats || !usersData) {
        throw new Error("Failed to fetch dashboard data");
      }

      setStats(dashboardStats);
      setUsers(usersData.users);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again later.");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
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

  const statusColors = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    contacted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    scheduled:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

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

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={fetchDashboardData}>Retry</Button>
      </div>
    );
  }

  return (
    <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 dark:text-white">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              color="bg-blue-50 dark:bg-blue-900/20"
            />
            <StatCard
              title="Active Members"
              value={stats.activeMembers}
              icon={CreditCard}
              color="bg-green-50 dark:bg-green-900/20"
            />
            <StatCard
              title="Trial Users"
              value={stats.trialUsers}
              icon={FileText}
              color="bg-yellow-50 dark:bg-yellow-900/20"
            />
            <StatCard
              title="Form Submissions"
              value={stats.formSubmissions}
              icon={TrendingUp}
              color="bg-purple-50 dark:bg-purple-900/20"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/admin/dashboard/plans">
              <Button className="bg-primary hover:bg-primary/90">
                <CreditCard className="w-4 h-4 mr-2" /> Manage Plans
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90">
              <Calendar className="w-4 h-4 mr-2" /> View Schedule
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Dumbbell className="w-4 h-4 mr-2" /> Manage Classes
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Bell className="w-4 h-4 mr-2" /> Notifications
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleTabChange("users")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => handleTabChange("submissions")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "submissions"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Form Submissions
            </button>
          </div>

          {/* Content Area */}
          {activeTab === "users" ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold dark:text-white">
                  User Management
                </h2>
                <div className="flex gap-4 items-center">
                  <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedStatus(option.value)}
                        className={`px-4 py-2 text-sm transition-colors ${
                          selectedStatus === option.value
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.first_name} {user.last_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.membership_status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : user.membership_status === "trial"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                              }`}
                            >
                              {(user.membership_status || "inactive")
                                .charAt(0)
                                .toUpperCase() +
                                (user.membership_status || "inactive").slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/admin/dashboard/users/${user.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-primary hover:text-primary/90"
                              >
                                View Details
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold dark:text-white">
                  Form Submissions
                </h2>
                <div className="flex gap-4 items-center">
                  <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    {submissionStatusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setSelectedSubmissionStatus(option.value)
                        }
                        className={`px-4 py-2 text-sm transition-colors ${
                          selectedSubmissionStatus === option.value
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search submissions..."
                      value={submissionSearchQuery}
                      onChange={(e) => setSubmissionSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Submitted At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {submission.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {submission.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {submission.phone || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-sm font-semibold rounded-full ${
                              statusColors[
                                submission.status as keyof typeof statusColors
                              ]
                            }`}
                          >
                            {submission.status.charAt(0).toUpperCase() +
                              submission.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(submission.submittedAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/admin/dashboard/submissions/${submission.id}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-primary hover:text-primary/90"
                            >
                              View Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
