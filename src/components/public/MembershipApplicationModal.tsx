import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { Nominee } from '../../types/dwf';
import confetti from 'canvas-confetti';
import { 
  X, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  UploadCloud, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { FileUploadZone } from '../common/FileUploadZone';

export const MembershipApplicationModal: React.FC = () => {
  const { 
    language, 
    showApplyModal, 
    setShowApplyModal, 
    submitApplication 
  } = useDwf();

  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [successAppId, setSuccessAppId] = useState<string>('');

  // Step 1: Personal Info
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('1990-01-15');
  const [nid, setNid] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [profession, setProfession] = useState('পেশাদার দূরপাল্লার বাস চালক');

  // Step 2: Address
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');

  // Step 3: Driving Info
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [licenseType, setLicenseType] = useState('PROFESSIONAL_HEAVY');
  const [licenseExpiry, setLicenseExpiry] = useState('2029-12-31');
  const [vehicleType, setVehicleType] = useState('BUS');
  const [vehicleRegNo, setVehicleRegNo] = useState('');

  // Step 4: Documents (Real File Uploads & Storage Options)
  const [applicantPhoto, setApplicantPhoto] = useState('https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80');
  const [photoFileName, setPhotoFileName] = useState('driver_passport_photo.jpg');
  const [nidDocumentUrl, setNidDocumentUrl] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80');
  const [nidFileName, setNidFileName] = useState('nid_smart_card_front_back.pdf');
  const [licenseDocumentUrl, setLicenseDocumentUrl] = useState('https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80');
  const [licenseFileName, setLicenseFileName] = useState('brta_heavy_driving_license.jpg');

  // Step 5: Nominees
  const [nominees, setNominees] = useState<Nominee[]>([
    {
      id: 'nom-new-1',
      name: '',
      relationship: 'স্ত্রী (Wife)',
      nid: '',
      mobile: '',
      address: '',
      percentage: 100
    }
  ]);

  if (!showApplyModal) return null;

  const totalNomineePercentage = nominees.reduce((sum, n) => sum + (Number(n.percentage) || 0), 0);

  const handleAddNominee = () => {
    if (nominees.length >= 3) {
      setError(language === 'bn' ? 'সর্বোচ্চ ৩ জন নমিনি যোগ করা যাবে।' : 'Maximum 3 nominees allowed.');
      return;
    }
    const currentTotal = nominees.reduce((sum, n) => sum + (Number(n.percentage) || 0), 0);
    const remainder = Math.max(0, 100 - currentTotal);
    setNominees([
      ...nominees,
      {
        id: `nom-${Date.now()}`,
        name: '',
        relationship: 'সন্তান (Child)',
        nid: '',
        mobile: '',
        address: '',
        percentage: remainder
      }
    ]);
  };

  const handleRemoveNominee = (index: number) => {
    if (nominees.length <= 1) return;
    setNominees(nominees.filter((_, i) => i !== index));
  };

  const updateNomineeField = (index: number, field: keyof Nominee, value: any) => {
    const updated = [...nominees];
    updated[index] = { ...updated[index], [field]: value };
    setNominees(updated);
  };

  const handleNextStep = () => {
    setError('');
    // Step 1 Validation
    if (step === 1) {
      if (!fullName.trim() || !nid.trim() || !phone.trim()) {
        setError(language === 'bn' ? 'অনুগ্রহ করে নাম, এনআইডি ও মোবাইল নম্বর পূরণ করুন।' : 'Please fill full name, NID, and mobile number.');
        return;
      }
    }
    // Step 2 Validation
    if (step === 2) {
      if (!currentAddress.trim() || !permanentAddress.trim()) {
        setError(language === 'bn' ? 'বর্তমান ও স্থায়ী উভয় ঠিকানাই প্রয়োজন।' : 'Both current and permanent addresses are required.');
        return;
      }
    }
    // Step 3 Validation
    if (step === 3) {
      if (!drivingLicenseNo.trim() || !vehicleRegNo.trim()) {
        setError(language === 'bn' ? 'ড্রাইভিং লাইসেন্স নম্বর ও গাড়ির রেজি. নম্বর দিন।' : 'Driving license number and vehicle reg number are required.');
        return;
      }
    }
    // Advance
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (totalNomineePercentage !== 100) {
      setError(
        language === 'bn' 
          ? `নমিনিদের শতকরা অনুপাত অবশ্যই ১০০% হতে হবে! (বর্তমানে: ${totalNomineePercentage}%)`
          : `Nominee percentages must equal exactly 100%! (Currently: ${totalNomineePercentage}%)`
      );
      return;
    }

    const res = submitApplication({
      fullName,
      fatherName: fatherName || 'মোঃ আব্দুল আলীম',
      motherName: motherName || 'মোসাঃ রোকেয়া বেগম',
      dob,
      nid,
      phone,
      whatsapp: whatsapp || phone,
      bloodGroup,
      profession,
      currentAddress,
      permanentAddress,
      drivingLicenseNo,
      licenseType,
      licenseExpiry,
      vehicleType,
      vehicleRegNo,
      applicantPhoto,
      nominees
    });

    if (res.success) {
      setSuccessAppId(res.applicationId);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setError(res.message);
    }
  };

  const handleClose = () => {
    setShowApplyModal(false);
    setStep(1);
    setError('');
    setSuccessAppId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'bn' ? 'ডিডব্লিউএফ প্রাতিষ্ঠানিক সদস্যপদ আবেদন' : 'DWF Membership Application'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'ধাপভিত্তিক অনলাইন ফর্ম — জাতীয় ডাটাবেস অন্তর্ভুক্তি' : '5-Step Verified Driver Registration Form'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {successAppId ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-900">
                {language === 'bn' ? 'আবেদন সফলভাবে দাখিল হয়েছে!' : 'Application Submitted Successfully!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {language === 'bn'
                  ? 'আপনার আবেদনটি ডিডব্লিউএফ কেন্দ্রীয় যাচাই সেলে পৌঁছেছে। অনুমোদন সম্পন্ন হলে আপনার ফোনে এসএমএস পাঠানো হবে।'
                  : 'Your application has been received. You will receive an SMS notification once reviewed by our membership officers.'}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 max-w-sm mx-auto">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                {language === 'bn' ? 'আবেদন ট্র্যাকিং আইডি:' : 'Application ID:'}
              </span>
              <p className="text-xl font-black font-mono text-emerald-950 mt-1">
                {successAppId}
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                {language === 'bn' ? 'আইডিটি সংরক্ষণ করুন।' : 'Keep this ID safe for tracking.'}
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                {language === 'bn' ? 'সম্পন্ন' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between mb-6 px-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                      step === s
                        ? 'bg-emerald-700 text-white shadow-md'
                        : step > s
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 5 && (
                    <div
                      className={`w-8 sm:w-16 h-1 mx-1 rounded transition ${
                        step > s ? 'bg-emerald-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Steps */}
            <form onSubmit={step === 5 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
              
              {/* STEP 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                    {language === 'bn' ? 'ধাপ ১: ব্যক্তিগত পরিচয়' : 'Step 1: Personal Details'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'পূর্ণ নাম (NID অনুযায়ী) *' : 'Full Name (as on NID) *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="যেমন: মোঃ জাহিদ হোসেন"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'জাতীয় পরিচয়পত্র নম্বর (NID) *' : 'NID Number *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={nid}
                        onChange={(e) => setNid(e.target.value)}
                        placeholder="১০ অথবা ১৭ ডিজিটের এনআইডি"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'পিতার নাম' : "Father's Name"}
                      </label>
                      <input
                        type="text"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="পিতার নাম লিখুন"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'মাতার নাম' : "Mother's Name"}
                      </label>
                      <input
                        type="text"
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                        placeholder="মাতার নাম লিখুন"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="017XX-XXXXXX"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'হোয়াটসঅ্যাপ নম্বর' : 'WhatsApp Number'}
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="017XX-XXXXXX"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'জন্ম তারিখ' : 'Date of Birth'}
                      </label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'রক্তের গ্রুপ *' : 'Blood Group *'}
                      </label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-rose-600"
                      >
                        <option value="A+">A Positive (A+)</option>
                        <option value="A-">A Negative (A-)</option>
                        <option value="B+">B Positive (B+)</option>
                        <option value="B-">B Negative (B-)</option>
                        <option value="O+">O Positive (O+)</option>
                        <option value="O-">O Negative (O-)</option>
                        <option value="AB+">AB Positive (AB+)</option>
                        <option value="AB-">AB Negative (AB-)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Address Info */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                    {language === 'bn' ? 'ধাপ ২: বর্তমান ও স্থায়ী ঠিকানা' : 'Step 2: Address Details'}
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'বর্তমান ঠিকানা *' : 'Current Address *'}
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={currentAddress}
                        onChange={(e) => setCurrentAddress(e.target.value)}
                        placeholder="বাসা নং, রোড নং, থানা, জেলা (যেমন: মিরপুর-১০, ঢাকা)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'স্থায়ী ঠিকানা (গ্রাম, ডাকঘর, থানা ও জেলা) *' : 'Permanent Address *'}
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={permanentAddress}
                        onChange={(e) => setPermanentAddress(e.target.value)}
                        placeholder="গ্রাম, ডাকঘর, উপজেলা ও জেলা"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Driving & Vehicle Info */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                    {language === 'bn' ? 'ধাপ ৩: ড্রাইভিং লাইসেন্স ও গাড়ির বিবরণ' : 'Step 3: Driving & Vehicle Details'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'ড্রাইভিং লাইসেন্স নম্বর *' : 'Driving License No *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={drivingLicenseNo}
                        onChange={(e) => setDrivingLicenseNo(e.target.value)}
                        placeholder="যেমন: DK-7890452-PROF"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'লাইসেন্সের ধরন' : 'License Type'}
                      </label>
                      <select
                        value={licenseType}
                        onChange={(e) => setLicenseType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      >
                        <option value="PROFESSIONAL_HEAVY">পেশাদার ভারী (Professional Heavy)</option>
                        <option value="PROFESSIONAL_MEDIUM">পেশাদার মাঝারি (Professional Medium)</option>
                        <option value="PROFESSIONAL_LIGHT">পেশাদার হালকা (Professional Light)</option>
                        <option value="NON_PROFESSIONAL">অপেশাদার (Non-Professional)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'লাইসেন্স মেয়াদের শেষ তারিখ' : 'License Expiry Date'}
                      </label>
                      <input
                        type="date"
                        value={licenseExpiry}
                        onChange={(e) => setLicenseExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'চালিত যানবাহনের ধরন' : 'Primary Vehicle Type'}
                      </label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      >
                        <option value="BUS">দূরপাল্লার / সিটি বাস (Bus)</option>
                        <option value="TRUCK">ট্রাক / কাভার্ড ভ্যান (Truck)</option>
                        <option value="MICROBUS">মাইক্রোবাস / হাইয়েস (Microbus)</option>
                        <option value="CAR">প্রাইভেট কার / সেডান (Private Car)</option>
                        <option value="CNG">অটোরিকশা (CNG)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        {language === 'bn' ? 'গাড়ির রেজিস্ট্রেশন নম্বর *' : 'Vehicle Registration No *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleRegNo}
                        onChange={(e) => setVehicleRegNo(e.target.value)}
                        placeholder="যেমন: ঢাকা মেট্রো-ব ১৪-৯৮২৩"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Real Documents Upload & Storage Options */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                      {language === 'bn' ? 'ধাপ ৪: প্রয়োজনীয় প্রমাণপত্র ও ছবি আপলোড' : 'Step 4: Real Documents & Photo Upload'}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Cloud / Local Storage সমর্থিত
                    </span>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* 1. Applicant Passport Photo */}
                    <FileUploadZone
                      label="১. চালকের সাম্প্রতিক পাসপোর্ট সাইজ ছবি *"
                      subLabel="পরিষ্কার ছবি, ব্যাকগ্রাউন্ড হালকা"
                      category="MEMBER_PHOTO"
                      accept="image/*"
                      maxSizeMb={5}
                      currentValue={applicantPhoto}
                      currentFileName={photoFileName}
                      onFileSelect={(file, dataUrl) => {
                        setApplicantPhoto(dataUrl);
                        setPhotoFileName(file.name);
                      }}
                      onFileClear={() => {
                        setApplicantPhoto('');
                        setPhotoFileName('');
                      }}
                    />

                    {/* 2. National ID Card */}
                    <FileUploadZone
                      label="২. জাতীয় পরিচয়পত্র (NID ফ্রন্ট ও ব্যাক) *"
                      subLabel="স্মার্ট কার্ড বা অনলাইন জন্ম নিবন্ধন কপি"
                      category="NID_CARD"
                      accept="image/*,application/pdf"
                      maxSizeMb={10}
                      currentValue={nidDocumentUrl}
                      currentFileName={nidFileName}
                      onFileSelect={(file, dataUrl) => {
                        setNidDocumentUrl(dataUrl);
                        setNidFileName(file.name);
                      }}
                      onFileClear={() => {
                        setNidDocumentUrl('');
                        setNidFileName('');
                      }}
                    />

                    {/* 3. BRTA Driving License */}
                    <FileUploadZone
                      label="৩. বিআরটিএ ড্রাইভিং লাইসেন্সের স্ক্যান কপি *"
                      subLabel="মেয়াদ সম্বলিত পেশাদার/অপেশাদার লাইসেন্স"
                      category="DRIVING_LICENSE"
                      accept="image/*,application/pdf"
                      maxSizeMb={10}
                      currentValue={licenseDocumentUrl}
                      currentFileName={licenseFileName}
                      onFileSelect={(file, dataUrl) => {
                        setLicenseDocumentUrl(dataUrl);
                        setLicenseFileName(file.name);
                      }}
                      onFileClear={() => {
                        setLicenseDocumentUrl('');
                        setLicenseFileName('');
                      }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Nominees Management (Strictly 100%) */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                      {language === 'bn' ? 'ধাপ ৫: ১০০% নমিনি বণ্টন' : 'Step 5: 100% Nominee Security'}
                    </h4>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded font-mono ${
                        totalNomineePercentage === 100
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {language === 'bn' ? 'মোট বণ্টন:' : 'Total:'} {totalNomineePercentage}% / 100%
                    </span>
                  </div>

                  <div className="space-y-3">
                    {nominees.map((nom, idx) => (
                      <div key={nom.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2.5">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                          <span className="font-bold text-slate-800">
                            {language === 'bn' ? `নমিনি #${idx + 1}` : `Nominee #${idx + 1}`}
                          </span>
                          {nominees.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveNominee(idx)}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                              {language === 'bn' ? 'নমিনির নাম *' : 'Nominee Name *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={nom.name}
                              onChange={(e) => updateNomineeField(idx, 'name', e.target.value)}
                              placeholder="নমিনির নাম লিখুন"
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                              {language === 'bn' ? 'সম্পর্ক *' : 'Relationship *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={nom.relationship}
                              onChange={(e) => updateNomineeField(idx, 'relationship', e.target.value)}
                              placeholder="যেমন: স্ত্রী / পুত্র"
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                              {language === 'bn' ? 'শতকরা ভাগ (%) *' : 'Percentage (%) *'}
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              required
                              value={nom.percentage}
                              onChange={(e) => updateNomineeField(idx, 'percentage', Number(e.target.value))}
                              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-emerald-800"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddNominee}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{language === 'bn' ? '+ আরেকজন নমিনি যোগ করুন' : '+ Add Another Nominee'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => { setError(''); setStep(step - 1); }}
                    className="flex items-center gap-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'bn' ? 'পূর্ববর্তী' : 'Back'}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{language === 'bn' ? 'আবেদন চূড়ান্ত জমা দিন' : 'Submit Final Application'}</span>
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
