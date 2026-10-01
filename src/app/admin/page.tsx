'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  AlertTriangle,
  Users,
  Package,
  Boxes,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function AdminDashboardPage() {
  const orders = useAdminStore((state) => state.orders);
  const products = useAdminStore((state) => state.products);

  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'placed' || o.orderStatus === 'confirmed').length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const stats = [
    {
      title: 'Total Sales Revenue',
      value: `₹${totalSales.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      change: '+18.4% from last month',
      icon: DollarSign,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      change: '+12 this week',
      icon: ShoppingBag,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      title: 'Pending Fulfillment',
      value: pendingOrders,
      change: 'Requires dispatch',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockProducts.length,
      change: 'Below 5 units threshold',
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time performance metrics and operations control for ScoopBerry.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-[#E83E68] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#d63059] flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-slate-800 flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Process Orders</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{stat.title}</span>
                <div className={`p-2 rounded-xl ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                <p className="text-[11px] font-medium text-slate-500 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span>{stat.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Sales Trend Chart & Low Stock Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Revenue Breakdown / Analytics Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Weekly Revenue Flow</h2>
              <p className="text-xs text-slate-500">Sales performance across the current week</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              +24% Growth
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between h-48 pt-6 px-2 gap-3">
            {[
              { day: 'Mon', amount: 14200, height: '45%' },
              { day: 'Tue', amount: 19800, height: '60%' },
              { day: 'Wed', amount: 16500, height: '52%' },
              { day: 'Thu', amount: 24500, height: '78%' },
              { day: 'Fri', amount: 31200, height: '95%' },
              { day: 'Sat', amount: 34800, height: '100%' },
              { day: 'Sun', amount: 28900, height: '88%' },
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{(bar.amount / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full bg-[#F6A6B8] group-hover:bg-[#E83E68] rounded-t-xl transition-all duration-300"
                  style={{ height: bar.height }}
                />
                <span className="text-xs font-semibold text-slate-500">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts Box */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Low Stock Warnings</span>
              </h2>
              <Link
                href="/admin/inventory"
                className="text-xs text-[#E83E68] font-bold hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {lowStockProducts.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  All items are well stocked!
                </p>
              ) : (
                lowStockProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.category}</p>
                    </div>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md flex-shrink-0">
                      {p.stock} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            href="/admin/inventory"
            className="mt-6 w-full py-2.5 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors block"
          >
            Adjust Inventory Levels →
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Customer Orders</h2>
            <p className="text-xs text-slate-500">Live feed of orders received across India</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#E83E68] hover:underline"
          >
            See All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Items</th>
                <th className="px-6 py-3.5">Total</th>
                <th className="px-6 py-3.5">Payment</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{order.customerName}</p>
                    <p className="text-[11px] text-slate-400">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        order.orderStatus === 'delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.orderStatus === 'shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {order.orderStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders`}
                      className="text-xs font-bold text-[#E83E68] hover:underline"
                    >
                      Manage
                    </Link>
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
