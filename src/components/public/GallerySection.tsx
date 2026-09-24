import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { X, ZoomIn, Calendar, Tag, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  date: string;
  category: string;
  categoryBn: string;
  image: string;
}

export const GallerySection: React.FC = () => {
  const { language, setActiveView } = useDwf();
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      titleBn: 'মহাসড়কে আধুনিক ডিফেন্সিভ ড্রাইভিং ও রোড-সেফটি প্রশিক্ষণ কর্মশালা',
      titleEn: 'Modern Defensive Driving & Highway Safety Workshop',
      date: '২০২৬-০৮-১২',
      category: 'Training',
      categoryBn: 'প্রশিক্ষণ',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'g-2',
      titleBn: 'গাবতলী টার্মিনালে চালকদের বিনামূল্যে চক্ষু ও স্বাস্থ্য পরীক্ষা ক্যাম্প',
      titleEn: 'Free Eye & Health Screening Camp at Gabtoli Terminal',
      date: '২০২৬-০৭-২৫',
      category: 'Health Camp',
      categoryBn: 'স্বাস্থ্য ক্যাম্প',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'g-3',
      titleBn: 'সদস্যদের মাঝে ডিজিটাল স্বাস্থ্য সুরক্ষা ও পরিচয়পত্র বিতরণ অনুষ্ঠান',
      titleEn: 'Digital Health & ID Card Distribution Ceremony',
      date: '২০২৬-০৬-১৮',
      category: 'Event',
      categoryBn: 'অনুষ্ঠান',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'g-4',
      titleBn: 'সড়ক দুর্ঘটনায় নিহত চালকের পরিবারকে এককালীন কল্যাণ অনুদান প্রদান',
      titleEn: 'Lump-Sum Welfare Grant Handover to Bereaved Driver Family',
      date: '২০২৬-০৫-৩০',
      category: 'Welfare',
      categoryBn: 'কল্যাণ তহবিল',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'g-5',
      titleBn: 'আন্তর্জাতিক সড়ক নিরাপত্তা দিবস উপলক্ষে রাজধানীতে চালক র‍্যালি ও সমাবেশ',
      titleEn: 'Road Safety Day Driver Rally & Demonstration in Capital',
      date: '২০২৬-০৪-২২',
      category: 'Rally',
      categoryBn: 'র‌্যালি',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'g-6',
      titleBn: 'পেশাদার চালকদের জন্য প্রাথমিক চিকিৎসা (First Aid) প্রশিক্ষণ ক্লাস',
      titleEn: 'Emergency First-Aid Certification Training for Commercial Operators',
      date: '২০২৬-০৩-১০',
      category: 'First Aid',
      categoryBn: 'প্রাথমিক চিকিৎসা',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-200">
            {language === 'bn' ? 'কার্যক্রম ও স্থিরচিত্র' : 'Field Activities & Moments'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {language === 'bn' ? 'ডিডব্লিউএফ ফটো গ্যালারি' : 'DWF Visual Archive'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {language === 'bn'
              ? 'সারা বাংলাদেশে চালকদের সার্বিক কল্যাণ, স্বাস্থ্যসেবা ও নিরাপত্তা সচেতনতায় আমাদের মাঠপর্যায়ের কার্যক্রম।'
              : 'Our nationwide grassroots initiatives for driver welfare, health protection, and highway awareness.'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <img
                src={item.image}
                alt={item.titleBn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Tag & Zoom Icon */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-xs">
                <span className="bg-emerald-700/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {language === 'bn' ? item.categoryBn : item.category}
                </span>
                <span className="p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-sm font-bold leading-snug line-clamp-2">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Page Link CTA */}
        <div className="text-center pt-10">
          <button
            onClick={() => {
              setActiveView('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-red-600/20 active:scale-95 cursor-pointer"
          >
            <span>{language === 'bn' ? 'সম্পূর্ণ ফটো গ্যালারি ও হাই-রেজ্যুলুশন অ্যালবাম দেখুন' : 'View Full Visual Archive & Gallery Page'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeImage.image}
                  alt={activeImage.titleBn}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-slate-800">
                <div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {language === 'bn' ? activeImage.categoryBn : activeImage.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold mt-1">
                    {language === 'bn' ? activeImage.titleBn : activeImage.titleEn}
                  </h3>
                </div>
                <div className="text-xs text-slate-400 font-mono shrink-0">
                  {activeImage.date}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
