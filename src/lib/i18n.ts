import { Language } from '../types/dwf';

export const translations = {
  bn: {
    // Brand
    orgName: 'ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন',
    orgNameShort: 'ডিডব্লিউএফ',
    tagline: 'সুরক্ষিত চালক – নিরাপদ সড়ক',
    subTagline: 'চালকের স্বাস্থ্য, অধিকার, নিরাপত্তা ও ভবিষ্যৎ নিশ্চিত করতে আমাদের সাথে যুক্ত হোন।',
    sosEmergency: 'জরুরি হেল্পলাইন: ১৬৭৮৯ | অ্যাম্বুলেন্স: ০১৭০০-০০০০০০',
    
    // Nav
    navHome: 'হোম',
    navAbout: 'আমাদের সম্পর্কে',
    navBenefits: 'সুবিধাসমূহ',
    navRules: 'সদস্যপদ নিয়মাবলী',
    navCalculator: 'কল্যাণ ক্যালকুলেটর',
    navNews: 'সংবাদ ও নোটিশ',
    navGallery: 'গ্যালারি',
    navContact: 'যোগাযোগ',
    navApply: 'সদস্য হতে আবেদন',
    navLogin: 'সদস্য লগইন',
    navAdminLogin: 'অফিসিয়াল পোর্টাল',
    navVerify: 'সদস্য যাচাই',
    
    // Hero Buttons
    btnApply: 'সদস্য পদ আবেদন করুন',
    btnLogin: 'সদস্য লগইন',
    btnVerify: 'সদস্যপদ যাচাই করুন',
    btnExplore: 'সুবিধাসমূহ জানুন',
    
    // Stats
    statTotalMembers: 'মোট নিবন্ধিত সদস্য',
    statActiveMembers: 'সক্রিয় সদস্য',
    statWelfareFund: 'কল্যাণ তহবিল স্থিতি',
    statMedicalAssistance: 'প্রদত্ত চিকিৎসা সহায়তা',
    statTrainedMembers: 'প্রশিক্ষিত দক্ষ চালক',
    statAccidentAssistance: 'দুর্ঘটনা ক্ষতিপূরণ প্রদান',
    
    // Programs
    progTitle: 'আমাদের প্রধান কল্যাণমূলক কর্মসূচিসমূহ',
    progSubtitle: 'বাংলাদেশের পেশাদার চালক সমাজের সার্বিক নিরাপত্তা, আধুনিক স্বাস্থ্য সেবা ও আইনি সুরক্ষায় নিবেদিত',
    progHealthCard: 'ডিজিটাল স্বাস্থ্য সুরক্ষা কার্ড',
    progHealthCardDesc: 'নিবন্ধিত সদস্যদের জন্য বিশেষায়িত হাসপাতালে ৫০% পর্যন্ত ছাড় ও বার্ষিক সর্বোচ্চ ৫০,০০০ টাকা পর্যন্ত চিকিৎসা অনুদান।',
    progAccident: 'তাৎক্ষণিক দুর্ঘটনা সহায়তা',
    progAccidentDesc: 'সড়ক দুর্ঘটনায় আহত চালকদের তাৎক্ষণিক আর্থিক সাহায্য, অঙ্গহানি পুনর্বাসন ও পরিবারকে জরুরি এককালীন অনুদান।',
    progLegal: 'ফ্রি লিগ্যাল এইড ও আইনি পরামর্শ',
    progLegalDesc: 'অনাকাঙ্ক্ষিত দুর্ঘটনা বা মিথ্যা মামলায় চালকের অধিকার রক্ষায় অভিজ্ঞ প্যানেল আইনজীবীদের মাধ্যমে সার্বক্ষণিক আইনি সহায়তা।',
    progTraining: 'আধুনিক ড্রাইভিং ও রোড-সেফটি প্রশিক্ষণ',
    progTrainingDesc: 'বিআরটিএ মানসম্মত ডিফেন্সিভ ড্রাইভিং, ফার্স্ট এইড ও আধুনিক ট্রাফিক আইন বিষয়ক নিয়মিত সার্টিফিকেট প্রশিক্ষণ কর্মশালা।',
    progRehab: 'চালকদের দীর্ঘমেয়াদি পুনর্বাসন',
    progRehabDesc: 'কর্মক্ষমতাহীন প্রবীণ বা স্থায়ীভাবে আহত চালকদের বিকল্প কর্মসংস্থান ও স্বনির্ভর পুনর্বাসন তহবিল সুবিধা।',
    progHajj: 'বার্ষিক হজ্ব ও ওমরাহ উদ্যোগ',
    progHajjDesc: 'নিয়মিত অবদানকারী প্রবীণ সদস্যদের মধ্য থেকে প্রতি বছর লটারির মাধ্যমে সম্পূর্ণ বিনামূল্যে পবিত্র হজ্ব ও ওমরাহ পালনের সুযোগ।',

    // Rules
    rulesTitle: 'সদস্যপদ ও কল্যাণ তহবিলের নিয়মাবলী',
    rulesSubtitle: 'স্বচ্ছ প্রাতিষ্ঠানিক নীতিমালার অধীনে পরিচালিত একটি পেশাদার চালক সংগঠন',
    rulesEligibilityTitle: 'সদস্য পদের যোগ্যতা',
    rulesElig1: 'বৈধ ড্রাইভিং লাইসেন্সধারী যেকোনো পেশাদার বা অপেশাদার চালক আবেদন করতে পারবেন।',
    rulesElig2: 'বয়সসীমা ১৮ থেকে ৬০ বছর হতে হবে এবং জাতীয় পরিচয়পত্র (NID) থাকা আবশ্যক।',
    rulesElig3: 'সংগঠনের বিধিবিধান ও ট্রাফিক আইন মেনে চলার অঙ্গীকারাবদ্ধ হতে হবে।',
    rulesFundTitle: 'তহবিলের নিয়ম ও মাসিক চাঁদা',
    rulesFund1: 'মাসিক চাঁদা মাত্র ৩০০ টাকা (অথবা বাৎসরিক এককালীন ৩,৬০০ টাকা)।',
    rulesFund2: 'ধারাবাহিক ৬ মাস চাঁদা পরিশোধের পর পূর্ণাঙ্গ স্বাস্থ্য ও দুর্ঘটনা অনুদান কার্যকর হবে।',
    rulesFund3: '১০০% নমিনি বণ্টন বাধ্যতামূলক, যা চালকের অবর্তমানে পরিবার নিশ্চিত আর্থিক সুরক্ষা পাবে।',

    // Verification
    verifyTitle: 'সদস্যপদ ও স্বাস্থ্য কার্ড যাচাইকরণ',
    verifySubtitle: 'যেকোনো সদস্যের ডিডব্লিউএফ আইডি বা কিউআর কোড টোকেন দিয়ে সঠিক তথ্য যাচাই করুন',
    verifyPlaceholder: 'সদস্য আইডি (যেমন: DWF-000142) অথবা টোকেন লিখুন...',
    verifyButton: 'যাচাই করুন',
    verifyValidBadge: 'যাচাইকৃত সক্রিয় সদস্য',
    verifyInvalid: 'কোনো বৈধ সদস্যের তথ্য পাওয়া যায়নি। পুনরায় পরীক্ষা করুন।',

    // Footer
    footerDesc: 'ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন (ডিডব্লিউএফ) বাংলাদেশের পরিবহন খাতের চালকদের জীবনমান উন্নয়ন, স্বাস্থ্য নিরাপত্তা এবং সড়ক দুর্ঘটনা প্রতিরোধে নিবেদিত একটি অলাভজনক ও প্রাতিষ্ঠানিক কল্যাণ সংস্থা।',
    footerQuickLinks: 'প্রয়োজনীয় লিংক',
    footerServices: 'সেবাসমূহ',
    footerEmergency: 'জরুরি সেবা ও অফিস',
    footerAddress: 'প্রধান কার্যালয়: লেভেল ৪, পরিবহন ভবন, বিজয়নগর, ঢাকা-১০০০',
    footerPhone: 'টেলিফোন: +৮৮০ ২-৯৫৭৮৯০১ | হেল্পলাইন: ১৬৭৮৯',
    footerEmail: 'ইমেইল: info@dwf-bd.org | support@dwf-bd.org',
    footerCopyright: '© ২০২৬ ড্রাইভার্স ওয়েলফেয়ার ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত। গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত।',

    // Common
    currency: '৳',
    viewDetails: 'বিস্তারিত দেখুন',
    close: 'বন্ধ করুন',
    submit: 'জমা দিন',
    cancel: 'বাতিল',
    search: 'অনুসন্ধান করুন...',
    loading: 'লোড হচ্ছে...',
    downloadPdf: 'পিডিএফ ডাউনলোড',
    printCard: 'কার্ড প্রিন্ট করুন',
    backToHome: 'মূল পাতায় ফিরে যান'
  },
  en: {
    // Brand
    orgName: 'Drivers Welfare Foundation',
    orgNameShort: 'DWF',
    tagline: 'Protected Driver – Safe Road',
    subTagline: 'Join us to secure driver health, dignity, rights, safety, and a protected future.',
    sosEmergency: 'Emergency Helpline: 16789 | Ambulance: 01700-000000',

    // Nav
    navHome: 'Home',
    navAbout: 'About Us',
    navBenefits: 'Benefits',
    navRules: 'Membership Rules',
    navCalculator: 'Welfare Calculator',
    navNews: 'News & Notices',
    navGallery: 'Gallery',
    navContact: 'Contact',
    navApply: 'Apply for Membership',
    navLogin: 'Member Login',
    navAdminLogin: 'Staff Portal',
    navVerify: 'Verify Member',

    // Hero Buttons
    btnApply: 'Apply for Membership',
    btnLogin: 'Member Portal Login',
    btnVerify: 'Verify Member ID',
    btnExplore: 'Explore Benefits',

    // Stats
    statTotalMembers: 'Total Registered Drivers',
    statActiveMembers: 'Active Members',
    statWelfareFund: 'Total Welfare Fund',
    statMedicalAssistance: 'Medical Assistance Disbursed',
    statTrainedMembers: 'Certified Trained Drivers',
    statAccidentAssistance: 'Accident Grants Paid',

    // Programs
    progTitle: 'Core Welfare Initiatives',
    progSubtitle: 'Dedicated to overall safety, healthcare, legal support, and economic protection of Bangladesh drivers',
    progHealthCard: 'Digital Health Protection Card',
    progHealthCardDesc: 'Up to 50% discount at partner hospitals and up to BDT 50,000 annual medical assistance grant for members.',
    progAccident: 'Immediate Accident Assistance',
    progAccidentDesc: 'Immediate emergency financial aid, disability rehabilitation, and family compensation in road accidents.',
    progLegal: 'Free Legal Aid & Counseling',
    progLegalDesc: '24/7 dedicated legal defense through experienced panel advocates to protect drivers from wrongful harassment.',
    progTraining: 'Defensive Driving & Road Safety Workshops',
    progTrainingDesc: 'BRTA-standard defensive driving certifications, advanced first-aid, and modern traffic etiquette workshops.',
    progRehab: 'Long-term Driver Rehabilitation',
    progRehabDesc: 'Alternative livelihood programs and disability welfare funds for elderly or injured drivers.',
    progHajj: 'Annual Hajj & Umrah Program',
    progHajjDesc: 'Annual lottery initiative sponsoring complete, cost-free holy Hajj and Umrah pilgrimages for senior contributors.',

    // Rules
    rulesTitle: 'Membership & Welfare Fund Policies',
    rulesSubtitle: 'Governed under institutional transparency and statutory compliance for road workers',
    rulesEligibilityTitle: 'Eligibility Criteria',
    rulesElig1: 'Must hold a valid Bangladeshi professional or non-professional driving license.',
    rulesElig2: 'Age between 18 and 60 years with verified National Identity Card (NID).',
    rulesElig3: 'Commitment to comply with highway safety standards and organizational constitution.',
    rulesFundTitle: 'Contribution & Welfare Fund',
    rulesFund1: 'Monthly membership fee is only BDT 300 (or annual advance of BDT 3,600).',
    rulesFund2: 'Full medical and accident grants become active after 6 continuous monthly contributions.',
    rulesFund3: 'Mandatory 100% nominee distribution ensures immediate financial relief for families.',

    // Verification
    verifyTitle: 'Member & Health Card Verification',
    verifySubtitle: 'Instant institutional verification by Member ID or cryptographically secure token',
    verifyPlaceholder: 'Enter Member ID (e.g. DWF-000142) or token...',
    verifyButton: 'Verify Now',
    verifyValidBadge: 'Verified Active DWF Member',
    verifyInvalid: 'No valid member found with this ID or token. Please check and try again.',

    // Footer
    footerDesc: 'Drivers Welfare Foundation (DWF) is an institutional non-profit body dedicated to uplifting the socio-economic welfare, health security, and legal dignity of transportation drivers across Bangladesh.',
    footerQuickLinks: 'Quick Links',
    footerServices: 'Member Services',
    footerEmergency: 'Helpline & Office',
    footerAddress: 'Head Office: Level 4, Paribahan Bhaban, Bijoynagar, Dhaka-1000',
    footerPhone: 'Phone: +880 2-9578901 | Toll-Free: 16789',
    footerEmail: 'Email: info@dwf-bd.org | support@dwf-bd.org',
    footerCopyright: '© 2026 Drivers Welfare Foundation. All rights reserved. Registered under Government of Bangladesh.',

    // Common
    currency: '৳',
    viewDetails: 'View Details',
    close: 'Close',
    submit: 'Submit',
    cancel: 'Cancel',
    search: 'Search...',
    loading: 'Loading...',
    downloadPdf: 'Download PDF',
    printCard: 'Print Card',
    backToHome: 'Back to Home'
  }
};
