import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, t } = useDwf();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('MEMBERSHIP_QUERY');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(language === 'bn' ? 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।' : 'Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError(language === 'bn' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন।' : 'Please enter a valid mobile number.');
      return;
    }
    if (!message.trim()) {
      setError(language === 'bn' ? 'আপনার বার্তা বা অভিযোগের বিবরণ লিখুন।' : 'Please write your message or query.');
      return;
    }

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
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {language === 'bn' ? 'সদস্য সহায়তা ও যোগাযোগ' : 'Member Support & Inquiries'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {language === 'bn' ? 'আমাদের সাথে সরাসরি কথা বলুন' : 'Get in Touch with DWF'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {language === 'bn'
              ? 'সদস্যপদ, কার্ড ইস্যু, চিকিৎসা বা দুর্ঘটনা অনুদান সম্পর্কিত যেকোনো তথ্যে আমাদের প্রতিনিধি দল সার্বক্ষণিক প্রস্তুত।'
              : 'Our support team is available 24/7 for membership assistance, card inquiries, and emergency relief.'}
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Organization Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                  {language === 'bn' ? 'প্রধান প্রশাসনিক কার্যালয়' : 'Headquarters'}
                </span>
                <h3 className="text-xl font-bold mt-2">
                  {t.orgName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {t.tagline}
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{language === 'bn' ? 'ঠিকানা:' : 'Address:'}</p>
                    <p className="text-slate-300 leading-relaxed">
                      লেভেল ৪ ও ৫, পরিবহন ভবন, বিজয়নগর, ঢাকা-১০০০, বাংলাদেশ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{language === 'bn' ? 'টোল-ফ্রি হেল্পলাইন:' : 'Helpline:'}</p>
                    <p className="text-emerald-300 font-bold font-mono text-base">১৬৭৮৯</p>
                    <p className="text-slate-400 text-xs">জরুরি দুর্ঘটনা ডেস্ক: ০১৭০০-০০০০০০</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{language === 'bn' ? 'অফিসিয়াল ইমেইল:' : 'Email:'}</p>
                    <p className="text-slate-300 font-mono">info@dwf-bd.org</p>
                    <p className="text-slate-400 text-xs font-mono">support@dwf-bd.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{language === 'bn' ? 'সেবা সময়সূচি:' : 'Operating Hours:'}</p>
                    <p className="text-slate-300">শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – সন্ধ্যা ৬:০০</p>
                    <p className="text-emerald-400 font-medium text-xs">জরুরি দুর্ঘটনা সেল: ২৪ ঘণ্টা সার্বক্ষণিক</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                {language === 'bn' ? 'অনলাইন সহায়তা বা বার্তা পাঠান' : 'Submit Inquiry / Feedback'}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {language === 'bn'
                  ? 'আপনার মোবাইল নম্বর প্রদান করলে আমাদের কর্মকর্তা দ্রুত ফিরতি কল করবেন।'
                  : 'Leave your contact number and our representative will reach out shortly.'}
              </p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">
                    {language === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Inquiry Submitted Successfully!'}
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    {language === 'bn'
                      ? 'আপনার তথ্য আমাদের হেল্পডেস্কে লিপিবদ্ধ করা হয়েছে। শীঘ্রই একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।'
                      : 'Your query has been logged. A DWF officer will contact your phone number soon.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-emerald-700 underline cursor-pointer"
                  >
                    {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={language === 'bn' ? 'যেমন: মোঃ আরিফুল ইসলাম' : 'e.g. Md. Ariful Islam'}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="017XX-XXXXXX"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'bn' ? 'বার্তার বিষয় *' : 'Inquiry Category *'}
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    >
                      <option value="MEMBERSHIP_QUERY">
                        {language === 'bn' ? 'সদস্যপদ আবেদন ও নিয়মাবলী' : 'Membership Application & Rules'}
                      </option>
                      <option value="HEALTH_CARD">
                        {language === 'bn' ? 'ডিজিটাল স্বাস্থ্য কার্ড ও হাসপাতাল ছাড়' : 'Digital Health Card & Discounts'}
                      </option>
                      <option value="ACCIDENT_HELP">
                        {language === 'bn' ? 'দুর্ঘটনা ক্ষতিপূরণ ও সহায়তা' : 'Accident Relief & Compensation'}
                      </option>
                      <option value="LEGAL_AID">
                        {language === 'bn' ? 'ফ্রি লিগ্যাল এইড ও আইনি সহায়তা' : 'Free Legal Aid Support'}
                      </option>
                      <option value="OTHER">
                        {language === 'bn' ? 'অন্যান্য পরামর্শ বা অভিযোগ' : 'Other Inquiries / Complaints'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'bn' ? 'বিস্তারিত বার্তা বা বিবরণ *' : 'Your Message / Inquiry *'}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={language === 'bn' ? 'আপনার প্রশ্ন বা সমস্যার বিবরণ লিখুন...' : 'Write details of your query...'}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Submitting...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{language === 'bn' ? 'বার্তা জমা দিন' : 'Send Message'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
