import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  HeartPulse, 
  ShieldAlert, 
  Scale, 
  GraduationCap, 
  HeartHandshake, 
  Compass, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Clock,
  HelpCircle
} from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const { language, setActiveView, setShowApplyModal } = useDwf();
  const [activeTab, setActiveTab] = useState('all');

  const detailedPrograms = [
    {
      id: 'health-card',
      icon: HeartPulse,
      titleBn: 'ডিজিটাল স্মার্ট স্বাস্থ্য কার্ড ও হাসপাতাল বিল ছাড়',
      titleEn: 'Digital Smart Health Card & Hospital Subsidy',
      grantLimitBn: '৫০,০০০৳ পর্যন্ত বার্ষিক চিকিৎসা অনুদান',
      grantLimitEn: 'Up to 50,000 BDT Annual Medical Grant',
      badge: 'সর্বোচ্চ জনপ্রিয়',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      iconBg: 'bg-red-50 text-red-600',
      descriptionBn: 'সকল নিবন্ধিত সদস্য চালক ও তাদের পরিবারের সদস্যরা সারা বাংলাদেশের ২৫০+ চুক্তিবদ্ধ হাসপাতাল ও ডায়াগনস্টিক সেন্টারে কেবিন, টেস্ট এবং সার্জারিতে ৫০% পর্যন্ত ছাড় পাবেন। এছাড়াও গুরুতর অসুস্থতায় সর্বোচ্চ ৫০,০০০ টাকা এককালীন অনুদান প্রদান করা হয়।',
      descriptionEn: 'Provides all verified member drivers and their dependents up to 50% discounts across 250+ partner hospitals, pathology clinics, and diagnostic labs, plus emergency lump-sum treatment grants up to 50,000 BDT.',
      eligibilityBn: [
        'ন্যূনতম ৩ মাসের নিয়মিত মাসিক কল্যাণ চাঁদা পরিশোধ থাকতে হবে',
        'চিকিৎসকের মূল প্রেসক্রিপশন ও হাসপাতালের অরিজিনাল বিল ভাউচার জমা দিতে হবে',
        'ডিডব্লিউএফ মেডিকেল স্ক্রুটিনি বোর্ড কর্তৃক অনুমোদন'
      ],
      documentsBn: ['মেম্বার আইডি কার্ড ফটোকপি', 'হাসপাতাল ডিসচার্জ সার্টিফিকেট', 'বিল ও টেস্ট রিপোর্ট']
    },
    {
      id: 'accident',
      icon: ShieldAlert,
      titleBn: 'সড়ক দুর্ঘটনা সহায়তা ও তাৎক্ষণিক পরিবার ক্ষতিপূরণ',
      titleEn: 'Road Accident Relief & Nominee Compensation Fund',
      grantLimitBn: '২,০০,০০০৳ পর্যন্ত এককালীন পরিবার সহায়তা',
      grantLimitEn: 'Up to 200,000 BDT Immediate Nominee Grant',
      badge: 'জরুরি সুরক্ষা',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      iconBg: 'bg-red-50 text-red-600',
      descriptionBn: 'পেশাগত দায়িত্ব পালনের সময় কোনো চালক সড়ক দুর্ঘটনায় আহত বা অঙ্গহানি হলে তাৎক্ষণিক চিকিৎসা ব্যয় বহন করা হয়। এবং অনাকাঙ্ক্ষিত দুর্ঘটনায় চালক মৃত্যুবরণ করলে তার মনোনীত নমিনিকে সর্বোচ্চ ২ লক্ষ টাকা অনুদান এবং সৎকারের জন্য তাৎক্ষণিক নগদ সহায়তা প্রদান করা হয়।',
      descriptionEn: 'Immediate financial aid for on-duty highway crashes resulting in injury or permanent disability. In fatal incidents, nominees receive up to 200,000 BDT lump-sum assistance plus emergency burial disbursement within 24 hours.',
      eligibilityBn: [
        'সক্রিয় সদস্যপদ ও সংশ্লিষ্ট রুটের বৈধ চালনা তথ্য',
        'পুলিশ জিডি অথবা হাসপাতাল দুর্ঘটনা নিবন্ধন মেমো',
        'নিবন্ধন নথিতে উল্লেখিত শতভাগ অনুমোদিত নমিনি'
      ],
      documentsBn: ['দুর্ঘটনা সংক্রান্ত জিডি কপি', 'মৃত্যু সনদ / ডাক্তারের প্রতিবন্ধী রিপোর্ট', 'নমিনির এনআইডি ও ব্যাংক তথ্য']
    },
    {
      id: 'legal',
      icon: Scale,
      titleBn: '২৪/৭ ফ্রি লিগ্যাল এইড ও হাইওয়ে আইনজীবী প্যানেল',
      titleEn: '24/7 Free Legal Defense & Highway Advocate Panel',
      grantLimitBn: 'সম্পূর্ণ বিনামূল্যে আইনজীবী সহায়তা',
      grantLimitEn: '100% Free Legal Representation',
      badge: 'আইনি ঢাল',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-700',
      descriptionBn: 'অনাকাঙ্ক্ষিত দুর্ঘটনা বা মিথ্যা অভিযোগে পুলিশি মামলা হলে ঢাকার কেন্দ্রীয় জজ কোর্ট এবং প্রতিটি বিভাগীয় আইনজীবী প্যানেলের মাধ্যমে চালকদের সম্পূর্ণ বিনামূল্যে জামিন আবেদন ও আইনি লড়াই পরিচালনা করা হয়।',
      descriptionEn: 'Dedicated legal counsel panel representing commercial drivers in road transport tribunals, bail hearings, and police interrogations at no personal fee.',
      eligibilityBn: [
        'ডিডব্লিউএফ নিয়মিত সদস্য এবং চালকের বৈধ ড্রাইভিং লাইসেন্স',
        'দুর্ঘটনার ১২ ঘণ্টার মধ্যে হেল্পলাইন ১৬৭৮৯-এ মামলা নোটিফিকেশন',
        'মাদক বা অসৎ কার্যকলাপ ব্যতীত পেশাগত পরিবহন মামলা'
      ],
      documentsBn: ['ড্রাইভিং লাইসেন্স ও রুট পারমিট', 'থানার মামলা / এফআইআর নম্বর', 'ডিডব্লিউএফ সদস্য নম্বর']
    },
    {
      id: 'training',
      icon: GraduationCap,
      titleBn: 'পেশাদার চালক প্রশিক্ষণ ও বিআরটিএ লাইসেন্স আপগ্রেডেশন',
      titleEn: 'Professional Training & BRTA License Upgradation',
      grantLimitBn: 'ফ্রি সার্টিফিকেশন ও সিমুলেটর ট্রেনিং',
      grantLimitEn: 'Free BRTA Certified Simulator Modules',
      badge: 'দক্ষতা উন্নয়ন',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-700',
      descriptionBn: 'উন্নত সিমুলেটর ও আধুনিক প্রজেক্টরের মাধ্যমে হাইওয়ে ডিফেন্সিভ ড্রাইভিং, ট্রাফিক সাইন, ফার্স্ট এইড ও বিআরটিএ পেশাদার লাইসেন্স নবায়ন পরীক্ষার জন্য বিনামূল্যে নিবিড় কর্মশালা আয়োজন করা হয়।',
      descriptionEn: 'Hands-on defensive highway driving workshops, CPR training, eco-driving instruction, and official test preparation for upgrading commercial license classes.',
      eligibilityBn: [
        'হালকা বা ভারী মোটরযান চালক সদস্য',
        'বাৎসরিক ন্যূনতম ১টি বাধ্যতামূলক রিফ্রেশার কোর্সে অংশগ্রহণ'
      ],
      documentsBn: ['বর্তমান লাইসেন্সের ফটোকপি', 'পাসপোর্ট সাইজ ছবি', 'সদস্যপদ কার্ড']
    },
    {
      id: 'rehab',
      icon: HeartHandshake,
      titleBn: 'স্থায়ী পুর্নবাসন ও চালক পরিবার ক্ষুদ্রঋণ তহবিল',
      titleEn: 'Driver Permanent Rehabilitation & Micro-Grant Fund',
      grantLimitBn: '৫০,০০০৳ – ১,০০,০০০৳ পুনর্বাসন অনুদান',
      grantLimitEn: '50k - 100k BDT Micro-Rehabilitation Aid',
      badge: 'টেকসই ভবিষ্যৎ',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-700',
      descriptionBn: 'বয়সজনিত কারণে বা অসুস্থতায় চালনা পেশা থেকে অবসর গ্রহণকারী চালকদের সম্মানজনক বিকল্প কর্মসংস্থান ও ক্ষুদ্র ব্যবসার জন্য সুদমুক্ত অনুদান এবং সন্তানদের শিক্ষা বৃত্তি প্রদান করা হয়।',
      descriptionEn: 'Micro-grants and vocational aid for retired or physically impaired senior drivers to establish sustainable self-employment, accompanied by children education stipends.',
      eligibilityBn: [
        'ন্যূনতম ৫ বছর ফাউন্ডেশনের নিয়মিত চাঁদা প্রদানকারী সিনিয়র সদস্য',
        'শারীরিক অক্ষমতা বা ৬০ বছর বয়সোত্তীর্ণ অবসর'
      ],
      documentsBn: ['মেম্বারশিপ হিস্ট্রি লেজার', 'অবসর বা অক্ষমতার সনদপত্র', 'ব্যবসায়িক পরিকল্পনা আবেদন']
    },
    {
      id: 'hajj',
      icon: Compass,
      titleBn: 'বাৎসরিক ওমরাহ ও পবিত্র হজ স্পন্সরশিপ লটারি',
      titleEn: 'Annual Sponsored Hajj & Umrah Driver Pilgrimage',
      grantLimitBn: 'সম্পূর্ণ ফ্রি বিমান ও প্যাকেজ স্পন্সরশিপ',
      grantLimitEn: 'Full All-Expense Paid Pilgrimage Lottery',
      badge: 'আধ্যাত্মিক উপহার',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      iconBg: 'bg-red-50 text-red-600',
      descriptionBn: 'প্রতি বছর সাধারণ পরিষদ অধিবেশনে স্বচ্ছ ডিজিটাল লটারির মাধ্যমে সৎ ও নিষ্ঠাবান সদস্য চালকদের ফাউন্ডেশনের অর্থায়নে পবিত্র ওমরাহ পালনে মক্কা-মদিনা প্রেরণ করা হয়।',
      descriptionEn: 'Every year, transparent digital lotteries select devoted long-term driver members for fully sponsored holy pilgrimages to Makkah and Madinah.',
      eligibilityBn: [
        'ন্যূনতম ২ বছর মেয়াদী নিয়মিত সদস্য ও কোনো ট্রাফিক অপরাধে সাজাপ্রাপ্ত নয়',
        'পূর্বে সরকারি বা প্রাতিষ্ঠানিক হজে অংশগ্রহণ করেননি এমন চালক'
      ],
      documentsBn: ['বৈধ আন্তর্জাতিক পাসপোর্ট', 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট', 'ডিডব্লিউএফ গুড-কন্ডাক্ট প্রত্যয়ন']
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
            <span className="text-white font-semibold">{language === 'bn' ? 'সকল কল্যাণ কর্মসূচি ও সুবিধা' : 'Welfare Programs'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                {language === 'bn' ? 'চালকদের সামাজিক নিরাপত্তা ও অধিকার' : 'Social Security & Driver Rights'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                {language === 'bn' ? 'কল্যাণ ও জরুরি সেবা প্রকল্পসমূহ' : 'Comprehensive Welfare & Aid Programs'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'স্বাস্থ্য সুরক্ষা, দুর্ঘটনা ক্ষতিপূরণ, ফ্রি আইনি লড়াই এবং সন্তানদের ভবিষ্যৎ বিনির্মাণে ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশনের বিশেষ ৬টি সেবা কর্মসূচি।'
                  : 'Six core institutional welfare umbrellas providing medical subsidies, rapid accident indemnity, free legal defense, and long-term security.'}
              </p>
            </div>

            <button
              onClick={() => setShowApplyModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-950/60 transition cursor-pointer active:scale-95 shrink-0 flex items-center gap-2 border border-red-400/40"
            >
              <span>{language === 'bn' ? 'অনলাইনে সদস্যপদ আবেদন করুন' : 'Apply For Membership'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        
        {/* Detailed Program Cards */}
        <div className="space-y-8">
          {detailedPrograms.map((prog, index) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-between">
                
                {/* Left Info Column */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3.5 rounded-2xl ${prog.iconBg} shadow-xs`}>
                      <prog.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${prog.badgeColor}`}>
                          {prog.badge}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 font-mono">প্রকল্প নং ০{index + 1}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                        {language === 'bn' ? prog.titleBn : prog.titleEn}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === 'bn' ? prog.descriptionBn : prog.descriptionEn}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                      <p className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>প্রাপ্যতার শর্তাবলী (Eligibility):</span>
                      </p>
                      <ul className="space-y-1 text-xs text-emerald-800 list-disc list-inside">
                        {prog.eligibilityBn.map((item, i) => (
                          <li key={i} className="leading-snug">{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-slate-600" />
                        <span>প্রয়োজনীয় কাগজপত্র (Documents):</span>
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                        {prog.documentsBn.map((item, i) => (
                          <li key={i} className="leading-snug">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Grant Limit Box & Action */}
                <div className="w-full lg:w-72 bg-gradient-to-br from-[#034732] to-[#02291d] text-white p-6 rounded-2xl border border-emerald-800/80 shadow-md flex flex-col justify-between shrink-0 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 block">
                      সর্বোচ্চ অনুদান সীমা
                    </span>
                    <p className="text-lg font-black text-white mt-1 leading-snug font-sans">
                      {language === 'bn' ? prog.grantLimitBn : prog.grantLimitEn}
                    </p>
                    <p className="text-[10px] text-emerald-200/80 mt-2 leading-relaxed">
                      * ডিডব্লিউএফ কেন্দ্রীয় অডিট ও গঠনতন্ত্র ২০২৬ অনুযায়ী সরাসরি অনুদান হস্তান্তর।
                    </p>
                  </div>

                  <div className="pt-2 border-t border-emerald-800/80">
                    <button
                      onClick={() => setShowApplyModal(true)}
                      className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>এখনই আবেদন করুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Emergency Assistance Hotline Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-red-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <PhoneCall className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">জরুরি দুর্ঘটনা ও চিকিৎসা সহায়তা সেল</span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">টোল-ফ্রি হেল্পলাইন: ১৬৭৮৯</h4>
              <p className="text-xs text-slate-500">২৪ ঘণ্টা দেশের যে-কোনো স্থান থেকে সরাসরি আইনি ও মেডিকেল টিম সহায়তায় নিয়োজিত।</p>
            </div>
          </div>

          <a
            href="tel:16789"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition active:scale-95 shrink-0"
          >
            সরাসরি হেল্পলাইনে কল করুন
          </a>
        </div>

      </div>

    </div>
  );
};
