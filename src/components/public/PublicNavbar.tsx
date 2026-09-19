import React, { useState, useEffect } from 'react';
import { useDwf } from '../../context/DwfContext';
import { DwfLogo } from '../common/DwfLogo';
import { 
  Menu, 
  X, 
  ChevronRight, 
  UserCheck, 
  LogIn, 
  UserPlus, 
  PhoneCall, 
  Users, 
  HeartPulse, 
  Bell, 
  Calculator, 
  Phone,
  Home,
  ShieldCheck
} from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const { 
    language, 
    setActiveView, 
    setShowApplyModal, 
    setShowLoginModal,
    setShowVerifyModal,
    user 
  } = useDwf();

  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when menu is open on mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setActiveView(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', labelBn: 'মূল পাতা', labelEn: 'Home', icon: Home, descBn: 'ফাউন্ডেশন পরিচিতি ও প্রধান কার্যক্রম', descEn: 'Overview & Main Highlights' },
    { id: 'central-committee', labelBn: 'কেন্দ্রীয় কমিটি', labelEn: 'Committee', icon: Users, descBn: 'কেন্দ্রীয় পরিচালনা পর্ষদের সদস্যবৃন্দ', descEn: 'Central Executive Leadership' },
    { id: 'programs', labelBn: 'কল্যাণ সেবা', labelEn: 'Programs', icon: HeartPulse, descBn: 'চিকিৎসা, দুর্ঘটনা ও জরুরি সহায়তা', descEn: 'Medical, Accident & Support' },
    { id: 'calculator', labelBn: 'অনুদান হিসাব', labelEn: 'Calculator', icon: Calculator, descBn: 'কল্যাণ সুবিধা ও অনুদান সিমুলেটর', descEn: 'Aid & Grant Estimator' },
    { id: 'news', labelBn: 'সংবাদ ও বিজ্ঞপ্তি', labelEn: 'Notices', icon: Bell, descBn: 'জরুরি নোটিশ, সার্কুলার ও সংবাদ', descEn: 'Official Circulars & News' },
    { id: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone, descBn: 'শাখা অফিস, হেল্পলাইন ও ঠিকানা', descEn: 'Branch Network & Office' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Brand Logo */}
            <div 
              onClick={() => scrollToSection('home')}
              className="cursor-pointer transition hover:opacity-90 shrink-0 py-1"
              title="ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন (DWF)"
            >
              <DwfLogo size="sm" className="sm:hidden" />
              <DwfLogo size="md" className="hidden sm:flex" />
            </div>

            {/* Right: Actions (Tablet/Compact style across all screen sizes) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Member Verification Button (সদস্য যাচাই) */}
              <button
                onClick={() => setShowVerifyModal(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-xl transition cursor-pointer shadow-2xs shrink-0 active:scale-95"
                title={language === 'bn' ? 'সদস্যপদ ও কার্ড যাচাই করুন' : 'Verify Member ID & Card'}
              >
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span className="hidden xs:inline sm:inline">{language === 'bn' ? 'সদস্য যাচাই' : 'Verify Member'}</span>
                <span className="xs:hidden sm:hidden">{language === 'bn' ? 'যাচাই' : 'Verify'}</span>
              </button>

              {/* User Session status / Login CTA */}
              {user ? (
                <button
                  onClick={() => setActiveView(user.role === 'MEMBER' ? 'member-portal' : 'admin-panel')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer shadow-xs shrink-0"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{user.role === 'MEMBER' ? (language === 'bn' ? 'ড্যাশবোর্ড' : 'Portal') : (language === 'bn' ? 'এডমিন' : 'Admin')}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition cursor-pointer shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-600" />
                  <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
                </button>
              )}

              {/* Apply CTA Button */}
              <button
                onClick={() => setShowApplyModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer shadow-xs shrink-0 active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'bn' ? 'সদস্য আবেদন' : 'Apply'}</span>
                <span className="sm:hidden">{language === 'bn' ? 'আবেদন' : 'Apply'}</span>
              </button>

              {/* Menu Toggle Button (Tablet style available across all screens) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center p-2 rounded-xl text-slate-800 hover:text-emerald-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition cursor-pointer shrink-0 active:scale-95"
                aria-label={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
                title={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-red-600" />
                ) : (
                  <Menu className="w-5 h-5 text-emerald-800" />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* Dropdown Menu (Tablet & Desktop friendly responsive layout) */}
        {menuOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 top-16 sm:top-20 bg-slate-900/40 backdrop-blur-xs z-30 transition-opacity"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Container */}
            <div className="relative z-40 bg-white border-t border-slate-200 shadow-2xl px-4 sm:px-6 lg:px-8 py-5 max-h-[85vh] overflow-y-auto">
              <div className="max-w-7xl mx-auto space-y-4">
                
                {/* Top Banner inside menu */}
                <div className="p-3.5 sm:p-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase">ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন (DWF)</p>
                    <p className="text-xs sm:text-sm font-bold text-white">সুরক্ষিত চালক – সমৃদ্ধ পরিবার – নিরাপদ বাংলাদেশ</p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => { setShowVerifyModal(true); setMenuOpen(false); }}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer border border-white/15"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{language === 'bn' ? 'সদস্য যাচাই' : 'Verify'}</span>
                    </button>
                    {!user && (
                      <button
                        onClick={() => { setShowLoginModal(true); setMenuOpen(false); }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Navigation Grid (Adaptive 1, 2, or 3 columns on tablet/desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="group flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/90 border border-slate-200/80 hover:border-emerald-300 transition text-left cursor-pointer shadow-2xs"
                    >
                      <div className="p-2.5 rounded-xl bg-white text-emerald-700 border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition shrink-0">
                        <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-900 transition">
                            {language === 'bn' ? link.labelBn : link.labelEn}
                          </p>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {language === 'bn' ? link.descBn : link.descEn}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Bottom Quick Action Bar */}
                <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => { setShowApplyModal(true); setMenuOpen(false); }}
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition cursor-pointer active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{language === 'bn' ? 'নতুন চালক সদস্যপদ অনলাইন আবেদন' : 'Apply for Online Membership'}</span>
                  </button>

                  <a
                    href="tel:16789"
                    className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-95"
                  >
                    <PhoneCall className="w-4 h-4 animate-pulse" />
                    <span>{language === 'bn' ? 'জরুরি কল: ১৬৭৮৯ (টোল-ফ্রি ২৪/৭)' : 'Emergency Helpline: 16789'}</span>
                  </a>
                </div>

              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
