export type Language = 'bn' | 'en';

export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'DIRECTOR' 
  | 'ACCOUNTS_OFFICER' 
  | 'MEMBERSHIP_OFFICER' 
  | 'MEDICAL_OFFICER' 
  | 'BRANCH_MANAGER';

export interface UserSession {
  id: string;
  name: string;
  phone: string;
  role: 'MEMBER' | 'ADMIN' | 'GUEST';
  adminRole?: UserRole;
  memberId?: string; // e.g. 'DWF-000142'
  avatar?: string;
  branch?: string;
}

export type MembershipStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'EXPIRED';
export type ApplicationStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
export type PaymentStatus = 'PAID' | 'PENDING' | 'DUE' | 'PARTIAL' | 'REFUNDED';
export type PaymentType = 
  | 'MONTHLY_CONTRIBUTION' 
  | 'WELFARE_FUND' 
  | 'HALF_YEARLY' 
  | 'ANNUAL' 
  | 'ADDITIONAL_INVESTMENT'
  | 'REGISTRATION_FEE';
export type PaymentMethod = 'BKASH' | 'NAGAD' | 'ROCKET' | 'BANK' | 'MANUAL';

export type ClaimStatus = 
  | 'SUBMITTED' 
  | 'UNDER_REVIEW' 
  | 'APPROVED' 
  | 'PARTIALLY_APPROVED' 
  | 'REJECTED' 
  | 'PAID' 
  | 'CLOSED';

export interface Nominee {
  id: string;
  name: string;
  relationship: string;
  nid: string;
  mobile: string;
  address: string;
  percentage: number; // Must total 100% across all nominees
}

export interface Member {
  id: string;
  memberId: string; // e.g. DWF-000142
  name: string;
  nameBn: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  nid: string;
  dob: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  currentAddress: string;
  permanentAddress: string;
  profession: string;
  drivingLicenseNo: string;
  licenseType: 'PROFESSIONAL_HEAVY' | 'PROFESSIONAL_MEDIUM' | 'PROFESSIONAL_LIGHT' | 'NON_PROFESSIONAL';
  licenseExpiry: string;
  vehicleType: 'BUS' | 'TRUCK' | 'MICROBUS' | 'CAR' | 'CNG' | 'MOTORCYCLE';
  vehicleRegNo: string;
  photoUrl: string;
  status: MembershipStatus;
  joinedDate: string;
  healthCardNo: string; // e.g. HC-DWF-78401
  healthCardExpiry: string;
  branchId: string;
  branchName: string;
  verificationToken: string; // Cryptographically random or secure token
  monthlyContribution: number;
  totalDeposit: number;
  welfareBalance: number;
  outstandingDue: number;
  medicalAllowanceLimit: number;
  nominees: Nominee[];
}

export interface MembershipApplication {
  id: string;
  applicationId: string; // e.g. DWF-APP-2026-000108
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  nid: string;
  phone: string;
  whatsapp: string;
  bloodGroup: string;
  profession: string;
  currentAddress: string;
  permanentAddress: string;
  drivingLicenseNo: string;
  licenseType: string;
  licenseExpiry: string;
  vehicleType: string;
  vehicleRegNo: string;
  applicantPhoto?: string;
  nidFront?: string;
  nidBack?: string;
  drivingLicenseDoc?: string;
  nominees: Nominee[];
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  assignedMemberId?: string;
}

export interface PaymentRecord {
  id: string;
  receiptNo: string; // e.g. DWF-REC-2026-0842
  memberId: string;
  memberName: string;
  amount: number;
  paymentType: PaymentType;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: PaymentStatus;
  date: string;
  monthCovered?: string;
  remarks?: string;
  collectedBy?: string;
}

export interface MedicalClaim {
  id: string;
  claimNo: string; // e.g. MC-2026-041
  memberId: string;
  memberName: string;
  hospital: string;
  admissionDate: string;
  dischargeDate: string;
  diseaseReason: string;
  treatmentType: 'INPATIENT' | 'SURGERY' | 'EMERGENCY' | 'OUTPATIENT';
  totalBill: number;
  claimAmount: number;
  approvedAmount?: number;
  documentsCount: number;
  prescriptionDoc?: string;
  status: ClaimStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  paymentDate?: string;
}

