'use client';

import React, { useState } from 'react';
import { Users, Search, ShoppingBag, DollarSign } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function AdminCustomersPage() {
  const orders = useAdminStore((state) => state.orders);
  const [search, setSearch] = useState('');

  // Extract distinct customers from orders and registered profiles
  const customerMap = new Map<
    string,
    {
      id: string;
      name: string;
      email: string;
      phone: string;
      orderCount: number;
      totalSpend: number;
      lastOrder: string;
      status: 'Active' | 'VIP';
    }
  >();

  orders.forEach((o) => {
    const existing = customerMap.get(o.customerEmail);
    if (existing) {
      existing.orderCount += 1;
      existing.totalSpend += o.total;
      if (new Date(o.createdAt) > new Date(existing.lastOrder)) {
        existing.lastOrder = o.createdAt;
      }
      if (existing.totalSpend > 2000) {
        existing.status = 'VIP';
      }
    } else {
      customerMap.set(o.customerEmail, {
        id: o.customerId,
        name: o.customerName,
        email: o.customerEmail,
        phone: o.customerPhone,
        orderCount: 1,
        totalSpend: o.total,
        lastOrder: o.createdAt,
        status: o.total > 2000 ? 'VIP' : 'Active',
      });
    }
  });

  const customerList = Array.from(customerMap.values()).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Customer Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View shopper activity, order histories, and lifetime spending values.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by customer name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Customer Name</th>
                <th className="px-6 py-3.5">Contact Email</th>
                <th className="px-6 py-3.5">Phone</th>
                <th className="px-6 py-3.5">Orders</th>
                <th className="px-6 py-3.5">Total Spent</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customerList.map((cust) => (
                <tr key={cust.email} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{cust.name}</td>
                  <td className="px-6 py-4 text-slate-600">{cust.email}</td>
                  <td className="px-6 py-4 text-slate-600">{cust.phone}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {cust.orderCount} orders
                  </td>
                  <td className="px-6 py-4 font-bold text-[#E83E68]">
                    ₹{cust.totalSpend.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        cust.status === 'VIP'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {cust.status} Member
                    </span>
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
