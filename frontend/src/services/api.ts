import axios from 'axios';
import { useAppStore } from '../store/useAppStore';

// ── Axios instance ───────────────────────────────────────────────────
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach JWT token ────────────────────────────
api.interceptors.request.use((config) => {
  const token = useAppStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle 401 ────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAppStore.getState().logout();
    }
    return Promise.reject(err);
  }
);

// ── Auth APIs ────────────────────────────────────────────────────────
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),

  me: () => api.get('/auth/me'),
};

// ── Course APIs ──────────────────────────────────────────────────────
export const courseAPI = {
  getAll: (params?: { page?: number; size?: number; licenseType?: string }) =>
    api.get('/courses', { params }),

  getById: (id: number) => api.get(`/courses/${id}`),
};

// ── Enrollment APIs ──────────────────────────────────────────────────
export const enrollmentAPI = {
  create: (courseId: number) => api.post('/enrollments', { courseId }),
  
  getMyEnrollments: () => api.get('/enrollments/me'),
};

// ── Payment APIs ─────────────────────────────────────────────────────
// POST /api/payments/create  { enrollmentId, method: 'VNPAY'|'MOMO'|'ZALOPAY'|'BANK_CARD' }
// Amount is auto-calculated from course price by backend
export const paymentAPI = {
  create: (data: { enrollmentId: number; method: string }) =>
    api.post('/payments/create', data),

  getById: (id: number) => api.get(`/payments/${id}`),

  // Simulate webhook callback to mark payment as COMPLETED
  webhook: (transactionRef: string, status: string) =>
    api.post('/payments/webhook', { transactionRef, status }),
};

// ── Schedule APIs ────────────────────────────────────────────────────
// GET /api/schedules — auto-scoped by role (student sees only their own)
export const scheduleAPI = {
  getAll: (params?: { skip?: number; take?: number; status?: string }) =>
    api.get('/schedules', { params }),

  generate: (data: {
    courseId: number;
    instructorId: number;
    studentId: number;
    lessonDate: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }) => api.post('/schedules/generate', data),
};

// ── User APIs (for fetching instructors) ─────────────────────────────
export const userAPI = {
  getInstructors: () => api.get('/users', { params: { role: 'INSTRUCTOR', take: 10 } }),
};

export default api;
