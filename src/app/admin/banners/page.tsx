'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { Banner } from '@/types';

export default function AdminBannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useAdminStore();
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600',
    buttonText: 'Shop Now',
    buttonUrl: '/shop',
    type: 'hero' as 'hero' | 'promo' | 'category' | 'seasonal',
    badge: 'Special Drop',
    isActive: true,
  });

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600',
      buttonText: 'Shop Now',
      buttonUrl: '/shop',
      type: 'hero',
      badge: 'Special Drop',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: Banner) => {
    setEditingBanner(b);
    setFormData({
      title: b.title,
      subtitle: b.subtitle || '',
      description: b.description,
      imageUrl: b.imageUrl,
      buttonText: b.buttonText,
      buttonUrl: b.buttonUrl,
      type: b.type,
      badge: b.badge || '',
      isActive: b.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      updateBanner(editingBanner.id, {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        imageUrl: formData.imageUrl,
        buttonText: formData.buttonText,
        buttonUrl: formData.buttonUrl,
        type: formData.type,
        badge: formData.badge,
        isActive: formData.isActive,
      });
    } else {
      addBanner({
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        imageUrl: formData.imageUrl,
        buttonText: formData.buttonText,
        buttonUrl: formData.buttonUrl,
        type: formData.type,
        badge: formData.badge,
        isActive: formData.isActive,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Banner & Campaign Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure homepage hero carousels, promotional announcements, and seasonal visual drops.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#d63059] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
                <span className="absolute top-2 left-2 bg-[#54281F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {banner.type}
                </span>
                {banner.badge && (
                  <span className="absolute top-2 right-2 bg-white/95 text-[#E83E68] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    {banner.badge}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-base text-slate-900">{banner.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {banner.description}
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Button:</span>
                <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                  {banner.buttonText} → {banner.buttonUrl}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span
                className={`font-bold px-2.5 py-0.5 rounded-full uppercase text-[10px] ${
                  banner.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {banner.isActive ? 'Active' : 'Inactive'}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEdit(banner)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingBanner ? 'Edit Banner' : 'Create New Banner'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Banner Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as typeof formData.type,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="hero">Homepage Hero</option>
                    <option value="promo">Promotional Box</option>
                    <option value="seasonal">Seasonal Drop</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Button URL</label>
                  <input
                    type="text"
                    value={formData.buttonUrl}
                    onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E83E68] text-white font-bold hover:bg-[#d63059]"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
