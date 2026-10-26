import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Check, Lock, Mail, User, GraduationCap, Sparkles } from 'lucide-react';
import { AuthMode } from '../types';
import { PathWiseLogo } from '../components/PathWiseLogo';

interface AuthScreenProps {
  initialMode: AuthMode;
  onNavigateHome: (userName: string, isNewSignup: boolean) => void;
  onBackToWelcome: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode,
  onNavigateHome,
  onBackToWelcome,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('Alex Chen');
  const [email, setEmail] = useState('alex.chen@state.edu');
  const [password, setPassword] = useState('StudentSecure123');
  const [degree, setDegree] = useState('Computer Science & Engineering');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = mode === 'signup' ? (fullName.trim() || 'Alex Chen') : 'Alex Chen';
    onNavigateHome(displayName, mode === 'signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f7f4] via-[#ffffff] to-[#eef5f0] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between">
        <button
          onClick={onBackToWelcome}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#1b4332] hover:text-[#2d6a4f] py-2 px-3 rounded-xl hover:bg-[#e8f5e9] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <PathWiseLogo size="sm" />
        <div className="w-16" /> {/* Balance spacer */}
      </header>

      {/* Main Form Container */}
      <main className="max-w-md w-full mx-auto my-auto py-6">
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-100 p-6 sm:p-8">
          {/* Form Switcher Tabs */}
          <div className="flex p-1 bg-[#f0f5f1] rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-[#1b4332] text-white shadow-sm'
                  : 'text-[#405648] hover:text-[#081c15]'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-[#1b4332] text-white shadow-sm'
                  : 'text-[#405648] hover:text-[#081c15]'
              }`}
            >
              Log In
            </button>
          </div>

          {/* Heading */}
          <div className="mb-6 text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#081c15] tracking-tight">
              {mode === 'signup' ? 'Create Student Account' : 'Welcome Back, Student'}
            </h2>
            <p className="text-xs sm:text-sm text-[#52796f] mt-1">
              {mode === 'signup'
                ? 'Join thousands of students mastering their academic milestones'
                : 'Enter your credentials to access your daily tasks & roadmaps'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4 text-emerald-700/60" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-[#f7faf7] border border-emerald-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:bg-white text-slate-800 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
                University / Student Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4 text-emerald-700/60" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-[#f7faf7] border border-emerald-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:bg-white text-slate-800 transition"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
                  Degree / Program
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-4 h-4 text-emerald-700/60" />
                  </div>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-[#f7faf7] border border-emerald-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:bg-white text-slate-800 transition"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Electrical & Computer Eng">Electrical & Computer Eng</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Self-Taught Developer">Self-Taught Developer</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Demo Reset: A recovery email preview has been sent to alex.chen@state.edu')}
                    className="text-xs font-medium text-[#2d6a4f] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4 text-emerald-700/60" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm bg-[#f7faf7] border border-emerald-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:bg-white text-slate-800 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me / Terms */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#405648]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1b4332] focus:ring-[#2d6a4f] accent-[#1b4332]"
                />
                <span>Remember this device</span>
              </label>
              {mode === 'signup' && (
                <span className="text-[#52796f] text-[11px]">Free student plan</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full min-h-[48px] mt-4 px-6 py-3.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-sm font-bold rounded-2xl shadow-lg shadow-emerald-950/15 flex items-center justify-center gap-2 transition active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#95d5b2]" />
              {mode === 'signup' ? 'Create Student Account' : 'Log In to PathWise'}
            </button>
          </form>

          {/* Social / Quick Demo Provider Buttons */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-100" />
            </div>
            <span className="relative bg-white px-3 text-xs text-[#52796f]">or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onNavigateHome('Alex Chen', false)}
              className="py-2.5 px-3 rounded-2xl border border-emerald-100 bg-[#f7faf7] hover:bg-[#e8f5e9]/50 text-xs font-semibold text-[#1b4332] flex items-center justify-center gap-2 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google Student
            </button>

            <button
              type="button"
              onClick={() => onNavigateHome('Alex Chen', false)}
              className="py-2.5 px-3 rounded-2xl border border-emerald-100 bg-[#f7faf7] hover:bg-[#e8f5e9]/50 text-xs font-semibold text-[#1b4332] flex items-center justify-center gap-2 transition"
            >
              <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub Pack
            </button>
          </div>

          {/* Toggle between modes */}
          <div className="mt-6 text-center text-xs text-[#52796f]">
            {mode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-[#1b4332] hover:text-[#2d6a4f] underline underline-offset-2 ml-1"
                >
                  Log In instead
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-[#1b4332] hover:text-[#2d6a4f] underline underline-offset-2 ml-1"
                >
                  Sign Up for free
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md w-full mx-auto py-3 text-center text-xs text-[#52796f]">
        PathWise UI Prototype · No real credentials stored
      </footer>
    </div>
  );
};
