'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { useParams } from 'next/navigation'
import { allPosts } from '../data'

export default function BlogPost() {
  const { slug } = useParams()
  
  // Find the post based on the slug
  const post = allPosts.find(post => 
    post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  )

  if (!post) {
    return (
      <main className="min-h-screen py-24">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    )
  }

  const relatedPosts = allPosts
    .filter(p => 
      p.category === post.category && 
      p.title !== post.title
    )
    .slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
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
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose dark:prose-invert prose-lg"
            >
              <p className="text-xl font-medium mb-8 not-prose">
                {post.excerpt}
              </p>

              {/* Sample blog content - in a real app, this would come from a CMS */}
              <h2>Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>

              <h2>Main Points</h2>
              <ul>
                <li>First key point about {post.title.toLowerCase()}</li>
                <li>Second important aspect to consider</li>
                <li>Third crucial element for success</li>
              </ul>

              <h2>Detailed Analysis</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>

              <blockquote>
                "Success in fitness is not just about the destination, but the
                journey and the habits we build along the way."
              </blockquote>

              <h2>Practical Tips</h2>
              <ol>
                <li>Start with small, achievable goals</li>
                <li>Maintain consistency in your routine</li>
                <li>Track your progress regularly</li>
                <li>Adjust your approach based on results</li>
              </ol>

              <h2>Conclusion</h2>
              <p>
                Remember that everyone's fitness journey is unique. What works for
                one person might not work for another. The key is to find what works
                best for you and stick to it consistently.
              </p>
            </motion.article>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex flex-wrap gap-2"
            >
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                Fitness
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                Health
              </span>
            </motion.div>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070"
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{post.author}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Fitness Expert</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                A passionate fitness expert with over 10 years of experience in personal training 
                and nutrition coaching. Dedicated to helping others achieve their fitness goals 
                through evidence-based practices and personalized guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-12"
            >
              Related Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <motion.article
                  key={relatedPost.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link
                    href={`/blog/${relatedPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="block"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-primary text-sm font-medium">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-xl font-bold mt-2 mb-4">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
