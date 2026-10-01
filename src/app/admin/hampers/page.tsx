'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Gift, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { GiftHamper } from '@/types';

export default function AdminHampersPage() {
  const { hampers, addHamper, updateHamper, deleteHamper } = useAdminStore();
  const [editingHamper, setEditingHamper] = useState<GiftHamper | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 999,
    mrp: 1499,
    discount: 33,
    stock: 15,
    occasion: 'Birthday, Celebration',
    itemsText: 'Cute Bear Mug (1x)\nPlush Keychain (1x)\nChocolate Truffle (1x)\nGreeting Card (1x)',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    isFeatured: true,
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAdd = () => {
    setEditingHamper(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: 999,
      mrp: 1499,
      discount: 33,
      stock: 15,
      occasion: 'Birthday, Celebration',
      itemsText: 'Cute Bear Mug (1x)\nPlush Keychain (1x)\nChocolate Truffle (1x)\nGreeting Card (1x)',
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
      isFeatured: true,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (h: GiftHamper) => {
    setEditingHamper(h);
    const textItems = h.itemsIncluded
      .map((i) => `${i.name} (${i.quantity}x)${i.detail ? ` - ${i.detail}` : ''}`)
      .join('\n');

    setFormData({
      name: h.name,
      slug: h.slug,
      description: h.description,
      price: h.price,
      mrp: h.mrp,
      discount: h.discount,
      stock: h.stock,
      occasion: h.occasion.join(', '),
      itemsText: textItems,
      imageUrl: h.images[0] || '',
      isFeatured: !!h.isFeatured,
      status: h.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const occasions = formData.occasion.split(',').map((o) => o.trim()).filter(Boolean);
    const parsedItems = formData.itemsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({
        name: line.replace(/\(.*?\)/g, '').trim(),
        quantity: 1,
        detail: line.includes('-') ? line.split('-')[1].trim() : undefined,
      }));

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingHamper) {
      updateHamper(editingHamper.id, {
        name: formData.name,
        slug,
        description: formData.description,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        discount: Number(formData.discount),
        stock: Number(formData.stock),
        occasion: occasions,
        itemsIncluded: parsedItems,
        images: [formData.imageUrl],
        isFeatured: formData.isFeatured,
        status: formData.status,
      });
    } else {
      addHamper({
        name: formData.name,
        slug,
        description: formData.description,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        discount: Number(formData.discount),
        stock: Number(formData.stock),
        occasion: occasions,
        itemsIncluded: parsedItems,
        images: [formData.imageUrl],
        rating: 5.0,
        reviewCount: 1,
        isFeatured: formData.isFeatured,
        status: formData.status,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Gift Hamper Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Assemble multi-product gift hampers, bundle items, and occasion associations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#d63059] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Gift Hamper</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hampers.map((hamper) => (
          <div
            key={hamper.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                <Image src={hamper.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'} alt={hamper.name} fill className="object-cover" />
                <div className="absolute top-2 left-2 flex gap-1">
                  {hamper.occasion.map((occ, i) => (
                    <span
                      key={i}
                      className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="font-bold text-base text-slate-900">{hamper.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {hamper.description}
              </p>

              {/* Bundled items list */}
              <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[11px] font-bold text-slate-700 mb-1">
                  Bundled Products ({hamper.itemsIncluded.length}):
                </p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {hamper.itemsIncluded.map((it, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-[#E83E68]">•</span>
                      <span>{it.name}</span>
                      {it.detail && <span className="text-slate-400">({it.detail})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-base text-slate-900">₹{hamper.price}</span>
                <span className="text-xs text-slate-400 line-through ml-1.5">₹{hamper.mrp}</span>
                <span className="block text-[10px] text-emerald-600 font-semibold">
                  {hamper.stock} in stock
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEdit(hamper)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteHamper(hamper.id)}
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
                {editingHamper ? 'Edit Gift Hamper' : 'Create Gift Hamper'}
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
                <label className="block font-bold text-slate-700 mb-1">Hamper Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
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
                <label className="block font-bold text-slate-700 mb-1">Occasions (Comma separated)</label>
                <input
                  type="text"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  placeholder="e.g. Birthday, Anniversary, Friendship"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Bundled Products List (One per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.itemsText}
                  onChange={(e) => setFormData({ ...formData, itemsText: e.target.value })}
                  placeholder="Cute Ceramic Mug&#10;Plush Keychain&#10;Handmade Scented Candle"
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
                  Save Hamper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
