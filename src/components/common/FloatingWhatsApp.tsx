'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const settings = useAdminStore((state) => state.settings);
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanNumber = (settings?.whatsappNumber || '+919876543210').replace(/\D/g, '');
  const message = encodeURIComponent(
    'Hi ScoopBerry! 🍓 I have a question about mystery scoops and gift hampers.'
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end flex-col gap-2 select-none">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative max-w-[calc(100vw-3rem)] bg-white text-[#54281F] text-[11px] sm:text-xs font-semibold py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#F6A6B8]/30 flex items-center gap-2 transition-all animate-bounce">
          <span className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
            <span className="truncate">Need help? Chat with us on WhatsApp 💬</span>
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-5 sm:right-6 w-3 h-3 bg-white rotate-45 border-b border-r border-[#F6A6B8]/30" />
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <div className="relative group">
        {/* Ambient pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-xs animate-pulse pointer-events-none group-hover:scale-110 transition-transform duration-300" />
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1EBE5D] to-[#25D366] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-white/30"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-xs transition-transform duration-300 group-hover:scale-105" />
        </a>
      </div>
    </div>
  );
};
