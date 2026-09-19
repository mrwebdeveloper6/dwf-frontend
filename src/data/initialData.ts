import { 
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
  ProfileUpdateRequest
} from '../types/dwf';

export const initialSystemMetrics: SystemMetrics = {
  totalMembers: 14850,
  activeMembers: 12420,
  pendingApplications: 34,
  totalWelfareFund: 48550000, // 4.85 Crore BDT
  totalMedicalAssistance: 7840000, // 78.4 Lac BDT
  totalAccidentAssistance: 5220000, // 52.2 Lac BDT
  trainedMembers: 8920,
  monthlyCollection: 3726000,
  todayCollection: 128400
};

export const initialMembers: Member[] = [
  {
    id: 'mem-1',
    memberId: 'DWF-000142',
    name: 'Md. Kamal Hossain',
    nameBn: 'মোঃ কামাল হোসেন',
    phone: '01711-234567',
    whatsapp: '01711-234567',
    email: 'kamal.driver@dwf.org.bd',
    nid: '19842691234567890',
    dob: '1984-05-12',
    bloodGroup: 'B+',
    fatherName: 'মরহুম আব্দুল জলিল',
    motherName: 'মোসাঃ রোকেয়া বেগম',
    currentAddress: 'বাসা # ১২, রোড # ৪, মিরপুর-১০, ঢাকা',
    permanentAddress: 'গ্রাম: চরভদ্রাসন, ডাকঘর: চরভদ্রাসন, জেলা: ফরিদপুর',
    profession: 'দূরপাল্লার বাস চালক (শ্যামলী পরিবহন)',
    drivingLicenseNo: 'DK-7890452-PROF',
    licenseType: 'PROFESSIONAL_HEAVY',
    licenseExpiry: '2028-11-30',
    vehicleType: 'BUS',
    vehicleRegNo: 'ঢাকা মেট্রো-ব ১৪-৯৮২৩',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    status: 'ACTIVE',
    joinedDate: '2022-03-15',
    healthCardNo: 'HC-DWF-78401',
    healthCardExpiry: '2027-03-14',
    branchId: 'br-dhaka',
    branchName: 'ঢাকা কেন্দ্রীয় শাখা (সায়েদাবাদ)',
    verificationToken: 'v-dwf-998822-kamal-sec',
    monthlyContribution: 300,
    totalDeposit: 14400,
    welfareBalance: 14400,
    outstandingDue: 0,
    medicalAllowanceLimit: 50000,
    nominees: [
      {
        id: 'nom-1',
        name: 'মোসাঃ নাসিমা আক্তার',
        relationship: 'স্ত্রী (Wife)',
        nid: '19882695555555555',
        mobile: '01722-987654',
        address: 'মিরপুর-১০, ঢাকা',
        percentage: 70
      },
      {
        id: 'nom-2',
        name: 'তানভীর হোসেন',
        relationship: 'পুত্র (Son)',
        nid: '20052697777777777',
        mobile: '01733-112233',
        address: 'মিরপুর-১০, ঢাকা',
        percentage: 30
      }
    ]
  },
  {
    id: 'mem-2',
    memberId: 'DWF-000143',
    name: 'Md. Rafiqul Islam',
    nameBn: 'মোঃ রফিকুল ইসলাম',
    phone: '01819-876543',
    whatsapp: '01819-876543',
    email: 'rafiqul@dwf.org.bd',
    nid: '19875412345678901',
    dob: '1987-09-20',
    bloodGroup: 'O+',
    fatherName: 'মোঃ শফিউদ্দিন আহমেদ',
    motherName: 'হোসনে আরা বেগম',
    currentAddress: 'আগ্রাবাদ সিডিএ কলোনি, চট্টগ্রাম',
    permanentAddress: 'থানা: সীতাকুণ্ড, জেলা: চট্টগ্রাম',
    profession: 'ভারী ট্রাক চালক (কনটেইনার মুভার)',
    drivingLicenseNo: 'CTG-4512980-PROF',
    licenseType: 'PROFESSIONAL_HEAVY',
    licenseExpiry: '2027-06-15',
    vehicleType: 'TRUCK',
    vehicleRegNo: 'চট্ট মেট্রো-ট ১১-৫৬৭৮',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    status: 'ACTIVE',
    joinedDate: '2023-01-10',
    healthCardNo: 'HC-DWF-78402',
    healthCardExpiry: '2028-01-09',
    branchId: 'br-ctg',
    branchName: 'চট্টগ্রাম বন্দর শাখা',
    verificationToken: 'v-dwf-776633-rafiq-sec',
    monthlyContribution: 300,
    totalDeposit: 10800,
    welfareBalance: 10800,
    outstandingDue: 300,
    medicalAllowanceLimit: 50000,
    nominees: [
      {
        id: 'nom-3',
        name: 'সালমা খাতুন',
        relationship: 'স্ত্রী (Wife)',
        nid: '19915418888888888',
        mobile: '01822-334455',
        address: 'সীতাকুণ্ড, চট্টগ্রাম',
        percentage: 100
      }
    ]
  },
  {
    id: 'mem-3',
    memberId: 'DWF-000144',
    name: 'Anisur Rahman',
    nameBn: 'আনিসুর রহমান',
    phone: '01912-445566',
    nid: '19902693344556677',
    dob: '1990-11-05',
    bloodGroup: 'A+',
    fatherName: 'মোঃ মোখলেছুর রহমান',
    motherName: 'মরিয়ম বেগম',
    currentAddress: 'গাবতলী বাস টার্মিনাল কোয়ার্টার, ঢাকা',
    permanentAddress: 'সদর, মানিকগঞ্জ',
    profession: 'মাইক্রোবাস ও প্রাইভেটকার চালক',
    drivingLicenseNo: 'DH-6623190-MED',
    licenseType: 'PROFESSIONAL_LIGHT',
    licenseExpiry: '2026-10-31',
    vehicleType: 'MICROBUS',
    vehicleRegNo: 'ঢাকা মেট্রো-চ ১৫-৩২১১',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    status: 'ACTIVE',
    joinedDate: '2023-08-01',
    healthCardNo: 'HC-DWF-78403',
    healthCardExpiry: '2028-07-31',
    branchId: 'br-dhaka',
    branchName: 'ঢাকা কেন্দ্রীয় শাখা (গাবতলী)',
    verificationToken: 'v-dwf-554411-anis-sec',
    monthlyContribution: 300,
    totalDeposit: 9000,
    welfareBalance: 9000,
    outstandingDue: 0,
    medicalAllowanceLimit: 50000,
    nominees: [
      {
        id: 'nom-4',
        name: 'ফাতেমা আক্তার',
        relationship: 'মা (Mother)',
        nid: '19682691122334455',
        mobile: '01915-998877',
        address: 'সদর, মানিকগঞ্জ',
        percentage: 100
      }
    ]
  }
];

