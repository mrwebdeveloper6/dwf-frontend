import React, { useState, useMemo } from 'react';
import { useDwf } from '../../context/DwfContext';
import { initialDigitalProducts, DigitalProduct, ProductCategory } from '../../data/storeData';
import { 
  ShoppingBag, 
  BookOpen, 
  Image as ImageIcon, 
  Download, 
  Sparkles, 
  Star, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  X, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  Filter,
  Eye,
  Lock,
  Layers,
  HelpCircle
} from 'lucide-react';

export const StorePage: React.FC = () => {
  const { language, setActiveView, user } = useDwf();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<DigitalProduct | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const categories = [
    { id: 'all', labelBn: 'সকল প্রোডাক্ট', labelEn: 'All Products', count: initialDigitalProducts.length },
    { id: 'book', labelBn: 'ডিজিটাল ই-বুক', labelEn: 'E-Books', count: initialDigitalProducts.filter(p => p.category === 'book').length },
    { id: 'photo', labelBn: '৪কে ফটো অ্যালবাম', labelEn: '4K Photos', count: initialDigitalProducts.filter(p => p.category === 'photo').length },
    { id: 'manual', labelBn: 'আইন ও চিকিৎসা গাইড', labelEn: 'Manuals & Guides', count: initialDigitalProducts.filter(p => p.category === 'manual').length },
    { id: 'poster', labelBn: 'প্রিন্টাবল পোস্টার ও আর্ট', labelEn: 'Printable Posters', count: initialDigitalProducts.filter(p => p.category === 'poster').length }
  ];

  const filteredProducts = useMemo(() => {
    return initialDigitalProducts.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesQuery = 
        product.titleBn.toLowerCase().includes(q) ||
        product.titleEn.toLowerCase().includes(q) ||
        product.descriptionBn.toLowerCase().includes(q) ||
        product.descriptionEn.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setPurchaseSuccess(true);
  };

  const resetModals = () => {
    setSelectedProduct(null);
    setCheckoutProduct(null);
    setPurchaseSuccess(false);
    setBuyerPhone('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-gradient-to-r from-[#034732] via-[#034732] to-[#02291d] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Breadcrumb back button */}
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
            <span className="text-white font-semibold">{language === 'bn' ? 'ডিজিটাল স্টোর ও পাবলিকেশন' : 'Digital Media Store'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold border border-red-400/40">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ডিডব্লিউএফ প্রাতিষ্ঠানিক ডিজিটাল প্রকাশনা' : 'DWF Official Digital Store'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                {language === 'bn' ? 'ডিজিটাল ই-বুক ও ফটো স্টোর' : 'Digital E-Books & Photo Packs'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'সড়ক পরিবহন আইন ২০২৬, দুর্ঘটনা প্রতিরোধে ডিফেন্সিভ ড্রাইভিং, চিকিৎসা গাইড ও কেন্দ্রীয় সমাবেশের হাই-রেজ্যুলুশন আর্ট প্যাকেজ তাৎক্ষণিক ডাউনলোড করুন।'
                  : 'Instant digital delivery of legal handbooks, BRTA traffic law manuals, first-aid directives, and historic 4K photo collections.'}
              </p>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex items-center gap-2 flex-wrap text-[11px] text-emerald-200">
              <span className="bg-emerald-950/80 px-2.5 py-1.5 rounded-lg border border-emerald-700/60 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'bn' ? 'অফিসিয়াল ও অথেনটিক' : '100% Verified'}</span>
              </span>
              <span className="bg-emerald-950/80 px-2.5 py-1.5 rounded-lg border border-emerald-700/60 flex items-center gap-1.5 font-bold">
                <Download className="w-3.5 h-3.5 text-red-400" />
                <span>{language === 'bn' ? 'তাৎক্ষণিক ডাউনলোড' : 'Instant Download'}</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{language === 'bn' ? cat.labelBn : cat.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.id ? 'bg-red-800 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'বই বা ফটোপ্যাক খুঁজুন...' : 'Search title, category...'}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-sm font-medium">
              {language === 'bn' ? 'কোনো ডিজিটাল প্রোডাক্ট পাওয়া যায়নি।' : 'No digital products found matching your search.'}
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-red-600 font-bold underline cursor-pointer"
            >
              {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isFree = product.isFreeForMembers && user?.role === 'MEMBER';

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-red-300"
                >
                  <div>
                    {/* Thumbnail / Cover */}
                    <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-900">
                      <img
                        src={product.coverImage}
                        alt={product.titleBn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="bg-[#034732] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                          {product.category === 'book' || product.category === 'manual' ? (
                            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
                          ) : (
                            <ImageIcon className="w-3.5 h-3.5 text-red-300" />
                          )}
                          <span>{language === 'bn' ? product.categoryBn : product.categoryEn}</span>
                        </span>

                        {product.isPopular && (
                          <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>{language === 'bn' ? 'বেস্টসেলার' : 'Popular'}</span>
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Bottom Stats on Cover */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                        <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-mono text-emerald-300 font-bold">
                          {product.pagesOrCount}
                        </span>
                        <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded flex items-center gap-1 text-amber-300 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-[9px] text-slate-300 font-normal">({product.reviewsCount})</span>
                        </span>
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="p-5 space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-700 transition leading-snug line-clamp-2">
                        {language === 'bn' ? product.titleBn : product.titleEn}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {language === 'bn' ? product.authorBn : product.authorEn}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {language === 'bn' ? product.descriptionBn : product.descriptionEn}
                      </p>

                      {/* Features bullets */}
                      <div className="pt-2 space-y-1">
                        {product.featuresBn.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Member Free Benefit Tag */}
                      {product.isFreeForMembers && (
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{language === 'bn' ? 'নিবন্ধিত সদস্যদের জন্য সম্পূর্ণ ফ্রি' : '100% Free for Verified Members'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Pricing & Action Buttons */}
                  <div className="p-5 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        {isFree ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl font-black text-emerald-700 font-mono">০৳</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">সদস্য সুবিধা</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-slate-900 font-mono">৳ {product.price}</span>
                            <span className="text-xs text-slate-400 line-through font-mono">৳ {product.regularPrice}</span>
                          </div>
                        )}
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {product.fileFormat} • {product.fileSize}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          title={language === 'bn' ? 'নমুনা ও বিস্তারিত দেখুন' : 'Quick Preview'}
                          className="p-2.5 rounded-xl text-slate-700 hover:text-red-700 bg-slate-100 hover:bg-red-50 border border-slate-200 cursor-pointer transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setCheckoutProduct(product)}
                          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md shadow-red-600/20 active:scale-95 flex items-center gap-1.5"
                        >
                          <Download className="w-4 h-4" />
                          <span>{isFree ? (language === 'bn' ? 'ফ্রি ডাউনলোড' : 'Download') : (language === 'bn' ? 'কিনুন' : 'Buy Now')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Future Digital Roadmap & FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          <div className="lg:col-span-2 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-600" />
              <span>{language === 'bn' ? 'ভবিষ্যৎ ডিজিটাল কন্টেন্ট পাইপলাইন' : 'Upcoming Digital Products Pipeline'}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'ডিডব্লিউএফ ডিজিটাল স্টোরকে একটি পূর্ণাঙ্গ লার্নিং অ্যান্ড রিসোর্স হাব হিসেবে রূপান্তর করা হচ্ছে। ভবিষ্যতে যেসব ডিজিটাল সেবা যুক্ত হতে যাচ্ছে:'
                : 'The DWF Digital Store is evolving into a comprehensive multimedia education hub. Future items under development:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1">🎧 অডিওবুক ও হাইওয়ে পডকাস্ট</p>
                <p className="text-[11px] text-slate-500">চালনারত অবস্থায় ট্রাফিক আইন ও সতর্কতা শোনার অডিও ফাইল।</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1">🎬 ভিডিও ড্রাইভিং মাস্টারক্লাস</p>
                <p className="text-[11px] text-slate-500">বৃষ্টি ও কুয়াশায় নিরাপদ পাহাড়ি ও হাইওয়ে ড্রাইভিং ভিডিও কোর্স।</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1">📜 ভেরিফায়েড ডিজিটাল সার্টিফিকেট</p>
                <p className="text-[11px] text-slate-500">অনলাইন টেস্ট সম্পন্নকারী চালকদের জন্য কিউআর কোডযুক্ত সনদপত্র।</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1">🖼️ টার্মিনাল ব্যানার প্রিন্ট প্যাক</p>
                <p className="text-[11px] text-slate-500">ট্রান্সপোর্ট কোম্পানি ও ইউনিয়নের জন্য কাস্টমাইজেবল ডিজাইন।</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-[#034732] text-white rounded-3xl border border-emerald-800 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">
                সদস্যদের বিশেষ সুবিধা
              </span>
              <h4 className="text-lg font-bold text-white leading-snug">
                ডিডব্লিউএফ সদস্য হয়ে সকল বই বিনামূল্যে পান
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                ফাউন্ডেশনের সক্রিয় নিবন্ধিত সদস্যদের জন্য সকল ট্রাফিক গাইড, আইনি পরামর্শ ই-বুক ও ফার্স্ট এইড ম্যানুয়াল ১০০% বিনামূল্যে উন্মুক্ত।
              </p>
            </div>
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2.5 bg-[#EF2917] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              সদস্যপদ সুবিধা জানুন
            </button>
          </div>
        </div>

      </div>

      {/* Product Details & Preview Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                  {selectedProduct.categoryBn}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
                  {language === 'bn' ? selectedProduct.titleBn : selectedProduct.titleEn}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {language === 'bn' ? selectedProduct.authorBn : selectedProduct.authorEn} • {selectedProduct.publishedYear}
                </p>
              </div>
              <button
                onClick={resetModals}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 h-48">
                <img
                  src={selectedProduct.coverImage}
                  alt={selectedProduct.titleBn}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-2 space-y-2 text-xs text-slate-600">
                <p className="leading-relaxed text-slate-700">
                  {language === 'bn' ? selectedProduct.descriptionBn : selectedProduct.descriptionEn}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-700 font-mono">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">ফরম্যাট:</span>
                    <span className="font-bold">{selectedProduct.fileFormat}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">ফাইল সাইজ:</span>
                    <span className="font-bold">{selectedProduct.fileSize}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-1.5 pt-2">
              <p className="text-xs font-bold text-slate-900">{language === 'bn' ? 'প্রধান বৈশিষ্ট্যসমূহ:' : 'Key Features:'}</p>
              {selectedProduct.featuresBn.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Sample Excerpt */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold text-[11px] text-amber-800 uppercase tracking-wide flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'নমুনা বিষয়বস্তু (Sample Preview):' : 'Sample Excerpt:'}</span>
              </span>
              <p className="italic leading-relaxed font-serif pt-1">
                "{language === 'bn' ? selectedProduct.sampleExcerptBn : selectedProduct.sampleExcerptEn}"
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span className="text-xl font-black text-slate-900 font-mono">৳ {selectedProduct.price}</span>
                <span className="text-xs text-slate-400 line-through font-mono ml-2">৳ {selectedProduct.regularPrice}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetModals}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    const prod = selectedProduct;
                    setSelectedProduct(null);
                    setCheckoutProduct(prod);
                  }}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-red-600/20 active:scale-95 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কপি সংগ্রহ করুন' : 'Get Digital Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout / Download Simulator Modal */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {language === 'bn' ? 'ডিজিটাল চেকআউট' : 'Digital Checkout'}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">
                  {language === 'bn' ? checkoutProduct.titleBn : checkoutProduct.titleEn}
                </h3>
              </div>
              <button
                onClick={resetModals}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {purchaseSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {language === 'bn' ? 'অর্ডার সফল হয়েছে!' : 'Order Successful!'}
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  {language === 'bn'
                    ? 'আপনার ডিজিটাল ফাইলের ডাউনলোড লিংক তৈরি হয়েছে। নিচের বাটনে ক্লিক করে ফাইলটি সংরক্ষণ করুন।'
                    : 'Your high-speed digital download link has been generated.'}
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      alert(language === 'bn' ? 'ফাইল ডাউনলোড শুরু হয়েছে (নমুনা ডিজিটাল ফাইল)!' : 'Downloading file (sample archive)...');
                      resetModals();
                    }}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{language === 'bn' ? 'ফাইল ডাউনলোড করুন (' + checkoutProduct.fileSize + ')' : 'Download (' + checkoutProduct.fileSize + ')'}</span>
                  </button>
                  <button
                    onClick={resetModals}
                    className="text-xs text-slate-500 hover:text-slate-700 underline"
                  >
                    {language === 'bn' ? 'ফিরে যান' : 'Back to Store'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePurchase} className="space-y-4 text-xs">
                {/* Product Summary */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={checkoutProduct.coverImage}
                      alt={checkoutProduct.titleBn}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{language === 'bn' ? checkoutProduct.titleBn : checkoutProduct.titleEn}</p>
                      <p className="text-[10px] text-slate-500">{checkoutProduct.fileFormat} • {checkoutProduct.fileSize}</p>
                    </div>
                  </div>
                  <span className="font-mono font-black text-slate-900 text-sm">৳ {checkoutProduct.price}</span>
                </div>

                {/* Member Check */}
                {checkoutProduct.isFreeForMembers && user?.role === 'MEMBER' ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{language === 'bn' ? 'আপনি নিবন্ধিত সদস্য: সম্পূর্ণ ফ্রি!' : 'Verified Member: Free Access!'}</span>
                    </p>
                    <p className="text-[11px] text-emerald-700">সদস্য আইডি: {user.memberId}</p>
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      {language === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন:' : 'Select Payment Method:'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer font-bold ${
                          paymentMethod === 'bkash'
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        bKash
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('nagad')}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer font-bold ${
                          paymentMethod === 'nagad'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        Nagad
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('rocket')}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer font-bold ${
                          paymentMethod === 'rocket'
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        Rocket
                      </button>
                    </div>

                    <div className="mt-3">
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'মোবাইল ব্যাংকিং নম্বর *' : 'Mobile Banking Account *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="০১XXXXXXXXX"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {checkoutProduct.isFreeForMembers && user?.role === 'MEMBER'
                      ? (language === 'bn' ? 'বিনামূল্যে সংগ্রহ করুন' : 'Claim Free Download')
                      : (language === 'bn' ? '৳ ' + checkoutProduct.price + ' পরিশোধ ও ডাউনলোড' : 'Pay ৳ ' + checkoutProduct.price + ' & Download')}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
