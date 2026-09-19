import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { ProfileUpdateRequest, Nominee } from '../../types/dwf';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Eye, 
  ArrowRight, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Camera, 
  X, 
  UserCog,
  Check,
  Ban
} from 'lucide-react';

export const ProfileRequestsManager: React.FC = () => {
  const { 
    profileUpdateRequests, 
    approveProfileUpdateRequest, 
    rejectProfileUpdateRequest 
  } = useDwf();

  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ProfileUpdateRequest | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Filtered requests
  const filtered = profileUpdateRequests.filter((req) => {
    const matchesStatus = filterStatus === 'ALL' || req.status === filterStatus;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = 
      !query || 
      req.memberId.toLowerCase().includes(query) || 
      req.requestId.toLowerCase().includes(query) || 
      req.memberName.toLowerCase().includes(query) || 
      req.memberNameBn.includes(query);
    return matchesStatus && matchesSearch;
  });

  const pendingCount = profileUpdateRequests.filter(r => r.status === 'PENDING').length;
  const approvedCount = profileUpdateRequests.filter(r => r.status === 'APPROVED').length;
  const rejectedCount = profileUpdateRequests.filter(r => r.status === 'REJECTED').length;

  const handleApprove = (req: ProfileUpdateRequest) => {
    const res = approveProfileUpdateRequest(req.id, reviewNote.trim() || 'সকল তথ্য ও ছবি সফলভাবে যাচাইপূর্বক ডাটাবেসে অনুমোদিত');
    if (res.success) {
      setActionSuccess(res.message);
      setSelectedRequest(null);
      setReviewNote('');
      setTimeout(() => setActionSuccess(null), 4000);
    }
  };

  const handleReject = (req: ProfileUpdateRequest) => {
    const res = rejectProfileUpdateRequest(req.id, reviewNote.trim() || 'প্রয়োজনীয় কাগজপত্রে অসঙ্গতির কারণে বাতিল করা হলো');
    if (res.success) {
      setActionSuccess(res.message);
      setSelectedRequest(null);
      setReviewNote('');
      setTimeout(() => setActionSuccess(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <UserCog className="w-6 h-6 text-emerald-400" />
            <span>সদস্য প্রোফাইল ও নমিনি পরিবর্তন আবেদন সেল</span>
          </h2>
          <p className="text-xs text-slate-400">
            সদস্য কর্তৃক নিজ প্রোফাইল ছবি, নাম, রক্তের গ্রুপ বা নমিনি পরিবর্তনের প্রস্তাবনা যাচাই ও অনুমোদন
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-700 text-amber-300 text-xs font-bold font-mono animate-pulse">
            অপেক্ষমান আবেদন: {pendingCount} টি
          </div>
        )}
      </div>

      {/* Success Banner */}
      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterStatus('PENDING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterStatus === 'PENDING'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-white'
            }`}
          >
            অপেক্ষমান ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-white'
            }`}
          >
            সবগুলো ({profileUpdateRequests.length})
          </button>
          <button
            onClick={() => setFilterStatus('APPROVED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterStatus === 'APPROVED'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-white'
            }`}
          >
            অনুমোদিত ({approvedCount})
          </button>
          <button
            onClick={() => setFilterStatus('REJECTED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterStatus === 'REJECTED'
                ? 'bg-red-700 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-white'
            }`}
          >
            বাতিল ({rejectedCount})
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="সদস্য আইডি / নাম / আবেদন আইডি..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Requests Table / Card List */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            কোনো আবেদন পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                  <th className="p-3.5 font-bold">আবেদন আইডি ও তারিখ</th>
                  <th className="p-3.5 font-bold">সদস্য তথ্য</th>
                  <th className="p-3.5 font-bold">পরিবর্তিত বিষয়সমূহ</th>
                  <th className="p-3.5 font-bold">কারণ / নোট</th>
                  <th className="p-3.5 font-bold text-center">স্ট্যাটাস</th>
                  <th className="p-3.5 font-bold text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.map((req) => {
                  const changedKeys = Object.keys(req.requestedChanges);
                  return (
                    <tr key={req.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3.5 align-middle">
                        <div className="font-mono font-bold text-emerald-400">{req.requestId}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{req.submittedAt}</span>
                        </div>
                      </td>

                      <td className="p-3.5 align-middle">
                        <div className="font-bold text-white">{req.memberNameBn}</div>
                        <div className="text-[11px] text-slate-400">{req.memberName}</div>
                        <div className="font-mono text-[10px] text-slate-500 mt-0.5">আইডি: {req.memberId}</div>
                      </td>

                      <td className="p-3.5 align-middle">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {changedKeys.map((key) => (
                            <span 
                              key={key} 
                              className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-850 text-slate-300 border border-slate-750"
                            >
                              {key === 'nameBn' ? 'বাংলা নাম' :
                               key === 'name' ? 'ইংরেজি নাম' :
                               key === 'photoUrl' ? 'ছবি পরিবর্তন' :
                               key === 'phone' ? 'মোবাইল' :
                               key === 'bloodGroup' ? 'রক্তের গ্রুপ' :
                               key === 'nominees' ? 'নমিনি তালিকা' :
                               key === 'currentAddress' ? 'বর্তমান ঠিকানা' :
                               key === 'permanentAddress' ? 'স্থায়ী ঠিকানা' :
                               key === 'drivingLicenseNo' ? 'লাইসেন্স' :
                               key === 'vehicleRegNo' ? 'গাড়ির রেজি' : key}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-3.5 align-middle max-w-xs text-[11px] text-slate-400 truncate" title={req.reason}>
                        {req.reason || '—'}
                      </td>

                      <td className="p-3.5 align-middle text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase inline-flex items-center gap-1 ${
                          req.status === 'APPROVED'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : req.status === 'REJECTED'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {req.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
                          {req.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                          {req.status === 'PENDING' && <Clock className="w-3 h-3 animate-spin" />}
                          <span>{req.status}</span>
                        </span>
                      </td>

                      <td className="p-3.5 align-middle text-right">
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                            setReviewNote(req.reviewNotes || '');
                          }}
                          className="px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 ml-auto cursor-pointer shadow"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>যাচাই ও রিভিউ</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* REVIEW & APPROVAL COMPARISON MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="bg-slate-900 border-2 border-emerald-600/80 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">প্রোফাইল পরিবর্তন আবেদন যাচাই ও অনুমোদন</h3>
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-700/80 px-2 py-0.5 rounded">
                    {selectedRequest.requestId}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  সদস্য: {selectedRequest.memberNameBn} ({selectedRequest.memberId}) • আবেদনের তারিখ: {selectedRequest.submittedAt}
                </p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content / Comparison View */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1">
              
              {/* Member Reason */}
              {selectedRequest.reason && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  <strong className="text-emerald-400">সদস্যের লিখিত কারণ:</strong> {selectedRequest.reason}
                </div>
              )}

              {/* Photo Change Comparison */}
              {selectedRequest.requestedChanges.photoUrl && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Camera className="w-4 h-4" />
                    <span>প্রোফাইল ছবি পরিবর্তন প্রস্তাবনা</span>
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-400 font-semibold">বর্তমান ডাটাবেস ছবি</div>
                      <img
                        src={selectedRequest.currentData.photoUrl}
                        alt="Current"
                        referrerPolicy="no-referrer"
                        className="w-24 h-28 mx-auto rounded-xl object-cover border border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-[11px] text-emerald-400 font-semibold">নতুন প্রস্তাবিত ছবি</div>
                      <img
                        src={selectedRequest.requestedChanges.photoUrl}
                        alt="Proposed"
                        referrerPolicy="no-referrer"
                        className="w-24 h-28 mx-auto rounded-xl object-cover border-2 border-emerald-500 shadow-md"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Fields Diff Table */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider">
                  তথ্য তুলনা (বর্তমান ডাটাবেস বনাম প্রস্তাবিত তথ্য)
                </h4>

                <div className="space-y-2">
                  {/* Name BN */}
                  {selectedRequest.requestedChanges.nameBn && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">নাম (বাংলা) - পূর্ববর্তী:</span>
                        <span className="text-slate-300 font-semibold">{selectedRequest.currentData.nameBn}</span>
                      </div>
                      <div className="border-t sm:border-t-0 sm:border-l sm:border-slate-800 pt-1 sm:pt-0 sm:pl-2">
                        <span className="text-emerald-400 block text-[10px]">নাম (বাংলা) - নতুন প্রস্তাবিত:</span>
                        <span className="text-emerald-300 font-bold">{selectedRequest.requestedChanges.nameBn}</span>
                      </div>
                    </div>
                  )}

                  {/* Name EN */}
                  {selectedRequest.requestedChanges.name && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">নাম (ইংরেজি) - পূর্ববর্তী:</span>
                        <span className="text-slate-300 font-semibold">{selectedRequest.currentData.name}</span>
                      </div>
                      <div className="border-t sm:border-t-0 sm:border-l sm:border-slate-800 pt-1 sm:pt-0 sm:pl-2">
                        <span className="text-emerald-400 block text-[10px]">নাম (ইংরেজি) - নতুন প্রস্তাবিত:</span>
                        <span className="text-emerald-300 font-bold">{selectedRequest.requestedChanges.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {selectedRequest.requestedChanges.phone && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">মোবাইল - পূর্ববর্তী:</span>
                        <span className="text-slate-300 font-mono">{selectedRequest.currentData.phone}</span>
                      </div>
                      <div className="border-t sm:border-t-0 sm:border-l sm:border-slate-800 pt-1 sm:pt-0 sm:pl-2">
                        <span className="text-emerald-400 block text-[10px]">মোবাইল - নতুন প্রস্তাবিত:</span>
                        <span className="text-emerald-300 font-mono font-bold">{selectedRequest.requestedChanges.phone}</span>
                      </div>
                    </div>
                  )}

                  {/* Blood Group */}
                  {selectedRequest.requestedChanges.bloodGroup && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">রক্তের গ্রুপ - পূর্ববর্তী:</span>
                        <span className="text-slate-300">{selectedRequest.currentData.bloodGroup}</span>
                      </div>
                      <div className="border-t sm:border-t-0 sm:border-l sm:border-slate-800 pt-1 sm:pt-0 sm:pl-2">
                        <span className="text-emerald-400 block text-[10px]">রক্তের গ্রুপ - নতুন:</span>
                        <span className="text-rose-400 font-bold">{selectedRequest.requestedChanges.bloodGroup}</span>
                      </div>
                    </div>
                  )}

                  {/* Current Address */}
                  {selectedRequest.requestedChanges.currentAddress && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">বর্তমান ঠিকানা - পূর্ববর্তী:</span>
                        <span className="text-slate-300">{selectedRequest.currentData.currentAddress}</span>
                      </div>
                      <div className="border-t sm:border-t-0 sm:border-l sm:border-slate-800 pt-1 sm:pt-0 sm:pl-2">
                        <span className="text-emerald-400 block text-[10px]">বর্তমান ঠিকানা - নতুন প্রস্তাবিত:</span>
                        <span className="text-emerald-300 font-bold">{selectedRequest.requestedChanges.currentAddress}</span>
                      </div>
                    </div>
                  )}

                  {/* Permanent Address */}
                  {selectedRequest.requestedChanges.permanentAddress && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">স্থায়ী ঠিকানা - পূর্ববর্তী:</span>
                        <span className="text-slate-300">{selectedRequest.currentData.permanentAddress}</span>
                      </div>
                      <div className="border-t sm:border-t-0 sm:border-l sm:border-slate-800 pt-1 sm:pt-0 sm:pl-2">
                        <span className="text-emerald-400 block text-[10px]">স্থায়ী ঠিকানা - নতুন প্রস্তাবিত:</span>
                        <span className="text-emerald-300 font-bold">{selectedRequest.requestedChanges.permanentAddress}</span>
                      </div>
                    </div>
                  )}

                  {/* Vehicle Reg No */}
                  {selectedRequest.requestedChanges.vehicleRegNo && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">গাড়ির রেজি নম্বর - পূর্ববর্তী:</span>
                        <span className="text-slate-300">{selectedRequest.currentData.vehicleRegNo}</span>
                      </div>
                      <div className="border-t sm:border-t-0 sm:border-l sm:border-slate-800 pt-1 sm:pt-0 sm:pl-2">
                        <span className="text-emerald-400 block text-[10px]">গাড়ির রেজি নম্বর - নতুন:</span>
                        <span className="text-emerald-300 font-bold">{selectedRequest.requestedChanges.vehicleRegNo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Nominees Comparison */}
              {selectedRequest.requestedChanges.nominees && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider">
                    নমিনি তালিকা পরিবর্তন প্রস্তাবনা (মোট অংশ ১০০%)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <span className="text-slate-400 font-bold block">পূর্ববর্তী নমিনি তালিকা:</span>
                      {selectedRequest.currentData.nominees.map((nom, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="font-bold text-white">{nom.name} ({nom.relationship})</div>
                          <div className="text-[11px] text-slate-400">অংশ: {nom.percentage}% • {nom.mobile}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <span className="text-emerald-400 font-bold block">নতুন প্রস্তাবিত নমিনি তালিকা:</span>
                      {selectedRequest.requestedChanges.nominees.map((nom, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                          <div className="font-bold text-emerald-300">{nom.name} ({nom.relationship})</div>
                          <div className="text-[11px] text-emerald-400 font-bold">
                            অংশ: {nom.percentage}% • {nom.mobile || 'মোবাইল নেই'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Note Input */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-bold">
                  অ্যাডমিন পর্যালোচনার নোট / মন্তব্য *
                </label>
                <textarea
                  rows={2}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="অনুমোদন বা বাতিলের সুস্পষ্ট কারণ লিখুন..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                />
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer text-center"
              >
                বন্ধ করুন
              </button>

              {selectedRequest.status === 'PENDING' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReject(selectedRequest)}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Ban className="w-4 h-4" />
                    <span>আবেদন বাতিল করুন</span>
                  </button>

                  <button
                    onClick={() => handleApprove(selectedRequest)}
                    className="flex-1 sm:flex-initial px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/50"
                  >
                    <Check className="w-4 h-4" />
                    <span>অনুমোদন ও ডাটাবেস আপডেট করুন</span>
                  </button>
                </div>
              ) : (
                <span className="text-slate-400 italic text-[11px] text-center sm:text-right">
                  এই আবেদনটি ইতোমধ্যে {selectedRequest.status === 'APPROVED' ? 'অনুমোদিত' : 'বাতিল'} করা হয়েছে।
                </span>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
