'use client';

import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideHome, LucideZap, LucideFolder, LucideBookOpen, LucideDatabase, LucideSettings, LucideSparkles } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();

  useEffect(() => {
    const current = location.pathname || '/';
    document.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === current) {
        link.classList.add('bg-primary-600/20', 'text-primary-400', 'border-r-2', 'border-primary-500');
        link.classList.remove('text-slate-400', 'hover:bg-slate-800');
      } else {
        link.classList.remove('bg-primary-600/20', 'text-primary-400', 'border-r-2', 'border-primary-500');
        link.classList.add('text-slate-400', 'hover:bg-slate-800');
      }
    });
  }, [location]);

  return (
    <aside className="w-64 h-screen sticky top-16 bg-[var(--color-bg-dark)]/70 backdrop-blur-md border-r border-slate-700/50 hidden lg:flex flex-col">
      <div className="p-6">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Workspace</div>
        <nav className="space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors">
            <LucideHome size={20} />
            Overview
          </Link>
          <Link to="/ai-workspace" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors">
            <LucideZap size={20} />
            AI Agents
          </Link>
          <Link to="/projects" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors">
            <LucideFolder size={20} />
            My Projects
          </Link>
          <Link to="/tutorials" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors">
            <LucideBookOpen size={20} />
            Learning
          </Link>
        </nav>
      </div>

      <div className="p-6 border-t border-slate-700/50">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Resources</div>
        <nav className="space-y-1">
          <Link to="/knowledge-base" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <LucideDatabase size={20} />
            Knowledge Base
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <LucideSettings size={20} />
            Settings
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-gradient-to-br from-primary-900/50 to-secondary-900/50 rounded-xl p-4 border border-primary-700/30">
          <div className="flex items-center gap-2 mb-2">
            <LucideSparkles size={16} className="text-secondary-400" />
            <span className="text-sm font-semibold text-white">Pro Plan</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">Get unlimited AI queries and priority support.</p>
          <Button variant="secondary" size="sm" className="w-full">Upgrade</Button>
        </div>
      </div>
    </aside>
  );
}
