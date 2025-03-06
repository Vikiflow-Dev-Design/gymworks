"use client";

import { notFound } from "next/navigation";
import { programs } from "@/data/programs";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  Dumbbell,
  Users,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programs.find((p) => p.id === params.slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container px-4 mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-4"
            >
              {program.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-200 max-w-2xl"
            >
              {program.description}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                About the Program
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {program.longDescription}
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Equipment */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Equipment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.equipment.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Dumbbell className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Instructors */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Program Instructors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.instructors.map((instructor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {instructor}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {program.faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium mb-2 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 dark:text-white">
                <Calendar className="w-5 h-5" />
                <span>Schedule</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(program.schedule).map(([day, times]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="font-medium dark:text-white">{day}</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {times[0]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 dark:text-white">
                <CheckCircle2 className="w-5 h-5" />
                <span>Requirements</span>
              </h3>
              <ul className="space-y-2">
                {program.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="text-gray-600 dark:text-gray-300 flex items-center space-x-2"
                  >
                    <span>•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 dark:text-white">
                <DollarSign className="w-5 h-5" />
                <span>Pricing</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium dark:text-white">Monthly</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatNaira(program.pricing.monthly)}
                    </span>
                  </div>
                  <Button className="w-full">Select Monthly Plan</Button>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium dark:text-white">
                      Quarterly
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {formatNaira(program.pricing.quarterly)}
                    </span>
                  </div>
                  <Button className="w-full">Select Quarterly Plan</Button>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium dark:text-white">Yearly</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatNaira(program.pricing.yearly)}
                    </span>
                  </div>
                  <Button className="w-full">Select Yearly Plan</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
