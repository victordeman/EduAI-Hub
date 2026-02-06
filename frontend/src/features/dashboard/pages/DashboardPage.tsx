'use server';

import { Suspense } from 'react';
import { mockData } from '../../../lib/script';
import { LucideFolder, LucideMessageSquare, LucideBook, LucideBookmark } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Loader } from '../../../components/ui/Loader';

async function fetchStats() {
  // Simulate server fetch
  await new Promise(resolve => setTimeout(resolve, 500));
  return { projects: 12, aiQueries: 248, tutorials: 5, citations: 34 };
}

export async function DashboardPage() {
  const stats = await fetchStats();

  return (
    <Suspense fallback={<Loader text="Loading Dashboard..." />}>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-slate-400">Welcome back! Here's what's happening with your projects.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Export Data</Button>
            <Button variant="primary" size="sm" asChild><Link to="/ai-workspace">New AI Task</Link></Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Render stats - animations on client sub-component if needed */}
        </div>
        {/* Recent Activity */}
      </div>
    </Suspense>
  );
}
