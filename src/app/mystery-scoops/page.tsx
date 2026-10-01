'use client';

import React, { useState } from 'react';
import {
  Video,
  Package,
  Sparkles,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { ProductCard } from '@/components/common/ProductCard';
import { QuickViewModal } from '@/components/common/QuickViewModal';
import { Product } from '@/types';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function MysteryScoopsPage() {
  const [activeFilter, setActiveFilter] = useState<'mystery' | 'all'>('mystery');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const products = useAdminStore((state) => state.products);
  const settings = useAdminStore((state) => state.settings);

  // Filter products based on selected pill
  const displayedProducts = products.filter((prod) => {
    if (prod.status !== 'published') return false;
    if (activeFilter === 'mystery') {
      return prod.isMystery || prod.slug === 'create-your-own-hamper';
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Filter Tabs matching the client screenshot exactly */}
      <div className="flex items-center gap-2.5 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeFilter === 'all'
              ? 'bg-black text-white shadow-sm'
              : 'bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#E5E5E5]'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setActiveFilter('mystery')}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeFilter === 'mystery'
              ? 'bg-black text-white shadow-sm'
              : 'bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#E5E5E5]'
          }`}
        >
          Mystery Scoops
        </button>
      </div>

      {/* Intro Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0E5] via-[#FFF8F2] to-[#FDF2F4] p-6 sm:p-8 border border-[#F6A6B8]/40 mb-8 cute-shadow">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-[#FFE5D9] text-[#E83E68] text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mystery Reveal Experience</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#54281F]">
            Our Mystery Scoops are filled with cute, aesthetic, and useful surprise items 🎁✨
          </h1>
          <p className="font-heading font-semibold text-sm sm:text-base text-[#E83E68] mt-2">
            Each scoop is specially curated with love to give you a fun unboxing experience 💕
          </p>

          {/* Surprise types teaser */}
          <div className="mt-4 pt-3 border-t border-[#F6A6B8]/30">
            <p className="text-xs font-bold text-[#54281F] mb-2">You may receive items like:</p>
            <div className="flex flex-wrap gap-2 text-xs text-[#54281F]">
              <span className="bg-white/90 px-3 py-1.5 rounded-xl border border-[#F6A6B8]/30 font-medium">
                Makeup 💄
              </span>
              <span className="bg-white/90 px-3 py-1.5 rounded-xl border border-[#F6A6B8]/30 font-medium">
                Accessories 🎀
              </span>
              <span className="bg-white/90 px-3 py-1.5 rounded-xl border border-[#F6A6B8]/30 font-medium">
                Stationery ✏️
              </span>
              <span className="bg-white/90 px-3 py-1.5 rounded-xl border border-[#F6A6B8]/30 font-medium">
                Cute goodies 🧸
              </span>
              <span className="bg-white/90 px-3 py-1.5 rounded-xl border border-[#F6A6B8]/30 font-medium text-[#E83E68] font-bold">
                and more surprises 💫
              </span>
            </div>
            <p className="text-xs font-semibold text-[#8C6A64] mt-3">
              💖 Every scoop is unique – no two scoops are exactly the same!
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid - 2 columns on mobile, 4 columns on desktop matching screenshot */}
      <div className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* POLICY CALLOUTS SECTION - VERBATIM FROM CLIENT */}
      <div className="space-y-6 max-w-4xl mx-auto mb-16">
        {/* 1. Unboxing Rule Notice */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FFF0E5] to-[#FDF2F4] p-5 sm:p-6 border-2 border-[#E83E68]/30 cute-shadow">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E83E68] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Video className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-[#54281F]">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#E83E68] flex items-center gap-1.5">
                <span>🎥 Unboxing Rule (Important)</span>
              </h3>
              <p className="font-bold text-[#54281F]">
                Please make a proper unboxing video 📸
              </p>
              <p className="text-xs text-[#8C6A64]">
                (Start from sealed package without cuts)
              </p>
              <div className="inline-block bg-[#FFE5D9] text-[#E83E68] font-bold text-xs px-3 py-1 rounded-full mt-1 border border-[#F6A6B8]/40">
                👉 Without unboxing video, no claims will be accepted
              </div>
            </div>
          </div>
        </div>

        {/* 2. Video Update Notice */}
        <div className="rounded-3xl bg-[#FFF8F2] p-5 sm:p-6 border border-[#F6A6B8]/40 cute-shadow">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#54281F] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-[#54281F] flex-1">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#54281F] flex items-center gap-1.5">
                <span>🎥 VIDEO UPDATE – PLEASE READ</span>
              </h3>
              <p className="leading-relaxed">
                If you order now, your order number will be <b>above #300</b>, so your packing video will take time to be uploaded as videos are posted in order sequence.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={settings?.instagramUrl || 'https://instagram.com/scoopberry.official'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#E83E68] hover:bg-[#d63059] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Check Our Instagram Sequence</span>
                </a>
                <span className="text-xs text-[#8C6A64]">
                  ✨ See which order number is currently being uploaded
                </span>
              </div>
              <p className="text-xs font-semibold text-[#E83E68] pt-1">
                Need it early? We can share your raw packing video on request. 💖
              </p>
            </div>
          </div>
        </div>

        {/* 3. Separate Packaging & Shipping Charges Notice */}
        <div className="rounded-3xl bg-white p-5 sm:p-6 border border-[#F6A6B8]/40 cute-shadow">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFE5D9] text-[#E83E68] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Package className="w-5 h-5" />
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-[#54281F] flex-1">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#54281F] flex items-center gap-1.5">
                <span>📦 Separate Packaging & Shipping Charges</span>
              </h3>
              <p className="leading-relaxed">
                If you order more than one Scoop and would like each Scoop to be packed in a separate box, an <b>additional ₹150 shipping charge per extra box</b> will apply.
              </p>
              <p className="text-xs text-[#8C6A64] leading-relaxed">
                Since our website does not allow us to add separate shipping charges for multiple boxes, we will contact you after receiving your order to inform you about the additional shipping charges.
              </p>
              <div className="bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] p-3 rounded-2xl text-xs font-semibold">
                ✨ If you are okay with all Scoops being packed together in one box, <b>no extra shipping charges will be applicable</b>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
