'use client'

import { motion } from 'framer-motion'
import { Button } from '../ui/button'

const schedule = {
  Monday: [
    { time: "05:00 AM", class: "CrossFit WOD", trainer: "John Smith", duration: "60 min" },
    { time: "06:00 AM", class: "CrossFit Fundamentals", trainer: "Sarah Johnson", duration: "60 min" },
    { time: "08:00 AM", class: "Olympic Lifting", trainer: "Michael Chen", duration: "90 min" },
    { time: "12:00 PM", class: "CrossFit WOD", trainer: "Marcus Thompson", duration: "60 min" },
    { time: "04:30 PM", class: "CrossFit WOD", trainer: "John Smith", duration: "60 min" },
    { time: "05:30 PM", class: "CrossFit Fundamentals", trainer: "Sarah Johnson", duration: "60 min" },
    { time: "06:30 PM", class: "CrossFit WOD", trainer: "Michael Chen", duration: "60 min" }
  ],
  Tuesday: [
    { time: "05:00 AM", class: "CrossFit WOD", trainer: "Marcus Thompson", duration: "60 min" },
    { time: "06:00 AM", class: "CrossFit Fundamentals", trainer: "Sarah Johnson", duration: "60 min" },
    { time: "08:00 AM", class: "CrossFit WOD", trainer: "John Smith", duration: "60 min" },
    { time: "12:00 PM", class: "Olympic Lifting", trainer: "Michael Chen", duration: "90 min" },
    { time: "04:30 PM", class: "CrossFit WOD", trainer: "Marcus Thompson", duration: "60 min" },
    { time: "05:30 PM", class: "CrossFit Fundamentals", trainer: "John Smith", duration: "60 min" },
    { time: "06:30 PM", class: "CrossFit WOD", trainer: "Sarah Johnson", duration: "60 min" }
  ],
  Wednesday: [
    { time: "05:00 AM", class: "CrossFit WOD", trainer: "John Smith", duration: "60 min" },
    { time: "06:00 AM", class: "CrossFit Fundamentals", trainer: "Sarah Johnson", duration: "60 min" },
    { time: "08:00 AM", class: "Olympic Lifting", trainer: "Michael Chen", duration: "90 min" },
    { time: "12:00 PM", class: "CrossFit WOD", trainer: "Marcus Thompson", duration: "60 min" },
    { time: "04:30 PM", class: "CrossFit WOD", trainer: "John Smith", duration: "60 min" },
    { time: "05:30 PM", class: "CrossFit Fundamentals", trainer: "Sarah Johnson", duration: "60 min" },
    { time: "06:30 PM", class: "CrossFit WOD", trainer: "Michael Chen", duration: "60 min" }
  ],
  Thursday: [
    { time: "05:00 AM", class: "CrossFit WOD", trainer: "Marcus Thompson", duration: "60 min" },
    { time: "06:00 AM", class: "CrossFit Fundamentals", trainer: "Sarah Johnson", duration: "60 min" },
    { time: "08:00 AM", class: "CrossFit WOD", trainer: "John Smith", duration: "60 min" },
    { time: "12:00 PM", class: "Olympic Lifting", trainer: "Michael Chen", duration: "90 min" },
    { time: "04:30 PM", class: "CrossFit WOD", trainer: "Marcus Thompson", duration: "60 min" },
    { time: "05:30 PM", class: "CrossFit Fundamentals", trainer: "John Smith", duration: "60 min" },
    { time: "06:30 PM", class: "CrossFit WOD", trainer: "Sarah Johnson", duration: "60 min" }
  ],
  Friday: [
    { time: "05:00 AM", class: "CrossFit WOD", trainer: "John Smith", duration: "60 min" },
    { time: "06:00 AM", class: "CrossFit Fundamentals", trainer: "Sarah Johnson", duration: "60 min" },
    { time: "08:00 AM", class: "Olympic Lifting", trainer: "Michael Chen", duration: "90 min" },
    { time: "12:00 PM", class: "CrossFit WOD", trainer: "Marcus Thompson", duration: "60 min" },
    { time: "04:30 PM", class: "CrossFit WOD", trainer: "John Smith", duration: "60 min" },
    { time: "05:30 PM", class: "CrossFit WOD", trainer: "Sarah Johnson", duration: "60 min" }
  ],
  Saturday: [
    { time: "08:00 AM", class: "Team WOD", trainer: "John Smith", duration: "90 min" },
    { time: "09:30 AM", class: "CrossFit Fundamentals", trainer: "Sarah Johnson", duration: "60 min" },
    { time: "10:30 AM", class: "Olympic Lifting", trainer: "Michael Chen", duration: "90 min" },
    { time: "12:00 PM", class: "CrossFit WOD", trainer: "Marcus Thompson", duration: "60 min" }
  ],
  Sunday: [
    { time: "09:00 AM", class: "Open Gym", trainer: "Rotating Coach", duration: "180 min" },
    { time: "10:00 AM", class: "Skills & Technique", trainer: "John Smith", duration: "90 min" }
  ]
}

const Schedule = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">WOD Schedule</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our daily CrossFit WODs and specialty classes led by certified CrossFit coaches
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(schedule).map(([day, classes], dayIndex) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
              className="bg-gray-50 rounded-xl overflow-hidden"
            >
              <div className="bg-primary p-4">
                <h3 className="text-xl font-semibold text-white text-center">{day}</h3>
              </div>
              <div className="p-4 space-y-4">
                {classes.map((classItem, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {classItem.class}
                      </h4>
                      <span className="text-primary font-medium">
                        {classItem.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{classItem.time}</p>
                    <p className="text-sm text-gray-500">with {classItem.trainer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
            Book a WOD
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Schedule
