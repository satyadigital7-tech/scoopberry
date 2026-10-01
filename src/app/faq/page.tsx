'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do Mystery Scoops actually work?',
      a: 'Mystery Scoops are inspired by traditional candy-shop scoops! You choose your preferred scoop tier (Mini, Standard, Deluxe, or Mega). Our team then takes a large candy scoop and dips into our surprise bins filled with plushies, stationery, charms, pins, and desk accessories to fill your bag. The exciting part is that you do not know the exact items until you unbox your package!',
    },
    {
      q: 'Are the products guaranteed to be worth the price?',
      a: 'Yes, 100%! Every ScoopBerry mystery scoop comes with a Guaranteed Value strictly higher than the price paid. For example, our Deluxe ₹799 scoop is guaranteed to contain ₹1,500+ worth of retail products. We never include cheap fillers or damaged goods.',
    },
    {
      q: 'Can I request specific items or colors?',
      a: 'Mystery scoops are randomly and freshly scooped to preserve the magic of surprise. However, if you are purchasing a Gift Hamper or regular Cute Find, you can choose the exact item and color you desire! You can also leave a note during checkout if you have allergies or specific dislikes.',
    },
    {
      q: 'How long does shipping take across India?',
      a: 'We pack and dispatch orders within 24 to 48 business hours. Deliveries typically take 2-4 business days for metro cities (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai, Kolkata) and 4-6 business days for the rest of India via BlueDart and Delhivery express couriers.',
    },
    {
      q: 'Is shipping free?',
      a: 'Yes! All orders above ₹499 qualify for completely FREE Express Delivery across India. For orders under ₹499, a flat delivery fee of ₹49 is charged.',
    },
    {
      q: 'What is your return & exchange policy for mystery products?',
      a: 'Because mystery scoops are surprise products, individual items cannot be returned simply for preference. However, in the rare event that an item arrives damaged or broken during transit, we offer instant replacement or refund with video unboxing proof!',
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'We accept all major payment methods securely via Razorpay: UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, MasterCard, RuPay, Amex), NetBanking across 50+ banks, and popular digital wallets.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3.5 py-1 rounded-full">
          Got Questions? 🍓
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#54281F] mt-2">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#8C6A64] mt-1 max-w-md mx-auto">
          Everything you need to know about our mystery scoops, shipping, hampers, and payment options.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#F6A6B8]/30 cute-shadow overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#54281F] hover:text-[#E83E68] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#E83E68] transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#8C6A64] leading-relaxed border-t border-gray-50 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center p-6 bg-[#FFF8F2] rounded-3xl border border-[#F6A6B8]/30 max-w-md mx-auto">
        <h4 className="font-heading font-bold text-sm text-[#54281F]">
          Still have a question?
        </h4>
        <p className="text-xs text-[#8C6A64] mt-1">
          Our friendly support team is always ready to help!
        </p>
        <Link
          href="/contact"
          className="inline-block mt-3 px-5 py-2 rounded-2xl bg-[#E83E68] text-white text-xs font-bold shadow-sm hover:bg-[#d63059]"
        >
          Contact Customer Care
        </Link>
      </div>
    </div>
  );
}
