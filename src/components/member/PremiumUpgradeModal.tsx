import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Crown, 
  ShieldCheck, 
  HeartPulse, 
  CreditCard, 
  TrendingUp, 
  Wallet, 
  Receipt, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Gift,
  HelpCircle
} from 'lucide-react';
import { Nominee, PaymentMethod } from '../../types/dwf';

export const PremiumUpgradeModal: React.FC = () => {
  const { 
    language, 
    showPremiumUpgradeModal, 
    setShowPremiumUpgradeModal, 
    currentMemberData, 
    upgradeToPremium,
    allowFreeSubscriptionUpgrade
  } = useDwf();

  const member = currentMemberData;

  // Subscription state (defaults to PAID if Free Option is disabled by Admin)
  const [subscriptionType, setSubscriptionType] = useState<'FREE' | 'PAID'>(() => 
    allowFreeSubscriptionUpgrade ? 'FREE' : 'PAID'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BKASH');
  const [transactionId, setTxnId] = useState('');

  // Keep subscriptionType in sync if admin disables free upgrade while modal is open
  React.useEffect(() => {
    if (!allowFreeSubscriptionUpgrade && subscriptionType === 'FREE') {
      setSubscriptionType('PAID');
    }
  }, [allowFreeSubscriptionUpgrade, subscriptionType]);

  // Nominee form state (Monini Form)
  const [nominees, setNominees] = useState<Nominee[]>([
    {
      id: `nom-${Date.now()}`,
      name: '',
      relationship: 'স্ত্রী (Wife)',
      nid: '',
      mobile: '',
      address: '',
      percentage: 100
    }
  ]);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showPremiumUpgradeModal || !member) return null;

  const handleNomineeChange = (index: number, field: keyof Nominee, value: any) => {
    setNominees(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addSecondNominee = () => {
    if (nominees.length >= 2) return;
    setNominees([
      { ...nominees[0], percentage: 50 },
      {
        id: `nom-${Date.now()}-2`,
        name: '',
        relationship: 'সন্তান (Child)',
        nid: '',
        mobile: '',
        address: '',
        percentage: 50
      }
    ]);
  };

  const removeSecondNominee = (index: number) => {
    setNominees([{ ...nominees[index === 0 ? 1 : 0], percentage: 100 }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Nominee validation
    for (let i = 0; i < nominees.length; i++) {
      const n = nominees[i];
      if (!n.name.trim()) {
        setErrorMsg(language === 'bn' ? `নমিনী #${i + 1}-এর নাম প্রদান করুন!` : `Please enter Nominee #${i + 1} name!`);
        return;
      }
      if (!n.nid.trim() || n.nid.trim().length < 10) {
        setErrorMsg(language === 'bn' ? `নমিনী #${i + 1}-এর সঠিক জাতীয় পরিচয়পত্র (NID) নম্বর দিন!` : `Please enter valid NID for Nominee #${i + 1}!`);
        return;
      }
      if (!n.mobile.trim() || n.mobile.trim().length < 11) {
        setErrorMsg(language === 'bn' ? `নমিনী #${i + 1}-এর সঠিক মোবাইল নম্বর দিন!` : `Please enter valid mobile for Nominee #${i + 1}!`);
        return;
      }
    }

    const totalPct = nominees.reduce((sum, n) => sum + (Number(n.percentage) || 0), 0);
    if (totalPct !== 100) {
      setErrorMsg(language === 'bn' ? `নমিনিদের শতকরা অনুপাত অবশ্যই ঠিক ১০০% হতে হবে! (বর্তমানে: ${totalPct}%)` : `Total percentage must equal exactly 100%!`);
      return;
    }

    if (subscriptionType === 'PAID' && !transactionId.trim()) {
      setErrorMsg(language === 'bn' ? 'অনুগ্রহ করে পেমেন্ট ট্রানজ্যাকশন আইডি (TrxID) প্রদান করুন!' : 'Please enter payment Transaction ID!');
      return;
    }

    if (subscriptionType === 'FREE' && !allowFreeSubscriptionUpgrade) {
      setErrorMsg(language === 'bn' ? 'ফ্রি সাবস্ক্রিপশন সুবিধাটি বর্তমানে বন্ধ রয়েছে! অনুগ্রহ করে নির্ধারিত ফি পরিশোধ করে ট্রানজেকশন আইডি দিন।' : 'Free subscription is currently closed.');
      return;
    }

    setIsSubmitting(true);

    const res = upgradeToPremium(member.memberId, {
      nominees,
      isFreeSubscription: subscriptionType === 'FREE',
      paymentMethod: subscriptionType === 'PAID' ? paymentMethod : undefined,
      transactionId: subscriptionType === 'PAID' ? transactionId.trim() : undefined
    });

    if (res.success) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setSuccessMsg(res.message);
      setTimeout(() => {
        setIsSubmitting(false);
        setShowPremiumUpgradeModal(false);
      }, 2500);
    } else {
      setIsSubmitting(false);
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl text-slate-100 my-auto max-h-[95vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3 sm:pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-2xl shadow-lg shadow-amber-600/30 shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {language === 'bn' ? 'প্রিমিয়াম সদস্যত্ব আপগ্রেড ও মনিনি ফরম' : 'Upgrade to Premium Membership'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {language === 'bn' ? 'আজীবন সুবিধা' : 'Lifetime Access'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' 
                  ? 'সাবস্ক্রিপশন নির্বাচন করুন এবং বাধ্যতামূলক নমিনী তথ্য পূরণ করে ৬টি বিশেষ সেবা আনলক করুন' 
                  : 'Complete subscription and nominee details to unlock all 6 core services'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPremiumUpgradeModal(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Core Unlocked Services Highlights */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-800/60 to-amber-950/40 border border-amber-500/30 rounded-2xl p-3 sm:p-4 my-3 sm:my-4">
          <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'প্রিমিয়াম সদস্যদের ৬টি বিশেষ সেবা:' : '6 Exclusive Premium Privileges:'}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-200">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>১. কল্যাণ প্রভাব চার্ট</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <CreditCard className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>২. ডিজিটাল স্মার্ট আইডি</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <HeartPulse className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>৩. স্বাস্থ্য কার্ড (আজীবন ফ্রি)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <Wallet className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>৪. চাঁদা ও তহবিল খতিয়ান</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <Receipt className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>৫. চিকিৎসা দাবি (৫০,০০০৳)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>৬. দুর্ঘটনা সহায়তা (১ লাখ৳)</span>
            </div>
          </div>
        </div>

        {/* Feedback banners */}
        {errorMsg && (
          <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2 mb-3">
            <X className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-xs">
          
          {/* STEP 1: Subscription Selection */}
          <div className="bg-slate-850 p-3.5 sm:p-4 rounded-2xl border border-slate-750 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>{language === 'bn' ? 'ধাপ ১: সাবস্ক্রিপশন প্ল্যান নির্বাচন করুন' : 'Step 1: Choose Subscription Plan'}</span>
              </span>
              {allowFreeSubscriptionUpgrade ? (
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-400/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{language === 'bn' ? 'ফ্রি সাবস্ক্রিপশন সুবিধা উপলব্ধ' : 'Free Option Available'}</span>
                </span>
              ) : (
                <span className="text-[10px] text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-rose-400/30">
                  <span>{language === 'bn' ? 'সাবস্ক্রিপশন ফি প্রযোজ্য' : 'Standard Fee Required'}</span>
                </span>
              )}
            </div>

            {/* Admin Policy Notice when Free Option is disabled */}
            {!allowFreeSubscriptionUpgrade && (
              <div className="p-3 bg-rose-950/60 border border-rose-700/60 rounded-xl text-rose-200 text-xs flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{language === 'bn' ? 'এডমিন নোটিশ: বিশেষ ফ্রি সাবস্ক্রিপশন অফার বর্তমানে বন্ধ রয়েছে।' : 'Notice: Free subscription is currently closed by administration.'}</p>
                  <p className="text-[11px] text-rose-300/90 mt-0.5">
                    {language === 'bn' 
                      ? 'প্রিমিয়াম সুবিধা ও আজীবন চিকিৎসা অনুদান সক্রিয় করতে নির্ধারিত কল্যাণ চাঁদা (৳৩০০) জমা দিয়ে ট্রানজেকশন আইডি দিন।' 
                      : 'To activate premium membership and health benefits, please pay the contribution fee (৳300) with TxnID.'}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Free Subscription Option */}
              {allowFreeSubscriptionUpgrade ? (
                <div 
                  onClick={() => setSubscriptionType('FREE')}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-2.5 ${
                    subscriptionType === 'FREE'
                      ? 'bg-amber-950/30 border-amber-500 text-white shadow-xs'
                      : 'bg-slate-900 border-slate-750 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="subType" 
                    checked={subscriptionType === 'FREE'} 
                    onChange={() => setSubscriptionType('FREE')}
                    className="mt-0.5 text-amber-500 focus:ring-amber-500" 
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-white text-xs">
                        {language === 'bn' ? 'ফ্রি সাবস্ক্রিপশন (স্পেশাল অফার)' : 'Free Subscription (Promo)'}
                      </p>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-1.5 py-0.2 rounded font-bold">৳০ ফি</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {language === 'bn' 
                        ? 'কোনো ফি ছাড়াই নমিনী ফর্ম পূরণ করে প্রিমিয়াম সুবিধা চালু করুন।' 
                        : 'Activate full privileges by completing nominee details free.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-500 opacity-60 flex items-start gap-2.5 cursor-not-allowed">
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-slate-400 text-xs line-through">
                        {language === 'bn' ? 'ফ্রি সাবস্ক্রিপশন (স্পেশাল অফার)' : 'Free Subscription'}
                      </p>
                      <span className="bg-slate-800 text-slate-400 text-[9px] px-1.5 py-0.2 rounded font-bold">বর্তমানে স্থগিত</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {language === 'bn' ? 'এডমিন বোর্ড কর্তৃক এই অফারটি সাময়িক বন্ধ আছে।' : 'Currently unavailable.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Paid Subscription Option */}
              <div 
                onClick={() => setSubscriptionType('PAID')}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-2.5 ${
                  subscriptionType === 'PAID'
                    ? 'bg-amber-950/30 border-amber-500 text-white shadow-xs'
                    : 'bg-slate-900 border-slate-750 text-slate-400 hover:border-slate-600'
                }`}
              >
                <input 
                  type="radio" 
                  name="subType" 
                  checked={subscriptionType === 'PAID'} 
                  onChange={() => setSubscriptionType('PAID')}
                  className="mt-0.5 text-amber-500 focus:ring-amber-500" 
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-white text-xs">
                      {language === 'bn' ? 'কল্যাণ সাবস্ক্রিপশন অনুদান (৳৩০০)' : 'Welfare Contribution (৳300)'}
                    </p>
                    {!allowFreeSubscriptionUpgrade && (
                      <span className="bg-amber-500/20 text-amber-400 text-[9px] px-1.5 py-0.2 rounded font-bold">একমাত্র প্ল্যান</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {language === 'bn' 
                      ? 'বিকাশ/নগদ এর মাধ্যমে চাঁদা জমা ও অফিসিয়াল রসিদ প্রাপ্তি।' 
                      : 'Contribute monthly welfare deposit with instant receipt.'}
                  </p>
                </div>
              </div>
            </div>

            {/* If Paid is selected, show payment fields */}
            {subscriptionType === 'PAID' && (
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-750 space-y-2.5 animate-in fade-in">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'পেমেন্ট মেথড' : 'Payment Method'}
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-semibold text-xs"
                    >
                      <option value="BKASH">bKash (বিকাশ মার্চেন্ট: 01700-112233)</option>
                      <option value="NAGAD">Nagad (নগদ মার্চেন্ট: 01800-445566)</option>
                      <option value="ROCKET">Rocket (রকেট)</option>
                      <option value="BANK">Bank Deposit (ব্যাংক ট্রান্সফার)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'ট্রানজ্যাকশন আইডি (TrxID)' : 'Transaction ID'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9J4K2L8X"
                      value={transactionId}
                      onChange={(e) => setTxnId(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Monini Form (নমিনী তথ্য ফরম) */}
          <div className="bg-slate-850 p-3.5 sm:p-4 rounded-2xl border border-slate-750 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? 'ধাপ ২: মনিনি / নমিনী তথ্য ফরম পূরণ করুন' : 'Step 2: Fill Out Monini / Nominee Form'}</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                {language === 'bn' ? '১০০% অনুদান বাধ্যতামূলক' : '100% Required'}
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              {language === 'bn' 
                ? 'দুর্ঘটনা বা মৃত্যুর ক্ষেত্রে কল্যাণ অনুদান পাওয়ার জন্য সঠিক নমিনীর তথ্য দিন।' 
                : 'Provide valid beneficiary info for insurance and accident coverage.'}
            </p>

            {nominees.map((nom, idx) => (
              <div key={nom.id || idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-750 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="font-bold text-amber-400 text-xs">
                    {language === 'bn' ? `নমিনী #${idx + 1}` : `Nominee #${idx + 1}`}
                  </span>
                  {nominees.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSecondNominee(idx)}
                      className="text-[10px] text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                    >
                      {language === 'bn' ? 'বাদ দিন' : 'Remove'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'নমিনীর পূর্ণ নাম *' : 'Nominee Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. মোসাঃ নাসিমা বেগম"
                      value={nom.name}
                      onChange={(e) => handleNomineeChange(idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'সম্পর্ক *' : 'Relationship *'}
                    </label>
                    <select
                      value={nom.relationship}
                      onChange={(e) => handleNomineeChange(idx, 'relationship', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                    >
                      <option value="স্ত্রী (Wife)">স্ত্রী (Wife)</option>
                      <option value="মা (Mother)">মা (Mother)</option>
                      <option value="বাবা (Father)">বাবা (Father)</option>
                      <option value="সন্তান (Child)">সন্তান (Child)</option>
                      <option value="ভাই (Brother)">ভাই (Brother)</option>
                      <option value="বোন (Sister)">বোন (Sister)</option>
                      <option value="অন্যান্য (Other)">অন্যান্য (Other)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'জাতীয় পরিচয়পত্র নম্বর (NID) *' : 'Nominee NID *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="১০ বা ১৭ সংখ্যার এনআইডি"
                      value={nom.nid}
                      onChange={(e) => handleNomineeChange(idx, 'nid', e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={nom.mobile}
                      onChange={(e) => handleNomineeChange(idx, 'mobile', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'নমিনীর বর্তমান ঠিকানা' : 'Nominee Address'}
                    </label>
                    <input
                      type="text"
                      placeholder="গ্রাম/বাড়ি, ডাকঘর, উপজেলা, জেলা"
                      value={nom.address}
                      onChange={(e) => handleNomineeChange(idx, 'address', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-[11px] font-semibold text-slate-300">
                      {language === 'bn' ? 'শতকরা অংশ (Percentage Allocation)' : 'Allocation Share'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={nom.percentage}
                        onChange={(e) => handleNomineeChange(idx, 'percentage', Number(e.target.value))}
                        className="w-16 px-2 py-1 bg-slate-900 border border-slate-600 rounded text-center font-bold text-amber-400 text-xs"
                      />
                      <span className="font-bold text-slate-300">%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {nominees.length < 2 && (
              <button
                type="button"
                onClick={addSecondNominee}
                className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-dashed border-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'bn' ? '+ দ্বিতীয় নমিনী যুক্ত করুন (ঐচ্ছিক)' : '+ Add Second Nominee (Optional)'}</span>
              </button>
            )}
          </div>

          {/* Submit Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowPremiumUpgradeModal(false)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition cursor-pointer text-xs"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl transition cursor-pointer shadow-lg shadow-amber-500/20 text-xs flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Crown className="w-4 h-4 fill-slate-950" />
              <span>{isSubmitting ? (language === 'bn' ? 'সক্রিয় হচ্ছে...' : 'Activating...') : (language === 'bn' ? 'প্রিমিয়াম সদস্যত্ব সক্রিয় করুন' : 'Activate Premium Membership')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
