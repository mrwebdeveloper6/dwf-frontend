import React from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  CheckCircle2, 
  UserPlus, 
  HelpCircle, 
  ShieldCheck, 
  FileCheck, 
  CreditCard, 
  Users 
} from 'lucide-react';

export const MembershipRulesSection: React.FC = () => {
  const { language, t, setShowApplyModal } = useDwf();

  const eligibilityList = [
    t.rulesElig1,
    t.rulesElig2,
    t.rulesElig3,
    language === 'bn' 
      ? 'মাদকাসক্তিমুক্ত ও সৎ চরিত্রের অধিকারী হওয়া এবং ইতিবাচক সড়ক মানসিকতা বজায় রাখা।' 
      : 'Must maintain a substance-free lifestyle and demonstrate courteous road behavior.'
  ];

  const applicationSteps = [
    {
      step: '১',
      stepEn: '1',
      title: language === 'bn' ? 'ব্যক্তিগত ও ঠিকানা তথ্য' : 'Personal & Address Info',
      desc: language === 'bn' ? 'জাতীয় পরিচয়পত্র ও জন্মতারিখ প্রদান' : 'Provide verified NID & Birth Date'
    },
    {
      step: '২',
      stepEn: '2',
      title: language === 'bn' ? 'ড্রাইভিং লাইসেন্স ও গাড়ি' : 'License & Vehicle Details',
      desc: language === 'bn' ? 'পেশাদার লাইসেন্স ও গাড়ির বিবরণ' : 'Professional license & registration'
    },
    {
      step: '৩',
      stepEn: '3',
      title: language === 'bn' ? '১০০% নমিনি বণ্টন' : '100% Nominee Allocation',
      desc: language === 'bn' ? 'পরিবারের সদস্যদের শতকরা বরাদ্দ' : 'Mandatory nominee security distribution'
    },
    {
      step: '৪',
      stepEn: '4',
      title: language === 'bn' ? 'স্মার্ট কার্ড ও অনুমোদন' : 'Approval & Digital Card',
      desc: language === 'bn' ? 'যাচাই শেষে সদস্য আইডি ও কার্ড প্রাপ্তি' : 'Official DWF Member ID & Health Card'
    }
  ];

  return (
    <section id="rules" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {language === 'bn' ? 'সদস্যপদ ও নীতিমালা' : 'Constitution & Policies'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {t.rulesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.rulesSubtitle}
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Eligibility & 4-Step Flow */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eligibility Block */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {t.rulesEligibilityTitle}
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {eligibilityList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Application Steps */}
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-700" />
                <span>{language === 'bn' ? 'সহজ ৪-ধাপে সদস্যপদ গ্রহণ প্রক্রিয়া' : 'Simple 4-Step Online Enrollment'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {applicationSteps.map((s, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 flex gap-3 shadow-xs">
                    <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shrink-0">
                      {language === 'bn' ? s.step : s.stepEn}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">{s.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => setShowApplyModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-xl transition shadow cursor-pointer active:scale-98"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.btnApply}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contribution, Fund Policies & Nominee Rule */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Welfare Fund & Fees Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-700/50">
              <div className="flex items-center gap-3 border-b border-emerald-800/80 pb-4">
                <div className="p-2.5 rounded-xl bg-emerald-700 text-white">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t.rulesFundTitle}</h3>
                  <p className="text-xs text-emerald-300">স্বচ্ছ ও অডিটকৃত কল্যাণ ডিপোজিট</p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <p>{t.rulesFund1}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <p>{t.rulesFund2}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <p>{t.rulesFund3}</p>
                </div>
              </div>

              {/* Fee Breakdown Box */}
              <div className="mt-6 pt-4 border-t border-emerald-800/80 bg-emerald-950/60 rounded-xl p-4">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-emerald-900">
                  <span className="text-slate-300">মাসিক কল্যাণ চাঁদা:</span>
                  <span className="font-bold text-white font-mono">৳ ৩০০.০০ / মাস</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-slate-300">বাৎসরিক এককালীন:</span>
                  <span className="font-bold text-amber-300 font-mono">৳ ৩,৬০০.০০ (অগ্রিম)</span>
                </div>
              </div>

              {/* Supported Payment Channels */}
              <div className="mt-6 pt-2">
                <p className="text-[11px] text-slate-300 font-semibold mb-2">সমর্থিত ডিজিটাল পেমেন্ট চ্যানেল:</p>
                <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold">
                  <span className="bg-pink-600/90 px-2 py-0.5 rounded text-white">bKash</span>
                  <span className="bg-orange-600/90 px-2 py-0.5 rounded text-white">Nagad</span>
                  <span className="bg-purple-600/90 px-2 py-0.5 rounded text-white">Rocket</span>
                  <span className="bg-blue-700/90 px-2 py-0.5 rounded text-white">Bank Transfer</span>
                  <span className="bg-emerald-800 px-2 py-0.5 rounded text-white">কাউন্টার নগদ</span>
                </div>
              </div>
            </div>

            {/* Nominee Protection Note */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200/90 flex gap-3.5">
              <Users className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-amber-900">
                  {language === 'bn' ? 'পরিবার ও নমিনির আইনি সুরক্ষা' : 'Family & Nominee Legal Protection'}
                </h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  {language === 'bn'
                    ? 'আবেদনের সময় এক বা একাধিক নমিনি নির্বাচন করা বাধ্যতামূলক। নমিনিদের শতকরা হার সমষ্টিগতভাবে ঠিক ১০০% হতে হবে যাতে চালকের অবর্তমানে কোনো আইনি জটিলতা ছাড়াই অনুদান পৌঁছানো যায়।'
                    : 'Designating one or multiple nominees totaling exactly 100% is mandatory so benefits reach rightful family members without delay.'}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