export interface AccidentClaim {
  id: string;
  claimNo: string; // e.g. AC-2026-019
  memberId: string;
  memberName: string;
  accidentDate: string;
  location: string;
  vehicle: string;
  driverName: string;
  injuryType: 'MINOR' | 'SEVERE' | 'PERMANENT_DISABILITY' | 'FATAL';
  hospital: string;
  policeReportNo: string;
  estimatedCost: number;
  claimAmount: number;
  approvedAmount?: number;
  status: ClaimStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
  accidentDetails?: string;
  hospitalAdmitted?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  module: 'MEMBER' | 'PAYMENT' | 'CLAIM' | 'APPLICATION' | 'SETTINGS' | 'SMS' | 'AUTH' | 'STORAGE_VAULT' | 'COMMITTEE' | 'CIRCULAR' | 'PROFILE_UPDATE';
  recordId: string;
  details: string;
  ipAddress?: string;
}

export type ProfileUpdateStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ProfileUpdateRequest {
  id: string;
  requestId: string; // e.g. PUR-2026-0042
  memberId: string; // e.g. DWF-000142
  memberName: string;
  memberNameBn: string;
  currentData: {
    name: string;
    nameBn: string;
    phone: string;
    whatsapp?: string;
    photoUrl: string;
    bloodGroup?: string;
    currentAddress?: string;
    permanentAddress?: string;
    drivingLicenseNo?: string;
    vehicleType?: string;
    vehicleRegNo?: string;
    nominees: Nominee[];
  };
  requestedChanges: {
    name?: string;
    nameBn?: string;
    phone?: string;
    whatsapp?: string;
    photoUrl?: string;
    bloodGroup?: string;
    currentAddress?: string;
    permanentAddress?: string;
    drivingLicenseNo?: string;
    vehicleType?: string;
    vehicleRegNo?: string;
    nominees?: Nominee[];
  };
  reason?: string;
  status: ProfileUpdateStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface SmsRecord {
  id: string;
  recipientPhone: string;
  recipientName: string;
  template: string;
  message: string;
  status: 'DELIVERED' | 'PENDING' | 'FAILED';
  sentAt: string;
  cost: number;
}

export interface NoticeItem {
  id: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  content: string;
  contentBn: string;
  category: 'NOTICE' | 'NEWS' | 'TRAINING' | 'WELFARE' | 'MEDICAL';
  date: string;
  isUrgent?: boolean;
  image?: string;
}

export interface CommitteeMember {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  phone: string;
  cleanPhone?: string;
  roleType: 'PRESIDIUM' | 'SECRETARY' | 'SPECIALIZED';
  photo: string;
  locationBn: string;
  locationEn: string;
  tenureBn: string;
  tenureEn: string;
  isKeyLeader?: boolean;
  order?: number;
}

export interface Branch {
  id: string;
  code: string;
  name: string;
  nameBn: string;
  district: string;
  division: string;
  address: string;
  phone: string;
  manager: string;
  memberCount: number;
}

export interface SystemMetrics {
  id?: string;
  totalMembers: number;
  activeMembers: number;
  pendingApplications: number;
  totalWelfareFund: number; // in BDT
  totalMedicalAssistance: number; // in BDT
  totalAccidentAssistance: number; // in BDT
  trainedMembers: number;
  monthlyCollection: number; // in BDT
  todayCollection: number; // in BDT
}

export type StorageOption = 'FIREBASE_STORAGE' | 'LOCAL_VAULT';

export type FileCategory = 
  | 'MEMBER_PHOTO' 
  | 'DRIVING_LICENSE' 
  | 'NID_CARD' 
  | 'MEDICAL_DOC' 
  | 'ACCIDENT_PROOF' 
  | 'PAYMENT_SLIP' 
  | 'INSURANCE' 
  | 'OTHER';

export interface StoredFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  storageType: StorageOption;
  category: FileCategory;
  uploadedAt: string;
  memberId?: string;
  memberName?: string;
  uploadedBy?: string;
  description?: string;
}
