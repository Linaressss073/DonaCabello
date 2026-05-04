import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1";

export const api = axios.create({ baseURL: BASE });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

export const register = (data: { email: string; password: string; name: string; role: "donor" | "center" }) =>
  api.post("/auth/register", data).then((r) => r.data);

export const getMe = () =>
  api.get("/auth/me").then((r) => r.data);

// Centers
export const getCenters = () =>
  api.get("/centers").then((r) => r.data);

export const registerCenter = (data: object) =>
  api.post("/centers/register", data).then((r) => r.data);

export const getMyCenters = () =>
  api.get("/centers/panel/my").then((r) => r.data);

export const updateCenterStatus = (id: string, status: "pending" | "verified" | "rejected") =>
  api.patch(`/centers/${id}/status`, { status }).then((r) => r.data);

// Campaigns
export const getCampaigns = () =>
  api.get("/campaigns").then((r) => r.data);

// Community
export const getFaqs = () =>
  api.get("/community/faqs").then((r) => r.data);

export const sendContact = (data: { name: string; email: string; message: string }) =>
  api.post("/community/contact", data).then((r) => r.data);

// Appointments
export const getMyAppointments = () =>
  api.get("/appointments/my").then((r) => r.data);

export const createAppointment = (data: { centerId: string; scheduledAt: string; notes?: string }) =>
  api.post("/appointments", data).then((r) => r.data);
