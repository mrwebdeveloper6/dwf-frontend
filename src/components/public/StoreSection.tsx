import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { initialDigitalProducts, DigitalProduct } from '../../data/storeData';
import { 
  ShoppingBag, 
  BookOpen, 
  Image as ImageIcon, 
  Download, 
  Sparkles, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  FileText, 
  CreditCard, 
  ShieldCheck,
  Smartphone,
  Eye
} from 'lucide-react';

export const StoreSection: React.FC = () => {
  const { language, setActiveView, user, setShowApplyModal } = useDwf();
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<DigitalProduct | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'member'>('bkash');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Take the top 3-4 products for the home preview
  const previewProducts = initialDigitalProducts.slice(0, 3);

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
    <section id="store" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200">
              <ShoppingBag className="w-3.5 h-3.5 text-red-600" />
              <span>{language === 'bn' ? 'ডিজিটাল পাবলিকেশন ও ফটো স্টোর' : 'Digital Publications & Photo Store'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {language === 'bn' ? 'ডিডব্লিউএফ ডিজিটাল স্টোর' : 'DWF Digital Media Store'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              {language === 'bn'
                ? 'পেশাদার চালকদের জন্য তথ্যসমৃদ্ধ ই-বুক, আইন নির্দেশিকা, সচেতনতামূলক পোস্টার ও জাতীয় সম্মেলনের হাই-রেজ্যুলুশন ফটো প্যাকেজ।'
                : 'Educational e-books, legal survival handbooks, public awareness art, and 4K photo archives for drivers and transport enthusiasts.'}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveView('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-md shadow-red-600/20 cursor-pointer active:scale-95 shrink-0 self-start md:self-auto"
          >
            <span>{language === 'bn' ? 'সম্পূর্ণ স্টোর ঘুরে দেখুন' : 'Explore Full Store'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {previewProducts.map((product) => {
            const isFree = product.isFreeForMembers && user?.role === 'MEMBER';

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-red-300"
              >
                <div>
                  {/* Thumbnail / Cover */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
                    <img
                      src={product.coverImage}
                      alt={product.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
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
                    </div>

                    {/* Bottom Stats on Cover */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                      <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-mono text-emerald-300 font-bold">
                        {product.pagesOrCount}
                      </span>
                      <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded flex items-center gap-1 text-amber-300 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-700 transition leading-snug line-clamp-2">
                      {language === 'bn' ? product.titleBn : product.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {language === 'bn' ? product.authorBn : product.authorEn}
                    </p>
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {language === 'bn' ? product.descriptionBn : product.descriptionEn}
                    </p>

                    {/* Member Free Benefit Tag */}
                    {product.isFreeForMembers && (
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
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
                          <span className="text-base font-black text-emerald-700 font-mono">০৳</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">সদস্য সুবিধা</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-slate-900 font-mono">৳ {product.price}</span>
                          <span className="text-xs text-slate-400 line-through font-mono">৳ {product.regularPrice}</span>
                        </div>
                      )}
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {product.fileFormat}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        title={language === 'bn' ? 'নমুনা ও বিস্তারিত দেখুন' : 'Quick Preview'}
                        className="p-2 rounded-xl text-slate-700 hover:text-red-700 bg-slate-100 hover:bg-red-50 border border-slate-200 cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setCheckoutProduct(product)}
                        className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isFree ? (language === 'bn' ? 'ফ্রি ডাউনলোড' : 'Download') : (language === 'bn' ? 'কিনুন' : 'Buy')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner to Visit Dedicated Store Page */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#034732] via-[#034732] to-[#02291d] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/80 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-700/60">
              {language === 'bn' ? 'ডিজিটাল ই-লাইব্রেরি ও প্রকাশনা' : 'Digital E-Library & Archive'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {language === 'bn' ? 'সকল বই, ম্যানুয়াল ও ফটো অ্যালবাম পেতে ডেডিকেটেড স্টোরে যান' : 'Access All Digital Books, Manuals & Photo Packs'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
              {language === 'bn'
                ? 'সড়ক পরিবহন আইনি গ্যাজেট, পোস্টার, হাইওয়ে ফার্স্ট এইড ও চালক সম্মেলনের মূল অরিজিনাল ফাইলসমূহ এক ক্লিকে ডাউনলোড করুন।'
                : 'Browse by category, search specific traffic guides, and download verified digital editions instantly.'}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveView('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#EF2917] hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-lg shadow-red-950/60 shrink-0 flex items-center gap-2 active:scale-95 border border-red-400/40"
          >
            <span>{language === 'bn' ? 'স্টোর পেইজে যান' : 'Go to Store Page'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
              <div className="sm:col-span-1 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 h-44">
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

    </section>
  );
};
