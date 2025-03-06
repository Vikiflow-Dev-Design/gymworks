"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/gallery";
import MotivationCTA from "@/components/sections/motivation-cta";

const categories = [
  "All",
  "CrossFit",
  "Strength",
  "Conditioning",
  "Olympic Lifting",
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((image) => image.category === selectedCategory);

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
            {`${process.env.NEXT_PUBLIC_WEBSITE_NAME} Elite Facilities`}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Experience our state-of-the-art CrossFit box, recovery spa, and
            premium training facilities
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`
                  transition-all duration-300
                  ${
                    selectedCategory === category
                      ? "bg-primary hover:bg-primary/90 scale-105"
                      : "hover:scale-105"
                  }
                `}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                    priority={index < 6}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h3 className="text-2xl font-bold mb-2">
                          {image.title}
                        </h3>
                        <p className="text-gray-200">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1 dark:text-white">
                    {image.title}
                  </h3>
                  <span className="text-primary text-sm">{image.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation CTA */}
      <MotivationCTA
        title="Experience Our World-Class Facilities"
        description="Join us today and get access to all our premium amenities. Start your fitness journey in a state-of-the-art environment."
        buttonText="Join Now"
        variant="dark"
        listItems={[
          "Modern Gym Equipment",
          "Luxury Spa & Wellness Center",
          "Olympic-Size Swimming Pool",
          "Professional Training Areas",
        ]}
        secondaryButton={{
          text: "Schedule a Tour",
          href: "/contact",
        }}
      />
    </main>
  );
}
