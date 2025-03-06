export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Marketing Executive",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070",
    content: `Joining ${process.env.NEXT_PUBLIC_WEBSITE_NAME} was the best decision I've made for my health. The trainers are exceptional, and the community is so supportive. I've lost 20 pounds and gained confidence!`,
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
    content:
      "The facilities are top-notch, and the 24/7 access fits perfectly with my busy schedule. The personal training sessions have helped me achieve results I never thought possible.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emma Davis",
    role: "Teacher",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2088",
    content: `I love the variety of CrossFit classes offered at ${process.env.NEXT_PUBLIC_WEBSITE_NAME}. The WODs are challenging yet scalable, and the coaches are incredibly knowledgeable and motivating. The community here is truly special!`,
    rating: 5,
  },
];
