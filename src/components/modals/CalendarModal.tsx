import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, User, ChevronRight, Check } from 'lucide-react';
import { mockSchedule } from '../../data/mockData';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (text: string) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, onSelectAction }) => {
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Mon');
  const days: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  if (!isOpen) return null;

  const currentEvents = mockSchedule.filter((item) => item.day === selectedDay);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-100/60 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold">
              <CalendarIcon className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#081c15]">Class Timetable</h3>
              <p className="text-xs text-[#52796f]">Fall 2026 Academic Schedule & Deadlines</p>
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

        {/* Day of Week Selector */}
        <div className="flex items-center justify-between gap-1 p-1 bg-[#f0f5f1] rounded-2xl mb-5">
          {days.map((day) => {
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1b4332] text-white shadow-sm'
                    : 'text-[#405648] hover:text-[#081c15] hover:bg-white/50'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {currentEvents.length > 0 ? (
            currentEvents.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-emerald-100/80 bg-[#f7faf7] hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-bold text-[#081c15] leading-snug">{item.title}</h4>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      item.type === 'Lecture'
                        ? 'bg-blue-50 text-blue-700'
                        : item.type === 'Lab'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.type === 'Deadline'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#2d6a4f] font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {item.instructor}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-[#f7faf7] rounded-2xl border border-dashed border-emerald-200">
              <p className="text-sm font-semibold text-[#1b4332]">No scheduled lectures on {selectedDay}</p>
              <p className="text-xs text-slate-600 mt-1">Great day for self-paced DSA practice or group projects.</p>
            </div>
          )}
        </div>

        {/* Sync or Add action */}
        <div className="pt-4 mt-5 flex items-center justify-between border-t border-emerald-100 text-xs">
          <button
            onClick={() => {
              if (onSelectAction) onSelectAction('Exported 5 classes to your local student calendar!');
              onClose();
            }}
            className="text-[#2d6a4f] hover:underline font-semibold flex items-center gap-1"
          >
            Export to Google Calendar <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1b4332] text-white rounded-xl font-medium hover:bg-[#2d6a4f] transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
