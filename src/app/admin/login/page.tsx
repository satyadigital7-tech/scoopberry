'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowRight, Key } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const { loginAsAdmin, isLoading, error, clearError } = useAuthStore();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const res = await loginAsAdmin(password);
    if (res.success) {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-red-50 text-[#E83E68] mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#54281F]">
            ScoopBerry Admin Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Restricted staff access. Enter your administrator master password.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#54281F] mb-1">
              Admin Master Password / Key
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin123)"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl border border-gray-200 focus:outline-none focus:border-[#E83E68]"
              />
              <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">
              Default demo password: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#E83E68] font-bold">admin123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-[#54281F] hover:bg-[#3d1912] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-[#E83E68] transition-colors"
          >
            ← Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
