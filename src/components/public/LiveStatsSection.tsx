import React from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  Users, 
  UserCheck, 
  Wallet, 
  HeartPulse, 
  Car, 
  GraduationCap 
} from 'lucide-react';

export const LiveStatsSection: React.FC = () => {
  const { language, t, metrics } = useDwf();

  // Helper for Bengali number conversion
  const toBengaliNumber = (num: number | string): string => {
    if (language !== 'bn') {
      return typeof num === 'number' ? num.toLocaleString('en-IN') : num;
    }
    const bengaliDigits: { [key: string]: string } = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
      ',': ',', '.': '.'
    };
    const formatted = typeof num === 'number' ? num.toLocaleString('en-IN') : num;
    return formatted.replace(/[0-9,\.]/g, match => bengaliDigits[match] || match);
  };

  const statItems = [
    {
      id: 'total-members',
      label: t.statTotalMembers,
      value: toBengaliNumber(metrics.totalMembers),
      suffix: language === 'bn' ? ' জন' : '+',
      icon: Users,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    },
    {
      id: 'active-members',
      label: t.statActiveMembers,
      value: toBengaliNumber(metrics.activeMembers),
      suffix: language === 'bn' ? ' জন' : '+',
      icon: UserCheck,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      id: 'welfare-fund',
      label: t.statWelfareFund,
      value: `৳ ${toBengaliNumber(metrics.totalWelfareFund)}`,
      suffix: '',
      icon: Wallet,
      color: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'medical-assistance',
      label: t.statMedicalAssistance,
      value: `৳ ${toBengaliNumber(metrics.totalMedicalAssistance)}`,
      suffix: '',
      icon: HeartPulse,
      color: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100'
    },
    {
      id: 'accident-assistance',
      label: t.statAccidentAssistance,
      value: `৳ ${toBengaliNumber(metrics.totalAccidentAssistance)}`,
      suffix: '',
      icon: Car,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    },
    {
      id: 'trained-members',
      label: t.statTrainedMembers,
      value: toBengaliNumber(metrics.trainedMembers),
      suffix: language === 'bn' ? ' জন' : '+',
      icon: GraduationCap,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100'
    }
  ];

  return (
    <section className="relative -mt-5 sm:-mt-6 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-100 gap-2 text-center sm:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
              {language === 'bn' ? 'লাইভ প্রাতিষ্ঠানিক পরিসংখ্যান' : 'Live Institutional Statistics'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {language === 'bn' ? 'স্বচ্ছতা ও সদস্য সেবার প্রকৃত চিত্র' : 'Real-Time Transparency & Member Impact'}
            </h3>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{language === 'bn' ? 'সরাসরি ডাটাবেস থেকে হালনাগাদকৃত' : 'Live synced from Core Ledger'}</span>
          </div>
        </div>

        {/* 6-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 pt-6">
          {statItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border ${item.borderColor} ${item.bgColor} flex flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-sm`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-white shadow-xs ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-sans">
                  {item.value}
                  {item.suffix && <span className="text-xs font-semibold text-slate-600 ml-0.5">{item.suffix}</span>}
                </p>
                <p className="text-xs font-medium text-slate-600 mt-1 leading-snug">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
