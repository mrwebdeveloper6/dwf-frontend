import React, { useState, useMemo } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  Users, 
  ArrowLeft, 
  Search, 
  Phone, 
  PhoneCall, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Award,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const CommitteePage: React.FC = () => {
  const { language, setActiveView, committeeMembers } = useDwf();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return committeeMembers.filter((m) => {
      return (
        m.nameEn.toLowerCase().includes(q) ||
        m.nameBn.toLowerCase().includes(q) ||
        m.designationEn.toLowerCase().includes(q) ||
        m.designationBn.toLowerCase().includes(q) ||
        m.phone.includes(q)
      );
    });
  }, [committeeMembers, searchQuery]);

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
            <span className="text-white font-semibold">{language === 'bn' ? 'কেন্দ্রীয় কার্যনির্বাহী পরিষদ' : 'Central Committee'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                {language === 'bn' ? 'সাংগঠনিক নেতৃত্ব ও পরিচালনা পর্ষদ' : 'Executive Leadership & Governing Board'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                {language === 'bn' ? 'কেন্দ্রীয় কার্যনির্বাহী পরিষদ (২০২৬-২০২৮)' : 'Central Executive Council (2026-2028)'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'বাংলাদেশের পরিবহন চালক সমাজের কল্যাণ, আইনি সুরক্ষা এবং আর্থিক উন্নয়ন নিশ্চিত করতে নিয়োজিত ডিডব্লিউএফের কেন্দ্রীয় পরিচালনা পর্ষদ।'
                  : 'The governing council and leadership team spearheading the nationwide transport welfare trust.'}
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'নাম, পদবী বা ফোন দিয়ে খুঁজুন...' : 'Search leader by name/phone...'}
                className="w-full pl-9 pr-3 py-2.5 bg-emerald-950/90 border border-emerald-700/80 rounded-xl text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Committee Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        
        {/* Council Constitution Statement */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের রেজিস্টার্ড সংবিধান অনুযায়ী পরিচালিত</h3>
              <p className="text-xs text-slate-500">প্রতি ২ বছর অন্তর সাধারণ পরিষদ অধিবেশনের গণতান্ত্রিক ভোটের মাধ্যমে কেন্দ্রীয় কার্যনির্বাহী কমিটি নির্বাচিত হয়।</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl shrink-0">
            মোট সদস্য: {filteredMembers.length} জন
          </span>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => {
            const isCopied = copiedId === member.id;

            return (
              <div 
                key={member.id}
                className={`bg-white rounded-3xl border transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden relative ${
                  member.isKeyLeader 
                    ? 'border-red-400 ring-2 ring-red-500/20 shadow-sm' 
                    : 'border-slate-200 hover:border-red-400 shadow-xs'
                }`}
              >
                {/* Top Badge for Key Leaders */}
                {member.isKeyLeader && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{language === 'bn' ? 'শীর্ষ নেতৃত্ব' : 'Key Leader'}</span>
                    </span>
                  </div>
                )}

                {/* Card Top: Photo & Details */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Portrait Photo */}
                    <div className="relative shrink-0">
                      <img 
                        src={member.photo} 
                        alt={member.nameBn}
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-red-500/80 shadow-md"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-2xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug truncate">
                        {language === 'bn' ? member.nameBn : member.nameEn}
                      </h4>
                      <p className="text-xs font-bold text-red-700 mt-1 line-clamp-1">
                        {language === 'bn' ? member.designationBn : member.designationEn}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 truncate">
                        <Building2 className="w-3 h-3 text-emerald-700 shrink-0" />
                        <span>{member.locationBn || 'কেন্দ্রীয় কার্যালয়'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Tenure Info */}
                  <div className="pt-2 text-[10px] text-slate-500 flex items-center gap-1.5 font-mono">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      মেয়াদ: {member.tenureBn}
                    </span>
                  </div>
                </div>

                {/* Card Bottom: Phone & Contact CTAs */}
                <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  
                  {/* Phone Display */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-800 tracking-tight truncate">
                      {member.phone}
                    </span>
                  </div>

                  {/* Action Buttons: Call & Copy */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopyPhone(member.id, member.phone)}
                      title={language === 'bn' ? 'নাম্বার কপি করুন' : 'Copy number'}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        isCopied
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-slate-600 hover:text-red-700 hover:bg-red-50 border-slate-200'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={`tel:${member.cleanPhone}`}
                      title={language === 'bn' ? 'সরাসরি কল করুন' : 'Direct Call'}
                      className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition active:scale-95"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{language === 'bn' ? 'কল' : 'Call'}</span>
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
