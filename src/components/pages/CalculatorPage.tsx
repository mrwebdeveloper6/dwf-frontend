import React, { useState, useMemo } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  Calculator, 
  ArrowLeft, 
  HeartPulse, 
  ShieldCheck, 
  Coins, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const { language, setActiveView, setShowApplyModal, loginWithGoogle, user } = useDwf();
  const [age, setAge] = useState<number>(32);
  const [membershipYears, setMembershipYears] = useState<number>(10);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(300);

  const results = useMemo(() => {
    const totalDeposit = monthlyContribution * 12 * membershipYears;
    const dividendRate = 0.08;
    const maturitySavings = Math.round(totalDeposit * Math.pow(1 + dividendRate, membershipYears * 0.35));
    const maxMedicalYearly = 50000;
    const accidentDeathGrant = 200000;
    const totalEstimatedCoverage = maturitySavings + (maxMedicalYearly * membershipYears) + accidentDeathGrant;

    return {
      totalContribution: totalDeposit,
      totalMaturityBenefit: maturitySavings,
      maxMedicalYearly,
      accidentDeathGrant,
      totalEstimatedCoverage
    };
  }, [membershipYears, monthlyContribution]);

  const toBn = (num: number) => {
    if (language !== 'bn') return num.toLocaleString('en-US');
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toLocaleString('en-US').replace(/\d/g, (d) => bnDigits[Number(d)]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#034732] via-[#034732] to-[#02291d] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-white transition cursor-pointer font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'হোমপেইজে ফিরে যান' : 'Back to Home'}</span>
            </button>
            <span className="text-emerald-500">/</span>
            <span className="text-white font-semibold">{language === 'bn' ? 'আর্থিক অনুদান ও সঞ্চয় ক্যালকুলেটর' : 'Benefit Calculator'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                {language === 'bn' ? 'স্বচ্ছ আর্থিক প্রাক্কলন ও সিমুলেশন' : 'Actuarial Grant Simulation'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                {language === 'bn' ? 'পূর্ণাঙ্গ অনুদান ও সঞ্চয় ক্যালকুলেটর' : 'Interactive Benefit Calculator'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'আপনার বয়স ও প্রত্যাশিত সদস্যপদের মেয়াদের ভিত্তিতে মাসিক চাঁদা, চিকিৎসা অনুদান এবং অবসর পেনশনের আনুমানিক হিসাব জানুন।'
                  : 'Simulate your cumulative welfare deposits, medical grants, accident cover, and retirement maturity funds based on constitutional guidelines.'}
              </p>
            </div>

            <button
              onClick={async () => {
                if (!user) {
                  await loginWithGoogle();
                }
                setShowApplyModal(true);
              }}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition cursor-pointer active:scale-95 shrink-0 flex items-center gap-2 border border-slate-200"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{language === 'bn' ? 'Google দিয়ে সাইন-আপ ও আবেদন' : 'Sign Up with Google & Apply'}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Controls Column (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'bn' ? 'প্যারামিটার ও সময়কাল নির্ধারণ' : 'Adjust Contribution Variables'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'bn' ? 'স্লাইডার পরিবর্তন করে রিয়েল-টাইমে ফলাফলের প্রভাব দেখুন।' : 'Move sliders to see real-time calculated dividends.'}
              </p>
            </div>

            {/* Slider 1: Driver Age */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-slate-700">
                  {language === 'bn' ? 'আপনার বর্তমান বয়স:' : 'Current Age:'}
                </label>
                <span className="font-bold text-base text-red-700 bg-red-50 px-3 py-1 rounded-xl border border-red-200 font-mono">
                  {toBn(age)} {language === 'bn' ? 'বছর' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="65"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>১৮ বছর</span>
                <span>৩৫ বছর</span>
                <span>৫০ বছর</span>
                <span>৬৫ বছর</span>
              </div>
            </div>

            {/* Slider 2: Membership Duration */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-slate-700">
                  {language === 'bn' ? 'প্রত্যাশিত সদস্যপদের মেয়াদ:' : 'Membership Duration:'}
                </label>
                <span className="font-bold text-base text-red-700 bg-red-50 px-3 py-1 rounded-xl border border-red-200 font-mono">
                  {toBn(membershipYears)} {language === 'bn' ? 'বছর' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={membershipYears}
                onChange={(e) => setMembershipYears(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>১ বছর</span>
                <span>১০ বছর</span>
                <span>২০ বছর</span>
                <span>৩০ বছর</span>
              </div>
            </div>

            {/* Fixed Contribution Indicator */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-medium">নির্ধারিত মাসিক কল্যাণ চাঁদা:</span>
              <p className="text-lg font-black text-slate-900 font-mono">৳ ৩০০.০০ / মাস (বাৎসরিক ৩,৬০০৳)</p>
              <p className="text-[11px] text-slate-500">ডি.ডব্লিউ.এফ কেন্দ্রীয় গঠনতন্ত্র অনুযায়ী সকল ক্যাটাগরির লাইসেন্সধারীর চাঁদা সমবণ্টন নীতির অন্তর্ভুক্ত।</p>
            </div>

          </div>

          {/* Calculated Output Column (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 bg-gradient-to-br from-[#034732] via-[#034732] to-[#02291d] text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-emerald-900">
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-700/60">
                {language === 'bn' ? 'প্রাক্কলিত কল্যাণ ও আর্থিক হিসাব' : 'Estimated Benefit Summary'}
              </span>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Medical Grant */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-red-500/50 shadow-xs">
                  <div className="flex items-center gap-2 text-red-400 mb-1">
                    <HeartPulse className="w-4 h-4" />
                    <span className="text-xs font-semibold">বার্ষিক চিকিৎসা অনুদান</span>
                  </div>
                  <p className="text-2xl font-black text-white font-mono">
                    ৳ {toBn(results.maxMedicalYearly)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    হাসপাতাল বিল ৫০% পর্যন্ত ছাড়
                  </p>
                </div>

                {/* Accident Grant */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-red-500/50 shadow-xs">
                  <div className="flex items-center gap-2 text-red-400 mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-semibold">দুর্ঘটনা ক্ষতিপূরণ</span>
                  </div>
                  <p className="text-2xl font-black text-white font-mono">
                    ৳ {toBn(results.accidentDeathGrant)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    নমিনিকে এককালীন তাৎক্ষণিক অনুদান
                  </p>
                </div>

                {/* Total Contribution */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-700/60 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Coins className="w-4 h-4" />
                    <span className="text-xs font-semibold">মোট জমাকৃত চাঁদা</span>
                  </div>
                  <p className="text-2xl font-black text-white font-mono">
                    ৳ {toBn(results.totalContribution)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {toBn(membershipYears)} বছরে সর্বমোট সঞ্চয়
                  </p>
                </div>

                {/* Maturity Benefit */}
                <div className="p-4 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 shadow-md">
                  <div className="flex items-center gap-2 text-emerald-300 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-semibold">আনুমানিক সমাপ্তি পেনশন</span>
                  </div>
                  <p className="text-2xl font-black text-emerald-200 font-mono">
                    ৳ {toBn(results.totalMaturityBenefit)}
                  </p>
                  <p className="text-[10px] text-emerald-300/80 mt-1">
                    মূল চাঁদা + অডিটেড লভ্যাংশ সমেত
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Apply CTA */}
            <div className="pt-6 mt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-emerald-200/80 leading-relaxed text-center sm:text-left">
                * হিসাবটি ডি.ডব্লিউ.এফ সাংগঠনিক উপবিধি ২০২৬ অনুযায়ী আনুমানিক।
              </p>
              <button
                onClick={async () => {
                  if (!user) {
                    await loginWithGoogle();
                  }
                  setShowApplyModal(true);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-slate-100 text-slate-900 text-xs font-black rounded-xl transition cursor-pointer shrink-0 shadow-lg active:scale-95 flex items-center justify-center gap-2 border border-slate-200"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>{language === 'bn' ? 'Google দিয়ে সাইন-আপ ও আবেদন' : 'Sign Up with Google & Apply'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
