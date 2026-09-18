import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  X, 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  QrCode, 
  HeartPulse, 
  Calendar, 
  Building2 
} from 'lucide-react';

export const PublicVerificationModal: React.FC = () => {
  const { 
    language, 
    t, 
    showVerifyModal, 
    setShowVerifyModal, 
    verifyMember 
  } = useDwf();

  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!showVerifyModal) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = verifyMember(query.trim());
    setResult(res);
    setSearched(true);
  };

  const handleSampleSearch = (sampleId: string) => {
    setQuery(sampleId);
    const res = verifyMember(sampleId);
    setResult(res);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.verifyTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {t.verifySubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => { setShowVerifyModal(false); setSearched(false); setResult(null); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleVerify} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.verifyPlaceholder}
              className="w-full pl-11 pr-24 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition cursor-pointer"
            >
              {t.verifyButton}
            </button>
          </div>

          {/* Quick Demo Search Chips */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
            <span>{language === 'bn' ? 'নমুনা যাচাই করুন:' : 'Sample query:'}</span>
            <button
              type="button"
              onClick={() => handleSampleSearch('DWF-000142')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded font-mono text-[11px] border border-slate-200 cursor-pointer"
            >
              DWF-000142
            </button>
            <button
              type="button"
              onClick={() => handleSampleSearch('DWF-000143')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded font-mono text-[11px] border border-slate-200 cursor-pointer"
            >
              DWF-000143
            </button>
            <button
              type="button"
              onClick={() => handleSampleSearch('HC-DWF-78401')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded font-mono text-[11px] border border-slate-200 cursor-pointer"
            >
              HC-DWF-78401
            </button>
          </div>
        </form>

        {/* Verification Result */}
        {searched && (
          <div>
            {result && result.found ? (
              <div className="rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/50 p-6 space-y-4">
                {/* Status Verified Banner */}
                <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h4 className="font-bold text-base text-emerald-950">
                        {t.verifyValidBadge}
                      </h4>
                      <p className="text-[11px] text-emerald-700">
                        {language === 'bn' ? 'ডিডব্লিউএফ সেন্ট্রাল ডাটাবেসে নিবন্ধিত ও বৈধ' : 'Officially Registered & Active in Core Ledger'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-emerald-700 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-full">
                    {result.status}
                  </span>
                </div>

                {/* Verified Details (Strictly sanitized public information, NO NID / NO address / NO finance) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-slate-500">{language === 'bn' ? 'সদস্যের নাম:' : 'Member Name:'}</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{result.name}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-slate-500">{language === 'bn' ? 'সদস্য আইডি:' : 'Member ID:'}</span>
                    <p className="font-mono font-bold text-emerald-800 text-sm mt-0.5">{result.memberId}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-slate-500">{language === 'bn' ? 'স্বাস্থ্য কার্ড নং:' : 'Health Card No:'}</span>
                    <p className="font-mono font-bold text-slate-900 mt-0.5">{result.healthCardNo}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-slate-500">{language === 'bn' ? 'রক্তের গ্রুপ:' : 'Blood Group:'}</span>
                    <p className="font-bold text-rose-600 mt-0.5">{result.bloodGroup}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-slate-500">{language === 'bn' ? 'স্বাস্থ্য কার্ডের মেয়াদ:' : 'Card Expiry:'}</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{result.healthCardExpiry}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-slate-500">{language === 'bn' ? 'অনুমোদিত শাখা:' : 'Branch:'}</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{result.branchName}</p>
                  </div>
                </div>

                {/* Privacy Badge */}
                <p className="text-[10px] text-slate-500 text-center pt-2">
                  {language === 'bn'
                    ? '🔒 প্রাতিষ্ঠানিক তথ্য সুরক্ষা নীতি অনুযায়ী সদস্যদের ব্যক্তিগত ঠিকানা ও ব্যাংকিং তথ্য সর্বজনীন করা হয় না।'
                    : '🔒 Personal NID, addresses, and financial records remain confidential under DWF Privacy Shield.'}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-red-200 bg-red-50/70 p-6 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
                <h4 className="text-sm font-bold text-red-900">
                  {t.verifyInvalid}
                </h4>
                <p className="text-xs text-red-700">
                  {language === 'bn'
                    ? 'প্রদত্ত আইডিটি পুনরায় নিরীক্ষা করুন অথবা প্রধান কার্যালয়ের হেল্পলাইন ১৬৭৮৯-এ যোগাযোগ করুন।'
                    : 'Please re-check your Member ID or contact Central Helpline 16789.'}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
