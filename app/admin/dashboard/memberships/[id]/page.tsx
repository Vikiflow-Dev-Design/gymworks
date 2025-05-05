"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  Package,
} from "lucide-react";

type Membership = {
  _id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: string;
  planName: string;
  paymentStatus: string;
  price: number;
  features: string[];
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    phone?: string;
  };
  plan?: {
    name: string;
    duration: string;
    price: number;
    features: string[];
  };
};

export default function MembershipDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembershipDetails();
  }, []);

  const fetchMembershipDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/memberships/${params.id}`);
      const data = await response.json();

      if (data.success && data.membership) {
        setMembership(data.membership);
      } else {
        setError(data.error || "Failed to fetch membership details");
      }
    } catch (error) {
      console.error("Error fetching membership details:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
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
      className="p-6 pt-24 pb-16 space-y-6 min-h-screen"
    >
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/dashboard/memberships">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Memberships
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Membership Details
        </h1>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-flex mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Error Loading Membership
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <Button onClick={fetchMembershipDetails}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      ) : membership ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Member Information */}
          <Card className="md:col-span-1">
            <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-medium">Member Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-3">
                  {membership.user?.firstName?.charAt(0) || ""}
                  {membership.user?.lastName?.charAt(0) || ""}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {membership.user?.firstName} {membership.user?.lastName}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{membership.user?.email || "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white">{membership.user?.phone || "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                    <p className="text-gray-900 dark:text-white break-all">{membership.userId}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership Details */}
          <Card className="md:col-span-2">
            <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-medium">Membership Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Plan</h3>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        {membership.plan?.name || membership.planName}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Price</h3>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        ₦{membership.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Status</h3>
                    <Badge className={getStatusColor(membership.status)}>
                      {membership.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Status</h3>
                    <Badge className={getPaymentStatusColor(membership.paymentStatus)}>
                      {membership.paymentStatus}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Start Date</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-gray-900 dark:text-white">
                        {format(new Date(membership.startDate), "MMMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">End Date</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-gray-900 dark:text-white">
                        {format(new Date(membership.endDate), "MMMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Duration</h3>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-gray-900 dark:text-white">
                        {membership.plan?.duration || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Features</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <ul className="space-y-2">
                    {membership.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                    {(!membership.features || membership.features.length === 0) && (
                      <li className="text-gray-500 dark:text-gray-400">No features listed</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Membership Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The membership you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/admin/dashboard/memberships">
                <Button>Back to Memberships</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
