import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, syncStoredFileToFirestore, deleteStoredFileFromFirestore } from './firebase';
import type { StoredFile, StorageOption, FileCategory } from '../types/dwf';

// Format human-readable file size (e.g. 2.4 MB, 450 KB)
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// Convert File / Blob to Data URL for instant local previews and fallback storage
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Upload file with Storage Choice (Firebase Cloud Storage vs Local Vault)
export async function uploadDocumentFile(
  file: File,
  params: {
    category: FileCategory;
    preferredStorage?: StorageOption;
    memberId?: string;
    memberName?: string;
    uploadedBy?: string;
    description?: string;
  }
): Promise<{ success: boolean; file: StoredFile; message: string }> {
  const fileId = `file-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const preferredStorage = params.preferredStorage || 'FIREBASE_STORAGE';
  
  let finalUrl = '';
  let actualStorageType: StorageOption = 'LOCAL_VAULT';

  // Read data URL for instant display / fallback
  const dataUrl = await readFileAsDataUrl(file);

  if (preferredStorage === 'FIREBASE_STORAGE') {
    try {
      // Firebase Cloud Storage upload
      const storagePath = `dwf-documents/${params.category.toLowerCase()}/${Date.now()}_${cleanName}`;
      const storageRef = ref(storage, storagePath);
      
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          category: params.category,
          memberId: params.memberId || '',
          uploadedBy: params.uploadedBy || 'System'
        }
      });

      finalUrl = await getDownloadURL(snapshot.ref);
      actualStorageType = 'FIREBASE_STORAGE';
    } catch (error) {
      console.warn('Firebase Cloud Storage upload deferred/fell back to local vault:', error);
      // Seamlessly fall back to local vault
      finalUrl = dataUrl;
      actualStorageType = 'LOCAL_VAULT';
    }
  } else {
    // Local Vault preference
    finalUrl = dataUrl;
    actualStorageType = 'LOCAL_VAULT';
  }

  const storedFileRecord: StoredFile = {
    id: fileId,
    name: file.name,
    size: file.size,
    type: file.type,
    url: finalUrl,
    storageType: actualStorageType,
    category: params.category,
    uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    memberId: params.memberId,
    memberName: params.memberName,
    uploadedBy: params.uploadedBy,
    description: params.description
  };

  // Sync metadata record to Firestore
  await syncStoredFileToFirestore(storedFileRecord);

  return {
    success: true,
    file: storedFileRecord,
    message: actualStorageType === 'FIREBASE_STORAGE' 
      ? 'ফাইলটি সফলভাবে Firebase Cloud Storage-এ আপলোড হয়েছে।' 
      : 'ফাইলটি নিরাপদ Local Vault স্টোরেজে সংরক্ষিত হয়েছে।'
  };
}

// Delete stored document
export async function removeDocumentFile(storedFile: StoredFile): Promise<boolean> {
  try {
    if (storedFile.storageType === 'FIREBASE_STORAGE' && storedFile.url.includes('firebasestorage.googleapis.com')) {
      try {
        const fileRef = ref(storage, storedFile.url);
        await deleteObject(fileRef);
      } catch (err) {
        console.warn('Could not delete from Firebase Storage, removing metadata:', err);
      }
    }
    await deleteStoredFileFromFirestore(storedFile.id);
    return true;
  } catch (error) {
    console.error('Failed to remove stored document:', error);
    return false;
  }
}

// Initial Sample Documents for Demo
export const initialSampleFiles: StoredFile[] = [
  {
    id: 'file-demo-001',
    name: 'kamal_hossain_nid_card_front_back.pdf',
    size: 452000,
    type: 'application/pdf',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    storageType: 'FIREBASE_STORAGE',
    category: 'NID_CARD',
    uploadedAt: '2026-03-01 10:15',
    memberId: 'DWF-000142',
    memberName: 'কামাল হোসেন',
    uploadedBy: 'কামাল হোসেন (চালক)',
    description: 'জাতীয় পরিচয়পত্র উভয় পিঠ স্ক্যান কপি (যাচাইকৃত)'
  },
  {
    id: 'file-demo-002',
    name: 'brta_heavy_driving_license_valid2028.jpg',
    size: 780000,
    type: 'image/jpeg',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    storageType: 'FIREBASE_STORAGE',
    category: 'DRIVING_LICENSE',
    uploadedAt: '2026-03-01 10:18',
    memberId: 'DWF-000142',
    memberName: 'কামাল হোসেন',
    uploadedBy: 'কামাল হোসেন (চালক)',
    description: 'বিআরটিএ ভারী বাণিজ্যিক বাস ড্রাইভিং লাইসেন্স'
  },
  {
    id: 'file-demo-003',
    name: 'square_hospital_discharge_voucher_bill.pdf',
    size: 1250000,
    type: 'application/pdf',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    storageType: 'LOCAL_VAULT',
    category: 'MEDICAL_DOC',
    uploadedAt: '2026-03-05 14:22',
    memberId: 'DWF-000142',
    memberName: 'কামাল হোসেন',
    uploadedBy: 'মেডিকেল সেল অফিসার',
    description: 'স্কয়ার হাসপাতাল ডিসচার্জ সামারি ও ফার্মেসি ভাউচার'
  },
  {
    id: 'file-demo-004',
    name: 'dwf_health_card_digital_smart_pass.png',
    size: 320000,
    type: 'image/png',
    url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop&q=80',
    storageType: 'FIREBASE_STORAGE',
    category: 'MEMBER_PHOTO',
    uploadedAt: '2026-03-01 10:25',
    memberId: 'DWF-000142',
    memberName: 'কামাল হোসেন',
    uploadedBy: 'হেড অফিস অ্যাডমিন',
    description: 'ডিজিটাল স্মার্ট হেলথ সুরক্ষা কার্ড (HC-DWF-78401)'
  }
];
