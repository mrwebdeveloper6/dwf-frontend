import React, { useState, useEffect, useRef } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  UserPlus, 
  LogIn, 
  Search, 
  ShieldCheck, 
  HeartPulse, 
  Scale, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  tagBn: string;
  tagEn: string;
  titleBn: string;
  titleEn: string;
  subBn: string;
  subEn: string;
  badgeBn: string;
  badgeEn: string;
  badgeIcon: React.ElementType;
  pill1Bn: string;
  pill1En: string;
  pill2Bn: string;
  pill2En: string;
  pill3Bn: string;
  pill3En: string;
}

export const HeroSection: React.FC = () => {
  const { 
    language, 
    setShowApplyModal, 
    setShowVerifyModal, 
    setShowLoginModal 
  } = useDwf();

  const slides: HeroSlide[] = [
    {
      id: 'slide-1',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=80',
      tagBn: 'জাতীয় চালক কল্যাণ ও সামাজিক নিরাপত্তা প্ল্যাটফর্ম',
      tagEn: 'National Drivers Welfare & Social Security Platform',
      titleBn: 'সুরক্ষিত চালক – নিরাপদ সড়ক',
      titleEn: 'Protected Drivers – Safer Highways',
      subBn: 'বাংলাদেশের সকল পেশাদার পরিবহন চালকদের সামাজিক নিরাপত্তা, ডিজিটাল স্বাস্থ্য সুরক্ষা কার্ড ও এককালীন জরুরি দুর্ঘটনা অনুদান নিশ্চিত করতে ডিডব্লিউএফ সর্বদা আপনার পাশে।',
      subEn: 'Ensuring digital health coverage, roadside legal defense, and instant emergency accident relief for commercial drivers across Bangladesh.',
      badgeBn: '৫০% পর্যন্ত হাসপাতাল ছাড়',
      badgeEn: 'Up to 50% Hospital Discount',
      badgeIcon: HeartPulse,
      pill1Bn: '৫০,০০০৳ পর্যন্ত চিকিৎসা অনুদান',
      pill1En: 'Up to 50k BDT Medical Grant',
      pill2Bn: '২৪/৭ ফ্রি আইনি সহায়তা',
      pill2En: '24/7 Free Legal Defense',
      pill3Bn: 'তাৎক্ষণিক দুর্ঘটনা ক্ষতিপূরণ',
      pill3En: 'Immediate Accident Relief'
    },
    {
      id: 'slide-2',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1800&q=80',
      tagBn: 'জরুরি দুর্ঘটনা ত্রাণ ও জীবনবীমা সুরক্ষা',
      tagEn: 'Emergency Accident Relief & Life Security',
      titleBn: 'দুর্ঘটনা ও জরুরি চিকিৎসায় তাৎক্ষণিক নগদ সহায়তা',
      titleEn: 'Instant Relief in Roadside Emergencies',
      subBn: 'অনাকাঙ্ক্ষিত দুর্ঘটনায় ৫০,০০০ টাকা পর্যন্ত হাসপাতাল চিকিৎসা খরচ এবং চালকের অবর্তমানে পরিবারের জন্য এককালীন ৫ লক্ষ টাকার কল্যাণ অনুদান তহবিল।',
      subEn: 'Immediate hospital reimbursement and up to 5 Lac BDT lump-sum nominee family security grant in unfortunate roadside casualties.',
      badgeBn: '২৪/৭ জরুরি রেসপন্স সেল',
      badgeEn: '24/7 Rapid Response Desk',
      badgeIcon: AlertTriangle,
      pill1Bn: 'সরাসরি ব্যাংক/বিকাশে অনুদান',
      pill1En: 'Direct Bank/bKash Payout',
      pill2Bn: 'নমিনি ও পরিবারের আর্থিক নিরাপত্তা',
      pill2En: 'Nominee Family Protection',
      pill3Bn: 'জরুরি হেল্পলাইন: ১৬৭৮৯',
      pill3En: 'Emergency Hotline: 16789'
    },
    {
      id: 'slide-3',
      image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1800&q=80',
      tagBn: 'হাইওয়ে লিগ্যাল এইড ও চালকদের অধিকার রক্ষা',
      tagEn: 'Highway Legal Aid & Driver Human Rights',
      titleBn: 'মহাসড়কে বিনামূল্যে আইনি প্রতিরক্ষা ও মানবাধিকার',
      titleEn: 'Free Highway Legal Defense & Driver Rights',
      subBn: 'মিথ্যা মামলা, অনাকাঙ্ক্ষিত ঝামেলা ও পুলিশি হয়রানি থেকে চালকদের সুরক্ষা দিতে দেশের সকল বিভাগ ও হাইওয়েতে অভিজ্ঞ প্যানেল আইনজীবীদের আইনি লড়াই।',
      subEn: 'Round-the-clock defense against false claims, road harassment, and unfair detentions by experienced supreme court & panel advocates.',
      badgeBn: 'প্যানেল আইনজীবী টিম',
      badgeEn: 'Panel Lawyer Network',
      badgeIcon: Scale,
      pill1Bn: 'সারাদেশে আইনি সাপোর্ট',
      pill1En: 'Countrywide Legal Support',
      pill2Bn: 'ফ্রি জামিন ও আইনি পরামর্শ',
      pill2En: 'Free Bail & Legal Counsel',
      pill3Bn: 'কোনো গোপন বা মধ্যস্বত্ব ফি নেই',
      pill3En: 'Zero Middleman Charges'
    },
    {
      id: 'slide-4',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=80',
      tagBn: 'নিরাপদ চালনা কর্মশালা ও টার্মিনাল স্বাস্থ্য ক্যাম্প',
      tagEn: 'Safe Driving Workshops & Terminal Health Camps',
      titleBn: 'ডিফেন্সিভ ড্রাইভিং ও নিয়মিত স্বাস্থ্য সেবা',
      titleEn: 'Defensive Driving & Terminal Health Camps',
      subBn: 'টার্মিনালে টার্মিনালে চালকদের নিয়মিত বিনামূল্যে চক্ষু ও সাধারণ স্বাস্থ্য পরীক্ষা এবং আধুনিক মহাসড়ক ট্রাফিক আইন বিষয়ক বিশেষ প্রশিক্ষণ কর্মশালা।',
      subEn: 'Free eye screenings, general physician checkups, and defensive highway safety certifications conducted regularly at bus and truck terminals.',
      badgeBn: 'ফ্রি হেলথ ক্যাম্প',
      badgeEn: 'Free Health Screening',
      badgeIcon: GraduationCap,
      pill1Bn: 'টার্মিনালে চক্ষু পরীক্ষা',
      pill1En: 'Terminal Eye Checkups',
      pill2Bn: 'ট্রাফিক আইন ও সুরক্ষা সনদ',
      pill2En: 'Traffic Safety Certificates',
      pill3Bn: 'অভিজ্ঞ ট্রেইনার দ্বারা পরিচালনা',
      pill3En: 'Certified Master Trainers'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance timer (moves automatically after 3 seconds)
  useEffect(() => {
    if (isPaused) return;

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, currentSlide]);

  const activeSlide = slides[currentSlide];
  const BadgeIcon = activeSlide.badgeIcon;

  return (
    <section 
      className="relative overflow-hidden w-full lg:h-[calc(100vh-92px)] lg:min-h-[560px] lg:max-h-[760px] flex flex-col justify-between bg-slate-950 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Cross-Fade & Cinematic Overlays */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Photography */}
            <img
              src={slide.image}
              alt="DWF Highway Drivers"
              className={`w-full h-full object-cover object-center transform transition-transform duration-3500 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
            />

            {/* Cinematic Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-emerald-950/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-slate-950/90" />
          </div>
        );
      })}

      {/* Foreground Container - Flex column to fill screen height cleanly */}
      <div className="relative z-20 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-4 w-full h-full flex flex-col justify-between">
        
        {/* Main Center Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center my-auto pt-2 pb-2">
          
          {/* Left Column: Slide Content */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 lg:space-y-3.5 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-[10px] sm:text-xs font-bold shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
              <span className="truncate max-w-[280px] xs:max-w-none">{language === 'bn' ? activeSlide.tagBn : activeSlide.tagEn}</span>
            </div>

            {/* Slide Title with Bengali Emphasis */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[42px] font-black tracking-tight leading-[1.18] text-white font-sans drop-shadow-md">
              {language === 'bn' ? (
                <>
                  <span className="text-emerald-400">{activeSlide.titleBn.split('–')[0]}</span>
                  {activeSlide.titleBn.includes('–') && (
                    <>
                      <span className="text-slate-400 mx-2 font-light hidden sm:inline">–</span>
                      <br className="sm:hidden" />
                      <span className="text-white">{activeSlide.titleBn.split('–')[1]}</span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-emerald-300">{activeSlide.titleEn}</span>
              )}
            </h1>

            {/* Slide Subtitle */}
            <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium drop-shadow-xs">
              {language === 'bn' ? activeSlide.subBn : activeSlide.subEn}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 text-[10.5px] sm:text-xs font-semibold text-slate-200 pt-0.5">
              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-emerald-500/30 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{language === 'bn' ? activeSlide.pill1Bn : activeSlide.pill1En}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-emerald-500/30 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{language === 'bn' ? activeSlide.pill2Bn : activeSlide.pill2En}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-emerald-500/30 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{language === 'bn' ? activeSlide.pill3Bn : activeSlide.pill3En}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1 sm:pt-2">
              {/* Primary: Membership Application */}
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-black text-white bg-red-600 hover:bg-red-700 rounded-xl transition shadow-xl shadow-red-950/60 cursor-pointer active:scale-98 border border-red-400/40"
              >
                <UserPlus className="w-4 h-4" />
                <span>{language === 'bn' ? 'সদস্য হতে আবেদন করুন' : 'Apply for Membership'}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>

              {/* Secondary: Member Login */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-bold text-white hover:text-white bg-red-950/70 hover:bg-red-900/80 border border-red-500/60 rounded-xl transition cursor-pointer backdrop-blur-md"
              >
                <LogIn className="w-4 h-4 text-red-400" />
                <span>{language === 'bn' ? 'সদস্য লগইন' : 'Member Login'}</span>
              </button>

              {/* Tertiary: Public Verification */}
              <button
                onClick={() => setShowVerifyModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-950/70 hover:bg-slate-800/80 border border-red-500/40 hover:border-red-400 rounded-xl transition cursor-pointer backdrop-blur-md"
              >
                <Search className="w-3.5 h-3.5 text-red-400" />
                <span>{language === 'bn' ? 'আইডি যাচাই' : 'Verify ID'}</span>
              </button>
            </div>

            {/* Direct Assurance Notice */}
            <p className="text-[10px] sm:text-[11px] text-slate-400 pt-0.5">
              {language === 'bn' 
                ? '✓ সরকারি নিয়মানুযায়ী নিবন্ধিত অলাভজনক চালক কল্যাণ সংস্থা • কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি সেবা।' 
                : '✓ Registered non-profit driver welfare trust • Direct verification and instant member assistance.'}
            </p>
          </div>

          {/* Right Column: Digital ID Card Showcase with Live Slide Badge */}
          <div className="lg:col-span-5 relative hidden md:block">
            <div className="relative mx-auto max-w-[320px] sm:max-w-[340px] xl:max-w-[360px]">
              
              {/* Dynamic Slide Accent Badge */}
              <div className="absolute -top-3 -right-2 z-30 bg-emerald-950/95 border border-red-500/60 rounded-xl p-2 sm:p-2.5 shadow-xl backdrop-blur-md flex items-center gap-2.5 transition-all duration-300">
                <div className="p-1.5 bg-red-600/30 text-red-300 rounded-lg">
                  <BadgeIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white leading-tight">{language === 'bn' ? activeSlide.badgeBn : activeSlide.badgeEn}</p>
                  <p className="text-[9px] text-emerald-300 font-medium">{language === 'bn' ? 'ডিডব্লিউএফ নিশ্চয়তা' : 'DWF Guarantee'}</p>
                </div>
              </div>

              {/* Official Digital Smart ID Card Mockup */}
              <div className="relative z-20 rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-emerald-900/90 via-slate-900/95 to-slate-950/95 border border-emerald-500/40 shadow-2xl shadow-emerald-950/90 text-white backdrop-blur-lg">
                
                {/* Header with Seal */}
                <div className="flex items-center justify-between border-b border-emerald-700/60 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow-xs">
                      <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold leading-tight">ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন</h4>
                      <p className="text-[9px] text-emerald-300 font-medium tracking-wide">DRIVERS WELFARE FOUNDATION</p>
                    </div>
                  </div>
                  <span className="bg-red-600 text-white font-bold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    ডিজিটাল স্মার্ট কার্ড
                  </span>
                </div>

                {/* Card Body */}
                <div className="mt-3 flex gap-3.5 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80"
                    alt="Sample Member"
                    className="w-14 h-18 rounded-lg object-cover border-2 border-emerald-400 shadow-sm shrink-0"
                  />
                  <div className="space-y-0.5 text-xs">
                    <p className="font-bold text-sm text-white">মোঃ কামাল হোসেন</p>
                    <p className="text-emerald-200 text-[10.5px]">সদস্য আইডি: <span className="font-mono font-bold text-white">DWF-000142</span></p>
                    <p className="text-slate-300 text-[10.5px]">পেশা: দূরপাল্লার ভারী বাস চালক</p>
                    <div className="flex items-center gap-2.5 pt-0.5 text-[10px]">
                      <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700">
                        রক্ত: <strong className="text-white">B+</strong>
                      </span>
                      <span className="text-emerald-300 font-mono">মেয়াদ: ২০২৭</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer with QR & Verification Guarantee */}
                <div className="mt-3 pt-2.5 border-t border-emerald-700/60 flex items-center justify-between text-[9px] text-emerald-200">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">ডিজিটাল স্মার্ট কিউআর ভেরিফাইড</p>
                    <p className="text-slate-400 text-[8.5px]">সুরক্ষিত চালক – নিরাপদ সড়ক</p>
                  </div>
                  <div className="w-8 h-8 bg-white p-0.5 rounded shadow flex items-center justify-center">
                    <div className="w-full h-full bg-slate-900 rounded-xs flex items-center justify-center text-[6.5px] text-white font-mono font-bold">
                      QR
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Benefit Tag Bottom */}
              <div className="absolute -bottom-3 -left-2 z-30 bg-slate-950/95 border border-emerald-500/50 rounded-xl p-2 sm:p-2.5 shadow-xl backdrop-blur-md flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white leading-tight">অনলাইন ডাটাবেস নিবন্ধিত</p>
                  <p className="text-[9px] text-emerald-400">১০০% নমিনি ও জীবন নিরাপত্তা</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Slider Bottom Navigation & Controls - Docked compactly at the bottom */}
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 shrink-0">
          
          {/* Slide Indicator Buttons / Progress */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-0.5">
            {slides.map((slide, idx) => {
              const isSelected = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`group relative py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-red-950/90 border-red-500/80 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span className="font-mono text-[10px] sm:text-xs font-bold">0{idx + 1}</span>
                  <span className="hidden md:inline text-[10px] sm:text-[11px] font-medium max-w-[110px] truncate">
                    {language === 'bn' ? slide.titleBn.split('–')[0] : slide.titleEn.split('–')[0]}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Arrow Controls & Pause Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={prevSlide}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 hover:bg-red-900/80 border border-slate-700/80 hover:border-red-600 text-white transition cursor-pointer active:scale-95 shadow-xs"
              aria-label="Previous Slide"
              title="পূর্ববর্তী স্লাইড"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 px-1.5">
              0{currentSlide + 1} / 0{slides.length}
            </span>

            <button
              onClick={nextSlide}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 hover:bg-red-900/80 border border-slate-700/80 hover:border-red-600 text-white transition cursor-pointer active:scale-95 shadow-xs"
              aria-label="Next Slide"
              title="পরবর্তী স্লাইড"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
