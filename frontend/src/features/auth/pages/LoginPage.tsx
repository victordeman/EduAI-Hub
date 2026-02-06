'use client';

import { useState } from 'react';
import { useAppStore } from '../../../lib/script';
import { LucideMail, LucideLock, LucideEye, LucideEyeOff } from 'lucide-react';

export function LoginPage() {
  const { setState } = useAppStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name: email.split('@')[0], email, role: 'Student Researcher' };
    localStorage.setItem('eduai_user', JSON.stringify(user));
    setState('user', user);
    setState('isAuthenticated', true);
    // Redirect to dashboard
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-[var(--color-surface)]/70 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">E</div>
            <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome back' : 'Create account'}</h2>
            <p className="text-slate-400">{isLogin ? 'Enter your credentials to access your workspace' : 'Join the future of AI-powered education'}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
              <div className="relative">
                <LucideMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <LucideLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-10 bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {showPassword ? <LucideEyeOff size={20} /> : <LucideEye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-primary-600" />
                <span className="text-slate-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary-400 hover:text-primary-300">Forgot password?</Link>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 to-primary-400 text-white font-semibold py-3 rounded-lg transition-transform hover:scale-[1.02]">{isLogin ? 'Sign In' : 'Create Account'}</button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button onClick={handleToggle} className="text-primary-400 hover:text-primary-300 font-medium">{isLogin ? 'Sign up' : 'Sign in'}</button>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="text-xs text-center text-slate-500 mb-4">Or continue with</div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
                {/* Google SVG */}
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
                {/* GitHub SVG */}
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
