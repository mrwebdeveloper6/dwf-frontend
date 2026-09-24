import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  Building2,
  Navigation,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, setActiveView, branches } = useDwf();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('MEMBERSHIP');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setPhone('');
      setMessage('');
    }, 800);
  };

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
            <span className="text-white font-semibold">{language === 'bn' ? 'যোগাযোগ ও দেশব্যাপী শাখা নেটওয়ার্ক' : 'Branches & Contact'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সারাদেশে ২৪/৭ জরুরি সহায়তা' : '24/7 Nationwide Driver Assistance'}</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
                {language === 'bn' ? 'যোগাযোগ ও দেশব্যাপী শাখা নেটওয়ার্ক' : 'Contact & Nationwide Branch Network'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'ঢাকা প্রধান কার্যালয় সহ চট্টগ্রাম, রাজশাহী, বগুড়া, সিলেট ও খুলনা আন্তঃজেলা বাস টার্মিনালস্থ ডিডব্লিউএফ সেবা কেন্দ্রের সাথে সরাসরি যোগাযোগ করুন।'
                  : 'Reach our central headquarters and nationwide regional branches located in key transport terminals.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Top 3 Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-red-600 text-white shadow-xl space-y-2">
            <PhoneCall className="w-8 h-8 text-white animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-100 block">২৪/৭ জরুরি হেল্পলাইন</span>
            <p className="text-3xl font-black font-mono">১৬৭৮৯</p>
            <p className="text-xs text-red-100">টোল-ফ্রি যে-কোনো মোবাইল অপারেটর থেকে দুর্ঘটনা ও আইনি সহায়তায় তাৎক্ষণিক কার্যকর।</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
            <Mail className="w-8 h-8 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">অফিসিয়াল ইমেইল</span>
            <p className="text-lg font-bold font-mono text-slate-900">support@dwf-bd.org</p>
            <p className="text-xs text-slate-500">দাপ্তরিক আবেদন, অনুদান অনুমোদন ও প্রাতিষ্ঠানিক যোগাযোগের জন্য।</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
            <Clock className="w-8 h-8 text-[#034732]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">কার্যসূচি ও সেবা সময়</span>
            <p className="text-base font-bold text-slate-900">শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – সন্ধ্যা ৬:০০</p>
            <p className="text-xs text-red-600 font-bold">জরুরি দুর্ঘটনা রেসপন্স সেল: ২৪ ঘণ্টা সার্বক্ষণিক</p>
          </div>
        </div>

        {/* Nationwide Branches Directory */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">শাখা নেটওয়ার্ক</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">ডিডব্লিউএফ আঞ্চলিক শাখা কার্যালয়সমূহ</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
              মোট শাখা: {branches.length}টি
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div 
                key={b.id} 
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#034732] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {b.code}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {b.memberCount} জন সদস্য
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mt-2">
                    {b.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="text-slate-500 text-[10px]">ম্যানেজার: <span className="font-semibold text-slate-800">{b.manager}</span></p>
                    <p className="font-mono font-bold text-slate-900">{b.phone}</p>
                  </div>
                  <a
                    href={`tel:${b.phone}`}
                    className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition cursor-pointer shadow-xs active:scale-95"
                    title="শাখা অফিসে কল করুন"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {language === 'bn' ? 'অনলাইন বার্তা বা অনুসন্ধান পাঠান' : 'Send Inquiry / Feedback'}
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            আপনার নাম ও মোবাইল নম্বর প্রদান করলে আমাদের কর্মকর্তা দ্রুত ফিরতি কল করবেন।
          </p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-900">বার্তা সফলভাবে পাঠানো হয়েছে!</h4>
              <p className="text-xs text-emerald-800">আমাদের প্রতিনিধি শীঘ্রই আপনার নম্বরে যোগাযোগ করবেন।</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-red-600 underline cursor-pointer"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মোঃ কামরুল ইসলাম"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="০১XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">বার্তা বা অনুসন্ধানের বিবরণ *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনার প্রশ্ন বা সমস্যার বিবরণ লিখুন..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-md shadow-red-600/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা জমা দিন'}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
