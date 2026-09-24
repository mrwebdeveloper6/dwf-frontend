import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { CommitteeMember } from '../../types/dwf';
import { 
  Phone, 
  PhoneCall, 
  MessageCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  Award, 
  Users, 
  Search, 
  MapPin,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const CentralCommitteeSection: React.FC = () => {
  const { language, committeeMembers, setActiveView } = useDwf();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'PRESIDIUM' | 'SECRETARY' | 'SPECIALIZED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredMembers = committeeMembers.filter((member) => {
    const matchesFilter = filterType === 'ALL' || member.roleType === filterType;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesFilter;

    const matchesSearch = 
      member.nameBn.toLowerCase().includes(q) ||
      member.nameEn.toLowerCase().includes(q) ||
      member.designationBn.toLowerCase().includes(q) ||
      member.designationEn.toLowerCase().includes(q) ||
      member.phone.includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="central-committee" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{language === 'bn' ? 'সাংগঠনিক পরিচালনা পর্ষদ' : 'Central Governing Body'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'কেন্দ্রীয় কমিটি' : 'Central Executive Committee'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {language === 'bn'
              ? 'ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশনের সম্মানিত কেন্দ্রীয় পরিচালনা পর্ষদ ও দায়িত্বপ্রাপ্ত কর্মকর্তাবৃন্দ — সার্বক্ষণিক চালক ভাইদের সেবায় নিবেদিতপ্রাণ।'
              : 'The designated leaders and executive board officers of Drivers Welfare Foundation, dedicated 24/7 to the welfare and rights of commercial drivers.'}
          </p>
        </div>

        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-300 rounded-xl shadow-xs overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                filterType === 'ALL'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
              }`}
            >
              {language === 'bn' ? 'সকল কর্মকর্তা' : 'All Leaders'} ({committeeMembers.length})
            </button>
            <button
              onClick={() => setFilterType('PRESIDIUM')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                filterType === 'PRESIDIUM'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
              }`}
            >
              {language === 'bn' ? 'সভাপতি ও সহ-সভাপতি' : 'Presidium'}
            </button>
            <button
              onClick={() => setFilterType('SECRETARY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                filterType === 'SECRETARY'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
              }`}
            >
              {language === 'bn' ? 'সম্পাদক মণ্ডলী' : 'Secretariat'}
            </button>
            <button
              onClick={() => setFilterType('SPECIALIZED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                filterType === 'SPECIALIZED'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
              }`}
            >
              {language === 'bn' ? 'আইন ও স্বাস্থ্য সেল' : 'Legal & Health'}
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'নাম, পদবী বা ফোন দিয়ে খুঁজুন...' : 'Search leader by name/phone...'}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
            />
          </div>

        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredMembers.map((member) => {
            const isCopied = copiedId === member.id;

            return (
              <div 
                key={member.id}
                className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden relative ${
                  member.isKeyLeader 
                    ? 'border-emerald-400/90 ring-2 ring-emerald-500/20 shadow-sm' 
                    : 'border-slate-300/80 hover:border-emerald-400 shadow-sm'
                }`}
              >
                {/* Top Badge for Key Leaders */}
                {member.isKeyLeader && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{language === 'bn' ? 'শীর্ষ নেতৃত্ব' : 'Key Leader'}</span>
                    </span>
                  </div>
                )}

                {/* Card Top: Photo & Details */}
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    {/* Portrait Photo */}
                    <div className="relative shrink-0">
                      <img 
                        src={member.photo} 
                        alt={member.nameEn}
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-emerald-100 shadow-xs"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-700 text-white rounded-full shadow-2xs">
                        <Award className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Names & Designations */}
                    <div className="flex-1 min-w-0 pr-1">
                      <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200/80 mb-1">
                        {language === 'bn' ? member.designationBn : member.designationEn}
                      </span>
                      
                      <h3 className="text-sm font-bold text-slate-900 truncate leading-snug" title={language === 'bn' ? member.nameBn : member.nameEn}>
                        {language === 'bn' ? member.nameBn : member.nameEn}
                      </h3>

                      <p className="text-[11px] text-slate-500 font-medium truncate flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{language === 'bn' ? member.locationBn : member.locationEn}</span>
                      </p>
                    </div>
                  </div>

                  {/* Tenure / Validity */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="text-[10px] font-semibold text-slate-400">
                      {language === 'bn' ? 'দায়িত্বকাল' : 'Tenure'}
                    </span>
                    <span className="font-medium text-emerald-800 bg-emerald-50/70 px-2 py-0.5 rounded text-[10px]">
                      {language === 'bn' ? member.tenureBn : member.tenureEn}
                    </span>
                  </div>
                </div>

                {/* Card Bottom: Phone Number & Instant Actions */}
                <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  
                  {/* Phone Display */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-800 tracking-tight truncate">
                      {member.phone}
                    </span>
                  </div>

                  {/* Action Buttons: Call & Copy */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Copy Phone Button */}
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

                    {/* Direct Call Button */}
                    <a
                      href={`tel:${member.cleanPhone}`}
                      title={language === 'bn' ? 'সরাসরি কল করুন' : 'Direct Call'}
                      className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition active:scale-95"
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

        {/* Empty Search State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-300 shadow-sm">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">
              {language === 'bn' ? 'কোনো কর্মকর্তার তথ্য পাওয়া যায়নি' : 'No committee member found matching your query'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'bn' ? 'দয়া করে সঠিক নাম বা পদবী দিয়ে পুনরায় চেষ্টা করুন' : 'Please check spelling and try again'}
            </p>
          </div>
        )}

        {/* Emergency Assistance Notice at Bottom */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-white/10 text-emerald-300 shrink-0">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold">
                {language === 'bn' ? 'কেন্দ্রীয় নিয়ন্ত্রণ কক্ষ ও জরুরি সেবা ডেস্ক' : 'Central Control Room & Emergency Desk'}
              </h4>
              <p className="text-xs text-emerald-200 mt-0.5">
                {language === 'bn'
                  ? 'যেকোনো বিভাগীয় সমস্যা বা তাৎক্ষণিক দুর্ঘটনা সহায়তায় সরাসরি কেন্দ্রীয় কার্যালয়ে যোগাযোগ করুন।'
                  : 'For urgent regional concerns or roadside emergency grants, contact our central secretariat.'}
              </p>
            </div>
          </div>

          <a
            href="tel:16789"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm tracking-wide shadow-md transition hover:scale-102 shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>হটলাইন: ১৬৭৮৯ (টোল-ফ্রি)</span>
          </a>
        </div>

        {/* Dedicated Page Link CTA */}
        <div className="text-center pt-6">
          <button
            onClick={() => {
              setActiveView('central-committee');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-red-600/20 active:scale-95 cursor-pointer"
          >
            <span>{language === 'bn' ? 'পূর্ণাঙ্গ কেন্দ্রীয় কমিটি ও ডিরেক্টরি পেইজ দেখুন' : 'View Full Central Committee Page'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
