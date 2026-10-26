import React, { useState } from 'react';
import { X, BookOpen, Code2, CheckCircle2, Copy, Check, Play, ExternalLink } from 'lucide-react';
import { LearningCard } from '../../types';

interface LearnModalProps {
  card: LearningCard | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteModule?: (cardId: string) => void;
}

export const LearnModal: React.FC<LearnModalProps> = ({ card, isOpen, onClose, onCompleteModule }) => {
  const [copied, setCopied] = useState(false);
  const [markedCompleted, setMarkedCompleted] = useState(false);

  if (!isOpen || !card) return null;

  const handleCopy = () => {
    if (card.codeSnippet) {
      navigator.clipboard.writeText(card.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggleCompleted = () => {
    setMarkedCompleted(!markedCompleted);
    if (onCompleteModule) {
      onCompleteModule(card.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-emerald-100/60 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center font-bold shrink-0 mt-0.5">
              <Code2 className="w-5 h-5 text-[#1b4332]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d6a4f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {card.category} Track · {card.level}
                </span>
                <span className="text-xs text-slate-500">~{card.estimatedHours} hours</span>
              </div>
              <h3 className="text-lg font-bold text-[#081c15] leading-snug">{card.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <div className="mb-5">
          <p className="text-xs sm:text-sm text-[#405648] leading-relaxed">{card.description}</p>
        </div>

        {/* Syllabus / Sub-topics */}
        <div className="mb-5 p-4 rounded-2xl bg-[#f7faf7] border border-emerald-100">
          <h4 className="text-xs font-bold text-[#1b4332] uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" /> Key Learning Checkpoints
          </h4>
          <div className="grid sm:grid-cols-2 gap-2">
            {card.topics.map((topic, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-emerald-100/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet */}
        {card.codeSnippet && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[11px] font-mono text-[#2d6a4f] font-semibold">Java 21 Solution Template</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-[#1b4332] transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-3.5 bg-[#081c15] text-[#d8f3dc] rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-emerald-950">
              <code>{card.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6 p-3 rounded-2xl bg-[#f0f5f1] border border-emerald-100">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-semibold text-[#1b4332]">Pathway Mastery</span>
            <span className="font-bold text-[#1b4332] font-mono">{card.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-emerald-200/50">
            <div
              className="h-full bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full transition-all duration-300"
              style={{ width: `${card.progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {card.completedModules} of {card.totalModules} modules finished
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-emerald-100">
          <button
            onClick={handleToggleCompleted}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
              markedCompleted
                ? 'bg-emerald-100 text-[#1b4332] border-emerald-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
            {markedCompleted ? 'Lesson Completed ✓' : 'Mark Lesson Complete'}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold rounded-xl shadow-md shadow-emerald-900/10 flex items-center gap-1.5 transition active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Resume Practice
          </button>
        </div>
      </div>
    </div>
  );
};
