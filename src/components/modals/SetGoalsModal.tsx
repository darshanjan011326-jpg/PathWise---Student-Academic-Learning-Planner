import React, { useState } from 'react';
import { X, Target, Flame, Code2, Award, Check } from 'lucide-react';

interface SetGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (message: string) => void;
}

export const SetGoalsModal: React.FC<SetGoalsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [weeklyHours, setWeeklyHours] = useState(25);
  const [targetProblems, setTargetProblems] = useState(15);
  const [targetGpa, setTargetGpa] = useState('3.9');
  const [focusTrack, setFocusTrack] = useState('FAANG / Tier-1 Software Engineering');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(`Goals saved: ${weeklyHours} hrs/week, ${targetProblems} DSA problems, target GPA ${targetGpa}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-emerald-100/60 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center font-bold">
              <Target className="w-5 h-5 text-[#1b4332]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#081c15]">Set Semester Goals</h3>
              <p className="text-xs text-[#52796f]">Calibrate your weekly benchmarks & aspirations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Slider 1: Weekly Study Hours */}
          <div className="p-4 rounded-2xl bg-[#f7faf7] border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-[#1b4332]">
                <Flame className="w-4 h-4 text-emerald-600" /> Target Study Hours / Week
              </span>
              <span className="text-sm font-bold text-[#1b4332] font-mono tabular-nums">{weeklyHours} hrs</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-[#2d6a4f] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>10 hrs (Light)</span>
              <span>25 hrs (Balanced)</span>
              <span>50 hrs (Intensive)</span>
            </div>
          </div>

          {/* Slider 2: Weekly DSA Problems */}
          <div className="p-4 rounded-2xl bg-[#f7faf7] border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-[#1b4332]">
                <Code2 className="w-4 h-4 text-emerald-600" /> Weekly DSA / LeetCode Target
              </span>
              <span className="text-sm font-bold text-[#1b4332] font-mono tabular-nums">{targetProblems} problems</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={targetProblems}
              onChange={(e) => setTargetProblems(Number(e.target.value))}
              className="w-full accent-[#2d6a4f] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>5 / wk</span>
              <span>15 / wk (Target)</span>
              <span>35 / wk (Hardcore)</span>
            </div>
          </div>

          {/* Target GPA & Track */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" /> Target GPA
              </label>
              <select
                value={targetGpa}
                onChange={(e) => setTargetGpa(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#f7faf7] border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] text-slate-800"
              >
                <option value="4.0">4.00 (Summa Cum Laude)</option>
                <option value="3.9">3.90 (Dean's Honor List)</option>
                <option value="3.8">3.80 (Distinction)</option>
                <option value="3.5">3.50 (Honors)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
                Primary Goal
              </label>
              <select
                value={focusTrack}
                onChange={(e) => setFocusTrack(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#f7faf7] border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] text-slate-800"
              >
                <option value="FAANG / Tier-1 Software Engineering">SWE Internships</option>
                <option value="Graduate Research">Grad School Prep</option>
                <option value="Open Source & Startups">Full-Stack Dev</option>
                <option value="Competitive Programming">ICPC / Coding</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-emerald-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold rounded-xl shadow-md shadow-emerald-900/10 flex items-center gap-1.5 transition active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              Update Benchmarks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
