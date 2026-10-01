'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Gift, Check, ShoppingBag, Heart, Star } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

export default function HampersPage() {
  const hampers = useAdminStore((state) => state.hampers);
  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddHamper = (h: (typeof hampers)[0]) => {
    addItem({
      id: 'cart_' + h.id,
      productId: h.id,
      name: h.name,
      slug: h.slug,
      price: h.price,
      mrp: h.mrp,
      image: h.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
      maxStock: h.stock,
    });
    setAddedId(h.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-3">
        <Link href="/" className="hover:text-[#E83E68]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#54281F]">Gift Hampers</span>
      </nav>

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3.5 py-1 rounded-full">
          Packed With Happiness 🎁
        </span>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#54281F] mt-2">
          Curated Gift Hampers
        </h1>
        <p className="text-xs sm:text-sm text-[#8C6A64] mt-2 leading-relaxed">
          Premium multi-item surprise hampers packed in keepsake presentation boxes with satin ribbons and personalized cards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hampers.map((hamper) => {
          const isFavorited = isInWishlist(hamper.id);
          const isAdded = addedId === hamper.id;

          return (
            <div
              key={hamper.id}
              className="bg-white rounded-3xl p-6 border-2 border-[#F6A6B8]/40 cute-shadow cute-shadow-hover flex flex-col justify-between"
            >
              <div>
                {/* Hamper image */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#FFF8F2] mb-5">
                  <Image
                    src={hamper.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'}
                    alt={hamper.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {hamper.occasion.map((occ, idx) => (
                      <span
                        key={idx}
                        className="bg-white/95 backdrop-blur-md text-[#54281F] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm"
                      >
                        {occ}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      toggleWishlist({
                        productId: hamper.id,
                        name: hamper.name,
                        slug: hamper.slug,
                        price: hamper.price,
                        mrp: hamper.mrp,
                        image: hamper.images[0],
                        category: 'Gift Hampers',
                        inStock: hamper.stock > 0,
                      })
                    }
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isFavorited
                        ? 'bg-[#E83E68] text-white shadow-md'
                        : 'bg-white/80 backdrop-blur-sm text-[#54281F] hover:bg-white hover:text-[#E83E68]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8C6A64] mb-1">
                  <span className="font-bold text-[#E83E68] uppercase text-[11px]">
                    Gift Hamper
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-[#E52F4F]">
                    <Star className="w-3.5 h-3.5 fill-[#E52F4F]" />
                    <span>{hamper.rating}</span>
                    <span className="text-gray-400">({hamper.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-[#54281F]">
                  {hamper.name}
                </h3>
                <p className="text-xs text-[#8C6A64] mt-1 leading-relaxed">
                  {hamper.description}
                </p>

                {/* Items Included Breakdown */}
                <div className="mt-4 bg-[#FFF8F2] rounded-2xl p-4 border border-[#F6A6B8]/30">
                  <h4 className="font-heading font-semibold text-xs text-[#54281F] mb-2 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#E83E68]" />
                    <span>What’s Inside This Hamper:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {hamper.itemsIncluded.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-[#54281F] flex items-start gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-[#4E8B3A] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{item.name}</span>
                          {item.detail && (
                            <span className="text-[#8C6A64] text-[11px] ml-1">
                              ({item.detail})
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-bold text-2xl text-[#E83E68]">
                      ₹{hamper.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">₹{hamper.mrp}</span>
                    <span className="text-xs font-bold text-[#E52F4F] bg-[#FFE5D9] px-2 py-0.5 rounded-full">
                      {hamper.discount}% OFF
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4E8B3A] font-semibold">
                    ✓ Complimentary Satin Ribbon & Gift Box Included
                  </span>
                </div>

                <button
                  onClick={() => handleAddHamper(hamper)}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
                    isAdded
                      ? 'bg-[#4E8B3A] text-white scale-95'
                      : 'bg-[#E83E68] hover:bg-[#d63059] text-white active:scale-95'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? 'Added to Bag! 🍓' : 'Get Hamper'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
