import React from 'react';
import { useDwf } from '../../context/DwfContext';
import { PhoneCall, ShieldAlert, Globe, UserCheck, Shield } from 'lucide-react';

export const EmergencyTopBar: React.FC = () => {
  const { language, setLanguage, t, loginAsMember, loginAsAdmin, user, logout } = useDwf();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Emergency SOS / Helpline */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold tracking-wide">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span className="bg-red-950/80 text-red-300 border border-red-800/60 px-1.5 py-0.5 rounded text-[10px] font-bold">
              DWF-SOS
            </span>
            <span>{language === 'bn' ? 'জরুরি হেল্পলাইন: ১৬৭৮৯' : 'Emergency Toll-Free: 16789'}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>{language === 'bn' ? 'অ্যাম্বুলেন্স ও দুর্ঘটনা সেল: ০১৭০০-০০০০০০' : 'Ambulance & Road Cell: 01700-000000'}</span>
          </div>
        </div>

        {/* Right: Quick Portals & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Switcher / Status */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-medium">
                {user.role === 'MEMBER' ? `সদস্য: ${user.name}` : `এডমিন: ${user.name}`}
              </span>
              <button
                onClick={logout}
                className="text-slate-400 hover:text-white underline text-[11px] ml-1 cursor-pointer"
              >
                {language === 'bn' ? 'লগআউট' : 'Logout'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => loginAsMember('DWF-000142')}
                className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 px-2 py-0.5 rounded transition cursor-pointer hover:bg-slate-800"
                title="লগইন ডেমো চালক একাউন্ট (কামাল হোসেন)"
              >
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span>{language === 'bn' ? 'ডেমো সদস্য' : 'Demo Driver'}</span>
              </button>

              <span className="text-slate-700">|</span>

              <button
                onClick={() => loginAsAdmin('SUPER_ADMIN')}
                className="flex items-center gap-1 text-slate-300 hover:text-amber-400 px-2 py-0.5 rounded transition cursor-pointer hover:bg-slate-800"
                title="অফিসিয়াল এডমিন একাউন্ট"
              >
                <Shield className="w-3 h-3 text-amber-400" />
                <span>{language === 'bn' ? 'এডমিন পোর্টাল' : 'Admin Panel'}</span>
              </button>
            </div>
          )}

          <span className="text-slate-700">|</span>

          {/* Bilingual Switcher */}
          <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                language === 'bn'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
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
