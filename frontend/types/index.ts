export type UserRole = "donor" | "center" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Center {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  description: string;
  status: "pending" | "verified" | "rejected";
  ownerId: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  centerId: string;
  startDate: string;
  endDate: string;
  goal: number;
  current: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Myth {
  id: string;
  myth: string;
  reality: string;
  order: number;
}

export interface Appointment {
  id: string;
  donorId: string;
  centerId: string;
  scheduledAt: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes: string;
  createdAt: string;
  updatedAt: string;
}