export const initialApplications: MembershipApplication[] = [
  {
    id: 'app-1',
    applicationId: 'DWF-APP-2026-000108',
    fullName: 'Md. Jahangir Alam',
    fatherName: 'মোঃ আব্দুল কুদ্দুস',
    motherName: 'সুফিয়া বেগম',
    dob: '1989-04-18',
    nid: '19894412987654321',
    phone: '01715-998811',
    whatsapp: '01715-998811',
    bloodGroup: 'AB+',
    profession: 'আন্তঃজেলা বাস চালক (হানিফ এন্টারপ্রাইজ)',
    currentAddress: 'কল্যাণপুর বাসস্ট্যান্ড, ঢাকা',
    permanentAddress: 'ডাকঘর: শেরপুর সদর, জেলা: শেরপুর',
    drivingLicenseNo: 'SH-8890123-PROF',
    licenseType: 'PROFESSIONAL_HEAVY',
    licenseExpiry: '2029-08-20',
    vehicleType: 'BUS',
    vehicleRegNo: 'ঢাকা মেট্রো-ব ১৫-৪৩০৯',
    applicantPhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    status: 'UNDER_REVIEW',
    submittedAt: '2026-09-15 14:30',
    nominees: [
      {
        id: 'nom-app-1',
        name: 'মোসাঃ তহমিনা আক্তার',
        relationship: 'স্ত্রী',
        nid: '19924419999999999',
        mobile: '01725-887766',
        address: 'কল্যাণপুর, ঢাকা',
        percentage: 100
      }
    ]
  },
  {
    id: 'app-2',
    applicationId: 'DWF-APP-2026-000109',
    fullName: 'Md. Dulal Mia',
    fatherName: 'হাজী করিম বকশ',
    motherName: 'আমেনা খাতুন',
    dob: '1992-07-25',
    nid: '19923315566778899',
    phone: '01844-332211',
    whatsapp: '01844-332211',
    bloodGroup: 'O+',
    profession: 'কাভার্ড ভ্যান চালক',
    currentAddress: 'তেজগাঁও শিল্পাঞ্চল, ঢাকা',
    permanentAddress: 'উপজেলা: গৌরীপুর, জেলা: ময়মনসিংহ',
    drivingLicenseNo: 'MY-4455667-PROF',
    licenseType: 'PROFESSIONAL_MEDIUM',
    licenseExpiry: '2028-04-12',
    vehicleType: 'TRUCK',
    vehicleRegNo: 'ঢাকা মেট্রো-উ ১২-৮৮৭৭',
    applicantPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    status: 'SUBMITTED',
    submittedAt: '2026-09-17 09:15',
    nominees: [
      {
        id: 'nom-app-2',
        name: 'মোসাঃ শাহিনুর বেগম',
        relationship: 'স্ত্রী',
        nid: '19953311122334455',
        mobile: '01845-667788',
        address: 'গৌরীপুর, ময়মনসিংহ',
        percentage: 60
      },
      {
        id: 'nom-app-3',
        name: 'সাকিব আহমেদ',
        relationship: 'পুত্র',
        nid: '20153317788990011',
        mobile: '01844-332211',
        address: 'গৌরীপুর, ময়মনসিংহ',
        percentage: 40
      }
    ]
  }
];

