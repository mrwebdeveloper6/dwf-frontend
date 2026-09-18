import React from 'react';

interface DwfLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'color';
}

export const DwfLogo: React.FC<DwfLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'color'
}) => {
  const sizeMap = {
    xs: { icon: 28, title: 'text-xs', sub: 'text-[9px]' },
    sm: { icon: 38, title: 'text-sm', sub: 'text-[10px]' },
    md: { icon: 48, title: 'text-base', sub: 'text-xs' },
    lg: { icon: 64, title: 'text-xl', sub: 'text-sm' },
    xl: { icon: 84, title: 'text-2xl', sub: 'text-base' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official DWF Steering Wheel Vector Badge matching uploaded insignia */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.12))' }}
      >
        <defs>
          {/* Subtle gradient for white emblem disc */}
          <radialGradient id="dwfDiscGrad" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="88%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </radialGradient>
        </defs>

        {/* Outer Circular White Disc with soft bevel border */}
        <circle cx="250" cy="250" r="240" fill="url(#dwfDiscGrad)" stroke="#cbd5e1" strokeWidth="3" />
        <circle cx="250" cy="250" r="230" fill="#ffffff" />

        {/* Steering Wheel Rim & Spoke Base (Bangladeshi Green) */}
        <circle cx="250" cy="250" r="202" fill="#007941" />

        {/* 1. Top Wide Arch Cutout Window */}
        <path
          d="M 124 212
             C 126 128, 182 82, 250 82
             C 318 82, 374 128, 376 212
             C 336 195, 296 186, 250 186
             C 204 186, 164 195, 124 212 Z"
          fill="#ffffff"
        />

        {/* 2. Bottom-Left Curved Triangular Cutout Window */}
        <path
          d="M 120 258
             C 134 260, 174 270, 204 294
             C 206 332, 194 378, 162 412
             C 122 368, 100 315, 120 258 Z"
          fill="#ffffff"
        />

        {/* 3. Bottom-Right Curved Triangular Cutout Window */}
        <path
          d="M 380 258
             C 366 260, 326 270, 296 294
             C 294 332, 306 378, 338 412
             C 378 368, 400 315, 380 258 Z"
          fill="#ffffff"
        />

        {/* Center Hub: Outer White Ring Border and Solid Red Circle */}
        <circle cx="250" cy="254" r="58" fill="#ffffff" />
        <circle cx="250" cy="254" r="43" fill="#F42A41" />

        {/* Left Spoke Grip Capsule Slots (3 white rounded pills) */}
        <rect x="144" y="222" width="28" height="11" rx="5.5" fill="#ffffff" />
        <rect x="139" y="243" width="28" height="11" rx="5.5" fill="#ffffff" />
        <rect x="134" y="264" width="28" height="11" rx="5.5" fill="#ffffff" />

        {/* Right Spoke Grip Capsule Slots (3 white rounded pills) */}
        <rect x="328" y="222" width="28" height="11" rx="5.5" fill="#ffffff" />
        <rect x="333" y="243" width="28" height="11" rx="5.5" fill="#ffffff" />
        <rect x="338" y="264" width="28" height="11" rx="5.5" fill="#ffffff" />
      </svg>

      {/* Institutional Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-bold tracking-tight ${
                variant === 'light'
                  ? 'text-white'
                  : 'text-slate-900'
              } ${currentSize.title}`}
            >
              ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন
            </span>
            <span className="bg-emerald-700 text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wide font-mono">
              DWF
            </span>
          </div>
          <span
            className={`font-medium ${
              variant === 'light' ? 'text-emerald-300' : 'text-emerald-700'
            } ${currentSize.sub}`}
          >
            সুরক্ষিত চালক – নিরাপদ সড়ক
          </span>
        </div>
      )}
    </div>
  );
};
