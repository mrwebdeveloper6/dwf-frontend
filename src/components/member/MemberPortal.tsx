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
  Wallet,
  FolderArchive,
  UploadCloud,
  ChevronDown,
  Menu,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  TrendingUp,
  X
} from 'lucide-react';
import { PaymentMethod, PaymentType, Nominee } from '../../types/dwf';
import { WelfareImpactChart } from './WelfareImpactChart';
import { exportElementToPdf } from '../../lib/pdfExport';
import { MemberProfileEditor } from './MemberProfileEditor';

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
    storedFiles,
    setShowDocumentVaultModal,
    setActiveView 
  } = useDwf();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'impact' | 'id-card' | 'health-card' | 'payments' | 'medical' | 'accident' | 'documents' | 'nominees' | 'profile'
  >('dashboard');

  const [mobileTabMenuOpen, setMobileTabMenuOpen] = useState(false);

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

  // PDF Export States & Handlers
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfNotification, setPdfNotification] = useState<string | null>(null);

  const handleDownloadIdCardPdf = async () => {
    if (!member) return;
    setIsExportingPdf(true);
    setPdfNotification('ডিজিটাল পরিচয়পত্রের হাই-রেজুলেশন পিডিএফ প্রস্তুত হচ্ছে...');
    try {
      const ok = await exportElementToPdf('dwf-id-card-print-container', {
        fileName: `DWF-Member-ID-${member.memberId}.pdf`,
        docTitle: 'বাংলাদেশ ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন - সদস্য পরিচয়পত্র',
        subtitle: `সদস্য: ${member.nameBn} (${member.memberId})`
      });
      if (ok) {
        setPdfNotification('আইডি কার্ড পিডিএফ সফলভাবে ডাউনলোড হয়েছে!');
        setTimeout(() => setPdfNotification(null), 4000);
      } else {
        setPdfNotification('পিডিএফ তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('PDF error:', err);
      setPdfNotification('পিডিএফ তৈরিতে অপ্রত্যাশিত ত্রুটি ঘটেছে।');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadHealthCardPdf = async () => {
    if (!member) return;
    setIsExportingPdf(true);
    setPdfNotification('ডিজিটাল স্বাস্থ্য কার্ডের হাই-রেজুলেশন পিডিএফ প্রস্তুত হচ্ছে...');
    try {
      const ok = await exportElementToPdf('dwf-health-card-print-container', {
        fileName: `DWF-Health-Card-${member.memberId}.pdf`,
        docTitle: 'ড্রাইভার্স ডিজিটাল স্বাস্থ্য সুরক্ষা কার্ড (DWF Health Pass)',
        subtitle: `স্বাস্থ্য কার্ড নং: ${member.healthCardNo} | সদস্য: ${member.nameBn}`
      });
      if (ok) {
        setPdfNotification('স্বাস্থ্য কার্ড পিডিএফ সফলভাবে ডাউনলোড হয়েছে!');
        setTimeout(() => setPdfNotification(null), 4000);
      } else {
        setPdfNotification('পিডিএফ তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('PDF error:', err);
      setPdfNotification('পিডিএফ তৈরিতে অপ্রত্যাশিত ত্রুটি ঘটেছে।');
    } finally {
      setIsExportingPdf(false);
    }
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">সদস্য তথ্য পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-400">অনুগ্রহ করে পুনরায় লগইন করুন অথবা মূল পাতায় ফিরে যান।</p>
          <button
            onClick={logout}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            লগইন পেজে ফিরে যান
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
      setTimeout(() => setPaymentSuccess(''), 6000);
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
      setTimeout(() => setMedSuccess(''), 6000);
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
      setTimeout(() => setAccSuccess(''), 6000);
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

  const tabsList = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', labelEn: 'Dashboard', icon: LayoutDashboard },
    { id: 'impact', label: 'কল্যাণ প্রভাব চার্ট', labelEn: 'Welfare Impact', icon: TrendingUp },
    { id: 'id-card', label: 'ডিজিটাল আইডি কার্ড', labelEn: 'Digital ID Card', icon: CreditCard },
    { id: 'health-card', label: 'স্বাস্থ্য কার্ড', labelEn: 'Health Card', icon: HeartPulse },
    { id: 'payments', label: 'চাঁদা ও তহবিল খতিয়ান', labelEn: 'Payments & Ledger', icon: Wallet },
    { id: 'medical', label: 'চিকিৎসা দাবি', labelEn: 'Medical Claims', icon: Receipt },
    { id: 'accident', label: 'দুর্ঘটনা সহায়তা', labelEn: 'Accident Aid', icon: ShieldAlert },
    { id: 'documents', label: 'নথিপত্র ভল্ট', labelEn: 'Document Vault', icon: FolderArchive },
    { id: 'nominees', label: 'নমিনি তথ্য', labelEn: 'Nominees', icon: Users },
    { id: 'profile', label: 'আমার প্রোফাইল', labelEn: 'Profile', icon: User }
  ];

  const currentTabObj = tabsList.find(t => t.id === activeTab) || tabsList[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16 selection:bg-emerald-900 selection:text-emerald-100 font-sans">
      
      {/* Member Portal Top Nav Header - Dark Theme */}
      <header className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-30 border-b border-slate-800/90 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo & Back to Home */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div 
              onClick={() => setActiveView('home')} 
              className="cursor-pointer shrink-0 transition hover:opacity-90 py-1"
              title="মূল ওয়েবসাইটে ফিরে যান"
            >
              <DwfLogo size="sm" variant="light" className="sm:hidden" />
              <DwfLogo size="sm" variant="light" className="hidden sm:flex" />
            </div>
            <div className="border-l border-slate-800 pl-2.5 sm:pl-3 min-w-0">
              <span className="text-[11px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider block truncate">
                {language === 'bn' ? 'সদস্য পোর্টাল' : 'Member Portal'}
              </span>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">{member.branchName}</p>
            </div>
          </div>

          {/* Member Profile Avatar, ID & Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 sm:gap-2.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-800/60 cursor-pointer transition border border-transparent hover:border-slate-700/60"
              title="প্রোফাইল দেখুন"
            >
              <div className="relative shrink-0">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
              </div>
              <div className="text-left hidden xs:block sm:block max-w-[110px] sm:max-w-[150px]">
                <p className="text-xs font-bold text-white leading-none truncate">{member.nameBn}</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5 truncate">{member.memberId}</p>
              </div>
            </div>

            {/* Document Vault quick button */}
            <button
              onClick={() => setShowDocumentVaultModal(true)}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 rounded-xl transition cursor-pointer flex items-center gap-1.5"
              title="সংরক্ষিত নথিপত্র ভল্ট খুলুন"
            >
              <FolderArchive className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="hidden md:inline">{language === 'bn' ? 'নথি ভল্ট' : 'Vault'}</span>
            </button>

            {/* Logout button */}
            <button
              onClick={logout}
              className="p-2 sm:px-3 sm:py-1.5 text-slate-400 hover:text-red-400 bg-slate-850 hover:bg-red-950/40 border border-slate-800 hover:border-red-800/50 rounded-xl transition cursor-pointer flex items-center gap-1.5"
              title="লগআউট"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline text-xs">{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Responsive Body */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        
        {/* Mobile Tab Selector (Compact Dropdown on Small Screens) */}
        <div className="md:hidden mb-4 relative z-20">
          <button
            onClick={() => setMobileTabMenuOpen(!mobileTabMenuOpen)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white font-bold text-xs shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-600 text-white">
                <currentTabObj.icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">বর্তমান ট্যাব:</span>
                <p className="text-xs font-bold text-white">{currentTabObj.label}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs">
              <span>ট্যাব বদলান</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileTabMenuOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {mobileTabMenuOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 z-30 max-h-[70vh] overflow-y-auto">
              {tabsList.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setMobileTabMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop/Tablet Horizontal Tabs Bar */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-800 mb-6">
          {tabsList.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-850 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ============================================================ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Welcome Banner - Sleek Dark Emerald Gradient */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-emerald-800/60">
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase">
                      সক্রিয়
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                        সদস্য আইডি: {member.memberId}
                      </span>
                      <span className="text-[11px] text-slate-300 font-mono">
                        {member.drivingLicenseNo}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{member.nameBn}</h2>
                    <p className="text-xs text-slate-300">
                      পেশা: <span className="text-emerald-300 font-medium">{member.profession}</span> • চালিত গাড়ি: {member.vehicleType} ({member.vehicleRegNo})
                    </p>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab('id-card')}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/50"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>আইডি কার্ড</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-850 hover:bg-slate-800 text-emerald-300 text-xs font-bold rounded-xl transition border border-emerald-700/60 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>চাঁদা জমা দিন</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Core Member Metrics Grid - Responsive 1 -> 2 -> 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Card 1: Membership Status */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between hover:border-emerald-500/30 transition">
                <span className="text-xs text-slate-400 font-medium">সদস্যপদ স্থিতি ও স্বাস্থ্য কার্ড</span>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>সক্রিয় (Active)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-mono px-2 py-0.5 rounded font-bold">
                    {member.bloodGroup}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">মেয়াদ: <span className="text-slate-200 font-mono">{member.healthCardExpiry}</span></p>
              </div>

              {/* Card 2: Total Deposit */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between hover:border-emerald-500/30 transition">
                <span className="text-xs text-slate-400 font-medium">মোট জমাকৃত কল্যাণ তহবিল</span>
                <div className="mt-2">
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    ৳ {member.totalDeposit.toLocaleString('en-IN')}
                  </p>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium mt-2">মাসিক চাঁদা: ৳ {member.monthlyContribution}/মাস</p>
              </div>

              {/* Card 3: Due Amount */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between hover:border-emerald-500/30 transition">
                <span className="text-xs text-slate-400 font-medium">বকেয়া চাঁদা স্থিতি</span>
                <div className="mt-2">
                  <p className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${member.outstandingDue > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    ৳ {member.outstandingDue}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  {member.outstandingDue > 0 ? 'চলতি মাসের চাঁদা অপরিশোধিত' : 'সকল বকেয়া পরিশোধিত (আপ-টু-ডেট)'}
                </p>
              </div>

              {/* Card 4: Medical Allowance Limit */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between hover:border-emerald-500/30 transition">
                <span className="text-xs text-slate-400 font-medium">বার্ষিক চিকিৎসা অনুদান সীমা</span>
                <div className="mt-2">
                  <p className="text-2xl sm:text-3xl font-black text-rose-400 font-mono tracking-tight">
                    ৳ {member.medicalAllowanceLimit.toLocaleString('en-IN')}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">ডিজিটাল স্বাস্থ্য কার্ডের আওতাধীন</p>
              </div>

            </div>

            {/* Quick Split: Recent Payments & Claims History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Recent Payment Receipts */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-md space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-400" />
                    <span>সর্বশেষ চাঁদা জমার রসিদ</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold hover:underline cursor-pointer"
                  >
                    সকল রসিদ
                  </button>
                </div>

                <div className="space-y-2.5">
                  {myPayments.length > 0 ? (
                    myPayments.slice(0, 3).map((p) => (
                      <div key={p.id} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-slate-200 truncate">{p.remarks || p.paymentType}</p>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">{p.receiptNo} • {p.date}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-black font-mono text-emerald-400 text-sm">৳ {p.amount}</span>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">{p.paymentMethod}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-4">কোনো পূর্ববর্তী পেমেন্ট পাওয়া যায়নি</p>
                  )}
                </div>
              </div>

              {/* Claims Status Box */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-md space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-rose-400" />
                    <span>চিকিৎসা ও দুর্ঘটনা দাবি অগ্রগতি</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('medical')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold hover:underline cursor-pointer"
                  >
                    নতুন দাবি
                  </button>
                </div>

                <div className="space-y-2.5">
                  {myMedicalClaims.length > 0 ? (
                    myMedicalClaims.slice(0, 3).map((c) => (
                      <div key={c.id} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-slate-200 truncate">{c.diseaseReason}</p>
                          <p className="text-[11px] text-slate-400 truncate">{c.hospital} ({c.admissionDate})</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-block bg-emerald-950 border border-emerald-700/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {c.status}
                          </span>
                          <p className="text-[11px] font-bold text-slate-300 mt-0.5 font-mono">
                            দাবি: ৳ {c.claimAmount}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 py-4 text-center">কোনো সক্রিয় চিকিৎসা বা দুর্ঘটনা দাবি নেই।</p>
                  )}
                </div>
              </div>

            </div>

            {/* Recharts Welfare Impact Chart Section */}
            <WelfareImpactChart language={language} />

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: WELFARE IMPACT REPORT */}
        {/* ============================================================ */}
        {activeTab === 'impact' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <WelfareImpactChart language={language} />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: DIGITAL ID CARD (Responsive Holographic Dark Card) */}
        {/* ============================================================ */}
        {activeTab === 'id-card' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
            {/* Notification */}
            {pdfNotification && (
              <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>{pdfNotification}</span>
                </div>
                <button onClick={() => setPdfNotification(null)} className="text-emerald-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md">
              <div>
                <h3 className="text-base font-bold text-white">অফিসিয়াল ডিজিটাল সদস্য পরিচয়পত্র (ID Card)</h3>
                <p className="text-xs text-slate-400">হাইওয়ে পুলিশ, পরিবহন কর্তৃপক্ষ ও হাসপাতাল যাচাইয়ে অনুমোদিত</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleDownloadIdCardPdf}
                  disabled={isExportingPdf}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExportingPdf ? 'পিডিএফ তৈরি হচ্ছে...' : 'আইডি কার্ড PDF ডাউনলোড'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট</span>
                </button>
              </div>
            </div>

            {/* CARD CONTAINER (Front & Back Layout Responsive with PDF capture target) */}
            <div id="dwf-id-card-print-container" className="p-3 sm:p-6 bg-slate-950 rounded-3xl border border-slate-800/80 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CARD FRONT */}
                <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white shadow-2xl border-2 border-emerald-500/60 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                  {/* Background Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <div className="w-72 h-72 rounded-full border-8 border-white" />
                  </div>

                  {/* Header */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shrink-0">
                          <span className="font-black text-emerald-900 text-xs">DWF</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold tracking-tight text-white">ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন</h4>
                          <p className="text-[9px] text-emerald-300">DRIVERS WELFARE FOUNDATION</p>
                        </div>
                      </div>
                      <span className="bg-red-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        সদস্য কার্ড
                      </span>
                    </div>

                    {/* Body Info */}
                    <div className="mt-4 flex gap-4 items-center">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-24 sm:w-22 sm:h-26 rounded-xl object-cover border-2 border-emerald-400 shadow-md shrink-0"
                      />
                      <div className="space-y-1 text-xs min-w-0">
                        <h3 className="font-bold text-base text-white truncate">{member.nameBn}</h3>
                        <p className="text-emerald-200 text-[11px] font-medium truncate">{member.name}</p>
                        <p className="text-slate-300 text-[11px]">পেশা: {member.profession}</p>
                        <p className="text-slate-300 text-[11px] truncate">
                          লাইসেন্স: <span className="font-mono text-white font-bold">{member.drivingLicenseNo}</span>
                        </p>
                        <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/80 font-bold">
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
                  <div className="relative z-10 mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-[10px]">
                    <div>
                      <p className="font-bold text-white text-xs font-mono">{member.memberId}</p>
                      <p className="text-emerald-400">ডিজিটাল ভেরিফাইড আইডি</p>
                    </div>
                    <div className="w-11 h-11 bg-white p-1 rounded-lg shadow-md shrink-0">
                      <div className="w-full h-full bg-slate-950 flex items-center justify-center text-[7px] text-white font-mono font-bold text-center leading-tight">
                        DWF<br/>VERIFIED
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD BACK */}
                <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl border-2 border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                  <div className="relative z-10">
                    <div className="border-b border-slate-800 pb-2.5 flex justify-between items-center text-[10px] text-emerald-400 font-bold">
                      <span>জাতীয় প্রাতিষ্ঠানিক চালক ডাটাবেস</span>
                      <span className="font-mono">DWF-BD-2026</span>
                    </div>

                    <div className="mt-3.5 space-y-2 text-xs text-slate-300">
                      <p className="text-[11px]">
                        এনআইডি নম্বর: <span className="font-mono text-white font-bold">{member.nid}</span>
                      </p>
                      <p className="text-[11px]">
                        যানবাহন রেজি নং: <span className="font-mono text-white">{member.vehicleRegNo}</span>
                      </p>
                      <p className="text-[11px]">
                        জরুরি যোগাযোগ: <span className="font-mono text-emerald-300 font-bold">{member.phone}</span>
                      </p>
                      <p className="text-[11px]">
                        শাখা অফিস: <span className="text-white">{member.branchName}</span>
                      </p>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 space-y-1">
                      <p className="font-semibold text-slate-300">নির্দেশনাবলী:</p>
                      <p>১. এই কার্ডটি হস্তান্তরযোগ্য নহে এবং দায়িত্ব পালনকালে সাথে রাখা আবশ্যক।</p>
                      <p>২. কার্ড হারিয়ে গেলে অবিলম্বে নিকটস্থ শাখা বা ১৬৭৮৯ নম্বরে জানান।</p>
                    </div>
                  </div>

                  {/* Back Footer */}
                  <div className="relative z-10 mt-4 pt-3 border-t border-slate-800 text-center text-[10px] text-slate-400">
                    <p className="font-bold text-white">সুরক্ষিত চালক – নিরাপদ সড়ক</p>
                    <p>হেড অফিস: পরিবহন ভবন, বিজয়নগর, ঢাকা | www.dwf-bd.org</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: HEALTH PROTECTION CARD */}
        {/* ============================================================ */}
        {activeTab === 'health-card' && (
          <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
            {/* Notification */}
            {pdfNotification && (
              <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>{pdfNotification}</span>
                </div>
                <button onClick={() => setPdfNotification(null)} className="text-emerald-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base font-bold text-white">ডিজিটাল স্বাস্থ্য সুরক্ষা কার্ড (Health Card)</h3>
                <p className="text-xs text-slate-400">অনুমোদিত হাসপাতাল ও ডায়াগনস্টিক সেন্টারে ছাড় ও চিকিৎসা বীমা</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleDownloadHealthCardPdf}
                  disabled={isExportingPdf}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExportingPdf ? 'পিডিএফ তৈরি হচ্ছে...' : 'স্বাস্থ্য কার্ড PDF ডাউনলোড'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট</span>
                </button>
              </div>
            </div>

            {/* Health Card View Container with export ID */}
            <div id="dwf-health-card-print-container" className="p-3 sm:p-6 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-950 via-slate-950 to-slate-900 text-white shadow-2xl border-2 border-rose-600/60 relative overflow-hidden space-y-6">
                <div className="flex justify-between items-start border-b border-rose-800/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-600 p-1 flex items-center justify-center shrink-0">
                      <HeartPulse className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">ড্রাইভার্স ডিজিটাল স্বাস্থ্য সুরক্ষা কার্ড</h3>
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
                    referrerPolicy="no-referrer"
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
                      <span className="bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-700/80 font-bold text-rose-300">
                        রক্তের গ্রুপ: {member.bloodGroup}
                      </span>
                      <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                        মেয়াদ: {member.healthCardExpiry}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-rose-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="text-center sm:text-left text-slate-300 text-[11px]">
                    <p className="font-bold text-white">জরুরি মেডিকেল সাপোর্ট হেল্পলাইন: ১৬৭৮৯</p>
                    <p className="text-slate-400">হাসপাতাল বিল অনুদান প্রতি বছরে সর্বোচ্চ ৳ ৫০,০০০ পর্যন্ত</p>
                  </div>
                  <div className="w-12 h-12 bg-white p-1 rounded-lg shadow shrink-0 flex items-center justify-center">
                    <span className="font-mono text-[8px] text-rose-950 font-bold text-center leading-tight">HEALTH<br/>QR-OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: PAYMENTS & FINANCIAL STATEMENT */}
        {/* ============================================================ */}
        {activeTab === 'payments' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            {/* Pay Monthly Fee Card */}
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-2xl shrink-0">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">অনলাইন চাঁদা ও তহবিল জমা দিন</h3>
                  <p className="text-xs text-slate-400">বিকাশ, নগদ, রকেট, ব্যাংক অথবা কাউন্টারে জমা দিয়ে তাৎক্ষণিক ডিজিটাল রসিদ গ্রহণ করুন</p>
                </div>
              </div>

              {paymentSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{paymentSuccess}</span>
                </div>
              )}

              <form onSubmit={handleProcessPayment} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">পরিশোধের ধরন *</label>
                  <select
                    value={payType}
                    onChange={(e) => setPayType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="MONTHLY_CONTRIBUTION" className="bg-slate-900 text-white">মাসিক চাঁদা (৩০০ টাকা)</option>
                    <option value="HALF_YEARLY" className="bg-slate-900 text-white">অর্ধবার্ষিক অগ্রিম (১৮০০ টাকা)</option>
                    <option value="ANNUAL" className="bg-slate-900 text-white">বাৎসরিক এককালীন (৩৬০০ টাকা)</option>
                    <option value="ADDITIONAL_INVESTMENT" className="bg-slate-900 text-white">অতিরিক্ত কল্যাণ বিনিয়োগ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">জমার পরিমাণ (টাকা) *</label>
                  <input
                    type="number"
                    min="300"
                    step="100"
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono font-bold text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">পেমেন্ট মেথড *</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="BKASH" className="bg-slate-900 text-white">bKash (বিকাশ ওয়ালেট)</option>
                    <option value="NAGAD" className="bg-slate-900 text-white">Nagad (নগদ)</option>
                    <option value="ROCKET" className="bg-slate-900 text-white">Rocket (রকেট)</option>
                    <option value="BANK" className="bg-slate-900 text-white">Bank Transfer (সরাসরি ব্যাংক)</option>
                    <option value="MANUAL" className="bg-slate-900 text-white">কাউন্টার নগদ ক্যাশ</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1.5">ট্রানজেকশন আইডি (TxnID) / ক্যাশ ভাউচার</label>
                  <input
                    type="text"
                    placeholder="যেমন: BKASH9A887BC2 অথবা কাউন্টার মেমো"
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-emerald-950/50"
                  >
                    পেমেন্ট নিশ্চিত করুন
                  </button>
                </div>
              </form>
            </div>

            {/* Financial Ledger Statement Table - Responsive Horizontal Scroll */}
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">আমার আর্থিক লেনদেন খতিয়ান (Ledger Statement)</h3>
                  <p className="text-xs text-slate-400">সম্পূর্ণ স্বচ্ছ ও অপরিবর্তনীয় ডিজিটাল খতিয়ান</p>
                </div>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-lg">
                  সর্বমোট জমা: ৳ {member.totalDeposit.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                      <th className="p-3.5 font-semibold">রসিদ নম্বর</th>
                      <th className="p-3.5 font-semibold">তারিখ</th>
                      <th className="p-3.5 font-semibold">বিবরণ</th>
                      <th className="p-3.5 font-semibold">মাধ্যম</th>
                      <th className="p-3.5 font-semibold">ট্রানজেকশন</th>
                      <th className="p-3.5 font-semibold text-right">পরিমাণ (টাকা)</th>
                      <th className="p-3.5 font-semibold text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {myPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-850/50 transition">
                        <td className="p-3.5 font-mono font-bold text-emerald-400">{p.receiptNo}</td>
                        <td className="p-3.5 text-slate-400">{p.date}</td>
                        <td className="p-3.5 text-slate-200">{p.remarks || p.paymentType}</td>
                        <td className="p-3.5 font-semibold text-slate-300">{p.paymentMethod}</td>
                        <td className="p-3.5 font-mono text-slate-400">{p.transactionId}</td>
                        <td className="p-3.5 font-mono font-bold text-white text-right">৳ {p.amount}</td>
                        <td className="p-3.5 text-center">
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
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

        {/* ============================================================ */}
        {/* TAB 5: MEDICAL ASSISTANCE CLAIMS */}
        {/* ============================================================ */}
        {activeTab === 'medical' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            {/* New Medical Claim Form */}
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <div className="p-3 bg-rose-950 border border-rose-800 text-rose-400 rounded-2xl shrink-0">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">নতুন চিকিৎসা সহায়তা অনুদানের আবেদন</h3>
                  <p className="text-xs text-slate-400">হাসপাতালে ভর্তি বা বড় অপারেশনের খরচের বিপরীতে সর্বোচ্চ ৫০,০০০ টাকা পর্যন্ত অনুদান</p>
                </div>
              </div>

              {medSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{medSuccess}</span>
                </div>
              )}

              <form onSubmit={handleMedicalSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">হাসপাতাল / ক্লিনিকের নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল"
                    value={medHospital}
                    onChange={(e) => setMedHospital(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">রোগ বা জটিলতার বিবরণ *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: অ্যাপেন্ডিক্স অপারেশন বা হৃদরোগ চিকিৎসা"
                    value={medReason}
                    onChange={(e) => setMedReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">ভর্তির তারিখ</label>
                  <input
                    type="date"
                    value={medAdmission}
                    onChange={(e) => setMedAdmission(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">রিলিজ / ডিসচার্জ তারিখ</label>
                  <input
                    type="date"
                    value={medDischarge}
                    onChange={(e) => setMedDischarge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">হাসপাতালের মোট বিল (টাকা)</label>
                  <input
                    type="number"
                    value={medBill}
                    onChange={(e) => setMedBill(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono font-bold focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">দাবিকৃত সহায়তা পরিমাণ (টাকা) *</label>
                  <input
                    type="number"
                    max="50000"
                    value={medClaimAmount}
                    onChange={(e) => setMedClaimAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-rose-400 font-mono font-bold focus:border-rose-500"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md"
                  >
                    চিকিৎসা অনুদানের দাবি জমা দিন
                  </button>
                </div>
              </form>
            </div>

            {/* Claims History List */}
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white">আমার বিগত চিকিৎসা দাবিসমূহ</h3>
              <div className="space-y-3">
                {myMedicalClaims.length > 0 ? (
                  myMedicalClaims.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs flex flex-col sm:flex-row justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-rose-400">{c.claimNo}</span>
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            {c.status}
                          </span>
                        </div>
                        <p className="font-bold text-white mt-1">{c.diseaseReason}</p>
                        <p className="text-slate-400 text-[11px]">{c.hospital} • {c.admissionDate}</p>
                        {c.reviewNotes && (
                          <p className="text-[11px] text-emerald-300 mt-1.5 bg-emerald-950/60 border border-emerald-900 p-2 rounded-lg">
                            মন্তব্য: {c.reviewNotes}
                          </p>
                        )}
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-slate-400">দাবিকৃত: ৳ {c.claimAmount}</p>
                        {c.approvedAmount && (
                          <p className="text-sm font-black text-emerald-400 font-mono">
                            অনুমোদিত: ৳ {c.approvedAmount}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-4">কোনো চিকিৎসা দাবির রেকর্ড নেই</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: ACCIDENT ASSISTANCE */}
        {/* ============================================================ */}
        {activeTab === 'accident' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <div className="p-3 bg-amber-950 border border-amber-800 text-amber-400 rounded-2xl shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">সড়ক দুর্ঘটনা সহায়তা ও পুনর্বাসন আবেদন</h3>
                  <p className="text-xs text-slate-400">অনাকাঙ্ক্ষিত দুর্ঘটনায় তাৎক্ষণিক চিকিৎসা খরচ ও আর্থিক ক্ষতিপূরণ সেল</p>
                </div>
              </div>

              {accSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{accSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAccidentSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">দুর্ঘটনার তারিখ *</label>
                  <input
                    type="date"
                    value={accDate}
                    onChange={(e) => setAccDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">দুর্ঘটনার স্থান *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ঢাকা-মাওয়া এক্সপ্রেসওয়ে, শ্রীনগর"
                    value={accLocation}
                    onChange={(e) => setAccLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">আঘাতের তীব্রতা *</label>
                  <select
                    value={accInjury}
                    onChange={(e) => setAccInjury(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-semibold focus:border-amber-500"
                  >
                    <option value="MINOR" className="bg-slate-900 text-white">সাধারণ আঘাত (Minor)</option>
                    <option value="SEVERE" className="bg-slate-900 text-white">গুরুতর ফ্র্যাকচার বা অস্ত্রোপচার (Severe)</option>
                    <option value="PERMANENT_DISABILITY" className="bg-slate-900 text-white">স্থায়ী অঙ্গহানি (Permanent Disability)</option>
                    <option value="FATAL" className="bg-slate-900 text-white">মৃত্যুজনিত পরিবার সহায়তা (Fatal Nominee Claim)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">চিকিৎসাধীন হাসপাতাল *</label>
                  <input
                    type="text"
                    required
                    placeholder="হাসপাতালের নাম"
                    value={accHospital}
                    onChange={(e) => setAccHospital(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">থানার জিডি / পুলিশ রিপোর্ট নম্বর</label>
                  <input
                    type="text"
                    placeholder="যেমন: GD-491/2026 (যদি থাকে)"
                    value={accPoliceReport}
                    onChange={(e) => setAccPoliceReport(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono placeholder-slate-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">দাবিকৃত সহায়তার পরিমাণ (টাকা) *</label>
                  <input
                    type="number"
                    value={accClaimAmount}
                    onChange={(e) => setAccClaimAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono font-bold focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md"
                  >
                    দুর্ঘটনা সহায়তার আবেদন দাখিল
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: DOCUMENTS & VAULT */}
        {/* ============================================================ */}
        {activeTab === 'documents' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FolderArchive className="w-5 h-5 text-emerald-400" />
                    <span>আমার সংরক্ষিত নথিপত্র ও ক্লাউড স্টোরেজ ভল্ট</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    জাতীয় পরিচয়পত্র, ড্রাইভিং লাইসেন্স, চিকিৎসা ভাউচার ও ব্যক্তিগত ডকুমেন্টস
                  </p>
                </div>

                <button
                  onClick={() => setShowDocumentVaultModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-950/50 transition cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>নতুন ফাইল আপলোড ও ভিউ</span>
                </button>
              </div>

              {/* Document Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 flex items-center justify-center shrink-0">
                    <FolderArchive className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px]">সংরক্ষিত মোট ফাইল</div>
                    <div className="text-base font-bold text-white">
                      {storedFiles.filter(f => !f.memberId || f.memberId === member.memberId).length} টি
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800/80 text-blue-300 flex items-center justify-center shrink-0">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px]">Google Firebase Storage</div>
                    <div className="text-base font-bold text-blue-300">
                      {storedFiles.filter(f => (!f.memberId || f.memberId === member.memberId) && f.storageType === 'FIREBASE_STORAGE').length} টি নথি
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800/80 text-purple-300 flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px]">এনক্রিপ্টেড অফলাইন ভল্ট</div>
                    <div className="text-base font-bold text-purple-300">
                      {storedFiles.filter(f => (!f.memberId || f.memberId === member.memberId) && f.storageType === 'LOCAL_VAULT').length} টি নথি
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {storedFiles
                  .filter(f => !f.memberId || f.memberId === member.memberId)
                  .map((file) => (
                    <div 
                      key={file.id}
                      className="border border-slate-800 rounded-2xl p-3.5 hover:border-emerald-500/50 hover:shadow-lg transition bg-slate-950/70 flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-32 rounded-xl overflow-hidden bg-slate-900 mb-2.5 relative border border-slate-850">
                          <img 
                            src={file.url} 
                            alt={file.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-white backdrop-blur-xs border border-white/20">
                            {file.storageType === 'FIREBASE_STORAGE' ? 'Cloud' : 'Local'}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-white line-clamp-1">{file.name}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{file.description || file.category}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-2 text-xs">
                        <span className="text-[10px] text-slate-500 font-mono">{file.uploadedAt}</span>
                        <button
                          onClick={() => setShowDocumentVaultModal(true)}
                          className="text-emerald-400 font-bold hover:underline text-[11px] cursor-pointer"
                        >
                          বিস্তারিত ভিউ
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 8: NOMINEE MANAGEMENT */}
        {/* ============================================================ */}
        {activeTab === 'nominees' && (
          <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">নমিনি তথ্য ও অনুপাত হালনাগাদ</h3>
                  <p className="text-xs text-slate-400">আইনি সুরক্ষা নিশ্চিত করতে সকল নমিনির শতকরা সমষ্টি ঠিক ১০০% হতে হবে</p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg font-mono border ${
                    localNominees.reduce((s, n) => s + (Number(n.percentage) || 0), 0) === 100
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-red-950 text-red-300 border-red-800'
                  }`}
                >
                  মোট: {localNominees.reduce((s, n) => s + (Number(n.percentage) || 0), 0)}% / 100%
                </span>
              </div>

              {nomineeMsg && (
                <div
                  className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
                    nomineeMsg.type === 'success'
                      ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                      : 'bg-red-950/80 border-red-700 text-red-300'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{nomineeMsg.text}</span>
                </div>
              )}

              <div className="space-y-4">
                {localNominees.map((nom, idx) => (
                  <div key={nom.id} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="font-bold text-white">নমিনি #{idx + 1}</span>
                      {localNominees.length > 1 && (
                        <button
                          onClick={() => setLocalNominees(localNominees.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 text-xs cursor-pointer font-semibold"
                        >
                          মুছে ফেলুন
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1">নাম *</label>
                        <input
                          type="text"
                          value={nom.name}
                          onChange={(e) => {
                            const up = [...localNominees];
                            up[idx].name = e.target.value;
                            setLocalNominees(up);
                          }}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">সম্পর্ক *</label>
                        <input
                          type="text"
                          value={nom.relationship}
                          onChange={(e) => {
                            const up = [...localNominees];
                            up[idx].relationship = e.target.value;
                            setLocalNominees(up);
                          }}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">শতকরা অংশ (%) *</label>
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
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono font-bold text-emerald-400 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-2">
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
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/60 cursor-pointer text-center"
                >
                  + নতুন নমিনি যোগ করুন
                </button>

                <button
                  onClick={handleSaveNominees}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-emerald-950/50 text-center"
                >
                  পরিবর্তন সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 9: PROFILE DETAILS & UPDATE WORKFLOW (WITH ADMIN APPROVAL) */}
        {/* ============================================================ */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-200">
            <MemberProfileEditor member={member} />
          </div>
        )}

      </main>
    </div>
  );
};
