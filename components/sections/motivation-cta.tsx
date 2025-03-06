"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MotivationCTAProps {
  title: string;
  description: string;
  buttonText: string;
  variant?: "primary" | "dark" | "gradient" | "black";
  secondaryButton?: { text: string; href: string };
  listItems?: string[];
}

const MotivationCTA = ({
  title,
  description,
  buttonText,
  variant = "primary",
  secondaryButton,
  listItems,
}: MotivationCTAProps) => {
  const bgClass = {
    primary: "bg-gradient-to-br from-primary to-primary/90",
    dark: "bg-gradient-to-br from-gray-900 to-gray-800",
    gradient: "bg-gradient-to-r from-primary via-primary/90 to-primary/80",
    black: "bg-gradient-to-br from-black to-gray-900",
  }[variant];

  return (
    <section className={`relative py-24 ${bgClass} overflow-hidden`}>
      {/* Decorative background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {title}
              </h2>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                {description}
              </p>
              {listItems && (
                <ul className="text-lg mb-8 space-y-4 text-left max-w-xl mx-auto">
                  {listItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center text-gray-100 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors"
                    >
                      <span className="text-primary bg-white rounded-full p-1 mr-3">
                        ✓
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/membership">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6"
                  >
                    {buttonText}
                  </Button>
                </Link>
                {secondaryButton && (
                  <Link href={secondaryButton.href}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white bg-transparent text-white hover:bg-white/20 hover:text-white text-lg px-8 py-6"
                    >
                      {secondaryButton.text}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MotivationCTA;
