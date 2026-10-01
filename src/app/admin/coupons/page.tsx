'use client';

import React, { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { Coupon } from '@/types';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useAdminStore();
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 200,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    firstOrderOnly: false,
    isActive: true,
  });

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: 10,
      minOrderValue: 499,
      maxDiscount: 200,
      expiryDate: '2026-12-31',
      usageLimit: 500,
      firstOrderOnly: false,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Coupon) => {
    setEditingCoupon(c);
    setFormData({
      code: c.code,
      description: c.description,
      discountType: c.discountType,
      discountValue: c.discountValue,
      minOrderValue: c.minOrderValue,
      maxDiscount: c.maxDiscount || 0,
      expiryDate: c.expiryDate,
      usageLimit: c.usageLimit,
      firstOrderOnly: !!c.firstOrderOnly,
      isActive: c.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, {
        code: formData.code.toUpperCase(),
        description: formData.description,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minOrderValue: Number(formData.minOrderValue),
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
        expiryDate: formData.expiryDate,
        usageLimit: Number(formData.usageLimit),
        firstOrderOnly: formData.firstOrderOnly,
        isActive: formData.isActive,
      });
    } else {
      addCoupon({
        code: formData.code.toUpperCase(),
        description: formData.description,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minOrderValue: Number(formData.minOrderValue),
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
        expiryDate: formData.expiryDate,
        usageLimit: Number(formData.usageLimit),
        usageCount: 0,
        firstOrderOnly: formData.firstOrderOnly,
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
            Discount Coupons & Promos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure promotional percentage and flat discount vouchers with order minimums.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#d63059] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-extrabold text-sm text-[#E83E68] bg-[#FFE5D9] px-3 py-1 rounded-xl">
                  {coupon.code}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    coupon.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 mt-2">
                {coupon.discountType === 'percentage'
                  ? `${coupon.discountValue}% Discount`
                  : `Flat ₹${coupon.discountValue} Off`}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{coupon.description}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Min Order:</span>
                  <span className="font-semibold">₹{coupon.minOrderValue}</span>
                </div>
                {coupon.maxDiscount && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Discount:</span>
                    <span className="font-semibold">₹{coupon.maxDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Redeemed:</span>
                  <span className="font-semibold">
                    {coupon.usageCount} / {coupon.usageLimit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expires On:</span>
                  <span className="font-semibold">{coupon.expiryDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(coupon)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteCoupon(coupon.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
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
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
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
                <label className="block font-bold text-slate-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. WELCOME10"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 uppercase font-mono font-bold focus:outline-none focus:border-[#E83E68]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description *</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. 10% off on your first order"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountType: e.target.value as 'percentage' | 'fixed',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                    placeholder="Optional"
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
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
