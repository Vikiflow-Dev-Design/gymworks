"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Linkedin,
  Calendar,
  Award,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trainers } from "@/data/trainers";
import { notFound } from "next/navigation";
import { toast } from "sonner";

export default function TrainerProfile({
  params,
}: {
  params: { slug: string };
}) {
  const trainer = trainers.find((t) => t.id === params.slug);

  if (!trainer) {
    notFound();
  }

  return (
    <main className="min-h-screen py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Left Column - Image and Social Links */}
          <div className="lg:col-span-1">
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden mb-6">
              <Image
                src={trainer.image}
                alt={trainer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-center gap-6">
              {trainer.socialMedia.instagram && (
                <button
                  className="text-gray-600 hover:text-primary transition-colors"
                  onClick={() => {
                    toast.info(`Connect with ${trainer.name} on Instagram`, {
                      description: "Social media links are currently disabled.",
                    });
                  }}
                >
                  <Instagram size={24} />
                </button>
              )}
              {trainer.socialMedia.twitter && (
                <button
                  className="text-gray-600 hover:text-primary transition-colors"
                  onClick={() => {
                    toast.info(`Connect with ${trainer.name} on Twitter`, {
                      description: "Social media links are currently disabled.",
                    });
                  }}
                >
                  <Twitter size={24} />
                </button>
              )}
              {trainer.socialMedia.linkedin && (
                <button
                  className="text-gray-600 hover:text-primary transition-colors"
                  onClick={() => {
                    toast.info(`Connect with ${trainer.name} on LinkedIn`, {
                      description: "Social media links are currently disabled.",
                    });
                  }}
                >
                  <Linkedin size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Trainer Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{trainer.name}</h1>
              <p className="text-primary text-xl font-medium mb-4">
                {trainer.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {trainer.bio}
              </p>
            </div>

            {/* Experience and Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="text-primary" size={24} />
                  <h2 className="text-xl font-bold">Experience</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {trainer.experience}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-primary" size={24} />
                  <h2 className="text-xl font-bold">Certifications</h2>
                </div>
                <ul className="space-y-2">
                  {trainer.certifications.map((cert, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      • {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h2 className="text-xl font-bold mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {trainer.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-primary" size={24} />
                <h2 className="text-xl font-bold">Weekly Schedule</h2>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(trainer.schedule).map(([day, times]) => (
                    <div
                      key={day}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-2"
                    >
                      <h3 className="font-medium mb-2">{day}</h3>
                      {times.map((time, index) => (
                        <p
                          key={index}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {time}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Book Session Button */}
            <Button size="lg" className="w-full md:w-auto">
              Book a Session
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
