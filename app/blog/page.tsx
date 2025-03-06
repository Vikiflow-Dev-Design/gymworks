"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { allPosts } from "./data";
import { WEBSITE_NAME } from "@/lib/utils";
import MotivationCTA from "@/components/sections/motivation-cta";

const categories = [
  "All",
  "CrossFit WODs",
  "Olympic Lifting",
  "Nutrition",
  "Competition",
  "Success Stories",
  "Community",
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return selectedCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const featuredPosts = useMemo(() => {
    return filteredPosts.filter((post) => post.featured);
  }, [filteredPosts]);

  const recentPosts = useMemo(() => {
    return filteredPosts.filter((post) => !post.featured);
  }, [filteredPosts]);

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
            {WEBSITE_NAME} Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Expert advice, tips, and insights for your fitness journey
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`
                  transition-all duration-300
                  ${
                    selectedCategory === category
                      ? "bg-primary hover:bg-primary/90 scale-105"
                      : "hover:scale-105"
                  }
                `}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-24">
          <div className="container px-4 mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-12"
            >
              Featured Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="wait">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <Link
                      href={`/blog/${post.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`}
                      className="block"
                    >
                      <div className="relative h-64">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {post.excerpt}
                        </p>
                        <span className="text-primary font-semibold inline-flex items-center">
                          Read More
                          <svg
                            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-12"
            >
              Recent Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {recentPosts.map((post, index) => (
                  <motion.article
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <Link
                      href={`/blog/${post.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`}
                      className="block"
                    >
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <span className="text-primary font-semibold inline-flex items-center">
                          Read More
                          <svg
                            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <section className="py-24">
          <div className="container px-4 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We couldn't find any articles in the {selectedCategory}{" "}
                category.
              </p>
              <Button
                onClick={() => setSelectedCategory("All")}
                className="bg-primary hover:bg-primary/90"
              >
                View All Articles
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Motivation CTA */}
      <MotivationCTA
        title="Stay Updated with Expert Fitness Tips"
        description="Subscribe to our newsletter and get exclusive fitness content, workout tips, and special offers delivered to your inbox."
        buttonText="Subscribe Now"
        variant="black"
        listItems={[
          "Weekly Workout Plans",
          "Nutrition Tips & Recipes",
          "Expert Fitness Advice",
          "Member Success Stories",
        ]}
        secondaryButton={{
          text: "View All Articles",
          href: "/blog",
        }}
      />
    </main>
  );
}
