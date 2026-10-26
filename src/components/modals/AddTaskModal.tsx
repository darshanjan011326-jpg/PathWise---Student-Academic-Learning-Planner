import React, { useState } from 'react';
import { X, Check, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { TaskItem } from '../../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: TaskItem) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS 301 · Data Structures');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [dueTime, setDueTime] = useState('Today, 7:00 PM');
  const [tag, setTag] = useState('Java Coding');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      course,
      priority,
      dueTime,
      tag: tag || 'General Study',
      completed: false,
    };

    onAddTask(newTask);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-100/60 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 text-[#2d6a4f]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#081c15]">Add Study Task</h3>
              <p className="text-xs text-[#52796f]">Keep your coursework and coding goals organized</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
              Task Description
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement Dijkstra Shortest Path algorithm"
              className="w-full px-4 py-3 text-sm bg-[#f7faf7] border border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:bg-white text-slate-800 transition"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
                Course / Subject
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-[#f7faf7] border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] text-slate-800"
              >
                <option value="CS 301 · Data Structures">CS 301 · Data Structures</option>
                <option value="CS 320 · Advanced Java">CS 320 · Advanced Java</option>
                <option value="CS 340 · Relational Databases">CS 340 · Relational DB</option>
                <option value="Interview Prep · DSA">Interview Prep · DSA</option>
                <option value="Math 210 · Discrete Math">Math 210 · Discrete Math</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
                Due Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  placeholder="e.g. Today, 9:00 PM"
                  className="w-full px-3 py-2.5 text-xs bg-[#f7faf7] border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] text-slate-800"
                />
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Priority selector */}
          <div>
            <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['high', 'medium', 'low'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setPriority(lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium capitalize border transition-all ${
                    priority === lvl
                      ? lvl === 'high'
                        ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-sm'
                        : lvl === 'medium'
                        ? 'bg-amber-50 border-amber-400 text-amber-700 shadow-sm'
                        : 'bg-emerald-50 border-emerald-400 text-[#1b4332] shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {lvl} priority
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1b4332] uppercase tracking-wider mb-1.5">
              Topic Tag
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. Graphs, JVM, Lab Report"
              className="w-full px-3 py-2.5 text-xs bg-[#f7faf7] border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] text-slate-800"
            />
          </div>

          {/* Footer actions */}
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
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
