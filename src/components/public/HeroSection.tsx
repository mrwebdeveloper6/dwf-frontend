import React from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  UserPlus, 
  LogIn, 
  Search, 
  ShieldCheck, 
  HeartPulse, 
  Scale, 
  Award,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { 
    language, 
    t, 
    setShowApplyModal, 
    setShowVerifyModal, 
    setShowLoginModal 
  } = useDwf();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-emerald-900/40">
      {/* Subtle Background Geometric Glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b15_1px,transparent_1px),linear-gradient(to_bottom,#064e3b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Core CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Institutional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{language === 'bn' ? 'জাতীয় চালক কল্যাণ ও সামাজিক নিরাপত্তা প্ল্যাটফর্ম' : 'National Drivers Welfare & Social Security Platform'}</span>
            </div>

            {/* Tagline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white font-sans">
              <span className="text-emerald-400">{t.tagline.split('–')[0]}</span>
              <span className="text-slate-400 mx-2 font-light hidden sm:inline">–</span>
              <br className="sm:hidden" />
              <span className="text-white">{t.tagline.split('–')[1] || 'নিরাপদ সড়ক'}</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.subTagline}
            </p>

            {/* Value Pillars Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? '৫০,০০০৳ পর্যন্ত চিকিৎসা অনুদান' : 'Up to 50k BDT Medical Grant'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? '২৪/৭ ফ্রি আইনি সহায়তা' : '24/7 Free Legal Defense'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? 'তাৎক্ষণিক দুর্ঘটনা ক্ষতিপূরণ' : 'Immediate Accident Relief'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              {/* Primary: Membership Application */}
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition shadow-lg shadow-emerald-950/50 cursor-pointer active:scale-98"
              >
                <UserPlus className="w-5 h-5" />
                <span>{t.btnApply}</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>

              {/* Secondary: Member Login */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-emerald-300 hover:text-white bg-slate-800/90 hover:bg-slate-800 border border-emerald-700/60 rounded-xl transition cursor-pointer"
              >
                <LogIn className="w-5 h-5 text-emerald-400" />
                <span>{t.btnLogin}</span>
              </button>

              {/* Tertiary: Public Verification */}
              <button
                onClick={() => setShowVerifyModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/50 border border-slate-700 rounded-xl transition cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>{t.btnVerify}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 pt-1">
              {language === 'bn' 
                ? '* কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি আবেদন ও তাৎক্ষণিক ডিজিটাল ট্র্যাকিং সুবিধা।' 
                : '* Direct online membership enrollment with immediate application tracking.'}
            </p>
          </div>

          {/* Right Column: Interactive Digital Health & ID Card Preview Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Decorative Card 1: Official Digital ID Card Mockup */}
              <div className="relative z-20 rounded-2xl p-6 bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 border border-emerald-500/40 shadow-2xl shadow-emerald-950/80 text-white backdrop-blur-sm">
                
                {/* Header with Seal */}
                <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                      <ShieldCheck className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন</h4>
                      <p className="text-[10px] text-emerald-300 font-medium">DRIVERS WELFARE FOUNDATION</p>
                    </div>
                  </div>
                  <span className="bg-red-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    সদস্য কার্ড
                  </span>
                </div>

                {/* Card Body */}
                <div className="mt-4 flex gap-4 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80"
                    alt="Member"
                    className="w-16 h-20 rounded-lg object-cover border-2 border-emerald-400 shadow-md shrink-0"
                  />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-base text-white">মোঃ কামাল হোসেন</p>
                    <p className="text-emerald-200 text-[11px]">আইডি: <span className="font-mono font-bold text-white">DWF-000142</span></p>
                    <p className="text-slate-300 text-[11px]">পেশা: দূরপাল্লার ভারী বাস চালক</p>
                    <div className="flex items-center gap-3 pt-1 text-[11px]">
                      <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
                        রক্ত: <strong className="text-white">B+</strong>
                      </span>
                      <span className="text-emerald-300">মেয়াদ: ২০২৭</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer with QR & Verification Guarantee */}
                <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[10px] text-emerald-200">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">ডিজিটাল স্মার্ট কিউআর ভেরিফাইড</p>
                    <p className="text-slate-300">সুরক্ষিত চালক – নিরাপদ সড়ক</p>
                  </div>
                  <div className="w-10 h-10 bg-white p-1 rounded-sm shadow">
                    {/* Simulated SVG QR */}
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-[7px] text-white font-mono font-bold">
                      QR-DWF
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Benefit Tag 1 */}
              <div className="absolute -top-4 -right-4 z-30 bg-slate-900/95 border border-emerald-500/50 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">স্বাস্থ্য সুরক্ষা কার্ড</p>
                  <p className="text-[10px] text-emerald-400">হাসপাতালে ৫০% ছাড় সুবিধা</p>
                </div>
              </div>

              {/* Floating Benefit Tag 2 */}
              <div className="absolute -bottom-5 -left-4 z-30 bg-slate-900/95 border border-amber-500/50 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">বিনামূল্যে লিগ্যাল এইড</p>
                  <p className="text-[10px] text-amber-400">২৪/৭ অভিজ্ঞ প্যানেল আইনজীবী</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
