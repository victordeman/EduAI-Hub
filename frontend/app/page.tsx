import { Suspense } from 'react';
import { mockData } from '@/lib/script';
import { LucideFolder, LucideMessageSquare, LucideBook, LucideBookmark, LucideTrendingUp, LucideUser } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { Loader } from '@/components/ui/Loader';

async function fetchStats() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { projects: 12, aiQueries: 248, tutorials: 5, citations: 34 };
}

export default async function Home() {
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
            <Button variant="primary" size="sm"><Link href="/ai-workspace">New AI Task</Link></Button>
          </div>
        </div>
        <StatsAnimation stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
              <Link href="/projects" className="text-primary-400 hover:text-primary-300 text-sm font-medium">View all</Link>
            </div>
            <div className="space-y-4">
              {mockData.projects.slice(0, 3).map(project => (
                <div key={project.id} className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/60 transition-colors group cursor-pointer border border-transparent hover:border-slate-700">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-900 to-slate-800 flex items-center justify-center text-primary-400 font-bold text-lg shrink-0">
                    {project.title.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate group-hover:text-primary-400 transition-colors">{project.title}</h4>
                    <p className="text-sm text-slate-400 line-clamp-1 mt-1">{project.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <LucideUser size={12} />
                        {project.author}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                      <span>{project.applicants} applicants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {/* Add Quick Actions if needed */}
        </div>
      </div>
    </Suspense>
  );
}

// Client sub-component for animation
'use client';

function StatsAnimation({ stats }: { stats: Record<string, number> }) {
  const statsRef = useRef<{ [key: string]: HTMLHeadingElement | null }>({});

  useEffect(() => {
    Object.entries(stats).forEach(([key, end]) => {
      const obj = statsRef.current[key];
      if (obj) {
        obj.animate(
          [
            { textContent: '0' },
            { textContent: end.toString() }
          ],
          {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards',
          }
        );
      }
    });
  }, [stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card hover>
        <div className="text-primary-400 mb-2"><LucideFolder size={24} /></div>
        <h3 ref={el => statsRef.current['projects'] = el} className="text-3xl font-bold text-white mt-2">0</h3>
        <p>Active Projects</p>
        <div className="text-sm text-emerald-400 flex items-center gap-1 mt-2">
          <LucideTrendingUp size={16} />
          <span>+12% this month</span>
        </div>
      </Card>
      <Card hover>
        <div className="text-secondary-400 mb-2"><LucideMessageSquare size={24} /></div>
        <h3 ref={el => statsRef.current['aiQueries'] = el} className="text-3xl font-bold text-white mt-2">0</h3>
        <p>AI Queries</p>
        <div className="text-sm text-emerald-400 flex items-center gap-1 mt-2">
          <LucideTrendingUp size={16} />
          <span>+28% this week</span>
        </div>
      </Card>
      <Card hover>
        <div className="text-purple-400 mb-2"><LucideBook size={24} /></div>
        <h3 ref={el => statsRef.current['tutorials'] = el} className="text-3xl font-bold text-white mt-2">0</h3>
        <p>Tutorials Created</p>
        <div className="text-sm text-slate-400 mt-2">2 drafts pending</div>
      </Card>
      <Card hover>
        <div className="text-orange-400 mb-2"><LucideBookmark size={24} /></div>
        <h3 ref={el => statsRef.current['citations'] = el} className="text-3xl font-bold text-white mt-2">0</h3>
        <p>Citations Saved</p>
        <div className="text-sm text-emerald-400 flex items-center gap-1 mt-2">
          <span>From 8 documents</span>
        </div>
      </Card>
    </div>
  );
}
