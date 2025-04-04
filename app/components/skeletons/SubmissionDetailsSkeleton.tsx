import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function SubmissionDetailsSkeleton() {
  return (
    <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        </div>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Name", "Email", "Phone"].map((label) => (
                  <div key={label}>
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-4" />
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
                    <div className="flex items-center space-x-4">
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                      <div className="h-10 w-[180px] bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
                    <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
                  <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}