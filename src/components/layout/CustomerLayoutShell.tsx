'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';

export const CustomerLayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F2] w-full max-w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};
