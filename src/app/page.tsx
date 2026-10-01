'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  ArrowRight,
  Gift,
  Truck,
  Star,
  CheckCircle,
  ChevronDown,
  ShieldCheck,
  Package,
  Heart,
  Smile,
  Zap,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { ProductCard } from '@/components/common/ProductCard';
import { MysteryScoopCard } from '@/components/common/MysteryScoopCard';
import { QuickViewModal } from '@/components/common/QuickViewModal';
import { FloatingDecorations } from '@/components/common/DecorativeElements';
import { Product } from '@/types';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'cutefinds' | 'newarrivals'>('bestsellers');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const products = useAdminStore((state) => state.products);
  const mysteryScoops = useAdminStore((state) => state.mysteryScoops);
  const categories = useAdminStore((state) => state.categories);
  const banners = useAdminStore((state) => state.banners);
  const reviews = useAdminStore((state) => state.reviews);

  const heroBanner = banners.find((b) => b.type === 'hero' && b.isActive) || banners[0];

  const bestSellers = products.filter((p) => p.isBestSeller && p.status === 'published').slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival && p.status === 'published').slice(0, 4);
  const cuteFinds = products.filter((p) => p.categorySlug === 'cute-finds' && p.status === 'published').slice(0, 4);

  const displayedProducts =
    activeTab === 'bestsellers'
      ? bestSellers
      : activeTab === 'cutefinds'
      ? cuteFinds
      : newArrivals;

  const faqs = [
    {
      q: 'What exactly is a Mystery Scoop?',
      a: 'A Mystery Scoop is a fun, joyful surprise box! Using our candy scoop, we scoop a rich mix of viral stationery, plushies, keychains, pastel pens, washi tapes, and cute accessories. Every scoop is guaranteed to be worth significantly more than what you pay.',
    },
    {
      q: 'Can I choose what goes into my scoop?',
      a: 'The magic is in the surprise! However, you can leave a note at checkout (e.g., "I love pink" or "no sharp pens") and our packing team will do their best to customize your scoop with items you will adore.',
    },
    {
      q: 'How long does shipping take and is it free?',
      a: 'Orders are lovingly packed and dispatched within 24-48 hours. Delivery takes 3-5 business days across India. Shipping is completely FREE on all orders above ₹499!',
    },
    {
      q: 'Are the products authentic and good quality?',
      a: 'Yes, 100%! We strictly handpick and quality-check every single pen, plushie, and accessory before it enters our scoop bins. No cheap filler items—only premium cute goodies.',
    },
  ];

  return (
    <div className="relative">
      <FloatingDecorations />

      {/* 1. Hero Section - Simple, Welcoming, Clear */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 bg-[#FFE5D9] text-[#E83E68] text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
              <span>🍓 {heroBanner?.badge || 'India’s Favorite Cute Surprise Shop'}</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#54281F] leading-[1.15] tracking-tight">
              Little Scoops.{' '}
              <span className="text-[#E83E68] block sm:inline">Big Surprises.</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#8C6A64] max-w-xl leading-relaxed">
              Pick your mystery scoop tier, watch us scoop cute stationery, plushies and accessories, and unbox guaranteed happiness delivered right to your door.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5 w-full sm:w-auto">
              <Link
                href="/mystery-scoops"
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-[#E83E68] hover:bg-[#d63059] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Shop Mystery Scoops</span>
              </Link>
              <Link
                href="/shop"
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-white border-2 border-[#F6A6B8]/50 hover:bg-[#FFF8F2] text-[#54281F] text-sm font-bold shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#54281F]" />
                <span>Explore Cute Finds</span>
              </Link>
            </div>

            {/* Clear Micro Trust Badges */}
            <div className="mt-8 pt-6 border-t border-[#F6A6B8]/20 flex items-center gap-6 flex-wrap text-xs text-[#8C6A64] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#4E8B3A]" />
                <span>10,000+ Happy Orders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.9 / 5 Customer Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#E83E68]" />
                <span>Free Shipping over ₹499</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visuals */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Soft background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F6A6B8]/30 to-[#FFE5D9]/50 rounded-full blur-2xl transform scale-90" />

              {/* Main Visual Image Card */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl cute-shadow">
                <Image
                  src={heroBanner?.imageUrl || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200'}
                  alt="ScoopBerry Mystery Experience"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Clear Floating Badges */}
              <div className="absolute top-2 left-2 sm:-top-3 sm:-left-3 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#F6A6B8]/40 flex items-center gap-2 sm:gap-2.5 z-10">
                <span className="text-xl sm:text-2xl">🍓</span>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#54281F]">Signature Scoop</p>
                  <p className="text-[9px] sm:text-[10px] text-[#E83E68] font-bold">10-14 Surprises</p>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 sm:-bottom-3 sm:-right-3 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#F6A6B8]/40 flex items-center gap-2 sm:gap-2.5 z-10">
                <span className="text-xl sm:text-2xl">🎁</span>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#54281F]">Double Value</p>
                  <p className="text-[9px] sm:text-[10px] text-[#4E8B3A] font-bold">₹1,500+ Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "How It Works" in 3 Simple Steps - Easy for every user to understand */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#F6A6B8]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3 py-1 rounded-full">
              Super Simple Process
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F] mt-2">
              How Mystery Scoops Work
            </h2>
            <p className="text-xs sm:text-sm text-[#8C6A64] mt-1">
              Unboxing happiness in 3 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#FFF8F2] rounded-3xl p-6 border border-[#F6A6B8]/30 flex flex-col items-center text-center relative">
              <span className="absolute -top-3 left-6 bg-[#E83E68] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">
                Step 1
              </span>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-4 mt-2">
                🍧
              </div>
              <h3 className="font-heading font-bold text-base text-[#54281F]">
                Pick Your Scoop Size
              </h3>
              <p className="text-xs text-[#8C6A64] mt-1.5 leading-relaxed">
                Choose between Mini, Signature, or Mega scoops based on how many surprises you want.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFF8F2] rounded-3xl p-6 border border-[#F6A6B8]/30 flex flex-col items-center text-center relative">
              <span className="absolute -top-3 left-6 bg-[#E83E68] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">
                Step 2
              </span>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-4 mt-2">
                💖
              </div>
              <h3 className="font-heading font-bold text-base text-[#54281F]">
                We Scoop With Love
              </h3>
              <p className="text-xs text-[#8C6A64] mt-1.5 leading-relaxed">
                We hand-scoop your basket packed with cute stationery, plushies, stickers, and accessories.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFF8F2] rounded-3xl p-6 border border-[#F6A6B8]/30 flex flex-col items-center text-center relative">
              <span className="absolute -top-3 left-6 bg-[#E83E68] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">
                Step 3
              </span>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-4 mt-2">
                📦
              </div>
              <h3 className="font-heading font-bold text-base text-[#54281F]">
                Unbox the Joy
              </h3>
              <p className="text-xs text-[#8C6A64] mt-1.5 leading-relaxed">
                Delivered in our signature berry packaging with guaranteed 2x value and free surprise freebies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category - Clean & Visual */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3.5 py-1 rounded-full">
              Explore Store
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F] mt-2">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#E83E68] hover:text-[#d63059] flex items-center gap-1.5"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group bg-white rounded-3xl p-4 sm:p-5 border border-[#F6A6B8]/30 cute-shadow cute-shadow-hover flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFF8F2] mb-3">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {cat.badge && (
                    <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-md text-[#54281F] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#54281F] group-hover:text-[#E83E68] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#8C6A64] mt-0.5 line-clamp-1">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-[#E83E68]">
                <span>Shop</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Mystery Scoops Showcase (The Core USP) */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF0E5]/60 via-[#FFF8F2] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E83E68] bg-[#FFE5D9] px-3 py-1 rounded-full mb-2">
                <span>🍓 The Main Attraction</span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F]">
                Our Mystery Scoops
              </h2>
              <p className="text-xs sm:text-sm text-[#8C6A64] mt-1">
                Guaranteed double the retail value in every single scoop tier.
              </p>
            </div>
            <Link
              href="/mystery-scoops"
              className="text-xs font-bold text-[#E83E68] hover:text-[#d63059] flex items-center gap-1.5"
            >
              <span>Compare Scoop Tiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mysteryScoops.slice(0, 3).map((scoop) => (
              <MysteryScoopCard key={scoop.id} scoop={scoop} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Clean Tabbed Products (Best Sellers / Cute Finds / Fresh Drops) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3.5 py-1 rounded-full">
              Handpicked Goodies
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F] mt-2">
              Trending Cute Products
            </h2>
          </div>

          {/* Simple Tab Switcher */}
          <div className="flex items-center bg-[#FFF8F2] p-1.5 rounded-2xl border border-[#F6A6B8]/30 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-[#E83E68] text-white shadow-sm'
                  : 'text-[#54281F] hover:text-[#E83E68]'
              }`}
            >
              🔥 Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('cutefinds')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cutefinds'
                  ? 'bg-[#E83E68] text-white shadow-sm'
                  : 'text-[#54281F] hover:text-[#E83E68]'
              }`}
            >
              🧸 Cute Finds
            </button>
            <button
              onClick={() => setActiveTab('newarrivals')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'newarrivals'
                  ? 'bg-[#E83E68] text-white shadow-sm'
                  : 'text-[#54281F] hover:text-[#E83E68]'
              }`}
            >
              🍓 Fresh Drops
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. Real Customer Unboxing Reviews */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#FFF8F2] border-y border-[#F6A6B8]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3 py-1 rounded-full">
              Loved By 10,000+ Customers
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F] mt-2">
              Unboxing Love & Smiles
            </h2>
            <p className="text-xs sm:text-sm text-[#8C6A64] mt-1">
              Real reviews from real people who received their scoops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#54281F] italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#54281F]">{rev.customerName}</p>
                    <p className="text-[10px] text-[#4E8B3A] font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified Buyer
                    </p>
                  </div>
                  <span className="text-xs text-[#E83E68] font-bold">🍓 5/5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Homepage FAQ Section - Answers questions before buying */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F] mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#8C6A64] mt-1">
            Everything you need to know about ScoopBerry orders
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#F6A6B8]/30 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm text-[#54281F] hover:text-[#E83E68] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C6A64] transition-transform duration-200 ${
                    openFaq === index ? 'rotate-180 text-[#E83E68]' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-[#8C6A64] leading-relaxed border-t border-gray-50 pt-2 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. The ScoopBerry Promise (4 Simple Trust Badges) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-[#F6A6B8]/30 cute-shadow text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8F2] flex items-center justify-center text-2xl mb-3">
              🎁
            </div>
            <h3 className="font-heading font-bold text-sm text-[#54281F]">
              Guaranteed Value
            </h3>
            <p className="text-[11px] text-[#8C6A64] mt-1 leading-relaxed">
              Every scoop contains items worth 1.5x - 2x the price.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#F6A6B8]/30 cute-shadow text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8F2] flex items-center justify-center text-2xl mb-3">
              🚚
            </div>
            <h3 className="font-heading font-bold text-sm text-[#54281F]">
              Free Shipping
            </h3>
            <p className="text-[11px] text-[#8C6A64] mt-1 leading-relaxed">
              Complimentary express delivery on all orders above ₹499.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#F6A6B8]/30 cute-shadow text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8F2] flex items-center justify-center text-2xl mb-3">
              💖
            </div>
            <h3 className="font-heading font-bold text-sm text-[#54281F]">
              Handpicked Cute
            </h3>
            <p className="text-[11px] text-[#8C6A64] mt-1 leading-relaxed">
              Quality inspected stationery, plushies & treats.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#F6A6B8]/30 cute-shadow text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8F2] flex items-center justify-center text-2xl mb-3">
              🔒
            </div>
            <h3 className="font-heading font-bold text-sm text-[#54281F]">
              100% Secure
            </h3>
            <p className="text-[11px] text-[#8C6A64] mt-1 leading-relaxed">
              UPI, Cards & Netbanking verified safely with Razorpay.
            </p>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

