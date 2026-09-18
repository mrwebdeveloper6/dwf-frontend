import React from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  HeartPulse, 
  ShieldAlert, 
  Scale, 
  GraduationCap, 
  HeartHandshake, 
  Compass, 
  ArrowRight 
} from 'lucide-react';

export const ProgramsSection: React.FC = () => {
  const { language, t, setShowApplyModal } = useDwf();

  const programs = [
    {
      id: 'health-card',
      icon: HeartPulse,
      title: t.progHealthCard,
      description: t.progHealthCardDesc,
      tag: language === 'bn' ? '৫০,০০০৳ অনুদান' : '50k BDT Grant',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      iconBg: 'bg-rose-50 text-rose-600',
      actionText: language === 'bn' ? 'কার্ডের সুবিধা দেখুন' : 'View Card Benefits'
    },
    {
      id: 'accident-assistance',
      icon: ShieldAlert,
      title: t.progAccident,
      description: t.progAccidentDesc,
      tag: language === 'bn' ? 'জরুরি ফান্ড' : 'Emergency Aid',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      iconBg: 'bg-red-50 text-red-600',
      actionText: language === 'bn' ? 'সহায়তার নিয়ম জানুন' : 'Assistance Policy'
    },
    {
      id: 'legal-aid',
      icon: Scale,
      title: t.progLegal,
      description: t.progLegalDesc,
      tag: language === 'bn' ? '২৪/৭ সাপোর্ট' : '24/7 Support',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-50 text-amber-600',
      actionText: language === 'bn' ? 'আইনজীবী প্যানেল' : 'Legal Panel'
    },
    {
      id: 'training',
      icon: GraduationCap,
      title: t.progTraining,
      description: t.progTrainingDesc,
      tag: language === 'bn' ? 'বিআরটিএ মান' : 'Certified',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-600',
      actionText: language === 'bn' ? 'প্রশিক্ষণ ক্যালেন্ডার' : 'Training Schedule'
    },
    {
      id: 'rehabilitation',
      icon: HeartHandshake,
      title: t.progRehab,
      description: t.progRehabDesc,
      tag: language === 'bn' ? 'স্থায়ী তহবিল' : 'Long-term',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-50 text-blue-600',
      actionText: language === 'bn' ? 'পুনর্বাসন প্রকল্প' : 'Rehab Details'
    },
    {
      id: 'hajj-umrah',
      icon: Compass,
      title: t.progHajj,
      description: t.progHajjDesc,
      tag: language === 'bn' ? 'সম্পূর্ণ ফ্রি' : 'Sponsored',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-50 text-purple-600',
      actionText: language === 'bn' ? 'লটারি নীতি ও যোগ্যতা' : 'Lottery Criteria'
    }
  ];

  return (
    <section id="programs" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
            {language === 'bn' ? 'সদস্যদের অধিকার ও নিরাপত্তা' : 'Member Security & Rights'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {t.progTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t.progSubtitle}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group hover:border-emerald-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${prog.iconBg}`}>
                    <prog.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${prog.badgeColor}`}>
                    {prog.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                  {prog.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>{prog.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] text-slate-400 font-mono">DWF-CERT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
