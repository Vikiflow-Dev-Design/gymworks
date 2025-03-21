import { User } from "@/types/user";

export type FormSubmission = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  fitnessGoals: string;
  submittedAt: string;
  status: "pending" | "contacted" | "scheduled";
};

export type DashboardStats = {
  totalUsers: number;
  activeMembers: number;
  trialUsers: number;
  formSubmissions: number;
};

export const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    membership_status: "active",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    first_name: "Jane",
    last_name: "Smith",
    membership_status: "trial",
    created_at: "2024-02-01T14:30:00Z",
  },
  {
    id: "3",
    email: "mike.wilson@example.com",
    first_name: "Mike",
    last_name: "Wilson",
    membership_status: "active",
    created_at: "2024-01-20T09:15:00Z",
  },
  {
    id: "4",
    email: "sarah.brown@example.com",
    first_name: "Sarah",
    last_name: "Brown",
    membership_status: "inactive",
    created_at: "2024-01-10T16:45:00Z",
  },
];

export const mockFormSubmissions: FormSubmission[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "+1234567890",
    fitnessGoals: "Looking to improve overall strength and endurance",
    submittedAt: "2024-02-05T08:30:00Z",
    status: "contacted",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.g@example.com",
    fitnessGoals: "Want to lose weight and build muscle",
    submittedAt: "2024-02-06T10:15:00Z",
    status: "pending",
  },
  {
    id: "3",
    name: "David Lee",
    email: "david.l@example.com",
    phone: "+1987654321",
    fitnessGoals: "Preparing for a marathon",
    submittedAt: "2024-02-06T15:45:00Z",
    status: "scheduled",
  },
];

export const calculateDashboardStats = (): DashboardStats => {
  return {
    totalUsers: mockUsers.length,
    activeMembers: mockUsers.filter(
      (user) => user.membership_status === "active"
    ).length,
    trialUsers: mockUsers.filter((user) => user.membership_status === "trial")
      .length,
    formSubmissions: mockFormSubmissions.length,
  };
};