export const initialPayments: PaymentRecord[] = [
  {
    id: 'pay-1',
    receiptNo: 'DWF-REC-2026-0842',
    memberId: 'DWF-000142',
    memberName: 'মোঃ কামাল হোসেন',
    amount: 300,
    paymentType: 'MONTHLY_CONTRIBUTION',
    paymentMethod: 'BKASH',
    transactionId: 'BKASH9A887BC2',
    status: 'PAID',
    date: '2026-09-02 11:24',
    monthCovered: 'September 2026',
    remarks: 'নিয়মিত মাসিক চাঁদা ও কল্যাণ তহবিল ফি'
  },
  {
    id: 'pay-2',
    receiptNo: 'DWF-REC-2026-0791',
    memberId: 'DWF-000142',
    memberName: 'মোঃ কামাল হোসেন',
    amount: 300,
    paymentType: 'MONTHLY_CONTRIBUTION',
    paymentMethod: 'NAGAD',
    transactionId: 'NGD7644919XA',
    status: 'PAID',
    date: '2026-08-04 16:40',
    monthCovered: 'August 2026',
    remarks: 'নিয়মিত মাসিক চাঁদা'
  },
  {
    id: 'pay-3',
    receiptNo: 'DWF-REC-2026-0640',
    memberId: 'DWF-000143',
    memberName: 'মোঃ রফিকুল ইসলাম',
    amount: 1800,
    paymentType: 'HALF_YEARLY',
    paymentMethod: 'ROCKET',
    transactionId: 'RKT441092837',
    status: 'PAID',
    date: '2026-07-15 10:15',
    monthCovered: 'July-Dec 2026 (Adv)',
    remarks: '৬ মাসের অগ্রিম চাঁদা পরিশোধ'
  },
  {
    id: 'pay-4',
    receiptNo: 'DWF-REC-2026-0522',
    memberId: 'DWF-000144',
    memberName: 'আনিসুর রহমান',
    amount: 300,
    paymentType: 'MONTHLY_CONTRIBUTION',
    paymentMethod: 'MANUAL',
    transactionId: 'CASH-TERM-0941',
    status: 'PAID',
    date: '2026-09-01 14:00',
    monthCovered: 'September 2026',
    remarks: 'গাবতলী কাউন্টার নগদ রসিদ',
    collectedBy: 'শাহাদাত হোসেন (অ্যাকাউন্টস অফিসার)'
  }
];

