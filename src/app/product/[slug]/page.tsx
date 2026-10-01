'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Gift,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  Check,
  Zap,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { ProductCard } from '@/components/common/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const products = useAdminStore((state) => state.products);
  const allReviews = useAdminStore((state) => state.reviews);
  const addReview = useAdminStore((state) => state.addReview);

  const product = products.find((p) => p.slug === slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'includes' | 'specs' | 'shipping' | 'reviews'>('details');
  const [isAdded, setIsAdded] = useState(false);

  // Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FFE5D9] flex items-center justify-center text-3xl mx-auto mb-4">
          🍓
        </div>
        <h2 className="font-heading font-bold text-2xl text-[#54281F]">
          Product Not Found
        </h2>
        <p className="text-xs sm:text-sm text-[#8C6A64] mt-2">
          This scoop has been picked up! Check out our other surprises.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-6 px-6 py-3 rounded-2xl bg-[#E83E68] text-white text-xs font-bold shadow-md hover:bg-[#d63059]"
        >
          Explore All Scoops
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const productReviews = allReviews.filter((r) => r.productId === product.id && r.isApproved);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, 4);

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
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    addReview({
      productId: product.id,
      productName: product.name,
      customerName: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
      verifiedPurchase: true,
      isApproved: true,
    });

    setReviewSubmitted(true);
    setReviewerName('');
    setReviewComment('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-6 flex-wrap">
        <Link href="/" className="hover:text-[#E83E68]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-[#E83E68]">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-[#E83E68]">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#54281F] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Two-Column Product Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-[#F6A6B8]/30 cute-shadow">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.isBestSeller && (
                <span className="bg-[#E83E68] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Best Seller 🔥
                </span>
              )}
              {product.isMystery && (
                <span className="bg-[#54281F] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span>Mystery Scoop</span>
                </span>
              )}
            </div>

            {/* Wishlist Heart */}
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
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isFavorited
                  ? 'bg-[#E83E68] text-white shadow-md scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-[#54281F] hover:bg-white hover:text-[#E83E68] shadow-sm'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 flex-shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#E83E68] scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#E83E68] bg-[#FFE5D9] px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs text-[#8C6A64]">SKU: {product.sku}</span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#54281F] leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews counter */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-[#E52F4F] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#E52F4F]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-heading font-bold text-sm text-[#54281F]">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-[#8C6A64]">
                • ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price Box */}
            <div className="mt-5 p-4 rounded-3xl bg-white border border-[#F6A6B8]/30 cute-shadow flex items-baseline gap-3">
              <span className="font-heading font-bold text-3xl text-[#E83E68]">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-base text-gray-400 line-through">₹{product.mrp}</span>
                  <span className="text-xs font-bold text-[#E52F4F] bg-[#FFE5D9] px-2.5 py-1 rounded-full">
                    Save {product.discount}%
                  </span>
                </>
              )}
              <span className="text-xs text-[#4E8B3A] font-semibold ml-auto">
                (Inclusive of all taxes)
              </span>
            </div>

            {/* Mystery Scoop Special Banner (PRD Section 24) */}
            {product.isMystery && (
              <div className="mt-5 p-4 rounded-3xl bg-gradient-to-r from-[#FFE5D9] to-[#FFF0E5] border border-[#F6A6B8]/40 space-y-2">
                <div className="flex items-center gap-2 text-[#E83E68] font-bold text-xs">
                  <span>The Fun is in the Surprise!</span>
                </div>
                <p className="text-xs text-[#54281F] leading-relaxed">
                  Items are hand-scooped fresh per order. You won&apos;t know exactly which kawaii stationery, plush charms or pins you get until you open your package at home!
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold text-[#54281F]">
                  <div className="bg-white/80 p-2 rounded-xl">
                    <span className="text-[#8C6A64] block text-[10px]">Tier</span>
                    {product.mysteryTier} Scoop
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl">
                    <span className="text-[#8C6A64] block text-[10px]">Surprise Items</span>
                    {product.mysteryItemCount || '10 - 14 Items'}
                  </div>
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOutOfStock
                    ? 'bg-red-500'
                    : isLowStock
                    ? 'bg-amber-500 animate-ping'
                    : 'bg-[#4E8B3A]'
                }`}
              />
              <span className="text-xs font-bold text-[#54281F]">
                {isOutOfStock
                  ? 'Currently Out of Stock'
                  : isLowStock
                  ? `Only ${product.stock} left in stock - order soon!`
                  : `In Stock & Ready to Scoop (${product.stock} units)`}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-heading font-semibold text-xs text-[#54281F]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#F6A6B8]/40 rounded-2xl bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-[#54281F] font-bold hover:bg-[#FFF8F2]"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-sm text-[#54281F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3.5 py-2 text-[#54281F] font-bold hover:bg-[#FFF8F2]"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons: Add to Cart & Buy Now */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isAdded
                    ? 'bg-[#4E8B3A] text-white scale-98'
                    : 'bg-[#E83E68] hover:bg-[#d63059] text-white hover:shadow-xl active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Bag! 🍓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#54281F] hover:bg-[#3d1a13] text-white shadow-md hover:shadow-lg active:scale-95'
                }`}
              >
                <Zap className="w-4 h-4 text-[#F6A6B8]" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white rounded-2xl border border-[#F6A6B8]/20 flex flex-col items-center">
                <Truck className="w-5 h-5 text-[#E83E68] mb-1" />
                <span className="text-[11px] font-bold text-[#54281F]">Express Delivery</span>
                <span className="text-[10px] text-[#8C6A64]">Dispatched in 24h</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#F6A6B8]/20 flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-[#4E8B3A] mb-1" />
                <span className="text-[11px] font-bold text-[#54281F]">100% Genuine</span>
                <span className="text-[10px] text-[#8C6A64]">Authentic Cute Finds</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#F6A6B8]/20 flex flex-col items-center">
                <RotateCcw className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-[11px] font-bold text-[#54281F]">Safe Packaging</span>
                <span className="text-[10px] text-[#8C6A64]">Transit Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, What's Included, Specs, Shipping, Reviews */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F6A6B8]/30 cute-shadow mb-16">
        <div className="flex border-b border-gray-100 gap-4 overflow-x-auto pb-3">
          {[
            { id: 'details', label: 'Product Details' },
            { id: 'includes', label: "What's Included" },
            { id: 'specs', label: 'Specifications' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'reviews', label: `Reviews (${productReviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`font-heading font-semibold text-xs sm:text-sm py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#E83E68] text-white shadow-sm'
                  : 'text-[#8C6A64] hover:bg-[#FFF8F2] hover:text-[#54281F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-6">
          {activeTab === 'details' && (
            <div className="prose text-xs sm:text-sm text-[#54281F] leading-relaxed max-w-none">
              <p>{product.description}</p>
              <div className="mt-4 bg-[#FFF8F2] p-4 rounded-2xl border border-[#F6A6B8]/20">
                <h4 className="font-heading font-bold text-sm text-[#54281F] mb-1">
                  Why you’ll adore it:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#8C6A64]">
                  <li>Hand-selected for premium aesthetic appeal and superior quality.</li>
                  <li>Delivered in signature pink gift wrap with custom strawberry tissue paper.</li>
                  <li>Ideal for surprising a bestie, sibling, loved one or treating yourself!</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'includes' && (
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-[#54281F]">
                Everything inside your package:
              </h4>
              {product.includes && product.includes.length > 0 ? (
                <ul className="space-y-2">
                  {product.includes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-[#54281F]">
                      <CheckCircle className="w-4 h-4 text-[#4E8B3A]" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#8C6A64]">
                  Includes the core product with ScoopBerry authentic packaging and bonus sticker gift.
                </p>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div>
              {product.specifications ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 bg-[#FFF8F2] rounded-2xl border border-[#F6A6B8]/20 flex justify-between text-xs"
                    >
                      <span className="font-semibold text-[#8C6A64]">{key}</span>
                      <span className="font-bold text-[#54281F]">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#8C6A64]">Standard premium gift specifications apply.</p>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 text-xs text-[#54281F] leading-relaxed">
              <p>
                <b>Dispatch Timeline:</b> Orders are carefully packed and dispatched within 24-48 business hours from our fulfillment hub.
              </p>
              <p>
                <b>Delivery Timeline:</b> Metro cities: 2-4 business days. Rest of India: 4-6 business days. Tracking details are sent via SMS and email.
              </p>
              <p>
                <b>Shipping Charges:</b> FREE delivery on orders above ₹499. Flat ₹49 delivery charge for orders below ₹499.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Reviews Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-gray-100">
                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FFF8F2] rounded-3xl border border-[#F6A6B8]/30 text-center">
                  <span className="font-heading font-extrabold text-5xl text-[#E83E68]">
                    {product.rating.toFixed(1)}
                  </span>
                  <div className="flex gap-1 text-[#E52F4F] my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E52F4F]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#8C6A64]">
                    Based on {productReviews.length} verified ratings
                  </span>
                </div>

                {/* Submit New Review Form */}
                <div className="md:col-span-8">
                  <h4 className="font-heading font-bold text-sm text-[#54281F] mb-2">
                    Write a Review
                  </h4>
                  <form onSubmit={handleSubmitReview} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#8C6A64] mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g. Radhika S."
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#8C6A64] mb-1">
                          Star Rating
                        </label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68] bg-white font-bold text-[#54281F]"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Amazing!)</option>
                          <option value={4}>⭐⭐⭐⭐ (4 Stars - Great)</option>
                          <option value={3}>⭐⭐⭐ (3 Stars - Good)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#8C6A64] mb-1">
                        Your Feedback
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Tell others what you loved about this scoop or gift!"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#E83E68] hover:bg-[#d63059] text-white text-xs font-bold shadow-sm transition-all"
                    >
                      Submit Review
                    </button>
                    {reviewSubmitted && (
                      <span className="text-xs font-semibold text-[#4E8B3A] ml-3">
                        ✓ Review posted successfully!
                      </span>
                    )}
                  </form>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-[#8C6A64]">
                    Be the first verified customer to review this scoop!
                  </p>
                ) : (
                  productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-[#FFF8F2]/60 border border-[#F6A6B8]/20 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-xs text-[#54281F]">
                            {rev.customerName}
                          </span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-green-100 text-[#4E8B3A] font-bold px-2 py-0.5 rounded-full">
                              Verified Purchase ✓
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex text-[#E52F4F] gap-0.5">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-[#E52F4F]" />
                        ))}
                      </div>
                      <p className="text-xs text-[#54281F] leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel/Grid */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="font-heading font-bold text-2xl text-[#54281F] mb-6">
            You May Also Love
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
