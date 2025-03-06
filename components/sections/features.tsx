"use client";

import { motion } from "framer-motion";
import { Dumbbell, Users, Trophy, Heart } from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Elite CrossFit Equipment",
    description:
      "Train with top-quality rigs, barbells, plates, and functional fitness equipment.",
  },
  {
    icon: Users,
    title: "Certified CrossFit Coaches",
    description:
      "Learn from experienced, CrossFit-certified coaches who prioritize form and safety.",
  },
  {
    icon: Trophy,
    title: "Competition Programming",
    description:
      "Follow proven CrossFit programming designed for both beginners and competitors.",
  },
  {
    icon: Heart,
    title: "CrossFit Community",
    description:
      "Join a tight-knit community that pushes each other to achieve more every day.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Features = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 dark:text-white"
        >
          Why Choose Us
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