export const initialMedicalClaims: MedicalClaim[] = [
  {
    id: 'mc-1',
    claimNo: 'MC-2026-041',
    memberId: 'DWF-000142',
    memberName: 'মোঃ কামাল হোসেন',
    hospital: 'জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল, ঢাকা',
    admissionDate: '2026-06-10',
    dischargeDate: '2026-06-18',
    diseaseReason: 'হৃদযন্ত্রের জটিলতা ও এনজিওপ্লাস্টি রিং প্রতিস্থাপন',
    treatmentType: 'SURGERY',
    totalBill: 85000,
    claimAmount: 40000,
    approvedAmount: 35000,
    documentsCount: 6,
    status: 'PAID',
    submittedAt: '2026-06-22',
    reviewedAt: '2026-06-25',
    reviewedBy: 'ডাঃ মোস্তাফিজুর রহমান (মেডিকেল কনসালট্যান্ট)',
    reviewNotes: 'মেডিকেল বোর্ড কর্তৃক সমস্ত ভাউচার ও ডিসচার্জ সারসংক্ষেপ নিরীক্ষা সম্পন্ন। সর্বোচ্চ অনুমোদনযোগ্য ৩৫,০০০ টাকা মঞ্জুর।',
    paymentDate: '2026-06-28'
  },
  {
    id: 'mc-2',
    claimNo: 'MC-2026-049',
    memberId: 'DWF-000143',
    memberName: 'মোঃ রফিকুল ইসলাম',
    hospital: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল',
    admissionDate: '2026-09-05',
    dischargeDate: '2026-09-09',
    diseaseReason: 'তীব্র কিডনি ইনফেকশন ও ইলেক্ট্রোলাইট ভারসাম্যহীনতা',
    treatmentType: 'INPATIENT',
    totalBill: 32000,
    claimAmount: 20000,
    documentsCount: 4,
    status: 'UNDER_REVIEW',
    submittedAt: '2026-09-12',
    reviewNotes: 'হাসপাতালের অরিজিনাল টেস্ট রিপোর্ট ও ক্যাশ মেমো যাচাই চলছে।'
  }
];

export const initialAccidentClaims: AccidentClaim[] = [
  {
    id: 'ac-1',
    claimNo: 'AC-2026-019',
    memberId: 'DWF-000144',
    memberName: 'আনিসুর রহমান',
    accidentDate: '2026-04-14',
    location: 'ঢাকা-আরিচা মহাসড়ক, গোলড়া',
    vehicle: 'মাইক্রোবাস ঢাকা মেট্রো-চ ১৫-৩২১১',
    driverName: 'আনিসুর রহমান',
    injuryType: 'SEVERE',
    hospital: 'মানিকগঞ্জ ২৫০ শয্যা বিশিষ্ট সদর হাসপাতাল',
    policeReportNo: 'GD-1094/2026 (মানিকগঞ্জ সদর থানা)',
    estimatedCost: 65000,
    claimAmount: 30000,
    approvedAmount: 25000,
    status: 'PAID',
    submittedAt: '2026-04-20',
    reviewedAt: '2026-04-26',
    reviewNotes: 'থানা জিডি ও হাসপাতালের আঘাত সনদ যাচাই করে এককালীন ২৫,০০০ টাকা দ্রুত সহায়তা প্রদান করা হয়।'
  }
];

export const initialNotices: NoticeItem[] = [
  {
    id: 'not-1',
    title: 'Free Annual Eye & Health Checkup Camp for Highway Drivers',
    titleBn: 'মহাসড়কের চালকদের জন্য বিনামূল্যে বাৎসরিক চক্ষু ও স্বাস্থ্য ক্যাম্প',
    excerpt: 'Specialized optical screening, blood sugar and blood pressure tests at Gabtoli Terminal on October 5-7.',
    excerptBn: 'আগামী ৫-৭ অক্টোবর গাবতলী ও সায়েদাবাদ বাস টার্মিনালে অভিজ্ঞ বিশেষজ্ঞ ডাক্তার দ্বারা চালকদের চোখ ও প্রেসার পরীক্ষা করা হবে।',
    category: 'MEDICAL',
    date: '2026-09-15',
    isUrgent: true,
    content: 'All registered DWF members are entitled to free prescription glasses and essential medications.',
    contentBn: 'ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশনের স্বাস্থ্য সুরক্ষা প্রকল্পের আওতায় সকল নিবন্ধিত চালকদের জন্য বিনামূল্যে চোখ পরীক্ষা ও প্রয়োজনীয় চশমা বিতরণ করা হবে।'
  },
  {
    id: 'not-2',
    title: 'Modern Defensive Driving and BRTA Traffic Rule Certification Workshop',
    titleBn: 'আধুনিক ডিফেন্সিভ ড্রাইভিং ও বিআরটিএ ট্রাফিক আইন প্রশিক্ষণ কর্মশালা',
    excerpt: '3-day practical training for heavy vehicle operators with government recognized certificates.',
    excerptBn: 'ভারী যানবাহন চালকদের জন্য ৩ দিনব্যাপী বিশেষায়িত নিরাপদ ড্রাইভিং কর্মশালা ও সনদ প্রদান অনুষ্ঠান।',
    category: 'TRAINING',
    date: '2026-09-10',
    content: 'Hands-on simulator training, night driving safety, and pedestrian protection guidelines.',
    contentBn: 'সিমুলেটর ভিত্তিক প্রশিক্ষণ ও দুর্ঘটনা প্রতিরোধ কৌশলের ওপর ক্লাস পরিচালনা করবেন বুয়েট ও বিআরটিএ প্রশিক্ষকবৃন্দ।'
  },
  {
    id: 'not-3',
    title: 'Welfare Fund Maximum Medical Grant Increased to BDT 50,000',
    titleBn: 'চিকিৎসা সহায়তা তহবিলের সর্বোচ্চ বরাদ্দ বৃদ্ধি করে ৫০,০০০ টাকা নির্ধারণ',
    excerpt: 'Executive committee approves 25% increase in member surgical and hospitalization benefits.',
    excerptBn: 'নির্বাহী পরিষদের সিদ্ধান্ত অনুযায়ী জটিল রোগে আক্রান্ত চালকদের অস্ত্রোপচার ও ভর্তি চিকিৎসায় বরাদ্দ বৃদ্ধি।',
    category: 'WELFARE',
    date: '2026-09-01',
    content: 'The decision takes effect immediately for all active members in good standing.',
    contentBn: 'নিয়মিত চাঁদা প্রদানকারী সকল সক্রিয় সদস্য এখন থেকে বছরে সর্বোচ্চ ৫০,০০০ টাকা পর্যন্ত চিকিৎসা অনুদান দাবি করতে পারবেন।'
  }
];

