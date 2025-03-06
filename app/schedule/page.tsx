"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const classes = {
  Monday: [
    {
      time: "06:00",
      name: "Morning Yoga",
      trainer: "Sarah Johnson",
      duration: "60 min",
      spots: 15,
    },
    {
      time: "08:00",
      name: "HIIT",
      trainer: "Mike Thompson",
      duration: "45 min",
      spots: 20,
    },
    {
      time: "10:00",
      name: "Spin Class",
      trainer: "Emily Davis",
      duration: "45 min",
      spots: 25,
    },
    {
      time: "17:00",
      name: "Boxing",
      trainer: "James Wilson",
      duration: "60 min",
      spots: 15,
    },
    {
      time: "19:00",
      name: "Pilates",
      trainer: "Lisa Anderson",
      duration: "60 min",
      spots: 20,
    },
  ],
  Tuesday: [
    {
      time: "07:00",
      name: "CrossFit",
      trainer: "John Smith",
      duration: "60 min",
      spots: 12,
    },
    {
      time: "09:00",
      name: "Zumba",
      trainer: "Maria Garcia",
      duration: "45 min",
      spots: 30,
    },
    {
      time: "16:00",
      name: "Strength Training",
      trainer: "David Brown",
      duration: "60 min",
      spots: 15,
    },
    {
      time: "18:00",
      name: "Yoga Flow",
      trainer: "Sarah Johnson",
      duration: "60 min",
      spots: 20,
    },
    {
      time: "20:00",
      name: "Core Blast",
      trainer: "Mike Thompson",
      duration: "30 min",
      spots: 25,
    },
  ],
  Wednesday: [
    {
      time: "06:00",
      name: "HIIT",
      trainer: "Mike Thompson",
      duration: "45 min",
      spots: 20,
    },
    {
      time: "08:00",
      name: "Pilates",
      trainer: "Lisa Anderson",
      duration: "60 min",
      spots: 15,
    },
    {
      time: "10:00",
      name: "Boxing",
      trainer: "James Wilson",
      duration: "60 min",
      spots: 15,
    },
    {
      time: "17:00",
      name: "Spin Class",
      trainer: "Emily Davis",
      duration: "45 min",
      spots: 25,
    },
    {
      time: "19:00",
      name: "Yoga",
      trainer: "Sarah Johnson",
      duration: "60 min",
      spots: 20,
    },
  ],
  Thursday: [
    {
      time: "07:00",
      name: "Strength Training",
      trainer: "David Brown",
      duration: "60 min",
      spots: 15,
    },
    {
      time: "09:00",
      name: "Core Blast",
      trainer: "Mike Thompson",
      duration: "30 min",
      spots: 25,
    },
    {
      time: "16:00",
      name: "Zumba",
      trainer: "Maria Garcia",
      duration: "45 min",
      spots: 30,
    },
    {
      time: "18:00",
      name: "CrossFit",
      trainer: "John Smith",
      duration: "60 min",
      spots: 12,
    },
    {
      time: "20:00",
      name: "Yoga Flow",
      trainer: "Sarah Johnson",
      duration: "60 min",
      spots: 20,
    },
  ],
  Friday: [
    {
      time: "06:00",
      name: "Morning Yoga",
      trainer: "Sarah Johnson",
      duration: "60 min",
      spots: 15,
    },
    {
      time: "08:00",
      name: "HIIT",
      trainer: "Mike Thompson",
      duration: "45 min",
      spots: 20,
    },
    {
      time: "10:00",
      name: "Spin Class",
      trainer: "Emily Davis",
      duration: "45 min",
      spots: 25,
    },
    {
      time: "17:00",
      name: "Boxing",
      trainer: "James Wilson",
      duration: "60 min",
      spots: 15,
    },
    {
      time: "19:00",
      name: "Pilates",
      trainer: "Lisa Anderson",
      duration: "60 min",
      spots: 20,
    },
  ],
  Saturday: [
    {
      time: "08:00",
      name: "Yoga Flow",
      trainer: "Sarah Johnson",
      duration: "60 min",
      spots: 20,
    },
    {
      time: "10:00",
      name: "HIIT",
      trainer: "Mike Thompson",
      duration: "45 min",
      spots: 20,
    },
    {
      time: "12:00",
      name: "Zumba",
      trainer: "Maria Garcia",
      duration: "45 min",
      spots: 30,
    },
    {
      time: "14:00",
      name: "CrossFit",
      trainer: "John Smith",
      duration: "60 min",
      spots: 12,
    },
  ],
  Sunday: [
    {
      time: "09:00",
      name: "Yoga",
      trainer: "Sarah Johnson",
      duration: "60 min",
      spots: 20,
    },
    {
      time: "11:00",
      name: "Spin Class",
      trainer: "Emily Davis",
      duration: "45 min",
      spots: 25,
    },
    {
      time: "13:00",
      name: "Core Blast",
      trainer: "Mike Thompson",
      duration: "30 min",
      spots: 25,
    },
  ],
  bookClass: async (
    classItem: { time: string; name: string; trainer: string },
    day: string
  ) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId: `${day}-${classItem.time}-${classItem.name}`,
          className: classItem.name,
          day: day,
          time: classItem.time,
          trainer: classItem.trainer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book class");
      }

      return { success: true, data };
    } catch (error) {
      console.error("Error booking class:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBookClass = async (classItem: {
    time: string;
    name: string;
    trainer: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await classes.bookClass(classItem, selectedDay);

      if (result.success) {
        toast.success("Class booked successfully!");
        router.push("/bookings");
      } else {
        if (result.error?.includes("logged in")) {
          toast.error("Please log in to book a class");
          router.push("/auth/login");
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error("Failed to book class. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            Class Schedule
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Find the perfect class that fits your schedule
          </motion.p>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          {/* Day Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            {days.map((day, index) => (
              <Button
                key={day}
                onClick={() => setSelectedDay(day)}
                variant={selectedDay === day ? "default" : "outline"}
                className={`px-8 py-6 text-lg ${
                  selectedDay === day ? "bg-primary hover:bg-primary/90" : ""
                }`}
              >
                {day}
              </Button>
            ))}
          </motion.div>

          {/* Class List */}
          <div className="max-w-4xl mx-auto">
            {(
              classes[selectedDay as keyof typeof classes] as Array<{
                time: string;
                name: string;
                trainer: string;
                duration: string;
                spots: number;
              }>
            ).map((classItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden"
              >
                <div className="p-6 flex flex-wrap items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold">
                        {classItem.time}
                      </span>
                      <span className="text-xl font-semibold text-primary">
                        {classItem.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <span>Trainer: {classItem.trainer}</span>
                      <span>•</span>
                      <span>Duration: {classItem.duration}</span>
                      <span>•</span>
                      <span>{classItem.spots} spots available</span>
                    </div>
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleBookClass(classItem)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Booking..." : "Book Now"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Need Personal Training?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get a customized workout plan with one of our expert trainers
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              Book a Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
