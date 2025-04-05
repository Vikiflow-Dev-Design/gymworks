"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

type ExpiredMembership = {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  planId: {
    name: string;
    duration: string;
  };
  startDate: string;
  endDate: string;
  status: string;
};

export default function ExpiredMemberships() {
  const [expiredMemberships, setExpiredMemberships] = useState<
    ExpiredMembership[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpiredMemberships();
  }, []);

  const fetchExpiredMemberships = async () => {
    try {
      const response = await fetch("/api/memberships/expired");
      const data = await response.json();
      if (data.success && Array.isArray(data.expiredMemberships)) {
        setExpiredMemberships(data.expiredMemberships);
      } else {
        setExpiredMemberships([]);
        console.error("Error fetching expired memberships:", data.error);
      }
    } catch (error) {
      console.error("Error fetching expired memberships:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expired Memberships</h1>
      </div>

      <Card className="p-6">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expiredMemberships.map((membership) => (
                <TableRow key={membership._id}>
                  <TableCell>
                    {membership.userId.firstName} {membership.userId.lastName}
                  </TableCell>
                  <TableCell>{membership.userId.email}</TableCell>
                  <TableCell>{membership.planId.name}</TableCell>
                  <TableCell>
                    {format(new Date(membership.startDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(membership.endDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-800">
                      {membership.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </motion.div>
  );
}
