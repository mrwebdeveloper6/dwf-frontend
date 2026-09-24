import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { NoticeItem } from '../../types/dwf';
import { 
  Calendar, 
  Tag, 
  ArrowRight, 
  AlertCircle, 
  X,
  FileText 
} from 'lucide-react';

export const NewsNoticesSection: React.FC = () => {
  const { language, notices, setActiveView } = useDwf();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const categories = [
    { id: 'ALL', labelBn: 'সকল আপডেট', labelEn: 'All Updates' },
    { id: 'NOTICE', labelBn: 'জরুরি নোটিশ', labelEn: 'Notices' },
    { id: 'MEDICAL', labelBn: 'স্বাস্থ্য ও চিকিৎসা', labelEn: 'Medical' },
    { id: 'TRAINING', labelBn: 'ড্রাইভিং প্রশিক্ষণ', labelEn: 'Training' },
    { id: 'WELFARE', labelBn: 'কল্যাণ তহবিল', labelEn: 'Welfare' }
  ];

  const filteredNotices = activeCategory === 'ALL'
    ? notices
    : notices.filter(n => n.category === activeCategory);

  return (
    <section id="news" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {language === 'bn' ? 'সংবাদ ও বিজ্ঞপ্তি' : 'Latest News & Circulars'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {language === 'bn' ? 'ডিডব্লিউএফ সাংগঠনিক নোটিশ বোর্ড' : 'Official Announcements & Bulletins'}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === c.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {language === 'bn' ? c.labelBn : c.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] border ${
                    notice.isUrgent
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {notice.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                {notice.isUrgent && (
                  <div className="mb-2 inline-flex items-center gap-1.5 text-red-700 bg-red-50 border border-red-200/80 px-2 py-0.5 rounded-md text-[11px] font-bold">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>{language === 'bn' ? 'জরুরি বিজ্ঞপ্তি' : 'Urgent Notice'}</span>
                  </div>
                )}

                <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                  {language === 'bn' ? notice.titleBn : notice.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {language === 'bn' ? notice.excerptBn : notice.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/80">
                <button
                  onClick={() => setSelectedNotice(notice)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'bn' ? 'সম্পূর্ণ বিজ্ঞপ্তি পড়ুন' : 'Read Full Circular'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Page Link CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              setActiveView('news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-red-600/20 active:scale-95 cursor-pointer"
          >
            <span>{language === 'bn' ? 'সকল প্রাতিষ্ঠানিক বিজ্ঞপ্তি ও সার্কুলার আর্কাইভ দেখুন' : 'View Full Notices & Circulars Archive Page'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Notice Details Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded">
                    {selectedNotice.category}
                  </span>
                  <span className="text-xs text-slate-500">{selectedNotice.date}</span>
                </div>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'bn' ? selectedNotice.titleBn : selectedNotice.title}
              </h3>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p className="font-semibold text-slate-800">
                  {language === 'bn' ? selectedNotice.excerptBn : selectedNotice.excerpt}
                </p>
                <p>
                  {language === 'bn' ? selectedNotice.contentBn : selectedNotice.content}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
