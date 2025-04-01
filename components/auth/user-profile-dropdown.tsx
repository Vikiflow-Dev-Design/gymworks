"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  User,
  Settings,
  LogOut,
  Calendar,
  Dumbbell,
  Heart,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface UserProfileDropdownProps {
  setMobileMenuOpen?: (isOpen: boolean) => void;
}

export default function UserProfileDropdown({
  setMobileMenuOpen,
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    setIsOpen(false);
    setMobileMenuOpen?.(false);
  };

  if (!isLoaded) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!user) return null;

  const menuItems = [{ label: "Profile", icon: User, href: "/profile" }];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.fullName || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center">
              {(
                user.fullName?.[0] || user.emailAddresses[0].emailAddress[0]
              ).toUpperCase()}
            </div>
          )}
        </div>
        <span className="hidden md:inline-block font-medium">
          {user.fullName || user.emailAddresses[0].emailAddress.split("@")[0]}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-lg border bg-background shadow-lg"
          >
            <div className="p-4 border-b">
              <p className="font-medium">{user.fullName}</p>
              <p className="text-sm text-gray-500">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>

            <nav className="p-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-accent"
                  onClick={() => {
                    setIsOpen(false);
                    setMobileMenuOpen?.(false);
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-accent text-red-500 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
