'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(
      {
        id: 'cart_' + product.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        mrp: product.mrp,
        image: product.images[selectedImageIndex] || product.images[0],
        maxStock: product.stock,
        isMystery: product.isMystery,
        scoopTier: product.mysteryTier,
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#F6A6B8]/40 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-black flex items-center justify-center shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Column */}
        <div className="md:w-1/2 p-6 bg-[#FFF8F2] flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-inner">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#E83E68] scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-wider text-[#E83E68]">
                {product.category}
              </span>
              <div className="flex items-center text-xs text-[#E52F4F] font-semibold gap-1 ml-auto">
                <Star className="w-3.5 h-3.5 fill-[#E52F4F]" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-gray-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-heading font-bold text-xl text-[#54281F] leading-snug">
              {product.name}
            </h2>

            {/* Price section */}
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-heading font-bold text-2xl text-[#E83E68]">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                  <span className="text-xs font-bold text-[#E52F4F] bg-[#FFE5D9] px-2 py-0.5 rounded-full">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-[#8C6A64] mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Features checkmarks */}
            <div className="mt-4 space-y-1.5 text-xs text-[#54281F]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4E8B3A]" />
                <span>100% Genuine ScoopBerry Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E83E68]" />
                <span>Dispatch within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-[#F6A6B8]/40 rounded-2xl bg-[#FFF8F2] overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-[#54281F] font-bold hover:bg-[#F6A6B8]/20 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1.5 font-bold text-sm text-[#54281F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 text-[#54281F] font-bold hover:bg-[#F6A6B8]/20 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex-1 py-2.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isAdded
                    ? 'bg-[#4E8B3A] text-white'
                    : 'bg-[#E83E68] hover:bg-[#d63059] text-white active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() =>
                  toggleWishlist({
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    mrp: product.mrp,
                    image: product.images[0],
                    category: product.category,
                    inStock: product.stock > 0,
                  })
                }
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-colors ${
                  isFavorited
                    ? 'bg-[#E83E68] border-[#E83E68] text-white'
                    : 'border-[#F6A6B8]/40 text-[#54281F] hover:bg-[#FFF8F2]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-center text-xs font-semibold text-[#8C6A64] hover:text-[#E83E68] transition-colors"
            >
              View Full Details & Customer Reviews →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
