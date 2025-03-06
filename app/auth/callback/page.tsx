"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get("code");

      if (code) {
        try {
          await supabase.auth.exchangeCodeForSession(code);
          router.push("/profile");
        } catch (error) {
          console.error("Error exchanging code for session:", error);
          router.push("/auth/login?error=Unable to verify your account");
        }
      } else {
        router.push("/auth/login");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Verifying your account...
        </h2>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
