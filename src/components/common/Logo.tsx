import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  isWhite?: boolean;
  badgeOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  isWhite = false,
  badgeOnly = false,
}) => {
  const imageSizes = {
    sm: { w: 38, h: 38, className: 'w-9 h-9' },
    md: { w: 50, h: 50, className: 'w-11 h-11 sm:w-[50px] sm:h-[50px]' },
    lg: { w: 64, h: 64, className: 'w-14 h-14 sm:w-[64px] sm:h-[64px]' },
    xl: { w: 96, h: 96, className: 'w-24 h-24' },
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 group select-none">
      {/* Official ScoopBerry Brand Emblem */}
      <div
        className={`relative rounded-full overflow-hidden shrink-0 shadow-sm border border-[#F6A6B8]/40 bg-[#FFF8F2] group-hover:scale-105 group-hover:shadow-md transition-all duration-300 ${imageSizes[size].className}`}
      >
        <Image
          src="/logo.png"
          alt="ScoopBerry Logo"
          width={imageSizes[size].w}
          height={imageSizes[size].h}
          priority
          className="w-full h-full object-contain"
        />
      </div>

      {!badgeOnly && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-heading font-extrabold tracking-tight leading-none ${textSizes[size]} ${
              isWhite ? 'text-white' : 'text-[#54281F]'
            }`}
          >
            Scoop<span className="text-[#E83E68]">Berry</span>
          </span>
          {showTagline && (
            <span
              className={`font-sans tracking-wide font-medium mt-1 ${taglineSizes[size]} ${
                isWhite ? 'text-pink-100' : 'text-[#8C6A64]'
              } hidden sm:block`}
            >
              Little Scoops. Big Surprises.
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

