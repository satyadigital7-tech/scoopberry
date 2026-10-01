'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { ProductCard } from '@/components/common/ProductCard';
import { QuickViewModal } from '@/components/common/QuickViewModal';
import { Product } from '@/types';
import { ChevronRight } from 'lucide-react';

export default function BestSellersPage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const products = useAdminStore((state) => state.products);
  const bestSellers = products.filter(
    (p) => p.isBestSeller && p.status === 'published'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-xs text-[#8C6A64] mb-3">
        <Link href="/" className="hover:text-[#E83E68]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#54281F]">Best Sellers</span>
      </nav>

      <div className="mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3 py-1 rounded-full">
          Customer Loved 🔥
        </span>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#54281F] mt-2">
          ScoopBerry Favorites
        </h1>
        <p className="text-xs sm:text-sm text-[#8C6A64] mt-1 max-w-lg">
          The most adored, 5-star reviewed mystery scoops and adorable finds that fly off our shelves fastest!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {bestSellers.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
