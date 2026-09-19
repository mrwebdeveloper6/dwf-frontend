import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { FileUploadZone } from './FileUploadZone';
import { formatFileSize } from '../../lib/storage';
import { 
  X, 
  UploadCloud, 
  FolderArchive, 
  FileText, 
  Image as ImageIcon, 
  Cloud, 
  HardDrive, 
  Download, 
  Trash2, 
  Search, 
  Filter, 
  CheckCircle2, 
  Eye, 
  Plus, 
  ShieldCheck,
  Calendar,
  User,
  Lock
} from 'lucide-react';
import type { StoredFile, FileCategory, StorageOption } from '../../types/dwf';

export const DocumentVaultModal: React.FC = () => {
  const { 
    language, 
    showDocumentVaultModal, 
    setShowDocumentVaultModal, 
    setShowLoginModal,
    storedFiles, 
    uploadFileRecord, 
    deleteFileRecord,
    documentVaultCategoryFilter,
    setDocumentVaultCategoryFilter,
    user
  } = useDwf();

  const [activeTab, setActiveTab] = useState<'FILES' | 'UPLOAD'>('FILES');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(documentVaultCategoryFilter || 'ALL');
  const [previewFile, setPreviewFile] = useState<StoredFile | null>(null);

  // New Upload Form State
  const [uploadCategory, setUploadCategory] = useState<FileCategory>('MEMBER_PHOTO');
  const [uploadStorageOption, setUploadStorageOption] = useState<StorageOption>('FIREBASE_STORAGE');
  const [uploadDescription, setUploadDescription] = useState('');
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingDataUrl, setPendingDataUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!showDocumentVaultModal) return null;

  // STRICT ACCESS CONTROL: Document Vault is strictly visible ONLY to authenticated users
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div 
          className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 text-center space-y-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              {language === 'bn' ? 'নথি ভল্ট: লগইন আবশ্যক' : 'Document Vault: Login Required'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn' 
                ? 'নথিপত্র ও ক্লাউড স্টোরেজ ভল্ট শুধুমাত্র অনুমোদিত চালক সদস্য অথবা অ্যাডমিন কর্মকর্তা লগইন থাকলে দেখা যাবে। অনুগ্রহ করে প্রথমে লগইন করুন।' 
                : 'The Document Vault is protected and only accessible when logged in as a registered Driver Member or Administrator.'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => setShowDocumentVaultModal(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              onClick={() => {
                setShowDocumentVaultModal(false);
                setShowLoginModal(true);
              }}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
            >
              {language === 'bn' ? 'লগইন করুন' : 'Sign In Now'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter files
  const filteredFiles = storedFiles.filter(f => {
    // If logged in as Member, only show their documents unless Admin
    if (user?.role === 'MEMBER' && f.memberId && f.memberId !== user.memberId) {
      return false;
    }
    const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      f.name.toLowerCase().includes(q) || 
      (f.memberName && f.memberName.toLowerCase().includes(q)) || 
      (f.description && f.description.toLowerCase().includes(q)) ||
      (f.memberId && f.memberId.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Calculate statistics
  const totalBytes = storedFiles.reduce((acc, f) => acc + f.size, 0);
  const cloudCount = storedFiles.filter(f => f.storageType === 'FIREBASE_STORAGE').length;
  const localCount = storedFiles.filter(f => f.storageType === 'LOCAL_VAULT').length;

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingFile) {
      setUploadFeedback({ success: false, message: 'অনুগ্রহ করে একটি ফাইল নির্বাচন করুন।' });
      return;
    }

    setIsUploading(true);
    setUploadFeedback(null);
    try {
      const res = await uploadFileRecord(pendingFile, {
        category: uploadCategory,
        preferredStorage: uploadStorageOption,
        memberId: user?.memberId || 'DWF-000142',
        memberName: user?.name || 'কামাল হোসেন',
        description: uploadDescription
      });

      setUploadFeedback({
        success: res.success,
        message: res.message
      });

      if (res.success) {
        setPendingFile(null);
        setPendingDataUrl('');
        setUploadDescription('');
        setTimeout(() => {
          setActiveTab('FILES');
          setUploadFeedback(null);
        }, 1200);
      }
    } catch (err) {
      setUploadFeedback({
        success: false,
        message: 'আপলোড প্রক্রিয়া বিঘ্নিত হয়েছে। পুনরায় চেষ্টা করুন।'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getCategoryLabel = (cat: FileCategory) => {
    switch (cat) {
      case 'MEMBER_PHOTO': return 'সদস্যের ছবি / ফটো';
      case 'DRIVING_LICENSE': return 'ড্রাইভিং লাইসেন্স স্ক্যান';
      case 'NID_CARD': return 'জাতীয় পরিচয়পত্র (NID)';
      case 'MEDICAL_DOC': return 'চিকিৎসা ও হাসপাতাল ভাউচার';
      case 'ACCIDENT_PROOF': return 'দুর্ঘটনা ও ক্ষতিপূরণ প্রমাণ';
      case 'PAYMENT_SLIP': return 'চাঁদা বা ব্যাংকিং রসিদ';
      case 'INSURANCE': return 'বীমা ও নিরাপত্তা সনদ';
      default: return 'অন্যান্য প্রাতিষ্ঠানিক নথি';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>{language === 'bn' ? 'নথিপত্র ও ফাইল স্টোরেজ ভল্ট' : 'Document Vault & Storage'}</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded font-mono font-medium">
                  {storedFiles.length} {language === 'bn' ? 'টি নথি' : 'Files'}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' 
                  ? 'চালকদের এনআইডি, লাইসেন্স, চিকিৎসা ভাউচার ও ক্লাউড ব্যাকআপ সিস্টেম' 
                  : 'Encrypted document management with Google Firebase & Local Storage options'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowDocumentVaultModal(false)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Metric Strip & Storage Targets */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Cloud className="w-3.5 h-3.5 text-emerald-600" />
              <span>Firebase Cloud:</span>
              <span className="font-bold text-emerald-800">{cloudCount}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <HardDrive className="w-3.5 h-3.5 text-indigo-600" />
              <span>Local Offline Vault:</span>
              <span className="font-bold text-indigo-800">{localCount}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="text-slate-500 text-[11px]">
              মোট ব্যবহৃত স্থান: <span className="font-semibold text-slate-800">{formatFileSize(totalBytes)}</span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('FILES')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                activeTab === 'FILES'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              সংরক্ষিত ফাইলসমূহ
            </button>
            <button
              onClick={() => setActiveTab('UPLOAD')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md transition cursor-pointer ${
                activeTab === 'UPLOAD'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              নতুন আপলোড
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'FILES' ? (
            <div className="space-y-4">
              {/* Search & Category Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ফাইল নাম, সদস্যের নাম বা সদস্য আইডি খুঁজুন..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-700"
                  >
                    <option value="ALL">সকল ক্যাটাগরি ({storedFiles.length})</option>
                    <option value="MEMBER_PHOTO">সদস্যের ছবি</option>
                    <option value="DRIVING_LICENSE">ড্রাইভিং লাইসেন্স</option>
                    <option value="NID_CARD">জাতীয় পরিচয়পত্র</option>
                    <option value="MEDICAL_DOC">চিকিৎসা ভাউচার</option>
                    <option value="ACCIDENT_PROOF">দুর্ঘটনা প্রমাণ</option>
                    <option value="PAYMENT_SLIP">পেমেন্ট রসিদ</option>
                    <option value="OTHER">অন্যান্য</option>
                  </select>
                </div>
              </div>

              {/* Files Grid / List */}
              {filteredFiles.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                  <FolderArchive className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold text-slate-600">কোন ফাইল খুঁজে পাওয়া যায়নি</p>
                  <p className="text-xs text-slate-400">ফিল্টার পরিবর্তন করুন অথবা 'নতুন আপলোড' বোতামে ক্লিক করুন</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredFiles.map((file) => {
                    const isImg = file.type.startsWith('image/') || file.url.match(/\.(jpeg|jpg|png|webp|gif)/i);
                    return (
                      <div 
                        key={file.id}
                        className="bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-3 flex flex-col justify-between group"
                      >
                        {/* Card Top: Preview + Badges */}
                        <div>
                          <div className="relative h-28 rounded-lg overflow-hidden bg-slate-100 border border-slate-150 mb-2.5 flex items-center justify-center">
                            {isImg ? (
                              <img 
                                src={file.url} 
                                alt={file.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-slate-500 space-y-1">
                                <FileText className="w-8 h-8 text-emerald-600" />
                                <span className="text-[10px] uppercase font-bold text-slate-400">{file.type.split('/')[1] || 'PDF'}</span>
                              </div>
                            )}

                            {/* Storage Type Badge */}
                            <span 
                              className={`absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-md shadow-xs ${
                                file.storageType === 'FIREBASE_STORAGE'
                                  ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700/50'
                                  : 'bg-slate-900/80 text-slate-200 border border-slate-700/50'
                              }`}
                            >
                              {file.storageType === 'FIREBASE_STORAGE' ? (
                                <>
                                  <Cloud className="w-2.5 h-2.5 text-emerald-400" />
                                  <span>Firebase</span>
                                </>
                              ) : (
                                <>
                                  <HardDrive className="w-2.5 h-2.5 text-indigo-300" />
                                  <span>Local</span>
                                </>
                              )}
                            </span>
                          </div>

                          {/* File Meta */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              {getCategoryLabel(file.category)}
                            </span>
                            <h4 className="font-semibold text-xs text-slate-800 line-clamp-1 mt-1" title={file.name}>
                              {file.name}
                            </h4>
                            {file.description && (
                              <p className="text-[11px] text-slate-500 line-clamp-1">{file.description}</p>
                            )}

                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                              <span>{formatFileSize(file.size)}</span>
                              <span>{file.uploadedAt}</span>
                            </div>

                            {file.memberName && (
                              <div className="flex items-center gap-1 text-[10px] text-slate-600 pt-0.5">
                                <User className="w-2.5 h-2.5 text-slate-400" />
                                <span className="truncate">{file.memberName} ({file.memberId || 'DWF'})</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-2.5 gap-2">
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="flex-1 flex items-center justify-center gap-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs py-1.5 rounded-lg transition font-medium cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>প্রিভিউ</span>
                          </button>

                          <a
                            href={file.url}
                            download={file.name}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                            title="ডাউনলোড করুন"
                          >
                            <Download className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => {
                              if (confirm(`আপনি কি "${file.name}" ফাইলটি মুছে ফেলতে চান?`)) {
                                deleteFileRecord(file.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* UPLOAD TAB */
            <form onSubmit={handleUploadSubmit} className="space-y-4 max-w-xl mx-auto py-2">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>নিরাপদ প্রাতিষ্ঠানিক ডকুমেন্ট আপলোড ও স্টোরেজ অপশন</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  আপনার পছন্দ অনুযায়ী Google Firebase Cloud Storage অথবা অফলাইন এনক্রিপ্টেড লোকাল ভল্টে সংরক্ষণ করতে পারবেন।
                </p>
              </div>

              {/* Upload Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  নথিপত্রের ধরন বা ক্যাটাগরি *
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as FileCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                >
                  <option value="MEMBER_PHOTO">চালকের পাসপোর্ট ছবি (Member Photo)</option>
                  <option value="DRIVING_LICENSE">বিআরটিএ ড্রাইভিং লাইসেন্স স্ক্যান (Driving License)</option>
                  <option value="NID_CARD">জাতীয় পরিচয়পত্র এনআইডি (National ID)</option>
                  <option value="MEDICAL_DOC">হাসপাতাল ডিসচার্জ / চিকিৎসা ভাউচার (Medical Voucher)</option>
                  <option value="ACCIDENT_PROOF">দুর্ঘটনা জিডি কপি / ক্ষতির ছবি (Accident Proof)</option>
                  <option value="PAYMENT_SLIP">ব্যাংক / বিকাশ জমা স্লিপ (Payment Slip)</option>
                  <option value="OTHER">অন্যান্য সনদ ও কাগজপত্র (Other Document)</option>
                </select>
              </div>

              {/* File Drop & Upload Zone */}
              <div>
                <FileUploadZone
                  label="ডকুমেন্ট বা ছবি ফাইল যুক্ত করুন"
                  subLabel="ড্র্যাগ এবং ড্রপ করুন বা ক্লিক করে নির্বাচন করুন"
                  category={uploadCategory}
                  maxSizeMb={10}
                  onFileSelect={(file, dataUrl, option) => {
                    setPendingFile(file);
                    setPendingDataUrl(dataUrl);
                    setUploadStorageOption(option);
                  }}
                  onFileClear={() => {
                    setPendingFile(null);
                    setPendingDataUrl('');
                  }}
                />
              </div>

              {/* Document Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  নথির সংক্ষিপ্ত বিবরণ বা মন্তব্য
                </label>
                <input
                  type="text"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="যেমন: মিরপুর ব্রাঞ্চে জমা দেওয়া স্মার্ট কার্ডের স্ক্যান"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              {/* Feedback messages */}
              {uploadFeedback && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  uploadFeedback.success 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' 
                    : 'bg-red-50 text-red-800 border border-red-300'
                }`}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{uploadFeedback.message}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('FILES')}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-medium rounded-xl hover:bg-slate-100 transition cursor-pointer"
                >
                  বাতিল
                </button>

                <button
                  type="submit"
                  disabled={!pendingFile || isUploading}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-sm transition cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isUploading ? 'আপলোড হচ্ছে...' : 'স্টোরেজে সংরক্ষণ করুন'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>DWF Secure Cloud & Offline Document Vault</span>
          </div>

          <button
            onClick={() => setShowDocumentVaultModal(false)}
            className="text-slate-700 hover:text-slate-900 font-medium cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>

      {/* Floating Single File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-xs truncate">{previewFile.name}</span>
              </div>
              <button 
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-slate-950">
              {previewFile.type.startsWith('image/') || previewFile.url.match(/\.(jpeg|jpg|png|webp|gif)/i) ? (
                <img 
                  src={previewFile.url} 
                  alt={previewFile.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-lg"
                />
              ) : (
                <div className="text-center p-8 text-slate-300 space-y-3">
                  <FileText className="w-16 h-16 text-emerald-400 mx-auto" />
                  <p className="text-sm font-semibold">{previewFile.name}</p>
                  <p className="text-xs text-slate-400">{formatFileSize(previewFile.size)} • {previewFile.type}</p>
                  <a
                    href={previewFile.url}
                    download={previewFile.name}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    <Download className="w-4 h-4" />
                    নথিটি ডাউনলোড বা ভিউ করুন
                  </a>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>আপলোড: {previewFile.uploadedAt}</span>
              <a
                href={previewFile.url}
                download={previewFile.name}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-emerald-700 hover:underline font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                ডাউনলোড
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
