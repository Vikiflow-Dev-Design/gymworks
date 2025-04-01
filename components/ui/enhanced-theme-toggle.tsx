"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function EnhancedThemeToggle({
  size = "default",
}: {
  size?: "default" | "sm";
}) {
  const { setTheme, theme } = useTheme();

  const sizeClasses = {
    default: {
      container: "px-4 py-2 lg:px-4 lg:py-2 md:px-3 md:py-1.5 sm:px-2 sm:py-1",
      button:
        "px-3 py-2 lg:px-3 lg:py-2 md:px-2 md:py-1.5 sm:px-1.5 sm:py-1 space-x-2 sm:space-x-1.5",
      icon: "h-5 w-5 lg:h-5 lg:w-5 md:h-4 md:w-4 sm:h-3.5 sm:w-3.5",
      text: "block lg:block md:text-sm sm:text-xs",
    },
    sm: {
      container:
        "px-3 py-2 lg:px-3 lg:py-2 md:px-2 md:py-1.5 sm:px-1.5 sm:py-1",
      button:
        "px-3 py-1.5 lg:px-3 lg:py-1.5 md:px-2 md:py-1 sm:px-1.5 sm:py-0.5 space-x-2 sm:space-x-1.5",
      icon: "h-4 w-4 lg:h-4 lg:w-4 md:h-3.5 md:w-3.5 sm:h-3 sm:w-3",
      text: "block lg:hidden md:text-sm sm:text-xs",
    },
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center space-x-2 bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/20 dark:border-primary/30 shadow-sm ${sizeClasses.container}`}
    >
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center rounded-full transition-all ${
          sizeClasses.button
        } ${
          theme === "light"
            ? "bg-white text-primary shadow-sm font-medium"
            : "text-gray-600 hover:bg-white/70"
        }`}
      >
        <Sun className={sizeClasses.icon} />
        <span className={sizeClasses.text}>Light</span>
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center rounded-full transition-all ${
          sizeClasses.button
        } ${
          theme === "dark"
            ? "bg-gray-800 text-primary shadow-sm font-medium"
            : "text-gray-600 hover:bg-gray-800/20"
        }`}
      >
        <Moon className={sizeClasses.icon} />
        <span className={sizeClasses.text}>Dark</span>
      </button>
    </motion.div>
  );
}
