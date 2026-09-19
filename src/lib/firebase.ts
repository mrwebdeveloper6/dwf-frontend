import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer, 
  setDoc, 
  collection, 
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';
import type { 
  Member, 
  MembershipApplication, 
  PaymentRecord, 
  MedicalClaim, 
  AccidentClaim, 
  AuditLog, 
  SystemMetrics,
  StoredFile,
  CommitteeMember,
  NoticeItem,
  ProfileUpdateRequest
} from '../types/dwf';

// Initialize Firebase App (Singleton)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore targeting the provisioned custom database ID
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firebase Cloud Storage
export const storage = getStorage(app);

// Connection state test
let isOnline = false;

export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    isOnline = true;
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network restricted. Using local cache fallback.');
    } else {
      // Document might not exist, which still confirms server response
      isOnline = true;
      return true;
    }
    return false;
  }
}

// Initial boot connection test
testFirebaseConnection();

// Collection names
export const COLLECTIONS = {
  MEMBERS: 'members',
  APPLICATIONS: 'applications',
  PAYMENTS: 'payments',
  MEDICAL_CLAIMS: 'medicalClaims',
  ACCIDENT_CLAIMS: 'accidentClaims',
  AUDIT_LOGS: 'auditLogs',
  METRICS: 'metrics',
  STORED_FILES: 'storedFiles',
  COMMITTEE: 'committee',
  NOTICES: 'notices',
  PROFILE_UPDATE_REQUESTS: 'profileUpdateRequests'
} as const;

// Firestore CRUD Helpers

export async function syncProfileUpdateRequestToFirestore(req: ProfileUpdateRequest): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.PROFILE_UPDATE_REQUESTS, req.id), req);
  } catch (err) {
    console.warn('Failed to sync profile update request to Firestore:', err);
  }
}

export async function syncCommitteeMemberToFirestore(member: CommitteeMember): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.COMMITTEE, member.id), member);
  } catch (err) {
    console.warn('Failed to sync committee member to Firestore:', err);
  }
}

export async function deleteCommitteeMemberFromFirestore(memberId: string): Promise<void> {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(db, COLLECTIONS.COMMITTEE, memberId));
  } catch (err) {
    console.warn('Failed to delete committee member from Firestore:', err);
  }
}

export async function syncNoticeToFirestore(notice: NoticeItem): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.NOTICES, notice.id), notice);
  } catch (err) {
    console.warn('Failed to sync notice to Firestore:', err);
  }
}

export async function deleteNoticeFromFirestore(noticeId: string): Promise<void> {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(db, COLLECTIONS.NOTICES, noticeId));
  } catch (err) {
    console.warn('Failed to delete notice from Firestore:', err);
  }
}

export async function syncStoredFileToFirestore(file: StoredFile): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.STORED_FILES, file.id), file);
  } catch (err) {
    console.warn('Failed to sync stored file to Firestore:', err);
  }
}

export async function deleteStoredFileFromFirestore(fileId: string): Promise<void> {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(db, COLLECTIONS.STORED_FILES, fileId));
  } catch (err) {
    console.warn('Failed to delete stored file from Firestore:', err);
  }
}

export async function syncMemberToFirestore(member: Member): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.MEMBERS, member.id), member);
  } catch (err) {
    console.warn('Failed to sync member to Firestore:', err);
  }
}

export async function syncApplicationToFirestore(application: MembershipApplication): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.APPLICATIONS, application.id), application);
  } catch (err) {
    console.warn('Failed to sync application to Firestore:', err);
  }
}

export async function syncPaymentToFirestore(payment: PaymentRecord): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.PAYMENTS, payment.id), payment);
  } catch (err) {
    console.warn('Failed to sync payment to Firestore:', err);
  }
}

export async function syncMedicalClaimToFirestore(claim: MedicalClaim): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.MEDICAL_CLAIMS, claim.id), claim);
  } catch (err) {
    console.warn('Failed to sync medical claim to Firestore:', err);
  }
}

export async function syncAccidentClaimToFirestore(claim: AccidentClaim): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.ACCIDENT_CLAIMS, claim.id), claim);
  } catch (err) {
    console.warn('Failed to sync accident claim to Firestore:', err);
  }
}

export async function syncAuditLogToFirestore(log: AuditLog): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.AUDIT_LOGS, log.id), log);
  } catch (err) {
    console.warn('Failed to sync audit log to Firestore:', err);
  }
}

export async function syncMetricsToFirestore(metrics: SystemMetrics): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.METRICS, metrics.id || 'system_metrics'), metrics);
  } catch (err) {
    console.warn('Failed to sync metrics to Firestore:', err);
  }
}

