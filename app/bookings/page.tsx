'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Trash2, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

type Booking = {
  id: string
  class_name: string
  day: string
  time: string
  trainer: string
  status: string
  booked_at: string
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings')
        
        if (!response.ok) {
          if (response.status === 401) {
            setError('Please log in to view your bookings')
            return
          }
          throw new Error('Failed to fetch bookings')
        }
        
        const data = await response.json()
        setBookings(data.bookings || [])
      } catch (err) {
        setError('An error occurred while fetching your bookings')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // Cancel a booking
  const cancelBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings?id=${bookingId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to cancel booking')
      }

      // Remove the cancelled booking from state
      setBookings(bookings.filter(booking => booking.id !== bookingId))
      toast.success('Class booking cancelled successfully')
    } catch (err) {
      toast.error('Failed to cancel booking')
      console.error(err)
    }
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
            My Bookings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Manage your scheduled classes
          </motion.p>
        </div>
      </section>

      {/* Bookings Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg">Loading your bookings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-500 mb-6">{error}</p>
              <Link href="/auth/login">
                <Button className="bg-primary hover:bg-primary/90">Log In</Button>
              </Link>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No Bookings Found</h2>
              <p className="text-lg text-gray-600 mb-8">You haven't booked any classes yet.</p>
              <Link href="/schedule">
                <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  Browse Classes
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8 text-center"
              >
                Your Upcoming Classes
              </motion.h2>
              <div className="max-w-4xl mx-auto">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-primary">
                          {booking.class_name}
                        </h3>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <span>{booking.day}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-500" />
                          <span>{booking.trainer}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Cancel Booking
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link href="/schedule">
              <Button className="bg-primary hover:bg-primary/90 mr-4">
                Book More Classes
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
