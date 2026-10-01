'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Award,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function AdminAnalyticsPage() {
  const orders = useAdminStore((state) => state.orders);
  const products = useAdminStore((state) => state.products);

  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const avgOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Ecommerce Analytics & Insights
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Sales conversions, top-selling categories, and average basket metrics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Gross Sales Value</p>
          <p className="font-heading font-extrabold text-3xl text-slate-900 mt-2">
            ₹{totalSales.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">
            +22.5% vs previous period
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Average Basket Value (AOV)</p>
          <p className="font-heading font-extrabold text-3xl text-[#E83E68] mt-2">
            ₹{avgOrderValue.toFixed(0)}
          </p>
          <span className="text-[11px] font-bold text-slate-400 mt-1 inline-block">
            Boosted by Deluxe Mystery Scoops
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Checkout Conversion Rate</p>
          <p className="font-heading font-extrabold text-3xl text-indigo-600 mt-2">
            4.82%
          </p>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">
            Top 10% in D2C gifting benchmarks
          </span>
        </div>
      </div>

      {/* Category breakdown & Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Contribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Sales by Category
          </h2>

          <div className="space-y-4">
            {[
              { name: 'Mystery Scoops (Core USP)', share: 55, color: 'bg-[#E83E68]' },
              { name: 'Gift Hampers', share: 25, color: 'bg-indigo-600' },
              { name: 'Cute Finds (Mugs, Lights, Plush)', share: 15, color: 'bg-amber-500' },
              { name: 'Stationery & Journals', share: 5, color: 'bg-emerald-500' },
            ].map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{cat.name}</span>
                  <span>{cat.share}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${cat.color} h-full rounded-full transition-all`}
                    style={{ width: `${cat.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Scoops */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Top Selling Surprises
          </h2>

          <div className="space-y-3">
            {products.slice(0, 4).map((p, idx) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-xs w-5 text-slate-400">
                    #{idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</p>
                    <p className="text-[11px] text-slate-400">₹{p.price} • {p.category}</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#E83E68] bg-rose-50 px-2 py-0.5 rounded-md">
                  ★ {p.rating}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
