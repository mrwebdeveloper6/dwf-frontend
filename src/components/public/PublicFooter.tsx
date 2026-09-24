import React from 'react';
import { useDwf } from '../../context/DwfContext';
import { DwfLogo } from '../common/DwfLogo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  HeartHandshake, 
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { language, t, setActiveView, setShowApplyModal, setShowVerifyModal } = useDwf();

  const handleNav = (id: string) => {
    setActiveView(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#034732] text-emerald-100 border-t border-[#023525]">
      {/* Decorative Top Accent Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-[#EF2917] to-emerald-400" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/60">
          
          {/* Column 1: Organization Identity & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <DwfLogo size="lg" variant="light" />
            
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal pt-2">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded">
                Govt Reg: DWF-BD/2026/8940
              </span>
              <span className="bg-emerald-900/60 text-white text-[11px] px-2.5 py-1 rounded border border-emerald-700/60 font-medium">
                আইনসম্মত অলাভজনক
              </span>
            </div>

            {/* Emergency Hotline Box */}
            <div className="p-3.5 bg-gradient-to-r from-red-600 to-[#EF2917] text-white border border-red-500/50 rounded-xl shadow-md flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-white shrink-0 animate-pulse" />
              <div>
                <p className="text-[11px] font-bold text-red-100">২৪/৭ জরুরি দুর্ঘটনা হেল্পলাইন</p>
                <p className="text-base font-black text-white font-mono tracking-wide">১৬৭৮৯ / ০১৭১১-০০০০০০</p>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#EF2917] pl-2">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80 pt-1">
              <li>
                <button onClick={() => handleNav('store')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5 font-bold text-red-300">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{language === 'bn' ? 'ডিজিটাল স্টোর ও ই-বুক' : 'Digital Media Store'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{t.navHome}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{t.navBenefits}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{t.navRules}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculator')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{t.navCalculator}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('news')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{t.navNews}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{t.navGallery}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Member Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#EF2917] pl-2">
              {t.footerServices}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80 pt-1">
              <li>
                <button onClick={() => setShowApplyModal(true)} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{t.btnApply}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setShowVerifyModal(true)} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{t.btnVerify}</span>
                </button>
              </li>
              <li>
                <span className="text-emerald-100/80 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>ডিজিটাল স্বাস্থ্য কার্ড আবেদন</span>
                </span>
              </li>
              <li>
                <span className="text-emerald-100/80 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>দুর্ঘটনা ক্ষতিপূরণ দাবি দাখিল</span>
                </span>
              </li>
              <li>
                <span className="text-emerald-100/80 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>বিআরটিএ লাইসেন্স নবায়ন পরামর্শ</span>
                </span>
              </li>
              <li>
                <span className="text-emerald-100/80 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>প্যানেল আইনজীবী লিগ্যাল এইড</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#EF2917] pl-2">
              {t.footerEmergency}
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/85 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>লেভেল ৪, পরিবহন ভবন, বিজয়নগর, ঢাকা-১০০০</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <span className="font-mono text-white font-semibold">+৮৮০ ২-৯৫৭৮৯০১</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span className="font-mono text-white">support@dwf-bd.org</span>
              </div>
              <div className="pt-2 text-[11px] text-emerald-200/80">
                <p>শাখা অফিস: ঢাকা, চট্টগ্রাম, রাজশাহী, বগুড়া, সিলেট ও খুলনা টার্মিনাল।</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Pure Red Section (#EF2917) */}
      <div className="bg-[#EF2917] text-white py-4 sm:py-5 border-t border-red-700/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-center sm:text-left text-white/95 font-medium">
            {t.footerCopyright}
          </p>
          <div className="flex items-center gap-5 text-[11px] text-white/95 font-semibold">
            <a href="#rules" className="hover:text-white hover:underline transition">গোপনীয়তা নীতিমালা (Privacy)</a>
            <a href="#rules" className="hover:text-white hover:underline transition">ব্যবহারের শর্তাবলী (Terms)</a>
            <a href="#contact" className="hover:text-white hover:underline transition">অভিযোগ সেল</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
