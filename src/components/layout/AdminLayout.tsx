'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Sparkles,
  Gift,
  ShoppingBag,
  Users,
  Boxes,
  Tag,
  Star,
  Image as ImageIcon,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useAdminStore } from '@/lib/store/useAdminStore';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const orders = useAdminStore((state) => state.orders);
  const products = useAdminStore((state) => state.products);
  const reviews = useAdminStore((state) => state.reviews);

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'placed' || o.orderStatus === 'confirmed').length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const pendingReviewsCount = reviews.filter((r) => !r.isApproved).length;

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'All Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Mystery Scoops', href: '/admin/mystery-scoops', icon: Sparkles, badge: 'USP' },
    { name: 'Gift Hampers', href: '/admin/hampers', icon: Gift },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined,
      badgeColor: 'bg-amber-500',
    },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    {
      name: 'Inventory',
      href: '/admin/inventory',
      icon: Boxes,
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined,
      badgeColor: 'bg-red-500',
    },
    { name: 'Coupons', href: '/admin/coupons', icon: Tag },
    {
      name: 'Reviews',
      href: '/admin/reviews',
      icon: Star,
      badge: pendingReviewsCount > 0 ? `${pendingReviewsCount}` : undefined,
      badgeColor: 'bg-blue-500',
    },
    { name: 'Banners', href: '/admin/banners', icon: ImageIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'CMS Pages', href: '/admin/cms', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // Protect Admin: If not logged in as admin, redirect to admin login
  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (!user || user.role !== 'admin') {
      router.push('/admin/login');
    }
  }, [user, pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-[#F6A6B8]/30 cute-shadow text-center max-w-sm">
          <ShieldCheck className="w-12 h-12 text-[#E83E68] mx-auto mb-3" />
          <h2 className="font-heading font-bold text-xl text-[#54281F]">
            Admin Access Required
          </h2>
          <p className="text-xs text-[#8C6A64] mt-1 mb-6">
            Please log in with administrator privileges to access the backend management portal.
          </p>
          <Link
            href="/admin/login"
            className="w-full py-2.5 px-4 bg-[#E83E68] text-white text-xs font-bold rounded-2xl block hover:bg-[#d63059]"
          >
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 antialiased font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 bg-[#54281F] text-white z-50 flex flex-col justify-between p-4 shadow-xl transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Bar */}
          <div className="flex items-center justify-between px-2 py-4 mb-4 border-b border-white/10">
            <Logo size="sm" isWhite />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300">
              Admin Control Panel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E83E68] text-white shadow-md'
                      : 'text-pink-100/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white ${
                        item.badgeColor || 'bg-[#E83E68]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-pink-200 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">Live</span>
          </Link>

          <button
            onClick={() => {
              logout();
              router.push('/admin/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-300 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Admin Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">
              ScoopBerry Admin Suite v2.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FFF8F2] text-[#E83E68] border border-[#F6A6B8]/40 hover:bg-[#FFE5D9] transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Customer Store</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E83E68] text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-slate-800 leading-none">
                  {user.displayName || 'Administrator'}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};
