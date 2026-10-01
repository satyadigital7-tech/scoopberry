'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Gift, ShieldCheck } from 'lucide-react';
import { MysteryScoop } from '@/types';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

interface MysteryScoopCardProps {
  scoop: MysteryScoop;
}

export const MysteryScoopCard: React.FC<MysteryScoopCardProps> = ({ scoop }) => {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(scoop.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: 'cart_' + scoop.id,
      productId: scoop.id,
      name: scoop.name,
      slug: scoop.slug,
      price: scoop.price,
      mrp: scoop.mrp,
      image: scoop.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
      maxStock: scoop.stock,
      isMystery: true,
      scoopTier: scoop.scoopTier,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId: scoop.id,
      name: scoop.name,
      slug: scoop.slug,
      price: scoop.price,
      mrp: scoop.mrp,
      image: scoop.images[0],
      category: 'Mystery Scoops',
      inStock: scoop.stock > 0,
    });
  };

  return (
    <div className="relative group bg-gradient-to-b from-white to-[#FFF8F2] rounded-3xl p-5 border-2 border-[#F6A6B8]/40 cute-shadow cute-shadow-hover flex flex-col justify-between transition-all duration-300 overflow-hidden">
      {/* Decorative top ribbon */}
      <div className="absolute top-0 right-0 bg-[#E83E68] text-white text-[11px] font-bold px-3 py-1 rounded-bl-2xl shadow-sm flex items-center gap-1 z-10">
        <span>{scoop.badge || 'Mystery Reveal'}</span>
      </div>

      <div>
        {/* Visual Box */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF0E5] mb-4">
          <Link href={`/product/${scoop.slug}`} className="block w-full h-full">
            <Image
              src={scoop.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'}
              alt={scoop.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Shimmer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Value Guaranteed Tag */}
          <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-md text-[#54281F] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4E8B3A]" />
            <span>{scoop.guaranteedValue}</span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
              isFavorited
                ? 'bg-[#E83E68] text-white shadow-md'
                : 'bg-white/80 backdrop-blur-sm text-[#54281F] hover:bg-white hover:text-[#E83E68]'
            }`}
            aria-label="Wishlist scoop"
          >
            <Heart
              className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`}
            />
          </button>
        </div>

        {/* Scoop Tier & Items count info */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#FFE5D9] text-[#E83E68] font-bold text-xs px-2.5 py-0.5 rounded-full">
            Tier: {scoop.scoopTier} Scoop
          </span>
          <span className="bg-white text-[#54281F] border border-[#F6A6B8]/40 font-semibold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Gift className="w-3 h-3 text-[#E83E68]" />
            {scoop.itemCount}
          </span>
        </div>

        <Link
          href={`/product/${scoop.slug}`}
          className="font-heading font-bold text-lg text-[#54281F] hover:text-[#E83E68] transition-colors line-clamp-1"
        >
          {scoop.name}
        </Link>

        <p className="text-xs text-[#8C6A64] line-clamp-2 mt-1.5 leading-relaxed font-normal">
          {scoop.description}
        </p>

        {/* Potential Surprises teaser */}
        <div className="mt-3 bg-white/80 rounded-xl p-2.5 border border-[#F6A6B8]/20">
          <div className="text-[11px] font-semibold text-[#54281F] mb-1 flex items-center gap-1">
            <span>Possible surprises inside:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {scoop.potentialTypes.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-[#FFF8F2] text-[#8C6A64] px-2 py-0.5 rounded-md border border-[#F6A6B8]/20"
              >
                {item}
              </span>
            ))}
            {scoop.potentialTypes.length > 3 && (
              <span className="text-[10px] text-[#E83E68] font-semibold px-1">
                +{scoop.potentialTypes.length - 3} more!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart button */}
      <div className="mt-4 pt-3 border-t border-[#F6A6B8]/30 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-[#8C6A64] uppercase font-bold tracking-wider">
            Scoop Price
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading font-bold text-xl text-[#E83E68]">
              ₹{scoop.price}
            </span>
            <span className="text-xs text-gray-400 line-through">₹{scoop.mrp}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all duration-300 shadow-md ${
            isAdded
              ? 'bg-[#4E8B3A] text-white scale-95'
              : 'bg-[#E83E68] hover:bg-[#d63059] text-white hover:shadow-lg active:scale-95'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isAdded ? 'Scooped! 🍓' : 'Grab Scoop'}</span>
        </button>
      </div>
    </div>
  );
};
