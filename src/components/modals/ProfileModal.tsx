import React, { useState } from 'react';
import { X, User, Flame, Award, Clock, BookOpen, LogOut, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { StudentProfile } from '../../types';

interface ProfileModalProps {
  profile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onSaveProfile?: (updated: StudentProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onLogout,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [major, setMajor] = useState(profile.major);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (onSaveProfile) {
      onSaveProfile({
        ...profile,
        name,
        major,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-100/60 mb-4">
          <h3 className="text-base font-bold text-[#081c15] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Student Profile & Academic Hub
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Lockup */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-[#e8f5e9] to-[#d8f3dc] border border-emerald-200/70 mb-5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-[#2d6a4f]/30 shrink-0 bg-white">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2 py-1 text-sm bg-white rounded-lg border border-emerald-300 font-bold"
                />
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full px-2 py-1 text-xs bg-white rounded-lg border border-emerald-300"
                />
              </div>
            ) : (
              <>
                <h4 className="text-base font-bold text-[#081c15] truncate">{profile.name}</h4>
                <p className="text-xs text-[#2d6a4f] font-semibold truncate">{profile.major}</p>
                <p className="text-[11px] text-[#405648] truncate">{profile.university} · {profile.year}</p>
              </>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <div className="p-3 rounded-2xl bg-[#f7faf7] border border-emerald-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Daily Streak</div>
              <div className="text-base font-extrabold text-[#081c15] font-mono">{profile.streakDays} Days</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#f7faf7] border border-emerald-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1b4332] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Solved DSA</div>
              <div className="text-base font-extrabold text-[#081c15] font-mono">{profile.solvedProblems} Probs</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#f7faf7] border border-emerald-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Study Hours</div>
              <div className="text-base font-extrabold text-[#081c15] font-mono">{profile.studyHoursThisWeek} hrs</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#f7faf7] border border-emerald-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Semester GPA</div>
              <div className="text-base font-extrabold text-[#081c15] font-mono">{profile.gpa} / 4.0</div>
            </div>
          </div>
        </div>

        {/* University Info & Badges */}
        <div className="mb-5 p-3.5 rounded-2xl bg-[#f0f5f1] border border-emerald-100 text-xs space-y-2">
          <div className="flex justify-between items-center text-slate-600">
            <span>Student Matriculation ID</span>
            <span className="font-mono font-semibold text-slate-800">{profile.studentId}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Institutional Email</span>
            <span className="font-mono text-slate-800">{profile.email}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Active Term</span>
            <span className="font-semibold text-[#1b4332]">Fall Semester 2026</span>
          </div>
        </div>

        {/* Profile Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-emerald-100">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full py-2.5 bg-[#1b4332] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/10 hover:bg-[#2d6a4f] transition"
            >
              <Check className="w-4 h-4" /> Save Profile Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 bg-[#e8f5e9] text-[#1b4332] rounded-xl text-xs font-semibold hover:bg-[#d8f3dc] transition"
            >
              Edit Student Details
            </button>
          )}

          <button
            onClick={onLogout}
            className="w-full py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-rose-200 transition"
          >
            <LogOut className="w-4 h-4" /> Sign Out (Back to Welcome)
          </button>
        </div>
      </div>
    </div>
  );
};