export const initialBranches: Branch[] = [
  {
    id: 'br-dhaka-central',
    code: 'DHK-01',
    name: 'Dhaka Central Branch (Sayedabad)',
    nameBn: 'ঢাকা কেন্দ্রীয় শাখা (সায়েদাবাদ)',
    district: 'ঢাকা',
    division: 'ঢাকা',
    address: 'সায়েদাবাদ আন্তঃজেলা বাস টার্মিনাল ভবন, লেভেল-৩, ঢাকা',
    phone: '০১৭০০-১১২২১১',
    manager: 'মোঃ জহিরুল হক',
    memberCount: 6420
  },
  {
    id: 'br-ctg-port',
    code: 'CTG-01',
    name: 'Chittagong Port Branch',
    nameBn: 'চট্টগ্রাম বন্দর ও কাস্টমস শাখা',
    district: 'চট্টগ্রাম',
    division: 'চট্টগ্রাম',
    address: 'বারিক বিল্ডিং মোড়, স্ট্র্যান্ড রোড, আগ্রাবাদ, চট্টগ্রাম',
    phone: '০১৮১৯-৫৫৬৬৭৭',
    manager: 'ফারুক আহমেদ ভূঁইয়া',
    memberCount: 3890
  },
  {
    id: 'br-bogura-north',
    code: 'BOG-01',
    name: 'Northern Highway Branch (Bogura)',
    nameBn: 'উত্তরবঙ্গ মহাসড়ক শাখা (বগুড়া)',
    district: 'বগুড়া',
    division: 'রাজশাহী',
    address: 'চারমাথা সেন্ট্রাল টার্মিনাল চত্বর, বগুড়া',
    phone: '০১৭২৫-৩৩৪২৪৫',
    manager: 'মাহবুব আলম',
    memberCount: 2540
  },
  {
    id: 'br-sylhet',
    code: 'SYL-01',
    name: 'Sylhet Division Branch',
    nameBn: 'সিলেট বিভাগীয় শাখা (কদমতলী)',
    district: 'সিলেট',
    division: 'সিলেট',
    address: 'কদমতলী কেন্দ্রীয় বাস টার্মিনাল কমপ্লেক্স, সিলেট',
    phone: '০১৭৮৮-৯৯০০১১',
    manager: 'মুস্তাফিজুর রহমান',
    memberCount: 2000
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2026-09-17 10:14:02',
    userId: 'admin-01',
    userName: 'অধ্যক্ষ শাহ আলম (সুপার এডমিন)',
    role: 'SUPER_ADMIN',
    action: 'APPROVE_APPLICATION',
    module: 'APPLICATION',
    recordId: 'DWF-APP-2026-000105',
    details: 'আবেদন অনুমোদনপূর্বক নতুন সদস্য আইডি DWF-000144 ইস্যু করা হয়েছে।',
    ipAddress: '103.220.201.44'
  },
  {
    id: 'aud-2',
    timestamp: '2026-09-16 15:30:19',
    userId: 'admin-03',
    userName: 'ডাঃ মোস্তাফিজুর রহমান (মেডিকেল কনসালট্যান্ট)',
    role: 'MEDICAL_OFFICER',
    action: 'APPROVE_CLAIM',
    module: 'CLAIM',
    recordId: 'MC-2026-041',
    details: 'মেডিকেল দাবি MC-2026-041 নিরীক্ষান্তে ৩৫,০০০ টাকা চেক অনুমোদন।',
    ipAddress: '103.220.201.55'
  },
  {
    id: 'aud-3',
    timestamp: '2026-09-15 11:20:00',
    userId: 'admin-02',
    userName: 'শাহাদাত হোসেন (অ্যাকাউন্টস অফিসার)',
    role: 'ACCOUNTS_OFFICER',
    action: 'RECORD_PAYMENT',
    module: 'PAYMENT',
    recordId: 'DWF-REC-2026-0842',
    details: 'বিকাশ পেমেন্ট গেটওয়ের মাধ্যমে ৩০০ টাকা মাসিক চাঁদা সমন্বয়।',
    ipAddress: '103.220.201.12'
  }
];

