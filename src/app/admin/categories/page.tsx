'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FolderTree, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdminStore();
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    badge: 'Popular 🌸',
    productCount: 4,
    isEnabled: true,
  });

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
      badge: 'Popular 🌸',
      productCount: 0,
      isEnabled: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCat(c);
    setFormData({
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      badge: c.badge || '',
      productCount: c.productCount,
      isEnabled: c.isEnabled,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingCat) {
      updateCategory(editingCat.id, {
        name: formData.name,
        slug,
        description: formData.description,
        image: formData.image,
        badge: formData.badge,
        isEnabled: formData.isEnabled,
      });
    } else {
      addCategory({
        name: formData.name,
        slug,
        description: formData.description,
        image: formData.image,
        badge: formData.badge,
        productCount: 0,
        isEnabled: formData.isEnabled,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Category Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize products into customer-facing storefront categories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#d63059] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                <Image src={c.image} alt={c.name} fill className="object-cover" />
                {c.badge && (
                  <span className="absolute top-2 left-2 bg-white/95 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    {c.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">{c.name}</h3>
                <span className="text-[10px] font-semibold text-slate-400">/{c.slug}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span
                className={`font-bold px-2 py-0.5 rounded-md ${
                  c.isEnabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {c.isEnabled ? 'Active' : 'Disabled'}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCategory(c.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-600"
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
                {editingCat ? 'Edit Category' : 'New Category'}
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
                <label className="block font-bold text-slate-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. Popular 🌸"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
