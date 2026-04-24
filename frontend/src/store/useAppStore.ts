import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Types ────────────────────────────────────────────────────────────
export interface CourseItem {
  id: string | number;
  name: string;
  category: string;          // e.g. "Hạng B2"
  duration: string;          // e.g. "3.5 tháng"
  price: number;             // VND
  image: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: 'success' | 'pending' | 'failed';
  course: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

// ── Store ────────────────────────────────────────────────────────────
interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;

  // Cart / Checkout
  selectedCourse: CourseItem | null;
  setSelectedCourse: (course: CourseItem | null) => void;

  // Enrollment ID (returned after creating enrollment via API)
  lastEnrollmentId: number | null;
  setLastEnrollmentId: (id: number | null) => void;

  // Transaction history
  transactions: Transaction[];
  setTransactions: (trxList: Transaction[]) => void;
  addTransaction: (trx: Transaction) => void;

  // Chatbot visibility
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      token: null,
      isLoggedIn: false,
      login: (user, token) => set({ user, token, isLoggedIn: true }),
      logout: () => set({ user: null, token: null, isLoggedIn: false, selectedCourse: null, lastEnrollmentId: null, transactions: [] }),

      // Cart
      selectedCourse: null,
      setSelectedCourse: (course) => set({ selectedCourse: course }),

      // Enrollment
      lastEnrollmentId: null,
      setLastEnrollmentId: (id) => set({ lastEnrollmentId: id }),

      // Transactions
      transactions: [],
      setTransactions: (trxList) => set({ transactions: trxList }),
      addTransaction: (trx) =>
        set((state) => ({ transactions: [trx, ...state.transactions] })),

      // Chatbot
      chatOpen: false,
      setChatOpen: (open) => set({ chatOpen: open }),
    }),
    {
      name: 'driving-school-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        transactions: state.transactions,
        selectedCourse: state.selectedCourse,
        lastEnrollmentId: state.lastEnrollmentId,
      }),
    }
  )
);
