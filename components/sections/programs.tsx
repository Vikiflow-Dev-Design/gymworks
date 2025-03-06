"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { programs } from "@/data/programs";
import { formatNaira } from "@/lib/utils";

const Programs = () => {
  // Select the first three programs
  const featuredPrograms = programs.slice(0, 3);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">
            Featured CrossFit Programs at {process.env.NEXT_PUBLIC_WEBSITE_NAME}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the transformative power of CrossFit at {process.env.NEXT_PUBLIC_WEBSITE_NAME} with our
            comprehensive training programs designed for all fitness levels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={`/programs/${program.id}`}>
                <div
                  className="relative h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${program.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {program.title}
                      </h3>
                      <p className="text-gray-200">{program.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-4">
                    {program.features.slice(0, 5).map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/programs">
            <Button variant="outline" size="lg">
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;
