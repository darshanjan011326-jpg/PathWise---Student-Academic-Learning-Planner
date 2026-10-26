import React, { useState } from 'react';
import { Sparkles, Monitor, Smartphone } from 'lucide-react';
import { ScreenType, AuthMode } from './types';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { Toast } from './components/Toast';

type IconProps = {
  className?: string;
};

function SparklesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 9.9l5.6-1.9L12 2.5Z" />
      <path d="M18.5 15.5l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8.8-2.3Z" />
    </svg>
  );
}

function MonitorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function SmartphoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [userName, setUserName] = useState<string>('Alex Chen');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Nav actions
  const handleGetStarted = () => {
    setAuthMode('signup');
    setCurrentScreen('auth');
  };

  const handleLogIn = () => {
    setAuthMode('login');
    setCurrentScreen('auth');
  };

  const handleQuickDemo = () => {
    setUserName('Alex Chen');
    setCurrentScreen('home');
    showToast('Entered PathWise as student Alex Chen 👋');
  };

  const handleAuthComplete = (name: string, isNewSignup: boolean) => {
    setUserName(name || 'Alex Chen');
    setCurrentScreen('home');
    showToast(
      isNewSignup
        ? `Welcome to PathWise, ${name}! Your student workspace is ready 🚀`
        : `Welcome back, ${name}! Session restored.`
    );
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
    showToast('Signed out of student session');
  };

  return (
    <div className="min-h-screen bg-[#e8ede9] flex flex-col items-center justify-start text-slate-800">
      {/* Presentation & Screen Switcher Ribbon (Top Bar) */}
      <div className="w-full bg-[#132a22] text-white py-2 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#95d5b2] tracking-wide uppercase text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> PathWise Prototype
          </span>
          <span className="hidden sm:inline text-emerald-600">|</span>
          <span className="hidden sm:inline text-emerald-200/70 text-[11px]">
            Designed for University & CSE Students
          </span>
        </div>

        {/* Screen Switcher */}
        <div className="flex items-center gap-1.5 bg-[#081c15] p-1 rounded-xl border border-emerald-900/60">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
              currentScreen === 'welcome'
                ? 'bg-[#2d6a4f] text-white shadow-sm'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            1. Welcome
          </button>
          <button
            onClick={() => {
              setAuthMode('signup');
              setCurrentScreen('auth');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
              currentScreen === 'auth'
                ? 'bg-[#2d6a4f] text-white shadow-sm'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            2. Sign Up / Login
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
              currentScreen === 'home'
                ? 'bg-[#2d6a4f] text-white shadow-sm'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            3. Home Screen
          </button>
        </div>

        {/* Frame Toggle */}
        <div className="flex items-center gap-1 bg-[#081c15] p-1 rounded-xl border border-emerald-900/60">
          <button
            onClick={() => setIsMobileFrame(false)}
            className={`px-2 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition ${
              !isMobileFrame ? 'bg-[#2d6a4f] text-white' : 'text-emerald-300 hover:text-white'
            }`}
            title="Responsive full-width layout"
          >
            <Monitor className="w-3 h-3" /> Full Width
          </button>
          <button
            onClick={() => setIsMobileFrame(true)}
            className={`px-2 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition ${
              isMobileFrame ? 'bg-[#2d6a4f] text-white' : 'text-emerald-300 hover:text-white'
            }`}
            title="Mobile phone device mockup view"
          >
            <Smartphone className="w-3 h-3" /> Mobile Mockup
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className={`w-full flex-1 flex flex-col justify-center items-center ${isMobileFrame ? 'py-8 px-4' : ''}`}>
        {isMobileFrame ? (
          /* Phone Chassis Mockup Frame */
          <div className="relative w-full max-w-[400px] h-[844px] bg-slate-900 rounded-[50px] p-3 shadow-2xl shadow-emerald-950/30 border-4 border-slate-700/80 ring-1 ring-white/10 flex flex-col overflow-hidden">
            {/* Dynamic Island / Speaker */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center gap-2 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900/80 ring-1 ring-slate-800" />
              <div className="w-2 h-2 rounded-full bg-emerald-900/40" />
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full h-full bg-[#f4f7f4] rounded-[38px] overflow-y-auto overflow-x-hidden flex flex-col relative pt-5">
              {currentScreen === 'welcome' && (
                <WelcomeScreen
                  onGetStarted={handleGetStarted}
                  onLogIn={handleLogIn}
                  onQuickDemo={handleQuickDemo}
                />
              )}

              {currentScreen === 'auth' && (
                <AuthScreen
                  initialMode={authMode}
                  onNavigateHome={handleAuthComplete}
                  onBackToWelcome={() => setCurrentScreen('welcome')}
                />
              )}

              {currentScreen === 'home' && (
                <HomeScreen
                  userName={userName}
                  onLogout={handleLogout}
                  showToast={showToast}
                />
              )}
            </div>

            {/* Phone Home Bar */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-1.5 pointer-events-none shrink-0" />
          </div>
        ) : (
          /* Full Responsive Applet View */
          <div className="w-full flex-1 flex flex-col">
            {currentScreen === 'welcome' && (
              <WelcomeScreen
                onGetStarted={handleGetStarted}
                onLogIn={handleLogIn}
                onQuickDemo={handleQuickDemo}
              />
            )}

            {currentScreen === 'auth' && (
              <AuthScreen
                initialMode={authMode}
                onNavigateHome={handleAuthComplete}
                onBackToWelcome={() => setCurrentScreen('welcome')}
              />
            )}

            {currentScreen === 'home' && (
              <HomeScreen
                userName={userName}
                onLogout={handleLogout}
                showToast={showToast}
              />
            )}
          </div>
        )}
      </div>

      {/* Global Toast Feedback */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
