export type ProductCategory = 'all' | 'book' | 'photo' | 'manual' | 'poster';

export interface DigitalProduct {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'book' | 'photo' | 'manual' | 'poster';
  categoryBn: string;
  categoryEn: string;
  price: number; // In BDT (0 = Free for active members)
  regularPrice: number;
  isFreeForMembers: boolean;
  coverImage: string;
  previewImages?: string[];
  descriptionBn: string;
  descriptionEn: string;
  authorBn: string;
  authorEn: string;
  fileFormat: string;
  fileSize: string;
  pagesOrCount: string;
  rating: number;
  reviewsCount: number;
  downloadCount: number;
  publishedYear: string;
  isPopular?: boolean;
  isNew?: boolean;
  featuresBn: string[];
  featuresEn: string[];
  sampleExcerptBn: string;
  sampleExcerptEn: string;
}

export const initialDigitalProducts: DigitalProduct[] = [
  {
    id: 'prod-01',
    titleBn: 'পেশাদার ড্রাইভিং গাইড ও ট্রাফিক আইন সহায়িকা ২০২৬',
    titleEn: 'Professional Driving Handbook & Traffic Laws 2026',
    category: 'book',
    categoryBn: 'ডিজিটাল ই-বুক',
    categoryEn: 'Digital E-Book',
    price: 150,
    regularPrice: 300,
    isFreeForMembers: true,
    coverImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80',
    descriptionBn: 'বিআরটিএ এবং হাইওয়ে পুলিশের সাম্প্রতিক সড়ক পরিবহন বিধিমালা, ট্রাফিক সাইন, জরিমানার চার্ট ও ডিফেন্সিভ ড্রাইভিং সংক্রান্ত ১২৮ পৃষ্ঠার পূর্ণাঙ্গ রঙিন ই-বুক। মোবাইল ও ট্যাবলেটে সরাসরি পড়ার উপযোগী।',
    descriptionEn: 'Comprehensive 128-page digital e-book containing official BRTA traffic guidelines, highway signs, legal penalty tables, and defensive driving techniques formatted for mobile and tablet readers.',
    authorBn: 'ডিডব্লিউএফ আইনি ও প্রশিক্ষণ উইং',
    authorEn: 'DWF Legal & Training Research Wing',
    fileFormat: 'রঙিন ভেক্টর PDF (হাই-রেজ্যুলুশন)',
    fileSize: '১২.৪ মেগাবাইট (MB)',
    pagesOrCount: '১২৮ পৃষ্ঠা',
    rating: 4.9,
    reviewsCount: 342,
    downloadCount: 1850,
    publishedYear: '২০২৬',
    isPopular: true,
    featuresBn: [
      'সড়ক পরিবহন আইন ২০১৮ ও সংশোধিত বিধিমালা ২০২৬ সম্পূর্ণ ব্যাখ্যা',
      'সকল প্রকার ট্রাফিক সাইন ও সিগন্যালের স্পষ্ট রঙিন চিত্র',
      'দুর্ঘটনা এড়াতে হাইওয়ে ডিফেন্সিভ ড্রাইভিং টিপস',
      'স্মার্টফোনে অফলাইনে পড়ার জন্য অপ্টিমাইজড'
    ],
    featuresEn: [
      'Updated Motor Vehicle Act and fine schedules 2026',
      'Full-color vector illustrations of all official traffic signs',
      'Defensive highway maneuvers for heavy & light vehicle operators',
      'Offline optimized for smartphones and tablet e-readers'
    ],
    sampleExcerptBn: 'ধারা ৪২: গতিসীমা লঙ্ঘন এবং জরুরি লেইন ব্যবহারের নিয়মাবলী — মহাসড়কে নির্দিষ্ট লেনে নির্ধারিত গতির অতিরিক্ত যান পরিচালনা আইনের দৃষ্টিতে শাস্তিযোগ্য। চালকদের সর্বদা গতিসীমা নির্দেশক বোর্ড অনুসরণ করতে হবে...',
    sampleExcerptEn: 'Section 42: Speed Limits & Emergency Lane Protocol — Exceeding prescribed speed thresholds on designated expressway corridors carries statutory penalties under the revised transport code...'
  },
  {
    id: 'prod-02',
    titleBn: 'সড়ক দুর্ঘটনা ও চালকের আইনি অধিকার হ্যান্ডবুক',
    titleEn: 'Road Accident Legal Defense & Rights Handbook',
    category: 'manual',
    categoryBn: 'আইনি নির্দেশিকা',
    categoryEn: 'Legal Manual',
    price: 120,
    regularPrice: 250,
    isFreeForMembers: true,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    descriptionBn: 'হাইওয়েতে অনাকাঙ্ক্ষিত দুর্ঘটনা বা পুলিশি ঝামেলায় তাৎক্ষণিক করণীয়, জিডি ও এফআইআর মোকাবিলার নিয়ম, জামিন প্রক্রিয়া ও বীমা দাবির সঠিক প্রক্রিয়া সম্বলিত আইনি পুস্তিকা।',
    descriptionEn: 'Essential guide covering instant accident legal steps, navigating police FIRs, bail procedures, compensation claims, and driver protection rights.',
    authorBn: 'অ্যাডভোকেট প্যানেল, ডিডব্লিউএফ',
    authorEn: 'Advocate Panel, DWF Central Legal Desk',
    fileFormat: 'ডিজিটাল PDF ম্যানুয়াল',
    fileSize: '৮.১ মেগাবাইট (MB)',
    pagesOrCount: '৭৬ পৃষ্ঠা',
    rating: 4.8,
    reviewsCount: 218,
    downloadCount: 1420,
    publishedYear: '২০২৬',
    isPopular: true,
    featuresBn: [
      'দুর্ঘটনার পর প্রথম ৩০ মিনিটের করণীয় চেকলিস্ট',
      'পুলিশি জেরা ও থানা হেফাজতের আইনি অধিকারসমূহ',
      'ক্ষতিপূরণ ট্রাইব্যুনালে আবেদনপত্রের নমুনা ফরম্যাট',
      '২৪ ঘণ্টা হেল্পলাইনের আইনজীবীদের সাথে যোগাযোগের পথ'
    ],
    featuresEn: [
      'First 30-minute emergency protocol checklist after any incident',
      'Constitutional and statutory rights during highway police inquiries',
      'Sample compensation petition formats for motor claims tribunals',
      'Direct protocol for accessing DWF panel advocate network'
    ],
    sampleExcerptBn: 'পুলিশ হেফাজতে চালকের সাংবিধানিক অধিকার: গ্রেফতারের ২৪ ঘণ্টার মধ্যে উপযুক্ত ম্যাজিস্ট্রেটের আদালতে হাজির করতে হবে এবং আইনি পরামর্শ গ্রহণের মৌলিক অধিকার ক্ষুণ্ণ করা যাবে না...',
    sampleExcerptEn: 'Constitutional Rights in Police Custody: Every detainee must be produced before the nearest magistrate within 24 hours, with unfettered access to legal representation...'
  },
  {
    id: 'prod-03',
    titleBn: 'ডিডব্লিউএফ জাতীয় চালক সমাবেশ ও মহাসম্মেলন ফটো অ্যালবাম',
    titleEn: 'DWF National Driver Rally & Assembly 4K Photo Pack',
    category: 'photo',
    categoryBn: 'ডিজিটাল ফটো প্যাক',
    categoryEn: 'Digital Photo Pack',
    price: 99,
    regularPrice: 200,
    isFreeForMembers: false,
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    descriptionBn: 'রাজধানীর কেন্দ্রীয় শহীদ মিনার ও জাতীয় প্রেসক্লাবে অনুষ্ঠিত ঐতিহাসিক চালক ঐক্য মহাসম্মেলন, ব্যানার র‍্যালি ও কেন্দ্রীয় কাউন্সিল ২০২৬-এর ৬০টি হাই-রেজ্যুলুশন (4K Ultra-HD) পেশাদার ছবি।',
    descriptionEn: 'Curated 60 Ultra-HD 4K digital photo collection covering the historic National Driver Welfare Convention, parade marches, and insignia inauguration in Dhaka.',
    authorBn: 'ডিডব্লিউএফ মিডিয়া ও প্রচার উইং',
    authorEn: 'DWF Media & Visual Press Bureau',
    fileFormat: '4K Ultra-HD JPGs (ZIP আর্কাইভ)',
    fileSize: '১৮৫ মেগাবাইট (MB)',
    pagesOrCount: '৬০টি হাই-রেজ্যুলুশন ফটো',
    rating: 5.0,
    reviewsCount: 114,
    downloadCount: 680,
    publishedYear: '২০২৬',
    isNew: true,
    featuresBn: [
      '৩৮৪০ x ২১৬০ পিক্সেল আল্ট্রা-এইচডি ক্রিস্টাল ক্লিয়ার প্রিন্ট কোয়ালিটি',
      'ড্রাইভার্স ওয়েলফেয়ার কেন্দ্রীয় কাউন্সিলরদের মঞ্চের ছবি',
      'ব্যানার ও স্মরণিকা প্রকাশনার জন্য আনলিমিটেড ব্যবহার অধিকার',
      'আর্কাইভাল ওয়াটারমার্ক-মুক্ত সম্পূর্ণ অরিজিনাল ফাইল'
    ],
    featuresEn: [
      '3840 x 2160 Ultra-HD high-fidelity master resolutions',
      'Historic stage addresses by central executive council members',
      'Non-commercial press and commemorative print license included',
      'Unwatermarked raw image files for institutional archives'
    ],
    sampleExcerptBn: 'ফটো আর্কাইভ ক্যাপশন: "ঐক্যের হাত ধরে নিরাপদ সড়ক বিনির্মাণে বাংলাদেশের পেশাদার চালক সমাজ — ২০২৬ মহাসম্মেলন স্মৃতি"',
    sampleExcerptEn: 'Archive Inscription: "Building Safer Highways Hand-in-Hand: The Professional Drivers of Bangladesh in Unity — 2026 Grand Council"'
  },
  {
    id: 'prod-04',
    titleBn: 'জরুরি হাইওয়ে ফার্স্ট এইড ও কার্ডিওপালমোনারি (CPR) ম্যানুয়াল',
    titleEn: 'Highway Emergency First-Aid & Resuscitation Manual',
    category: 'manual',
    categoryBn: 'প্রাথমিক চিকিৎসা',
    categoryEn: 'First-Aid Guide',
    price: 100,
    regularPrice: 220,
    isFreeForMembers: true,
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
    descriptionBn: 'দুর্ঘটনায় রক্তপাত বন্ধ, হাড় ভাঙার প্রাথমিক ব্যান্ডেজ, শ্বাসরোধ হলে সিপিআর প্রদান এবং শক মোকাবিলার ধাপে ধাপে রঙিন সচিত্র প্রাথমিক চিকিৎসা গাইড।',
    descriptionEn: 'Illustrated step-by-step life support and first-aid guide tailored for highway drivers, fleet operators, and emergency first-responders.',
    authorBn: 'ডিডব্লিউএফ মেডিকেল উপদেষ্টা বোর্ড',
    authorEn: 'DWF Medical & Emergency Health Advisory',
    fileFormat: 'সচিত্র রঙিন PDF',
    fileSize: '১৫.২ মেগাবাইট (MB)',
    pagesOrCount: '৬৪ পৃষ্ঠা',
    rating: 4.9,
    reviewsCount: 195,
    downloadCount: 1120,
    publishedYear: '২০২৬',
    featuresBn: [
      'রক্তক্ষরণ দ্রুত বন্ধ করার জন্য প্রেশার পয়েন্ট নির্দেশিকা',
      'মাথায় আঘাত ও মেরুদণ্ডের সুরক্ষায় স্ট্রেচার মুভমেন্ট নিয়ম',
      'জরুরি ঔষধ ও ফার্স্ট এইড বক্সের আদর্শ উপাদান তালিকা',
      'ডায়াবেটিস ও হৃদরোগে চালকের তাৎক্ষণিক সতর্কতা'
    ],
    featuresEn: [
      'Pressure point techniques for rapid arterial bleeding control',
      'Spinal cord stabilization protocols during emergency extrication',
      'Official vehicular first-aid kit inventory checklist',
      'Warning signs of diabetic hypoglycemia and cardiac arrest on highways'
    ],
    sampleExcerptBn: 'জরুরি রক্তপাত নিয়ন্ত্রণ: ক্ষতস্থানে অবিলম্বে জীবাণুমুক্ত গজ বা পরিষ্কার কাপড় দিয়ে সরাসরি চাপ দিন। রক্তক্ষরণ বন্ধ না হওয়া পর্যন্ত চাপ বজায় রাখুন এবং রোগীকে কখনোই দাঁড় করাবেন না...',
    sampleExcerptEn: 'Emergency Bleeding Control: Apply direct continuous pressure over the wound using sterile gauze or clean cloth. Never release pressure until emergency medical teams arrive...'
  },
  {
    id: 'prod-05',
    titleBn: 'সড়ক নিরাপত্তা সচেতনতা ডিজিটাল আর্ট ও পোস্টার প্যাক',
    titleEn: 'Road Safety Awareness Printable Poster & Digital Art Pack',
    category: 'poster',
    categoryBn: 'পোস্টার ও আর্টওয়ার্ক',
    categoryEn: 'Digital Posters',
    price: 150,
    regularPrice: 350,
    isFreeForMembers: false,
    coverImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    descriptionBn: 'বাস টার্মিনাল, গ্যারেজ ও ড্রাইভিং স্কুলে টানানোর উপযোগী ১৫টি হাই-রেজ্যুলুশন ভেক্টর পোস্টার ও সামাজিক যোগাযোগমাধ্যমের জন্য অপ্টিমাইজড ব্যানার প্যাকেজ।',
    descriptionEn: 'Bundle of 15 high-resolution vector posters and banners ready for printing at bus terminals, transport union offices, garages, and digital campaigns.',
    authorBn: 'ডিডব্লিউএফ ডিজাইন ও সচেতনতা টিম',
    authorEn: 'DWF Creative Communication Desk',
    fileFormat: 'A3/A2 সাইজ PDF ও হাই-রেজ্যুলুশন PNG',
    fileSize: '৪২ মেগাবাইট (MB)',
    pagesOrCount: '১৫টি সম্পূর্ণ ডিজাইন',
    rating: 4.8,
    reviewsCount: 88,
    downloadCount: 540,
    publishedYear: '২০২৬',
    isNew: true,
    featuresBn: [
      'টার্মিনালে প্রিন্ট করার জন্য প্রফেশনাল A3 ও A2 সাইজ লেআউট',
      '"ওভারটেকিং নয় সচেতনতা", "সিটবেল্টেই জীবন" শীর্ষক আকর্ষণীয় স্লোগান',
      'ফেসবুক ও সোশ্যাল মিডিয়ায় শেয়ারের জন্য সোশ্যাল কার্ড অন্তর্ভুক্ত',
      'জাতীয় পতাকা ও সবুজ-লাল কালার থিমে নান্দনিক আর্টওয়ার্ক'
    ],
    featuresEn: [
      'Ready-to-print vector formats scalable up to billboard dimensions',
      'Compelling typography focusing on seatbelt use, speed compliance, and rest',
      'Social media graphics optimized for Facebook and messaging channels',
      'Patriotic Bangladeshi green, red, and crisp white institutional motifs'
    ],
    sampleExcerptBn: 'স্লোগান নং ৩: "এক মুহূর্তের অসতর্কতায় আজীবনের কান্না — গতিসীমা মানুন, পরিবারের কাছে নিরাপদে ফিরুন"',
    sampleExcerptEn: 'Message 3: "A momentary distraction can cause a lifetime of sorrow — Honor speed limits and return home safely"'
  },
  {
    id: 'prod-06',
    titleBn: 'ডিডব্লিউএফ সাংগঠনিক গঠনতন্ত্র, উপবিধি ও কল্যাণ তহবিল নির্দেশিকা',
    titleEn: 'DWF Organizational Constitution & Welfare Fund Charter',
    category: 'book',
    categoryBn: 'অফিসিয়াল প্রকাশনা',
    categoryEn: 'Official Gazette',
    price: 80,
    regularPrice: 180,
    isFreeForMembers: true,
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    descriptionBn: 'ফাউন্ডেশনের সম্পূর্ণ অনুমোদিত সংবিধান, সদস্যদের মাসিক চাঁদার হিসাব, সমাপ্তি পেনশন তহবিল গণনার নিয়মাবলী ও নমিনি উত্তরাধিকার আইন সংক্রান্ত প্রাতিষ্ঠানিক নির্দেশিকা।',
    descriptionEn: 'Official approved charter and constitutional gazette detailing welfare fund accounting, pension dividend rules, nominee governance, and bylaws.',
    authorBn: 'ডিডব্লিউএফ কেন্দ্রীয় সাধারণ পরিষদ',
    authorEn: 'DWF Central General Assembly',
    fileFormat: 'অফিসিয়াল গেজেট PDF',
    fileSize: '৬.৩ মেগাবাইট (MB)',
    pagesOrCount: '৪৮ পৃষ্ঠা',
    rating: 4.9,
    reviewsCount: 162,
    downloadCount: 920,
    publishedYear: '২০২৬',
    featuresBn: [
      'সরকারি নিবন্ধন ও অডিট নিয়মাবলীর পূর্ণাঙ্গ বিবরণ',
      'মাসিক চাঁদার বিপরীতে জমাকৃত তহবিলের লাভ্যাংশ বণ্টন সূত্র',
      'নমিনির ১০০% বণ্টন প্রক্রিয়া ও মৃত্যুর পর সহায়তা দাবি ফরম্যাট',
      'সদস্যপদ বাতিল ও পুনঃবহাল বিধির বিস্তারিত ধারা'
    ],
    featuresEn: [
      'Official registration, governance bylaws, and audit covenants',
      'Actuarial formulas for maturity benefit calculations',
      '100% nominee distribution protocols and survivor claims process',
      'Rules regarding disciplinary cancellation and reinstatement'
    ],
    sampleExcerptBn: 'অনুচ্ছেদ ১৬(খ): সদস্যের অবর্তমানে মনোনীত নমিনি ব্যতীত অন্য কোনো ব্যক্তির দাবিনামা গৃহীত হইবে না। একাধিক নমিনির ক্ষেত্রে আবেদনপত্রে উল্লেখিত শতকরা ভাগ অনুযায়ী অর্থ পরিশোধিত হইবে...',
    sampleExcerptEn: 'Article 16(b): In the demise of a verified member, benefits shall strictly devolve upon designated nominees in the exact ratios pledged in the core registry...'
  }
];
