export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "crossfit-1",
    title: "Main CrossFit Box",
    category: "CrossFit",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
    description:
      "Our spacious CrossFit box equipped with everything you need for WODs",
  },
  {
    id: "crossfit-2",
    title: "Olympic Lifting Area",
    category: "CrossFit",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070",
    description: "Dedicated Olympic weightlifting platforms and equipment",
  },
  {
    id: "crossfit-3",
    title: "Rig and Pull-up Station",
    category: "CrossFit",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069",
    description: "Custom rig setup for gymnastics and pull-up work",
  },
  {
    id: "strength-1",
    title: "Power Rack Zone",
    category: "Strength",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070",
    description: "Multiple power racks for serious strength training",
  },
  {
    id: "strength-2",
    title: "Dumbbell Area",
    category: "Strength",
    image:
      "https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?q=80&w=2070",
    description: "Comprehensive dumbbell selection for targeted strength work",
  },
  {
    id: "strength-3",
    title: "Deadlift Platform",
    category: "Strength",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069",
    description: "Specialized platforms for heavy deadlifts and Olympic lifts",
  },
  {
    id: "conditioning-1",
    title: "Cardio Zone",
    category: "Conditioning",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2070",
    description: "State-of-the-art cardio equipment for endurance training",
  },
  {
    id: "conditioning-2",
    title: "HIIT Station",
    category: "Conditioning",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070",
    description: "Dedicated area for high-intensity interval training",
  },
  {
    id: "conditioning-3",
    title: "Assault Bike Corner",
    category: "Conditioning",
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=2070",
    description: "Air bikes and rowers for intense cardio sessions",
  },
  {
    id: "olympic-1",
    title: "Snatch Platform",
    category: "Olympic Lifting",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069",
    description: "Professional platforms dedicated to snatch technique and training",
  },
  {
    id: "olympic-2",
    title: "Clean and Jerk Area",
    category: "Olympic Lifting",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070",
    description: "Specialized space for clean and jerk practice with expert coaching",
  },
  {
    id: "olympic-3",
    title: "Olympic Training Zone",
    category: "Olympic Lifting",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070",
    description: "Complete Olympic weightlifting setup with competition-grade equipment",
  },
];
