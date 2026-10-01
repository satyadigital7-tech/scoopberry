'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Plus, Edit2, Trash2, ShieldCheck, X } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { MysteryScoop } from '@/types';

export default function AdminMysteryScoopsPage() {
  const { mysteryScoops, addMysteryScoop, updateMysteryScoop, deleteMysteryScoop } = useAdminStore();
  const [editingScoop, setEditingScoop] = useState<MysteryScoop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 799,
    mrp: 1299,
    scoopTier: 'Standard' as 'Mini' | 'Standard' | 'Deluxe' | 'Mega',
    itemCount: '10 - 14 Items',
    guaranteedValue: '₹1,500+ Value Guaranteed',
    potentialTypes: 'Plush Keychain, Pastel Highlighters, Cute Stickers, Enamel Pin',
    stock: 20,
    badge: 'Popular Scoop',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAdd = () => {
    setEditingScoop(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: 799,
      mrp: 1299,
      scoopTier: 'Standard',
      itemCount: '10 - 14 Items',
      guaranteedValue: '₹1,500+ Value Guaranteed',
      potentialTypes: 'Plush Keychain, Pastel Highlighters, Cute Stickers, Enamel Pin',
      stock: 20,
      badge: 'Popular Scoop',
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: MysteryScoop) => {
    setEditingScoop(s);
    setFormData({
      name: s.name,
      slug: s.slug,
      description: s.description,
      price: s.price,
      mrp: s.mrp,
      scoopTier: s.scoopTier,
      itemCount: s.itemCount,
      guaranteedValue: s.guaranteedValue,
      potentialTypes: s.potentialTypes.join(', '),
      stock: s.stock,
      badge: s.badge,
      imageUrl: s.images[0] || '',
      status: s.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const potentials = formData.potentialTypes.split(',').map((t) => t.trim()).filter(Boolean);
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingScoop) {
      updateMysteryScoop(editingScoop.id, {
        name: formData.name,
        slug,
        description: formData.description,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        scoopTier: formData.scoopTier,
        itemCount: formData.itemCount,
        guaranteedValue: formData.guaranteedValue,
        potentialTypes: potentials,
        stock: Number(formData.stock),
        badge: formData.badge,
        images: [formData.imageUrl],
        status: formData.status,
      });
    } else {
      addMysteryScoop({
        name: formData.name,
        slug,
        description: formData.description,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        scoopTier: formData.scoopTier,
        itemCount: formData.itemCount,
        guaranteedValue: formData.guaranteedValue,
        potentialTypes: potentials,
        stock: Number(formData.stock),
        badge: formData.badge,
        images: [formData.imageUrl],
        rating: 5.0,
        reviewCount: 1,
        status: formData.status,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Mystery Scoop Management</span>
            <span className="text-xs bg-[#FFE5D9] text-[#E83E68] font-bold px-2 py-0.5 rounded-full">
              Core USP
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure surprise bins, guaranteed value rules, scoop tiers, and surprise hints.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#d63059] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Mystery Scoop Tier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mysteryScoops.map((scoop) => (
          <div
            key={scoop.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                <Image src={scoop.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'} alt={scoop.name} fill className="object-cover" />
                <span className="absolute top-2 right-2 bg-[#E83E68] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {scoop.badge}
                </span>
                <span className="absolute bottom-2 left-2 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {scoop.guaranteedValue}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                  {scoop.scoopTier} Scoop
                </span>
                <span className="font-semibold text-slate-500">{scoop.itemCount}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mt-1">{scoop.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {scoop.description}
              </p>

              {/* Potentials Preview */}
              <div className="mt-3 flex flex-wrap gap-1">
                {scoop.potentialTypes.slice(0, 3).map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-base text-slate-900">₹{scoop.price}</span>
                <span className="text-xs text-slate-400 line-through ml-1.5">₹{scoop.mrp}</span>
                <span className="block text-[10px] text-emerald-600 font-semibold">
                  {scoop.stock} in stock
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEdit(scoop)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteMysteryScoop(scoop.id)}
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
            className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingScoop ? 'Edit Mystery Scoop' : 'New Mystery Scoop Tier'}
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
                <label className="block font-bold text-slate-700 mb-1">Scoop Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scoop Tier *</label>
                  <select
                    value={formData.scoopTier}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scoopTier: e.target.value as typeof formData.scoopTier,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Mini">Mini (5-7 Items)</option>
                    <option value="Standard">Standard (10-14 Items)</option>
                    <option value="Deluxe">Deluxe (18-22 Items)</option>
                    <option value="Mega">Mega (25+ Items)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Items Range *</label>
                  <input
                    type="text"
                    required
                    value={formData.itemCount}
                    onChange={(e) => setFormData({ ...formData, itemCount: e.target.value })}
                    placeholder="e.g. 10 - 14 Items"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Guaranteed Value Claim</label>
                <input
                  type="text"
                  required
                  value={formData.guaranteedValue}
                  onChange={(e) => setFormData({ ...formData, guaranteedValue: e.target.value })}
                  placeholder="e.g. ₹1,500+ Value Guaranteed"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Possible Surprise Types (Comma separated)
                </label>
                <textarea
                  rows={2}
                  value={formData.potentialTypes}
                  onChange={(e) => setFormData({ ...formData, potentialTypes: e.target.value })}
                  placeholder="Plush Keychain, Pastel Highlighters, Stickers, Enamel Pins"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
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
                  Save Mystery Scoop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
