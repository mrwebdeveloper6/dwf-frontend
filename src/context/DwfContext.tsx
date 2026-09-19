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
  CommitteeMember,
  Branch, 
  AuditLog, 
  SmsRecord, 
  SystemMetrics,
  Nominee,
  PaymentMethod,
  PaymentType,
  StoredFile,
  StorageOption,
  FileCategory,
  ProfileUpdateRequest
} from '../types/dwf';
import { 
  initialMembers, 
  initialApplications, 
  initialPayments, 
  initialMedicalClaims, 
  initialAccidentClaims, 
  initialNotices, 
  initialCommitteeMembers,
  initialBranches, 
  initialAuditLogs, 
  initialSmsRecords, 
  initialSystemMetrics,
  initialProfileUpdateRequests
} from '../data/initialData';
import { translations } from '../lib/i18n';
import { 
  uploadDocumentFile, 
  removeDocumentFile, 
  initialSampleFiles 
} from '../lib/storage';
import {
  syncMemberToFirestore,
  syncApplicationToFirestore,
  syncPaymentToFirestore,
  syncMedicalClaimToFirestore,
  syncAccidentClaimToFirestore,
  syncAuditLogToFirestore,
  syncMetricsToFirestore,
  syncCommitteeMemberToFirestore,
  deleteCommitteeMemberFromFirestore,
  syncNoticeToFirestore,
  deleteNoticeFromFirestore,
  syncProfileUpdateRequestToFirestore,
  seedInitialFirestoreData,
  fetchAllFromFirestore
} from '../lib/firebase';

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
  committeeMembers: CommitteeMember[];
  branches: Branch[];
  auditLogs: AuditLog[];
  smsRecords: SmsRecord[];
  metrics: SystemMetrics;
  storedFiles: StoredFile[];
  profileUpdateRequests: ProfileUpdateRequest[];

  // Modals
  showApplyModal: boolean;
  setShowApplyModal: (open: boolean) => void;
  showVerifyModal: boolean;
  setShowVerifyModal: (open: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (open: boolean) => void;
  showDocumentVaultModal: boolean;
  setShowDocumentVaultModal: (open: boolean) => void;
  documentVaultCategoryFilter?: FileCategory;
  setDocumentVaultCategoryFilter: (cat?: FileCategory) => void;

  // Actions
  uploadFileRecord: (file: File, params: { category: FileCategory; preferredStorage?: StorageOption; memberId?: string; memberName?: string; description?: string }) => Promise<{ success: boolean; file: StoredFile; message: string }>;
  deleteFileRecord: (fileId: string) => Promise<boolean>;
  submitApplication: (appData: Omit<MembershipApplication, 'id' | 'applicationId' | 'status' | 'submittedAt'>) => { success: boolean; applicationId: string; message: string };
  approveApplication: (appId: string, reviewNotes?: string) => { success: boolean; memberId: string };
  rejectApplication: (appId: string, reason: string) => void;
  recordPayment: (payment: { memberId: string; amount: number; paymentType: PaymentType; paymentMethod: PaymentMethod; transactionId?: string; monthCovered?: string; remarks?: string }) => { success: boolean; receiptNo: string };
  submitMedicalClaim: (claim: Omit<MedicalClaim, 'id' | 'claimNo' | 'status' | 'submittedAt'>) => { success: boolean; claimNo: string };
  updateMedicalClaimStatus: (claimId: string, status: MedicalClaim['status'], approvedAmount?: number, notes?: string) => void;
  submitAccidentClaim: (claim: Omit<AccidentClaim, 'id' | 'claimNo' | 'status' | 'submittedAt'>) => { success: boolean; claimNo: string };
  updateAccidentClaimStatus: (claimId: string, status: AccidentClaim['status'], approvedAmount?: number, notes?: string) => void;
  updateNominees: (memberId: string, nominees: Nominee[]) => { success: boolean; message: string };
  submitProfileUpdateRequest: (request: Omit<ProfileUpdateRequest, 'id' | 'requestId' | 'status' | 'submittedAt'>) => { success: boolean; requestId: string; message: string };
  approveProfileUpdateRequest: (requestId: string, reviewNotes?: string) => { success: boolean; message: string };
  rejectProfileUpdateRequest: (requestId: string, reason: string) => { success: boolean; message: string };
  addCommitteeMember: (memberData: Omit<CommitteeMember, 'id'>) => { success: boolean; id: string };
  updateCommitteeMember: (id: string, updates: Partial<CommitteeMember>) => { success: boolean };
  deleteCommitteeMember: (id: string) => { success: boolean };
  addNotice: (noticeData: Omit<NoticeItem, 'id'>) => { success: boolean; id: string };
  updateNotice: (id: string, updates: Partial<NoticeItem>) => { success: boolean };
  deleteNotice: (id: string) => { success: boolean };
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
  const [showDocumentVaultModal, setShowDocumentVaultModal] = useState<boolean>(false);
  const [documentVaultCategoryFilter, setDocumentVaultCategoryFilter] = useState<FileCategory | undefined>(undefined);

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

  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    const saved = localStorage.getItem('dwf_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>(() => {
    const saved = localStorage.getItem('dwf_committee_members');
    return saved ? JSON.parse(saved) : initialCommitteeMembers;
  });
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
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>(() => {
    const saved = localStorage.getItem('dwf_stored_files');
    return saved ? JSON.parse(saved) : initialSampleFiles;
  });
  const [profileUpdateRequests, setProfileUpdateRequests] = useState<ProfileUpdateRequest[]>(() => {
    const saved = localStorage.getItem('dwf_profile_requests');
    return saved ? JSON.parse(saved) : initialProfileUpdateRequests;
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
    localStorage.setItem('dwf_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('dwf_committee_members', JSON.stringify(committeeMembers));
  }, [committeeMembers]);

  useEffect(() => {
    localStorage.setItem('dwf_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('dwf_sms_records', JSON.stringify(smsRecords));
  }, [smsRecords]);

  useEffect(() => {
    localStorage.setItem('dwf_metrics', JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem('dwf_stored_files', JSON.stringify(storedFiles));
  }, [storedFiles]);

  useEffect(() => {
    localStorage.setItem('dwf_profile_requests', JSON.stringify(profileUpdateRequests));
  }, [profileUpdateRequests]);

  // Initial Cloud Firestore Synchronization
  useEffect(() => {
    let isMounted = true;
    const initCloudDb = async () => {
      try {
        const cloudData = await fetchAllFromFirestore();
        if (cloudData && isMounted) {
          if (cloudData.members && cloudData.members.length > 0) {
            setMembers(cloudData.members);
          }
          if (cloudData.applications && cloudData.applications.length > 0) {
            setApplications(cloudData.applications);
          }
          if (cloudData.payments && cloudData.payments.length > 0) {
            setPayments(cloudData.payments);
          }
          if (cloudData.medicalClaims && cloudData.medicalClaims.length > 0) {
            setMedicalClaims(cloudData.medicalClaims);
          }
          if (cloudData.accidentClaims && cloudData.accidentClaims.length > 0) {
            setAccidentClaims(cloudData.accidentClaims);
          }
          if (cloudData.metrics) {
            setMetrics(cloudData.metrics);
          }
          if (cloudData.storedFiles && cloudData.storedFiles.length > 0) {
            setStoredFiles(cloudData.storedFiles);
          }
          if (cloudData.committeeMembers && cloudData.committeeMembers.length > 0) {
            setCommitteeMembers(cloudData.committeeMembers);
          }
          if (cloudData.notices && cloudData.notices.length > 0) {
            setNotices(cloudData.notices);
          }
          if (cloudData.profileUpdateRequests && cloudData.profileUpdateRequests.length > 0) {
            setProfileUpdateRequests(cloudData.profileUpdateRequests);
          }
        } else {
          // Cloud collection is fresh/empty; seed initial data
          await seedInitialFirestoreData({
            members: initialMembers,
            applications: initialApplications,
            payments: initialPayments,
            medicalClaims: initialMedicalClaims,
            accidentClaims: initialAccidentClaims,
            metrics: initialSystemMetrics
          });
        }
      } catch (err) {
        console.warn('Firebase initial sync deferred, running with local storage:', err);
      }
    };
    initCloudDb();
    return () => { isMounted = false; };
  }, []);

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
    syncAuditLogToFirestore(newLog);
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
    setShowDocumentVaultModal(false);
    setActiveView('home');
  };

  const handleSetShowDocumentVaultModal = (open: boolean) => {
    if (open && !user) {
      setShowLoginModal(true);
      return;
    }
    setShowDocumentVaultModal(open);
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
    setMetrics(prev => {
      const updated = { ...prev, pendingApplications: prev.pendingApplications + 1 };
      syncMetricsToFirestore(updated);
      return updated;
    });

    syncApplicationToFirestore(newApp);

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
    const updatedApp: MembershipApplication = {
      ...app,
      status: 'APPROVED',
      reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      reviewedBy: user?.name || 'অফিসার',
      reviewNotes,
      assignedMemberId: newMemberId
    };
    setApplications(prev => prev.map(a => a.id === appId ? updatedApp : a));
    syncApplicationToFirestore(updatedApp);

    // Add Member
    setMembers(prev => [newMember, ...prev]);
    syncMemberToFirestore(newMember);

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
    syncPaymentToFirestore(initPay);

    // Update metrics
    setMetrics(prev => {
      const updated = {
        ...prev,
        totalMembers: prev.totalMembers + 1,
        activeMembers: prev.activeMembers + 1,
        pendingApplications: Math.max(0, prev.pendingApplications - 1),
        totalWelfareFund: prev.totalWelfareFund + 300
      };
      syncMetricsToFirestore(updated);
      return updated;
    });

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
    const targetApp = applications.find(a => a.id === appId);
    if (targetApp) {
      const updatedApp: MembershipApplication = {
        ...targetApp,
        status: 'REJECTED',
        reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        reviewedBy: user?.name || 'অফিসার',
        reviewNotes: reason
      };
      setApplications(prev => prev.map(a => a.id === appId ? updatedApp : a));
      syncApplicationToFirestore(updatedApp);
    }

    setMetrics(prev => {
      const updated = {
        ...prev,
        pendingApplications: Math.max(0, prev.pendingApplications - 1)
      };
      syncMetricsToFirestore(updated);
      return updated;
    });

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
    syncPaymentToFirestore(newPayment);

    // Update Member deposit
    setMembers(prev => prev.map(m => {
      if (m.memberId === memberId) {
        const updated = {
          ...m,
          totalDeposit: m.totalDeposit + amount,
          welfareBalance: m.welfareBalance + amount,
          outstandingDue: Math.max(0, m.outstandingDue - amount)
        };
        syncMemberToFirestore(updated);
        return updated;
      }
      return m;
    }));

    // Update metrics
    setMetrics(prev => {
      const updated = {
        ...prev,
        totalWelfareFund: prev.totalWelfareFund + amount,
        todayCollection: prev.todayCollection + amount,
        monthlyCollection: prev.monthlyCollection + amount
      };
      syncMetricsToFirestore(updated);
      return updated;
    });

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
    syncMedicalClaimToFirestore(newClaim);
    addAuditLog('SUBMIT_MEDICAL_CLAIM', 'CLAIM', claimNo, `চিকিৎসা অনুদানের দাবি দাখিল: ৳${claim.claimAmount}`);

    return { success: true, claimNo };
  };

  const updateMedicalClaimStatus = (claimId: string, status: MedicalClaim['status'], approvedAmount?: number, notes?: string) => {
    setMedicalClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        const updated = {
          ...c,
          status,
          approvedAmount: approvedAmount !== undefined ? approvedAmount : c.approvedAmount,
          reviewedAt: new Date().toISOString().substring(0, 10),
          reviewedBy: user?.name || 'মেডিকেল অফিসার',
          reviewNotes: notes || c.reviewNotes,
          paymentDate: status === 'PAID' ? new Date().toISOString().substring(0, 10) : c.paymentDate
        };
        syncMedicalClaimToFirestore(updated);
        return updated;
      }
      return c;
    }));

    if (status === 'PAID' && approvedAmount) {
      setMetrics(prev => {
        const updated = {
          ...prev,
          totalMedicalAssistance: prev.totalMedicalAssistance + approvedAmount
        };
        syncMetricsToFirestore(updated);
        return updated;
      });
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
    syncAccidentClaimToFirestore(newClaim);
    addAuditLog('SUBMIT_ACCIDENT_CLAIM', 'CLAIM', claimNo, `দুর্ঘটনা সহায়তার আবেদন দাখিল: ৳${claim.claimAmount}`);

    return { success: true, claimNo };
  };

  const updateAccidentClaimStatus = (claimId: string, status: AccidentClaim['status'], approvedAmount?: number, notes?: string) => {
    setAccidentClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        const updated = {
          ...c,
          status,
          approvedAmount: approvedAmount !== undefined ? approvedAmount : c.approvedAmount,
          reviewedAt: new Date().toISOString().substring(0, 10),
          reviewNotes: notes || c.reviewNotes
        };
        syncAccidentClaimToFirestore(updated);
        return updated;
      }
      return c;
    }));

    if (status === 'PAID' && approvedAmount) {
      setMetrics(prev => {
        const updated = {
          ...prev,
          totalAccidentAssistance: prev.totalAccidentAssistance + approvedAmount
        };
        syncMetricsToFirestore(updated);
        return updated;
      });
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

    setMembers(prev => prev.map(m => {
      if (m.memberId === memberId) {
        const updated = { ...m, nominees: newNominees };
        syncMemberToFirestore(updated);
        return updated;
      }
      return m;
    }));
    addAuditLog('UPDATE_NOMINEES', 'MEMBER', memberId, `নমিনি তথ্য হালনাগাদ করা হয়েছে (মোট ১০০% নিশ্চিত)`);

    return {
      success: true,
      message: language === 'bn' ? 'নমিনি তথ্য সফলভাবে সংরক্ষিত হয়েছে!' : 'Nominees successfully updated!'
    };
  };

  // Profile Update Request Workflow with Admin Approval
  const submitProfileUpdateRequest = (
    reqData: Omit<ProfileUpdateRequest, 'id' | 'requestId' | 'status' | 'submittedAt'>
  ) => {
    const requestId = `PUR-2026-${String(profileUpdateRequests.length + 1).padStart(4, '0')}`;
    const newRequest: ProfileUpdateRequest = {
      ...reqData,
      id: `pur-${Date.now()}`,
      requestId,
      status: 'PENDING',
      submittedAt: new Date().toISOString().substring(0, 10)
    };

    setProfileUpdateRequests(prev => [newRequest, ...prev]);
    syncProfileUpdateRequestToFirestore(newRequest);

    addAuditLog(
      'SUBMIT_PROFILE_UPDATE_REQUEST',
      'PROFILE_UPDATE',
      requestId,
      `সদস্য ${reqData.memberId} প্রোফাইল তথ্য পরিবর্তনের আবেদন করেছেন (অনুমোদনের অপেক্ষায়)`
    );

    sendSms(
      reqData.currentData.phone,
      reqData.memberName,
      'PROFILE_UPDATE_SUBMITTED',
      `আপনার প্রোফাইল পরিবর্তনের আবেদন দাখিল হয়েছে (আইডি: ${requestId})। অ্যাডমিন যাচাই ও অনুমোদন শেষে আপনার অ্যাকাউন্টে হালনাগাদ হবে।`
    );

    return {
      success: true,
      requestId,
      message: language === 'bn' 
        ? `প্রোফাইল পরিবর্তনের আবেদন সফলভাবে জমা হয়েছে (আইডি: ${requestId})। অ্যাডমিন যাচাই ও অনুমোদনের পর ডাটাবেসে কার্যকর হবে।`
        : `Profile update request submitted (ID: ${requestId}). Changes will reflect upon admin approval.`
    };
  };

  const approveProfileUpdateRequest = (requestId: string, reviewNotes?: string) => {
    const target = profileUpdateRequests.find(r => r.id === requestId || r.requestId === requestId);
    if (!target) {
      return { success: false, message: 'Request not found' };
    }

    const reviewedAt = new Date().toISOString().substring(0, 10);
    const reviewer = user?.name || (language === 'bn' ? 'অ্যাডমিন বোর্ড' : 'Admin Board');

    const updatedRequest: ProfileUpdateRequest = {
      ...target,
      status: 'APPROVED',
      reviewedAt,
      reviewedBy: reviewer,
      reviewNotes: reviewNotes || (language === 'bn' ? 'সকল তথ্য ও নথিপত্র সফলভাবে যাচাইপূর্বক অনুমোদিত' : 'Approved after verification')
    };

    setProfileUpdateRequests(prev => prev.map(r => (r.id === target.id ? updatedRequest : r)));
    syncProfileUpdateRequestToFirestore(updatedRequest);

    // Apply approved changes to the Member record in DB
    setMembers(prev => prev.map(m => {
      if (m.memberId === target.memberId) {
        const up: Member = {
          ...m,
          name: target.requestedChanges.name ?? m.name,
          nameBn: target.requestedChanges.nameBn ?? m.nameBn,
          phone: target.requestedChanges.phone ?? m.phone,
          whatsapp: target.requestedChanges.whatsapp ?? m.whatsapp,
          photoUrl: target.requestedChanges.photoUrl ?? m.photoUrl,
          bloodGroup: target.requestedChanges.bloodGroup ?? m.bloodGroup,
          currentAddress: target.requestedChanges.currentAddress ?? m.currentAddress,
          permanentAddress: target.requestedChanges.permanentAddress ?? m.permanentAddress,
          drivingLicenseNo: target.requestedChanges.drivingLicenseNo ?? m.drivingLicenseNo,
          vehicleType: (target.requestedChanges.vehicleType as any) ?? m.vehicleType,
          vehicleRegNo: target.requestedChanges.vehicleRegNo ?? m.vehicleRegNo,
          nominees: target.requestedChanges.nominees && target.requestedChanges.nominees.length > 0 
            ? target.requestedChanges.nominees 
            : m.nominees
        };
        syncMemberToFirestore(up);

        // If currently logged in user is this member, sync session
        if (user && user.memberId === m.memberId) {
          const updatedSession: UserSession = {
            ...user,
            name: language === 'bn' ? up.nameBn : up.name,
            phone: up.phone,
            avatar: up.photoUrl
          };
          setUser(updatedSession);
          localStorage.setItem('dwf_user', JSON.stringify(updatedSession));
        }

        return up;
      }
      return m;
    }));

    addAuditLog(
      'APPROVE_PROFILE_UPDATE',
      'PROFILE_UPDATE',
      target.requestId,
      `সদস্য ${target.memberId} এর প্রোফাইল পরিবর্তনের আবেদন অনুমোদিত এবং ডাটাবেস হালনাগাদ সম্পন্ন`
    );

    sendSms(
      target.requestedChanges.phone || target.currentData.phone,
      target.memberName,
      'PROFILE_UPDATE_APPROVED',
      `অভিনন্দন! আপনার প্রোফাইল পরিবর্তনের আবেদন (${target.requestId}) অনুমোদিত হয়েছে এবং সিস্টেমে কার্যকর করা হয়েছে। হেল্পলাইন: ১৬৭৮৯`
    );

    return {
      success: true,
      message: language === 'bn'
        ? `আবেদন ${target.requestId} অনুমোদিত হয়েছে এবং সদস্যের ডাটাবেস সফলভাবে আপডেট হয়েছে!`
        : `Request ${target.requestId} approved and database updated!`
    };
  };

  const rejectProfileUpdateRequest = (requestId: string, reason: string) => {
    const target = profileUpdateRequests.find(r => r.id === requestId || r.requestId === requestId);
    if (!target) {
      return { success: false, message: 'Request not found' };
    }

    const reviewedAt = new Date().toISOString().substring(0, 10);
    const reviewer = user?.name || (language === 'bn' ? 'অ্যাডমিন বোর্ড' : 'Admin Board');

    const updatedRequest: ProfileUpdateRequest = {
      ...target,
      status: 'REJECTED',
      reviewedAt,
      reviewedBy: reviewer,
      reviewNotes: reason || (language === 'bn' ? 'কাগজপত্রে অসঙ্গতির কারণে বাতিল করা হলো' : 'Rejected due to discrepancies')
    };

    setProfileUpdateRequests(prev => prev.map(r => (r.id === target.id ? updatedRequest : r)));
    syncProfileUpdateRequestToFirestore(updatedRequest);

    addAuditLog(
      'REJECT_PROFILE_UPDATE',
      'PROFILE_UPDATE',
      target.requestId,
      `সদস্য ${target.memberId} এর প্রোফাইল পরিবর্তনের আবেদন বাতিল। কারণ: ${reason}`
    );

    sendSms(
      target.currentData.phone,
      target.memberName,
      'PROFILE_UPDATE_REJECTED',
      `আপনার প্রোফাইল পরিবর্তনের আবেদন (${target.requestId}) বাতিল হয়েছে। কারণ: ${reason}। বিস্তারিত জানতে শাখায় যোগাযোগ করুন।`
    );

    return {
      success: true,
      message: language === 'bn' ? 'আবেদন বাতিল করা হয়েছে।' : 'Request rejected.'
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

  // Upload document file to chosen storage (Firebase Cloud Storage or Local Vault)
  const uploadFileRecord = async (
    file: File, 
    params: { category: FileCategory; preferredStorage?: StorageOption; memberId?: string; memberName?: string; description?: string }
  ) => {
    const actorName = user?.name || 'অনলাইন চালক সদস্য';
    const result = await uploadDocumentFile(file, {
      ...params,
      uploadedBy: actorName
    });

    if (result.success) {
      setStoredFiles(prev => [result.file, ...prev]);
      addAuditLog(
        'FILE_UPLOAD',
        'STORAGE_VAULT',
        result.file.id,
        `ফাইল আপলোড: ${result.file.name} (${result.file.storageType === 'FIREBASE_STORAGE' ? 'Firebase Cloud' : 'Local Vault'})`
      );
    }
    return result;
  };

  // Delete document file
  const deleteFileRecord = async (fileId: string) => {
    const target = storedFiles.find(f => f.id === fileId);
    if (!target) return false;
    await removeDocumentFile(target);
    setStoredFiles(prev => prev.filter(f => f.id !== fileId));

    addAuditLog(
      'FILE_DELETE',
      'STORAGE_VAULT',
      fileId,
      `ফাইল মুছে ফেলা হয়েছে: ${target.name}`
    );

    return true;
  };

  // Committee Leadership Actions
  const addCommitteeMember = (memberData: Omit<CommitteeMember, 'id'>) => {
    const id = `cm-${Date.now()}`;
    const cleanPhone = memberData.cleanPhone || memberData.phone.replace(/[^0-9+]/g, '');
    const formattedCleanPhone = cleanPhone.startsWith('+88') 
      ? cleanPhone 
      : `+88${cleanPhone.startsWith('0') ? cleanPhone : '0' + cleanPhone}`;
    
    const newMember: CommitteeMember = {
      ...memberData,
      id,
      cleanPhone: formattedCleanPhone,
      order: memberData.order || (committeeMembers.length + 1)
    };

    setCommitteeMembers(prev => [newMember, ...prev]);
    syncCommitteeMemberToFirestore(newMember);
    addAuditLog(
      'COMMITTEE_MEMBER_ADD',
      'COMMITTEE',
      id,
      `নতুন কর্মকর্তা যুক্ত: ${newMember.nameBn} (${newMember.designationBn})`
    );
    return { success: true, id };
  };

  const updateCommitteeMember = (id: string, updates: Partial<CommitteeMember>) => {
    let updatedMember: CommitteeMember | null = null;
    setCommitteeMembers(prev => prev.map(m => {
      if (m.id === id) {
        let cleanPhone = updates.cleanPhone || m.cleanPhone;
        if (updates.phone && !updates.cleanPhone) {
          const raw = updates.phone.replace(/[^0-9+]/g, '');
          cleanPhone = raw.startsWith('+88') ? raw : `+88${raw.startsWith('0') ? raw : '0' + raw}`;
        }
        updatedMember = { ...m, ...updates, cleanPhone };
        return updatedMember;
      }
      return m;
    }));

    if (updatedMember) {
      syncCommitteeMemberToFirestore(updatedMember);
      addAuditLog(
        'COMMITTEE_MEMBER_UPDATE',
        'COMMITTEE',
        id,
        `কর্মকর্তার তথ্য সংশোধন: ${(updatedMember as CommitteeMember).nameBn}`
      );
    }
    return { success: true };
  };

  const deleteCommitteeMember = (id: string) => {
    const target = committeeMembers.find(m => m.id === id);
    setCommitteeMembers(prev => prev.filter(m => m.id !== id));
    deleteCommitteeMemberFromFirestore(id);
    if (target) {
      addAuditLog(
        'COMMITTEE_MEMBER_DELETE',
        'COMMITTEE',
        id,
        `কর্মকর্তা অপসারণ: ${target.nameBn} (${target.designationBn})`
      );
    }
    return { success: true };
  };

  // Official News & Notices Actions
  const addNotice = (noticeData: Omit<NoticeItem, 'id'>) => {
    const id = `not-${Date.now()}`;
    const newNotice: NoticeItem = {
      ...noticeData,
      id
    };
    setNotices(prev => [newNotice, ...prev]);
    syncNoticeToFirestore(newNotice);
    addAuditLog(
      'NOTICE_PUBLISH',
      'CIRCULAR',
      id,
      `বিজ্ঞপ্তি প্রকাশ: ${newNotice.titleBn} (${newNotice.category})`
    );
    return { success: true, id };
  };

  const updateNotice = (id: string, updates: Partial<NoticeItem>) => {
    let updatedNotice: NoticeItem | null = null;
    setNotices(prev => prev.map(n => {
      if (n.id === id) {
        updatedNotice = { ...n, ...updates };
        return updatedNotice;
      }
      return n;
    }));

    if (updatedNotice) {
      syncNoticeToFirestore(updatedNotice);
      addAuditLog(
        'NOTICE_UPDATE',
        'CIRCULAR',
        id,
        `বিজ্ঞপ্তি সংশোধন: ${(updatedNotice as NoticeItem).titleBn}`
      );
    }
    return { success: true };
  };

  const deleteNotice = (id: string) => {
    const target = notices.find(n => n.id === id);
    setNotices(prev => prev.filter(n => n.id !== id));
    deleteNoticeFromFirestore(id);
    if (target) {
      addAuditLog(
        'NOTICE_DELETE',
        'CIRCULAR',
        id,
        `বিজ্ঞপ্তি অপসারণ: ${target.titleBn}`
      );
    }
    return { success: true };
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
      committeeMembers,
      branches,
      auditLogs,
      smsRecords,
      metrics,
      storedFiles,
      profileUpdateRequests,
      showApplyModal,
      setShowApplyModal,
      showVerifyModal,
      setShowVerifyModal,
      showLoginModal,
      setShowLoginModal,
      showDocumentVaultModal,
      setShowDocumentVaultModal: handleSetShowDocumentVaultModal,
      documentVaultCategoryFilter,
      setDocumentVaultCategoryFilter,
      uploadFileRecord,
      deleteFileRecord,
      submitApplication,
      approveApplication,
      rejectApplication,
      recordPayment,
      submitMedicalClaim,
      updateMedicalClaimStatus,
      submitAccidentClaim,
      updateAccidentClaimStatus,
      updateNominees,
      submitProfileUpdateRequest,
      approveProfileUpdateRequest,
      rejectProfileUpdateRequest,
      addCommitteeMember,
      updateCommitteeMember,
      deleteCommitteeMember,
      addNotice,
      updateNotice,
      deleteNotice,
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
