import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideHome, LucideZap, LucideFolder, LucideBookOpen } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();

  useEffect(() => {
    // Highlight current route logic using location.pathname
  }, [location]);

  return (
    <aside className="w-64 h-screen sticky top-16 bg-[var(--color-bg-dark)]/70 backdrop-blur-md border-r border-slate-700/50 hidden lg:flex flex-col">
      <div className="p-6">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Workspace</div>
        <nav className="space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-slate-400 hover:text-white hover:bg-slate-800">
            <LucideHome size={20} />
            Overview
          </Link>
          {/* ... other links */}
        </nav>
      </div>
      {/* Resources and Pro Plan sections */}
    </aside>
  );
}
