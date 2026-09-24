import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  ArrowLeft, 
  ZoomIn, 
  Calendar, 
  X, 
  Download, 
  Camera, 
  Share2,
  Filter
} from 'lucide-react';

interface GalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  date: string;
  category: string;
  categoryBn: string;
  image: string;
  locationBn?: string;
  descriptionBn?: string;
}

export const GalleryPage: React.FC = () => {
  const { language, setActiveView } = useDwf();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      titleBn: 'কেন্দ্রীয় শহীদ মিনারে সড়ক নিরাপত্তা দিবস র‍্যালি ও সংহতি সমাবেশ',
      titleEn: 'National Road Safety Day Rally & Assembly at Central Shaheed Minar',
      date: '২০২৬-০৮-১৫',
      category: 'Rally',
      categoryBn: 'র‌্যালি ও সমাবেশ',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
      locationBn: 'কেন্দ্রীয় শহীদ মিনার, ঢাকা',
      descriptionBn: 'জাতীয় সড়ক নিরাপত্তা দিবস উপলক্ষে ৫ হাজারেরও বেশি চালকের অংশগ্রহণে বিশাল র‍্যালি ও নিরাপদ সড়কের শপথ গ্রহণ অনুষ্ঠান।'
    },
    {
      id: 'g-2',
      titleBn: 'সায়েদাবাদ বাস টার্মিনালে চালকদের জন্য বিনামূল্যে চক্ষু ও ডায়াবেটিস ক্যাম্প',
      titleEn: 'Free Eye & Diabetes Medical Camp for Long-haul Bus Operators at Sayedabad',
      date: '২০২৬-০৭-২০',
      category: 'Medical',
      categoryBn: 'চিকিৎসা ক্যাম্প',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      locationBn: 'সায়েদাবাদ আন্তঃজেলা বাস টার্মিনাল',
      descriptionBn: '৮৫০ জন দূরপাল্লার বাস ও ট্রাক চালকের দৃষ্টিশক্তি পরীক্ষা, বিনামূল্যে পাওয়ার চশমা বিতরণ ও কার্ডিও স্ক্রিনিং।'
    },
    {
      id: 'g-3',
      titleBn: 'বিআরটিএ অডিটোরিয়ামে আধুনিক হাইওয়ে ডিফেন্সিভ ড্রাইভিং সিমুলেটর প্রশিক্ষণ',
      titleEn: 'Modern Defensive Highway Simulator Workshop at BRTA Auditorium',
      date: '২০২৬-০৬-১০',
      category: 'Training',
      categoryBn: 'প্রশিক্ষণ কর্মশালা',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop&q=80',
      locationBn: 'বিআরটিএ ট্রেনিং ইনস্টিটিউট',
      descriptionBn: 'উন্নত সিমুলেটরের সাহায্যে বৃষ্টি ও রাতে পাহাড়ি সড়কে নিরাপদ যান চালনার বিশেষ সার্টিফিকেট কোর্স।'
    },
    {
      id: 'g-4',
      titleBn: 'দুর্ঘটনায় নিহত সদস্য চালকের পরিবারকে ২ লক্ষ টাকার এককালীন চেক হস্তান্তর',
      titleEn: 'Handing Over 200,000 BDT Lump-Sum Welfare Aid to Bereaved Driver Family',
      date: '২০২৬-০৫-৩০',
      category: 'Welfare',
      categoryBn: 'কল্যাণ অনুদান',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&auto=format&fit=crop&q=80',
      locationBn: 'ডিডব্লিউএফ কেন্দ্রীয় কার্যালয়, ঢাকা',
      descriptionBn: 'নিহত সদস্যের মনোনীত স্ত্রীর হাতে ২ লক্ষ টাকার সঞ্চয়ী চেক এবং সন্তানদের পড়ালেখার সার্বিক দায়িত্ব গ্রহণ।'
    },
    {
      id: 'g-5',
      titleBn: 'চট্টগ্রাম আন্তঃজেলা পরিবহন শ্রমিকদের সাথে কেন্দ্রীয় কমিটির মতবিনিময় সভা',
      titleEn: 'Central Executive Council Exchange with Chittagong Transport Hub Leaders',
      date: '২০২৬-০৪-২২',
      category: 'Meeting',
      categoryBn: 'সাংগঠনিক সভা',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
      locationBn: 'কদমতলী বাস টার্মিনাল, চট্টগ্রাম',
      descriptionBn: 'বন্দরনগরী চট্টগ্রামের পরিবহন চালকদের স্বাস্থ্য কার্ড বিতরণ ও নতুন ব্রাঞ্চ কার্যালয় উদ্বোধন।'
    },
    {
      id: 'g-6',
      titleBn: 'পেশাদার চালকদের জন্য জরুরি প্রাথমিক চিকিৎসা ও সিপিআর লাইভ ডেমোনেস্ট্রেশন',
      titleEn: 'Emergency Highway First-Aid & Resuscitation Hands-on Session',
      date: '২০২৬-০৩-১০',
      category: 'First Aid',
      categoryBn: 'প্রাথমিক চিকিৎসা',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80',
      locationBn: 'গাবতলী টার্মিনাল প্রশিক্ষণ কেন্দ্র',
      descriptionBn: 'রেড ক্রিসেন্ট সোসাইটির ট্রেইনারদের সহায়তায় সড়ক দুর্ঘটনায় তাৎক্ষণিক রক্তপাত বন্ধের বাস্তবিক মহড়া।'
    },
    {
      id: 'g-7',
      titleBn: 'রাজশাহী টার্মিনালে চালক সমাবেশ ও ডিজিটাল ডাটাবেস রেজিস্ট্রেশন বুথ',
      titleEn: 'Rajshahi Terminal Member Onboarding & Digital Verification Booth',
      date: '২০২৬-০২-১৫',
      category: 'Rally',
      categoryBn: 'র‌্যালি ও সমাবেশ',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
      locationBn: 'নওদাপাড়া টার্মিনাল, রাজশাহী',
      descriptionBn: 'উত্তরাঞ্চলের চালকদের ডিজিটাল স্বাস্থ্য কার্ড স্ক্যানিং এবং কেন্দ্রীয় সার্ভারে তাৎক্ষণিক মেম্বারশিপ অন্তর্ভুক্তিকরণ।'
    },
    {
      id: 'g-8',
      titleBn: 'পবিত্র ওমরাহ লটারিতে নির্বাচিত সৎ চালকদের পাসপোর্ট ও ভিসা হস্তান্তর',
      titleEn: 'Sponsored Pilgrimage Passport Handover Ceremony for Exemplary Drivers',
      date: '২০২৬-০১-০৫',
      category: 'Welfare',
      categoryBn: 'কল্যাণ অনুদান',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1200&auto=format&fit=crop&q=80',
      locationBn: 'ডিপ্লোমা ইঞ্জিনিয়ার্স অডিটোরিয়াম, ঢাকা',
      descriptionBn: 'ফাউন্ডেশনের সম্পূর্ণ অর্থায়নে মক্কা ও মদিনা শরীফে ওমরাহ পালনে নির্বাচিত ৪ জন সিনিয়র চালককে শুভেচ্ছা।'
    }
  ];

  const categories = [
    { id: 'all', labelBn: 'সকল ছবি' },
    { id: 'Rally', labelBn: 'র‌্যালি ও সমাবেশ' },
    { id: 'Medical', labelBn: 'চিকিৎসা ক্যাম্প' },
    { id: 'Training', labelBn: 'প্রশিক্ষণ কর্মশালা' },
    { id: 'Welfare', labelBn: 'কল্যাণ তহবিল চেক' }
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

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
            <span className="text-white font-semibold">{language === 'bn' ? 'ডিডব্লিউএফ ফটো গ্যালারি ও স্থিরচিত্র' : 'Visual Photo Archive'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                <Camera className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'মাঠপর্যায়ের কার্যক্রম ও মুহূর্ত' : 'Documented Field Archive'}</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                {language === 'bn' ? 'ডিডব্লিউএফ ফটো গ্যালারি ও আর্কাইভ' : 'Official Photo Archive & Moments'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'সারা বাংলাদেশে চালকদের সামাজিক কল্যাণ, মেডিকেল ক্যাম্প, ফ্রি আইনি লড়াই ও অধিকার আদায়ের ঐতিহাসিক মুহূর্তের স্থিরচিত্র সংগ্রহশালা।'
                  : 'Documenting nationwide grassroots initiatives for highway safety, medical screening, welfare grant handovers, and assemblies.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Category Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.labelBn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-300 border border-slate-200 bg-slate-900"
            >
              <img
                src={item.image}
                alt={item.titleBn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
              
              {/* Category & Zoom */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="bg-[#034732] text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/40 shadow-sm">
                  {item.categoryBn}
                </span>
                <span className="p-2 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-all shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                  {item.locationBn && (
                    <>
                      <span>•</span>
                      <span>{item.locationBn}</span>
                    </>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold leading-snug line-clamp-2">
                  {item.titleBn}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeImage.image}
                alt={activeImage.titleBn}
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            <div className="p-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="bg-[#034732] px-2 py-0.5 rounded border border-emerald-600 font-bold">{activeImage.categoryBn}</span>
                <span>{activeImage.date}</span>
                {activeImage.locationBn && <span>• {activeImage.locationBn}</span>}
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{activeImage.titleBn}</h3>
              {activeImage.descriptionBn && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeImage.descriptionBn}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
