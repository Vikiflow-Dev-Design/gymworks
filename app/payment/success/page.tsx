/**
 * Payment Success Page Component
 * Displayed when a payment is successfully processed.
 * Shows confirmation message and provides navigation options.
 */

"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Renders the payment success page with animation and navigation options
 * @returns {JSX.Element} The rendered success page component
 */
export default function PaymentSuccessPage() {
  // Get transaction reference from URL parameters
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your membership has been activated successfully.
          </p>
          {reference && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              Transaction Reference: {reference}
            </p>
          )}
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/membership">View Membership</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
