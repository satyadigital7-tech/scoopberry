'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { ProductCard } from '@/components/common/ProductCard';
import { QuickViewModal } from '@/components/common/QuickViewModal';
import { Product } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialOccasion = searchParams.get('occasion') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [priceRange, setPriceRange] = useState<number>(2500);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const allProducts = useAdminStore((state) => state.products);
  const categories = useAdminStore((state) => state.categories);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((prod) => {
        if (prod.status !== 'published') return false;

        // Category filter
        if (selectedCategory !== 'all' && prod.categorySlug !== selectedCategory) {
          return false;
        }

        // Occasion filter
        if (selectedOccasion !== 'all') {
          if (!prod.occasion || !prod.occasion.includes(selectedOccasion)) {
            return false;
          }
        }

        // Price filter
        if (prod.price > priceRange) return false;

        // Rating filter
        if (minRating > 0 && prod.rating < minRating) return false;

        // In Stock filter
        if (onlyInStock && prod.stock <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest')
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // Featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    allProducts,
    selectedCategory,
    selectedOccasion,
    priceRange,
    minRating,
    onlyInStock,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setPriceRange(2500);
    setMinRating(0);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedOccasion !== 'all' ? 1 : 0) +
    (priceRange < 2500 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyInStock ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-2">
          <Link href="/" className="hover:text-[#E83E68]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-[#54281F]">Shop All</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#54281F]">
              ScoopBerry Catalog
            </h1>
            <p className="text-xs sm:text-sm text-[#8C6A64] mt-1">
              Showing {filteredProducts.length} delightful products
            </p>
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#F6A6B8]/40 text-xs font-bold text-[#54281F]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#E83E68]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-[#F6A6B8]/30 shadow-sm text-xs">
              <span className="text-[#8C6A64] font-medium hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-[#54281F] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Favorites</option>
                <option value="newest">Newest Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-heading font-bold text-base text-[#54281F]">Filters</h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#E83E68] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="font-heading font-semibold text-xs text-[#54281F] uppercase tracking-wider mb-2.5">
                Categories
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-[#E83E68] text-white shadow-sm'
                      : 'text-[#8C6A64] hover:bg-[#FFF8F2] hover:text-[#54281F]'
                  }`}
                >
                  <span>All Products</span>
                  <span>{allProducts.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-[#E83E68] text-white shadow-sm'
                        : 'text-[#8C6A64] hover:bg-[#FFF8F2] hover:text-[#54281F]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span>
                      {allProducts.filter((p) => p.categorySlug === cat.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-semibold text-xs text-[#54281F] uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="font-heading font-bold text-xs text-[#E83E68]">
                  ₹{priceRange}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="2500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#E83E68] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>₹200</span>
                <span>₹2500+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="font-heading font-semibold text-xs text-[#54281F] uppercase tracking-wider mb-2">
                Minimum Rating
              </h4>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[0, 4.0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`py-1.5 rounded-xl border text-center font-bold transition-all ${
                      minRating === rating
                        ? 'bg-[#E83E68] text-white border-[#E83E68]'
                        : 'border-[#F6A6B8]/30 text-[#54281F] hover:bg-[#FFF8F2]'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-[#54281F] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-[#F6A6B8] text-[#E83E68] focus:ring-[#E83E68] w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#F6A6B8]/30 cute-shadow">
              <div className="w-16 h-16 rounded-full bg-[#FFF8F2] flex items-center justify-center text-3xl mx-auto mb-3">
                🔍
              </div>
              <h3 className="font-heading font-bold text-lg text-[#54281F]">
                No scoops match your criteria
              </h3>
              <p className="text-xs text-[#8C6A64] mt-1 max-w-sm mx-auto">
                Try widening your price range or clearing specific filters to discover more surprise items.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-2xl shadow-sm hover:bg-[#d63059]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full bg-white rounded-t-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#E83E68]" />
                <h3 className="font-heading font-bold text-lg text-[#54281F]">
                  Filter & Refine
                </h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-6">
              {/* Category Pills */}
              <div>
                <h4 className="font-heading font-semibold text-xs text-[#54281F] uppercase mb-2">
                  Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      selectedCategory === 'all'
                        ? 'bg-[#E83E68] text-white'
                        : 'bg-[#FFF8F2] text-[#54281F]'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        selectedCategory === c.slug
                          ? 'bg-[#E83E68] text-white'
                          : 'bg-[#FFF8F2] text-[#54281F]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Price up to:</span>
                  <span className="text-[#E83E68]">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#E83E68]"
                />
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-heading font-semibold text-xs text-[#54281F] uppercase mb-2">
                  Rating
                </h4>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[0, 4.0, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`py-2 rounded-xl font-bold border ${
                        minRating === r
                          ? 'bg-[#E83E68] text-white border-[#E83E68]'
                          : 'border-gray-200'
                      }`}
                    >
                      {r === 0 ? 'All' : `${r}★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* In stock */}
              <label className="flex items-center gap-2 text-xs font-bold text-[#54281F]">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#E83E68] focus:ring-[#E83E68] w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-center bg-[#FFF8F2] text-[#54281F] text-xs font-bold rounded-2xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-center bg-[#E83E68] text-white text-xs font-bold rounded-2xl"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#E83E68] border-t-transparent animate-spin mx-auto mb-3" />
          <p className="font-heading font-semibold text-sm text-[#54281F]">
            Loading scoops... 🍓
          </p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
