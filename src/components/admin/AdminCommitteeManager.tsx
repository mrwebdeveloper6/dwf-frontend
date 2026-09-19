import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { CommitteeMember } from '../../types/dwf';
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
  AlertTriangle 
} from 'lucide-react';

export const AdminCommitteeManager: React.FC = () => {
  const { committeeMembers, addCommitteeMember, updateCommitteeMember, deleteCommitteeMember, language } = useDwf();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'PRESIDIUM' | 'SECRETARY' | 'SPECIALIZED'>('ALL');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    order: 1
  });

  const openAddModal = () => {
    setEditingMember(null);
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
      order: committeeMembers.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: CommitteeMember) => {
    setEditingMember(member);
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
      order: member.order || 1
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

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-950 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কর্মকর্তা যুক্ত করুন</span>
        </button>
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                {editingMember ? 'কর্মকর্তার তথ্য সংশোধন' : 'নতুন কর্মকর্তা যুক্ত করুন'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
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
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
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
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    কমিটি ক্যাটাগরি / ভূমিকা <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value as any })}
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
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

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  ছবি URL (Image URL)
                </label>
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
                <p className="text-[10px] text-slate-500 mt-1">
                  কর্মকর্তার অফিসিয়াল ছবির সরাসরি ওয়েব লিঙ্ক বা ড্রাইভ লিঙ্ক দিন।
                </p>
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

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950 transition cursor-pointer"
                >
                  {editingMember ? 'সংরক্ষণ করুন' : 'কমিটিতে যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
