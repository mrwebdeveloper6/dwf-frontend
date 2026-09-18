import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { DwfLogo } from '../common/DwfLogo';
import confetti from 'canvas-confetti';
import { 
  LayoutDashboard, 
  CreditCard, 
  HeartPulse, 
  ShieldAlert, 
  Users, 
  Receipt, 
  FileText, 
  Bell, 
  LogOut, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  QrCode, 
  User, 
  ArrowRight,
  Plus,
  Building,
  Phone,
  Calendar,
  Wallet
} from 'lucide-react';
import { PaymentMethod, PaymentType, Nominee } from '../../types/dwf';

export const MemberPortal: React.FC = () => {
  const { 
    language, 
    user, 
    logout, 
    currentMemberData, 
    payments, 
    recordPayment, 
    medicalClaims, 
    submitMedicalClaim, 
    accidentClaims, 
    submitAccidentClaim,
    updateNominees,
    smsRecords,
    setActiveView 
  } = useDwf();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'id-card' | 'health-card' | 'payments' | 'medical' | 'accident' | 'nominees' | 'profile' | 'notifications'
  >('dashboard');

  const member = currentMemberData;

  // Payments State
  const [payAmount, setPayAmount] = useState<number>(300);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BKASH');
  const [payType, setPayType] = useState<PaymentType>('MONTHLY_CONTRIBUTION');
  const [txnId, setTxnId] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<string>('');

  // Medical Claim State
  const [medHospital, setMedHospital] = useState('');
  const [medAdmission, setMedAdmission] = useState('2026-09-01');
  const [medDischarge, setMedDischarge] = useState('2026-09-06');
  const [medReason, setMedReason] = useState('');
  const [medBill, setMedBill] = useState<number>(35000);
  const [medClaimAmount, setMedClaimAmount] = useState<number>(20000);
  const [medSuccess, setMedSuccess] = useState<string>('');

  // Accident Claim State
  const [accDate, setAccDate] = useState('2026-09-10');
  const [accLocation, setAccLocation] = useState('');
  const [accInjury, setAccInjury] = useState<'MINOR' | 'SEVERE' | 'PERMANENT_DISABILITY' | 'FATAL'>('SEVERE');
  const [accHospital, setAccHospital] = useState('');
  const [accPoliceReport, setAccPoliceReport] = useState('');
  const [accClaimAmount, setAccClaimAmount] = useState<number>(30000);
  const [accSuccess, setAccSuccess] = useState<string>('');

  // Nominees editing state
  const [localNominees, setLocalNominees] = useState<Nominee[]>(() => member?.nominees || []);
  const [nomineeMsg, setNomineeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!member) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">সদস্য তথ্য পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-600">অনুগ্রহ করে পুনরায় লগইন করুন অথবা মূল পাতায় ফিরে যান।</p>
          <button
            onClick={logout}
            className="px-5 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
          >
            মূল পাতায় যান
          </button>
        </div>
      </div>
    );
  }

  // Filter records belonging to this member
  const myPayments = payments.filter(p => p.memberId === member.memberId);
  const myMedicalClaims = medicalClaims.filter(c => c.memberId === member.memberId);
  const myAccidentClaims = accidentClaims.filter(c => c.memberId === member.memberId);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const res = recordPayment({
      memberId: member.memberId,
      amount: payAmount,
      paymentType: payType,
      paymentMethod,
      transactionId: txnId || `${paymentMethod}-${Date.now().toString().slice(-6)}`,
      remarks: 'অনলাইন পেমেন্ট গেটওয়ের মাধ্যমে জমাকৃত'
    });

    if (res.success) {
      setPaymentSuccess(`পেমেন্ট সফল! রসিদ নম্বর: ${res.receiptNo}`);
      setTxnId('');
      confetti({ particleCount: 60, spread: 60 });
      setTimeout(() => setPaymentSuccess(''), 5000);
    }
  };

  const handleMedicalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medHospital.trim() || !medReason.trim()) return;

    const res = submitMedicalClaim({
      memberId: member.memberId,
      memberName: member.nameBn,
      hospital: medHospital,
      admissionDate: medAdmission,
      dischargeDate: medDischarge,
      diseaseReason: medReason,
      treatmentType: 'INPATIENT',
      totalBill: medBill,
      claimAmount: medClaimAmount,
      documentsCount: 3
    });

    if (res.success) {
      setMedSuccess(`দাবি সফলভাবে দাখিল হয়েছে! ট্র্যাকিং নম্বর: ${res.claimNo}`);
      setMedHospital('');
      setMedReason('');
      confetti({ particleCount: 50 });
      setTimeout(() => setMedSuccess(''), 5000);
    }
  };

  const handleAccidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accLocation.trim() || !accHospital.trim()) return;

    const res = submitAccidentClaim({
      memberId: member.memberId,
      memberName: member.nameBn,
      accidentDate: accDate,
      location: accLocation,
      vehicle: `${member.vehicleType} (${member.vehicleRegNo})`,
      driverName: member.nameBn,
      injuryType: accInjury,
      hospital: accHospital,
      policeReportNo: accPoliceReport || 'GD-PENDING',
      estimatedCost: accClaimAmount * 1.3,
      claimAmount: accClaimAmount
    });

    if (res.success) {
      setAccSuccess(`দুর্ঘটনা সহায়তার আবেদন জমা হয়েছে! ট্র্যাকিং নং: ${res.claimNo}`);
      setAccLocation('');
      setAccHospital('');
      confetti({ particleCount: 50 });
      setTimeout(() => setAccSuccess(''), 5000);
    }
  };

  const handleSaveNominees = () => {
    const total = localNominees.reduce((sum, n) => sum + (Number(n.percentage) || 0), 0);
    if (total !== 100) {
      setNomineeMsg({
        type: 'error',
        text: `নমিনিদের শতকরা অনুপাত অবশ্যই ঠিক ১০০% হতে হবে! (বর্তমানে: ${total}%)`
      });
      return;
    }

    const res = updateNominees(member.memberId, localNominees);
    if (res.success) {
      setNomineeMsg({ type: 'success', text: res.message });
      setTimeout(() => setNomineeMsg(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 pb-16">
      
      {/* Member Portal Top Nav Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveView('home')} 
              className="cursor-pointer"
              title="মূল পাতায় যান"
            >
              <DwfLogo size="sm" variant="light" />
            </div>
            <div className="hidden sm:block border-l border-slate-700 pl-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {language === 'bn' ? 'সদস্য পোর্টাল' : 'Member Portal'}
              </span>
              <p className="text-[11px] text-slate-400">{member.branchName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
              />
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-white leading-none">{member.nameBn}</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5">{member.memberId}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition cursor-pointer"
              title="লগআউট"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-none mb-6">
          {[
            { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
            { id: 'id-card', label: 'ডিজিটাল আইডি কার্ড', icon: CreditCard },
            { id: 'health-card', label: 'স্বাস্থ্য সুরক্ষা কার্ড', icon: HeartPulse },
            { id: 'payments', label: 'পেমেন্ট ও তহবিল বিবরণী', icon: Wallet },
            { id: 'medical', label: 'চিকিৎসা সহায়তা দাবি', icon: Receipt },
            { id: 'accident', label: 'দুর্ঘটনা সহায়তা', icon: ShieldAlert },
            { id: 'nominees', label: 'নমিনি ব্যবস্থাপনা', icon: Users },
            { id: 'profile', label: 'আমার প্রোফাইল', icon: User }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Top Welcome Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/80">
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
                  />
                  <div className="space-y-1">
                    <span className="bg-emerald-800/90 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      সক্রিয় প্রাতিষ্ঠানিক সদস্য
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold">{member.nameBn}</h2>
                    <p className="text-xs text-slate-300">
                      সদস্য আইডি: <span className="font-mono font-bold text-emerald-300">{member.memberId}</span> | পেশা: {member.profession}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('id-card')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>আইডি কার্ড ভিউ</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-bold rounded-xl transition border border-emerald-700 cursor-pointer flex items-center gap-1.5"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>চাঁদা প্রদান</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Core Member Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Membership Status */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-medium">সদস্যপদ স্থিতি</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>সক্রিয় (Active)</span>
                  </span>
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 font-mono px-2 py-0.5 rounded font-bold">
                    মেয়াদ: {member.healthCardExpiry}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">সংযুক্ত শাখা: {member.branchName}</p>
              </div>

              {/* Card 2: Total Deposit */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-medium">মোট জমাকৃত কল্যাণ তহবিল</span>
                <div className="mt-2">
                  <p className="text-2xl font-black text-slate-900 font-mono">
                    ৳ {member.totalDeposit.toLocaleString('en-IN')}
                  </p>
                </div>
                <p className="text-[10px] text-emerald-600 font-medium mt-2">নিয়মিত মাসিক চাঁদা: ৳ {member.monthlyContribution}/মাস</p>
              </div>

              {/* Card 3: Due Amount */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-medium">বকেয়া চাঁদা স্থিতি</span>
                <div className="mt-2">
                  <p className={`text-2xl font-black font-mono ${member.outstandingDue > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    ৳ {member.outstandingDue}
                  </p>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  {member.outstandingDue > 0 ? 'অনুগ্রহ করে চলতি মাসের চাঁদা পরিশোধ করুন' : 'কোনো বকেয়া নেই (আপ-টু-ডেট)'}
                </p>
              </div>

              {/* Card 4: Medical Allowance Limit */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-medium">বার্ষিক চিকিৎসা অনুদান সীমা</span>
                <div className="mt-2">
                  <p className="text-2xl font-black text-rose-700 font-mono">
                    ৳ {member.medicalAllowanceLimit.toLocaleString('en-IN')}
                  </p>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">ডিজিটাল স্বাস্থ্য কার্ডের আওতাধীন</p>
              </div>

            </div>

            {/* Quick Overview Split: Recent Payments & Claims Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Payment Receipts */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-700" />
                    <span>সর্বশেষ চাঁদা জমার রসিদ</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="text-xs text-emerald-700 font-semibold hover:underline"
                  >
                    সকল রসিদ
                  </button>
                </div>

                <div className="space-y-3">
                  {myPayments.slice(0, 3).map((p) => (
                    <div key={p.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{p.remarks || p.paymentType}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{p.receiptNo} • {p.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-black font-mono text-emerald-700 text-sm">৳ {p.amount}</span>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">{p.paymentMethod}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Claims Status Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-rose-700" />
                    <span>চিকিৎসা ও দুর্ঘটনা দাবি অগ্রগতি</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('medical')}
                    className="text-xs text-emerald-700 font-semibold hover:underline"
                  >
                    নতুন দাবি
                  </button>
                </div>

                <div className="space-y-3">
                  {myMedicalClaims.length > 0 ? (
                    myMedicalClaims.map((c) => (
                      <div key={c.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{c.diseaseReason}</p>
                          <p className="text-[11px] text-slate-500">{c.hospital} ({c.admissionDate})</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {c.status}
                          </span>
                          <p className="text-[11px] font-bold text-slate-700 mt-0.5 font-mono">
                            দাবি: ৳ {c.claimAmount}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-4 text-center">কোনো সক্রিয় চিকিৎসা বা দুর্ঘটনা দাবি নেই।</p>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DIGITAL ID CARD (Realistic Front & Back) */}
        {activeTab === 'id-card' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">অফিসিয়াল ডিজিটাল সদস্য পরিচয়পত্র</h3>
                <p className="text-xs text-slate-500">হাইওয়ে পুলিশ, হাসপাতাল ও তল্লাশি চৌকিতে প্রদর্শনের জন্য অনুমোদিত</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট করুন</span>
                </button>
              </div>
            </div>

            {/* CARD CONTAINER (Front & Back Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* CARD FRONT */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 text-white shadow-2xl border-2 border-emerald-500/50 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
                {/* Background Watermark Stamp */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  <div className="w-64 h-64 rounded-full border-8 border-white" />
                </div>

                {/* Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-emerald-700/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center">
                        <span className="font-black text-emerald-800 text-xs">DWF</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold tracking-tight">ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন</h4>
                        <p className="text-[9px] text-emerald-300">DRIVERS WELFARE FOUNDATION</p>
                      </div>
                    </div>
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                      সদস্য কার্ড
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="mt-4 flex gap-4 items-center">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-20 h-24 rounded-xl object-cover border-2 border-emerald-400 shadow-md shrink-0"
                    />
                    <div className="space-y-1 text-xs">
                      <h3 className="font-bold text-base text-white">{member.nameBn}</h3>
                      <p className="text-emerald-200 text-[11px] font-medium">{member.name}</p>
                      <p className="text-slate-300 text-[11px]">পেশা: {member.profession}</p>
                      <p className="text-slate-300 text-[11px]">
                        লাইসেন্স: <span className="font-mono text-white font-bold">{member.drivingLicenseNo}</span>
                      </p>
                      <div className="pt-1 flex items-center gap-2 text-[11px]">
                        <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 font-bold">
                          রক্ত: {member.bloodGroup}
                        </span>
                        <span className="text-emerald-300 font-mono text-[10px]">
                          মেয়াদ: {member.healthCardExpiry}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Front Footer */}
                <div className="mt-4 pt-3 border-t border-emerald-700/80 flex items-center justify-between text-[10px]">
                  <div>
                    <p className="font-bold text-white text-xs font-mono">{member.memberId}</p>
                    <p className="text-emerald-300">ডিজিটাল ভেরিফাইড আইডি</p>
                  </div>
                  <div className="w-11 h-11 bg-white p-1 rounded shadow">
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-[7px] text-white font-mono font-bold text-center leading-tight">
                      DWF<br/>VERIFY
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD BACK */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white shadow-2xl border-2 border-slate-700 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
                <div>
                  <div className="border-b border-slate-700 pb-2 flex justify-between items-center text-[10px] text-emerald-400 font-bold">
                    <span>জাতীয় প্রাতিষ্ঠানিক চালক ডাটাবেস</span>
                    <span>DWF-RULES-2026</span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs text-slate-300">
                    <p className="text-[11px]">
                      এনআইডি নম্বর: <span className="font-mono text-white font-bold">{member.nid}</span>
                    </p>
                    <p className="text-[11px]">
                      যানবাহনের রেজি নং: <span className="font-mono text-white">{member.vehicleRegNo}</span>
                    </p>
                    <p className="text-[11px]">
                      জরুরি যোগাযোগ: <span className="font-mono text-emerald-300 font-bold">{member.phone}</span>
                    </p>
                    <p className="text-[11px]">
                      অনুমোদিত শাখা: <span className="text-white">{member.branchName}</span>
                    </p>
                  </div>

                  <div className="mt-4 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[10px] text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-300">নির্দেশনাবলী:</p>
                    <p>১. এই কার্ডটি হস্তান্তরযোগ্য নহে এবং সর্বদা সাথে রাখা আবশ্যক।</p>
                    <p>২. কার্ড হারিয়ে গেলে অবিলম্বে নিকটস্থ শাখা বা ১৬৭৮৯ নম্বরে জানান।</p>
                  </div>
                </div>

                {/* Back Footer */}
                <div className="mt-4 pt-3 border-t border-slate-700 text-center text-[10px] text-slate-400">
                  <p className="font-bold text-white">সুরক্ষিত চালক – নিরাপদ সড়ক</p>
                  <p>হেড অফিস: পরিবহন ভবন, বিজয়নগর, ঢাকা | www.dwf-bd.org</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: HEALTH PROTECTION CARD */}
        {activeTab === 'health-card' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">ডিজিটাল স্বাস্থ্য সুরক্ষা কার্ড (Health Card)</h3>
                <p className="text-xs text-slate-500">অনুমোদিত হাসপাতাল ও ডায়াগনস্টিক সেন্টারে ৫০% পর্যন্ত ছাড়ের নিশ্চয়তা</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট হেলথ কার্ড</span>
              </button>
            </div>

            {/* Health Card View */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-900 via-rose-950 to-slate-950 text-white shadow-2xl border-2 border-rose-500/60 relative overflow-hidden space-y-6">
              <div className="flex justify-between items-start border-b border-rose-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center">
                    <HeartPulse className="w-6 h-6 text-rose-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">ড্রাইভার্স ডিজিটাল স্বাস্থ্য সুরক্ষা কার্ড</h3>
                    <p className="text-xs text-rose-300">DWF NATIONAL HEALTH SHIELD</p>
                  </div>
                </div>
                <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                  HEALTH PASS
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-24 h-28 rounded-2xl object-cover border-2 border-rose-400 shadow-lg shrink-0"
                />
                <div className="space-y-1.5 text-xs text-center sm:text-left">
                  <h4 className="text-lg font-bold text-white">{member.nameBn}</h4>
                  <p className="text-rose-200">
                    স্বাস্থ্য কার্ড নম্বর: <span className="font-mono font-bold text-white">{member.healthCardNo}</span>
                  </p>
                  <p className="text-slate-300">
                    সদস্য আইডি: <span className="font-mono text-white">{member.memberId}</span>
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <span className="bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-700 font-bold text-rose-300">
                      রক্তের গ্রুপ: {member.bloodGroup}
                    </span>
                    <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300">
                      মেয়াদ: {member.healthCardExpiry}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-rose-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="text-center sm:text-left text-slate-300 text-[11px]">
                  <p className="font-bold text-white">জরুরি মেডিকেল সাপোর্ট হেল্পলাইন: ১৬৭৮৯</p>
                  <p>হাসপাতাল বিল অনুদান প্রতি বছরে সর্বোচ্চ ৳ ৫০,০০০ পর্যন্ত</p>
                </div>
                <div className="w-12 h-12 bg-white p-1 rounded shadow shrink-0 flex items-center justify-center">
                  <span className="font-mono text-[8px] text-rose-950 font-bold text-center">HEALTH<br/>QR-OK</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PAYMENTS & FINANCIAL STATEMENT */}
        {activeTab === 'payments' && (
          <div className="space-y-8">
            {/* Pay Monthly Fee Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">অনলাইন চাঁদা ও তহবিল জমা দিন</h3>
                  <p className="text-xs text-slate-500">বিকাশ, নগদ, রকেট, ব্যাংক অথবা কাউন্টারে জমা দিয়ে তাৎক্ষণিক রসিদ গ্রহণ করুন</p>
                </div>
              </div>

              {paymentSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{paymentSuccess}</span>
                </div>
              )}

              <form onSubmit={handleProcessPayment} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পরিশোধের ধরন</label>
                  <select
                    value={payType}
                    onChange={(e) => setPayType(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option value="MONTHLY_CONTRIBUTION">মাসিক চাঁদা (৩০০ টাকা)</option>
                    <option value="HALF_YEARLY">অর্ধবার্ষিক অগ্রিম (১৮০০ টাকা)</option>
                    <option value="ANNUAL">বাৎসরিক এককালীন (৩৬০০ টাকা)</option>
                    <option value="ADDITIONAL_INVESTMENT">অতিরিক্ত কল্যাণ বিনিয়োগ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">জমার পরিমাণ (টাকা) *</label>
                  <input
                    type="number"
                    min="300"
                    step="100"
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="BKASH">bKash (বিকাশ ওয়ালেট)</option>
                    <option value="NAGAD">Nagad (নগদ)</option>
                    <option value="ROCKET">Rocket (রকেট)</option>
                    <option value="BANK">Bank Transfer (সরাসরি ব্যাংক)</option>
                    <option value="MANUAL">কাউন্টার নগদ ক্যাশ</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">ট্রানজেকশন আইডি (TxnID) / ক্যাশ ভাউচার</label>
                  <input
                    type="text"
                    placeholder="যেমন: BKASH9A887BC2 অথবা কাউন্টার মেমো"
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div className="sm:col-span-1 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm"
                  >
                    পেমেন্ট নিশ্চিত করুন
                  </button>
                </div>
              </form>
            </div>

            {/* Financial Ledger Statement Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">আমার আর্থিক লেনদেন খতিয়ান (Ledger Statement)</h3>
                  <p className="text-xs text-slate-500">সম্পূর্ণ স্বচ্ছ ও অপরিবর্তনীয় ডিজিটাল খতিয়ান</p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  সর্বমোট জমা: ৳ {member.totalDeposit.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                      <th className="p-3 font-semibold">রসিদ নম্বর</th>
                      <th className="p-3 font-semibold">তারিখ</th>
                      <th className="p-3 font-semibold">বিবরণ</th>
                      <th className="p-3 font-semibold">মাধ্যম</th>
                      <th className="p-3 font-semibold">ট্রানজেকশন</th>
                      <th className="p-3 font-semibold text-right">পরিমাণ (টাকা)</th>
                      <th className="p-3 font-semibold text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {myPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-emerald-800">{p.receiptNo}</td>
                        <td className="p-3 text-slate-600">{p.date}</td>
                        <td className="p-3 text-slate-800">{p.remarks || p.paymentType}</td>
                        <td className="p-3 font-semibold">{p.paymentMethod}</td>
                        <td className="p-3 font-mono text-slate-500">{p.transactionId}</td>
                        <td className="p-3 font-mono font-bold text-slate-900 text-right">৳ {p.amount}</td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MEDICAL ASSISTANCE CLAIMS */}
        {activeTab === 'medical' && (
          <div className="space-y-8">
            {/* New Medical Claim Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-3 bg-rose-100 text-rose-800 rounded-2xl">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">নতুন চিকিৎসা সহায়তা অনুদানের আবেদন</h3>
                  <p className="text-xs text-slate-500">হাসপাতালে ভর্তি বা বড় অপারেশনের খরচের বিপরীতে সর্বোচ্চ ৫০,০০০ টাকা পর্যন্ত অনুদান</p>
                </div>
              </div>

              {medSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{medSuccess}</span>
                </div>
              )}

              <form onSubmit={handleMedicalSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">হাসপাতাল / ক্লিনিকের নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল"
                    value={medHospital}
                    onChange={(e) => setMedHospital(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">রোগ বা জটিলতার বিবরণ *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: অ্যাপেন্ডিক্স অপারেশন বা হৃদরোগ চিকিৎসা"
                    value={medReason}
                    onChange={(e) => setMedReason(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ভর্তির তারিখ</label>
                  <input
                    type="date"
                    value={medAdmission}
                    onChange={(e) => setMedAdmission(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">রিলিজ / ডিসচার্জ তারিখ</label>
                  <input
                    type="date"
                    value={medDischarge}
                    onChange={(e) => setMedDischarge(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">হাসপাতালের মোট বিল (টাকা)</label>
                  <input
                    type="number"
                    value={medBill}
                    onChange={(e) => setMedBill(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">দাবিকৃত সহায়তা পরিমাণ (টাকা) *</label>
                  <input
                    type="number"
                    max="50000"
                    value={medClaimAmount}
                    onChange={(e) => setMedClaimAmount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-rose-700"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm"
                  >
                    চিকিৎসা অনুদানের দাবি জমা দিন
                  </button>
                </div>
              </form>
            </div>

            {/* Claims History List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
              <h3 className="text-base font-bold text-slate-900">আমার বিগত চিকিৎসা দাবিসমূহ</h3>
              <div className="space-y-3">
                {myMedicalClaims.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-rose-800">{c.claimNo}</span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          {c.status}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 mt-1">{c.diseaseReason}</p>
                      <p className="text-slate-500 text-[11px]">{c.hospital} • {c.admissionDate}</p>
                      {c.reviewNotes && (
                        <p className="text-[11px] text-emerald-800 mt-1 bg-emerald-50 p-2 rounded">
                          মন্তব্য: {c.reviewNotes}
                        </p>
                      )}
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-slate-500">দাবিকৃত: ৳ {c.claimAmount}</p>
                      {c.approvedAmount && (
                        <p className="text-sm font-black text-emerald-800 font-mono">
                          অনুমোদিত: ৳ {c.approvedAmount}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ACCIDENT ASSISTANCE */}
        {activeTab === 'accident' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">সড়ক দুর্ঘটনা সহায়তা ও পুনর্বাসন আবেদন</h3>
                  <p className="text-xs text-slate-500">অনাকাঙ্ক্ষিত দুর্ঘটনায় তাৎক্ষণিক চিকিৎসা খরচ ও আর্থিক ক্ষতিপূরণ সেল</p>
                </div>
              </div>

              {accSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{accSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAccidentSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">দুর্ঘটনার তারিখ</label>
                  <input
                    type="date"
                    value={accDate}
                    onChange={(e) => setAccDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">দুর্ঘটনার স্থান *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ঢাকা-মাওয়া এক্সপ্রেসওয়ে, শ্রীনগর"
                    value={accLocation}
                    onChange={(e) => setAccLocation(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">আঘাতের তীব্রতা</label>
                  <select
                    value={accInjury}
                    onChange={(e) => setAccInjury(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="MINOR">সাধারণ আঘাত (Minor)</option>
                    <option value="SEVERE">গুরুতর ফ্র্যাকচার বা অস্ত্রোপচার (Severe)</option>
                    <option value="PERMANENT_DISABILITY">স্থায়ী অঙ্গহানি (Permanent Disability)</option>
                    <option value="FATAL">মৃত্যুজনিত পরিবার সহায়তা (Fatal Nominee Claim)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">চিকিৎসাধীন হাসপাতাল *</label>
                  <input
                    type="text"
                    required
                    placeholder="হাসপাতালের নাম"
                    value={accHospital}
                    onChange={(e) => setAccHospital(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">থানার জিডি / পুলিশ রিপোর্ট নম্বর (যদি থাকে)</label>
                  <input
                    type="text"
                    placeholder="যেমন: GD-491/2026"
                    value={accPoliceReport}
                    onChange={(e) => setAccPoliceReport(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">দাবিকৃত সহায়তার পরিমাণ (টাকা) *</label>
                  <input
                    type="number"
                    value={accClaimAmount}
                    onChange={(e) => setAccClaimAmount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-amber-700"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm"
                  >
                    দুর্ঘটনা সহায়তার আবেদন দাখিল
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 7: NOMINEE MANAGEMENT */}
        {activeTab === 'nominees' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">নমিনি তথ্য ও অনুপাত হালনাগাদ</h3>
                  <p className="text-xs text-slate-500">আইনি সুরক্ষা নিশ্চিত করতে সকল নমিনির শতকরা সমষ্টি ঠিক ১০০% হতে হবে</p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg font-mono ${
                    localNominees.reduce((s, n) => s + (Number(n.percentage) || 0), 0) === 100
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  মোট: {localNominees.reduce((s, n) => s + (Number(n.percentage) || 0), 0)}% / 100%
                </span>
              </div>

              {nomineeMsg && (
                <div
                  className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                    nomineeMsg.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-red-50 border border-red-300 text-red-800'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{nomineeMsg.text}</span>
                </div>
              )}

              <div className="space-y-4">
                {localNominees.map((nom, idx) => (
                  <div key={nom.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-800">নমিনি #{idx + 1}</span>
                      {localNominees.length > 1 && (
                        <button
                          onClick={() => setLocalNominees(localNominees.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
                        >
                          মুছে ফেলুন
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-600 mb-1">নাম</label>
                        <input
                          type="text"
                          value={nom.name}
                          onChange={(e) => {
                            const up = [...localNominees];
                            up[idx].name = e.target.value;
                            setLocalNominees(up);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1">সম্পর্ক</label>
                        <input
                          type="text"
                          value={nom.relationship}
                          onChange={(e) => {
                            const up = [...localNominees];
                            up[idx].relationship = e.target.value;
                            setLocalNominees(up);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1">শতকরা অংশ (%)</label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={nom.percentage}
                          onChange={(e) => {
                            const up = [...localNominees];
                            up[idx].percentage = Number(e.target.value);
                            setLocalNominees(up);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-emerald-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => {
                    if (localNominees.length < 3) {
                      setLocalNominees([
                        ...localNominees,
                        {
                          id: `nom-${Date.now()}`,
                          name: '',
                          relationship: 'সন্তান',
                          nid: '',
                          mobile: '',
                          address: '',
                          percentage: 0
                        }
                      ]);
                    }
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  + নতুন নমিনি যোগ করুন
                </button>

                <button
                  onClick={handleSaveNominees}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm"
                >
                  পরিবর্তন সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: PROFILE DETAILS */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-3xl mx-auto space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              সদস্য প্রোফাইল ও ড্রাইভিং বিবরণ
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">পূর্ণ নাম:</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{member.nameBn} ({member.name})</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">সদস্য আইডি:</span>
                <p className="font-mono font-bold text-emerald-800 text-sm mt-0.5">{member.memberId}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">জাতীয় পরিচয়পত্র (NID):</span>
                <p className="font-mono font-bold text-slate-900 mt-0.5">{member.nid}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">ড্রাইভিং লাইসেন্স নং:</span>
                <p className="font-mono font-bold text-slate-900 mt-0.5">{member.drivingLicenseNo}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">লাইসেন্স টাইপ:</span>
                <p className="font-bold text-slate-800 mt-0.5">{member.licenseType}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">চালিত গাড়ি ও রেজি:</span>
                <p className="font-bold text-slate-800 mt-0.5">{member.vehicleType} — {member.vehicleRegNo}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl sm:col-span-2">
                <span className="text-slate-500">বর্তমান ঠিকানা:</span>
                <p className="text-slate-800 mt-0.5">{member.currentAddress}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl sm:col-span-2">
                <span className="text-slate-500">স্থায়ী ঠিকানা:</span>
                <p className="text-slate-800 mt-0.5">{member.permanentAddress}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