export const initialSmsRecords: SmsRecord[] = [
  {
    id: 'sms-1',
    recipientPhone: '01711-234567',
    recipientName: 'মোঃ কামাল হোসেন',
    template: 'PAYMENT_CONFIRMATION',
    message: 'ধন্যবাদ মোঃ কামাল হোসেন (DWF-000142), আপনার সেপ্টেম্বর ২০২৬ মাসের ৩০০ টাকা চাঁদা সফলভাবে জমা হয়েছে। রসিদ: DWF-REC-2026-0842। DWF হেল্পলাইন: ১৬৭৮৯',
    status: 'DELIVERED',
    sentAt: '2026-09-02 11:25',
    cost: 0.35
  },
  {
    id: 'sms-2',
    recipientPhone: '01819-876543',
    recipientName: 'মোঃ রফিকুল ইসলাম',
    template: 'HEALTH_CAMP_ALERT',
    message: 'প্রিয় সদস্য মোঃ রফিকুল ইসলাম (DWF-000143), আগামী ৫-৭ অক্টোবর চট্টগ্রাম শাখায় ফ্রি চক্ষু ও স্বাস্থ্য পরীক্ষা ক্যাম্প অনুষ্ঠিত হবে। কার্ড সঙ্গে আনুন। DWF',
    status: 'DELIVERED',
    sentAt: '2026-09-15 14:00',
    cost: 0.35
  }
];

