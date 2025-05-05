"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, differenceInDays } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  User,
  Package,
  AlertCircle,
  Clock,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

type Membership = {
  _id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: string;
  planName: string;
  paymentStatus: string;
  // New fields from our updated serialization
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  plan?: {
    name: string;
    duration: string;
  };
};

type PaginationInfo = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [filteredMemberships, setFilteredMemberships] = useState<Membership[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStatus, setCurrentStatus] = useState("all");
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    fetchMemberships(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    filterMemberships();
  }, [searchQuery, currentStatus, memberships]);

  const fetchMemberships = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/memberships?page=${page}&limit=${limit}`
      );
      const data = await response.json();

      if (data.success && Array.isArray(data.memberships)) {
        setMemberships(data.memberships);
        setPagination(data.pagination);
      } else {
        setMemberships([]);
        console.error("Error fetching memberships:", data.error);
      }
    } catch (error) {
      console.error("Error fetching memberships:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterMemberships = () => {
    let filtered = [...memberships];

    // Filter by status
    if (currentStatus !== "all") {
      filtered = filtered.filter(
        (membership) => membership.status === currentStatus
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((membership) => {
        const memberName = membership.user
          ? `${membership.user.firstName} ${membership.user.lastName}`.toLowerCase()
          : "";
        const email = membership.user
          ? membership.user.email.toLowerCase()
          : "";
        const plan = (
          membership.plan ? membership.plan.name : membership.planName || ""
        ).toLowerCase();

        return (
          memberName.includes(query) ||
          email.includes(query) ||
          plan.includes(query)
        );
      });
    }

    setFilteredMemberships(filtered);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "expired":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      case "cancelled":
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    }
  };

  // Get payment status badge color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 pt-24 pb-16 space-y-6 min-h-screen flex flex-col"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Memberships
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and review all membership plans
          </p>
        </motion.div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search members..."
            className="pl-8 bg-white dark:bg-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="overflow-hidden border-0 shadow-md bg-white dark:bg-gray-800 flex-1">
        <CardHeader className="bg-gray-50 dark:bg-gray-900 px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <CardTitle className="text-gray-800 dark:text-gray-200 text-lg font-medium">
            Membership Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setCurrentStatus}
          >
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              {renderMembershipTable()}
            </TabsContent>
            <TabsContent value="active" className="mt-0">
              {renderMembershipTable()}
            </TabsContent>
            <TabsContent value="expired" className="mt-0">
              {renderMembershipTable()}
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              {renderMembershipTable()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );

  function renderMembershipTable() {
    if (loading) {
      return (
        <div className="p-6 space-y-4 min-h-[50vh] flex flex-col justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (filteredMemberships.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 min-h-[50vh]">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            No memberships found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center mt-2 max-w-md">
            {searchQuery
              ? "No results match your search criteria. Try a different search term."
              : `There are no ${
                  currentStatus !== "all" ? currentStatus : ""
                } memberships to display at this time.`}
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="overflow-x-auto min-h-[50vh]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900">
                <TableHead className="font-medium text-gray-700 dark:text-gray-300 w-[200px]">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Member
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Plan
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Status
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Payment
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMemberships.map((membership) => (
                <TableRow
                  key={membership._id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {membership.user ? (
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {membership.user.firstName.charAt(0)}
                          {membership.user.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {membership.user.firstName}{" "}
                            {membership.user.lastName}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        N/A
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {membership.user ? (
                      <span className="text-gray-600 dark:text-gray-300">
                        {membership.user.email}
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        N/A
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {membership.plan ? (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                      >
                        {membership.plan.name}
                      </Badge>
                    ) : membership.planName ? (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                      >
                        {membership.planName}
                      </Badge>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        N/A
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 dark:text-gray-300">
                      {format(new Date(membership.startDate), "MMM dd, yyyy")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 dark:text-gray-300">
                      {format(new Date(membership.endDate), "MMM dd, yyyy")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(membership.status)}>
                      {membership.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getPaymentStatusColor(
                        membership.paymentStatus
                      )}
                    >
                      {membership.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/dashboard/memberships/${membership._id}`}
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredMemberships.length} of {pagination.totalCount}{" "}
            memberships
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrevPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </>
    );
  }
}
