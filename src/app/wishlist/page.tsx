'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

export default function WishlistPage() {
  const { items, removeFromWishlist, moveToCart, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#FFF0E5] flex items-center justify-center text-4xl mx-auto mb-4 border border-[#F6A6B8]/30">
          💖
        </div>
        <h1 className="font-heading font-extrabold text-3xl text-[#54281F]">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-[#8C6A64] mt-2 max-w-sm mx-auto leading-relaxed">
          Save items you love so you can find them later or scoop them up when you are ready!
        </p>
        <Link
          href="/shop"
          className="inline-block mt-8 px-8 py-3.5 rounded-2xl bg-[#E83E68] text-white text-xs font-bold shadow-md hover:bg-[#d63059] transition-all"
        >
          Explore Scoops & Finds
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-4">
        <Link href="/" className="hover:text-[#E83E68]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#54281F]">My Wishlist</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl text-[#54281F]">
            Saved Favorites
          </h1>
          <p className="text-xs text-[#8C6A64] mt-0.5">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved in your heart list
          </p>
        </div>
        <button
          onClick={clearWishlist}
          className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="group relative bg-white rounded-3xl p-4 border border-[#F6A6B8]/30 cute-shadow flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFF8F2] mb-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-gray-500 hover:text-red-500 flex items-center justify-center shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[10px] uppercase font-bold text-[#E83E68] tracking-wider">
                {item.category}
              </span>
              <Link
                href={`/product/${item.slug}`}
                className="font-heading font-semibold text-sm text-[#54281F] hover:text-[#E83E68] line-clamp-1 block mt-0.5"
              >
                {item.name}
              </Link>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-heading font-bold text-base text-[#54281F]">
                  ₹{item.price}
                </span>
                {item.mrp > item.price && (
                  <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>
                )}
              </div>
            </div>

            <button
              onClick={() => moveToCart(item.productId)}
              className="mt-4 w-full py-2.5 rounded-2xl bg-[#E83E68] hover:bg-[#d63059] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move to Bag</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
