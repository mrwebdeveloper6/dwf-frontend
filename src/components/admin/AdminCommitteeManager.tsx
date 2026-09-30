import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { CommitteeMember, StorageOption } from '../../types/dwf';
import { FileUploadZone } from '../common/FileUploadZone';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  AlertTriangle,
  FileText,
  Video as VideoIcon,
  Download,
  FolderArchive,
  ExternalLink,
  Eye,
  FileCheck
} from 'lucide-react';

export const AdminCommitteeManager: React.FC = () => {
  const { 
    committeeMembers, 
    addCommitteeMember, 
    updateCommitteeMember, 
    deleteCommitteeMember, 
    uploadFileRecord,
    setShowDocumentVaultModal,
    setDocumentVaultCategoryFilter,
    language 
  } = useDwf();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'PRESIDIUM' | 'SECRETARY' | 'SPECIALIZED'>('ALL');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [photoInputMode, setPhotoInputMode] = useState<'UPLOAD' | 'URL'>('UPLOAD');

  // Preview Modal for attached media
  const [mediaPreview, setMediaPreview] = useState<{ type: 'VIDEO' | 'DOC' | 'IMAGE'; url: string; title: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nameBn: '',
    nameEn: '',
    designationBn: '',
    designationEn: '',
    phone: '',
    roleType: 'PRESIDIUM' as 'PRESIDIUM' | 'SECRETARY' | 'SPECIALIZED',
    photo: '',
    locationBn: '',
    locationEn: '',
    tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
    tenureEn: 'Term: 2024 – 2027',
    isKeyLeader: false,
    order: 1,
    attachmentUrl: '',
    attachmentName: '',
    attachmentType: '',
    attachmentSize: 0,
    videoGreetingUrl: '',
    documentVaultId: ''
  });

  const openAddModal = () => {
    setEditingMember(null);
    setPhotoInputMode('UPLOAD');
    setFormData({
      nameBn: '',
      nameEn: '',
      designationBn: '',
      designationEn: '',
      phone: '',
      roleType: 'PRESIDIUM',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      locationBn: 'কেন্দ্রীয় পরিচালনা পর্ষদ, ঢাকা',
      locationEn: 'Central Executive Board, Dhaka',
      tenureBn: '২০২৪ – ২০২৭ মেয়াদ',
      tenureEn: 'Term: 2024 – 2027',
      isKeyLeader: false,
      order: committeeMembers.length + 1,
      attachmentUrl: '',
      attachmentName: '',
      attachmentType: '',
      attachmentSize: 0,
      videoGreetingUrl: '',
      documentVaultId: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: CommitteeMember) => {
    setEditingMember(member);
    setPhotoInputMode(member.photo && member.photo.startsWith('data:') ? 'UPLOAD' : 'URL');
    setFormData({
      nameBn: member.nameBn || '',
      nameEn: member.nameEn || '',
      designationBn: member.designationBn || '',
      designationEn: member.designationEn || '',
      phone: member.phone || '',
      roleType: member.roleType || 'PRESIDIUM',
      photo: member.photo || '',
      locationBn: member.locationBn || '',
      locationEn: member.locationEn || '',
      tenureBn: member.tenureBn || '২০২৪ – ২০২৭ মেয়াদ',
      tenureEn: member.tenureEn || 'Term: 2024 – 2027',
      isKeyLeader: !!member.isKeyLeader,
      order: member.order || 1,
      attachmentUrl: member.attachmentUrl || '',
      attachmentName: member.attachmentName || '',
      attachmentType: member.attachmentType || '',
      attachmentSize: member.attachmentSize || 0,
      videoGreetingUrl: member.videoGreetingUrl || '',
      documentVaultId: member.documentVaultId || ''
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameBn.trim() || !formData.designationBn.trim() || !formData.phone.trim()) {
      alert('অনুগ্রহ করে নাম (বাংলা), পদবী (বাংলা) এবং মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    if (editingMember) {
      updateCommitteeMember(editingMember.id, formData);
      setSuccessMessage(`কর্মকর্তা "${formData.nameBn}" এর তথ্য সফলভাবে আপডেট করা হয়েছে`);
    } else {
      addCommitteeMember(formData);
      setSuccessMessage(`নতুন কর্মকর্তা "${formData.nameBn}" সফলভাবে কেন্দ্রীয় কমিটিতে যুক্ত করা হয়েছে`);
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleDelete = (id: string) => {
    deleteCommitteeMember(id);
    setDeleteConfirmId(null);
    setSuccessMessage('কর্মকর্তাকে তালিকা থেকে সফলভাবে অপসারণ করা হয়েছে');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const filteredMembers = committeeMembers.filter((member) => {
    const matchesRole = roleFilter === 'ALL' || member.roleType === roleFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesRole;

    const matchesSearch = 
      (member.nameBn && member.nameBn.toLowerCase().includes(q)) ||
      (member.nameEn && member.nameEn.toLowerCase().includes(q)) ||
      (member.designationBn && member.designationBn.toLowerCase().includes(q)) ||
      (member.phone && member.phone.includes(q)) ||
      (member.locationBn && member.locationBn.toLowerCase().includes(q));

    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              কেন্দ্রীয় পরিচালনা পর্ষদ ও কমিটি ব্যবস্থাপনা
            </h2>
            <span className="bg-emerald-950 text-emerald-300 text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-800">
              মোট: {committeeMembers.length} জন
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            কমিটির নেতৃবৃন্দের নাম, পদবী, ছবি, ফোন নম্বর ও কর্মএলাকা পরিবর্তন, পরিবর্ধন এবং নতুন সংযোজন করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setDocumentVaultCategoryFilter('COMMITTEE_DOC');
              setShowDocumentVaultModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-850 text-emerald-400 text-xs font-bold rounded-xl border border-slate-700 transition cursor-pointer"
            title="কমিটি সম্পর্কিত ভল্ট ফাইল দেখুন"
          >
            <FolderArchive className="w-4 h-4" />
            <span className="hidden sm:inline">কমিটি ডকুমেন্ট ভল্ট</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-950 transition cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন কর্মকর্তা যুক্ত করুন</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3.5 bg-emerald-950/80 border border-emerald-600/60 rounded-xl text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, পদবী, ফোন নম্বর বা এলাকা দিয়ে অনুসন্ধান..."
            className="w-full bg-slate-950 text-xs text-slate-200 pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'সকল পদ' },
            { id: 'PRESIDIUM', label: 'সভাপতিমণ্ডলী' },
            { id: 'SECRETARY', label: 'সম্পাদকীয় বিভাগ' },
            { id: 'SPECIALIZED', label: 'বিশেষায়িত সেল' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                roleFilter === tab.id
                  ? 'bg-emerald-800 text-white font-bold border border-emerald-600'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-900 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Committee Members Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        {filteredMembers.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Users className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">কোন কর্মকর্তা খুঁজে পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500 mt-1">অনুসন্ধান ফিল্টার পরিবর্তন করুন বা নতুন কর্মকর্তা যুক্ত করুন</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                  <th className="p-3.5">কর্মকর্তা ও ছবি</th>
                  <th className="p-3.5">পদবী</th>
                  <th className="p-3.5">ক্যাটাগরি</th>
                  <th className="p-3.5">মোবাইল নম্বর</th>
                  <th className="p-3.5">কর্মএলাকা ও মেয়াদ</th>
                  <th className="p-3.5">মিডিয়া ও ভল্ট নথি</th>
                  <th className="p-3.5 text-center">হাইলাইট</th>
                  <th className="p-3.5 text-right">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={member.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'} 
                          alt={member.nameBn} 
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700 bg-slate-800 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div>
                          <p className="font-bold text-white text-sm">{member.nameBn}</p>
                          {member.nameEn && <p className="text-[11px] text-slate-400">{member.nameEn}</p>}
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-emerald-300">{member.designationBn}</span>
                      {member.designationEn && (
                        <p className="text-[10px] text-slate-400">{member.designationEn}</p>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        member.roleType === 'PRESIDIUM'
                          ? 'bg-amber-950/70 text-amber-300 border-amber-800'
                          : member.roleType === 'SECRETARY'
                          ? 'bg-blue-950/70 text-blue-300 border-blue-800'
                          : 'bg-purple-950/70 text-purple-300 border-purple-800'
                      }`}>
                        {member.roleType === 'PRESIDIUM' ? 'সভাপতিমণ্ডলী' : member.roleType === 'SECRETARY' ? 'সম্পাদকীয়' : 'বিশেষায়িত'}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{member.phone}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-300 text-[11px]">
                        <p>{member.locationBn || 'কেন্দ্রীয় পরিচালনা পর্ষদ'}</p>
                        <p className="text-[10px] text-slate-500">{member.tenureBn || '২০২৪ – ২০২৭'}</p>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-col gap-1 text-[11px]">
                        {member.attachmentUrl ? (
                          <a
                            href={member.attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={member.attachmentName || 'committee-doc'}
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
                            title={member.attachmentName || 'সংযুক্ত নথি ডাউনলোড বা দেখুন'}
                          >
                            <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate max-w-[120px]">{member.attachmentName || 'অনুমোদিত নথি (PDF)'}</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-500">নথি যুক্ত নেই</span>
                        )}

                        {member.videoGreetingUrl && (
                          <button
                            type="button"
                            onClick={() => setMediaPreview({ 
                              type: 'VIDEO', 
                              url: member.videoGreetingUrl!, 
                              title: `${member.nameBn} - ভিডিও বার্তা` 
                            })}
                            className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
                          >
                            <VideoIcon className="w-3 h-3 text-rose-400 shrink-0" />
                            <span>ভিডিও বার্তা</span>
                          </button>
                        )}

                        {member.documentVaultId && (
                          <span className="inline-flex items-center gap-1 text-[9px] text-emerald-300 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800 w-fit">
                            <FolderArchive className="w-2.5 h-2.5" />
                            ভল্টে সংরক্ষিত
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5 text-center">
                      {member.isKeyLeader ? (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                          শীর্ষ নেতা
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-600">-</span>
                      )}
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                          title="সংশোধন করুন"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(member.id)}
                          className="p-1.5 bg-red-950/40 hover:bg-red-900/80 text-red-400 hover:text-red-200 rounded-lg border border-red-900/60 transition cursor-pointer"
                          title="অপসারণ করুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">আপনি কি নিশ্চিত?</h3>
              <p className="text-xs text-slate-400">
                এই কর্মকর্তাকে কমিটি তালিকা থেকে অপসারণ করলে তা অবিলম্বে কার্যকর হবে।
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition cursor-pointer"
              >
                মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Committee Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[94vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            <div className="p-3.5 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0 bg-slate-900">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 truncate">
                <UserCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="truncate">{editingMember ? 'কর্মকর্তার তথ্য সংশোধন' : 'নতুন কর্মকর্তা যুক্ত করুন'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="p-3.5 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      নাম (বাংলা) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nameBn}
                      onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                      placeholder="উদা: আলহাজ্ব মো: রফিকুল ইসলাম"
                      className="w-full bg-slate-950 text-xs text-white px-3 py-2 sm:py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      নাম (English)
                    </label>
                    <input
                      type="text"
                      value={formData.nameEn}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                      placeholder="e.g. Alhaj Md. Rafiqul Islam"
                      className="w-full bg-slate-950 text-xs text-white px-3 py-2 sm:py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      পদবী (বাংলা) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.designationBn}
                      onChange={(e) => setFormData({ ...formData, designationBn: e.target.value })}
                      placeholder="উদা: সভাপতি / সাধারণ সম্পাদক"
                      className="w-full bg-slate-950 text-xs text-white px-3 py-2 sm:py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      পদবী (English)
                    </label>
                    <input
                      type="text"
                      value={formData.designationEn}
                      onChange={(e) => setFormData({ ...formData, designationEn: e.target.value })}
                      placeholder="e.g. President / General Secretary"
                      className="w-full bg-slate-950 text-xs text-white px-3 py-2 sm:py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      মোবাইল নম্বর <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="০১৭১১-২৩৪৫৬৭"
                      className="w-full bg-slate-950 text-xs text-white px-3 py-2 sm:py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      কমিটি ক্যাটাগরি / ভূমিকা <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value as any })}
                      className="w-full bg-slate-950 text-xs text-white px-3 py-2 sm:py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="PRESIDIUM">সভাপতিমণ্ডলী (PRESIDIUM)</option>
                      <option value="SECRETARY">সম্পাদকীয় বিভাগ (SECRETARY)</option>
                      <option value="SPECIALIZED">বিশেষায়িত সেল (SPECIALIZED)</option>
                    </select>
                  </div>
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    কর্মএলাকা / উইং (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.locationBn}
                    onChange={(e) => setFormData({ ...formData, locationBn: e.target.value })}
                    placeholder="উদা: কেন্দ্রীয় পরিচালনা পর্ষদ, ঢাকা"
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    মেয়াদকাল (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.tenureBn}
                    onChange={(e) => setFormData({ ...formData, tenureBn: e.target.value })}
                    placeholder="২০২৪ – ২০২৭ মেয়াদ"
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Photo Section with direct Database & Vault upload */}
              <div className="space-y-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">
                    কর্মকর্তার অফিসিয়াল ছবি (Official Photo) <span className="text-rose-400">*</span>
                  </label>
                  <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setPhotoInputMode('UPLOAD')}
                      className={`px-2 py-0.5 rounded cursor-pointer font-bold ${
                        photoInputMode === 'UPLOAD'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      সরাসরি ফাইল আপলোড
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoInputMode('URL')}
                      className={`px-2 py-0.5 rounded cursor-pointer font-bold ${
                        photoInputMode === 'URL'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ওয়েব লিঙ্ক (URL)
                    </button>
                  </div>
                </div>

                {photoInputMode === 'UPLOAD' ? (
                  <FileUploadZone
                    label="সরাসরি ছবি আপলোড করুন"
                    subLabel="ফায়ারবেস ডাটাবেস ও স্টোরেজ ভল্টে সংরক্ষিত হবে"
                    category="COMMITTEE_PHOTO"
                    accept="image/*"
                    currentValue={formData.photo}
                    onFileSelect={async (file, dataUrl, storageOption) => {
                      try {
                        const res = await uploadFileRecord(file, {
                          category: 'COMMITTEE_PHOTO',
                          preferredStorage: storageOption,
                          memberName: formData.nameBn || 'কমিটি কর্মকর্তা',
                          description: `কেন্দ্রীয় কমিটির কর্মকর্তার ছবি: ${formData.nameBn || 'কর্মকর্তা'}`
                        });
                        if (res.success) {
                          setFormData(prev => ({ ...prev, photo: res.file.url }));
                        } else {
                          setFormData(prev => ({ ...prev, photo: dataUrl }));
                        }
                      } catch {
                        setFormData(prev => ({ ...prev, photo: dataUrl }));
                      }
                    }}
                    onFileClear={() => setFormData(prev => ({ ...prev, photo: '' }))}
                  />
                ) : (
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                    {formData.photo && (
                      <img 
                        src={formData.photo} 
                        alt="Preview" 
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0" 
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Official Document / Resolution / CV Upload (PDF, DOCS) */}
              <div className="space-y-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-200">
                      অফিসিয়াল ডকুমেন্টস ও অনুমোদনপত্র সংযুক্তি (PDF / Docs)
                    </label>
                    <p className="text-[10px] text-slate-400">
                      সিভি, গেজেট কপি, নিয়োগপত্র বা সাংগঠনিক আদেশনামা (সরাসরি সেন্ট্রাল ভল্টে যুক্ত হবে)
                    </p>
                  </div>
                  {formData.attachmentUrl && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      সংযুক্ত রয়েছে
                    </span>
                  )}
                </div>

                <FileUploadZone
                  label="ডকুমেন্ট ফাইল নির্বাচন করুন (PDF, Word, Excel)"
                  category="COMMITTEE_DOC"
                  accept="application/pdf,.doc,.docx,.xls,.xlsx,image/*"
                  currentValue={formData.attachmentUrl}
                  currentFileName={formData.attachmentName}
                  onFileSelect={async (file, dataUrl, storageOption) => {
                    try {
                      const res = await uploadFileRecord(file, {
                        category: 'COMMITTEE_DOC',
                        preferredStorage: storageOption,
                        memberName: formData.nameBn || 'কমিটি কর্মকর্তা',
                        description: `কমিটি কর্মকর্তার সংযুক্তি ফাইল: ${file.name}`
                      });
                      if (res.success) {
                        setFormData(prev => ({
                          ...prev,
                          attachmentUrl: res.file.url,
                          attachmentName: res.file.name,
                          attachmentType: res.file.type,
                          attachmentSize: res.file.size,
                          documentVaultId: res.file.id
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          attachmentUrl: dataUrl,
                          attachmentName: file.name,
                          attachmentType: file.type,
                          attachmentSize: file.size
                        }));
                      }
                    } catch {
                      setFormData(prev => ({
                        ...prev,
                        attachmentUrl: dataUrl,
                        attachmentName: file.name,
                        attachmentType: file.type,
                        attachmentSize: file.size
                      }));
                    }
                  }}
                  onFileClear={() => setFormData(prev => ({
                    ...prev,
                    attachmentUrl: '',
                    attachmentName: '',
                    attachmentType: '',
                    attachmentSize: 0,
                    documentVaultId: ''
                  }))}
                />
              </div>

              {/* Video Greeting / Speech Upload or Link */}
              <div className="space-y-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-200">
                    পরিচিতি ভিডিও বার্তা / প্রেস বক্তব্য (MP4 / WebM / Video Link)
                  </label>
                  <p className="text-[10px] text-slate-400">
                    কর্মকর্তার ভিডিও বক্তব্য সরাসরি আপলোড করুন অথবা ভিডিও ফাইল লিংক প্রদান করুন
                  </p>
                </div>

                <FileUploadZone
                  label="ভিডিও ফাইল আপলোড (MP4, WebM)"
                  category="VIDEO_MEDIA"
                  accept="video/*"
                  currentValue={formData.videoGreetingUrl}
                  onFileSelect={async (file, dataUrl, storageOption) => {
                    try {
                      const res = await uploadFileRecord(file, {
                        category: 'VIDEO_MEDIA',
                        preferredStorage: storageOption,
                        memberName: formData.nameBn || 'কমিটি কর্মকর্তা',
                        description: `কমিটি কর্মকর্তার ভিডিও বার্তা: ${file.name}`
                      });
                      if (res.success) {
                        setFormData(prev => ({ ...prev, videoGreetingUrl: res.file.url }));
                      } else {
                        setFormData(prev => ({ ...prev, videoGreetingUrl: dataUrl }));
                      }
                    } catch {
                      setFormData(prev => ({ ...prev, videoGreetingUrl: dataUrl }));
                    }
                  }}
                  onFileClear={() => setFormData(prev => ({ ...prev, videoGreetingUrl: '' }))}
                />

                <div className="pt-1">
                  <input
                    type="url"
                    value={formData.videoGreetingUrl}
                    onChange={(e) => setFormData({ ...formData, videoGreetingUrl: e.target.value })}
                    placeholder="অথবা সরাসরি ভিডিও URL দিন: https://example.com/video.mp4"
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isKeyLeader"
                  checked={formData.isKeyLeader}
                  onChange={(e) => setFormData({ ...formData, isKeyLeader: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="isKeyLeader" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  শীর্ষ নেতৃত্বের তালিকায় বিশেষ প্রাধান্য দিন (Key Leader Highlight)
                </label>
              </div>

              </div>

              {/* Pinned Responsive Modal Footer */}
              <div className="p-3 sm:p-4 border-t border-slate-800 shrink-0 bg-slate-900/95 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950 transition cursor-pointer"
                >
                  {editingMember ? 'সংরক্ষণ করুন' : 'কমিটিতে যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Preview Modal */}
      {mediaPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col p-3.5 sm:p-5 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 shrink-0">
              <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2 truncate pr-2">
                {mediaPreview.type === 'VIDEO' ? (
                  <VideoIcon className="w-4 h-4 text-rose-400 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span className="truncate">{mediaPreview.title}</span>
              </h3>
              <button
                onClick={() => setMediaPreview(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center my-3 flex-1 min-h-[180px] sm:min-h-[240px]">
              {mediaPreview.type === 'VIDEO' ? (
                <video
                  src={mediaPreview.url}
                  controls
                  autoPlay
                  className="w-full max-h-[55vh] rounded-lg"
                >
                  আপনার ব্রাউজার ভিডিও প্লেব্যাক সমর্থন করে না।
                </video>
              ) : mediaPreview.type === 'IMAGE' ? (
                <img
                  src={mediaPreview.url}
                  alt={mediaPreview.title}
                  className="max-h-[55vh] object-contain"
                />
              ) : (
                <div className="p-4 sm:p-8 text-center space-y-2 sm:space-y-3">
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 mx-auto" />
                  <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-xs sm:max-w-md mx-auto">{mediaPreview.title}</p>
                  <p className="text-[11px] text-slate-400">এই নথিটি সরাসরি দেখতে বা ডাউনলোড করতে পারেন</p>
                  <a
                    href={mediaPreview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>নথি ডাউনলোড / প্রিভিউ</span>
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800/80 shrink-0">
              <a
                href={mediaPreview.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ডাউনলোড</span>
              </a>
              <button
                onClick={() => setMediaPreview(null)}
                className="px-4 py-1.5 sm:py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
