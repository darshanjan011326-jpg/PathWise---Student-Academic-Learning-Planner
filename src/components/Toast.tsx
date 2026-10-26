import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div
      role="status"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-[#132a22] text-white rounded-2xl shadow-xl border border-emerald-800/40 animate-in fade-in slide-in-from-top-4 duration-200 max-w-sm w-full mx-4"
    >
      <div className="w-8 h-8 rounded-xl bg-[#2d6a4f]/40 flex items-center justify-center shrink-0 text-[#95d5b2]">
        {type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
      </div>
      <p className="text-xs sm:text-sm font-medium text-emerald-50 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="p-1 text-emerald-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
