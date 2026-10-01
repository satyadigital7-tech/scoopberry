'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Gift } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3.5 py-1 rounded-full">
          Our Sweet Story 🍓
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#54281F] mt-3">
          Little Scoops. Big Surprises.
        </h1>
        <p className="text-xs sm:text-sm text-[#8C6A64] mt-3 max-w-xl mx-auto leading-relaxed">
          Welcome to ScoopBerry — where every scoop is a celebration of kawaii aesthetics, tactile wonder, and unboxing magic.
        </p>
      </div>

      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-12 border-2 border-[#F6A6B8]/40 shadow-xl">
        <Image
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&auto=format&fit=crop&q=80"
          alt="ScoopBerry Story"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
          <div className="text-white max-w-md">
            <h3 className="font-heading font-bold text-2xl">Crafted with Pure Love</h3>
            <p className="text-xs text-pink-100 mt-1">
              Started with a simple dream to make everyday stationery and gifts feel like stepping into a sweet surprise wonderland.
            </p>
          </div>
        </div>
      </div>

      {/* Narrative */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F6A6B8]/30 cute-shadow space-y-6 text-xs sm:text-sm text-[#54281F] leading-relaxed mb-12">
        <h2 className="font-heading font-bold text-2xl text-[#54281F]">
          The ScoopBerry Mission
        </h2>
        <p>
          At ScoopBerry, we believe the best gifts are the ones that surprise and delight you unexpectedly. Born from the viral excitement of live scoop unboxings, we set out to create a truly premium, dependable, and aesthetic shopping destination.
        </p>
        <p>
          Unlike generic mystery boxes that hide unwanted odds and ends, our promise is absolute: <b>every mystery scoop contains genuine, top-quality, aesthetic products with retail value strictly exceeding the price paid.</b> No fillers. No disappointments. Only pure smiles.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100 text-center">
          <div className="p-4 bg-[#FFF8F2] rounded-2xl">
            <span className="font-heading font-extrabold text-3xl text-[#E83E68]">50K+</span>
            <p className="text-xs text-[#8C6A64] mt-1 font-semibold">Happy Scoopers</p>
          </div>
          <div className="p-4 bg-[#FFF8F2] rounded-2xl">
            <span className="font-heading font-extrabold text-3xl text-[#4E8B3A]">4.9★</span>
            <p className="text-xs text-[#8C6A64] mt-1 font-semibold">Average Customer Rating</p>
          </div>
          <div className="p-4 bg-[#FFF8F2] rounded-2xl">
            <span className="font-heading font-extrabold text-3xl text-[#54281F]">100%</span>
            <p className="text-xs text-[#8C6A64] mt-1 font-semibold">Value Guaranteed</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#E83E68] text-white text-xs font-bold shadow-lg hover:bg-[#d63059] transition-all"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Experience Your First Scoop</span>
        </Link>
      </div>
    </div>
  );
}
