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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Organization Identity & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <DwfLogo size="lg" variant="light" />
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal pt-2">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded">
                Govt Reg: DWF-BD/2026/8940
              </span>
              <span className="bg-slate-900 text-slate-400 text-[11px] px-2.5 py-1 rounded border border-slate-800">
                আইনসম্মত অলাভজনক
              </span>
            </div>

            {/* Emergency Hotline Box */}
            <div className="p-3.5 bg-red-950/40 border border-red-900/60 rounded-xl flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />
              <div>
                <p className="text-[11px] font-bold text-red-300">২৪/৭ জরুরি দুর্ঘটনা হেল্পলাইন</p>
                <p className="text-base font-black text-white font-mono">১৬৭৮৯ / ০১৭১১-০০০০০০</p>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 pt-1">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.navHome}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.navBenefits}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.navRules}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculator')} className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.navCalculator}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('news')} className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.navNews}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.navGallery}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Member Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2">
              {t.footerServices}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 pt-1">
              <li>
                <button onClick={() => setShowApplyModal(true)} className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.btnApply}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setShowVerifyModal(true)} className="hover:text-emerald-400 transition cursor-pointer flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.btnVerify}</span>
                </button>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>ডিজিটাল স্বাস্থ্য কার্ড আবেদন</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>দুর্ঘটনা ক্ষতিপূরণ দাবি দাখিল</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>বিআরটিএ লাইসেন্স নবায়ন পরামর্শ</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                  <span>প্যানেল আইনজীবী লিগ্যাল এইড</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2">
              {t.footerEmergency}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>লেভেল ৪, পরিবহন ভবন, বিজয়নগর, ঢাকা-১০০০</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">+৮৮০ ২-৯৫৭৮৯০১</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">support@dwf-bd.org</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500">
                <p>শাখা অফিস: ঢাকা, চট্টগ্রাম, রাজশাহী, বগুড়া, সিলেট ও খুলনা টার্মিনাল।</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Terms, Privacy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            {t.footerCopyright}
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#rules" className="hover:text-slate-300 transition">গোপনীয়তা নীতিমালা (Privacy)</a>
            <a href="#rules" className="hover:text-slate-300 transition">ব্যবহারের শর্তাবলী (Terms)</a>
            <a href="#contact" className="hover:text-slate-300 transition">অভিযোগ সেল</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
