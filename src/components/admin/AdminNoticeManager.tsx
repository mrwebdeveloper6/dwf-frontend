import React, { useState } from 'react';
import { useDwf } from '../../context/DwfContext';
import { NoticeItem } from '../../types/dwf';
import { 
  Bell, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Calendar, 
  Tag, 
  AlertTriangle, 
  AlertCircle, 
  FileText,
  Eye,
  Sparkles
} from 'lucide-react';

export const AdminNoticeManager: React.FC = () => {
  const { notices, addNotice, updateNotice, deleteNotice, language } = useDwf();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);
  const [previewNotice, setPreviewNotice] = useState<NoticeItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    titleBn: '',
    title: '',
    category: 'NOTICE' as NoticeItem['category'],
    date: new Date().toISOString().substring(0, 10),
    isUrgent: false,
    excerptBn: '',
    excerpt: '',
    contentBn: '',
    content: '',
    image: ''
  });

  const categories = [
    { id: 'ALL', labelBn: 'সকল ক্যাটাগরি' },
    { id: 'NOTICE', labelBn: 'জরুরি সার্কুলার' },
    { id: 'MEDICAL', labelBn: 'স্বাস্থ্য ও চিকিৎসা' },
    { id: 'TRAINING', labelBn: 'ড্রাইভিং প্রশিক্ষণ' },
    { id: 'WELFARE', labelBn: 'কল্যাণ তহবিল' }
  ];

  const openAddModal = () => {
    setEditingNotice(null);
    setFormData({
      titleBn: '',
      title: '',
      category: 'NOTICE',
      date: new Date().toISOString().substring(0, 10),
      isUrgent: false,
      excerptBn: '',
      excerpt: '',
      contentBn: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (notice: NoticeItem) => {
    setEditingNotice(notice);
    setFormData({
      titleBn: notice.titleBn || '',
      title: notice.title || '',
      category: notice.category || 'NOTICE',
      date: notice.date || new Date().toISOString().substring(0, 10),
      isUrgent: !!notice.isUrgent,
      excerptBn: notice.excerptBn || '',
      excerpt: notice.excerpt || '',
      contentBn: notice.contentBn || '',
      content: notice.content || '',
      image: notice.image || ''
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleBn.trim() || !formData.excerptBn.trim()) {
      alert('অনুগ্রহ করে বিজ্ঞপ্তির শিরোনাম (বাংলা) এবং সংক্ষিপ্ত বিবরণ প্রদান করুন।');
      return;
    }

    if (editingNotice) {
      updateNotice(editingNotice.id, formData);
      setSuccessMessage(`বিজ্ঞপ্তি "${formData.titleBn}" সফলভাবে আপডেট করা হয়েছে`);
    } else {
      addNotice(formData);
      setSuccessMessage(`নতুন বিজ্ঞপ্তি "${formData.titleBn}" সফলভাবে প্রকাশিত হয়েছে`);
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleDelete = (id: string) => {
    deleteNotice(id);
    setDeleteConfirmId(null);
    setSuccessMessage('বিজ্ঞপ্তিটি সফলভাবে অপসারণ করা হয়েছে');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const filteredNotices = notices.filter((item) => {
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      (item.titleBn && item.titleBn.toLowerCase().includes(q)) ||
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.excerptBn && item.excerptBn.toLowerCase().includes(q)) ||
      (item.contentBn && item.contentBn.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-400" />
              সাংগঠনিক সংবাদ ও বিজ্ঞপ্তি ব্যবস্থাপনা
            </h2>
            <span className="bg-emerald-950 text-emerald-300 text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-800">
              মোট: {notices.length} টি
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            জরুরি সার্কুলার, স্বাস্থ্য ক্যাম্পেইন, ড্রাইভিং ট্রেনিং ও কল্যাণ নোটিশ তৈরি, সংশোধন ও প্রকাশ করুন।
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-950 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন বিজ্ঞপ্তি প্রকাশ করুন</span>
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
            placeholder="বিজ্ঞপ্তির শিরোনাম বা বিবরণ দিয়ে অনুসন্ধান করুন..."
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
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-emerald-800 text-white font-bold border border-emerald-600'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-900 border border-slate-800'
              }`}
            >
              {tab.labelBn}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {filteredNotices.length === 0 ? (
          <div className="py-12 bg-slate-950 rounded-2xl border border-slate-800 text-center text-slate-400">
            <Bell className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">কোন বিজ্ঞপ্তি খুঁজে পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500 mt-1">ক্যাটাগরি ফিল্টার পরিবর্তন করুন অথবা নতুন নোটিশ যোগ করুন</p>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div 
              key={notice.id} 
              className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {notice.image ? (
                  <img 
                    src={notice.image} 
                    alt={notice.titleBn} 
                    className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0 bg-slate-900"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                )}

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      notice.category === 'NOTICE'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : notice.category === 'MEDICAL'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : notice.category === 'TRAINING'
                        ? 'bg-blue-950 text-blue-300 border-blue-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {notice.category === 'NOTICE' ? 'জরুরি নোটিশ' : notice.category === 'MEDICAL' ? 'চিকিৎসা সহায়তা' : notice.category === 'TRAINING' ? 'প্রশিক্ষণ' : 'কল্যাণ তহবিল'}
                    </span>

                    {notice.isUrgent && (
                      <span className="flex items-center gap-1 bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/40">
                        <AlertCircle className="w-2.5 h-2.5" />
                        জরুরি
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-600" />
                      {notice.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm hover:text-emerald-300 transition">
                    {notice.titleBn}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {notice.excerptBn}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => setPreviewNotice(notice)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 text-xs font-semibold transition cursor-pointer"
                  title="প্রিভিউ দেখুন"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>প্রিভিউ</span>
                </button>

                <button
                  onClick={() => openEditModal(notice)}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                  title="সংশোধন করুন"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(notice.id)}
                  className="p-1.5 bg-red-950/40 hover:bg-red-900/80 text-red-400 hover:text-red-200 rounded-lg border border-red-900/60 transition cursor-pointer"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notice Preview Modal */}
      {previewNotice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                পাবলিক পোর্টাল প্রিভিউ
              </span>
              <button
                onClick={() => setPreviewNotice(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewNotice.image && (
              <img 
                src={previewNotice.image} 
                alt={previewNotice.titleBn} 
                className="w-full h-48 object-cover rounded-2xl border border-slate-800" 
              />
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 text-[10px] font-bold">
                  {previewNotice.category}
                </span>
                <span>তারিখ: {previewNotice.date}</span>
                {previewNotice.isUrgent && (
                  <span className="text-rose-400 font-bold">● জরুরি নোটিশ</span>
                )}
              </div>

              <h2 className="text-lg font-bold text-white leading-snug">
                {previewNotice.titleBn}
              </h2>
              {previewNotice.title && (
                <p className="text-xs text-slate-400">{previewNotice.title}</p>
              )}

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium">
                {previewNotice.excerptBn}
              </div>

              {previewNotice.contentBn && (
                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line pt-2">
                  {previewNotice.contentBn}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPreviewNotice(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">বিজ্ঞপ্তি মুছে ফেলতে চান?</h3>
              <p className="text-xs text-slate-400">
                এই বিজ্ঞপ্তিটি স্থায়ীভাবে ওয়েবসাইট ও নোটিশ বোর্ড থেকে মুছে ফেলা হবে।
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

      {/* Add / Edit Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-400" />
                {editingNotice ? 'বিজ্ঞপ্তি সংশোধন করুন' : 'নতুন বিজ্ঞপ্তি প্রকাশ করুন'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  বিজ্ঞপ্তির শিরোনাম (বাংলা) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.titleBn}
                  onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                  placeholder="উদা: ঢাকা-চট্টগ্রাম মহাসড়কে চালকদের বিনামূল্যে চিকিৎসা ক্যাম্প"
                  className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  শিরোনাম (English)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Free Medical Camp for Highway Drivers"
                  className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    ক্যাটাগরি <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="NOTICE">জরুরি নোটিশ (NOTICE)</option>
                    <option value="MEDICAL">স্বাস্থ্য ও চিকিৎসা (MEDICAL)</option>
                    <option value="TRAINING">ড্রাইভিং প্রশিক্ষণ (TRAINING)</option>
                    <option value="WELFARE">কল্যাণ তহবিল (WELFARE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    তারিখ <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="২০২৪-০৩-১৫"
                    className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  সংক্ষিপ্ত বিবরণ (Excerpt - বাংলা) <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerptBn}
                  onChange={(e) => setFormData({ ...formData, excerptBn: e.target.value })}
                  placeholder="হোমপেজ ও কার্ডে প্রদর্শনের সংক্ষিপ্ত সারমর্ম লিখুন..."
                  className="w-full bg-slate-950 text-xs text-white px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  বিস্তারিত বিষয়বস্তু (Full Content - বাংলা)
                </label>
                <textarea
                  rows={4}
                  value={formData.contentBn}
                  onChange={(e) => setFormData({ ...formData, contentBn: e.target.value })}
                  placeholder="সম্পূর্ণ নোটিশ বা বিজ্ঞপ্তির বিস্তারিত বিবরণ লিখুন..."
                  className="w-full bg-slate-950 text-xs text-white px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  ব্যানার ছবি URL (Banner Image)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isUrgent"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-rose-600 focus:ring-rose-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="isUrgent" className="text-xs font-semibold text-rose-300 cursor-pointer flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  জরুরি নোটিশ হিসেবে চিহ্নিত করুন (Mark as Urgent Notice)
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
                  {editingNotice ? 'সংরক্ষণ করুন' : 'প্রকাশ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
