'use client';

import { useAppStore } from '../lib/script';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const { isAuthenticated } = useAppStore();
  const location = useLocation();
  const showSidebar = isAuthenticated && location.pathname !== '/login';

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <Navbar />
      <div className="flex pt-16">
        {showSidebar && <Sidebar />}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto transition-opacity duration-150">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
