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

// Mock Data (from script.js, completed)
export const mockData = {
  projects: [
    {
      id: '1',
      title: 'Neural Network Visualization',
      description: 'Interactive 3D visualization of deep learning architectures for educational purposes.',
      tags: ['AI', 'Education', 'Visualization'],
      author: 'Dr. Sarah Chen',
      difficulty: 'Intermediate',
      applicants: 12,
      deadline: '2026-02-15'
    },
    {
      id: '2',
      title: 'Quantum Computing Simulator',
      description: 'Browser-based quantum circuit simulator with educational tutorials.',
      tags: ['Quantum', 'Physics', 'React'],
      author: 'Prof. James Miller',
      difficulty: 'Advanced',
      applicants: 8,
      deadline: '2026-03-01'
    },
    {
      id: '3',
      title: 'Climate Data Analysis Tool',
      description: 'Python-based toolkit for analyzing global warming datasets.',
      tags: ['Data Science', 'Python', 'Environment'],
      author: 'Dr. Emily Watson',
      difficulty: 'Beginner',
      applicants: 24,
      deadline: '2026-01-30'
    }
  ],
  tutorials: [
    {
      id: '1',
      title: 'Introduction to RAG Systems',
      excerpt: 'Learn how Retrieval-Augmented Generation works and how to implement it using LangChain.',
      author: 'AI Research Team',
      readTime: '12 min',
      category: 'AI/ML'
    },
    {
      id: '2',
      title: 'Building Educational Chatbots',
      excerpt: 'Step-by-step guide to creating Socratic tutoring agents using GPT-4 and function calling.',
      author: 'EduAI Labs',
      readTime: '8 min',
      category: 'Tutorial'
    }
  ]
};
