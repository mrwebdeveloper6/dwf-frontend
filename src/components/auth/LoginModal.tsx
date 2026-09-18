import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  X, 
  LogIn, 
  Shield, 
  UserCheck, 
  KeyRound, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { 
    language, 
    showLoginModal, 
    setShowLoginModal, 
    loginAsMember, 
    loginAsAdmin, 
    members 
  } = useDwf();

  const [activeTab, setActiveTab] = useState<'MEMBER' | 'ADMIN'>('MEMBER');
  const [memberIdInput, setMemberIdInput] = useState('DWF-000142');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [adminRole, setAdminRole] = useState('SUPER_ADMIN');

  if (!showLoginModal) return null;

  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsMember(memberIdInput.trim());
    setShowLoginModal(false);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin(adminRole);
    setShowLoginModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl">
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'bn' ? 'ডিডব্লিউএফ সিকিউর লগইন' : 'DWF Secure Sign-In'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'সদস্য পোর্টাল ও প্রশাসনিক এক্সেস' : 'Driver Portal & Staff Access'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLoginModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Member vs Admin */}
        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('MEMBER')}
            className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'MEMBER'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{language === 'bn' ? 'চালক সদস্য লগইন' : 'Driver Member'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ADMIN')}
            className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'ADMIN'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{language === 'bn' ? 'স্টাফ / এডমিন' : 'Admin & Staff'}</span>
          </button>
        </div>

        {/* Member Login Tab */}
        {activeTab === 'MEMBER' ? (
          <form onSubmit={handleMemberLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'সদস্য আইডি অথবা মোবাইল নম্বর' : 'Member ID or Phone Number'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={memberIdInput}
                  onChange={(e) => setMemberIdInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'পাসওয়ার্ড / পিন' : 'Password / Security PIN'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>{language === 'bn' ? 'লগইন করুন' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Drivers */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] text-slate-500 mb-1.5 font-medium">
                {language === 'bn' ? 'দ্রুত ডেমো লগইন:' : 'Fast Demo Accounts:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { loginAsMember('DWF-000142'); setShowLoginModal(false); }}
                  className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-left cursor-pointer"
                >
                  <p className="font-bold text-emerald-900 text-[11px]">মোঃ কামাল হোসেন</p>
                  <p className="text-[10px] text-slate-500 font-mono">DWF-000142 (বাস চালক)</p>
                </button>
                <button
                  type="button"
                  onClick={() => { loginAsMember('DWF-000143'); setShowLoginModal(false); }}
                  className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left cursor-pointer"
                >
                  <p className="font-bold text-slate-900 text-[11px]">মোঃ রফিকুল ইসলাম</p>
                  <p className="text-[10px] text-slate-500 font-mono">DWF-000143 (ট্রাক চালক)</p>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Admin Login Tab */
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'প্রশাসনিক ভূমিকা (Role) নির্বাচন করুন' : 'Select Administrative Role'}
              </label>
              <select
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-600 focus:outline-none"
              >
                <option value="SUPER_ADMIN">সুপার এডমিন (Super Admin - Full Control)</option>
                <option value="ACCOUNTS_OFFICER">অ্যাকাউন্টস অফিসার (Accounts & Ledger)</option>
                <option value="MEDICAL_OFFICER">মেডিকেল অফিসার (Medical Claims Specialist)</option>
                <option value="MEMBERSHIP_OFFICER">মেম্বারশিপ অফিসার (Application Reviewer)</option>
                <option value="BRANCH_MANAGER">ব্রাঞ্চ ম্যানেজার (Branch Operator)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'অফিসিয়াল ইমেইল / ইউজার আইডি' : 'Official Staff Email / ID'}
              </label>
              <input
                type="text"
                defaultValue="admin@dwf-bd.org"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'সিকিউর পাসওয়ার্ড' : 'Password'}
              </label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{language === 'bn' ? 'এডমিন হিসেবে প্রবেশ করুন' : 'Enter Management Panel'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
