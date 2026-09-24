import React, { useState, useMemo } from 'react';
import { useDwf } from '../../context/DwfContext';
import { NoticeItem } from '../../types/dwf';
import { 
  Bell, 
  ArrowLeft, 
  Search, 
  Calendar, 
  AlertCircle, 
  ArrowRight, 
  X, 
  Download, 
  FileText,
  Share2
} from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { language, setActiveView, notices } = useDwf();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const categories = [
    { id: 'all', labelBn: 'সকল নোটিশ', labelEn: 'All Circulars' },
    { id: 'জরুরি', labelBn: 'জরুরি বিজ্ঞপ্তি', labelEn: 'Urgent' },
    { id: 'সার্কুলার', labelBn: 'সাংগঠনিক সার্কুলার', labelEn: 'Circulars' },
    { id: 'স্বাস্থ্য', labelBn: 'স্বাস্থ্য ও চিকিৎসা', labelEn: 'Health' },
    { id: 'আইন', labelBn: 'আইনি সহায়তা', labelEn: 'Legal Aid' }
  ];

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesCategory = activeCategory === 'all' || notice.category.toLowerCase().includes(activeCategory.toLowerCase());
      const q = searchQuery.toLowerCase();
      const matchesQuery = 
        notice.title.toLowerCase().includes(q) ||
        notice.titleBn.toLowerCase().includes(q) ||
        notice.excerpt.toLowerCase().includes(q) ||
        notice.excerptBn.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [notices, activeCategory, searchQuery]);

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
            <span className="text-white font-semibold">{language === 'bn' ? 'সাংগঠনিক নোটিশ ও সার্কুলার আর্কাইভ' : 'Official Notices Archive'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                <Bell className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'কেন্দ্রীয় প্রেস ও নোটিশ বোর্ড' : 'Official Central Bulletins'}</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                {language === 'bn' ? 'সংবাদ, নোটিশ ও সার্কুলার বোর্ড' : 'Official Announcements & News'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'ডিডব্লিউএফ কেন্দ্রীয় নির্বাহী পরিষদের অফিসিয়াল সিদ্ধান্ত, ট্রাফিক আইন সার্কুলার এবং জরুরি সহায়তার সরকারি বিজ্ঞপ্তি।'
                  : 'Official gazette publications, executive council circulars, highway safety advisories, and administrative releases.'}
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'নোটিশ খুঁজুন...' : 'Search circulars...'}
                className="w-full pl-9 pr-3 py-2.5 bg-emerald-950/90 border border-emerald-700/80 rounded-xl text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Category Tabs Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'bn' ? c.labelBn : c.labelEn}
            </button>
          ))}
        </div>

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-red-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] border ${
                    notice.isUrgent
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {notice.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px] font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                {notice.isUrgent && (
                  <div className="inline-flex items-center gap-1.5 text-red-700 bg-red-50 border border-red-200/80 px-2 py-0.5 rounded-md text-[11px] font-bold">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>{language === 'bn' ? 'জরুরি বিজ্ঞপ্তি' : 'Urgent Notice'}</span>
                  </div>
                )}

                <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug hover:text-red-700 transition">
                  {language === 'bn' ? notice.titleBn : notice.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {language === 'bn' ? notice.excerptBn : notice.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedNotice(notice)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'bn' ? 'সম্পূর্ণ বিজ্ঞপ্তি পড়ুন' : 'Read Circular'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-slate-400 font-mono">DWF-OFFICIAL</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Notice Details Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-800 font-bold text-xs px-2.5 py-0.5 rounded-full">
                    {selectedNotice.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{selectedNotice.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 pt-1">
                  {language === 'bn' ? selectedNotice.titleBn : selectedNotice.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="font-semibold text-slate-900">
                {language === 'bn' ? selectedNotice.excerptBn : selectedNotice.excerpt}
              </p>
              <p className="whitespace-pre-line leading-relaxed">
                {language === 'bn' ? selectedNotice.contentBn : selectedNotice.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => alert(language === 'bn' ? 'অফিসিয়াল পিডিএফ বিজ্ঞপ্তি ডাউনলোড হচ্ছে...' : 'Downloading PDF circular...')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>পিডিএফ ডাউনলোড</span>
              </button>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
