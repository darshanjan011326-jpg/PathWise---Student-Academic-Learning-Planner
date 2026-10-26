import React from 'react';
import { ArrowRight, Compass, Sparkles, BookMarked, Code, CheckCircle, ChevronRight } from 'lucide-react';
import { PathWiseLogo } from '../components/PathWiseLogo';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogIn: () => void;
  onQuickDemo: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onLogIn,
  onQuickDemo,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f7f4] via-[#ffffff] to-[#eef5f0] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2">
        <PathWiseLogo size="md" showTagline={true} />
        <button
          onClick={onLogIn}
          className="text-xs sm:text-sm font-semibold text-[#1b4332] hover:text-[#2d6a4f] py-2 px-3 sm:px-4 rounded-xl hover:bg-[#e8f5e9]/70 transition-colors"
        >
          Sign In
        </button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto my-auto py-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left / Top: Hero Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-emerald-950/10 border-4 border-white bg-white group">
            <img
              src="/src/assets/images/pathwise_hero_study_1792670712598.jpg"
              alt="Student planning academic milestones and learning Java on laptop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle floating badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-2xl p-2.5 px-3.5 border border-emerald-100/80 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center font-bold text-xs">
                  <Code className="w-4 h-4 text-[#1b4332]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#081c15]">Java & DSA Track</p>
                  <p className="text-[10px] text-[#52796f]">Structured college roadmaps</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#1b4332] bg-[#e8f5e9] px-2 py-1 rounded-lg">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Hero Typography & CTAs */}
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
          {/* Category / Sub-Kicker */}
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] bg-[#e8f5e9] px-3 py-1 rounded-full border border-emerald-200/60">
              For Computer Science & STEM Students
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#081c15] tracking-tight leading-[1.15] mb-4 text-balance">
            Plan Today, <span className="text-[#2d6a4f]">Build Tomorrow</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#405648] leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
            The dedicated academic workspace for students. Organize your course schedules, tackle high-yield Java & DSA milestones, and turn semester stress into confident progress.
          </p>

          {/* Value Props Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 text-left max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2 rounded-xl border border-emerald-100">
              <CheckCircle className="w-4 h-4 text-[#2d6a4f] shrink-0" />
              <span>Smart Study Timetable</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2 rounded-xl border border-emerald-100">
              <CheckCircle className="w-4 h-4 text-[#2d6a4f] shrink-0" />
              <span>DSA & Java Practice Hub</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2 rounded-xl border border-emerald-100">
              <CheckCircle className="w-4 h-4 text-[#2d6a4f] shrink-0" />
              <span>Weekly Streak Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2 rounded-xl border border-emerald-100">
              <CheckCircle className="w-4 h-4 text-[#2d6a4f] shrink-0" />
              <span>Target GPA Benchmarks</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto lg:mx-0">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto flex-1 min-h-[48px] px-6 py-3.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-sm font-bold rounded-2xl shadow-lg shadow-emerald-950/15 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLogIn}
              className="w-full sm:w-auto flex-1 min-h-[48px] px-6 py-3.5 bg-white hover:bg-[#f7faf7] text-[#1b4332] text-sm font-bold rounded-2xl border-2 border-[#1b4332]/20 hover:border-[#1b4332] flex items-center justify-center transition-all active:scale-[0.98]"
            >
              Log In
            </button>
          </div>

          {/* Instant demo shortcut */}
          <div className="mt-4 text-center lg:text-left">
            <button
              onClick={onQuickDemo}
              className="text-xs font-semibold text-[#52796f] hover:text-[#1b4332] underline underline-offset-4 inline-flex items-center gap-1 transition"
            >
              Looking to test the prototype? Instant Preview as Student Alex <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto py-4 text-center border-t border-emerald-200/40 text-xs text-[#52796f]">
        PathWise Academic Platform · Designed for Student Excellence
      </footer>
    </div>
  );
};
