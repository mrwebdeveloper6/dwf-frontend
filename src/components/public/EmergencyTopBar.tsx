import React from 'react';
import { useDwf } from '../../context/DwfContext';
import { ShieldAlert, PhoneCall, Cloud } from 'lucide-react';

export const EmergencyTopBar: React.FC = () => {
  const { language, setLanguage } = useDwf();

  return (
    <div className="bg-emerald-950 text-white text-xs py-1.5 px-3 sm:px-4 border-b border-emerald-900/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Helpline - Only Helpline visible on mobile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white font-semibold tracking-wide shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse shrink-0" />
            <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider shadow-2xs">
              DWF-SOS
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-white">
              {language === 'bn' ? 'জরুরি হেল্পলাইন: ১৬৭৮৯' : 'Emergency Helpline: 16789'}
            </span>
          </div>

          {/* Desktop-only ambulance number */}
          <div className="hidden md:flex items-center gap-1.5 text-emerald-200">
            <PhoneCall className="w-3 h-3 text-red-400" />
            <span className="font-medium">{language === 'bn' ? 'অ্যাম্বুলেন্স ও দুর্ঘটনা সেল: ০১৭০০-০০০০০০' : 'Ambulance & Road Cell: 01700-000000'}</span>
          </div>
        </div>

        {/* Right: Only Language Switcher on mobile, Cloud status on large desktop */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cloud Database Badge - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/80 border border-emerald-700/60 text-[10px] text-emerald-200 font-medium" title="Google Cloud Firebase Firestore Synchronized">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <Cloud className="w-3 h-3 text-emerald-400" />
            <span>Firebase Cloud</span>
          </div>

          <span className="text-emerald-800 hidden lg:inline">|</span>

          {/* Bilingual Switcher - Kept on Mobile & Desktop */}
          <div className="flex items-center bg-emerald-900/80 rounded p-0.5 border border-emerald-800 shrink-0">
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                language === 'bn'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
