import { useState } from 'react';
import { useAppStore } from '../../../lib/script';
import { LucideMail, LucideLock } from 'lucide-react';

export function LoginPage() {
  const { setState } = useAppStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name: email.split('@')[0], email, role: 'Student Researcher' };
    setState('user', user);
    setState('isAuthenticated', true);
    // Navigate to '/'
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
            {/* Password input */}
            <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 to-primary-400 text-white font-semibold py-3 rounded-lg transition-transform hover:scale-[1.02]">Sign In</button>
          </form>
          {/* Toggle mode, social buttons */}
        </div>
      </div>
    </div>
  );
}
