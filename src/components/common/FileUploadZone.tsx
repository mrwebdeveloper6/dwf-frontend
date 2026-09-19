import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  X, 
  AlertCircle, 
  Cloud, 
  HardDrive, 
  Loader2 
} from 'lucide-react';
import { formatFileSize, readFileAsDataUrl } from '../../lib/storage';
import type { StorageOption, FileCategory } from '../../types/dwf';

interface FileUploadZoneProps {
  label: string;
  subLabel?: string;
  category: FileCategory;
  accept?: string;
  maxSizeMb?: number;
  currentValue?: string; // Existing URL or Data URL
  currentFileName?: string;
  onFileSelect: (file: File, dataUrl: string, storageOption: StorageOption) => void;
  onFileClear?: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  label,
  subLabel,
  category,
  accept = 'image/*,application/pdf',
  maxSizeMb = 10,
  currentValue,
  currentFileName,
  onFileSelect,
  onFileClear,
  disabled = false,
  compact = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentValue || '');
  const [fileName, setFileName] = useState<string>(currentFileName || '');
  const [fileSize, setFileSize] = useState<number>(0);
  const [storageOption, setStorageOption] = useState<StorageOption>('FIREBASE_STORAGE');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setErrorMessage('');
    
    // Validate file size
    const maxBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMessage(`ফাইল সাইজ সর্বোচ্চ ${maxSizeMb}MB হতে পারবে (আপনার ফাইল: ${formatFileSize(file.size)})`);
      return;
    }

    setIsProcessing(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedFile(file);
      setPreviewUrl(dataUrl);
      setFileName(file.name);
      setFileSize(file.size);

      // Invoke callback
      onFileSelect(file, dataUrl, storageOption);
    } catch (err) {
      console.error('File read error:', err);
      setErrorMessage('ফাইলটি প্রক্রিয়া করতে ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl('');
    setFileName('');
    setFileSize(0);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileClear) {
      onFileClear();
    }
  };

  const isImage = selectedFile 
    ? selectedFile.type.startsWith('image/') 
    : (previewUrl && (previewUrl.startsWith('data:image/') || previewUrl.match(/\.(jpeg|jpg|png|webp|gif)/i)));

  return (
    <div className="space-y-1.5 w-full">
      {/* Header with Storage Target Selector */}
      <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
        <label className="font-semibold text-slate-700 flex items-center gap-1.5">
          <span>{label}</span>
          {subLabel && <span className="text-[11px] font-normal text-slate-500">({subLabel})</span>}
        </label>

        {/* Storage Option Selector */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-250 text-[10px]">
          <button
            type="button"
            onClick={() => {
              setStorageOption('FIREBASE_STORAGE');
              if (selectedFile && previewUrl) onFileSelect(selectedFile, previewUrl, 'FIREBASE_STORAGE');
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer font-medium transition ${
              storageOption === 'FIREBASE_STORAGE'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="গুগল ফায়ারবেস ক্লাউড স্টোরেজে আপলোড হবে"
          >
            <Cloud className="w-3 h-3" />
            <span>Firebase Cloud</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setStorageOption('LOCAL_VAULT');
              if (selectedFile && previewUrl) onFileSelect(selectedFile, previewUrl, 'LOCAL_VAULT');
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer font-medium transition ${
              storageOption === 'LOCAL_VAULT'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="অফলাইন নিরাপদ লোকাল স্টোরেজ ভল্ট"
          >
            <HardDrive className="w-3 h-3" />
            <span>Local Vault</span>
          </button>
        </div>
      </div>

      {/* Main Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer select-none overflow-hidden ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01]'
            : previewUrl
            ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-400'
            : 'border-slate-300 bg-slate-50/70 hover:border-slate-400 hover:bg-slate-100/60'
        } ${compact ? 'p-3' : 'p-4'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
        />

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-4 text-slate-600 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">ফাইল প্রসেস হচ্ছে...</span>
          </div>
        ) : previewUrl ? (
          <div className="flex items-center gap-3">
            {/* Thumbnail Preview */}
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-white flex-shrink-0 flex items-center justify-center">
              {isImage ? (
                <img
                  src={previewUrl}
                  alt={fileName || 'File Preview'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FileText className="w-7 h-7 text-emerald-600" />
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{fileName || 'সংযুক্ত ফাইল'}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                {fileSize > 0 && <span>{formatFileSize(fileSize)}</span>}
                <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded text-[10px]">
                  {storageOption === 'FIREBASE_STORAGE' ? (
                    <>
                      <Cloud className="w-2.5 h-2.5" />
                      Cloud Storage
                    </>
                  ) : (
                    <>
                      <HardDrive className="w-2.5 h-2.5" />
                      Local Storage
                    </>
                  )}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                ক্লিক বা ড্র্যাগ করে পরিবর্তন করুন
              </span>
            </div>

            {/* Remove / Clear Button */}
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition cursor-pointer"
              title="ফাইলটি বাতিল করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-1.5 py-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100/80 flex items-center justify-center text-emerald-700">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-emerald-700 hover:underline">
                ফাইল নির্বাচন করুন
              </span>{' '}
              <span className="text-slate-500">বা এখানে ড্রপ করুন</span>
            </div>
            <p className="text-[10px] text-slate-400">
              সমর্থিত: JPG, PNG, WEBP, PDF (সর্বোচ্চ {maxSizeMb}MB)
            </p>
          </div>
        )}
      </div>

      {/* Error notification */}
      {errorMessage && (
        <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
