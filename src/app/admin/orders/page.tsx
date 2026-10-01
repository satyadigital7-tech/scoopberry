'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle,
  Truck,
  RotateCcw,
  Ban,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { Order, OrderStatus } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, cancelOrder, refundOrder } = useAdminStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses: { value: OrderStatus; label: string }[] = [
    { value: 'placed', label: 'Order Placed' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'packed', label: 'Packed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Order Fulfillment
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Process incoming orders, update shipping stages, and manage refunds.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Orders ({orders.length})</option>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label} ({orders.filter((o) => o.orderStatus === s.value).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5">Customer & Address</th>
                <th className="px-6 py-3.5">Items</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Payment</th>
                <th className="px-6 py-3.5">Current Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{order.orderNumber}</p>
                    <p className="text-[11px] text-slate-400" suppressHydrationWarning>
                      {formatDate(order.createdAt)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{order.customerName}</p>
                    <p className="text-[11px] text-slate-500">{order.customerPhone}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-xs">
                      {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                      {order.shippingAddress.pincode}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </span>
                    <p className="text-[10px] text-slate-400 truncate max-w-xs">
                      {order.items.map((i) => i.name).join(', ')}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : order.paymentStatus === 'refunded'
                          ? 'bg-purple-50 text-purple-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="px-2.5 py-1 text-xs rounded-xl font-bold bg-slate-50 border border-slate-200 focus:outline-none cursor-pointer"
                    >
                      {statuses.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/account/orders/${order.id}`}
                        target="_blank"
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg"
                      >
                        Receipt
                      </Link>
                      {order.paymentStatus === 'paid' && (
                        <button
                          onClick={() => refundOrder(order.id)}
                          className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold rounded-lg"
                          title="Mark Refunded"
                        >
                          Refund
                        </button>
                      )}
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
