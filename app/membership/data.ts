export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export const monthlyPlans: Plan[] = [
  {
    id: "individual-monthly",
    name: "Individual",
    price: 39000,
    duration: "month",
    features: ["1 person", "1 towel", "Gym access", "Weekly classes"],
  },
  {
    id: "couple-monthly",
    name: "Couple",
    price: 70000,
    duration: "month",
    features: [
      "2 persons only",
      "Towel service",
      "Locker room service",
      "Weekly classes",
    ],
    popular: true,
  },
  {
    id: "family-monthly",
    name: "Family",
    price: 136000,
    duration: "month",
    features: [
      "4 persons only",
      "Towel service",
      "Locker room service",
      "Weekly classes",
    ],
  },
];

export const annualPlans: Plan[] = [
  {
    id: "individual-3month",
    name: "Individual (3 Months)",
    price: 99000,
    duration: "3 months",
    features: [
      "1 person",
      "Dispenser water",
      "1 towel",
      "Gym access",
      "Weekly classes",
      "Locker room service",
    ],
  },
  {
    id: "couple-3month",
    name: "Couple (3 Months)",
    price: 179000,
    duration: "3 months",
    features: [
      "2 persons only",
      "Dispenser water",
      "Towel service",
      "Locker room service",
      "Weekly classes",
    ],
  },
  {
    id: "family-3month",
    name: "Family (3 Months)",
    price: 346000,
    duration: "3 months",
    features: [
      "4 persons only",
      "Towel service",
      "Locker room service",
      "Dispenser water",
      "Weekly classes",
    ],
  },
  {
    id: "individual-6month",
    name: "Individual (6 Months)",
    price: 188000,
    duration: "6 months",
    features: [
      "1 person",
      "Dispenser water",
      "1 towel",
      "Gym access",
      "Weekly classes",
      "Locker room service",
    ],
  },
  {
    id: "couple-6month",
    name: "Couple (6 Months)",
    price: 336000,
    duration: "6 months",
    features: [
      "2 persons only",
      "Dispenser water",
      "Towel service",
      "Locker room service",
      "Weekly classes",
    ],
  },
  {
    id: "family-6month",
    name: "Family (6 Months)",
    price: 653000,
    duration: "6 months",
    features: [
      "4 persons only",
      "Towel service",
      "Locker room service",
      "Dispenser water",
      "Weekly classes",
    ],
  },
  {
    id: "individual-annual",
    name: "Individual (Annual)",
    price: 374000,
    duration: "year",
    features: [
      "1 person",
      "Dispenser water",
      "1 towel",
      "Gym access",
      "Weekly classes",
      "Locker room service",
    ],
    popular: true,
  },
  {
    id: "couple-annual",
    name: "Couple (Annual)",
    price: 672000,
    duration: "year",
    features: [
      "2 persons only",
      "Dispenser water",
      "Towel service",
      "Locker room service",
      "Weekly classes",
    ],
  },
  {
    id: "family-annual",
    name: "Family (Annual)",
    price: 1224000,
    duration: "year",
    features: [
      "4 persons only",
      "Towel service",
      "Locker room service",
      "Dispenser water",
      "Weekly classes",
    ],
  },
];
