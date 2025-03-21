"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { EnhancedThemeToggle } from "../ui/enhanced-theme-toggle";
import { cn, WEBSITE_NAME } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "../icons/logo";

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import UserProfileDropdown from "../auth/user-profile-dropdown";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/trainers", label: "Trainers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/membership", label: "Membership" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold text-xl flex-shrink-0"
        >
          <Logo className="w-8 h-8 text-primary" />
          <span>{WEBSITE_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-primary transition-colors relative py-1 px-3",
                pathname === link.href
                  ? "text-primary font-medium after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:content-['']"
                  : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <EnhancedThemeToggle size="sm" />
          <div className="hidden lg:block">
            <SignedOut>
              <div className="flex items-center space-x-2">
                <Link href="/auth/sign-in">
                  <Button variant="default" size="sm">
                    Sign in
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <UserProfileDropdown />
            </SignedIn>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div className="container py-4 space-y-3 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block transition-colors py-2 px-3 rounded-lg",
                    pathname === link.href
                      ? "text-primary font-medium bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="py-2">
                <SignedOut>
                  <div className="flex flex-col space-y-2">
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="w-full" size="sm">
                        Sign in
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button variant="default" className="w-full" size="sm">
                        Sign up
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <UserProfileDropdown />
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
