'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/common/Logo';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { Heart, Send, Check } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

// Clean SVG Icons for Instagram & Facebook
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const settings = useAdminStore((state) => state.settings);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const instagramPosts = [
    {
      img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80',
      caption: 'The ScoopBerry Scoop Station in action! 🍓',
    },
    {
      img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80',
      caption: 'Unboxing the cutest stationery mystery scoop! ✏️',
    },
    {
      img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=500&auto=format&fit=crop&q=80',
      caption: 'Handcrafted birthday hampers ready for dispatch 🎀',
    },
    {
      img: 'https://images.unsplash.com/photo-1559715745-e1b123c75990?w=500&auto=format&fit=crop&q=80',
      caption: 'Meet our viral Strawberry Bunny Plushies 🐰',
    },
  ];

  return (
    <footer className="bg-white border-t border-[#F6A6B8]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instagram Section (PRD Section 19) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3 py-1 rounded-full">
              Instagram Showcase 📸
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F] mt-2">
              Follow the Scoop
            </h3>
            <p className="text-xs sm:text-sm text-[#8C6A64] mt-1">
              Join our community of 50k+ surprise lovers on Instagram @scoopberry.official
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {instagramPosts.map((post, idx) => (
              <a
                key={idx}
                href={settings?.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Image
                  src={post.img}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
                  <div className="text-white flex flex-col items-center gap-1.5">
                    <InstagramIcon className="w-6 h-6 text-white" />
                    <span className="text-[11px] font-semibold line-clamp-2">
                      {post.caption}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-6">
            <a
              href={settings?.instagramUrl || 'https://instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFF8F2] border border-[#F6A6B8]/40 text-[#54281F] hover:bg-[#FFE5D9] hover:text-[#E83E68] text-xs font-bold transition-all"
            >
              <InstagramIcon className="w-4 h-4 text-[#E83E68]" />
              <span>Follow Us on Instagram</span>
            </a>
          </div>
        </div>

        {/* Newsletter Section (PRD Section 18) */}
        <div className="bg-gradient-to-r from-[#FFF8F2] via-[#FFF0E5] to-[#FDF2F4] rounded-3xl p-8 sm:p-12 border border-[#F6A6B8]/40 mb-16 relative overflow-hidden text-center max-w-4xl mx-auto cute-shadow">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-2xl select-none">🍓</span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#54281F] mt-2">
              Get the Scoop! 🍓
            </h3>
            <p className="text-xs sm:text-sm text-[#8C6A64] mt-2 leading-relaxed">
              Be the first to know about new arrivals, mystery drops and special offers.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-white border border-[#F6A6B8]/40 text-xs sm:text-sm text-[#54281F] focus:outline-none focus:border-[#E83E68] shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#E83E68] hover:bg-[#d63059] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Subscribed! 🍓</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs font-semibold text-[#4E8B3A] mt-2 animate-in fade-in">
                Thank you! Check your inbox for your 10% welcome coupon.
              </p>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns (PRD Section 20) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <Logo size="lg" />
            <p className="text-xs text-[#8C6A64] mt-4 max-w-sm leading-relaxed">
              ScoopBerry brings joy through curated mystery scoops, adorable stationery, aesthetic decor and handcrafted gift hampers made to make every moment magical.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={settings?.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFF8F2] border border-[#F6A6B8]/40 flex items-center justify-center text-[#54281F] hover:text-[#E83E68] hover:bg-[#FFE5D9] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={settings?.facebookUrl || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFF8F2] border border-[#F6A6B8]/40 flex items-center justify-center text-[#54281F] hover:text-[#E83E68] hover:bg-[#FFE5D9] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${(settings?.whatsappNumber || '+919876543210').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFF8F2] border border-[#F6A6B8]/40 flex items-center justify-center text-[#54281F] hover:text-[#4E8B3A] hover:bg-[#FFE5D9] transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#54281F] mb-4">Shop</h4>
            <ul className="space-y-2.5 text-xs text-[#8C6A64]">
              <li>
                <Link href="/mystery-scoops" className="hover:text-[#E83E68] transition-colors">
                  Mystery Scoops
                </Link>
              </li>
              <li>
                <Link href="/cute-finds" className="hover:text-[#E83E68] transition-colors">
                  Cute Finds
                </Link>
              </li>
              <li>
                <Link href="/gifts" className="hover:text-[#E83E68] transition-colors">
                  Gifts
                </Link>
              </li>
              <li>
                <Link href="/hampers" className="hover:text-[#E83E68] transition-colors">
                  Hampers
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-[#E83E68] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-[#E83E68] transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#54281F] mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-[#8C6A64]">
              <li>
                <Link href="/contact" className="hover:text-[#E83E68] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#E83E68] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#E83E68] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-[#E83E68] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-[#E83E68] transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#54281F] mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-[#8C6A64]">
              <li>
                <Link href="/about" className="hover:text-[#E83E68] transition-colors">
                  About ScoopBerry
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#E83E68] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#E83E68] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#E83E68] transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F6A6B8]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6A64]">
          <p>© {new Date().getFullYear()} ScoopBerry. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-[#E83E68] text-[#E83E68]" />
            <span>for surprise lovers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
