"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_NAME } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/70 before:to-black/40">
      {/* Content */}
      <div className="relative z-10 container px-4 mx-auto text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-primary font-semibold text-lg md:text-xl mb-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          Welcome to {WEBSITE_NAME}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Forge Elite Fitness
          <br />
          <span className="text-primary">Through CrossFit</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200"
        >
          Join {WEBSITE_NAME}'s CrossFit community and experience the transformative power
          of functional fitness, expert coaching, and a supportive environment.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link href="/membership">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              Start Your Journey
            </Button>
          </Link>
          <Link href="/programs">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent text-white hover:bg-white/10 border-2 border-white/20 hover:border-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              View Programs
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1 backdrop-blur-sm">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>

      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/0 to-black/30 pointer-events-none" />
    </section>
  );
};

export default Hero;
