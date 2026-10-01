'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Heart,
  MapPin,
  Tag,
  LogOut,
  ChevronRight,
  ShieldAlert,
  Gift,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { formatDate } from '@/lib/utils';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const allOrders = useAdminStore((state) => state.orders);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const coupons = useAdminStore((state) => state.coupons);

  // If not logged in, show prompt or mock guest info
  const customerOrders = user
    ? allOrders.filter((o) => o.customerId === user.uid || o.customerEmail === user.email)
    : allOrders.slice(0, 2);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FFF0E5] via-[#FFF8F2] to-[#FFE5D9] rounded-3xl border border-[#F6A6B8]/30 cute-shadow mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-white px-3 py-1 rounded-full shadow-sm">
            Customer Dashboard 🍓
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#54281F] mt-2">
            Welcome, {user?.displayName || 'Scoop Lover'}!
          </h1>
          <p className="text-xs text-[#8C6A64] mt-0.5">
            {user?.email || 'Guest Session'} • Member of ScoopBerry Surprise Club
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="px-4 py-2 rounded-2xl bg-[#54281F] text-white text-xs font-bold shadow-sm hover:bg-[#3e1b15] flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#F6A6B8]" />
              <span>Admin Panel</span>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-2xl bg-white border border-[#F6A6B8]/40 text-[#E83E68] text-xs font-bold shadow-sm hover:bg-[#FFF8F2] flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Link
          href="/account/orders"
          className="p-5 bg-white rounded-3xl border border-[#F6A6B8]/30 cute-shadow hover:scale-102 transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#FFF8F2] flex items-center justify-center text-[#E83E68] mb-3">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="font-heading font-bold text-lg text-[#54281F]">
              {customerOrders.length}
            </p>
            <p className="text-xs text-[#8C6A64]">Orders Placed</p>
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="p-5 bg-white rounded-3xl border border-[#F6A6B8]/30 cute-shadow hover:scale-102 transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#FFF8F2] flex items-center justify-center text-[#E83E68] mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="font-heading font-bold text-lg text-[#54281F]">
              {wishlistCount}
            </p>
            <p className="text-xs text-[#8C6A64]">Saved in Wishlist</p>
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="p-5 bg-white rounded-3xl border border-[#F6A6B8]/30 cute-shadow hover:scale-102 transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#FFF8F2] flex items-center justify-center text-[#E83E68] mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="font-heading font-bold text-lg text-[#54281F]">
              {user?.savedAddresses?.length || 1}
            </p>
            <p className="text-xs text-[#8C6A64]">Saved Addresses</p>
          </div>
        </Link>

        <div className="p-5 bg-white rounded-3xl border border-[#F6A6B8]/30 cute-shadow flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF8F2] flex items-center justify-center text-[#E83E68] mb-3">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <p className="font-heading font-bold text-lg text-[#54281F]">
              {coupons.filter((c) => c.isActive).length}
            </p>
            <p className="text-xs text-[#8C6A64]">Available Coupons</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F6A6B8]/30 cute-shadow mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h2 className="font-heading font-bold text-xl text-[#54281F]">
            Recent Orders
          </h2>
          <Link
            href="/account/orders"
            className="text-xs font-bold text-[#E83E68] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {customerOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-[#8C6A64]">No orders placed yet.</p>
            <Link
              href="/shop"
              className="inline-block mt-3 px-5 py-2 rounded-2xl bg-[#E83E68] text-white text-xs font-bold"
            >
              Order Your First Scoop
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {customerOrders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-[#FFF8F2]/60 border border-[#F6A6B8]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-[#54281F]">
                      {ord.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        ord.orderStatus === 'delivered'
                          ? 'bg-green-100 text-[#4E8B3A]'
                          : ord.orderStatus === 'shipped'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      {ord.orderStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C6A64] mt-1" suppressHydrationWarning>
                    {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'} • Placed on{' '}
                    {formatDate(ord.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-heading font-bold text-base text-[#E83E68]">
                    ₹{ord.total.toFixed(2)}
                  </span>
                  <Link
                    href={`/account/orders/${ord.id}`}
                    className="px-4 py-2 rounded-xl bg-white border border-[#F6A6B8]/40 hover:bg-[#FFE5D9] text-[#54281F] text-xs font-bold transition-colors"
                  >
                    Track Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Coupons Banner */}
      <div className="bg-gradient-to-r from-[#FFF8F2] to-[#FFE5D9] rounded-3xl p-6 border border-[#F6A6B8]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E83E68] text-white flex items-center justify-center">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#54281F]">
              Have coupon code WELCOME10?
            </h3>
            <p className="text-xs text-[#8C6A64]">
              Get 10% instant discount on your order right at checkout!
            </p>
          </div>
        </div>
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-2xl bg-[#E83E68] text-white text-xs font-bold hover:bg-[#d63059] shadow-sm flex-shrink-0"
        >
          Use Now
        </Link>
      </div>
    </div>
  );
}
