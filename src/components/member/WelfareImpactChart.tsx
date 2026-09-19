import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  HeartHandshake, 
  BadgeDollarSign, 
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface ImpactDataPoint {
  period: string;
  periodEn: string;
  driversSupported: number;
  aidDistributedLakh: number; // in Lakh BDT (১ লক্ষ = ১০০,০০০ ৳)
  medicalAidLakh: number;
  accidentAidLakh: number;
  educationEmergencyLakh: number;
}

const quarterlyImpactData: ImpactDataPoint[] = [
  {
    period: '২০২৪ কিউ৩',
    periodEn: 'Q3 2024',
    driversSupported: 420,
    aidDistributedLakh: 18.5,
    medicalAidLakh: 9.2,
    accidentAidLakh: 6.8,
    educationEmergencyLakh: 2.5
  },
  {
    period: '২০২৪ কিউ৪',
    periodEn: 'Q4 2024',
    driversSupported: 680,
    aidDistributedLakh: 29.4,
    medicalAidLakh: 14.8,
    accidentAidLakh: 10.6,
    educationEmergencyLakh: 4.0
  },
  {
    period: '২০২৫ কিউ১',
    periodEn: 'Q1 2025',
    driversSupported: 950,
    aidDistributedLakh: 41.2,
    medicalAidLakh: 21.0,
    accidentAidLakh: 14.5,
    educationEmergencyLakh: 5.7
  },
  {
    period: '২০২৫ কিউ২',
    periodEn: 'Q2 2025',
    driversSupported: 1240,
    aidDistributedLakh: 56.8,
    medicalAidLakh: 28.6,
    accidentAidLakh: 20.2,
    educationEmergencyLakh: 8.0
  },
  {
    period: '২০২৫ কিউ৩',
    periodEn: 'Q3 2025',
    driversSupported: 1580,
    aidDistributedLakh: 72.5,
    medicalAidLakh: 36.5,
    accidentAidLakh: 26.0,
    educationEmergencyLakh: 10.0
  },
  {
    period: '২০২৫ কিউ৪',
    periodEn: 'Q4 2025',
    driversSupported: 1960,
    aidDistributedLakh: 91.0,
    medicalAidLakh: 45.8,
    accidentAidLakh: 32.7,
    educationEmergencyLakh: 12.5
  },
  {
    period: '২০২৬ কিউ১',
    periodEn: 'Q1 2026',
    driversSupported: 2350,
    aidDistributedLakh: 112.4,
    medicalAidLakh: 57.2,
    accidentAidLakh: 40.2,
    educationEmergencyLakh: 15.0
  },
  {
    period: '২০২৬ কিউ২',
    periodEn: 'Q2 2026',
    driversSupported: 2890,
    aidDistributedLakh: 138.6,
    medicalAidLakh: 70.4,
    accidentAidLakh: 49.2,
    educationEmergencyLakh: 19.0
  },
  {
    period: '২০২৬ কিউ৩ (বর্তমান)',
    periodEn: 'Q3 2026 (YTD)',
    driversSupported: 3420,
    aidDistributedLakh: 168.0,
    medicalAidLakh: 85.0,
    accidentAidLakh: 60.5,
    educationEmergencyLakh: 22.5
  }
];

const monthlyRecentData: ImpactDataPoint[] = [
  {
    period: 'মার্চ ২০২৬',
    periodEn: 'Mar 2026',
    driversSupported: 780,
    aidDistributedLakh: 36.5,
    medicalAidLakh: 18.5,
    accidentAidLakh: 13.0,
    educationEmergencyLakh: 5.0
  },
  {
    period: 'এপ্রিল ২০২৬',
    periodEn: 'Apr 2026',
    driversSupported: 860,
    aidDistributedLakh: 42.0,
    medicalAidLakh: 21.2,
    accidentAidLakh: 15.1,
    educationEmergencyLakh: 5.7
  },
  {
    period: 'মে ২০২৬',
    periodEn: 'May 2026',
    driversSupported: 940,
    aidDistributedLakh: 46.8,
    medicalAidLakh: 24.0,
    accidentAidLakh: 16.8,
    educationEmergencyLakh: 6.0
  },
  {
    period: 'জুন ২০২৬',
    periodEn: 'Jun 2026',
    driversSupported: 1090,
    aidDistributedLakh: 49.8,
    medicalAidLakh: 25.2,
    accidentAidLakh: 17.6,
    educationEmergencyLakh: 7.0
  },
  {
    period: 'জুলাই ২০২৬',
    periodEn: 'Jul 2026',
    driversSupported: 1150,
    aidDistributedLakh: 54.2,
    medicalAidLakh: 27.5,
    accidentAidLakh: 19.2,
    educationEmergencyLakh: 7.5
  },
  {
    period: 'আগস্ট ২০২৬',
    periodEn: 'Aug 2026',
    driversSupported: 1220,
    aidDistributedLakh: 58.5,
    medicalAidLakh: 29.8,
    accidentAidLakh: 21.0,
    educationEmergencyLakh: 7.7
  },
  {
    period: 'সেপ্টেম্বর ২০২৬',
    periodEn: 'Sep 2026',
    driversSupported: 1050,
    aidDistributedLakh: 55.3,
    medicalAidLakh: 28.0,
    accidentAidLakh: 20.3,
    educationEmergencyLakh: 7.0
  }
];

