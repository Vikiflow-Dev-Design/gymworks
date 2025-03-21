"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AccountDropdown() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Placeholder for authentication state management
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const handleSignOut = async () => {
    // Placeholder for sign out logic
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" asChild>
          <a href="/auth/login">Log in</a>
        </Button>
        <Button asChild>
          <a href="/auth/signup">Sign up</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button variant="ghost" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
