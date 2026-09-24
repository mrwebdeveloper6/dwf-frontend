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
  ShieldCheck,
  ShoppingBag,
  BookOpen,
  Image as ImageIcon
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', labelBn: 'মূল পাতা', labelEn: 'Home', icon: Home, descBn: 'ফাউন্ডেশন পরিচিতি ও প্রধান কার্যক্রম', descEn: 'Overview & Main Highlights' },
    { id: 'store', labelBn: 'ডিজিটাল স্টোর', labelEn: 'Digital Store', icon: ShoppingBag, descBn: 'ই-বুক, আইন নির্দেশিকা ও ফটো অ্যালবাম', descEn: 'E-Books & 4K Photo Packs' },
    { id: 'programs', labelBn: 'কল্যাণ সেবা', labelEn: 'Programs', icon: HeartPulse, descBn: 'চিকিৎসা, দুর্ঘটনা ও জরুরি সহায়তা', descEn: 'Medical, Accident & Support' },
    { id: 'central-committee', labelBn: 'কেন্দ্রীয় কমিটি', labelEn: 'Committee', icon: Users, descBn: 'কেন্দ্রীয় পরিচালনা পর্ষদের সদস্যবৃন্দ', descEn: 'Central Executive Leadership' },
    { id: 'rules', labelBn: 'উপবিধি ও সংবিধান', labelEn: 'Bylaws & Rules', icon: BookOpen, descBn: 'চাঁদা ও নমিনি আইনি নীতিমালা', descEn: 'Contribution & Nominee Rules' },
    { id: 'calculator', labelBn: 'অনুদান হিসাব', labelEn: 'Calculator', icon: Calculator, descBn: 'কল্যাণ সুবিধা ও পেনশন সিমুলেটর', descEn: 'Aid & Pension Simulator' },
    { id: 'news', labelBn: 'সংবাদ ও বিজ্ঞপ্তি', labelEn: 'Notices', icon: Bell, descBn: 'জরুরি নোটিশ, সার্কুলার ও সংবাদ', descEn: 'Official Circulars & News' },
    { id: 'gallery', labelBn: 'ফটো গ্যালারি', labelEn: 'Gallery', icon: ImageIcon, descBn: 'মাঠপর্যায়ের কার্যক্রম ও সমাবেশ চিত্র', descEn: 'Visual Archive & Photo Gallery' },
    { id: 'contact', labelBn: 'যোগাযোগ ও শাখা', labelEn: 'Contact', icon: Phone, descBn: 'দেশব্যাপী শাখা অফিস ও হেল্পলাইন', descEn: 'Branch Network & 24/7 Helpline' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white border-b border-red-800 shadow-md">
        {/* National Green Accent Ribbon Line at very top of navbar */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Left: Brand Logo */}
            <div 
              onClick={() => scrollToSection('home')}
              className="cursor-pointer transition hover:opacity-90 shrink-0 py-1"
              title="ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন (DWF)"
            >
              <DwfLogo size="sm" variant="light" className="sm:hidden" />
              <DwfLogo size="md" variant="light" className="hidden sm:flex" />
            </div>

            {/* Right: Actions (Tablet/Compact style across all screen sizes) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Member Verification Button (সদস্য যাচাই) */}
              <button
                onClick={() => setShowVerifyModal(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-bold text-red-700 hover:text-red-800 bg-white hover:bg-red-50 border border-white/90 rounded-xl transition cursor-pointer shadow-xs shrink-0 active:scale-95"
                title={language === 'bn' ? 'সদস্যপদ ও কার্ড যাচাই করুন' : 'Verify Member ID & Card'}
              >
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 shrink-0" />
                <span className="hidden xs:inline sm:inline">{language === 'bn' ? 'সদস্য যাচাই' : 'Verify Member'}</span>
                <span className="xs:hidden sm:hidden">{language === 'bn' ? 'যাচাই' : 'Verify'}</span>
              </button>

              {/* User Session status / Login CTA */}
              {user ? (
                <button
                  onClick={() => setActiveView(user.role === 'MEMBER' ? 'member-portal' : 'admin-panel')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-bold text-white bg-red-800 hover:bg-red-900 border border-red-500/50 rounded-xl transition cursor-pointer shadow-xs shrink-0"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{user.role === 'MEMBER' ? (language === 'bn' ? 'ড্যাশবোর্ড' : 'Portal') : (language === 'bn' ? 'এডমিন' : 'Admin')}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white hover:text-white bg-red-800/80 hover:bg-red-800 border border-red-400/50 rounded-xl transition cursor-pointer shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5 text-white" />
                  <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
                </button>
              )}

              {/* Apply CTA Button */}
              <button
                onClick={() => setShowApplyModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold text-red-700 hover:text-red-800 bg-white hover:bg-red-50 border border-white rounded-xl transition cursor-pointer shadow-md shrink-0 active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5 text-red-600" />
                <span className="hidden sm:inline">{language === 'bn' ? 'সদস্য আবেদন' : 'Apply'}</span>
                <span className="sm:hidden">{language === 'bn' ? 'আবেদন' : 'Apply'}</span>
              </button>

              {/* Menu Toggle Button (Tablet style available across all screens) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center p-1.5 sm:p-2 rounded-xl text-white hover:text-white bg-red-800/80 hover:bg-red-800 border border-red-500/50 transition cursor-pointer shrink-0 active:scale-95"
                aria-label={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
                title={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
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
                <div className="p-3.5 sm:p-4 bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-red-800/80 shadow-md">
                  <div>
                    <p className="text-[10px] font-black tracking-wider text-red-300 uppercase">ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন (DWF)</p>
                    <p className="text-xs sm:text-sm font-bold text-white">সুরক্ষিত চালক – সমৃদ্ধ পরিবার – নিরাপদ বাংলাদেশ</p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => { setShowVerifyModal(true); setMenuOpen(false); }}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer border border-white/20"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-red-300" />
                      <span>{language === 'bn' ? 'সদস্য যাচাই' : 'Verify'}</span>
                    </button>
                    {!user && (
                      <button
                        onClick={() => { setShowLoginModal(true); setMenuOpen(false); }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs border border-red-400/40"
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
                      className="group flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-red-50/90 border border-slate-200/80 hover:border-red-300 transition text-left cursor-pointer shadow-2xs"
                    >
                      <div className="p-2.5 rounded-xl bg-white text-red-600 border border-slate-200 group-hover:border-red-200 group-hover:bg-red-600 group-hover:text-white transition shrink-0">
                        <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
                            {language === 'bn' ? link.labelBn : link.labelEn}
                          </p>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition" />
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
                    className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition cursor-pointer active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{language === 'bn' ? 'নতুন চালক সদস্যপদ অনলাইন আবেদন' : 'Apply for Online Membership'}</span>
                  </button>

                  <a
                    href="tel:16789"
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-95"
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
