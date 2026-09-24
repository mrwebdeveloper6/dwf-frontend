import React from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  ArrowRight,
  BookOpen,
  Calendar,
  Lock
} from 'lucide-react';

export const RulesPage: React.FC = () => {
  const { language, setActiveView, setShowApplyModal } = useDwf();

  const rulesList = [
    {
      titleBn: '১. সাধারণ সদস্যপদের যোগ্যতা ও পেশাগত শর্ত',
      titleEn: '1. General Membership Eligibility & Professional Criteria',
      descBn: 'আবেদনকারীকে অবশ্যই বাংলাদেশের নাগরিক হতে হবে এবং বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষ (বিআরটিএ) কর্তৃক ইস্যুকৃত বৈধ ড্রাইভিং লাইসেন্স (পেশাদার হালকা, মধ্যম বা ভারী) থাকতে হবে। অপ্রাপ্তবয়স্ক (১৮ বছরের নিচে) বা অবৈধ অনুমোদনহীন ব্যক্তি সদস্য হতে পারবেন না।',
      descEn: 'Applicant must be a Bangladeshi national holding a valid professional driving license issued by BRTA. Unlicensed operators are strictly ineligible.'
    },
    {
      titleBn: '২. মাসিক কল্যাণ তহবিল চাঁদা ও নিয়মিত জমাদান',
      titleEn: '2. Monthly Welfare Deposit & Timely Contribution',
      descBn: 'প্রত্যেক সদস্যকে প্রতি মাসে ৩০০ (তিন শত) টাকা হারে কল্যাণ চাঁদা জমা দিতে হবে। পরপর ৩ মাস চাঁদা অনাদায়ী থাকিলে সদস্যপদ সাময়িকভাবে স্থগিত থাকিবে। তবে এককালীন বাৎসরিক ৩৬০০ টাকা অগ্রিম জমা দিলে বিশেষ বোনাস পয়েন্ট ও নিয়মিত অডিটেড সার্টিফিকেট প্রদান করা হয়।',
      descEn: 'Monthly contribution is fixed at 300 BDT. Defaulting for 3 consecutive months incurs provisional suspension until clearance.'
    },
    {
      titleBn: '৩. নমিনি নির্বাচন ও ১০০% বণ্টন বাধ্যবাধকতা',
      titleEn: '3. Nominee Designation & 100% Allocation Mandate',
      descBn: 'আবেদনপত্রে এক বা একাধিক বৈধ রক্তের সম্পর্কের নমিনি ঘোষণা করা বাধ্যতামূলক। একাধিক নমিনি থাকিলে তাহাদের শতকরা হারের যোগফল ঠিক ১০০% হইতে হইবে। চালকের অনাকাঙ্ক্ষিত মৃত্যুতে কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি নমিনির ব্যাংক বা মোবাইল ব্যাংকিং একাউন্টে ২ লক্ষ টাকা এককালীন অনুদান দেওয়া হইবে।',
      descEn: 'Members must designate one or more legitimate bloodline nominees summing to exactly 100%. In fatal accidents, immediate compensation is released directly to nominated heirs.'
    },
    {
      titleBn: '৪. দুর্ঘটনা ও চিকিৎসা ক্ষতিপূরণ দাবি দাখিলের নিয়মাবলী',
      titleEn: '4. Accident Relief & Medical Claims Procedure',
      descBn: 'যেকোনো সড়ক দুর্ঘটনার সর্বোচ্চ ৭ দিনের মধ্যে এবং সাধারণ চিকিৎসার ক্ষেত্রে ১৫ দিনের মধ্যে কেন্দ্রীয় হেল্পলাইনে অবহিত করিয়া প্রয়োজনীয় প্রেসক্রিপশন, ডায়াগনস্টিক রিপোর্ট এবং জিডি কপির স্ক্যান কপি মেম্বার পোর্টাল বা নিকটস্থ শাখা অফিসে দাখিল করিতে হইবে।',
      descEn: 'Accident claims must be notified within 7 days with official hospital discharge certificates and police GD memos through the Member Portal.'
    },
    {
      titleBn: '৫. আচরণবিধি ও সদস্যপদ বাতিলের শর্তসমূহ',
      titleEn: '5. Professional Code of Conduct & Termination Grounds',
      descBn: 'মাদক সেবন করিয়া গাড়ি চালানো, মারাত্মক অপরাধমূলক কার্যকলাপ, সংঘের নাম ব্যবহার করিয়া চাঁদাবাজি অথবা জাল নথিপত্র প্রদান প্রমাণিত হইলে পরিচালনা পর্ষদের সিদ্ধান্তক্রমে সদস্যপদ স্থায়ীভাবে বাতিল হইবে এবং জমাকৃত কল্যাণ ফান্ডের সমাপনী পাওনা বাজেয়াপ্ত করা হইতে পারে।',
      descEn: 'Driving under the influence, extortion, or fraudulent submissions result in permanent expulsion by the Executive Board.'
    },
    {
      titleBn: '৬. সমাপ্তি পেনশন ও সঞ্চিত কল্যাণ তহবিল ফেরত',
      titleEn: '6. Maturity Pension & Accumulated Fund Withdrawal',
      descBn: 'ন্যূনতম ৫ বছর অবিচ্ছিন্ন সদস্যপদ বজায় রাখার পর চালক স্বেচ্ছায় পেশা ত্যাগ করিলে অথবা ৬০ বছর বয়সোত্তীর্ণ অবসরে মূল জমাকৃত চাঁদার সহিত সংগঠনের বার্ষিক উদ্বৃত্ত লভ্যাংশ যোগ করিয়া সম্মানজনক সমাপ্তি পেনশন হস্তান্তর করা হইবে।',
      descEn: 'After 5 years of continuous membership, retiring drivers receive full principal deposits enriched with welfare dividend distributions.'
    }
  ];

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
            <span className="text-white font-semibold">{language === 'bn' ? 'সাংগঠনিক উপবিধি ও নীতিমালা' : 'Rules & Constitution'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                {language === 'bn' ? 'ডিডব্লিউএফ সাংগঠনিক সংবিধান ও শর্তাবলী' : 'Official Bylaws & Policies'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                {language === 'bn' ? 'সদস্যপদ উপবিধি ও আর্থিক নীতিমালা' : 'Membership Constitution & Policies'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'স্বচ্ছতা, জবাবদিহিতা ও চালক পরিবারের শতভাগ আইনি সুরক্ষা নিশ্চিত করতে প্রণীত কেন্দ্রীয় উপবিধি ও কার্যপ্রণালী।'
                  : 'The regulatory covenants safeguarding driver funds, mutual accountability, and transparent nominee rights.'}
              </p>
            </div>

            <button
              onClick={() => setShowApplyModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-950/60 transition cursor-pointer active:scale-95 shrink-0 flex items-center gap-2 border border-red-400/40"
            >
              <span>{language === 'bn' ? 'শর্ত মেনে আবেদন করুন' : 'Apply With Agreement'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        
        {/* Rules Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Rules Articles */}
          <div className="lg:col-span-8 space-y-6">
            {rulesList.map((rule, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-2 hover:border-red-300 transition"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{language === 'bn' ? rule.titleBn : rule.titleEn}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                  {language === 'bn' ? rule.descBn : rule.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Fund Summary Box */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-gradient-to-br from-[#034732] to-[#02291d] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-800 space-y-4">
              <div className="flex items-center gap-3 border-b border-emerald-800 pb-4">
                <div className="p-2.5 rounded-xl bg-red-600 text-white">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">চাঁদা ও তহবিল কাঠামো</h4>
                  <p className="text-xs text-emerald-300">অডিটকৃত কেন্দ্রীয় লেজার</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-emerald-900">
                  <span className="text-emerald-200">মাসিক চাঁদা:</span>
                  <span className="font-mono font-bold text-base text-white">৳ ৩০০.০০ / মাস</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-900">
                  <span className="text-emerald-200">বাৎসরিক এককালীন:</span>
                  <span className="font-mono font-bold text-emerald-300">৳ ৩,৬০০.০০</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-900">
                  <span className="text-emerald-200">ডিজিটাল স্মার্ট কার্ড ফি:</span>
                  <span className="font-mono font-bold text-white">৳ ১৫০.০০ (এককালীন)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-emerald-200">নমিনি পরিবর্তন ফি:</span>
                  <span className="font-mono font-bold text-emerald-300">বিনামূল্যে (০৳)</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[11px] text-emerald-200/90 font-semibold mb-2">সমর্থিত পেমেন্ট চ্যানেল:</p>
                <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold">
                  <span className="bg-pink-600 px-2 py-0.5 rounded text-white">bKash</span>
                  <span className="bg-orange-600 px-2 py-0.5 rounded text-white">Nagad</span>
                  <span className="bg-purple-600 px-2 py-0.5 rounded text-white">Rocket</span>
                  <span className="bg-emerald-800 px-2 py-0.5 rounded text-white">Bank Transfer</span>
                </div>
              </div>
            </div>

            {/* Nominee Shield Card */}
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Users className="w-5 h-5 text-amber-700" />
                <span>পরিবার ও নমিনির আইনি ঢাল</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                নমিনিদের শতকরা ভাগ সমষ্টিগতভাবে ঠিক ১০০% হতে হবে যাতে চালকের অবর্তমানে কোনো আইনি জটিলতা বা পারিবারিক বিরোধ ছাড়াই সম্পূর্ণ অনুদান সরাসরি মনোনীত ব্যক্তির হাতে পৌঁছানো যায়।
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
