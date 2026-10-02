import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  Calculator, 
  HeartPulse, 
  ShieldCheck, 
  Coins, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  HelpCircle,
  ArrowRight 
} from 'lucide-react';

export const BenefitCalculatorSection: React.FC = () => {
  const { language, setShowApplyModal, setActiveView, loginWithGoogle, user } = useDwf();

  const [age, setAge] = useState<number>(34);
  const [membershipYears, setMembershipYears] = useState<number>(10);

  // Dynamic Benefit Calculation based on Age & Term
  const calculateBenefits = (currentAge: number, years: number) => {
    let tier = '';
    let tierBn = '';
    let monthlyFee = 300;
    let maxMedicalYearly = 50000;
    let accidentDeathGrant = 200000;
    let permanentDisability = 150000;
    let maturityBonusRate = 0.08; // 8% welfare dividend

    if (currentAge >= 18 && currentAge <= 32) {
      tier = 'Tier A — Young Operator Shield';
      tierBn = 'টিয়ার ক — তরুণ চালক সুরক্ষা প্রকল্প';
      accidentDeathGrant = 250000;
      permanentDisability = 180000;
      maturityBonusRate = 0.09;
    } else if (currentAge > 32 && currentAge <= 45) {
      tier = 'Tier B — Prime Highway Master';
      tierBn = 'টিয়ার খ — অভিজ্ঞ হাইওয়ে চালক স্কিম';
      accidentDeathGrant = 200000;
      permanentDisability = 150000;
      maturityBonusRate = 0.08;
    } else if (currentAge > 45 && currentAge <= 55) {
      tier = 'Tier C — Senior Veteran Driver';
      tierBn = 'টিয়ার গ — সিনিয়র মাস্টার চালক স্কিম';
      accidentDeathGrant = 180000;
      permanentDisability = 120000;
      maxMedicalYearly = 60000; // Enhanced medical for senior drivers
      maturityBonusRate = 0.075;
    } else {
      tier = 'Tier D — Elder Care & Golden Member';
      tierBn = 'টিয়ার ঘ — প্রবীণ চালক ও অবসরকালীন সহায়তা';
      accidentDeathGrant = 150000;
      permanentDisability = 100000;
      maxMedicalYearly = 65000;
      maturityBonusRate = 0.07;
    }

    const totalContribution = monthlyFee * 12 * years;
    const estimatedDividend = Math.round(totalContribution * maturityBonusRate * (years / 2));
    const totalMaturityBenefit = totalContribution + estimatedDividend;

    return {
      tier: language === 'bn' ? tierBn : tier,
      monthlyFee,
      totalContribution,
      totalMaturityBenefit,
      maxMedicalYearly,
      accidentDeathGrant,
      permanentDisability
    };
  };

  const results = calculateBenefits(age, membershipYears);

  // Bengali number formatter
  const toBn = (n: number) => {
    if (language !== 'bn') return n.toLocaleString('en-IN');
    const d: { [k: string]: string } = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', ',': ',' };
    return n.toLocaleString('en-IN').replace(/[0-9,]/g, m => d[m] || m);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-200">
            {language === 'bn' ? 'স্বয়ংক্রিয় গণনা ইঞ্জিন' : 'Automated Benefit Engine'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {language === 'bn' ? 'বয়সভিত্তিক কল্যাণ ও স্বাস্থ্য সহায়তা ক্যালকুলেটর' : 'Age-Based Welfare & Benefits Calculator'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {language === 'bn'
              ? 'আপনার বর্তমান বয়স ও সদস্যপদের মেয়াদের ওপর ভিত্তি করে চিকিৎসা, দুর্ঘটনা ও আনুমানিক অবসরকালীন তহবিল প্রাক্কলন করুন।'
              : 'Calculate your personalized medical limit, accident insurance coverage, and projected welfare savings based on your age.'}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Input Controls Left Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {language === 'bn' ? 'চালকের বয়স ও সময়কাল নির্ধারণ' : 'Set Age & Contribution Duration'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? '১৮ থেকে ৬৫ বছর পর্যন্ত বয়সীদের জন্য প্রযোজ্য' : 'Applicable for drivers aged 18 to 65'}
                  </p>
                </div>
              </div>

              {/* Slider 1: Age */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="driver-age-slider" className="font-semibold text-slate-700">
                    {language === 'bn' ? 'আপনার বর্তমান বয়স:' : 'Your Current Age:'}
                  </label>
                  <span className="font-bold text-lg text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-mono">
                    {toBn(age)} {language === 'bn' ? 'বছর' : 'Years'}
                  </span>
                </div>
                <input
                  id="driver-age-slider"
                  type="range"
                  min="18"
                  max="65"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>১৮ {language === 'bn' ? 'বছর' : 'yrs'}</span>
                  <span>৩৫ {language === 'bn' ? 'বছর' : 'yrs'}</span>
                  <span>৫০ {language === 'bn' ? 'বছর' : 'yrs'}</span>
                  <span>৬৫ {language === 'bn' ? 'বছর' : 'yrs'}</span>
                </div>
              </div>

              {/* Slider 2: Years of Contribution */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="duration-years-slider" className="font-semibold text-slate-700">
                    {language === 'bn' ? 'প্রত্যাশিত সদস্যপদের মেয়াদ:' : 'Expected Membership Duration:'}
                  </label>
                  <span className="font-bold text-lg text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-mono">
                    {toBn(membershipYears)} {language === 'bn' ? 'বছর' : 'Years'}
                  </span>
                </div>
                <input
                  id="duration-years-slider"
                  type="range"
                  min="1"
                  max="25"
                  value={membershipYears}
                  onChange={(e) => setMembershipYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>১ {language === 'bn' ? 'বছর' : 'yr'}</span>
                  <span>৫ {language === 'bn' ? 'বছর' : 'yrs'}</span>
                  <span>১৫ {language === 'bn' ? 'বছর' : 'yrs'}</span>
                  <span>২৫ {language === 'bn' ? 'বছর' : 'yrs'}</span>
                </div>
              </div>

              {/* Calculated Policy Category Badge */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'পলিসি ক্যাটাগরি ও স্কিম:' : 'Applicable Policy Scheme:'}</p>
                <p className="text-sm font-bold text-emerald-900 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{results.tier}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  {language === 'bn'
                    ? 'স্থায়ী তহবিল বিধিমালা অনুযায়ী ৬ মাস নিয়মিত চাঁদা দেওয়ার পর সকল অনুদান কার্যকর হয়।'
                    : 'All healthcare grants and accident provisions activate after 6 months of regular fee payment.'}
                </p>
              </div>

            </div>

            {/* Calculated Output Right Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-emerald-900/80">
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-900/80 px-2.5 py-1 rounded border border-emerald-700/80">
                  {language === 'bn' ? 'প্রাক্কলিত কল্যাণ ও আর্থিক হিসাব' : 'Estimated Benefit Summary'}
                </span>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Medical Grant */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-red-800/60 shadow-xs">
                    <div className="flex items-center gap-2 text-red-400 mb-1">
                      <HeartPulse className="w-4 h-4" />
                      <span className="text-xs font-semibold">{language === 'bn' ? 'বার্ষিক চিকিৎসা অনুদান' : 'Annual Medical Grant'}</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-white font-mono">
                      ৳ {toBn(results.maxMedicalYearly)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {language === 'bn' ? '৫০% পর্যন্ত হাসপাতাল বিল মওকুফ' : 'Up to 50% hospital discount'}
                    </p>
                  </div>

                  {/* Accident Grant */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-red-800/60 shadow-xs">
                    <div className="flex items-center gap-2 text-red-400 mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-semibold">{language === 'bn' ? 'সর্বোচ্চ দুর্ঘটনা ক্ষতিপূরণ' : 'Max Accident Cover'}</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-white font-mono">
                      ৳ {toBn(results.accidentDeathGrant)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {language === 'bn' ? 'অঙ্গহানি/মৃত্যুতে এককালীন পরিবার সহায়তা' : 'Immediate lump sum for nominee'}
                    </p>
                  </div>

                  {/* Total Contribution */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-800/60 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <Coins className="w-4 h-4" />
                      <span className="text-xs font-semibold">{language === 'bn' ? 'আপনার সর্বমোট চাঁদা' : 'Total Contributed'}</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-white font-mono">
                      ৳ {toBn(results.totalContribution)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {toBn(membershipYears)} {language === 'bn' ? 'বছরে মোট জমাকৃত অর্থ' : 'years total deposit'}
                    </p>
                  </div>

                  {/* Maturity Savings */}
                  <div className="p-4 rounded-xl bg-emerald-950/90 border-2 border-emerald-500 shadow-md">
                    <div className="flex items-center gap-2 text-emerald-300 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-semibold">{language === 'bn' ? 'আনুমানিক সমাপ্তি তহবিল' : 'Projected Maturity Fund'}</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-emerald-200 font-mono">
                      ৳ {toBn(results.totalMaturityBenefit)}
                    </p>
                    <p className="text-[10px] text-emerald-300/80 mt-1">
                      {language === 'bn' ? 'মূল চাঁদা + লভ্যাংশ সমেত' : 'Principal + Welfare Dividend'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Apply CTA */}
              <div className="pt-6 mt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
                  {language === 'bn'
                    ? '* হিসাবটি ডি.ডব্লিউ.এফ সাংগঠনিক উপবিধি ২০২৬ অনুযায়ী আনুমানিক।'
                    : '* Calculations are based on DWF Constitution Rules 2026.'}
                </p>
                <button
                  onClick={async () => {
                    if (!user) {
                      await loginWithGoogle();
                    }
                    setShowApplyModal(true);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 text-xs font-black rounded-xl transition cursor-pointer shrink-0 shadow-lg active:scale-95 flex items-center justify-center gap-2 border border-slate-200"
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

        {/* Dedicated Page Link CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              setActiveView('calculator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-red-600/20 active:scale-95 cursor-pointer"
          >
            <span>{language === 'bn' ? 'পূর্ণাঙ্গ অনুদান ও সঞ্চয় সিমুলেটর পেইজ দেখুন' : 'Open Full Interactive Calculator Page'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
