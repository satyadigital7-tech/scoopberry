'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Heart,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { INITIAL_SETTINGS } from '@/lib/data/sampleData';

export default function CartPage() {
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const {
    items,
    removeItem,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getShippingFee,
    getTotal,
    getItemCount,
  } = useCartStore();

  const { toggleWishlist } = useWishlistStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingFee = getShippingFee();
  const total = getTotal();
  const itemCount = getItemCount();

  const freeShippingThreshold = INITIAL_SETTINGS.freeShippingThreshold;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    toggleWishlist({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      mrp: item.mrp,
      image: item.image,
      category: item.isMystery ? 'Mystery Scoops' : 'Cute Finds',
      inStock: true,
    });
    removeItem(item.productId);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#FFF0E5] flex items-center justify-center text-4xl mx-auto mb-4 border border-[#F6A6B8]/30">
          🍓
        </div>
        <h1 className="font-heading font-extrabold text-3xl text-[#54281F]">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-[#8C6A64] mt-2 max-w-sm mx-auto leading-relaxed">
          Your cart is waiting for a little scoop of happiness! Browse our mystery scoops, plushies, and gifts.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-2xl bg-[#E83E68] text-white text-xs font-bold shadow-md hover:bg-[#d63059] transition-all"
          >
            Start Shopping
          </Link>
          <Link
            href="/mystery-scoops"
            className="px-8 py-3.5 rounded-2xl bg-white border border-[#F6A6B8]/40 text-[#54281F] text-xs font-bold hover:bg-[#FFF8F2] transition-all"
          >
            Explore Mystery Scoops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-4">
        <Link href="/" className="hover:text-[#E83E68]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#54281F]">Shopping Bag</span>
      </nav>

      <h1 className="font-heading font-bold text-3xl text-[#54281F] mb-6">
        Your Scoop Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h1>

      {/* Free shipping progress bar */}
      <div className="mb-8 p-4 bg-white rounded-3xl border border-[#F6A6B8]/30 cute-shadow">
        <div className="flex items-center justify-between text-xs font-bold text-[#54281F] mb-2">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#E83E68]" />
            {amountNeededForFreeShipping === 0
              ? '🎉 Congratulations! You have unlocked FREE Delivery!'
              : `Add ₹${amountNeededForFreeShipping.toFixed(0)} more to unlock FREE Delivery!`}
          </span>
          <span className="text-[#E83E68]">{Math.round(progressToFreeShipping)}%</span>
        </div>
        <div className="w-full bg-[#FFF8F2] h-2.5 rounded-full overflow-hidden border border-[#F6A6B8]/20">
          <div
            className="bg-gradient-to-r from-[#F6A6B8] to-[#E83E68] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 sm:p-6 border border-[#F6A6B8]/30 cute-shadow flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#FFF8F2] flex-shrink-0 border border-[#F6A6B8]/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-heading font-bold text-sm sm:text-base text-[#54281F] hover:text-[#E83E68] transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  {item.scoopTier && (
                    <span className="inline-block mt-0.5 text-[10px] bg-[#FFE5D9] text-[#E83E68] font-bold px-2 py-0.5 rounded-full">
                      Tier: {item.scoopTier} Scoop
                    </span>
                  )}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-heading font-bold text-base text-[#E83E68]">
                      ₹{item.price}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.mrp}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="flex items-center border border-[#F6A6B8]/40 rounded-2xl bg-[#FFF8F2] overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="px-3 py-1 text-sm font-bold text-[#54281F] hover:bg-[#FFE5D9] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-[#54281F]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="px-3 py-1 text-sm font-bold text-[#54281F] hover:bg-[#FFE5D9] transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="font-heading font-bold text-base text-[#54281F] min-w-[70px] text-right">
                  ₹{item.price * item.quantity}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveToWishlist(item)}
                    className="p-2 text-gray-400 hover:text-[#E83E68] transition-colors"
                    title="Move to wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2 flex justify-between items-center">
            <Link
              href="/shop"
              className="text-xs font-bold text-[#E83E68] hover:underline flex items-center gap-1"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow space-y-6 sticky top-28">
            <h3 className="font-heading font-bold text-lg text-[#54281F] pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            {/* Coupon Code Input */}
            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1.5">
                Have a Coupon Code?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#4E8B3A]" />
                    <div>
                      <p className="text-xs font-bold text-[#4E8B3A]">
                        {appliedCoupon.code} Applied
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {appliedCoupon.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. WELCOME10"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#F6A6B8]/40 uppercase font-semibold text-[#54281F] focus:outline-none focus:border-[#E83E68]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#54281F] hover:bg-[#3d1912] text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p
                  className={`text-[11px] font-semibold mt-1.5 ${
                    couponFeedback.success ? 'text-[#4E8B3A]' : 'text-red-500'
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}

              {/* Sample coupons tip */}
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                <span className="text-gray-400">Available:</span>
                {['WELCOME10', 'SCOOP20', 'GIFT100'].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCouponInput(c);
                      applyCoupon(c);
                    }}
                    className="text-[#E83E68] bg-[#FFE5D9] px-2 py-0.5 rounded-md font-bold hover:underline"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-[#54281F] pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span className="text-[#8C6A64]">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#4E8B3A] font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-[#8C6A64]">Estimated Shipping</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-[#4E8B3A]">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#8C6A64]">Taxes</span>
                <span className="text-gray-400 font-medium">Included</span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                <span className="font-heading font-bold text-base text-[#54281F]">
                  Total Amount
                </span>
                <span className="font-heading font-extrabold text-2xl text-[#E83E68]">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-[#E83E68] hover:bg-[#d63059] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C6A64]">
              <ShieldCheck className="w-4 h-4 text-[#4E8B3A]" />
              <span>Razorpay 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