export const initialCommitteeMembers: CommitteeMember[] = [
  {
    id: 'cm-1',
    nameBn: 'আলহাজ্ব মো: রফিকুল ইসলাম',
    nameEn: 'Alhaj Md. Rafiqul Islam',
    designationBn: 'সভাপতি',
    designationEn: 'President',
    phone: '০১৭১১-২৩৪৫৬৭',
    cleanPhone: '+8801711234567',
    roleType: 'PRESIDIUM',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    locationBn: 'কেন্দ্রীয় পরিচালনা পর্ষদ, ঢাকা',
    locationEn: 'Central Executive Board, Dhaka',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    isKeyLeader: true,
    order: 1
  },
  {
    id: 'cm-2',
    nameBn: 'মোহাম্মদ জসিম উদ্দিন',
    nameEn: 'Mohammad Jasim Uddin',
    designationBn: 'সাধারণ সম্পাদক',
    designationEn: 'General Secretary',
    phone: '০১৮১২-৩৪৫৬৭৮',
    cleanPhone: '+8801812345678',
    roleType: 'PRESIDIUM',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    locationBn: 'সায়েদাবাদ আন্তঃজেলা টার্মিনাল উইং',
    locationEn: 'Sayedabad Terminal Wing',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    isKeyLeader: true,
    order: 2
  },
  {
    id: 'cm-3',
    nameBn: 'কাজী আবুল কালাম',
    nameEn: 'Kazi Abul Kalam',
    designationBn: 'সিনিয়র সহ-সভাপতি',
    designationEn: 'Senior Vice President',
    phone: '০১৯১১-৯৮৭৬৫৪',
    cleanPhone: '+8801911987654',
    roleType: 'PRESIDIUM',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    locationBn: 'গাবতলী টার্মিনাল জোন',
    locationEn: 'Gabtoli Terminal Zone',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    order: 3
  },
  {
    id: 'cm-4',
    nameBn: 'হাজী আব্দুল মোতালেব',
    nameEn: 'Haji Abdul Motaleb',
    designationBn: 'সহ-সভাপতি',
    designationEn: 'Vice President',
    phone: '০১৭১২-৮৮৮৭৭৭',
    cleanPhone: '+8801712888777',
    roleType: 'PRESIDIUM',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    locationBn: 'মহাখালী বাস টার্মিনাল জোন',
    locationEn: 'Mohakhali Terminal Zone',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    order: 4
  },
  {
    id: 'cm-5',
    nameBn: 'শাহ আলম হাওলাদার',
    nameEn: 'Shah Alam Hawlader',
    designationBn: 'যুগ্ম সাধারণ সম্পাদক',
    designationEn: 'Joint General Secretary',
    phone: '০১৬১১-৩৩৪৪৫৫',
    cleanPhone: '+8801611334455',
    roleType: 'SECRETARY',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    locationBn: 'ফুলবাড়িয়া ও কেরানীগঞ্জ সার্কেল',
    locationEn: 'Fulbaria & Keraniganj Circle',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    order: 5
  },
  {
    id: 'cm-6',
    nameBn: 'মোঃ ফারুক হোসেন',
    nameEn: 'Md. Faruk Hossain',
    designationBn: 'সাংগঠনিক সম্পাদক',
    designationEn: 'Organizing Secretary',
    phone: '০১৭২৩-৫৫৬৬৭৭',
    cleanPhone: '+8801723556677',
    roleType: 'SECRETARY',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    locationBn: 'সারাদেশের সাংগঠনিক নেটওয়ার্ক',
    locationEn: 'National Organization Wing',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    order: 6
  },
  {
    id: 'cm-7',
    nameBn: 'মীর মোয়াজ্জেম হোসেন',
    nameEn: 'Mir Moazzem Hossain',
    designationBn: 'অর্থ ও কল্যাণ সম্পাদক',
    designationEn: 'Finance & Welfare Secretary',
    phone: '০১৮১৯-১১২২৩৩',
    cleanPhone: '+8801819112233',
    roleType: 'SECRETARY',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    locationBn: 'কেন্দ্রীয় কল্যাণ ফান্ড উইং',
    locationEn: 'Central Welfare Fund Wing',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    order: 7
  },
  {
    id: 'cm-8',
    nameBn: 'এডভোকেট কামরুল হাসান',
    nameEn: 'Advocate Kamrul Hasan',
    designationBn: 'আইন ও সালিশ বিষয়ক সম্পাদক',
    designationEn: 'Legal Affairs Secretary',
    phone: '০১৭১৫-৯৯৮৮৭৭',
    cleanPhone: '+8801715998877',
    roleType: 'SPECIALIZED',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    locationBn: 'সুপ্রিম কোর্ট ও হাইওয়ে লিগ্যাল এইড সেল',
    locationEn: 'Supreme Court & Highway Legal Aid',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    order: 8
  },
  {
    id: 'cm-9',
    nameBn: 'ডা: এস. এম. হারুন-অর-রশীদ',
    nameEn: 'Dr. S. M. Harun-or-Rashid',
    designationBn: 'স্বাস্থ্য ও চিকিৎসা বিষয়ক সম্পাদক',
    designationEn: 'Health & Medical Secretary',
    phone: '০১৭৮৮-৪৪৫৫৬৬',
    cleanPhone: '+8801788445566',
    roleType: 'SPECIALIZED',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    locationBn: 'ডিজিটাল হেলথ কার্ড ও হাসপাতাল উইং',
    locationEn: 'Digital Health Card & Hospital Wing',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    order: 9
  },
  {
    id: 'cm-10',
    nameBn: 'এম. এ. জলিল',
    nameEn: 'M. A. Jalil',
    designationBn: 'দপ্তর ও প্রচার সম্পাদক',
    designationEn: 'Office & Publicity Secretary',
    phone: '০১৯৩৩-৬৬৭৭৮৮',
    cleanPhone: '+8801933667788',
    roleType: 'SECRETARY',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    locationBn: 'কেন্দ্রীয় সচিবালয় ও মিডিয়া সেল',
    locationEn: 'Central Secretariat & Media Cell',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    order: 10
  }
];

