'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Package,
  Printer,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { OrderStatus } from '@/types';
import { formatDate } from '@/lib/utils';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const orders = useAdminStore((state) => state.orders);

  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-heading font-bold text-2xl text-[#54281F]">
          Order Not Found
        </h2>
        <p className="text-xs text-[#8C6A64] mt-2">
          We could not locate this order in our system.
        </p>
        <Link
          href="/account/orders"
          className="inline-block mt-4 px-6 py-2.5 rounded-2xl bg-[#E83E68] text-white text-xs font-bold"
        >
          View All Orders
        </Link>
      </div>
    );
  }

  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'placed', label: 'Order Placed', desc: 'Received online' },
    { key: 'confirmed', label: 'Confirmed', desc: 'Payment verified' },
    { key: 'packed', label: 'Packed', desc: 'With strawberry tissue' },
    { key: 'shipped', label: 'Shipped', desc: 'Handed to courier' },
    { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'With local courier' },
    { key: 'delivered', label: 'Delivered', desc: 'Joy unpacked!' },
  ];

  const statusOrder: OrderStatus[] = [
    'placed',
    'confirmed',
    'packed',
    'shipped',
    'out_for_delivery',
    'delivered',
  ];

  const currentStatusIndex = statusOrder.indexOf(order.orderStatus);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:max-w-none">
      {/* Breadcrumb (hide in print) */}
      <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-4 print:hidden">
        <Link href="/" className="hover:text-[#E83E68]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/account" className="hover:text-[#E83E68]">Account</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/account/orders" className="hover:text-[#E83E68]">Orders</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#54281F]">{order.orderNumber}</span>
      </nav>

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F6A6B8]/30 cute-shadow mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3 py-0.5 rounded-full">
              Order Receipt
            </span>
            <span className="text-xs text-gray-400" suppressHydrationWarning>
              Placed on {formatDate(order.createdAt)}
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#54281F]">
            Order #{order.orderNumber}
          </h1>
          <p className="text-xs text-[#8C6A64] mt-1">
            Payment Status:{' '}
            <span className="font-bold text-[#4E8B3A] uppercase">
              {order.paymentStatus} via Razorpay
            </span>
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="print:hidden px-4 py-2 rounded-2xl bg-[#FFF8F2] border border-[#F6A6B8]/40 hover:bg-[#FFE5D9] text-[#54281F] text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4 text-[#E83E68]" />
          <span>Print / Save Invoice</span>
        </button>
      </div>

      {/* Status Progress Timeline (PRD Section 31) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F6A6B8]/30 cute-shadow mb-8">
        <h2 className="font-heading font-bold text-lg text-[#54281F] mb-6">
          Order Status Tracker
        </h2>

        <div className="relative">
          <div className="hidden sm:block absolute top-5 left-6 right-6 h-1 bg-gray-200 z-0" />
          <div
            className="hidden sm:block absolute top-5 left-6 h-1 bg-[#E83E68] z-0 transition-all duration-500"
            style={{
              width: `${(Math.max(0, currentStatusIndex) / (steps.length - 1)) * 90}%`,
            }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, idx) => {
              const isPastOrCurrent = currentStatusIndex >= idx;
              const isCurrent = currentStatusIndex === idx;

              return (
                <div key={step.key} className="flex flex-col sm:items-center text-left sm:text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-xs mb-2 transition-all ${
                      isPastOrCurrent
                        ? isCurrent
                          ? 'bg-[#E83E68] text-white ring-4 ring-[#F6A6B8]/40 shadow-md scale-110'
                          : 'bg-[#4E8B3A] text-white shadow-sm'
                        : 'bg-white text-gray-300 border-2 border-gray-200'
                    }`}
                  >
                    {isPastOrCurrent ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isCurrent
                        ? 'text-[#E83E68]'
                        : isPastOrCurrent
                        ? 'text-[#54281F]'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[10px] text-[#8C6A64] mt-0.5">
                    {step.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {order.trackingNumber && (
          <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs bg-[#FFF8F2] p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#E83E68]" />
              <span className="text-[#8C6A64]">Courier Partner:</span>
              <span className="font-bold text-[#54281F]">{order.carrier || 'BlueDart Express'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8C6A64]">Tracking AWB:</span>
              <span className="font-mono font-bold text-[#E83E68] bg-white px-2 py-0.5 rounded-md border">
                {order.trackingNumber}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Two Column Grid: Items List & Customer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Items List */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow">
          <h3 className="font-heading font-bold text-base text-[#54281F] mb-4 pb-3 border-b border-gray-100">
            Items in This Order ({order.items.length})
          </h3>

          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF8F2]/60 border border-[#F6A6B8]/20"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#54281F]">
                      {item.name}
                    </h4>
                    {item.scoopTier && (
                      <span className="text-[10px] bg-[#FFE5D9] text-[#E83E68] px-2 py-0.5 rounded-full font-bold">
                        Tier: {item.scoopTier}
                      </span>
                    )}
                    <p className="text-xs text-[#8C6A64] mt-0.5">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>

                <span className="font-heading font-bold text-base text-[#E83E68]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-xs text-[#54281F]">
            <div className="flex justify-between">
              <span className="text-[#8C6A64]">Subtotal</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#4E8B3A] font-semibold">
                <span>Coupon Discount ({order.couponCode})</span>
                <span>-₹{order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#8C6A64]">Shipping Fee</span>
              <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline font-bold">
              <span className="font-heading text-sm text-[#54281F]">Total Amount Paid</span>
              <span className="font-heading font-extrabold text-xl text-[#E83E68]">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer & Shipping address info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow">
            <h3 className="font-heading font-bold text-base text-[#54281F] mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E83E68]" />
              <span>Shipping Address</span>
            </h3>
            <div className="text-xs text-[#54281F] space-y-1">
              <p className="font-bold">{order.shippingAddress.name}</p>
              <p className="text-[#8C6A64]">{order.shippingAddress.phone}</p>
              <p className="text-[#8C6A64]">{order.shippingAddress.email}</p>
              <p className="mt-2 text-[#54281F]">
                {order.shippingAddress.houseFlat}, {order.shippingAddress.street}
              </p>
              <p className="text-[#54281F]">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                {order.shippingAddress.pincode}
              </p>
            </div>
          </div>

          <div className="bg-[#FFF8F2] rounded-3xl p-6 border border-[#F6A6B8]/30 space-y-2">
            <h4 className="font-heading font-bold text-xs text-[#54281F] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4E8B3A]" />
              <span>ScoopBerry Safe Guarantee</span>
            </h4>
            <p className="text-[11px] text-[#8C6A64] leading-relaxed">
              Every parcel is packed under high hygiene standards and sealed with our strawberry tamper-evident sticker. Need help? Chat with us anytime!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
