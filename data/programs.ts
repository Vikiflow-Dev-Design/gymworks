export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  longDescription: string;
  schedule: {
    [key: string]: string[];
  };
  pricing: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  requirements: string[];
  benefits: string[];
  instructors: string[];
  equipment: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const programs: Program[] = [
  {
    id: "crossfit-fundamentals",
    title: "CrossFit Fundamentals",
    description: "Master the essential CrossFit movements and techniques in our comprehensive foundations program.",
    image: "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?q=80&w=2070",
    features: [
      "Small group training (max 8 people)",
      "Fundamental movement assessment",
      "CrossFit methodology introduction",
      "Technique refinement",
      "Workout scaling strategies"
    ],
    longDescription: "Our CrossFit Fundamentals program is your gateway to the CrossFit community. This mandatory course for new members ensures you learn proper form and technique for all foundational CrossFit movements. Over two weeks, you'll work closely with our certified CrossFit coaches to master gymnastics, weightlifting, and metabolic conditioning basics.\n\nThe program focuses on safety, efficiency, and proper progression, setting you up for success in our regular CrossFit classes. You'll learn about workout scaling, intensity management, and CrossFit-specific terminology.",
    schedule: {
      Monday: ["6:00 AM - 7:00 AM", "12:00 PM - 1:00 PM", "5:30 PM - 6:30 PM"],
      Tuesday: ["7:00 AM - 8:00 AM", "4:30 PM - 5:30 PM", "6:30 PM - 7:30 PM"],
      Wednesday: ["6:00 AM - 7:00 AM", "12:00 PM - 1:00 PM", "5:30 PM - 6:30 PM"],
      Thursday: ["7:00 AM - 8:00 AM", "4:30 PM - 5:30 PM", "6:30 PM - 7:30 PM"],
      Friday: ["6:00 AM - 7:00 AM", "12:00 PM - 1:00 PM", "5:30 PM - 6:30 PM"],
      Saturday: ["9:00 AM - 10:00 AM"],
      Sunday: ["Rest Day"]
    },
    pricing: {
      monthly: 199000,
      quarterly: 549000,
      yearly: 1999000
    },
    requirements: [
      "No prior CrossFit experience needed",
      "Basic athletic clothing",
      "Training shoes",
      "Water bottle",
      "Positive attitude"
    ],
    benefits: [
      "Master fundamental CrossFit movements",
      "Learn proper technique and form",
      "Build a foundation for advanced workouts",
      "Understand workout scaling",
      "Join a supportive community",
      "Improve overall fitness"
    ],
    instructors: ["John Smith", "Michael Chen", "Sarah Johnson"],
    equipment: [
      "PVC pipes",
      "Training barbells",
      "Medicine balls",
      "Kettlebells",
      "Resistance bands",
      "Rowing machines"
    ],
    faqs: [
      {
        question: "Do I need to be fit to start CrossFit?",
        answer: "No! Our Fundamentals program is designed for all fitness levels. We'll teach you how to scale movements and build strength gradually."
      },
      {
        question: "How long is the Fundamentals program?",
        answer: "The program runs for two weeks, with 3 sessions per week. This ensures you have adequate time to learn and practice the movements safely."
      },
      {
        question: "What happens after Fundamentals?",
        answer: "Upon completion, you'll be ready to join our regular CrossFit classes where you can apply your skills in varied, high-intensity workouts."
      }
    ]
  },
  {
    id: "crossfit-wod",
    title: "CrossFit WOD Classes",
    description: "Experience the intensity of daily CrossFit workouts in our supportive community environment.",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070",
    features: [
      "Daily programmed WODs",
      "Skilled coaching",
      "Performance tracking",
      "Scaling options",
      "Community support"
    ],
    longDescription: "Our CrossFit WOD (Workout of the Day) classes are the heart of our program. Each day brings a new, challenging workout that combines elements of gymnastics, weightlifting, and metabolic conditioning. Our experienced coaches guide you through proper warm-ups, skill work, and the WOD itself.\n\nClasses are programmed to improve your overall fitness across ten key physical skills: cardiovascular endurance, stamina, strength, flexibility, power, speed, coordination, agility, balance, and accuracy. Every workout can be scaled to your fitness level while maintaining its intended stimulus.",
    schedule: {
      Monday: ["5:00 AM", "6:00 AM", "7:00 AM", "12:00 PM", "4:30 PM", "5:30 PM", "6:30 PM"],
      Tuesday: ["5:00 AM", "6:00 AM", "7:00 AM", "12:00 PM", "4:30 PM", "5:30 PM", "6:30 PM"],
      Wednesday: ["5:00 AM", "6:00 AM", "7:00 AM", "12:00 PM", "4:30 PM", "5:30 PM", "6:30 PM"],
      Thursday: ["5:00 AM", "6:00 AM", "7:00 AM", "12:00 PM", "4:30 PM", "5:30 PM", "6:30 PM"],
      Friday: ["5:00 AM", "6:00 AM", "7:00 AM", "12:00 PM", "4:30 PM", "5:30 PM"],
      Saturday: ["8:00 AM", "9:00 AM", "10:00 AM"],
      Sunday: ["9:00 AM - Open Gym"]
    },
    pricing: {
      monthly: 159000,
      quarterly: 429000,
      yearly: 1599000
    },
    requirements: [
      "Completed Fundamentals program",
      "Proper CrossFit attire",
      "Training shoes",
      "Water bottle",
      "Jump rope"
    ],
    benefits: [
      "Improved overall fitness",
      "Increased strength and endurance",
      "Enhanced athletic performance",
      "Better mobility and flexibility",
      "Strong community support",
      "Constant variety in workouts"
    ],
    instructors: ["John Smith", "Michael Chen", "Marcus Thompson"],
    equipment: [
      "Olympic barbells",
      "Bumper plates",
      "Pull-up rigs",
      "Kettlebells",
      "Rowing machines",
      "Assault bikes",
      "Wall balls",
      "Jump ropes"
    ],
    faqs: [
      {
        question: "What is a typical class like?",
        answer: "Classes are one hour long and include a warm-up, skill work or strength training, the WOD, and a cool-down. Every day brings a different workout to challenge you in new ways."
      },
      {
        question: "How often should I attend classes?",
        answer: "We recommend 3-5 classes per week for optimal results, with rest days for recovery. Listen to your body and adjust as needed."
      },
      {
        question: "Can I drop in for single classes?",
        answer: "Yes, we offer drop-in classes for experienced CrossFit athletes visiting our box. Please contact us in advance to arrange your visit."
      }
    ]
  },
  {
    id: "olympic-weightlifting",
    title: "Olympic Weightlifting",
    description: "Master the snatch and clean & jerk with expert coaching and specialized programming.",
    image: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=2070",
    features: [
      "Technical lifting instruction",
      "Competition preparation",
      "Video analysis",
      "Personalized programming",
      "Small group training"
    ],
    longDescription: "Our Olympic Weightlifting program focuses on developing proficiency in the snatch and clean & jerk. Led by USA Weightlifting certified coaches, this program is perfect for CrossFit athletes looking to improve their lifting technique and competitors preparing for weightlifting meets.\n\nClasses emphasize proper form, progressive loading, and competition strategies. Whether you're new to Olympic lifting or preparing for competition, our coaches will help you achieve your goals safely and effectively.",
    schedule: {
      Monday: ["4:30 PM - 6:00 PM"],
      Tuesday: ["Rest Day"],
      Wednesday: ["4:30 PM - 6:00 PM"],
      Thursday: ["Rest Day"],
      Friday: ["4:30 PM - 6:00 PM"],
      Saturday: ["10:00 AM - 11:30 AM"],
      Sunday: ["Rest Day"]
    },
    pricing: {
      monthly: 179000,
      quarterly: 479000,
      yearly: 1799000
    },
    requirements: [
      "Basic strength training experience",
      "Weightlifting shoes",
      "Athletic clothing",
      "Wrist wraps",
      "Belt (optional)"
    ],
    benefits: [
      "Improved technique in Olympic lifts",
      "Increased power and explosiveness",
      "Better mobility and flexibility",
      "Enhanced CrossFit performance",
      "Competition preparation",
      "Structured progression"
    ],
    instructors: ["John Smith", "Marcus Thompson"],
    equipment: [
      "Competition barbells",
      "Bumper plates",
      "Platforms",
      "Squat racks",
      "Technical blocks",
      "Video analysis equipment"
    ],
    faqs: [
      {
        question: "Do I need prior Olympic lifting experience?",
        answer: "While some strength training background is helpful, we welcome beginners who want to learn proper technique from the ground up."
      },
      {
        question: "Can I combine this with CrossFit classes?",
        answer: "Yes, many athletes combine Olympic lifting with CrossFit. We'll help you balance your training schedule for optimal results."
      },
      {
        question: "Do you offer competition preparation?",
        answer: "Yes, we provide specialized programming and coaching for athletes preparing for weightlifting competitions."
      }
    ]
  }
];
