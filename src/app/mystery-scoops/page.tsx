'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { MysteryScoopCard } from '@/components/common/MysteryScoopCard';

export default function MysteryScoopsPage() {
  const mysteryScoops = useAdminStore((state) => state.mysteryScoops);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero USP Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#FFF0E5] via-[#FFF8F2] to-[#FDF2F4] p-8 sm:p-12 border-2 border-[#F6A6B8]/40 mb-12 text-center max-w-4xl mx-auto cute-shadow">
        <div className="inline-flex items-center gap-2 bg-[#FFE5D9] text-[#E83E68] text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-sm">
          <span>🍓 The Ultimate Surprise Experience</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#54281F]">
          Ready for a Surprise?
        </h1>
        <p className="font-heading font-semibold text-base sm:text-xl text-[#E83E68] mt-2">
          You choose the scoop. We bring the surprise!
        </p>
        <p className="text-xs sm:text-sm text-[#8C6A64] mt-2 max-w-xl mx-auto leading-relaxed">
          Inspired by candy-shop scoops and viral unboxings, our mystery scoops are hand-picked from huge bins of premium kawaii stationery, plushies, charms, and aesthetic accessories.
        </p>
      </div>

      {/* How It Works Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE5D9] text-[#E83E68] flex items-center justify-center font-heading font-bold text-xl mb-3">
            1
          </div>
          <h3 className="font-heading font-bold text-base text-[#54281F]">
            Select Your Scoop Tier
          </h3>
          <p className="text-xs text-[#8C6A64] mt-1.5 leading-relaxed">
            Choose from Mini (5-7 items), Standard (10-14 items), or Deluxe/Mega (18-22 items) based on your budget.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE5D9] text-[#E83E68] flex items-center justify-center font-heading font-bold text-xl mb-3">
            2
          </div>
          <h3 className="font-heading font-bold text-base text-[#54281F]">
            We Scoop With Love 🍓
          </h3>
          <p className="text-xs text-[#8C6A64] mt-1.5 leading-relaxed">
            Our team dips into our fresh surprise bins and packs your bag with curated aesthetic goodies and sweet strawberry vibes.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE5D9] text-[#E83E68] flex items-center justify-center font-heading font-bold text-xl mb-3">
            3
          </div>
          <h3 className="font-heading font-bold text-base text-[#54281F]">
            Unbox Pure Joy!
          </h3>
          <p className="text-xs text-[#8C6A64] mt-1.5 leading-relaxed">
            Open your package at home and discover higher guaranteed retail value than what you paid. Guaranteed smile on every unboxing!
          </p>
        </div>
      </div>

      {/* Scoops Listing */}
      <div className="mb-12">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F] text-center mb-2">
          Choose Your Mystery Scoop
        </h2>
        <p className="text-xs text-[#8C6A64] text-center mb-8">
          The fun is in the surprise! Never knowing what comes next is the magic.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mysteryScoops.map((scoop) => (
            <MysteryScoopCard key={scoop.id} scoop={scoop} />
          ))}
        </div>
      </div>

      {/* Scoop Guarantees Banner */}
      <div className="bg-white rounded-3xl p-8 border border-[#F6A6B8]/30 cute-shadow max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF8F2] flex items-center justify-center text-3xl flex-shrink-0">
            🛡️
          </div>
          <div>
            <h4 className="font-heading font-bold text-base text-[#54281F]">
              The ScoopBerry Guarantee
            </h4>
            <p className="text-xs text-[#8C6A64] mt-0.5">
              Every mystery scoop comes with guaranteed retail value higher than the price paid, with zero filler items!
            </p>
          </div>
        </div>
        <Link
          href="/faq"
          className="px-6 py-2.5 rounded-full bg-[#FFF8F2] text-[#E83E68] border border-[#F6A6B8]/40 hover:bg-[#FFE5D9] text-xs font-bold whitespace-nowrap transition-colors"
        >
          Read Mystery FAQ
        </Link>
      </div>
    </div>
  );
}
