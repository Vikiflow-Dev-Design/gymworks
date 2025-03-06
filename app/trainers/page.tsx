"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { trainers } from "@/data/trainers";
import { toast } from "sonner";

export default function Trainers() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            {`${process.env.NEXT_PUBLIC_WEBSITE_NAME} Elite Coaches`}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Train with our certified CrossFit professionals dedicated to your
            success
          </motion.p>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group"
              >
                <Link href={`/trainers/${trainer.id}`} className="block">
                  <div className="relative h-80">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {trainer.name}
                      </h3>
                      <p className="text-primary font-medium">{trainer.role}</p>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trainer.specialties.slice(0, 3).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                    {trainer.bio}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {trainer.socialMedia.instagram && (
                        <button
                          className="text-white hover:text-primary transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toast.info(
                              `Connect with ${trainer.name} on Instagram`,
                              {
                                description:
                                  "Social media links are currently disabled.",
                              }
                            );
                          }}
                        >
                          <Instagram className="w-5 h-5" />
                        </button>
                      )}
                      {trainer.socialMedia.twitter && (
                        <button
                          className="text-white hover:text-primary transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toast.info(
                              `Connect with ${trainer.name} on Twitter`,
                              {
                                description:
                                  "Social media links are currently disabled.",
                              }
                            );
                          }}
                        >
                          <Twitter className="w-5 h-5" />
                        </button>
                      )}
                      {trainer.socialMedia.linkedin && (
                        <button
                          className="text-white hover:text-primary transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toast.info(
                              `Connect with ${trainer.name} on LinkedIn`,
                              {
                                description:
                                  "Social media links are currently disabled.",
                              }
                            );
                          }}
                        >
                          <Linkedin className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <Link href={`/trainers/${trainer.id}`}>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-xl mb-8">
              Book a session with one of our expert trainers and begin your
              transformation
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Book a Session
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
