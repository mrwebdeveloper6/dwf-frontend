import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { 
  X, 
  LogIn, 
  Shield, 
  UserCheck, 
  KeyRound, 
  Smartphone, 
  Mail,
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  UserPlus,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Crown
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { 
    language, 
    showLoginModal, 
    setShowLoginModal, 
    loginAsMember, 
    loginAsAdmin, 
    signUpFreeUser,
    loginWithCredentials,
    loginWithGoogle,
    requestPasswordReset,
    members 
  } = useDwf();

  const [activeTab, setActiveTab] = useState<'LOGIN' | 'SIGNUP' | 'FORGOT' | 'ADMIN'>('LOGIN');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('DWF-000142');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmailOrPhone, setSignupEmailOrPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [deliveryChannel, setDeliveryChannel] = useState<'SMS' | 'EMAIL' | 'WHATSAPP'>('SMS');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState<{
    memberId: string;
    username: string;
    channel: string;
    target: string;
  } | null>(null);

  // Forgot Password state
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotChannel, setForgotChannel] = useState<'SMS' | 'EMAIL' | 'WHATSAPP'>('SMS');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState<{
    memberId: string;
    channel: string;
    target: string;
    tempPass: string;
    waUrl?: string;
  } | null>(null);

  // Admin Role
  const [adminRole, setAdminRole] = useState('SUPER_ADMIN');

  if (!showLoginModal) return null;

  // Handle Login Submit
  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const res = loginWithCredentials(loginIdentifier, loginPassword);
    setLoginLoading(false);

    if (res.success) {
      setShowLoginModal(false);
    } else {
      setLoginError(res.message);
    }
  };

  // Handle Free Sign-up Submit
  const handleFreeSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim()) {
      setSignupError(language === 'bn' ? 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন!' : 'Please enter your full name!');
      return;
    }
    if (!signupUsername.trim() || signupUsername.trim().length < 3) {
      setSignupError(language === 'bn' ? 'ইউজারনেম অন্তত ৩ অক্ষরের হতে হবে!' : 'Username must be at least 3 characters!');
      return;
    }
    if (!signupEmailOrPhone.trim()) {
      setSignupError(language === 'bn' ? 'সঠিক ইমেইল অথবা মোবাইল নম্বর দিন!' : 'Please enter email or phone number!');
      return;
    }
    if (signupPassword.length < 4) {
      setSignupError(language === 'bn' ? 'পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে!' : 'Password must be at least 4 characters!');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError(language === 'bn' ? 'পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মেলেনি!' : 'Passwords do not match!');
      return;
    }

    const res = signUpFreeUser({
      fullName: signupName.trim(),
      username: signupUsername.trim(),
      emailOrPhone: signupEmailOrPhone.trim(),
      password: signupPassword,
      deliveryChannel
    });

    if (res.success) {
      setSignupSuccess({
        memberId: res.memberId,
        username: res.username,
        channel: deliveryChannel,
        target: signupEmailOrPhone.trim()
      });
      setTimeout(() => {
        setShowLoginModal(false);
      }, 3000);
    } else {
      setSignupError(res.message);
    }
  };

  // Handle Google OAuth
  const handleGoogleAuth = async () => {
    setLoginLoading(true);
    await loginWithGoogle();
    setLoginLoading(false);
    setShowLoginModal(false);
  };

  // Handle Forgot Password
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');

    if (!forgotIdentifier.trim()) {
      setForgotError(language === 'bn' ? 'মোবাইল নম্বর, ইমেইল বা ইউজার আইডি দিন!' : 'Please enter mobile, email or user ID!');
      return;
    }

    const res = requestPasswordReset(forgotIdentifier.trim(), forgotChannel);
    if (res.success && res.dispatchInfo) {
      let waUrl = '';
      if (forgotChannel === 'WHATSAPP') {
        const cleanPhone = res.dispatchInfo.target.replace(/[^0-9]/g, '');
        const text = encodeURIComponent(`[DWF Security Alert] Your Member ID is: ${res.dispatchInfo.memberId}, Temporary Password: ${res.dispatchInfo.tempPass}`);
        waUrl = `https://wa.me/${cleanPhone.startsWith('88') ? cleanPhone : '88' + cleanPhone}?text=${text}`;
      }

      setForgotSuccess({
        memberId: res.dispatchInfo.memberId,
        channel: res.dispatchInfo.channel,
        target: res.dispatchInfo.target,
        tempPass: res.dispatchInfo.tempPass,
        waUrl
      });
    } else {
      setForgotError(res.message);
    }
  };

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin(adminRole);
    setShowLoginModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[95vh] overflow-y-auto my-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="p-2 bg-red-100 text-red-700 rounded-xl sm:rounded-2xl shrink-0">
              <LogIn className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {activeTab === 'SIGNUP' 
                  ? (language === 'bn' ? 'ফ্রি সাইন-আপ (নতুন একাউন্ট)' : 'Free Driver Registration')
                  : activeTab === 'FORGOT' 
                  ? (language === 'bn' ? 'পাসওয়ার্ড ও ইউজার আইডি উদ্ধার' : 'Account & Password Recovery')
                  : (language === 'bn' ? 'ডিডব্লিউএফ পোর্টাল লগইন' : 'DWF Portal Sign-In')}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                {language === 'bn' 
                  ? '১. ফ্রি সাধারণ ব্যবহারকারী | ২. প্রিমিয়াম সদস্য সুবিধা' 
                  : '1. Free Member | 2. Premium Member Privileges'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLoginModal(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Way Tab Switcher */}
        <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-center">
          <button
            type="button"
            onClick={() => { setActiveTab('LOGIN'); setLoginError(''); }}
            className={`py-1.5 px-1 text-[11px] font-bold rounded-lg transition cursor-pointer flex flex-col items-center justify-center ${
              activeTab === 'LOGIN'
                ? 'bg-white text-red-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 mb-0.5" />
            <span>{language === 'bn' ? 'লগইন' : 'Sign In'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('SIGNUP'); setSignupError(''); setSignupSuccess(null); }}
            className={`py-1.5 px-1 text-[11px] font-bold rounded-lg transition cursor-pointer flex flex-col items-center justify-center ${
              activeTab === 'SIGNUP'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 mb-0.5" />
            <span>{language === 'bn' ? 'ফ্রি সাইন-আপ' : 'Free Sign-Up'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('FORGOT'); setForgotError(''); setForgotSuccess(null); }}
            className={`py-1.5 px-1 text-[11px] font-bold rounded-lg transition cursor-pointer flex flex-col items-center justify-center ${
              activeTab === 'FORGOT'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 mb-0.5" />
            <span>{language === 'bn' ? 'পাসওয়ার্ড ভুলেছি' : 'Forgot?'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('ADMIN'); }}
            className={`py-1.5 px-1 text-[11px] font-bold rounded-lg transition cursor-pointer flex flex-col items-center justify-center ${
              activeTab === 'ADMIN'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 mb-0.5" />
            <span>{language === 'bn' ? 'এডমিন' : 'Admin'}</span>
          </button>
        </div>

        {/* TAB 1: LOGIN (Free & Premium Users) */}
        {activeTab === 'LOGIN' && (
          <form onSubmit={handleMemberLogin} className="space-y-3.5 text-xs">
            {loginError && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
                <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Google OAuth Quick Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loginLoading}
              className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-700 text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{language === 'bn' ? 'Google দিয়ে সরাসরি প্রবেশ করুন' : 'Continue with Google (OAuth)'}</span>
            </button>

            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                {language === 'bn' ? 'অথবা ইউজার আইডি / মোবাইল দিয়ে' : 'or with User ID / Phone'}
              </span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'সদস্য আইডি / ইউজারনেম / মোবাইল নম্বর / ইমেইল' : 'User ID, Phone, Username or Email'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. DWF-000142 বা 017XXXXXXXX বা kamal"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  {language === 'bn' ? 'পাসওয়ার্ড / পিন' : 'Password / Security PIN'}
                </label>
                <button
                  type="button"
                  onClick={() => { setActiveTab('FORGOT'); setForgotIdentifier(loginIdentifier); }}
                  className="text-[11px] text-red-600 hover:text-red-700 hover:underline cursor-pointer font-medium"
                >
                  {language === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot Password?'}
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <span>{loginLoading ? (language === 'bn' ? 'যাচাই হচ্ছে...' : 'Verifying...') : (language === 'bn' ? 'লগইন করুন' : 'Sign In')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Drivers (1 Free + 1 Premium) */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] text-slate-500 mb-1.5 font-medium flex items-center justify-between">
                <span>{language === 'bn' ? 'দ্রুত ডেমো অ্যাকাউন্ট পরীক্ষা:' : 'Fast Demo Accounts:'}</span>
                <span className="text-[10px] text-emerald-600 font-bold">১-ক্লিকে লগইন</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {/* Premium Demo */}
                <button
                  type="button"
                  onClick={() => { 
                    setLoginIdentifier('DWF-000142'); 
                    setLoginPassword('••••••••');
                    loginAsMember('DWF-000142'); 
                    setShowLoginModal(false); 
                  }}
                  className="p-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left cursor-pointer transition"
                >
                  <div className="flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-600" />
                    <p className="font-bold text-amber-900 text-[11px]">মোঃ কামাল হোসেন</p>
                  </div>
                  <p className="text-[10px] text-slate-600 font-mono mt-0.5">DWF-000142 (প্রিমিয়াম সদস্য)</p>
                </button>

                {/* Free Demo */}
                <button
                  type="button"
                  onClick={() => { 
                    setLoginIdentifier('DWF-FREE-001'); 
                    setLoginPassword('••••••••');
                    loginAsMember('DWF-FREE-001'); 
                    setShowLoginModal(false); 
                  }}
                  className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-left cursor-pointer transition"
                >
                  <div className="flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-emerald-600" />
                    <p className="font-bold text-emerald-900 text-[11px]">তারেক মাহমুদ</p>
                  </div>
                  <p className="text-[10px] text-slate-600 font-mono mt-0.5">DWF-FREE-001 (ফ্রি মেম্বার)</p>
                </button>
              </div>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('SIGNUP')}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold hover:underline cursor-pointer"
              >
                {language === 'bn' ? 'নতুন চালক? বিনামূল্যে ফ্রি একাউন্ট তৈরি করুন' : 'New Driver? Create Free Account'}
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: FREE SIGN-UP */}
        {activeTab === 'SIGNUP' && (
          <form onSubmit={handleFreeSignUp} className="space-y-3.5 text-xs">
            {signupError && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
                <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{signupError}</span>
              </div>
            )}

            {signupSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 space-y-1.5 animate-in zoom-in-95">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'bn' ? 'ফ্রি সাইন-আপ সম্পন্ন হয়েছে!' : 'Free Registration Successful!'}</span>
                </div>
                <p className="text-[11px] text-slate-700">
                  আপনার ইউজার আইডি: <span className="font-mono font-bold text-emerald-800">{signupSuccess.memberId}</span>
                </p>
                <p className="text-[10px] text-slate-600">
                  {signupSuccess.channel === 'SMS' ? 'মোবাইল এসএমএস' : signupSuccess.channel === 'WHATSAPP' ? 'হোয়াটসঅ্যাপ' : 'ইমেইল'}-এ লগইন তথ্য পাঠানো হয়েছে। ড্যাশবোর্ডে প্রবেশ করানো হচ্ছে...
                </p>
              </div>
            )}

            {/* Google Quick Sign-up */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-700 text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{language === 'bn' ? 'Google দিয়ে ১-ক্লিকে ফ্রি সাইন-আপ' : '1-Click Free Sign-Up with Google'}</span>
            </button>

            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                {language === 'bn' ? 'অথবা তথ্য পূরণ করে ফ্রি রেজিস্ট্রেশন' : 'or manual registration'}
              </span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. মোঃ তারেক রহমান"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'ইউজারনেম *' : 'Username *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. tarek99"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'ইমেইল অথবা মোবাইল নম্বর *' : 'Email or Mobile *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="017XXXXXXXX বা email"
                  value={signupEmailOrPhone}
                  onChange={(e) => setSignupEmailOrPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'পাসওয়ার্ড *' : 'Password *'}
                </label>
                <input
                  type="password"
                  required
                  placeholder="কমপক্ষে ৪ অক্ষর"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিতকরণ *' : 'Confirm Password *'}
                </label>
                <input
                  type="password"
                  required
                  placeholder="একই পাসওয়ার্ড দিন"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Delivery Channel for User ID & Password */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <label className="block font-bold text-slate-700 text-[11px]">
                {language === 'bn' ? 'ইউজার আইডি ও পাসওয়ার্ড পাওয়ার মাধ্যম নির্বাচন করুন:' : 'Receive User ID & Password via:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryChannel('SMS')}
                  className={`py-2 px-1 rounded-lg border text-center font-bold text-[10px] cursor-pointer transition flex flex-col items-center gap-1 ${
                    deliveryChannel === 'SMS'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>মোবাইল SMS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryChannel('WHATSAPP')}
                  className={`py-2 px-1 rounded-lg border text-center font-bold text-[10px] cursor-pointer transition flex flex-col items-center gap-1 ${
                    deliveryChannel === 'WHATSAPP'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryChannel('EMAIL')}
                  className={`py-2 px-1 rounded-lg border text-center font-bold text-[10px] cursor-pointer transition flex flex-col items-center gap-1 ${
                    deliveryChannel === 'EMAIL'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              💡 <strong>ফ্রি সুবিধা:</strong> সাইন-আপ সম্পন্ন করার পর ড্যাশবোর্ডে গিয়ে আপনি পিতা, মাতা, বর্তমান ও স্থায়ী ঠিকানা, এনআইডি পূরণ করতে পারবেন। পরবর্তীতে নমিনী তথ্য ও সাবস্ক্রিপশন সম্পন্ন করে প্রিমিয়াম সুবিধা গ্রহণ করতে পারবেন।
            </p>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>{language === 'bn' ? 'ফ্রি একাউন্ট তৈরি করুন' : 'Create Free Account'}</span>
            </button>
          </form>
        )}

        {/* TAB 3: FORGOT PASSWORD & USER ID DISPATCH */}
        {activeTab === 'FORGOT' && (
          <form onSubmit={handleForgotPassword} className="space-y-3.5 text-xs">
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-blue-900 text-xs">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>{language === 'bn' ? 'পাসওয়ার্ড অথবা ইউজার আইডি ভুলে গেছেন?' : 'Forgot Password or User ID?'}</span>
              </p>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                আপনার মোবাইল নম্বর, ইমেইল বা ইউজার আইডি লিখুন। স্বয়ংক্রিয় গেটওয়ের মাধ্যমে আপনার অ্যাকাউন্টের ইউজার আইডি ও নতুন পাসওয়ার্ড পাঠিয়ে দেওয়া হবে।
              </p>
            </div>

            {forgotError && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
                <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 space-y-2 animate-in zoom-in-95">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'bn' ? 'তথ্য সফলভাবে প্রেরণ করা হয়েছে!' : 'Credentials Dispatched!'}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-xs space-y-1 font-mono">
                  <p><strong>User ID:</strong> <span className="text-red-700 font-bold">{forgotSuccess.memberId}</span></p>
                  <p><strong>New Security Pass:</strong> <span className="text-emerald-700 font-bold">{forgotSuccess.tempPass}</span></p>
                  <p className="text-[11px] font-sans text-slate-500">
                    পাঠানো মাধ্যম: {forgotSuccess.channel === 'SMS' ? 'মোবাইল SMS' : forgotSuccess.channel === 'WHATSAPP' ? 'হোয়াটসঅ্যাপ' : 'ইমেইল'} ({forgotSuccess.target})
                  </p>
                </div>
                {forgotSuccess.waUrl && (
                  <a
                    href={forgotSuccess.waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp-এ মেসেজটি দেখুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('LOGIN');
                    setLoginIdentifier(forgotSuccess.memberId);
                    setLoginPassword(forgotSuccess.tempPass);
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold text-xs transition cursor-pointer"
                >
                  এই তথ্য দিয়ে এখনই লগইন করুন
                </button>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'আপনার নিবন্ধিত মোবাইল নম্বর, ইমেইল বা ইউজার আইডি *' : 'Registered Mobile, Email or User ID *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 01711-234567 বা kamal বা DWF-000142"
                value={forgotIdentifier}
                onChange={(e) => setForgotIdentifier(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 text-[11px] mb-1.5">
                {language === 'bn' ? 'কোথায় তথ্য পাঠাতে চান?' : 'Select Delivery Channel:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setForgotChannel('SMS')}
                  className={`py-2 px-1 rounded-lg border text-center font-bold text-[10px] cursor-pointer transition flex flex-col items-center gap-1 ${
                    forgotChannel === 'SMS'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>মোবাইল SMS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForgotChannel('WHATSAPP')}
                  className={`py-2 px-1 rounded-lg border text-center font-bold text-[10px] cursor-pointer transition flex flex-col items-center gap-1 ${
                    forgotChannel === 'WHATSAPP'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForgotChannel('EMAIL')}
                  className={`py-2 px-1 rounded-lg border text-center font-bold text-[10px] cursor-pointer transition flex flex-col items-center gap-1 ${
                    forgotChannel === 'EMAIL'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>ইমেইল</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>{language === 'bn' ? 'ইউজার আইডি ও পাসওয়ার্ড পাঠান' : 'Dispatch User ID & Password'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 4: ADMIN LOGIN */}
        {activeTab === 'ADMIN' && (
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'প্রশাসনিক ভূমিকা (Role) নির্বাচন করুন' : 'Select Administrative Role'}
              </label>
              <select
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-600 focus:outline-none"
              >
                <option value="SUPER_ADMIN">সুপার এডমিন (Super Admin - Full Control)</option>
                <option value="ACCOUNTS_OFFICER">অ্যাকাউন্টস অফিসার (Accounts & Ledger)</option>
                <option value="MEDICAL_OFFICER">মেডিকেল অফিসার (Medical Claims Specialist)</option>
                <option value="MEMBERSHIP_OFFICER">মেম্বারশিপ অফিসার (Application Reviewer)</option>
                <option value="BRANCH_MANAGER">ব্রাঞ্চ ম্যানেজার (Branch Operator)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'অফিসিয়াল ইমেইল / ইউজার আইডি' : 'Official Staff Email / ID'}
              </label>
              <input
                type="text"
                defaultValue="admin@dwf-bd.org"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'সিকিউর পাসওয়ার্ড' : 'Password'}
              </label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{language === 'bn' ? 'এডমিন হিসেবে প্রবেশ করুন' : 'Enter Management Panel'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
