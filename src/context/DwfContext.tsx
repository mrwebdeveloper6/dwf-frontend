import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  UserSession, 
  Member, 
  MembershipApplication, 
  PaymentRecord, 
  MedicalClaim, 
  AccidentClaim, 
  NoticeItem, 
  Branch, 
  AuditLog, 
  SmsRecord, 
  SystemMetrics,
  Nominee,
  PaymentMethod,
  PaymentType
} from '../types/dwf';
import { 
  initialMembers, 
  initialApplications, 
  initialPayments, 
  initialMedicalClaims, 
  initialAccidentClaims, 
  initialNotices, 
  initialBranches, 
  initialAuditLogs, 
  initialSmsRecords, 
  initialSystemMetrics 
} from '../data/initialData';
import { translations } from '../lib/i18n';

interface PublicVerificationResult {
  found: boolean;
  memberId?: string;
  name?: string;
  status?: string;
  bloodGroup?: string;
  healthCardNo?: string;
  healthCardExpiry?: string;
  joinedDate?: string;
  branchName?: string;
  profession?: string;
}

interface DwfContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['bn'];
  user: UserSession | null;
  loginAsMember: (memberId?: string) => void;
  loginAsAdmin: (role?: string) => void;
  logout: () => void;
  activeView: string;
  setActiveView: (view: string) => void;

  // Data
  members: Member[];
  applications: MembershipApplication[];
  payments: PaymentRecord[];
  medicalClaims: MedicalClaim[];
  accidentClaims: AccidentClaim[];
  notices: NoticeItem[];
  branches: Branch[];
  auditLogs: AuditLog[];
  smsRecords: SmsRecord[];
  metrics: SystemMetrics;

  // Modals
  showApplyModal: boolean;
  setShowApplyModal: (open: boolean) => void;
  showVerifyModal: boolean;
  setShowVerifyModal: (open: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (open: boolean) => void;

  // Actions
  submitApplication: (appData: Omit<MembershipApplication, 'id' | 'applicationId' | 'status' | 'submittedAt'>) => { success: boolean; applicationId: string; message: string };
  approveApplication: (appId: string, reviewNotes?: string) => { success: boolean; memberId: string };
  rejectApplication: (appId: string, reason: string) => void;
  recordPayment: (payment: { memberId: string; amount: number; paymentType: PaymentType; paymentMethod: PaymentMethod; transactionId?: string; monthCovered?: string; remarks?: string }) => { success: boolean; receiptNo: string };
  submitMedicalClaim: (claim: Omit<MedicalClaim, 'id' | 'claimNo' | 'status' | 'submittedAt'>) => { success: boolean; claimNo: string };
  updateMedicalClaimStatus: (claimId: string, status: MedicalClaim['status'], approvedAmount?: number, notes?: string) => void;
  submitAccidentClaim: (claim: Omit<AccidentClaim, 'id' | 'claimNo' | 'status' | 'submittedAt'>) => { success: boolean; claimNo: string };
  updateAccidentClaimStatus: (claimId: string, status: AccidentClaim['status'], approvedAmount?: number, notes?: string) => void;
  updateNominees: (memberId: string, nominees: Nominee[]) => { success: boolean; message: string };
  sendSms: (phone: string, name: string, template: string, message: string) => void;
  verifyMember: (query: string) => PublicVerificationResult;
  currentMemberData: Member | null;
}

const DwfContext = createContext<DwfContextType | null>(null);

