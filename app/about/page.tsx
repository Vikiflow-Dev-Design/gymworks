"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Users, Trophy, Clock } from "lucide-react";
import { WEBSITE_NAME } from "@/lib/utils";

const stats = [
  { icon: Users, value: "5000+", label: "Happy Members" },
  { icon: Trophy, value: "15+", label: "Years Experience" },
  { icon: CheckCircle, value: "100+", label: "Expert Trainers" },
  { icon: Clock, value: "24/7", label: "Gym Access" },
];

const values = [
  {
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from our facilities to our training programs.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
  },
  {
    title: "Community",
    description:
      "Building a supportive community where everyone feels welcome and motivated.",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075",
  },
  {
    title: "Innovation",
    description:
      "Constantly evolving and incorporating the latest fitness trends and technology.",
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070",
  },
];

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069"
          alt="Gym interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            About {WEBSITE_NAME}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Transforming lives through fitness since 2008
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-xl text-gray-600">
              Founded in 2008, {WEBSITE_NAME} began with a simple mission: to
              create a fitness community that empowers people to achieve their
              health and wellness goals. What started as a small local gym has
              grown into a state-of-the-art fitness center, serving thousands of
              members with cutting-edge equipment and expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">
                      {value.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
