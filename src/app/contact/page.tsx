'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function ContactPage() {
  const settings = useAdminStore((state) => state.settings);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-[#E83E68] bg-[#FFE5D9] px-3.5 py-1 rounded-full">
          Get in Touch 💬
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#54281F] mt-2">
          We&apos;d Love to Hear from You!
        </h1>
        <p className="text-xs sm:text-sm text-[#8C6A64] mt-1 max-w-md mx-auto">
          Have a question about your mystery scoop, custom hamper orders, or bulk corporate gifting? Reach out!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#F6A6B8]/30 cute-shadow space-y-6">
            <h3 className="font-heading font-bold text-lg text-[#54281F] pb-3 border-b border-gray-100">
              Customer Support
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF8F2] text-[#E83E68] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#54281F]">Email Us</p>
                <a
                  href={`mailto:${settings?.contactEmail || 'hello@scoopberry.com'}`}
                  className="text-xs text-[#8C6A64] hover:text-[#E83E68] transition-colors"
                >
                  {settings?.contactEmail || 'hello@scoopberry.com'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F9EE] text-[#25D366] flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#54281F]">WhatsApp Live Chat</p>
                <a
                  href={`https://wa.me/${(settings?.whatsappNumber || '+919876543210').replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8C6A64] hover:text-[#4E8B3A] transition-colors"
                >
                  {settings?.whatsappNumber || '+91 98765 43210'}
                </a>
                <p className="text-[10px] text-gray-400 mt-0.5">Mon - Sat: 10:00 AM - 7:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF8F2] text-[#54281F] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#54281F]">ScoopBerry Hub</p>
                <p className="text-xs text-[#8C6A64] leading-relaxed">
                  ScoopBerry Studio, 100ft Road, Indiranagar, Bengaluru, Karnataka, 560038
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F6A6B8]/30 cute-shadow space-y-4"
          >
            <h3 className="font-heading font-bold text-lg text-[#54281F]">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#54281F] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sanya M."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#54281F] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sanya@example.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Question about Deluxe Mystery Scoop"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#54281F] mb-1">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help make your day magical?"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#F6A6B8]/40 focus:outline-none focus:border-[#E83E68]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#E83E68] text-white text-xs font-bold shadow-md hover:bg-[#d63059] flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>

            {submitted && (
              <div className="p-3 bg-green-50 border border-green-200 text-[#4E8B3A] text-xs font-bold rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you! We have received your message and will respond within 24 hours.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
