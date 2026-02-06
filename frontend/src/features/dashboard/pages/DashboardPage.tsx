import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockData } from '../../../lib/script';
import { LucideFolder, LucideMessageSquare, LucideBook, LucideBookmark } from 'lucide-react';
import { Button } from '../../../components/ui/Button'; // Use modernized Button

export function DashboardPage() {
  const statsRef = useRef<{ [key: string]: HTMLHeadingElement | null }>({});

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => Promise.resolve({ projects: 12, aiQueries: 248, tutorials: 5, citations: 34 }), // Simulate API
  });

  useEffect(() => {
    if (stats) {
      // Animate values using GSAP or CSS for smoothness (replace requestAnimationFrame)
      Object.entries(stats).forEach(([key, end]) => {
        const obj = statsRef.current[`stat-${key}`];
        if (obj) {
          // Modern animation with web animations API
          obj.animate([{ innerHTML: '0' }, { innerHTML: end.toString() }], { duration: 1000, easing: 'ease-out' });
        }
      });
    }
  }, [stats]);

  return (
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
        {/* Cards with refs for animation */}
      </div>
      {/* Recent Activity */}
    </div>
  );
}