// Initial Seeding: Populates initial sample data if cloud database is empty
export async function seedInitialFirestoreData(data: {
  members: Member[];
  applications: MembershipApplication[];
  payments: PaymentRecord[];
  medicalClaims: MedicalClaim[];
  accidentClaims: AccidentClaim[];
  metrics: SystemMetrics;
}): Promise<boolean> {
  try {
    const membersSnap = await getDocs(collection(db, COLLECTIONS.MEMBERS));
    if (membersSnap.empty) {
      const batch = writeBatch(db);

      // Seed members
      data.members.forEach((m) => {
        batch.set(doc(db, COLLECTIONS.MEMBERS, m.id), m);
      });

      // Seed applications
      data.applications.forEach((a) => {
        batch.set(doc(db, COLLECTIONS.APPLICATIONS, a.id), a);
      });

      // Seed payments
      data.payments.forEach((p) => {
        batch.set(doc(db, COLLECTIONS.PAYMENTS, p.id), p);
      });

      // Seed medical claims
      data.medicalClaims.forEach((mc) => {
        batch.set(doc(db, COLLECTIONS.MEDICAL_CLAIMS, mc.id), mc);
      });

      // Seed accident claims
      data.accidentClaims.forEach((ac) => {
        batch.set(doc(db, COLLECTIONS.ACCIDENT_CLAIMS, ac.id), ac);
      });

      // Seed metrics
      batch.set(doc(db, COLLECTIONS.METRICS, data.metrics.id || 'system_metrics'), data.metrics);

      await batch.commit();
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Firestore initial seeding skipped or deferred:', error);
    return false;
  }
}

// Fetch all collections from Firestore
export async function fetchAllFromFirestore(): Promise<{
  members?: Member[];
  applications?: MembershipApplication[];
  payments?: PaymentRecord[];
  medicalClaims?: MedicalClaim[];
  accidentClaims?: AccidentClaim[];
  metrics?: SystemMetrics;
  storedFiles?: StoredFile[];
  committeeMembers?: CommitteeMember[];
  notices?: NoticeItem[];
  profileUpdateRequests?: ProfileUpdateRequest[];
} | null> {
  try {
    const [
      membersSnap, 
      appsSnap, 
      paymentsSnap, 
      medSnap, 
      accSnap, 
      metricsSnap, 
      filesSnap,
      committeeSnap,
      noticesSnap,
      profileRequestsSnap
    ] = await Promise.all([
      getDocs(collection(db, COLLECTIONS.MEMBERS)),
      getDocs(collection(db, COLLECTIONS.APPLICATIONS)),
      getDocs(collection(db, COLLECTIONS.PAYMENTS)),
      getDocs(collection(db, COLLECTIONS.MEDICAL_CLAIMS)),
      getDocs(collection(db, COLLECTIONS.ACCIDENT_CLAIMS)),
      getDoc(doc(db, COLLECTIONS.METRICS, 'system_metrics')),
      getDocs(collection(db, COLLECTIONS.STORED_FILES)),
      getDocs(collection(db, COLLECTIONS.COMMITTEE)),
      getDocs(collection(db, COLLECTIONS.NOTICES)),
      getDocs(collection(db, COLLECTIONS.PROFILE_UPDATE_REQUESTS))
    ]);

    const hasAnyDocs = !membersSnap.empty || !committeeSnap.empty || !noticesSnap.empty || !filesSnap.empty;
    if (!hasAnyDocs) {
      return null;
    }

    return {
      members: membersSnap.docs.map((d) => d.data() as Member),
      applications: appsSnap.docs.map((d) => d.data() as MembershipApplication),
      payments: paymentsSnap.docs.map((d) => d.data() as PaymentRecord),
      medicalClaims: medSnap.docs.map((d) => d.data() as MedicalClaim),
      accidentClaims: accSnap.docs.map((d) => d.data() as AccidentClaim),
      metrics: metricsSnap.exists() ? (metricsSnap.data() as SystemMetrics) : undefined,
      storedFiles: filesSnap.docs.map((d) => d.data() as StoredFile),
      committeeMembers: committeeSnap.docs.map((d) => d.data() as CommitteeMember),
      notices: noticesSnap.docs.map((d) => d.data() as NoticeItem),
      profileUpdateRequests: profileRequestsSnap.docs.map((d) => d.data() as ProfileUpdateRequest)
    };
  } catch (error) {
    console.warn('Could not fetch from Firestore, will use local persistence:', error);
    return null;
  }
}
