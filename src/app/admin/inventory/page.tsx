'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Boxes, Plus, Minus, Search, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function AdminInventoryPage() {
  const { products, updateStock } = useAdminStore();
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');

  const inStockCount = products.filter((p) => p.stock > 5).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    if (stockFilter === 'low') return matchesSearch && p.stock > 0 && p.stock <= 5;
    if (stockFilter === 'out') return matchesSearch && p.stock === 0;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inventory & Warehouse Levels
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time inventory counts and perform fast batch stock adjustments.
          </p>
        </div>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setStockFilter('all')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            stockFilter === 'all'
              ? 'bg-white border-[#E83E68] ring-2 ring-[#E83E68]/20 shadow-xs'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Healthy Stock (&gt;5)</span>
          </div>
          <span className="font-heading font-extrabold text-2xl text-slate-900">
            {inStockCount} items
          </span>
        </button>

        <button
          onClick={() => setStockFilter('low')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            stockFilter === 'low'
              ? 'bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Low Stock (≤5)</span>
          </div>
          <span className="font-heading font-extrabold text-2xl text-slate-900">
            {lowStockCount} items
          </span>
        </button>

        <button
          onClick={() => setStockFilter('out')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            stockFilter === 'out'
              ? 'bg-white border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-rose-600 mb-1">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Out of Stock (0)</span>
          </div>
          <span className="font-heading font-extrabold text-2xl text-slate-900">
            {outOfStockCount} items
          </span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by SKU or item name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">SKU / Category</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-center">Available Units</th>
                <th className="px-6 py-3.5 text-right">Quick Stock Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image src={prod.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'} alt={prod.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-slate-900 truncate max-w-xs">{prod.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{prod.sku}</p>
                    <p className="text-[11px] text-slate-400">{prod.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        prod.stock === 0
                          ? 'bg-rose-100 text-rose-700'
                          : prod.stock <= 5
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {prod.stock === 0
                        ? 'Out of Stock'
                        : prod.stock <= 5
                        ? 'Low Stock'
                        : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-extrabold text-base text-slate-900 font-heading">
                      {prod.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => updateStock(prod.id, prod.stock - 1)}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors"
                        title="Reduce 1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateStock(prod.id, prod.stock + 5)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                        title="Add 5 units"
                      >
                        +5
                      </button>
                      <button
                        onClick={() => updateStock(prod.id, prod.stock + 10)}
                        className="px-2.5 py-1 rounded-lg bg-[#E83E68]/10 hover:bg-[#E83E68]/20 text-[#E83E68] text-xs font-bold transition-colors"
                        title="Add 10 units"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
