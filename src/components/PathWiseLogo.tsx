import React from 'react';

interface PathWiseLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const PathWiseLogo: React.FC<PathWiseLogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl';

  return (
    <div className="flex items-center gap-2.5">
      {/* Brand Icon Emblem */}
      <div
        className={`${iconSize} rounded-2xl bg-[#1b4332] text-white flex items-center justify-center shadow-md shadow-[#1b4332]/20 shrink-0 border border-emerald-700/50 relative overflow-hidden`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6"
        >
          {/* Compass / Path arc */}
          <circle cx="16" cy="16" r="12" stroke="#52b788" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          {/* S-curve path */}
          <path
            d="M9 23C9 19 13 18 16 16C19 14 23 13 23 9"
            stroke="#d8f3dc"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Milestone node points */}
          <circle cx="9" cy="23" r="2.5" fill="#74c69d" />
          <circle cx="16" cy="16" r="2" fill="#d8f3dc" />
          <circle cx="23" cy="9" r="3" fill="#ffffff" />
          {/* Leaf seedling tip */}
          <path
            d="M23 9C24.5 7.5 25 5 25 5C25 5 22.5 5.5 21 7"
            stroke="#95d5b2"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`${textSize} font-extrabold tracking-tight text-[#081c15] leading-none flex items-center gap-1`}>
          Path<span className="text-[#2d6a4f]">Wise</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-semibold text-[#52796f] tracking-wider uppercase mt-0.5">
            Student Academic Compass
          </span>
        )}
      </div>
    </div>
  );
};
