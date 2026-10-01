'use client';

import React, { useState } from 'react';
import { Settings, Save, Check, RefreshCw } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetToSampleData } = useAdminStore();
  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const [formData, setFormData] = useState({
    storeName: settings.storeName,
    tagline: settings.tagline,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    whatsappNumber: settings.whatsappNumber,
    instagramUrl: settings.instagramUrl,
    facebookUrl: settings.facebookUrl,
    freeShippingThreshold: settings.freeShippingThreshold,
    defaultShippingFee: settings.defaultShippingFee,
    announcementBarText: settings.announcementBarText,
    showAnnouncementBar: settings.showAnnouncementBar,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...formData,
      freeShippingThreshold: Number(formData.freeShippingThreshold),
      defaultShippingFee: Number(formData.defaultShippingFee),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetData = () => {
    resetToSampleData();
    setResetConfirm(true);
    setTimeout(() => setResetConfirm(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Store & Integration Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure WhatsApp chat number, shipping fees, Instagram profile, and promotional announcements.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6 text-xs">
        {/* Brand identity */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
            Brand & Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Store Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Brand Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Social Media (PRD Section 19 & 34) */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
            Customer Contact & Floating WhatsApp (PRD #34)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                WhatsApp Chat Number *
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="+919876543210"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
              <span className="text-[10px] text-slate-400">Controls bottom-right chat button</span>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Support Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Support Phone</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Instagram URL (PRD #19)</label>
              <input
                type="text"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="text"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Charges */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
            Shipping Rules & Thresholds
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Free Delivery Threshold (₹)
              </label>
              <input
                type="number"
                value={formData.freeShippingThreshold}
                onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
              <span className="text-[10px] text-slate-400">Cart subtotal at which delivery is free</span>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={formData.defaultShippingFee}
                onChange={(e) => setFormData({ ...formData, defaultShippingFee: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
            Top Announcement Bar
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Announcement Text</label>
              <input
                type="text"
                value={formData.announcementBarText}
                onChange={(e) => setFormData({ ...formData, announcementBarText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showAnnouncementBar}
                onChange={(e) => setFormData({ ...formData, showAnnouncementBar: e.target.checked })}
                className="rounded text-[#E83E68] focus:ring-[#E83E68]"
              />
              <span className="font-bold text-slate-700">Display Announcement Bar at top of site</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#E83E68] text-white font-bold hover:bg-[#d63059] shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
          {saved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </span>
          )}
        </div>
      </form>

      {/* Database Reset Option */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Reset Demo Database</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Reset all products, orders, categories, and settings back to original pristine sample data.
          </p>
        </div>
        <button
          onClick={handleResetData}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Sample Data</span>
        </button>
      </div>
      {resetConfirm && (
        <p className="text-xs font-bold text-emerald-600 text-center">
          ✓ Sample database restored successfully!
        </p>
      )}
    </div>
  );
}
