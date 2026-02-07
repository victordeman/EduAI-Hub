'use client';

import { useSession, signOut } from 'auth/react';
import { LucideMenu, LucideBell, LucideLogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

export function Navbar() {
  const { data: session } = useSession();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => mobileMenuRef.current?.classList.toggle('hidden');
    const btn = document.getElementById('mobile-menu-btn');
    btn?.addEventListener('click', handleToggle);
    return () => btn?.removeEventListener('click', handleToggle);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--color-bg-dark)]/70 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
              E
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">EduAI Hub</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition">Dashboard</Link>
            <Link href="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition">Projects</Link>
            <Link href="/ai-workspace" className="px-3 py-2 rounded-md text-sm font-medium text-primary-400 hover:text-primary-300 hover:bg-primary-500/10 transition flex items-center gap-1">
              <LucideZap size={16} />
              AI Workspace
            </Link>
            <Link href="/tutorials" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition">Tutorials</Link>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <button className="p-2 text-slate-400 hover:text-white relative">
                  <LucideBell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                  {session.user.name?.charAt(0) || 'U'}
                </div>
                <button onClick={() => signOut()} className="p-2 text-slate-400 hover:text-white">
                  <LucideLogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm"><Link href="/login">Sign In</Link></Button>
                <Button variant="primary" size="sm"><Link href="/login">Get Started</Link></Button>
              </>
            )}
            <button id="mobile-menu-btn" className="md:hidden p-2 text-slate-400 hover:text-white">
              <LucideMenu size={24} />
            </button>
          </div>
        </div>
      </div>
      <div ref={mobileMenuRef} className="hidden md:hidden bg-[var(--color-bg-dark)]/70 backdrop-blur-md border-t border-slate-700/50">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Dashboard</Link>
          <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Projects</Link>
          <Link href="/ai-workspace" className="block px-3 py-2 rounded-md text-base font-medium text-primary-400 hover:text-primary-300 hover:bg-primary-500/10">AI Workspace</Link>
          <Link href="/tutorials" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Tutorials</Link>
        </div>
      </div>
    </nav>
  );
}
