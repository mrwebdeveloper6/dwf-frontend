import React, { useState, useEffect } from 'react';
import { useDwf } from '../../context/DwfContext';
import { Nominee, Member } from '../../types/dwf';
import confetti from 'canvas-confetti';
import { 
  X, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Crown,
  Sparkles,
  User,
  LogIn,
  Lock,
  Truck,
  HeartPulse,
  CreditCard,
  Phone,
  Mail,
  KeyRound
} from 'lucide-react';

export const MembershipApplicationModal: React.FC = () => {
  const { 
    language, 
    showApplyModal, 
    setShowApplyModal, 
    user,
    members,
    signUpFreeUser,
    loginWithCredentials,
    loginWithGoogle,
    loginWithFacebook,
    upgradeToPremium,
    updateFreeUserProfile,
    submitApplication,
    setActiveView
  } = useDwf();

  // Authentication sub-mode when !user: 'SIGNUP' vs 'LOGIN'
  const [authMode, setAuthMode] = useState<'SIGNUP' | 'LOGIN'>('SIGNUP');

  // Quick Sign-up state (username, email/mobile number, password, full name)
  const [suFullName, setSuFullName] = useState('');
  const [suUsername, setSuUsername] = useState('');
  const [suEmailOrPhone, setSuEmailOrPhone] = useState('');
  const [suPassword, setSuPassword] = useState('');

  // Quick Login state (for existing user)
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Application details state (for premium benefits)
  const [currentMember, setCurrentMember] = useState<any>(null);

  // Driving & Vehicle Info
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [licenseType, setLicenseType] = useState<Member['licenseType']>('PROFESSIONAL_HEAVY');
  const [vehicleType, setVehicleType] = useState<Member['vehicleType']>('BUS');
  const [vehicleRegNo, setVehicleRegNo] = useState('');

  // Personal & Emergency Info
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [nid, setNid] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [dob, setDob] = useState('1992-06-15');
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');

  // Nominees list (100% required)
  const [nominees, setNominees] = useState<Nominee[]>([
    {
      id: 'nom-1',
      name: '',
      relationship: 'স্ত্রী (Wife)',
      nid: '',
      mobile: '',
      address: '',
      percentage: 100
    }
  ]);

  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    appId: string;
    memberId: string;
    memberName: string;
  } | null>(null);

  // Sync current user member record
  useEffect(() => {
    if (user?.memberId) {
      const found = members.find(m => m.memberId === user.memberId);
      if (found) {
        setCurrentMember(found);
        if (found.nameBn || found.name) setSuFullName(found.nameBn || found.name);
        if (found.drivingLicenseNo) setDrivingLicenseNo(found.drivingLicenseNo);
        if (found.vehicleRegNo) setVehicleRegNo(found.vehicleRegNo);
        if (found.fatherName) setFatherName(found.fatherName);
        if (found.motherName) setMotherName(found.motherName);
        if (found.nid) setNid(found.nid);
        if (found.bloodGroup) setBloodGroup(found.bloodGroup);
        if (found.currentAddress) setCurrentAddress(found.currentAddress);
        if (found.permanentAddress) setPermanentAddress(found.permanentAddress);
        if (found.nominees && found.nominees.length > 0) {
          setNominees(found.nominees);
        }
      }
    }
  }, [user, members]);

  if (!showApplyModal) return null;

  const totalNomineePercentage = nominees.reduce((sum, n) => sum + (Number(n.percentage) || 0), 0);

  // Handle Quick Sign-Up (Username, Email/Mobile Number, Password)
  const handleQuickSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!suUsername.trim()) {
      setAuthError(language === 'bn' ? 'অনুগ্রহ করে ইউজারনেম দিন।' : 'Please enter a username.');
      return;
    }
    if (!suEmailOrPhone.trim()) {
      setAuthError(language === 'bn' ? 'অনুগ্রহ করে ইমেইল বা মোবাইল নম্বর দিন।' : 'Please enter email or mobile number.');
      return;
    }
    if (!suPassword || suPassword.length < 4) {
      setAuthError(language === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।' : 'Password must be at least 4 characters.');
      return;
    }

    setAuthLoading(true);
    try {
      const res = signUpFreeUser({
        fullName: suFullName.trim() || suUsername.trim(),
        username: suUsername.trim(),
        emailOrPhone: suEmailOrPhone.trim(),
        password: suPassword,
        deliveryChannel: suEmailOrPhone.includes('@') ? 'EMAIL' : 'SMS'
      });

      if (!res.success) {
        setAuthError(res.message);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Quick Login
  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setAuthError(language === 'bn' ? 'ইউজারনেম/মোবাইল ও পাসওয়ার্ড দিন।' : 'Please enter identifier and password.');
      return;
    }

    setAuthLoading(true);
    try {
      const res = loginWithCredentials(loginIdentifier.trim(), loginPassword.trim());
      if (!res.success) {
        setAuthError(res.message);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Social 1-Click Sign-up (Google & Facebook)
  const handleSocialGoogle = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      await loginWithGoogle();
    } catch {
      setAuthError(language === 'bn' ? 'গুগল সাইন-আপে ত্রুটি হয়েছে।' : 'Google sign-up failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSocialFacebook = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      await loginWithFacebook();
    } catch {
      setAuthError(language === 'bn' ? 'ফেসবুক সাইন-আপে ত্রুটি হয়েছে।' : 'Facebook sign-up failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Add / Remove Nominees
  const handleAddNominee = () => {
    if (nominees.length >= 3) {
      setFormError(language === 'bn' ? 'সর্বোচ্চ ৩ জন নমিনি যোগ করা যাবে।' : 'Maximum 3 nominees allowed.');
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

  // Submit Application for Premium Benefits
  const handlePremiumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (totalNomineePercentage !== 100) {
      setFormError(
        language === 'bn' 
          ? `নমিনিদের শতকরা অনুপাত অবশ্যই ঠিক ১০০% হতে হবে! (বর্তমানে: ${totalNomineePercentage}%)`
          : `Nominee percentage must equal exactly 100%! (Currently: ${totalNomineePercentage}%)`
      );
      return;
    }

    if (!user?.memberId) {
      setFormError(language === 'bn' ? 'আবেদন জমা দিতে সাইন-আপ বা লগইন সম্পন্ন করুন।' : 'Please sign up or login first.');
      return;
    }

    setSubmitting(true);

    try {
      // 1. Update personal details in user profile
      updateFreeUserProfile(user.memberId, {
        fatherName: fatherName.trim(),
        motherName: motherName.trim(),
        nid: nid.trim(),
        bloodGroup,
        currentAddress: currentAddress.trim(),
        permanentAddress: permanentAddress.trim(),
        drivingLicenseNo: drivingLicenseNo.trim(),
        licenseType,
        vehicleType,
        vehicleRegNo: vehicleRegNo.trim()
      });

      // 2. Upgrade to Premium with nominees & subscription
      const upgradeRes = upgradeToPremium(user.memberId, {
        nominees,
        isFreeSubscription: true
      });

      // 3. Register application record for tracking & audit
      const appRes = submitApplication({
        fullName: user.name || suFullName || 'সম্মানিত চালক সদস্য',
        fatherName: fatherName.trim() || 'মোঃ আব্দুল আলীম',
        motherName: motherName.trim() || 'মোসাঃ রোকেয়া বেগম',
        dob: dob || '1992-06-15',
        nid: nid.trim() || '1992000000000',
        phone: user.phone || suEmailOrPhone || '01700-000000',
        whatsapp: user.phone || suEmailOrPhone || '',
        bloodGroup,
        profession: 'পেশাদার মোটরযান চালক',
        currentAddress: currentAddress.trim() || 'ঢাকা, বাংলাদেশ',
        permanentAddress: permanentAddress.trim() || 'ঢাকা, বাংলাদেশ',
        drivingLicenseNo: drivingLicenseNo.trim() || 'DL-PENDING',
        licenseType,
        licenseExpiry: '2030-12-31',
        vehicleType,
        vehicleRegNo: vehicleRegNo.trim() || 'রেজিস্ট্রেশন প্রক্রিয়াধীন',
        applicantPhoto: user.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
        nominees
      });

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 }
      });

      setSuccessInfo({
        appId: appRes.applicationId || `APP-${Date.now().toString().slice(-6)}`,
        memberId: user.memberId,
        memberName: user.name || 'সদস্য'
      });
    } catch {
      setFormError(language === 'bn' ? 'আবেদন প্রক্রিয়াকরণে ত্রুটি হয়েছে।' : 'Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowApplyModal(false);
    setSuccessInfo(null);
    setAuthError('');
    setFormError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl border border-slate-800 space-y-5 max-h-[94vh] overflow-y-auto my-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 sm:pb-4 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="p-2 sm:p-2.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-2xl shrink-0">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white truncate">
                  {language === 'bn' ? 'সদস্যপদ ও প্রিমিয়াম বেনিফিট আবেদন' : 'Membership & Premium Benefits Application'}
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                  {user ? (language === 'bn' ? 'ধাপ ২: আবেদন ফরম' : 'Step 2: Apply') : (language === 'bn' ? 'ধাপ ১: সহজ সাইন-আপ' : 'Step 1: Sign Up')}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5">
                {user 
                  ? (language === 'bn' ? 'তথ্য পূরণ করে আজীবন বিনামূল্যে চিকিৎসা পলিসি ও সকল সুবিধা সক্রিয় করুন' : 'Complete details to activate lifetime premium benefits')
                  : (language === 'bn' ? 'সহজে যুক্ত হতে গুগল, ফেসবুক বা ইউজারনেম দিয়ে সাইন-আপ করুন' : 'Quick sign-up with Google, Facebook or username')}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer shrink-0 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ============================================================ */}
        {/* SUCCESS VIEW (APPLICATION COMPLETED & PREPARED)              */}
        {/* ============================================================ */}
        {successInfo ? (
          <div className="text-center py-6 sm:py-8 space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-emerald-950/60">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 fill-amber-400" />
                <span>প্রিমিয়াম সদস্যপদ সক্রিয় ও সফল!</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {language === 'bn' ? 'অভিনন্দন! আপনার আবেদন সফল হয়েছে' : 'Application Submitted Successfully!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                {language === 'bn'
                  ? 'আপনার প্রিমিয়াম সদস্যপদ ডাটাবেসে কার্যকর হয়েছে। আজীবন চিকিৎসা অনুদান, ডিজিটাল স্বাস্থ্য কার্ড ও আইনি সহায়তা প্রস্তুত।'
                  : 'Your premium application is recorded. Lifetime health card and grants are now active on your account.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left text-xs">
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">সদস্য আইডি (Member ID)</span>
                <p className="text-base font-black font-mono text-emerald-400 mt-0.5">{successInfo.memberId}</p>
                <p className="text-[10px] text-slate-500 mt-1">জাতীয় চালক ডাটাবেস ভেরিফাইড</p>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">আবেদন ট্র্যাকিং আইডি</span>
                <p className="text-base font-black font-mono text-amber-400 mt-0.5">{successInfo.appId}</p>
                <p className="text-[10px] text-slate-500 mt-1">কেন্দ্রীয় সার্ভারে রেকর্ড সংরক্ষিত</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  handleClose();
                  setActiveView('member-portal');
                }}
                className="w-full sm:w-auto px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>আমার সদস্য ড্যাশবোর্ডে প্রবেশ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : !user ? (
          /* ============================================================ */
          /* STAGE 1: EASY & MODERN SIGN UP INTERFACE                     */
          /* "Just use username, email/mobile number, and password"      */
          /* "keep signup with Google or Facebook options"                */
          /* ============================================================ */
          <div className="space-y-5 animate-in fade-in duration-150">
            
            {/* Social 1-Click Sign-Up Options (Google & Facebook) */}
            <div>
              <p className="text-xs text-slate-300 font-medium mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'bn' ? '১-ক্লিকে তাৎক্ষণিক সাইন-আপ ও আবেদন করুন:' : '1-Click Fast Sign-Up & Apply:'}</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Google Sign-up */}
                <button
                  type="button"
                  onClick={handleSocialGoogle}
                  disabled={authLoading}
                  className="w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2.5 shadow-md active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{language === 'bn' ? 'Google দিয়ে সাইন-আপ' : 'Sign Up with Google'}</span>
                </button>

                {/* Facebook Sign-up */}
                <button
                  type="button"
                  onClick={handleSocialFacebook}
                  disabled={authLoading}
                  className="w-full py-2.5 px-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2.5 shadow-md active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>{language === 'bn' ? 'Facebook দিয়ে সাইন-আপ' : 'Sign Up with Facebook'}</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">
                {authMode === 'SIGNUP' 
                  ? (language === 'bn' ? 'অথবা ইউজারনেম, ইমেইল/মোবাইল ও পাসওয়ার্ড দিয়ে' : 'or with username, email/phone & password')
                  : (language === 'bn' ? 'অথবা ইউজার আইডি ও পাসওয়ার্ড দিয়ে লগইন' : 'or login with credentials')}
              </span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            {/* Auth Error Banner */}
            {authError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-700 text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form: Easy Sign-Up */}
            {authMode === 'SIGNUP' ? (
              <form onSubmit={handleQuickSignUp} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {language === 'bn' ? 'ইউজারনেম (Username) *' : 'Username *'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. zahid_driver বা kamal123"
                        value={suUsername}
                        onChange={(e) => setSuUsername(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:border-red-500 focus:outline-none"
                      />
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {language === 'bn' ? 'ইমেইল অথবা মোবাইল নম্বর *' : 'Email or Mobile Number *'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="017XXXXXXXX বা driver@gmail.com"
                        value={suEmailOrPhone}
                        onChange={(e) => setSuEmailOrPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:border-red-500 focus:outline-none"
                      />
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {language === 'bn' ? 'পাসওয়ার্ড (Password) *' : 'Password *'}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="পাসওয়ার্ড লিখুন"
                        value={suPassword}
                        onChange={(e) => setSuPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:border-red-500 focus:outline-none"
                      />
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {language === 'bn' ? 'আপনার পূর্ণ নাম (ঐচ্ছিক)' : 'Full Name (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: মোঃ জাহিদ হাসান"
                      value={suFullName}
                      onChange={(e) => setSuFullName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>
                    {authLoading 
                      ? (language === 'bn' ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'Creating Account...') 
                      : (language === 'bn' ? 'সাইন-আপ করে প্রিমিয়াম সুবিধার আবেদনে যান' : 'Sign Up & Continue to Application')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2 border-t border-slate-800">
                  <p className="text-slate-400 text-xs">
                    {language === 'bn' ? 'ইতিমধ্যে একাউন্ট আছে?' : 'Already have an account?'}
                    {' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('LOGIN'); setAuthError(''); }}
                      className="text-red-400 hover:text-red-300 font-bold underline cursor-pointer ml-1"
                    >
                      {language === 'bn' ? 'এখানে লগইন করুন' : 'Login here'}
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              /* Inline Login if user already has an account */
              <form onSubmit={handleQuickLogin} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {language === 'bn' ? 'সদস্য আইডি / ইউজারনেম / মোবাইল নম্বর' : 'User ID, Username or Mobile'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DWF-000142 বা 017XXXXXXXX বা kamal"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="পাসওয়ার্ড লিখুন"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:border-red-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {authLoading 
                      ? (language === 'bn' ? 'যাচাই হচ্ছে...' : 'Verifying...') 
                      : (language === 'bn' ? 'লগইন করে আবেদন ফরম খুলুন' : 'Sign In & Open Application')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2 border-t border-slate-800">
                  <p className="text-slate-400 text-xs">
                    {language === 'bn' ? 'নতুন চালক?' : 'New driver?'}
                    {' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('SIGNUP'); setAuthError(''); }}
                      className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer ml-1"
                    >
                      {language === 'bn' ? 'ফ্রি সাইন-আপ করুন' : 'Sign up free'}
                    </button>
                  </p>
                </div>
              </form>
            )}

          </div>
        ) : (
          /* ============================================================ */
          /* STAGE 2: APPLICATION FOR PREMIUM BENEFITS                    */
          /* "Then the user enters the MembershipApplicationModal to fill  */
          /* it out and submit for premium benefits."                     */
          /* ============================================================ */
          <form onSubmit={handlePremiumSubmit} className="space-y-5 text-xs animate-in fade-in duration-200">
            
            {/* Authenticated Member Status Card */}
            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-emerald-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-xs sm:text-sm truncate">
                      {user.name || 'সদস্য চালক'}
                    </p>
                    <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                      {user.memberId}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {language === 'bn' 
                      ? 'অ্যাকাউন্ট প্রস্তুত! প্রিমিয়াম সুবিধা ও আজীবন চিকিৎসা পলিসি সক্রিয় করতে ফরমটি পূরণ করুন।' 
                      : 'Account ready! Fill out details to activate lifetime premium benefits.'}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>সাইন-আপ সম্পন্ন</span>
              </span>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-700 text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* SECTION 1: DRIVING & VEHICLE INFO */}
            <div className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>১. ড্রাইভিং লাইসেন্স ও যানবাহন তথ্য</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">ড্রাইভিং লাইসেন্স নম্বর (BRTA) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: DK12345678"
                    value={drivingLicenseNo}
                    onChange={(e) => setDrivingLicenseNo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">লাইসেন্সের ধরণ *</label>
                  <select
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value as Member['licenseType'])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="PROFESSIONAL_HEAVY">পেশাদার ভারী (Professional Heavy)</option>
                    <option value="PROFESSIONAL_MEDIUM">পেশাদার মাঝারি (Professional Medium)</option>
                    <option value="PROFESSIONAL_LIGHT">পেশাদার হালকা (Professional Light)</option>
                    <option value="NON_PROFESSIONAL">অপেশাদার (Non-Professional)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">গাড়ির রেজি. নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ঢাকা মেট্রো-ব ১৪-৫৬৭৮"
                    value={vehicleRegNo}
                    onChange={(e) => setVehicleRegNo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">যানবাহনের ধরণ *</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as Member['vehicleType'])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="BUS">দূরপাল্লার / সিটি বাস (Bus)</option>
                    <option value="TRUCK">ট্রাক / কাভার্ড ভ্যান (Truck)</option>
                    <option value="MICROBUS">মাইক্রোবাস / হাইয়েস (Microbus)</option>
                    <option value="CAR">প্রাইভেট কার / উবার (Private Car)</option>
                    <option value="CNG">সিএনজি অটো-রিকশা (CNG)</option>
                    <option value="OTHER">অন্যান্য পেশাদার যান (Other)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2: PERSONAL & RESIDENCE INFO */}
            <div className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>২. ব্যক্তিগত ও ঠিকানা তথ্য</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">পিতার নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="পিতার নাম"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">মাতার নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="মাতার নাম"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">এনআইডি নম্বর (NID) *</label>
                  <input
                    type="text"
                    required
                    placeholder="১০ বা ১৭ ডিজিট এনআইডি"
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">রক্তের গ্রুপ *</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
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

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">বর্তমান ঠিকানা *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মিরপুর-১, ঢাকা"
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-slate-400 mb-1">স্থায়ী ঠিকানা *</label>
                  <input
                    type="text"
                    required
                    placeholder="গ্রাম, ডাকঘর, থানা, জেলা"
                    value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: NOMINEE & SHARE DISTRIBUTION (100% REQUIRED) */}
            <div className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>৩. নমিনি তথ্য ও অংশ বণ্টন (মোট ১০০% বাধ্যতামূলক)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">আইনি নিরাপত্তা ও আজীবন অনুদানের জন্য নমিনির অংশ ঠিক ১০০% হতে হবে</p>
                </div>

                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${
                  totalNomineePercentage === 100
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-red-950 text-red-300 border-red-800'
                }`}>
                  মোট: {totalNomineePercentage}% / 100%
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
                          onClick={() => handleRemoveNominee(idx)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>মুছুন</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-400 mb-1">নমিনির পূর্ণ নাম *</label>
                        <input
                          type="text"
                          required
                          value={nom.name}
                          onChange={(e) => updateNomineeField(idx, 'name', e.target.value)}
                          placeholder="নমিনির নাম"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">সম্পর্ক *</label>
                        <input
                          type="text"
                          required
                          value={nom.relationship}
                          onChange={(e) => updateNomineeField(idx, 'relationship', e.target.value)}
                          placeholder="যেমন: স্ত্রী, পুত্র, পিতা"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 focus:outline-none"
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
                          onChange={(e) => updateNomineeField(idx, 'percentage', Number(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg font-mono font-bold text-amber-400 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-slate-400 mb-1">নমিনির মোবাইল নম্বর</label>
                        <input
                          type="text"
                          value={nom.mobile || ''}
                          onChange={(e) => updateNomineeField(idx, 'mobile', e.target.value)}
                          placeholder="017XXXXXXXX"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-slate-400 mb-1">নমিনির এনআইডি (NID)</label>
                        <input
                          type="text"
                          value={nom.nid || ''}
                          onChange={(e) => updateNomineeField(idx, 'nid', e.target.value)}
                          placeholder="এনআইডি নম্বর"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {nominees.length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddNominee}
                    className="px-3.5 py-2 border border-dashed border-slate-700 hover:border-amber-500 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ নতুন নমিনি যোগ করুন</span>
                  </button>
                )}
              </div>
            </div>

            {/* SECTION 4: INCLUDED BENEFITS OVERVIEW */}
            <div className="p-4 bg-gradient-to-r from-amber-950/30 via-slate-950 to-amber-950/20 rounded-2xl border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Crown className="w-4 h-4 fill-amber-400" />
                <span>আবেদনের সাথে অন্তর্ভুক্ত আজীবন প্রিমিয়াম সুবিধা:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>আজীবন বিনামূল্যে ডিজিটাল স্বাস্থ্য কার্ড</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>৫০,০০০ টাকা হাসপাতাল চিকিৎসা অনুদান</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>১,০০,০০০ টাকা সড়ক দুর্ঘটনা সহায়তা সেল</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>ডিজিটাল স্মার্ট আইডি কার্ড ও যাচাই সুবিধা</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold text-xs cursor-pointer"
              >
                বাতিল করুন
              </button>

              <button
                type="submit"
                disabled={submitting || totalNomineePercentage !== 100}
                className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Crown className="w-4 h-4 fill-white" />
                <span>
                  {submitting 
                    ? (language === 'bn' ? 'আবেদন জমা হচ্ছে...' : 'Submitting...') 
                    : (language === 'bn' ? 'প্রিমিয়াম সুবিধার জন্য আবেদন জমা দিন' : 'Submit for Premium Benefits')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
