'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useAdminStore } from '@/lib/store/useAdminStore';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when any overlay is active
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isCartDrawerOpen || isMobileMenuOpen || isSearchOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isCartDrawerOpen, isMobileMenuOpen, isSearchOpen]);

  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const cartSubtotal = useCartStore((state) => state.getSubtotal());
  const removeFromCart = useCartStore((state) => state.removeItem);

  const wishlistCount = useWishlistStore((state) => state.items.length);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const settings = useAdminStore((state) => state.settings);
  const allProducts = useAdminStore((state) => state.products);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartDrawerOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Live search filtering
  const filteredProducts = searchQuery.trim()
    ? allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Mystery Scoops', href: '/mystery-scoops', badge: 'USP' },
    { name: 'Cute Finds', href: '/cute-finds' },
    { name: 'Gifts & Hampers', href: '/hampers' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F6A6B8]/30 shadow-xs transition-all duration-300">
      {/* Top Announcement Bar */}
      {settings?.showAnnouncementBar && (
        <div className="bg-[#E83E68] text-white py-1.5 px-3 text-center text-[11px] sm:text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 break-words">
          <span>{settings.announcementBarText}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile Left: Hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-2xl text-[#54281F] hover:bg-[#FFF8F2] focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Logo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-heading text-sm font-semibold tracking-wide transition-all duration-200 py-1 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#E83E68]'
                    : 'text-[#54281F] hover:text-[#E83E68]'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] bg-[#FFE5D9] text-[#E83E68] font-bold px-1.5 py-0.5 rounded-full uppercase">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E83E68] rounded-full animate-in fade-in duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, Wishlist, Account, Cart */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 sm:p-2.5 rounded-2xl text-[#54281F] hover:bg-[#FFF8F2] hover:text-[#E83E68] transition-colors"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Link (Desktop & Mobile) */}
          <Link
            href="/wishlist"
            className="relative p-2 sm:p-2.5 rounded-2xl text-[#54281F] hover:bg-[#FFF8F2] hover:text-[#E83E68] transition-colors hidden sm:flex items-center justify-center"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E52F4F] text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse-subtle">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* User Account / Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-2 sm:p-2.5 rounded-2xl text-[#54281F] hover:bg-[#FFF8F2] hover:text-[#E83E68] transition-colors flex items-center justify-center"
              aria-label="User account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* User Dropdown Popover */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-3xl shadow-xl border border-[#F6A6B8]/30 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {user ? (
                  <>
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-[#54281F] truncate">
                        {user.displayName || user.email}
                      </p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 bg-red-100 text-[#E52F4F] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Admin Portal Access
                        </span>
                      )}
                    </div>
                    <div className="py-1">
                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#E52F4F] hover:bg-[#FFF8F2] rounded-xl transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account"
                        className="block px-3 py-2 text-xs font-semibold text-[#54281F] hover:bg-[#FFF8F2] rounded-xl transition-colors"
                      >
                        My Account Dashboard
                      </Link>
                      <Link
                        href="/account/orders"
                        className="block px-3 py-2 text-xs font-semibold text-[#54281F] hover:bg-[#FFF8F2] rounded-xl transition-colors"
                      >
                        Orders & Tracking
                      </Link>
                      <Link
                        href="/account/addresses"
                        className="block px-3 py-2 text-xs font-semibold text-[#54281F] hover:bg-[#FFF8F2] rounded-xl transition-colors"
                      >
                        Saved Delivery Addresses
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-gray-100">
                      <button
                        onClick={() => logout()}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-[#E83E68] hover:bg-pink-50 rounded-xl transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-2 space-y-2">
                    <p className="text-xs text-[#8C6A64] px-1">
                      Welcome to ScoopBerry! Sign in for rewards & order tracking.
                    </p>
                    <Link
                      href="/login"
                      className="block w-full py-2 px-3 text-center bg-[#E83E68] text-white text-xs font-bold rounded-2xl hover:bg-[#d63059] transition-colors shadow-sm"
                    >
                      Customer Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full py-2 px-3 text-center bg-[#FFF8F2] border border-[#F6A6B8]/40 text-[#54281F] text-xs font-bold rounded-2xl hover:bg-[#FFE5D9] transition-colors"
                    >
                      Create Account
                    </Link>
                    <div className="pt-2 border-t border-gray-100 text-center">
                      <Link
                        href="/admin/login"
                        className="text-[11px] text-gray-400 hover:text-[#54281F] transition-colors"
                      >
                        Admin Portal
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-2.5 rounded-2xl bg-[#FFF8F2] text-[#54281F] hover:bg-[#FFE5D9] hover:text-[#E83E68] transition-all duration-200 flex items-center gap-1.5"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#E83E68]" />
            <span className="hidden sm:inline font-heading font-bold text-xs text-[#54281F]">
              Cart
            </span>
            {cartItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#E83E68] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <Logo size="sm" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between text-base font-heading font-bold text-[#54281F] hover:text-[#E83E68] transition-colors py-1"
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-[#FFE5D9] text-[#E83E68] px-2 py-0.5 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  className="flex items-center justify-between text-base font-heading font-bold text-[#54281F] hover:text-[#E83E68] transition-colors py-1"
                >
                  <span>Wishlist</span>
                  <span className="text-xs bg-[#FFF8F2] border border-[#F6A6B8]/40 px-2 py-0.5 rounded-full text-[#E83E68]">
                    {wishlistCount} items
                  </span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              {user ? (
                <div className="space-y-2">
                  <p className="text-xs text-[#8C6A64]">
                    Logged in as <b>{user.displayName || user.email}</b>
                  </p>
                  <Link
                    href="/account"
                    className="block w-full py-2.5 text-center bg-[#FFF8F2] text-[#54281F] text-xs font-bold rounded-2xl"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block w-full py-2 text-center text-xs text-[#E83E68] font-bold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    className="py-2.5 text-center bg-[#E83E68] text-white text-xs font-bold rounded-2xl"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="py-2.5 text-center bg-[#FFF8F2] border border-[#F6A6B8]/40 text-[#54281F] text-xs font-bold rounded-2xl"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Live Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#F6A6B8]/40 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#E83E68]" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search mystery scoops, cute plushies, hampers, stationery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-medium text-[#54281F] focus:outline-none placeholder-gray-400"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Suggestions & Results */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Mystery Scoop',
                      'Strawberry Bunny',
                      'Gift Hamper',
                      'Ceramic Bear Mug',
                      'Night Light',
                      'Pastel Stationery',
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs bg-[#FFF8F2] hover:bg-[#FFE5D9] text-[#54281F] px-3 py-1.5 rounded-full border border-[#F6A6B8]/20 transition-colors"
                      >
                        🍓 {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Found {filteredProducts.length} results
                  </p>
                  {filteredProducts.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#FFF8F2] transition-colors group"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={prod.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#54281F] group-hover:text-[#E83E68] transition-colors truncate">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {prod.category} • ₹{prod.price}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#E83E68] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-400 text-xs">
                  <p>No magical scoops found for &quot;{searchQuery}&quot;</p>
                  <p className="mt-1 text-gray-400">Try searching for &quot;scoop&quot;, &quot;plush&quot;, or &quot;hamper&quot;!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Quick Drawer */}
      {isMounted && isCartDrawerOpen && typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex justify-end">
            {/* Full-screen backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setIsCartDrawerOpen(false)}
            />
            {/* Slide-in Cart Panel with solid white background */}
            <div className="relative w-full max-w-md bg-white h-screen z-10 flex flex-col justify-between p-6 shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
              <div className="flex flex-col min-h-0 flex-1">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#E83E68]" />
                    <h3 className="font-heading font-bold text-lg text-[#54281F]">
                      Your Scoop Bag ({cartItemCount})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                    aria-label="Close cart drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
                  {cartItems.length === 0 ? (
                    <div className="py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#FFF8F2] flex items-center justify-center text-3xl mx-auto mb-3">
                        🍓
                      </div>
                      <p className="font-heading font-semibold text-[#54281F] text-base">
                        Your bag is empty!
                      </p>
                      <p className="text-xs text-[#8C6A64] mt-1 max-w-xs mx-auto">
                        Your cart is waiting for a little scoop of happiness.
                      </p>
                      <Link
                        href="/shop"
                        onClick={() => setIsCartDrawerOpen(false)}
                        className="inline-block mt-4 px-5 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-2xl shadow-sm hover:bg-[#d63059]"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF8F2] border border-[#F6A6B8]/30 shadow-xs"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#F6A6B8]/20 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#54281F] truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#8C6A64] mt-0.5">
                            {item.quantity} × <span className="font-bold text-[#E83E68]">₹{item.price}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-white transition-colors"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Drawer Footer */}
              {cartItems.length > 0 && (
                <div className="pt-4 border-t border-gray-100 space-y-3 shrink-0 bg-white">
                  <div className="flex items-center justify-between text-sm font-semibold text-[#54281F]">
                    <span>Subtotal:</span>
                    <span className="font-heading font-bold text-lg text-[#E83E68]">
                      ₹{cartSubtotal}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C6A64]">
                    Taxes and shipping calculated at checkout.
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="py-3 text-center bg-[#FFF8F2] border border-[#F6A6B8]/40 text-[#54281F] text-xs font-bold rounded-2xl hover:bg-[#FFE5D9] transition-colors"
                    >
                      View Bag
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="py-3 text-center bg-[#E83E68] text-white text-xs font-bold rounded-2xl hover:bg-[#d63059] shadow-md transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      }
    </header>
  );
};
