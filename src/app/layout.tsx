import type { Metadata, Viewport } from 'next';
import { Fredoka, Poppins } from 'next/font/google';
import './globals.css';
import { CustomerLayoutShell } from '@/components/layout/CustomerLayoutShell';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFF8F2',
};

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ScoopBerry — Little Scoops. Big Surprises. | Mystery Scoops, Cute Finds & Hampers',
  description:
    'Discover mystery scoops, cute stationery, adorable plushies, thoughtful gifts and bespoke gift hampers at ScoopBerry. Packed with happiness and delivered with love across India.',
  keywords: [
    'Mystery Scoops',
    'Cute Finds',
    'Gift Hampers',
    'ScoopBerry',
    'Kawaii Stationery',
    'Birthday Gifts',
    'Surprise Scoop',
  ],
  authors: [{ name: 'ScoopBerry' }],
  openGraph: {
    title: 'ScoopBerry — Little Scoops. Big Surprises.',
    description:
      'Discover mystery scoops, cute finds, thoughtful gifts and delightful hampers made to make every moment special.',
    url: 'https://scoopberry.com',
    siteName: 'ScoopBerry',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200',
        width: 1200,
        height: 630,
        alt: 'ScoopBerry Mystery Scoops & Hampers',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased text-[#54281F] bg-[#FFF8F2] min-h-screen">
        <CustomerLayoutShell>{children}</CustomerLayoutShell>
      </body>
    </html>
  );
}
