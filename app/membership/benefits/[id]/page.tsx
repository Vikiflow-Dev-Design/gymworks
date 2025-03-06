'use client'

import { motion } from 'framer-motion'
import { benefits } from '../data'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default function BenefitPage({ params }: { params: { id: string } }) {
  const benefit = benefits.find(b => b.id === params.id)

  if (!benefit) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={benefit.image}
            alt={benefit.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container px-4 mx-auto text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Link 
              href="/membership"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Membership
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {benefit.title}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {benefit.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <p className="lead">{benefit.longDescription}</p>

              <h2>Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                {benefit.features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <h2>Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
                {benefit.gallery.map((image, index) => (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="relative h-64 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${benefit.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
            <h2 className="text-4xl font-bold mb-6">Ready to Experience {benefit.title}?</h2>
            <p className="text-xl mb-8">
              Join our community today and get access to all our premium features and amenities
            </p>
            <Link href="/membership">
              <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
                View Membership Plans
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
