"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { formatNaira } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { benefits } from "./benefits/data";
import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import {
  registerMembership,
  getUserMemberships,
  checkMembership,
} from "../actions/membership";
import { toast } from "sonner";
import { getPlans } from "../actions/plans";

// Define the Plan interface
interface Plan {
  _id: string;
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

// Define the MembershipDocument interface
interface MembershipDocument {
  _id: string;
  // userId: string;
  planId: string;
  planName: string;
  price: number;
  features: string[];
  startDate: string;
  endDate: string;
  status: string;
  paymentStatus: string;
}

// Add skeleton loader component
const PlanSkeleton = () => (
  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="p-8">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="flex items-baseline mb-8">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 ml-2"></div>
      </div>
      <div className="space-y-4 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
    </div>
  </div>
);

const durations = [
  { value: "month", label: "Monthly" },
  { value: "3 months", label: "3 Months" },
  { value: "6 months", label: "6 Months" },
  { value: "year", label: "Annual" },
];

export default function Membership() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [selectedDuration, setSelectedDuration] = useState<string>("month");
  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [userMemberships, setUserMemberships] = useState<MembershipDocument[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [activeMemberships, setActiveMemberships] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const plansData = await getPlans();
        setAllPlans(plansData);

        if (isSignedIn && user) {
          // Check active memberships for each plan
          const membershipsMap = {};
          for (const plan of plansData) {
            const membership = await checkMembership(user.id, plan._id);
            if (membership) {
              membershipsMap[plan._id] = membership;
            }
          }
          setActiveMemberships(membershipsMap);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Failed to load membership plans");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isSignedIn, user]);

  // Filter plans based on selected duration
  const filteredPlans = allPlans.filter(
    (plan) => plan.duration === selectedDuration
  );

  const handleSubscribe = async (planId: string) => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    try {
      setProcessingPayment(true);

      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": user.emailAddresses[0].emailAddress,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Payment initialization failed");
      }

      // Redirect to Paystack payment page
      window.location.href = data.data.authorizationUrl;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment");
      setProcessingPayment(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

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
            {filteredPlans.map((plan) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border-2 ${
                  plan.popular ? "border-primary" : "border-transparent"
                }`}
              >
                {plan.popular && (
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl font-bold mt-4 dark:text-white">
                  {plan.name}
                </h3>

                <div className="mt-2 mb-6">
                  <span className="text-4xl font-bold dark:text-white">
                    ₦{plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /{plan.duration}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        className="w-4 h-4 mr-3 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={processingPayment}
                  onClick={() => handleSubscribe(plan._id)}
                >
                  {processingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : activeMemberships[plan._id] ? (
                    "Renew Plan"
                  ) : (
                    "Get Started"
                  )}
                </Button>
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
