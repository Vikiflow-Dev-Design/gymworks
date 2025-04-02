"use client";

import { useState, useEffect } from "react";
import { SubmissionDetailsSkeleton } from "@/app/components/skeletons/SubmissionDetailsSkeleton";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getFreeTrialRequest } from "@/app/actions/getFreeTrialRequest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SubmissionDetails() {
  const { id } = useParams();
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await getFreeTrialRequest(id as string);
        if (response.success) {
          setSubmission(response.data);
        } else {
          console.error(response.error);
          setSubmission(null);
        }
      } catch (error) {
        console.error("Error fetching submission:", error);
        setSubmission(null);
      }
      setLoading(false);
    };

    fetchSubmission();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      // In a real application, this would be an API call
      // For now, we'll just update the local state
      setSubmission((prev: any) => ({
        ...prev,
        status: newStatus,
      }));

      // Show success message (you might want to add a toast notification here)
      console.log(`Status successfully updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error (you might want to add error notification here)
    }
  };

  if (loading) {
    return <SubmissionDetailsSkeleton />;
  }

  if (!submission) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Submission Not Found</h2>
          <p className="text-gray-600 mb-6">
            The requested submission does not exist.
          </p>
          <Link href="/admin/dashboard">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    contacted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    scheduled:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">
            Submission Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage form submission information
          </p>
        </div>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Name
                  </label>
                  <p className="text-lg font-medium dark:text-white">
                    {`${submission.firstName} ${submission.lastName}`}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </label>
                  <p className="text-lg font-medium dark:text-white">
                    {submission.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </label>
                  <p className="text-lg font-medium dark:text-white">
                    {submission.phone || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Submission Details
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </label>
                    <div className="flex items-center space-x-4">
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
                      <Select
                        value={submission.status}
                        onValueChange={handleStatusUpdate}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select new status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      Submitted At
                    </label>
                    <p className="text-lg font-medium dark:text-white">
                      {new Date(submission.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Fitness Goals
                  </label>
                  <p className="text-lg font-medium dark:text-white whitespace-pre-wrap">
                    {submission.fitnessGoals}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Actions
            </h2>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                Delete Submission
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
