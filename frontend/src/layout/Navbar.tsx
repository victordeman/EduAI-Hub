import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../lib/script';
import { LucideMenu, LucideBell, LucideLogOut } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated } = useAppStore();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleMobileMenu = () => mobileMenuRef.current?.classList.toggle('hidden');
    // Add event listeners...
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--color-bg-dark)]/70 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
              E
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">EduAI Hub</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition">Dashboard</Link>
            {/* ... other links */}
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button className="p-2 text-slate-400 hover:text-white relative">
                  <LucideBell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {/* User avatar */}
                <button><LucideLogOut size={20} /></button>
              </div>
            ) : (
              // Sign in buttons
            )}
            <button className="md:hidden p-2 text-slate-400 hover:text-white">
              <LucideMenu size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
    </nav>
  );
}
