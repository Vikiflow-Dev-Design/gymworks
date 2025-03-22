/**
 * Payment Failed Page Component
 * Displayed when a payment fails or encounters an error.
 * Shows error message and provides options to retry or get support.
 */

"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Renders the payment failed page with error details and retry options
 * @returns {JSX.Element} The rendered failure page component
 */
export default function PaymentFailedPage() {
  // Get error details from URL parameters
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const reference = searchParams.get("reference");

  /**
   * Gets the appropriate error message based on the error type
   * @returns {string} Human-readable error message
   */
  const getErrorMessage = () => {
    switch (error) {
      case "no_reference":
        return "No payment reference found.";
      case "transaction_not_found":
        return "Transaction could not be found.";
      case "payment_failed":
        return "Payment was not successful.";
      case "verification_failed":
        return "Payment verification failed.";
      default:
        return "An error occurred during payment.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm"
        >
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Payment Failed
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {getErrorMessage()}
          </p>
          {reference && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              Transaction Reference: {reference}
            </p>
          )}
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/membership">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/support">Contact Support</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