export const initialProfileUpdateRequests: ProfileUpdateRequest[] = [
  {
    id: 'pur-1',
    requestId: 'PUR-2026-0012',
    memberId: 'DWF-000142',
    memberName: 'Md. Kamal Hossain',
    memberNameBn: 'মোঃ কামাল হোসেন',
    currentData: {
      name: 'Md. Kamal Hossain',
      nameBn: 'মোঃ কামাল হোসেন',
      phone: '01711-234567',
      whatsapp: '01711-234567',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
      bloodGroup: 'B+',
      currentAddress: 'বাসা # ১২, রোড # ৪, মিরপুর-১০, ঢাকা',
      permanentAddress: 'গ্রাম: চরভদ্রাসন, ডাকঘর: চরভদ্রাসন, জেলা: ফরিদপুর',
      drivingLicenseNo: 'DK-7890452-PROF',
      vehicleType: 'BUS',
      vehicleRegNo: 'ঢাকা মেট্রো-ব ১৪-৯৮২৩',
      nominees: [
        {
          id: 'nom-1',
          name: 'মোসাঃ নাসিমা আক্তার',
          relationship: 'স্ত্রী (Wife)',
          nid: '19882695555555555',
          mobile: '01722-987654',
          address: 'মিরপুর-১০, ঢাকা',
          percentage: 70
        },
        {
          id: 'nom-2',
          name: 'তানভীর হোসেন',
          relationship: 'পুত্র (Son)',
          nid: '20052697777777777',
          mobile: '01733-112233',
          address: 'মিরপুর-১০, ঢাকা',
          percentage: 30
        }
      ]
    },
    requestedChanges: {
      nameBn: 'মোঃ কামাল হোসেন প্রধান',
      phone: '01711-234567',
      whatsapp: '01711-234567',
      currentAddress: 'বাসা # ১৮/এ, রোড # ৬, সেকশন-১১, মিরপুর, ঢাকা-১২১৬',
      nominees: [
        {
          id: 'nom-1',
          name: 'মোসাঃ নাসিমা আক্তার',
          relationship: 'স্ত্রী (Wife)',
          nid: '19882695555555555',
          mobile: '01722-987654',
          address: 'মিরপুর, ঢাকা',
          percentage: 60
        },
        {
          id: 'nom-2',
          name: 'তানভীর হোসেন',
          relationship: 'পুত্র (Son)',
          nid: '20052697777777777',
          mobile: '01733-112233',
          address: 'মিরপুর, ঢাকা',
          percentage: 40
        }
      ]
    },
    reason: 'বাসা পরিবর্তন হওয়ায় বর্তমান ঠিকানা আপডেট এবং নমিনির শতকরা অংশ পরিবর্তন প্রয়োজন।',
    status: 'PENDING',
    submittedAt: '2026-09-18'
  },
  {
    id: 'pur-2',
    requestId: 'PUR-2026-0008',
    memberId: 'DWF-000143',
    memberName: 'Md. Rafiqul Islam',
    memberNameBn: 'মোঃ রফিকুল ইসলাম',
    currentData: {
      name: 'Md. Rafiqul Islam',
      nameBn: 'মোঃ রফিকুল ইসলাম',
      phone: '01819-876543',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      bloodGroup: 'O+',
      drivingLicenseNo: 'CTG-4512980-PROF',
      vehicleType: 'TRUCK',
      vehicleRegNo: 'চট্ট মেট্রো-ট ১১-৫৬৭৮',
      nominees: [
        {
          id: 'nom-3',
          name: 'শামীমা নাসরিন',
          relationship: 'স্ত্রী (Wife)',
          nid: '19905419999999999',
          mobile: '01819-112233',
          address: 'আগ্রাবাদ, চট্টগ্রাম',
          percentage: 100
        }
      ]
    },
    requestedChanges: {
      vehicleRegNo: 'চট্ট মেট্রো-ট ১২-৮৯০১',
      drivingLicenseNo: 'CTG-4512980-PROF'
    },
    reason: 'নতুন গাড়ির দায়িত্ব গ্রহণের কারণে গাড়ির রেজিস্ট্রেশন নম্বর পরিবর্তন।',
    status: 'APPROVED',
    submittedAt: '2026-09-10',
    reviewedAt: '2026-09-12',
    reviewedBy: 'মেম্বারশিপ অফিসার',
    reviewNotes: 'পরিবহন মালিকের প্রত্যায়ন ও গাড়ির ব্লুবুক যাচাই করে অনুমোদন প্রদান করা হলো।'
  }
];
