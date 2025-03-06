'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dumbbell } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Dumbbell Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -45, 45, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="mb-8 inline-block text-primary"
          >
            <Dumbbell size={64} />
          </motion.div>

          {/* 404 Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Looks Like You've Missed Your Rep!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Don't worry, even the best athletes take wrong turns. Let's get you back on track!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button size="lg" className="min-w-[200px]">
                Back to Homepage
              </Button>
            </Link>
            <Link href="/membership">
              <Button 
                size="lg" 
                variant="outline"
                className="min-w-[200px]"
              >
                View Memberships
              </Button>
            </Link>
          </motion.div>

          {/* Motivational Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-gray-600 dark:text-gray-400 italic"
          >
            "Every wrong turn is just another rep in life's workout."
          </motion.p>
        </div>
      </div>
    </main>
  )
}
