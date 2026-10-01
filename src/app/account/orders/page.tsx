'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ChevronRight, Truck, CheckCircle2 } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { formatDate, formatTime } from '@/lib/utils';

export default function OrdersListPage() {
  const { user } = useAuthStore();
  const allOrders = useAdminStore((state) => state.orders);

  const customerOrders = user
    ? allOrders.filter((o) => o.customerId === user.uid || o.customerEmail === user.email)
    : allOrders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-4">
        <Link href="/" className="hover:text-[#E83E68]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/account" className="hover:text-[#E83E68]">Account</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#54281F]">Orders</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-[#54281F]">
          Order History & Tracking
        </h1>
        <p className="text-xs sm:text-sm text-[#8C6A64] mt-1">
          Review your previous orders and check real-time dispatch progress.
        </p>
      </div>

      {customerOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#F6A6B8]/30 cute-shadow">
          <div className="w-16 h-16 rounded-full bg-[#FFF8F2] flex items-center justify-center text-3xl mx-auto mb-3">
            📦
          </div>
          <h3 className="font-heading font-bold text-lg text-[#54281F]">
            No Orders Yet
          </h3>
          <p className="text-xs text-[#8C6A64] mt-1 max-w-sm mx-auto">
            You haven’t experienced the thrill of unboxing a ScoopBerry parcel yet!
          </p>
          <Link
            href="/shop"
            className="inline-block mt-4 px-6 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-2xl shadow-sm hover:bg-[#d63059]"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {customerOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF8F2] flex items-center justify-center text-[#E83E68]">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-base text-[#54281F]">
                      {order.orderNumber}
                    </span>
                    <p className="text-xs text-[#8C6A64]" suppressHydrationWarning>
                      Placed on {formatDate(order.createdAt)} at{' '}
                      {formatTime(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                      order.orderStatus === 'delivered'
                        ? 'bg-green-100 text-[#4E8B3A]'
                        : order.orderStatus === 'shipped' || order.orderStatus === 'out_for_delivery'
                        ? 'bg-blue-100 text-blue-600'
                        : order.orderStatus === 'cancelled'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    {order.orderStatus.replace(/_/g, ' ')}
                  </span>
                  <span className="font-heading font-extrabold text-lg text-[#E83E68]">
                    ₹{order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#FFF8F2]/60 border border-[#F6A6B8]/20"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#54281F] truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-[#8C6A64]">
                        Qty: {item.quantity} • ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status and Action Row */}
              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#8C6A64]">
                  <Truck className="w-4 h-4 text-[#E83E68]" />
                  <span>
                    Estimated Delivery:{' '}
                    <b className="text-[#54281F]">
                      {order.estimatedDelivery || '3-5 business days'}
                    </b>
                  </span>
                  {order.trackingNumber && (
                    <span className="hidden sm:inline bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-mono">
                      {order.trackingNumber}
                    </span>
                  )}
                </div>

                <Link
                  href={`/account/orders/${order.id}`}
                  className="px-5 py-2 rounded-2xl bg-[#E83E68] text-white font-bold hover:bg-[#d63059] transition-all text-center"
                >
                  View Details & Live Timeline →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
