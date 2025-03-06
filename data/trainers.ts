export interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: string;
  certifications: string[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  schedule: {
    [key: string]: string[];
  };
}

export const trainers: Trainer[] = [
  {
    id: "john-smith",
    name: "John Smith",
    role: "Head CrossFit Coach",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop",
    bio: "A CrossFit Level 3 Trainer with over a decade of experience, John is passionate about helping athletes achieve their full potential through CrossFit methodology. His programming expertise and attention to form have helped numerous members achieve their fitness goals.",
    specialties: [
      "CrossFit Programming",
      "Olympic Weightlifting",
      "Competition Preparation",
      "Nutrition Planning",
    ],
    experience: "12 years",
    certifications: [
      "CrossFit Level 3 Trainer",
      "USA Weightlifting Level 2 Coach",
      "CrossFit Gymnastics",
      "Precision Nutrition Coach",
    ],
    socialMedia: {
      instagram: "johnsmith_crossfit",
      twitter: "johnsmith_cf",
      linkedin: "john-smith-crossfit",
    },
    schedule: {
      Monday: ["5:00 AM - 11:00 AM", "3:00 PM - 8:00 PM"],
      Tuesday: ["5:00 AM - 11:00 AM", "3:00 PM - 8:00 PM"],
      Wednesday: ["5:00 AM - 11:00 AM", "3:00 PM - 8:00 PM"],
      Thursday: ["5:00 AM - 11:00 AM", "3:00 PM - 8:00 PM"],
      Friday: ["5:00 AM - 11:00 AM", "3:00 PM - 7:00 PM"],
      Saturday: ["8:00 AM - 1:00 PM"],
      Sunday: ["Rest Day"],
    },
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "CrossFit Coach & Mobility Specialist",
    image:
      "https://images.unsplash.com/photo-1609899537878-88d5ba429bdb?q=80&w=1974&auto=format&fit=crop",
    bio: "Sarah specializes in CrossFit movement mechanics and mobility work. Her expertise in gymnastics and bodyweight movements helps athletes improve their form and prevent injuries.",
    specialties: [
      "CrossFit Gymnastics",
      "Mobility Training",
      "Movement Assessment",
      "Injury Prevention",
    ],
    experience: "8 years",
    certifications: [
      "CrossFit Level 2 Trainer",
      "CrossFit Gymnastics",
      "FRC Mobility Specialist",
      "Active Life Professional",
    ],
    socialMedia: {
      instagram: "sarah_crossfit",
      linkedin: "sarah-johnson-crossfit",
    },
    schedule: {
      Monday: ["6:00 AM - 12:00 PM", "4:00 PM - 8:00 PM"],
      Tuesday: ["6:00 AM - 12:00 PM", "4:00 PM - 8:00 PM"],
      Wednesday: ["6:00 AM - 12:00 PM", "4:00 PM - 8:00 PM"],
      Thursday: ["6:00 AM - 12:00 PM", "4:00 PM - 8:00 PM"],
      Friday: ["6:00 AM - 12:00 PM"],
      Saturday: ["9:00 AM - 2:00 PM"],
      Sunday: ["Rest Day"],
    },
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    role: "Olympic Lifting & CrossFit Coach",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1974&auto=format&fit=crop",
    bio: "Michael combines his expertise in Olympic weightlifting with CrossFit methodology to help athletes develop strength, power, and technical proficiency in complex movements.",
    specialties: [
      "Olympic Weightlifting",
      "CrossFit Competition",
      "Strength Programming",
      "Technical Analysis",
    ],
    experience: "10 years",
    certifications: [
      "CrossFit Level 2 Trainer",
      "USA Weightlifting Level 2 Coach",
      "CrossFit Weightlifting",
      "Competition Coach Development",
    ],
    socialMedia: {
      instagram: "chen_crossfit",
      twitter: "michaelchen_lift",
      linkedin: "michael-chen-crossfit",
    },
    schedule: {
      Monday: ["7:00 AM - 1:00 PM", "3:00 PM - 7:00 PM"],
      Tuesday: ["7:00 AM - 1:00 PM", "3:00 PM - 7:00 PM"],
      Wednesday: ["7:00 AM - 1:00 PM", "3:00 PM - 7:00 PM"],
      Thursday: ["7:00 AM - 1:00 PM", "3:00 PM - 7:00 PM"],
      Friday: ["7:00 AM - 1:00 PM", "3:00 PM - 7:00 PM"],
      Saturday: ["9:00 AM - 2:00 PM"],
      Sunday: ["Rest Day"],
    },
  },
  {
    id: "marcus-thompson",
    name: "Marcus Thompson",
    role: "CrossFit Endurance Coach",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1970&auto=format&fit=crop",
    bio: "Marcus specializes in CrossFit Endurance programming and helping athletes build their engine for competitive CrossFit. His background in competitive athletics brings a unique perspective to conditioning work.",
    specialties: [
      "CrossFit Endurance",
      "Metabolic Conditioning",
      "Running Technique",
      "Competition Programming",
    ],
    experience: "15 years",
    certifications: [
      "CrossFit Level 2 Trainer",
      "CrossFit Endurance",
      "CrossFit Running",
      "Aerobic Capacity Certification",
    ],
    socialMedia: {
      instagram: "marcus_crossfit",
      twitter: "marcusthompson_cf",
      linkedin: "marcus-thompson-crossfit",
    },
    schedule: {
      Monday: ["5:00 AM - 10:00 AM", "4:00 PM - 8:00 PM"],
      Tuesday: ["5:00 AM - 10:00 AM", "4:00 PM - 8:00 PM"],
      Wednesday: ["5:00 AM - 10:00 AM", "4:00 PM - 8:00 PM"],
      Thursday: ["5:00 AM - 10:00 AM", "4:00 PM - 8:00 PM"],
      Friday: ["5:00 AM - 10:00 AM", "4:00 PM - 7:00 PM"],
      Saturday: ["8:00 AM - 1:00 PM"],
      Sunday: ["Rest Day"],
    },
  },
];
