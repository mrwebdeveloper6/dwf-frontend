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
  Search, 
  Calculator, 
  ShieldCheck, 
  HeartPulse, 
  AlertTriangle, 
  GraduationCap, 
  Users, 
  Scale, 
  FileText, 
  BookOpen, 
  Image as ImageIcon, 
  Phone, 
  PhoneCall,
  Activity, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface SubActivityItem {
  id: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  icon: React.ElementType;
  targetId?: string;
  action?: 'SCROLL' | 'APPLY_MODAL' | 'VERIFY_MODAL';
  badgeBn?: string;
  badgeEn?: string;
}

interface ActivityGroup {
  id: string;
  labelBn: string;
  labelEn: string;
  icon: React.ElementType;
  items: SubActivityItem[];
}

export const PublicNavbar: React.FC = () => {
  const { 
    language, 
    setLanguage,
    t, 
    activeView, 
    setActiveView, 
    setShowApplyModal, 
    setShowVerifyModal, 
    setShowLoginModal,
    user 
  } = useDwf();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>('welfare');

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Activity Groups definition for the slide-over drawer
  const activityGroups: ActivityGroup[] = [
    {
      id: 'welfare',
      labelBn: 'কল্যাণ কার্যক্রম ও সেবা',
      labelEn: 'Welfare Activities & Services',
      icon: HeartPulse,
      items: [
        {
          id: 'health-protection',
          titleBn: 'ডিজিটাল স্বাস্থ্য কার্ড ও হাসপাতাল ছাড়',
          titleEn: 'Digital Health Card & Discounts',
          descBn: 'অনুমোদিত হাসপাতালে ৫০% পর্যন্ত ছাড় ও ফ্রি চিকিৎসা',
          descEn: 'Up to 50% discount at partner clinics & diagnostic centers',
          icon: HeartPulse,
          targetId: 'programs',
          action: 'SCROLL',
          badgeBn: '৫০% ছাড়',
          badgeEn: '50% Off'
        },
        {
          id: 'accident-relief',
          titleBn: 'দুর্ঘটনা ও জরুরি পুনর্বাসন অনুদান',
          titleEn: 'Accident Emergency Relief',
          descBn: 'অনাকাঙ্ক্ষিত দুর্ঘটনায় তাৎক্ষণিক চিকিৎসা খরচ ও আর্থিক ক্ষতিপূরণ',
          descEn: 'Instant hospital allowance & post-accident financial support',
          icon: AlertTriangle,
          targetId: 'programs',
          action: 'SCROLL',
          badgeBn: 'জরুরি সেল',
          badgeEn: 'Emergency'
        },
        {
          id: 'family-nominee',
          titleBn: 'পরিবার ও নমিনি কল্যাণ তহবিল',
          titleEn: 'Family & Nominee Welfare',
          descBn: 'চালকের অবর্তমানে এককালীন ৩ থেকে ৫ লক্ষ টাকার অনুদান',
          descEn: 'BDT 3–5 Lac lump-sum security grant for nominated family',
          icon: Users,
          targetId: 'programs',
          action: 'SCROLL'
        },
        {
          id: 'legal-aid',
          titleBn: 'হাইওয়ে লিগ্যাল এইড ও আইনি সহায়তা',
          titleEn: 'Highway Legal Aid Support',
          descBn: 'অনাকাঙ্ক্ষিত মামলায় অভিজ্ঞ প্যানেল আইনজীবীদের আইনি প্রতিরক্ষা',
          descEn: 'Expert legal defense counsel against roadside harassment',
          icon: Scale,
          targetId: 'programs',
          action: 'SCROLL'
        },
        {
          id: 'benefit-calc',
          titleBn: 'অনলাইন অনুদান ও ফান্ড ক্যালকুলেটর',
          titleEn: 'Benefit & Relief Calculator',
          descBn: 'অভিজ্ঞতা ও জমার ভিত্তিতে আপনার প্রাপ্য আর্থিক সুবিধা যাচাই',
          descEn: 'Real-time simulation of medical and death insurance amounts',
          icon: Calculator,
          targetId: 'calculator',
          action: 'SCROLL',
          badgeBn: 'ক্যালকুলেটর',
          badgeEn: 'Calculator'
        }
      ]
    },
    {
      id: 'governance',
      labelBn: 'পরিচালনা ও কেন্দ্রীয় কমিটি',
      labelEn: 'Governance & Committee',
      icon: Users,
      items: [
        {
          id: 'central-committee',
          titleBn: 'কেন্দ্রীয় পরিচালনা পর্ষদ ও কমিটি',
          titleEn: 'Central Executive Committee',
          descBn: 'সভাপতি, সাধারণ সম্পাদক ও কেন্দ্রীয় কর্মকর্তাদের তালিকা ও মোবাইল নম্বর',
          descEn: 'Directory of central board members with designations and phone numbers',
          icon: Users,
          targetId: 'central-committee',
          action: 'SCROLL',
          badgeBn: 'কমিটি',
          badgeEn: 'Board'
        },
        {
          id: 'membership-rules',
          titleBn: '৮-দফা সদস্যপদ ও আচরণবিধি',
          titleEn: '8-Point Membership Charter',
          descBn: 'নিবন্ধন যোগ্যতা, মাসিক জমার নিয়ম ও স্বচ্ছ ফান্ড গাইডলাইন',
          descEn: 'Eligibility, monthly dues, and transparent reserve regulations',
          icon: FileText,
          targetId: 'rules',
          action: 'SCROLL'
        },
        {
          id: 'hospital-policy',
          titleBn: 'হাসপাতাল চিকিৎসা সুবিধা নীতি',
          titleEn: 'Hospital Treatment Policies',
          descBn: 'স্বাস্থ্য সুরক্ষা কার্ড ব্যবহারের শর্তাবলী ও দাবি দাখিল প্রক্রিয়া',
          descEn: 'Discount eligibility criteria & claim reimbursement workflow',
          icon: HeartPulse,
          targetId: 'rules',
          action: 'SCROLL'
        }
      ]
    },
    {
      id: 'training-safety',
      labelBn: 'প্রশিক্ষণ ও সচেতনতামূলক কর্মসূচি',
      labelEn: 'Training & Road Safety',
      icon: GraduationCap,
      items: [
        {
          id: 'defensive-driving',
          titleBn: 'ডিফেন্সিভ ড্রাইভিং ও সড়ক নিরাপত্তা কর্মশালা',
          titleEn: 'Defensive Driving Workshop',
          descBn: 'মহাসড়কে ওভারটেকিং, কুয়াশা ও বর্ষায় নিরাপদ চালনা প্রশিক্ষণ',
          descEn: 'Advanced road awareness & highway safety simulation classes',
          icon: GraduationCap,
          targetId: 'programs',
          action: 'SCROLL'
        },
        {
          id: 'health-camps',
          titleBn: 'টার্মিনালে চক্ষু ও স্বাস্থ্য ক্যাম্প',
          titleEn: 'Terminal Eye & Health Camps',
          descBn: 'গাবতলী, সায়েদাবাদ ও মহাখালীতে চালকদের নিয়মিত স্ক্রিনিং',
          descEn: 'Free vision checks and general health checkups at terminals',
          icon: Activity,
          targetId: 'gallery',
          action: 'SCROLL'
        }
      ]
    },
    {
      id: 'media-bulletins',
      labelBn: 'নোটিশ, সার্কুলার ও গ্যালারি',
      labelEn: 'Notices & Gallery',
      icon: ImageIcon,
      items: [
        {
          id: 'official-news',
          titleBn: 'ডিডব্লিউএফ সার্কুলার ও নোটিশ বোর্ড',
          titleEn: 'Official Circulars & Notice Board',
          descBn: 'জরুরি নির্দেশনা, প্রশিক্ষণ শিডিউল ও ফান্ড বিজ্ঞপ্তি',
          descEn: 'Official circulars, program dates, and urgent updates',
          icon: FileText,
          targetId: 'news',
          action: 'SCROLL'
        },
        {
          id: 'photo-gallery',
          titleBn: 'মাঠপর্যায়ের কার্যক্রম ও ফটো আর্কাইভ',
          titleEn: 'Field Activity Photo Archive',
          descBn: 'ত্রাণ বিতরণ, চালক সমাবেশ ও সনদ প্রদান অনুষ্ঠানের স্থিরচিত্র',
          descEn: 'Visual records of relief handovers, rallies, and workshops',
          icon: ImageIcon,
          targetId: 'gallery',
          action: 'SCROLL'
        }
      ]
    }
  ];

  const handleAction = (item: SubActivityItem) => {
    setDrawerOpen(false);

    if (item.action === 'APPLY_MODAL') {
      setShowApplyModal(true);
      return;
    }
    if (item.action === 'VERIFY_MODAL') {
      setShowVerifyModal(true);
      return;
    }
    if (item.targetId) {
      setActiveView(item.targetId);
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToHome = () => {
    setActiveView('home');
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    setActiveView('contact');
    setDrawerOpen(false);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Brand Logo (SVG Steering Wheel Emblem) */}
            <div 
              onClick={handleScrollToHome}
              className="cursor-pointer transition hover:opacity-95 shrink-0 py-1"
              title="ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন (DWF)"
            >
              <DwfLogo size="md" />
            </div>

            {/* Right: Clean, Focused Primary Actions & Menu Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* 1. Language Toggle (BN / EN) */}
              <button
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition cursor-pointer shrink-0"
                title={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              >
                {language === 'bn' ? 'EN' : 'বাংলা'}
              </button>

              {/* 2. সদস্য যাচাই (Verify Member) */}
              <button
                onClick={() => setShowVerifyModal(true)}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-emerald-900 bg-slate-100 hover:bg-emerald-50 border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs shrink-0"
                title="সদস্যপদ ও কিউআর যাচাই"
              >
                <Search className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden xs:inline sm:inline">{language === 'bn' ? 'সদস্য যাচাই' : 'Verify'}</span>
                <span className="xs:hidden sm:hidden">{language === 'bn' ? 'যাচাই' : 'Verify'}</span>
              </button>

              {/* 3. User Session or Guest Log In */}
              {user ? (
                <button
                  onClick={() => setActiveView(user.role === 'MEMBER' ? 'member-portal' : 'admin-panel')}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer shadow-2xs shrink-0"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{user.role === 'MEMBER' ? (language === 'bn' ? 'আমার ড্যাশবোর্ড' : 'My Portal') : (language === 'bn' ? 'এডমিন প্যানেল' : 'Admin')}</span>
                </button>
              ) : (
                <>
                  {/* সদস্য লগইন (Member Login) */}
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition cursor-pointer shrink-0"
                  >
                    <LogIn className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'সদস্য লগইন' : 'Login'}</span>
                    <span className="sm:hidden">{language === 'bn' ? 'লগইন' : 'Login'}</span>
                  </button>

                  {/* সদস্য আবেদন (Apply for Membership) - Primary CTA */}
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer shadow-sm hover:shadow active:scale-98 shrink-0"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'সদস্য আবেদন' : 'Apply'}</span>
                    <span className="sm:hidden">{language === 'bn' ? 'আবেদন' : 'Apply'}</span>
                  </button>
                </>
              )}

              {/* 4. Sleek Menu Drawer Trigger Button (All Devices) */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 hover:text-emerald-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-300/80 rounded-xl transition cursor-pointer shadow-2xs shrink-0"
                aria-label="Open Navigation Menu"
                title="সকল কার্যক্রম ও মেনু"
              >
                <Menu className="w-4 h-4 text-emerald-800" />
                <span className="hidden md:inline">{language === 'bn' ? 'মেনু' : 'Menu'}</span>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* PROFESSIONAL SLIDE-OVER NAVIGATION DRAWER (ALL DEVICES)  */}
      {/* ========================================================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop Overlay */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 ease-out border-l border-slate-200">
              
              {/* Drawer Top Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
                <div 
                  onClick={handleScrollToHome}
                  className="cursor-pointer"
                >
                  <DwfLogo size="sm" />
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 transition cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* Direct Action Hub */}
                <div className="p-3.5 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                        {language === 'bn' ? 'ডিজিটাল চালক সেবা' : 'Digital Driver Service'}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {language === 'bn' ? 'দ্রুত সেবা ও সদস্যপদ ব্যবস্থা' : 'Quick Access Hub'}
                      </h4>
                    </div>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => { setShowApplyModal(true); setDrawerOpen(false); }}
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'সদস্য আবেদন' : 'Apply'}</span>
                    </button>

                    <button
                      onClick={() => { setShowVerifyModal(true); setDrawerOpen(false); }}
                      className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{language === 'bn' ? 'আইডি যাচাই' : 'Verify ID'}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Navigation: Home & Central Committee */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleScrollToHome}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 text-left transition font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="p-1.5 bg-white rounded-lg border border-slate-200 text-emerald-700">🏠</span>
                    <span>{language === 'bn' ? 'মূল পাতা' : 'Home'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('central-committee');
                      setDrawerOpen(false);
                      document.getElementById('central-committee')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 text-left transition font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="p-1.5 bg-white rounded-lg border border-slate-200 text-emerald-700">👥</span>
                    <span>{language === 'bn' ? 'কেন্দ্রীয় কমিটি' : 'Committee'}</span>
                  </button>
                </div>

                {/* Grouped Activities Accordion/Sections */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      {language === 'bn' ? 'কার্যক্রম ও নির্দেশিকা' : 'Activities & Guides'}
                    </span>
                  </div>

                  {activityGroups.map((group) => {
                    const isExpanded = expandedGroup === group.id;
                    const GroupIcon = group.icon;

                    return (
                      <div key={group.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                        {/* Group Header Button */}
                        <button
                          onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-50 transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                              <GroupIcon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-800">
                              {language === 'bn' ? group.labelBn : group.labelEn}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-emerald-700' : ''}`} />
                        </button>

                        {/* Group Sub-Items */}
                        {isExpanded && (
                          <div className="p-2 space-y-1 bg-slate-50/70 border-t border-slate-100">
                            {group.items.map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => handleAction(item)}
                                  className="w-full text-left p-2.5 rounded-xl hover:bg-white hover:shadow-xs transition flex items-start gap-2.5 group cursor-pointer text-xs"
                                >
                                  <ItemIcon className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 group-hover:text-emerald-800" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-slate-800 group-hover:text-emerald-900 leading-snug">
                                        {language === 'bn' ? item.titleBn : item.titleEn}
                                      </span>
                                      {(item.badgeBn || item.badgeEn) && (
                                        <span className="bg-emerald-100 text-emerald-800 font-bold text-[9px] px-1.5 py-0.2 rounded shrink-0">
                                          {language === 'bn' ? item.badgeBn : item.badgeEn}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                      {language === 'bn' ? item.descBn : item.descEn}
                                    </p>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-700 self-center shrink-0" />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Direct Contact Button */}
                <button
                  onClick={handleScrollToContact}
                  className="w-full text-left p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-950 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'bn' ? 'যোগাযোগ ও হেল্পডেস্ক (১৬৭৮৯)' : 'Helpdesk & Support'}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-700" />
                </button>

              </div>

              {/* Drawer Bottom Bar: Emergency Hotline & Registration Info */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{language === 'bn' ? 'জরুরি দুর্ঘটনা সহায়তা সেল' : 'Emergency Accident Desk'}</span>
                  <span className="font-mono font-bold text-emerald-700">২৪/৭ সেবা</span>
                </div>

                <a
                  href="tel:16789"
                  className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <PhoneCall className="w-4 h-4 animate-pulse" />
                  <span>{language === 'bn' ? 'জরুরি কল: ১৬৭৮৯ (টোল-ফ্রি)' : 'Emergency Hotline: 16789'}</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
