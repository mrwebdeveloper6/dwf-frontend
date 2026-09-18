import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { DwfLogo } from '../common/DwfLogo';
import { 
  Users, 
  FileCheck, 
  CreditCard, 
  Wallet, 
  HeartPulse, 
  ShieldAlert, 
  Bell, 
  FileSpreadsheet, 
  Shield, 
  LogOut, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Plus, 
  Download, 
  Eye, 
  Clock, 
  TrendingUp,
  LayoutDashboard,
  Filter,
  Check,
  X
} from 'lucide-react';
import { MembershipApplication, MedicalClaim, AccidentClaim, PaymentRecord } from '../../types/dwf';

export const AdminPanel: React.FC = () => {
  const { 
    language, 
    user, 
    logout, 
    members, 
    applications, 
    approveApplication, 
    rejectApplication, 
    payments, 
    medicalClaims, 
    updateMedicalClaimStatus, 
    accidentClaims, 
    updateAccidentClaimStatus, 
    metrics, 
    auditLogs, 
    notices, 
    smsRecords,
    setActiveView 
  } = useDwf();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'applications' | 'members' | 'payments' | 'medical' | 'accident' | 'welfare' | 'audit' | 'notices'
  >('dashboard');

  const [searchQuery, setSearchQuery] = useState('');
  const [appFilter, setAppFilter] = useState<string>('ALL');
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);
  const [selectedMedicalClaim, setSelectedMedicalClaim] = useState<MedicalClaim | null>(null);
  const [selectedAccidentClaim, setSelectedAccidentClaim] = useState<AccidentClaim | null>(null);

  // Approval Modal States
  const [approveNote, setApproveNote] = useState('');
  const [medicalApprovedAmount, setMedicalApprovedAmount] = useState<number>(20000);

  // Stats calculation
  const totalActiveMembers = members.filter(m => m.status === 'ACTIVE').length;
  const pendingApps = applications.filter(a => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW').length;
  const pendingMedical = medicalClaims.filter(m => m.status === 'SUBMITTED' || m.status === 'UNDER_REVIEW').length;
  const pendingAccidents = accidentClaims.filter(a => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW').length;
  const totalCollections = payments.reduce((sum, p) => sum + p.amount, 0);

  const handleApproveApp = (appId: string) => {
    approveApplication(appId, approveNote || 'প্রয়োজনীয় সকল নথিপত্র ও লাইসেন্স সফলভাবে যাচাইকৃত');
    setSelectedApp(null);
    setApproveNote('');
  };

  const handleRejectApp = (appId: string) => {
    rejectApplication(appId, approveNote || 'কাগজপত্রে অসঙ্গতির কারণে বাতিল করা হলো');
    setSelectedApp(null);
    setApproveNote('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Top Bar */}
      <header className="bg-slate-950 border-b border-slate-800 h-16 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveView('home')} 
            className="cursor-pointer"
            title="পাবলিক হোমপেজে যান"
          >
            <DwfLogo size="sm" variant="light" />
          </div>
          <div className="border-l border-slate-800 pl-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              DWF কেন্দ্রীয় প্রশাসনিক কন্ট্রোল প্যানেল
            </span>
            <p className="text-[11px] text-slate-400">
              অপারেটর রোল: <span className="text-emerald-400 font-mono font-bold">{user?.role}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-700">
            {user?.name}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold rounded-lg border border-red-800 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Admin Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-1 shrink-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5">
            প্রশাসনিক মডিউলসমূহ
          </div>
          {[
            { id: 'dashboard', label: 'ড্যাশবোর্ড ওভারভিউ', icon: LayoutDashboard, badge: null },
            { id: 'applications', label: 'সদস্যপদ আবেদনপত্র', icon: FileCheck, badge: pendingApps },
            { id: 'members', label: 'নিবন্ধিত চালক তালিকা', icon: Users, badge: totalActiveMembers },
            { id: 'payments', label: 'চাঁদা ও ব্যাংক খতিয়ান', icon: Wallet, badge: null },
            { id: 'medical', label: 'চিকিৎসা দাবি রিভিউ', icon: HeartPulse, badge: pendingMedical },
            { id: 'accident', label: 'দুর্ঘটনা সহায়তা সেল', icon: ShieldAlert, badge: pendingAccidents },
            { id: 'welfare', label: 'কল্যাণ তহবিল রিজার্ভ', icon: TrendingUp, badge: null },
            { id: 'audit', label: 'সিস্টেম অডিট ও লগ', icon: Shield, badge: null }
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && item.badge > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                    isActive ? 'bg-emerald-950 text-emerald-200' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
          
          {/* TAB: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">প্রশাসনিক বিশ্লেষণ ও সার্বিক পরিস্থিতি</h2>
                  <p className="text-xs text-slate-400">সদস্যসংখ্যা, দৈনিক ফান্ড সঞ্চয় ও সহায়তা অনুমোদনের রিয়েলটাইম রেকর্ড</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-lg font-mono font-bold">
                    সিস্টেম স্ট্যাটাস: অনলাইন ও সুরক্ষিত
                  </span>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">মোট সক্রিয় সদস্য</span>
                  <p className="text-2xl font-black text-emerald-400 font-mono mt-1">{totalActiveMembers}</p>
                  <p className="text-[11px] text-slate-500 mt-2">ডিজিটাল ভেরিফাইড চালক</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">অপেক্ষমাণ আবেদন</span>
                  <p className="text-2xl font-black text-amber-400 font-mono mt-1">{pendingApps}</p>
                  <p className="text-[11px] text-slate-500 mt-2">রিভিউ ও এনআইডি ভেরিফিকেশন</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">সর্বমোট জমাকৃত চাঁদা</span>
                  <p className="text-2xl font-black text-white font-mono mt-1">৳ {totalCollections.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-emerald-400 mt-2">স্বয়ংক্রিয় রসিদ ইস্যু</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">জরুরি কল্যাণ তহবিল রিজার্ভ</span>
                  <p className="text-2xl font-black text-emerald-300 font-mono mt-1">
                    ৳ {metrics.totalWelfareFund.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-2">বিতরণকৃত: ৳ {metrics.totalMedicalAssistance.toLocaleString('en-IN')}</p>
                </div>

              </div>

              {/* Recent Pending Applications Table */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-amber-400" />
                    <span>সদ্য জমাকৃত সদস্যপদ আবেদনসমূহ</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    সকল আবেদন ({applications.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="p-2.5">আবেদন আইডি</th>
                        <th className="p-2.5">আবেদনকারী</th>
                        <th className="p-2.5">মোবাইল নম্বর</th>
                        <th className="p-2.5">লাইসেন্স</th>
                        <th className="p-2.5">যানবাহন</th>
                        <th className="p-2.5">স্ট্যাটাস</th>
                        <th className="p-2.5 text-right">কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {applications.slice(0, 5).map((app) => (
                        <tr key={app.id} className="hover:bg-slate-900/60">
                          <td className="p-2.5 font-mono text-amber-300 font-bold">{app.applicationId}</td>
                          <td className="p-2.5 font-bold text-white">{app.fullName}</td>
                          <td className="p-2.5 font-mono text-slate-400">{app.phone}</td>
                          <td className="p-2.5 font-mono text-slate-300">{app.drivingLicenseNo}</td>
                          <td className="p-2.5 text-slate-400">{app.vehicleType}</td>
                          <td className="p-2.5">
                            <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                              {app.status}
                            </span>
                          </td>
                          <td className="p-2.5 text-right">
                            <button
                              onClick={() => { setSelectedApp(app); setActiveTab('applications'); }}
                              className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded text-[11px] font-bold cursor-pointer"
                            >
                              রিভিউ করুন
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Welfare Fund Allocations Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Emergency Claims Pending */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <HeartPulse className="w-4 h-4 text-rose-400" />
                    <span>চিকিৎসা ও দুর্ঘটনা সহায়তা দাবি</span>
                  </h3>
                  <div className="space-y-3">
                    {medicalClaims.map((claim) => (
                      <div key={claim.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-white">{claim.memberName} ({claim.claimNo})</p>
                          <p className="text-[11px] text-slate-400">{claim.hospital} • রোগ: {claim.diseaseReason}</p>
                        </div>
                        <div className="text-right">
                          <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                            ৳ {claim.claimAmount}
                          </span>
                          <p className="text-[10px] text-slate-400 mt-1">{claim.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Activity Stream */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>সাম্প্রতিক সিস্টেম অডিট লগ</span>
                  </h3>
                  <div className="space-y-2.5">
                    {auditLogs.slice(0, 4).map((log) => (
                      <div key={log.id} className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs">
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span className="font-mono text-emerald-400">{log.action}</span>
                          <span>{log.timestamp}</span>
                        </div>
                        <p className="text-slate-300 mt-1">{log.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: APPLICATIONS REVIEW */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">অনলাইন সদস্যপদ আবেদনপত্র ব্যবস্থাপনা</h2>
                  <p className="text-xs text-slate-400">আবেদন অনুমোদন সম্পন্ন হলে সদস্য আইডি ও স্বাস্থ্য কার্ড স্বয়ংক্রিয় তৈরি হয়</p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2">
                {['ALL', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setAppFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                      appFilter === st
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Applications List */}
              <div className="grid grid-cols-1 gap-4">
                {applications
                  .filter(a => appFilter === 'ALL' || a.status === appFilter)
                  .map((app) => (
                    <div
                      key={app.id}
                      className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-white">{app.fullName}</span>
                            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                              {app.applicationId}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            আবেদনের তারিখ: {app.submittedAt} | পেশা: {app.profession}
                          </p>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          app.status === 'APPROVED'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : app.status === 'REJECTED'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      {/* Info grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                        <div className="bg-slate-900 p-2.5 rounded-xl">
                          <span className="text-slate-500">এনআইডি নম্বর:</span>
                          <p className="font-mono font-bold text-white mt-0.5">{app.nid}</p>
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded-xl">
                          <span className="text-slate-500">ড্রাইভিং লাইসেন্স:</span>
                          <p className="font-mono font-bold text-white mt-0.5">{app.drivingLicenseNo}</p>
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded-xl">
                          <span className="text-slate-500">মোবাইল:</span>
                          <p className="font-mono text-emerald-400 mt-0.5">{app.phone}</p>
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded-xl">
                          <span className="text-slate-500">যানবাহন রেজি:</span>
                          <p className="font-mono text-white mt-0.5">{app.vehicleRegNo}</p>
                        </div>
                      </div>

                      {/* Nominees preview */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
                        <span className="text-slate-400 font-semibold">সংযুক্ত নমিনিবৃন্দ ({app.nominees.length} জন):</span>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {app.nominees.map((nom) => (
                            <span key={nom.id} className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded text-[11px]">
                              {nom.name} ({nom.relationship}) — <strong className="text-emerald-400">{nom.percentage}%</strong>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      {app.status !== 'APPROVED' && app.status !== 'REJECTED' && (
                        <div className="pt-2 flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRejectApp(app.id)}
                            className="flex items-center gap-1 px-4 py-2 bg-red-950 hover:bg-red-900 text-red-300 text-xs font-bold rounded-xl border border-red-800 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>বাতিল করুন</span>
                          </button>
                          <button
                            onClick={() => handleApproveApp(app.id)}
                            className="flex items-center gap-1 px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>অনুমোদন ও মেম্বার আইডি তৈরি</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: REGISTERED MEMBERS */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">নিবন্ধিত ড্রাইভার সদস্য রেজিস্টার</h2>
                  <p className="text-xs text-slate-400">সদস্য ডাটাবেস, ডিজিটাল আইডি ও স্বাস্থ্য কার্ড সক্রিয়করণ</p>
                </div>
                <div className="w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="নাম, আইডি বা লাইসেন্স খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                      <th className="p-3">সদস্য</th>
                      <th className="p-3">আইডি ও স্বাস্থ্য কার্ড</th>
                      <th className="p-3">লাইসেন্স</th>
                      <th className="p-3">মোবাইল</th>
                      <th className="p-3">মোট তহবিল</th>
                      <th className="p-3">বকেয়া</th>
                      <th className="p-3 text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {members
                      .filter(m => 
                        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        m.nameBn.includes(searchQuery) || 
                        m.memberId.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((m) => (
                        <tr key={m.id} className="hover:bg-slate-900/60">
                          <td className="p-3 flex items-center gap-2.5">
                            <img src={m.photoUrl} alt={m.name} className="w-8 h-8 rounded-full object-cover border border-emerald-500" />
                            <div>
                              <p className="font-bold text-white">{m.nameBn}</p>
                              <p className="text-[10px] text-slate-400">{m.profession}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <p className="font-mono font-bold text-emerald-400">{m.memberId}</p>
                            <p className="font-mono text-[10px] text-slate-400">{m.healthCardNo}</p>
                          </td>
                          <td className="p-3 font-mono text-slate-300">{m.drivingLicenseNo}</td>
                          <td className="p-3 font-mono text-slate-300">{m.phone}</td>
                          <td className="p-3 font-mono font-bold text-white">৳ {m.totalDeposit}</td>
                          <td className="p-3 font-mono font-bold text-rose-400">৳ {m.outstandingDue}</td>
                          <td className="p-3 text-center">
                            <span className="bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-800">
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PAYMENTS & FINANCIAL LEDGER */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">কেন্দ্রীয় চাঁদা ও ব্যাংক খতিয়ান</h2>
                  <p className="text-xs text-slate-400">সকল শাখা ও অনলাইন পেমেন্টের অপরিবর্তনীয় লেনদেন লগ</p>
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-xl">
                  মোট সংগ্রহ: ৳ {totalCollections.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                      <th className="p-3">রসিদ নম্বর</th>
                      <th className="p-3">সদস্য আইডি</th>
                      <th className="p-3">তারিখ</th>
                      <th className="p-3">মাধ্যম</th>
                      <th className="p-3">ট্রানজেকশন</th>
                      <th className="p-3 text-right">পরিমাণ</th>
                      <th className="p-3 text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/60">
                        <td className="p-3 font-mono font-bold text-amber-300">{p.receiptNo}</td>
                        <td className="p-3 font-mono text-emerald-400">{p.memberId}</td>
                        <td className="p-3 text-slate-400">{p.date}</td>
                        <td className="p-3 font-bold text-slate-300">{p.paymentMethod}</td>
                        <td className="p-3 font-mono text-slate-400">{p.transactionId}</td>
                        <td className="p-3 font-mono font-bold text-white text-right">৳ {p.amount}</td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-800">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: MEDICAL & ACCIDENT REVIEWS */}
          {activeTab === 'medical' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">চিকিৎসা সহায়তা আবেদন পর্যালোচনা ও ছাড়করণ</h2>
              <div className="space-y-4">
                {medicalClaims.map((c) => (
                  <div key={c.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-sm">{c.memberName}</h3>
                          <span className="text-xs font-mono font-bold text-rose-400">{c.claimNo}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{c.hospital} • {c.diseaseReason}</p>
                      </div>
                      <span className="bg-emerald-950 text-emerald-400 font-mono font-bold text-xs px-2.5 py-1 rounded border border-emerald-800">
                        দাবিকৃত: ৳ {c.claimAmount}
                      </span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                      <div>
                        <span className="text-slate-400">ভর্তি: {c.admissionDate} | ডিসচার্জ: {c.dischargeDate}</span>
                        <p className="text-slate-300 mt-0.5 font-mono">মোট বিল: ৳ {c.totalBill}</p>
                      </div>
                      {c.status === 'UNDER_REVIEW' && (
                        <button
                          onClick={() => updateMedicalClaimStatus(c.id, 'APPROVED', 20000, 'মেডিকেল বোর্ড কর্তৃক অনুমোদিত')}
                          className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg cursor-pointer"
                        >
                          ২০,০০০ টাকা অনুমোদন করুন
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">নিরাপত্তা ও অপরিবর্তনীয় অডিট ট্রেইল</h2>
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 divide-y divide-slate-800/80">
                {auditLogs.map((log) => (
                  <div key={log.id} className="py-3 text-xs flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-800 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded text-[11px]">
                          {log.action}
                        </span>
                        <span className="text-slate-400 font-semibold">{log.userName}</span>
                      </div>
                      <p className="text-slate-300 mt-1">{log.details}</p>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px] shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
