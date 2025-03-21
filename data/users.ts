import { User } from "@/types/user";

export const sampleUsers: User[] = [
  {
    id: "u1",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    membership_status: "active",
    created_at: "2023-12-01T10:00:00Z",
    membership_plan: "premium",
    last_login: "2024-01-15T08:30:00Z",
    phone: "+1234567890"
  },
  {
    id: "u2",
    email: "sarah.smith@example.com",
    first_name: "Sarah",
    last_name: "Smith",
    membership_status: "trial",
    created_at: "2024-01-10T15:20:00Z",
    membership_plan: "trial",
    last_login: "2024-01-15T14:45:00Z",
    phone: "+1234567891"
  },
  {
    id: "u3",
    email: "mike.johnson@example.com",
    first_name: "Mike",
    last_name: "Johnson",
    membership_status: "active",
    created_at: "2023-11-15T09:30:00Z",
    membership_plan: "basic",
    last_login: "2024-01-14T17:20:00Z",
    phone: "+1234567892"
  },
  {
    id: "u4",
    email: "emma.wilson@example.com",
    first_name: "Emma",
    last_name: "Wilson",
    membership_status: "inactive",
    created_at: "2023-10-20T11:15:00Z",
    membership_plan: "none",
    last_login: "2023-12-30T10:10:00Z",
    phone: "+1234567893"
  },
  {
    id: "u5",
    email: "david.brown@example.com",
    first_name: "David",
    last_name: "Brown",
    membership_status: "active",
    created_at: "2023-09-05T14:40:00Z",
    membership_plan: "premium",
    last_login: "2024-01-15T16:30:00Z",
    phone: "+1234567894"
  }
];

export const formSubmissions = [
  {
    id: "f1",
    user_id: "u2",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    phone: "+1234567891",
    fitnessGoals: "Looking to improve overall strength and endurance through CrossFit training.",
    submitted_at: "2024-01-10T15:20:00Z",
    status: "contacted"
  },
  {
    id: "f2",
    user_id: null,
    name: "Alex Thompson",
    email: "alex.t@example.com",
    phone: "+1234567895",
    fitnessGoals: "Interested in starting CrossFit to lose weight and build muscle.",
    submitted_at: "2024-01-14T09:15:00Z",
    status: "pending"
  },
  {
    id: "f3",
    user_id: null,
    name: "Lisa Chen",
    email: "lisa.chen@example.com",
    phone: "+1234567896",
    fitnessGoals: "Want to join CrossFit classes to improve flexibility and strength.",
    submitted_at: "2024-01-15T11:30:00Z",
    status: "new"
  }
];

export const membershipStats = {
  totalMembers: 150,
  activeMembers: 120,
  trialMembers: 15,
  inactiveMembers: 15,
  averageAttendance: 45,
  newMembersThisMonth: 8
};

export const revenueStats = {
  currentMonthRevenue: 15000,
  lastMonthRevenue: 14200,
  yearToDateRevenue: 180000,
  averageMonthlyRevenue: 15000
};