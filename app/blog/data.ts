export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  featured: boolean;
}

export const allPosts: BlogPost[] = [
  {
    title: '10 Essential Tips for Building Muscle',
    excerpt: 'Learn the fundamental principles of muscle growth and how to optimize your training for maximum results.',
    category: 'Training',
    author: 'John Smith',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070',
    readTime: '5 min read',
    featured: true
  },
  {
    title: 'The Ultimate Guide to Nutrition for Athletes',
    excerpt: 'Discover the best nutrition strategies to fuel your workouts and support your fitness goals.',
    category: 'Nutrition',
    author: 'Sarah Johnson',
    date: 'March 12, 2024',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070',
    readTime: '8 min read',
    featured: true
  },
  {
    title: 'How to Stay Motivated in Your Fitness Journey',
    excerpt: 'Practical tips and strategies to maintain motivation and consistency in your workout routine.',
    category: 'Lifestyle',
    author: 'Mike Thompson',
    date: 'March 10, 2024',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2070',
    readTime: '6 min read',
    featured: false
  },
  {
    title: 'The Benefits of High-Intensity Interval Training',
    excerpt: 'Explore why HIIT is one of the most effective workout methods for burning fat and improving fitness.',
    category: 'Training',
    author: 'Emily Davis',
    date: 'March 8, 2024',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=2070',
    readTime: '4 min read',
    featured: false
  },
  {
    title: 'Understanding Macronutrients for Optimal Health',
    excerpt: 'A comprehensive guide to proteins, carbohydrates, and fats, and their role in your fitness journey.',
    category: 'Nutrition',
    author: 'David Brown',
    date: 'March 5, 2024',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2032',
    readTime: '7 min read',
    featured: false
  },
  {
    title: 'The Importance of Rest and Recovery',
    excerpt: 'Learn why proper rest and recovery are crucial for achieving your fitness goals.',
    category: 'Wellness',
    author: 'Lisa Anderson',
    date: 'March 3, 2024',
    image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=2070',
    readTime: '5 min read',
    featured: false
  }
]