export const DwfProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dwf_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dwf_lang', lang);
  };

  const t = translations[language];

  // Navigation State
  const [activeView, setActiveView] = useState<string>('home');
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // User Session
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('dwf_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Master Data collections with LocalStorage persistence
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('dwf_members');
    return saved ? JSON.parse(saved) : initialMembers;
  });

  const [applications, setApplications] = useState<MembershipApplication[]>(() => {
    const saved = localStorage.getItem('dwf_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('dwf_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [medicalClaims, setMedicalClaims] = useState<MedicalClaim[]>(() => {
    const saved = localStorage.getItem('dwf_med_claims');
    return saved ? JSON.parse(saved) : initialMedicalClaims;
  });

  const [accidentClaims, setAccidentClaims] = useState<AccidentClaim[]>(() => {
    const saved = localStorage.getItem('dwf_acc_claims');
    return saved ? JSON.parse(saved) : initialAccidentClaims;
  });

  const [notices] = useState<NoticeItem[]>(initialNotices);
  const [branches] = useState<Branch[]>(initialBranches);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('dwf_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });
  const [smsRecords, setSmsRecords] = useState<SmsRecord[]>(() => {
    const saved = localStorage.getItem('dwf_sms_records');
    return saved ? JSON.parse(saved) : initialSmsRecords;
  });
  const [metrics, setMetrics] = useState<SystemMetrics>(() => {
    const saved = localStorage.getItem('dwf_metrics');
    return saved ? JSON.parse(saved) : initialSystemMetrics;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dwf_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('dwf_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('dwf_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('dwf_med_claims', JSON.stringify(medicalClaims));
  }, [medicalClaims]);

  useEffect(() => {
    localStorage.setItem('dwf_acc_claims', JSON.stringify(accidentClaims));
  }, [accidentClaims]);

  useEffect(() => {
    localStorage.setItem('dwf_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('dwf_sms_records', JSON.stringify(smsRecords));
  }, [smsRecords]);

  useEffect(() => {
    localStorage.setItem('dwf_metrics', JSON.stringify(metrics));
  }, [metrics]);

  const addAuditLog = (action: string, module: AuditLog['module'], recordId: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: user?.id || 'sys-anon',
      userName: user?.name || (language === 'bn' ? 'সিস্টেম বা ব্যবহারকারী' : 'System / User'),
      role: user?.role === 'ADMIN' ? (user.adminRole || 'ADMIN') : (user?.role || 'PUBLIC'),
      action,
      module,
      recordId,
      details,
      ipAddress: '103.220.201.18'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const loginAsMember = (memberId = 'DWF-000142') => {
    const mem = members.find(m => m.memberId === memberId) || members[0];
    const session: UserSession = {
      id: mem.id,
      name: language === 'bn' ? mem.nameBn : mem.name,
      phone: mem.phone,
      role: 'MEMBER',
      memberId: mem.memberId,
      avatar: mem.photoUrl,
      branch: mem.branchName
    };
    setUser(session);
    localStorage.setItem('dwf_user', JSON.stringify(session));
    setActiveView('member-portal');
    addAuditLog('MEMBER_LOGIN', 'AUTH', mem.memberId, `সদস্য ${mem.memberId} সফলভাবে লগইন করেছেন`);
  };

  const loginAsAdmin = (role = 'SUPER_ADMIN') => {
    const session: UserSession = {
      id: 'admin-01',
      name: role === 'SUPER_ADMIN' ? 'অধ্যক্ষ শাহ আলম (সুপার এডমিন)' : 'শাহাদাত হোসেন (কর্মকর্তা)',
      phone: '01700-112233',
      role: 'ADMIN',
      adminRole: role as any,
      branch: 'হেড অফিস, ঢাকা'
    };
    setUser(session);
    localStorage.setItem('dwf_user', JSON.stringify(session));
    setActiveView('admin-panel');
    addAuditLog('ADMIN_LOGIN', 'AUTH', session.id, `প্রশাসনিক কর্মকর্তা (${role}) লগইন করেছেন`);
  };

  const logout = () => {
    if (user) {
      addAuditLog('LOGOUT', 'AUTH', user.id, `ব্যবহারকারী লগআউট করেছেন`);
    }
    setUser(null);
    localStorage.removeItem('dwf_user');
    setActiveView('home');
  };

  const currentMemberData = user?.role === 'MEMBER' && user.memberId
    ? members.find(m => m.memberId === user.memberId) || null
    : null;

  // Submit Application
  const submitApplication = (appData: Omit<MembershipApplication, 'id' | 'applicationId' | 'status' | 'submittedAt'>) => {
    // Validate Nominees must sum to 100%
    const totalPercentage = appData.nominees.reduce((acc, n) => acc + (Number(n.percentage) || 0), 0);
    if (totalPercentage !== 100) {
      return { 
        success: false, 
        applicationId: '', 
        message: language === 'bn' ? 'নমিনিদের শতকরা অনুপাত অবশ্যই ১০০% হতে হবে!' : 'Total nominee distribution must equal exactly 100%!' 
      };
    }

    const appNumber = String(applications.length + 109).padStart(6, '0');
    const newAppId = `DWF-APP-2026-${appNumber}`;
    const newApp: MembershipApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      applicationId: newAppId,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setApplications(prev => [newApp, ...prev]);
    setMetrics(prev => ({ ...prev, pendingApplications: prev.pendingApplications + 1 }));

    addAuditLog('SUBMIT_APPLICATION', 'APPLICATION', newAppId, `নতুন সদস্যপদের আবেদন দাখিল: ${appData.fullName}`);

    // Send confirmation SMS
    sendSms(
      appData.phone,
      appData.fullName,
      'APPLICATION_SUBMITTED',
      `ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশনে আপনার সদস্যপদের আবেদন সফলভাবে জমা হয়েছে। ট্র্যাকিং আইডি: ${newAppId}। শীঘ্রই যাচাই করা হবে। DWF হেল্পলাইন: ১৬৭৮৯`
    );

    return {
      success: true,
      applicationId: newAppId,
      message: language === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Membership application successfully submitted!'
    };
  };

  // Approve Application -> Creates Member
  const approveApplication = (appId: string, reviewNotes = 'সব কাগজপত্র সঠিক পাওয়া গেছে ও যাচাই সম্পন্ন।') => {
    const app = applications.find(a => a.id === appId);
    if (!app) return { success: false, memberId: '' };

    const nextMemberNum = String(members.length + 145).padStart(6, '0');
    const newMemberId = `DWF-${nextMemberNum}`;
    const healthCardNum = `HC-DWF-${Math.floor(70000 + Math.random() * 29000)}`;
    const secToken = `v-dwf-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;

    const newMember: Member = {
      id: `mem-${Date.now()}`,
      memberId: newMemberId,
      name: app.fullName,
      nameBn: app.fullName,
      phone: app.phone,
      whatsapp: app.whatsapp,
      nid: app.nid,
      dob: app.dob,
      bloodGroup: app.bloodGroup,
      fatherName: app.fatherName,
      motherName: app.motherName,
      currentAddress: app.currentAddress,
      permanentAddress: app.permanentAddress,
      profession: app.profession || 'পেশাদার চালক',
      drivingLicenseNo: app.drivingLicenseNo,
      licenseType: (app.licenseType as any) || 'PROFESSIONAL_HEAVY',
      licenseExpiry: app.licenseExpiry || '2028-12-31',
      vehicleType: (app.vehicleType as any) || 'BUS',
      vehicleRegNo: app.vehicleRegNo,
      photoUrl: app.applicantPhoto || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      joinedDate: new Date().toISOString().substring(0, 10),
      healthCardNo: healthCardNum,
      healthCardExpiry: `${new Date().getFullYear() + 5}-12-31`,
      branchId: 'br-dhaka-central',
      branchName: 'ঢাকা কেন্দ্রীয় শাখা',
      verificationToken: secToken,
      monthlyContribution: 300,
      totalDeposit: 300,
      welfareBalance: 300,
      outstandingDue: 0,
      medicalAllowanceLimit: 50000,
      nominees: app.nominees
    };

    // Update Application
    setApplications(prev => prev.map(a => a.id === appId ? {
      ...a,
      status: 'APPROVED',
      reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      reviewedBy: user?.name || 'অফিসার',
      reviewNotes,
      assignedMemberId: newMemberId
    } : a));

    // Add Member
    setMembers(prev => [newMember, ...prev]);

    // Initial Registration Payment Record
    const receiptNo = `DWF-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const initPay: PaymentRecord = {
      id: `pay-${Date.now()}`,
      receiptNo,
      memberId: newMemberId,
      memberName: app.fullName,
      amount: 300,
      paymentType: 'REGISTRATION_FEE',
      paymentMethod: 'MANUAL',
      transactionId: `REG-${Date.now().toString().slice(-6)}`,
      status: 'PAID',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      remarks: 'সদস্যপদ অন্তর্ভুক্তি ও প্রথম মাসের প্রাথমিক চাঁদা'
    };
    setPayments(prev => [initPay, ...prev]);

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalMembers: prev.totalMembers + 1,
      activeMembers: prev.activeMembers + 1,
      pendingApplications: Math.max(0, prev.pendingApplications - 1),
      totalWelfareFund: prev.totalWelfareFund + 300
    }));

    addAuditLog('APPROVE_MEMBER', 'MEMBER', newMemberId, `আবেদন ${app.applicationId} অনুমোদিত এবং নতুন সদস্যপদ ${newMemberId} ইস্যু সম্পন্ন`);

    // Send SMS
    sendSms(
      newMember.phone,
      newMember.name,
      'MEMBERSHIP_APPROVED',
      `অভিনন্দন ${newMember.name}! আপনার DWF সদস্যপদ অনুমোদিত হয়েছে। সদস্য আইডি: ${newMemberId}, স্বাস্থ্য কার্ড: ${healthCardNum}। হেল্পলাইন: ১৬৭৮৯`
    );

    return { success: true, memberId: newMemberId };
  };

  const rejectApplication = (appId: string, reason: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? {
      ...a,
      status: 'REJECTED',
      reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      reviewedBy: user?.name || 'অফিসার',
      reviewNotes: reason
    } : a));

    setMetrics(prev => ({
      ...prev,
      pendingApplications: Math.max(0, prev.pendingApplications - 1)
    }));

    addAuditLog('REJECT_APPLICATION', 'APPLICATION', appId, `আবেদন বাতিল করা হয়েছে। কারণ: ${reason}`);
  };

  // Record Payment
  const recordPayment = ({
    memberId,
    amount,
    paymentType,
    paymentMethod,
    transactionId = `TXN-${Date.now().toString().slice(-8)}`,
    monthCovered,
    remarks = 'মাসিক চাঁদা পরিশোধ'
  }: {
    memberId: string;
    amount: number;
    paymentType: PaymentType;
    paymentMethod: PaymentMethod;
    transactionId?: string;
    monthCovered?: string;
    remarks?: string;
  }) => {
    const member = members.find(m => m.memberId === memberId);
    const receiptNo = `DWF-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      receiptNo,
      memberId,
      memberName: member ? member.nameBn : 'সদস্য',
      amount,
      paymentType,
      paymentMethod,
      transactionId,
      status: 'PAID',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      monthCovered: monthCovered || 'Current Month',
      remarks
    };

    setPayments(prev => [newPayment, ...prev]);

    // Update Member deposit
    setMembers(prev => prev.map(m => {
      if (m.memberId === memberId) {
        return {
          ...m,
          totalDeposit: m.totalDeposit + amount,
          welfareBalance: m.welfareBalance + amount,
          outstandingDue: Math.max(0, m.outstandingDue - amount)
        };
      }
      return m;
    }));

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalWelfareFund: prev.totalWelfareFund + amount,
      todayCollection: prev.todayCollection + amount,
      monthlyCollection: prev.monthlyCollection + amount
    }));

    addAuditLog('PAYMENT_RECEIVED', 'PAYMENT', receiptNo, `সদস্য ${memberId} এর নিকট হতে ৳${amount} (${paymentMethod}) জমা`);

    // Send SMS Receipt
    if (member) {
      sendSms(
        member.phone,
        member.nameBn,
        'PAYMENT_RECEIPT',
        `ধন্যবাদ ${member.nameBn}! আপনার ৳${amount} চাঁদা গ্রহণ করা হয়েছে। রসিদ নং: ${receiptNo}। ট্রানজেকশন: ${transactionId}। DWF`
      );
    }

    return { success: true, receiptNo };
  };

  // Medical Claim
  const submitMedicalClaim = (claim: Omit<MedicalClaim, 'id' | 'claimNo' | 'status' | 'submittedAt'>) => {
    const claimNo = `MC-2026-${String(medicalClaims.length + 50).padStart(3, '0')}`;
    const newClaim: MedicalClaim = {
      ...claim,
      id: `mc-${Date.now()}`,
      claimNo,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString().substring(0, 10)
    };

    setMedicalClaims(prev => [newClaim, ...prev]);
    addAuditLog('SUBMIT_MEDICAL_CLAIM', 'CLAIM', claimNo, `চিকিৎসা অনুদানের দাবি দাখিল: ৳${claim.claimAmount}`);

    return { success: true, claimNo };
  };

  const updateMedicalClaimStatus = (claimId: string, status: MedicalClaim['status'], approvedAmount?: number, notes?: string) => {
    setMedicalClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          status,
          approvedAmount: approvedAmount !== undefined ? approvedAmount : c.approvedAmount,
          reviewedAt: new Date().toISOString().substring(0, 10),
          reviewedBy: user?.name || 'মেডিকেল অফিসার',
          reviewNotes: notes || c.reviewNotes,
          paymentDate: status === 'PAID' ? new Date().toISOString().substring(0, 10) : c.paymentDate
        };
      }
      return c;
    }));

    if (status === 'PAID' && approvedAmount) {
      setMetrics(prev => ({
        ...prev,
        totalMedicalAssistance: prev.totalMedicalAssistance + approvedAmount
      }));
    }

    addAuditLog('UPDATE_MEDICAL_CLAIM', 'CLAIM', claimId, `মেডিকেল দাবি অবস্থা পরিবর্তন: ${status} (অনুমোদিত ৳${approvedAmount || 0})`);
  };

  // Accident Claim
  const submitAccidentClaim = (claim: Omit<AccidentClaim, 'id' | 'claimNo' | 'status' | 'submittedAt'>) => {
    const claimNo = `AC-2026-${String(accidentClaims.length + 20).padStart(3, '0')}`;
    const newClaim: AccidentClaim = {
      ...claim,
      id: `ac-${Date.now()}`,
      claimNo,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString().substring(0, 10)
    };

    setAccidentClaims(prev => [newClaim, ...prev]);
    addAuditLog('SUBMIT_ACCIDENT_CLAIM', 'CLAIM', claimNo, `দুর্ঘটনা সহায়তার আবেদন দাখিল: ৳${claim.claimAmount}`);

    return { success: true, claimNo };
  };

  const updateAccidentClaimStatus = (claimId: string, status: AccidentClaim['status'], approvedAmount?: number, notes?: string) => {
    setAccidentClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          status,
          approvedAmount: approvedAmount !== undefined ? approvedAmount : c.approvedAmount,
          reviewedAt: new Date().toISOString().substring(0, 10),
          reviewNotes: notes || c.reviewNotes
        };
      }
      return c;
    }));

    if (status === 'PAID' && approvedAmount) {
      setMetrics(prev => ({
        ...prev,
        totalAccidentAssistance: prev.totalAccidentAssistance + approvedAmount
      }));
    }

    addAuditLog('UPDATE_ACCIDENT_CLAIM', 'CLAIM', claimId, `দুর্ঘটনা সহায়তা অবস্থা পরিবর্তন: ${status}`);
  };

  // Nominees update
  const updateNominees = (memberId: string, newNominees: Nominee[]) => {
    const total = newNominees.reduce((sum, n) => sum + (Number(n.percentage) || 0), 0);
    if (total !== 100) {
      return {
        success: false,
        message: language === 'bn' ? 'সকল নমিনির মোট শতকরা ভাগ অবশ্যই ১০০% হতে হবে!' : 'Total nominee percentages must equal exactly 100%!'
      };
    }

    setMembers(prev => prev.map(m => m.memberId === memberId ? { ...m, nominees: newNominees } : m));
    addAuditLog('UPDATE_NOMINEES', 'MEMBER', memberId, `নমিনি তথ্য হালনাগাদ করা হয়েছে (মোট ১০০% নিশ্চিত)`);

    return {
      success: true,
      message: language === 'bn' ? 'নমিনি তথ্য সফলভাবে সংরক্ষিত হয়েছে!' : 'Nominees successfully updated!'
    };
  };

  // Send SMS
  const sendSms = (phone: string, name: string, template: string, message: string) => {
    const newRecord: SmsRecord = {
      id: `sms-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      recipientPhone: phone,
      recipientName: name,
      template,
      message,
      status: 'DELIVERED',
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      cost: 0.35
    };
    setSmsRecords(prev => [newRecord, ...prev]);
  };

  // Public Member Verification (Strict Privacy Preserving)
  const verifyMember = (query: string): PublicVerificationResult => {
    const clean = query.trim().toUpperCase();
    const found = members.find(m => 
      m.memberId.toUpperCase() === clean || 
      m.verificationToken.toUpperCase() === clean || 
      m.healthCardNo.toUpperCase() === clean
    );

    if (!found) {
      return { found: false };
    }

    // Never return private NID, address, bank info, or nominees to public lookup!
    return {
      found: true,
      memberId: found.memberId,
      name: language === 'bn' ? found.nameBn : found.name,
      status: found.status,
      bloodGroup: found.bloodGroup,
      healthCardNo: found.healthCardNo,
      healthCardExpiry: found.healthCardExpiry,
      joinedDate: found.joinedDate,
      branchName: found.branchName,
      profession: found.profession
    };
  };

  return (
    <DwfContext.Provider value={{
      language,
      setLanguage,
      t,
      user,
      loginAsMember,
      loginAsAdmin,
      logout,
      activeView,
      setActiveView,
      members,
      applications,
      payments,
      medicalClaims,
      accidentClaims,
      notices,
      branches,
      auditLogs,
      smsRecords,
      metrics,
      showApplyModal,
      setShowApplyModal,
      showVerifyModal,
      setShowVerifyModal,
      showLoginModal,
      setShowLoginModal,
      submitApplication,
      approveApplication,
      rejectApplication,
      recordPayment,
      submitMedicalClaim,
      updateMedicalClaimStatus,
      submitAccidentClaim,
      updateAccidentClaimStatus,
      updateNominees,
      sendSms,
      verifyMember,
      currentMemberData
    }}>
      {children}
    </DwfContext.Provider>
  );
};

export const useDwf = () => {
  const context = useContext(DwfContext);
  if (!context) {
    throw new Error('useDwf must be used within a DwfProvider');
  }
  return context;
};
