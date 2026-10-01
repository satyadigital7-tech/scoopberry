'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: 'cart_' + product.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
      maxStock: product.stock,
      isMystery: product.isMystery,
      scoopTier: product.mysteryTier,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0],
      category: product.category,
      inStock: product.stock > 0,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-white rounded-3xl p-3.5 border border-[#F6A6B8]/30 cute-shadow cute-shadow-hover flex flex-col justify-between transition-all duration-300">
      <div>
        {/* Image Container */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FFF8F2]">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.isBestSeller && (
              <span className="bg-[#E83E68] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                Best Seller 🔥
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-[#4E8B3A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                Fresh Drop 🍓
              </span>
            )}
            {product.isMystery && (
              <span className="bg-[#FFF8F2] text-[#54281F] border border-[#E83E68]/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                Mystery
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
              isFavorited
                ? 'bg-[#E83E68] text-white shadow-md scale-105'
                : 'bg-white/80 backdrop-blur-sm text-[#54281F] hover:bg-white hover:text-[#E83E68] shadow-sm'
            }`}
            aria-label="Save to wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isFavorited ? 'fill-white' : ''
              }`}
            />
          </button>

          {/* Quick View Button on Hover */}
          {onQuickView && (
            <button
              onClick={handleQuickView}
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-[#54281F] hover:text-[#E83E68] text-xs font-semibold py-1.5 px-3.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 z-10 translate-y-2 group-hover:translate-y-0"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center z-10">
              <span className="bg-[#54281F] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                Sold Out 🥺
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-3 flex flex-col">
          <div className="flex items-center justify-between text-xs text-[#8C6A64] mb-1">
            <span className="font-medium text-[11px] uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#E52F4F] font-semibold text-xs">
              <Star className="w-3.5 h-3.5 fill-[#E52F4F]" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="font-heading font-semibold text-sm text-[#54281F] hover:text-[#E83E68] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {product.shortDescription && (
            <p className="text-xs text-[#8C6A64] line-clamp-1 mt-0.5 font-light">
              {product.shortDescription}
            </p>
          )}

          {/* Low Stock Warning */}
          {isLowStock && (
            <span className="text-[11px] font-semibold text-amber-600 mt-1">
              Only {product.stock} scoops left!
            </span>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="mt-3 pt-2.5 border-t border-[#FFF8F2] flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="font-heading font-bold text-base text-[#54281F]">
            ₹{product.price}
          </span>
          {product.mrp > product.price && (
            <>
              <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
              <span className="text-[10px] font-bold text-[#E52F4F] bg-[#FFE5D9] px-1.5 py-0.5 rounded-md">
                {product.discount}% OFF
              </span>
            </>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`px-3 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : isAdded
              ? 'bg-[#4E8B3A] text-white scale-95 shadow-md'
              : 'bg-[#E83E68] hover:bg-[#d63059] text-white active:scale-95 shadow-sm hover:shadow'
          }`}
          aria-label="Add to cart"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isAdded ? 'Added! 🍓' : 'Add'}</span>
        </button>
      </div>
    </div>
  );
};
