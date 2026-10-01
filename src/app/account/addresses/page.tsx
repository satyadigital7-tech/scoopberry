'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Address } from '@/types';

export default function AddressesPage() {
  const { user, addAddress, deleteAddress } = useAuthStore();
  const [isAdding, setIsAdding] = useState(false);

  const [newAddr, setNewAddr] = useState({
    name: user?.displayName || '',
    phone: '',
    email: user?.email || '',
    houseFlat: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Home' as 'Home' | 'Work' | 'Other',
    isDefault: true,
  });

  const addresses = user?.savedAddresses || [
    {
      id: 'addr-default-1',
      name: user?.displayName || 'Ananya Sharma',
      phone: '+91 98765 43210',
      email: user?.email || 'ananya@example.com',
      houseFlat: 'Apt 302, Lavender Court',
      street: '100ft Road, Indiranagar',
      area: 'Near Metro',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      type: 'Home' as const,
      isDefault: true,
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.houseFlat || !newAddr.city || !newAddr.pincode) return;

    addAddress(newAddr);
    setIsAdding(false);
    setNewAddr({
      name: user?.displayName || '',
      phone: '',
      email: user?.email || '',
      houseFlat: '',
      street: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      type: 'Home',
      isDefault: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-4">
        <Link href="/" className="hover:text-[#E83E68]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/account" className="hover:text-[#E83E68]">Account</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#54281F]">Saved Addresses</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl text-[#54281F]">
            Saved Delivery Addresses
          </h1>
          <p className="text-xs sm:text-sm text-[#8C6A64] mt-1">
            Manage your shipping destinations for 1-click checkout.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-2xl bg-[#E83E68] text-white text-xs font-bold shadow-md hover:bg-[#d63059] flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Add Address Form Modal / Inline */}
      {isAdding && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#F6A6B8]/50 cute-shadow mb-8 space-y-4 max-w-2xl"
        >
          <h3 className="font-heading font-bold text-lg text-[#54281F]">
            Add New Delivery Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={newAddr.name}
                onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#54281F] mb-1">
              House / Flat / Building *
            </label>
            <input
              type="text"
              required
              value={newAddr.houseFlat}
              onChange={(e) => setNewAddr({ ...newAddr, houseFlat: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                Street / Road *
              </label>
              <input
                type="text"
                required
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                Area / Landmark
              </label>
              <input
                type="text"
                value={newAddr.area}
                onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={newAddr.state}
                onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                Pincode *
              </label>
              <input
                type="text"
                required
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#E83E68] text-white text-xs font-bold shadow-md hover:bg-[#d63059]"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-[#54281F] text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-bold text-[#E83E68] bg-[#FFE5D9] px-2.5 py-0.5 rounded-full">
                  {addr.type}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] font-bold text-[#4E8B3A] bg-green-50 px-2 py-0.5 rounded-full">
                    Default Address
                  </span>
                )}
              </div>

              <h3 className="font-heading font-bold text-base text-[#54281F]">
                {addr.name}
              </h3>
              <p className="text-xs text-[#8C6A64] mt-0.5">{addr.phone}</p>
              <p className="text-xs text-[#54281F] mt-2 leading-relaxed">
                {addr.houseFlat}, {addr.street}
                {addr.area && `, ${addr.area}`}
                <br />
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => deleteAddress(addr.id)}
                className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
