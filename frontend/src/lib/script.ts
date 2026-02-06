import { create } from 'zustand';

export interface User {
  name: string;
  email: string;
  role: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentRoute: string;
  darkMode: boolean;
  setState: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
  getState: <K extends keyof AppState>(key: K) => AppState[K];
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  currentRoute: '/',
  darkMode: true,
  setState: (key, value) => set({ [key]: value }),
  getState: (key) => get()[key],
}));

// Utils (from original script.js)
export const utils = {
  formatDate: (date: string | Date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  debounce: (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
  generateId: () => Math.random().toString(36).substr(2, 9),
  truncate: (str: string, length = 100) => str.length > length ? str.substring(0, length) + '...' : str,
};

// Mock Data (from script.js)
export const mockData = {
  projects: [
    // ... (copy original array)
  ],
  tutorials: [
    // ... (copy original array)
  ],
};
