import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { Member, Nominee, ProfileUpdateRequest } from '../../types/dwf';
import { 
  User, 
  Camera, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileEdit, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Phone, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Info,
  History,
  UploadCloud
} from 'lucide-react';

interface MemberProfileEditorProps {
  member: Member;
}

export const MemberProfileEditor: React.FC<MemberProfileEditorProps> = ({ member }) => {
  const { 
    profileUpdateRequests, 
    submitProfileUpdateRequest, 
    language 
  } = useDwf();

  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [nameBn, setNameBn] = useState(member.nameBn || '');
  const [name, setName] = useState(member.name || '');
  const [phone, setPhone] = useState(member.phone || '');
  const [whatsapp, setWhatsapp] = useState(member.whatsapp || '');
  const [bloodGroup, setBloodGroup] = useState(member.bloodGroup || 'B+');
  const [photoUrl, setPhotoUrl] = useState(member.photoUrl || '');
  const [currentAddress, setCurrentAddress] = useState(member.currentAddress || '');
  const [permanentAddress, setPermanentAddress] = useState(member.permanentAddress || '');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState(member.drivingLicenseNo || '');
  const [vehicleType, setVehicleType] = useState(member.vehicleType || 'BUS');
  const [vehicleRegNo, setVehicleRegNo] = useState(member.vehicleRegNo || '');
  const [reason, setReason] = useState('');
  
  // Nominees
  const [nominees, setNominees] = useState<Nominee[]>(() => {
    return member.nominees && member.nominees.length > 0 
      ? JSON.parse(JSON.stringify(member.nominees)) 
      : [{
          id: `nom-${Date.now()}`,
          name: '',
          relationship: 'স্ত্রী',
          percentage: 100,
          mobile: '',
          address: '',
          nid: ''
        }];
  });

  // Requests for this member
  const memberRequests = profileUpdateRequests.filter(r => r.memberId === member.memberId);
  const pendingRequest = memberRequests.find(r => r.status === 'PENDING');

  // Handle Photo Upload (Base64 file reader)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('ছবির সাইজ সর্বোচ্চ ২ মেগাবাইট (MB) হতে হবে');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNomineeChange = (idx: number, field: keyof Nominee, val: any) => {
    const updated = [...nominees];
    updated[idx] = { ...updated[idx], [field]: val };
    setNominees(updated);
  };

  const addNominee = () => {
    if (nominees.length >= 3) {
      setErrorMsg('সর্বোচ্চ ৩ জন নমিনি যোগ করা যাবে');
      return;
    }
    setNominees([
      ...nominees,
      {
        id: `nom-${Date.now()}`,
        name: '',
        relationship: 'সন্তান',
        percentage: 0,
        mobile: '',
        address: '',
        nid: ''
      }
    ]);
  };

  const removeNominee = (idx: number) => {
    if (nominees.length <= 1) {
      setErrorMsg('কমপক্ষে একজন নমিনি থাকা আবশ্যক');
      return;
    }
    setNominees(nominees.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validate nominees total percentage
    const totalPercentage = nominees.reduce((acc, curr) => acc + (Number(curr.percentage) || 0), 0);
    if (totalPercentage !== 100) {
      setErrorMsg(`নমিনীদের মোট শতকরা ভাগ ১০০% হতে হবে (বর্তমানে: ${totalPercentage}%)`);
      return;
    }

    // Build requested changes object
    const requestedChanges: ProfileUpdateRequest['requestedChanges'] = {};

    if (nameBn.trim() !== member.nameBn) requestedChanges.nameBn = nameBn.trim();
    if (name.trim() !== member.name) requestedChanges.name = name.trim();
    if (phone.trim() !== member.phone) requestedChanges.phone = phone.trim();
    if (whatsapp.trim() !== (member.whatsapp || '')) requestedChanges.whatsapp = whatsapp.trim();
    if (bloodGroup !== member.bloodGroup) requestedChanges.bloodGroup = bloodGroup;
    if (photoUrl && photoUrl !== member.photoUrl) requestedChanges.photoUrl = photoUrl;
    if (currentAddress.trim() !== member.currentAddress) requestedChanges.currentAddress = currentAddress.trim();
    if (permanentAddress.trim() !== member.permanentAddress) requestedChanges.permanentAddress = permanentAddress.trim();
    if (drivingLicenseNo.trim() !== member.drivingLicenseNo) requestedChanges.drivingLicenseNo = drivingLicenseNo.trim();
    if (vehicleType !== member.vehicleType) requestedChanges.vehicleType = vehicleType;
    if (vehicleRegNo.trim() !== member.vehicleRegNo) requestedChanges.vehicleRegNo = vehicleRegNo.trim();

    // Check if nominees changed
    const nomineesChanged = JSON.stringify(nominees) !== JSON.stringify(member.nominees);
    if (nomineesChanged) {
      requestedChanges.nominees = nominees;
    }

    if (Object.keys(requestedChanges).length === 0) {
      setErrorMsg('আপনি কোনো তথ্য পরিবর্তন করেননি।');
      return;
    }

    const res = submitProfileUpdateRequest({
      memberId: member.memberId,
      memberName: member.name,
      memberNameBn: member.nameBn,
      currentData: {
        name: member.name,
        nameBn: member.nameBn,
        phone: member.phone,
        whatsapp: member.whatsapp,
        photoUrl: member.photoUrl,
        bloodGroup: member.bloodGroup,
        currentAddress: member.currentAddress,
        permanentAddress: member.permanentAddress,
        drivingLicenseNo: member.drivingLicenseNo,
        vehicleType: member.vehicleType,
        vehicleRegNo: member.vehicleRegNo,
        nominees: member.nominees || []
      },
      requestedChanges,
      reason: reason.trim() || 'সদস্য কর্তৃক নিজ উদ্যোগে প্রোফাইল তথ্য পরিবর্তন ও হালনাগাদকরণ।'
    });

    if (res.success) {
      setSuccessMsg(res.message);
      setIsEditing(false);
    } else {
      setErrorMsg('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Pending Request Notification Banner */}
      {pendingRequest && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/70 border-2 border-amber-600/70 text-amber-200 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-900/80 rounded-xl border border-amber-700 text-amber-300 shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">প্রোফাইল পরিবর্তন আবেদন পর্যালোচনায় রয়েছে</h4>
                <span className="bg-amber-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  {pendingRequest.requestId}
                </span>
              </div>
              <p className="text-xs text-amber-300/90 mt-1">
                জমার তারিখ: <span className="font-mono">{pendingRequest.submittedAt}</span> • নিরাপত্তা নীতি অনুযায়ী অ্যাডমিন যাচাই ও অনুমোদন দেওয়ার পর ডাটাবেসে তথ্য প্রতিস্থাপিত হবে।
              </p>
              {pendingRequest.reason && (
                <p className="text-[11px] text-amber-400/80 mt-1 italic">
                  পরিবর্তনের কারণ: "{pendingRequest.reason}"
                </p>
              )}
            </div>
          </div>

          <span className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-900/60 text-amber-300 border border-amber-700/80 text-xs font-bold font-mono">
            অপেক্ষমান (PENDING)
          </span>
        </div>
      )}

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={member.photoUrl}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{member.nameBn}</h3>
              <p className="text-xs text-emerald-400 font-medium">{member.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                  {member.memberId}
                </span>
                <span className="text-[11px] font-bold text-rose-400 bg-rose-950/80 border border-rose-800/80 px-2 py-0.5 rounded">
                  রক্ত: {member.bloodGroup}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setErrorMsg(null);
            }}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              isEditing
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
            }`}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                <span>সম্পাদনা বন্ধ করুন</span>
              </>
            ) : (
              <>
                <FileEdit className="w-4 h-4" />
                <span>প্রোফাইল ও নমিনি পরিবর্তন আবেদন</span>
              </>
            )}
          </button>
        </div>

        {/* Informative Notice */}
        <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">নিরাপত্তা ও যাচাইকরণ নীতি:</strong> সদস্য আইডি ও জাতীয় পরিচয়পত্রের অপব্যবহার রোধে আপনার নাম, ছবি, নমিনির নাম বা অন্যান্য তথ্যের পরিবর্তন সরাসরি ডাটাবেসে আপডেট হয় না। আপনার দাখিলকৃত আবেদন অ্যাডমিন বোর্ড যাচাই ও অনুমোদন করার সাথে সাথে ডাটাবেসে কার্যকর হবে।
          </p>
        </div>
      </div>

      {/* EDITING FORM MODAL / DRAWER */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-slate-900/95 rounded-3xl p-5 sm:p-8 border-2 border-emerald-600/70 shadow-2xl space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-emerald-400" />
                <span>প্রোফাইল তথ্য ও ছবি পরিবর্তনের আবেদন ফরম</span>
              </h3>
              <p className="text-xs text-slate-400">যেসব তথ্য পরিবর্তন করতে চান সেগুলো পূরণ করে জমা দিন</p>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-700 text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Profile Photo Upload */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Camera className="w-4 h-4" />
              <span>১. প্রোফাইল ছবি পরিবর্তন</span>
            </h4>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={photoUrl || member.photoUrl}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
                />
              </div>

              <div className="flex-1 space-y-2 w-full text-xs">
                <label className="block text-slate-300 font-semibold">ডিভাইস থেকে নতুন ছবি আপলোড করুন</label>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 px-4 py-2 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 cursor-pointer text-xs font-bold transition">
                    <UploadCloud className="w-4 h-4 text-emerald-400" />
                    <span>ছবি নির্বাচন করুন (Max 2MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {photoUrl && photoUrl !== member.photoUrl && (
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(member.photoUrl)}
                      className="text-red-400 hover:text-red-300 text-xs font-bold cursor-pointer"
                    >
                      রিসেট
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">পরিষ্কার পাসপোর্ট সাইজের ছবি আপলোড করুন (JPEG বা PNG)</p>
              </div>
            </div>
          </div>

          {/* Section 2: Personal Information */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>২. ব্যক্তিগত তথ্য পরিবর্তন</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">পূর্ণ নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">পূর্ণ নাম (ইংরেজিতে) *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">মোবাইল নম্বর *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">রক্তের গ্রুপ *</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold focus:border-emerald-500"
                >
                  <option value="A+">A+ (পজিটিভ)</option>
                  <option value="A-">A- (নেগেটিভ)</option>
                  <option value="B+">B+ (পজিটিভ)</option>
                  <option value="B-">B- (নেগেটিভ)</option>
                  <option value="O+">O+ (পজিটিভ)</option>
                  <option value="O-">O- (নেগেটিভ)</option>
                  <option value="AB+">AB+ (পজিটিভ)</option>
                  <option value="AB-">AB- (নেগেটিভ)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">ড্রাইভিং লাইসেন্স নং</label>
                <input
                  type="text"
                  value={drivingLicenseNo}
                  onChange={(e) => setDrivingLicenseNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">চালিত গাড়ির ধরণ</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                >
                  <option value="BUS">দূরপাল্লার / লোকাল বাস (Bus)</option>
                  <option value="TRUCK">ভারী ট্রাক / কাভার্ডভ্যান (Truck)</option>
                  <option value="MICROBUS">মাইক্রোবাস / প্রাইভেট কার (Car)</option>
                  <option value="CNG">সিএনজি / অটো রিকশা (Auto)</option>
                  <option value="BIKE">রাইডশেয়ারিং বাইক (Motorbike)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">গাড়ির রেজিস্ট্রেশন নম্বর</label>
                <input
                  type="text"
                  value={vehicleRegNo}
                  onChange={(e) => setVehicleRegNo(e.target.value)}
                  placeholder="যেমন: ঢাকা মেট্রো-ব ১৪-৯৮২৩"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">বর্তমান ঠিকানা *</label>
                <input
                  type="text"
                  required
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">স্থায়ী ঠিকানা *</label>
                <input
                  type="text"
                  required
                  value={permanentAddress}
                  onChange={(e) => setPermanentAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Nominee Information */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  ৩. নমিনি তথ্য পরিবর্তন ও অংশ বণ্টন
                </h4>
                <p className="text-[11px] text-slate-400">নমিনির নাম ও শতকরা অনুপাত (মোট ঠিক ১০০% হতে হবে)</p>
              </div>

              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${
                nominees.reduce((acc, n) => acc + (Number(n.percentage) || 0), 0) === 100
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-red-950 text-red-300 border-red-800'
              }`}>
                মোট: {nominees.reduce((acc, n) => acc + (Number(n.percentage) || 0), 0)}% / 100%
              </span>
            </div>

            <div className="space-y-3">
              {nominees.map((nom, idx) => (
                <div key={nom.id || idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">নমিনি #{idx + 1}</span>
                    {nominees.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNominee(idx)}
                        className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>মুছুন</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">নমিনির পুরো নাম *</label>
                      <input
                        type="text"
                        required
                        value={nom.name}
                        onChange={(e) => handleNomineeChange(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">সম্পর্ক *</label>
                      <input
                        type="text"
                        required
                        value={nom.relationship}
                        onChange={(e) => handleNomineeChange(idx, 'relationship', e.target.value)}
                        placeholder="যেমন: স্ত্রী, পুত্র, মাতা"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">অংশ শতকরা (%) *</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        required
                        value={nom.percentage}
                        onChange={(e) => handleNomineeChange(idx, 'percentage', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg font-mono font-bold text-emerald-400 focus:border-emerald-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">নমিনির মোবাইল নম্বর</label>
                      <input
                        type="text"
                        value={nom.mobile || ''}
                        onChange={(e) => handleNomineeChange(idx, 'mobile', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-emerald-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">নমিনির এনআইডি (NID)</label>
                      <input
                        type="text"
                        value={nom.nid || ''}
                        onChange={(e) => handleNomineeChange(idx, 'nid', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {nominees.length < 3 && (
                <button
                  type="button"
                  onClick={addNominee}
                  className="px-3.5 py-2 border border-dashed border-slate-700 hover:border-emerald-500 rounded-xl text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ নতুন নমিনি যোগ করুন</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 4: Reason for Change */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <label className="block text-slate-300 font-semibold">
              পরিবর্তনের কারণ বা সংক্ষেপ নোট (অ্যাডমিন পর্যালোচনার জন্য)
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="যেমন: বাসা পরিবর্তন হওয়ায় বর্তমান ঠিকানা ও নমিনির মোবাইল নম্বর পরিবর্তন প্রয়োজন..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold text-xs cursor-pointer"
            >
              বাতিল করুন
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>পরিবর্তন আবেদন দাখিল করুন (Submit for Approval)</span>
            </button>
          </div>
        </form>
      )}

      {/* Profile Update History Section */}
      {memberRequests.length > 0 && (
        <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <History className="w-5 h-5 text-emerald-400" />
            <span>প্রোফাইল পরিবর্তনের আবেদনসমূহ ও বর্তমান অবস্থা</span>
          </h3>

          <div className="space-y-3">
            {memberRequests.map((req) => (
              <div 
                key={req.id} 
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-xs space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-400">{req.requestId}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      req.status === 'APPROVED' 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : req.status === 'REJECTED'
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {req.status === 'APPROVED' ? 'অনুমোদিত (APPROVED)' : req.status === 'REJECTED' ? 'বাতিল (REJECTED)' : 'পর্যালোচনাধীন (PENDING)'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    আবেদনের তারিখ: {req.submittedAt}
                  </span>
                </div>

                {/* Changed fields list */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="text-slate-400">পরিবর্তিত ক্ষেত্র:</span>
                  {Object.keys(req.requestedChanges).map((field) => (
                    <span key={field} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {field === 'nameBn' ? 'নাম (বাংলা)' : 
                       field === 'name' ? 'নাম (ইংরেজি)' : 
                       field === 'photoUrl' ? 'প্রোফাইল ছবি' : 
                       field === 'phone' ? 'মোবাইল নং' : 
                       field === 'nominees' ? 'নমিনি তালিকা' : 
                       field === 'currentAddress' ? 'বর্তমান ঠিকানা' : 
                       field === 'permanentAddress' ? 'স্থায়ী ঠিকানা' : 
                       field === 'bloodGroup' ? 'রক্তের গ্রুপ' : 
                       field === 'vehicleRegNo' ? 'গাড়ির নম্বর' : field}
                    </span>
                  ))}
                </div>

                {req.reason && (
                  <p className="text-[11px] text-slate-400 italic">
                    কারণ: "{req.reason}"
                  </p>
                )}

                {req.reviewNotes && (
                  <div className={`p-2.5 rounded-xl border text-[11px] ${
                    req.status === 'APPROVED'
                      ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-300'
                      : 'bg-red-950/50 border-red-800/80 text-red-300'
                  }`}>
                    <strong>অ্যাডমিন মন্তব্য:</strong> {req.reviewNotes} {req.reviewedBy && `(${req.reviewedBy})`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