interface WelfareImpactChartProps {
  language?: 'bn' | 'en';
}

export const WelfareImpactChart: React.FC<WelfareImpactChartProps> = ({ language = 'bn' }) => {
  const [timeframe, setTimeframe] = useState<'quarterly' | 'monthly'>('quarterly');
  const [metricFocus, setMetricFocus] = useState<'both' | 'drivers' | 'aid'>('both');

  const activeData = timeframe === 'quarterly' ? quarterlyImpactData : monthlyRecentData;

  // Aggregate stats
  const totalAssisted = activeData.reduce((acc, curr) => acc + curr.driversSupported, 0);
  const totalAidLakh = activeData.reduce((acc, curr) => acc + curr.aidDistributedLakh, 0);
  const totalMedicalLakh = activeData.reduce((acc, curr) => acc + curr.medicalAidLakh, 0);
  const totalAccidentLakh = activeData.reduce((acc, curr) => acc + curr.accidentAidLakh, 0);

  // Custom Dark Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-3.5 rounded-2xl shadow-2xl text-xs space-y-2 min-w-[200px]">
          <p className="font-bold text-slate-200 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>{label}</span>
          </p>

          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => {
              const isDrivers = entry.dataKey === 'driversSupported';
              return (
                <div key={`item-${index}`} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0" 
                      style={{ backgroundColor: entry.color }} 
                    />
                    <span className="text-slate-400 text-[11px]">{entry.name}:</span>
                  </div>
                  <span className="font-bold font-mono text-white">
                    {isDrivers 
                      ? `${entry.value.toLocaleString('en-IN')} জন`
                      : `৳ ${entry.value.toFixed(1)} লক্ষ`
                    }
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-1.5 border-t border-slate-800/80 text-[10px] text-emerald-400 flex items-center justify-between font-medium">
            <span>DWF ট্রাস্টি বোর্ড অনুমোদিত</span>
            <span className="font-mono">১০০% স্বচ্ছ</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-6">
      
      {/* Header section with title and interactive selectors */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/90 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-800/80 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {language === 'bn' ? 'কল্যাণ তহবিলের সামগ্রিক প্রভাব (Welfare Impact)' : 'Welfare Impact Analysis'}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 font-mono">
                  <Sparkles className="w-2.5 h-2.5" />
                  লাইভ চার্ট
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'bn' 
                  ? 'সময়ের সাথে চালকদের আর্থিক সহায়তা ও সহায়তাপ্রাপ্ত সদস্য সংখ্যা বিশ্লেষণ' 
                  : 'Track drivers assisted and financial aid distributed over time'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* View focus switch */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs font-semibold">
            <button
              onClick={() => setMetricFocus('both')}
              className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                metricFocus === 'both' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              উভয়
            </button>
            <button
              onClick={() => setMetricFocus('aid')}
              className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                metricFocus === 'aid' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              অনুদান (৳)
            </button>
            <button
              onClick={() => setMetricFocus('drivers')}
              className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                metricFocus === 'drivers' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              চালক সংখ্যা
            </button>
          </div>

          {/* Timeframe switch */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs font-semibold">
            <button
              onClick={() => setTimeframe('quarterly')}
              className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                timeframe === 'quarterly' 
                  ? 'bg-slate-800 text-emerald-300 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ত্রৈমাসিক (২০২৪-২৬)
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                timeframe === 'monthly' 
                  ? 'bg-slate-800 text-emerald-300 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              সাম্প্রতিক মাসসমূহ
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>মোট সহায়তাপ্রাপ্ত</span>
            <Users className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-lg sm:text-xl font-black text-white font-mono mt-1.5">
            {totalAssisted.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-400">জন</span>
          </p>
          <p className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>সদস্য চালক ও পরিবার</span>
          </p>
        </div>

        <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>মোট বিতরণকৃত অনুদান</span>
            <BadgeDollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-lg sm:text-xl font-black text-amber-400 font-mono mt-1.5">
            ৳ {totalAidLakh.toFixed(1)} <span className="text-xs font-normal text-slate-400">লক্ষ</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
            ≈ ৳ {(totalAidLakh / 100).toFixed(2)} কোটি
          </p>
        </div>

        <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>চিকিৎসা ও হাসপাতাল</span>
            <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <p className="text-lg sm:text-xl font-black text-rose-400 font-mono mt-1.5">
            ৳ {totalMedicalLakh.toFixed(1)} <span className="text-xs font-normal text-slate-400">লক্ষ</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {((totalMedicalLakh / totalAidLakh) * 100).toFixed(0)}% মোট অনুদানের
          </p>
        </div>

        <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>দুর্ঘটনা ও পুনর্বাসন</span>
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-lg sm:text-xl font-black text-cyan-400 font-mono mt-1.5">
            ৳ {totalAccidentLakh.toFixed(1)} <span className="text-xs font-normal text-slate-400">লক্ষ</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {((totalAccidentLakh / totalAidLakh) * 100).toFixed(0)}% মোট অনুদানের
          </p>
        </div>

      </div>

      {/* Main Interactive Recharts Canvas */}
      <div className="w-full h-[320px] sm:h-[380px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={activeData}
            margin={{ top: 10, right: 15, left: -10, bottom: 25 }}
          >
            <defs>
              <linearGradient id="aidGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="driversGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
            
            <XAxis 
              dataKey="period" 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              dy={8}
            />

            {/* Left Axis: Aid distributed in Lakh BDT */}
            {(metricFocus === 'both' || metricFocus === 'aid') && (
              <YAxis
                yAxisId="aidAxis"
                orientation="left"
                stroke="#10b981"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `৳${val}L`}
              />
            )}

            {/* Right Axis: Drivers Count */}
            {(metricFocus === 'both' || metricFocus === 'drivers') && (
              <YAxis
                yAxisId="driverAxis"
                orientation={metricFocus === 'drivers' ? 'left' : 'right'}
                stroke="#38bdf8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}`}
              />
            )}

            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="top" 
              height={36} 
              wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
              formatter={(value) => <span className="text-slate-300 font-medium mr-3">{value}</span>}
            />

            {/* Visual Layers based on selected focus */}
            {(metricFocus === 'both' || metricFocus === 'aid') && (
              <Area
                yAxisId="aidAxis"
                type="monotone"
                dataKey="aidDistributedLakh"
                name="বিতরণকৃত মোট অনুদান (লক্ষ ৳)"
                fill="url(#aidGradient)"
                stroke="#10b981"
                strokeWidth={2.5}
                activeDot={{ r: 6, fill: '#10b981', stroke: '#064e3b', strokeWidth: 2 }}
              />
            )}

            {(metricFocus === 'both' || metricFocus === 'aid') && (
              <Bar
                yAxisId="aidAxis"
                dataKey="medicalAidLakh"
                name="চিকিৎসা সহায়তা (লক্ষ ৳)"
                fill="#f43f5e"
                opacity={0.85}
                radius={[4, 4, 0, 0]}
                maxBarSize={18}
              />
            )}

            {(metricFocus === 'both' || metricFocus === 'aid') && (
              <Bar
                yAxisId="aidAxis"
                dataKey="accidentAidLakh"
                name="দুর্ঘটনা অনুদান (লক্ষ ৳)"
                fill="#06b6d4"
                opacity={0.85}
                radius={[4, 4, 0, 0]}
                maxBarSize={18}
              />
            )}

            {(metricFocus === 'both' || metricFocus === 'drivers') && (
              <Line
                yAxisId="driverAxis"
                type="monotone"
                dataKey="driversSupported"
                name="সহায়তাপ্রাপ্ত চালক সংখ্যা (জন)"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 3.5, fill: '#0284c7', stroke: '#38bdf8', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#38bdf8', stroke: '#0c4a6e', strokeWidth: 2 }}
              />
            )}

          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight Box */}
      <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <p>
            <strong className="text-white">ফাউন্ডেশন তহবিল স্বচ্ছতা নোট:</strong> চালকদের প্রতি মাসের ৩০০ টাকা মাসিক চাঁদা সরাসরি এই সেন্ট্রাল রিজার্ভে যুক্ত হয় এবং দুর্ঘটনা ও অসুস্থতায় তাৎক্ষণিক ছাড় দেওয়া হয়।
          </p>
        </div>
        <div className="text-[11px] text-emerald-400 font-mono shrink-0 font-semibold">
          অডিট স্ট্যাটাস: ভেরিফাইড (অক্টোবর ২০২৬)
        </div>
      </div>

    </div>
  );
};
