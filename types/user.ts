export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  membership_status: "active" | "inactive" | "trial";
  created_at: Date;
  clerk_id: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
};

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "pending" | "contacted" | "scheduled";
  submittedAt: string;
}

export interface MembershipStats {
  totalMembers: number;
  activeMembers: number;
  trialMembers: number;
  inactiveMembers: number;
  averageAttendance: number;
  newMembersThisMonth: number;
}

export interface RevenueStats {
  currentMonthRevenue: number;
  lastMonthRevenue: number;
  yearToDateRevenue: number;
  averageMonthlyRevenue: number;
}
