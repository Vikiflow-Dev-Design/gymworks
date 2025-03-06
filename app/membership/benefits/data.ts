export interface Benefit {
  id: string;
  title: string;
  description: string;
  image: string;
  longDescription: string;
  features: {
    title: string;
    description: string;
  }[];
  gallery: string[];
}

export const benefits: Benefit[] = [
  {
    id: 'state-of-the-art-equipment',
    title: 'State-of-the-art Equipment',
    description: 'Access to the latest fitness equipment and technology',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070',
    longDescription: `Experience fitness at its finest with our cutting-edge equipment collection. Our gym is outfitted with the latest and most advanced fitness technology, ensuring you have access to everything you need for an effective workout.`,
    features: [
      {
        title: 'Cardio Zone',
        description: 'Latest treadmills, ellipticals, and bikes with built-in entertainment systems and workout tracking'
      },
      {
        title: 'Strength Training Area',
        description: 'Premium free weights, weight machines, and functional training equipment'
      },
      {
        title: 'Smart Training Systems',
        description: 'Digital workout tracking and form correction technology'
      },
      {
        title: 'Recovery Equipment',
        description: 'Advanced recovery tools including compression systems and massage equipment'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070',
      'https://images.unsplash.com/photo-1637666062717-1c6bcf325583?q=80&w=2070'
    ]
  },
  {
    id: 'expert-training',
    title: 'Expert Training',
    description: 'Work with certified personal trainers and fitness experts',
    image: 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?q=80&w=2072',
    longDescription: `Transform your fitness journey with our team of certified personal trainers. Our experts bring years of experience and specialized knowledge to help you achieve your fitness goals effectively and safely.`,
    features: [
      {
        title: 'Certified Trainers',
        description: 'Work with nationally certified trainers with diverse specializations'
      },
      {
        title: 'Customized Programs',
        description: 'Personalized workout plans tailored to your goals and fitness level'
      },
      {
        title: 'Progress Tracking',
        description: 'Regular assessments and adjustments to optimize your results'
      },
      {
        title: 'Nutrition Guidance',
        description: 'Expert advice on nutrition and meal planning'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=2069',
      'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2025',
      'https://images.unsplash.com/photo-1448387473223-5c37445527e7?q=80&w=2070'
    ]
  },
  {
    id: 'diverse-classes',
    title: 'Diverse Classes',
    description: 'Choose from a wide variety of group fitness classes',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070',
    longDescription: `Join our vibrant community in a variety of engaging group fitness classes. From high-energy cardio to mindful yoga sessions, our diverse class schedule offers something for everyone.`,
    features: [
      {
        title: 'Class Variety',
        description: 'Over 50 different class types including HIIT, yoga, spinning, and more'
      },
      {
        title: 'Skilled Instructors',
        description: 'Expert instructors who bring energy and expertise to every class'
      },
      {
        title: 'Flexible Schedule',
        description: 'Classes available from early morning to late evening'
      },
      {
        title: 'All Fitness Levels',
        description: 'Modified exercises to accommodate beginners to advanced participants'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075',
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070',
      'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=2070'
    ]
  },
  {
    id: 'premium-facilities',
    title: 'Premium Facilities',
    description: 'Enjoy our luxury amenities and spa services',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069',
    longDescription: `Indulge in our premium facilities designed for your comfort and relaxation. Our spa-like amenities provide the perfect environment for post-workout recovery and rejuvenation.`,
    features: [
      {
        title: 'Luxury Locker Rooms',
        description: 'Spacious locker rooms with premium amenities and towel service'
      },
      {
        title: 'Spa Services',
        description: 'Professional massage therapy and wellness treatments'
      },
      {
        title: 'Recovery Areas',
        description: 'Dedicated spaces for stretching and recovery'
      },
      {
        title: 'Sauna & Steam Room',
        description: 'Modern facilities for relaxation and recovery'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070',
      'https://images.unsplash.com/photo-1554244933-d876deb6b2ff?q=80&w=2080',
      'https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=2071'
    ]
  }
];
