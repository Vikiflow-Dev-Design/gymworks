"use client";

import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pt-20 pb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* Sign In Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 mx-auto"
          >
            <SignIn />
            <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
              <p>
                Don't have an account?{" "}
                <Link href="/auth/sign-in">
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Welcome and Cloudflare Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block space-y-6"
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-8">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                Welcome to GymWorks
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Your journey to fitness excellence starts here. Join our
                community of dedicated fitness enthusiasts and transform your
                life.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h2 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Important: Cloudflare Verification
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                Please complete the Cloudflare verification checkbox when
                prompted.
              </p>
              <Image
                src="/cloudflare.gif"
                alt="Cloudflare Verification"
                width={280}
                height={100}
                className="rounded-md mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
