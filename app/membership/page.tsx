"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { monthlyPlans, annualPlans, type Plan } from "./data";
import { formatNaira } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { benefits } from "./benefits/data";

const durations = [
  { value: "month", label: "Monthly" },
  { value: "3 months", label: "3 Months" },
  { value: "6 months", label: "6 Months" },
  { value: "year", label: "Annual" },
];

const allPlans = [...monthlyPlans, ...annualPlans];

export default function Membership() {
  const [selectedDuration, setSelectedDuration] = useState<string>("month");
  const plans = allPlans.filter((plan) => plan.duration === selectedDuration);

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
            {process.env.NEXT_PUBLIC_WEBSITE_NAME} Membership Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Join our elite CrossFit community and transform your fitness journey
          </motion.p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          {/* Duration Filter */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
            {durations.map((duration) => (
              <Button
                key={duration.value}
                onClick={() => setSelectedDuration(duration.value)}
                variant={
                  selectedDuration === duration.value ? "default" : "outline"
                }
                className={`
                  transition-all duration-300
                  ${
                    selectedDuration === duration.value
                      ? "bg-primary hover:bg-primary/90 scale-105"
                      : "hover:scale-105"
                  }
                `}
              >
                {duration.label}
              </Button>
            ))}
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? "border-2 border-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      Popular
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-bold">
                      {formatNaira(plan.price)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      /{plan.duration}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Are there any signup fees?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No, we don't charge any signup or initiation fees. The price you
                see is the price you pay.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Can I cancel my membership anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can cancel your membership at any time. For monthly
                plans, cancellation will take effect at the end of your current
                billing period.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Can I freeze my membership?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can freeze your membership for up to 3 months per year.
                Contact our support team to arrange this.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Are there any discounts for students?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer special student discounts with valid student ID.
                Contact us for more information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Membership Benefits</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experience premium fitness with our comprehensive membership
              benefits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/membership/benefits/${benefit.id}`}
                  className="block group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-72">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {benefit.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-primary font-semibold">
                      Learn more
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8">
              Join our community today and transform your life through fitness
            </p>
            <Link href="/membership">
              <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
                Join Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
