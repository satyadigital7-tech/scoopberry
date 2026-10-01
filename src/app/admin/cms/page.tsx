'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, ExternalLink, Save, Check } from 'lucide-react';

export default function AdminCMSPage() {
  const [saved, setSaved] = useState<string | null>(null);

  const pages = [
    { title: 'About ScoopBerry', path: '/about', desc: 'Brand narrative, mission, and craftsmanship story' },
    { title: 'Frequently Asked Questions', path: '/faq', desc: 'Answers to mystery scoops, delivery, and guarantees' },
    { title: 'Customer Support & Contact', path: '/contact', desc: 'Contact forms, studio address, and WhatsApp link' },
    { title: 'Shipping & Delivery Policy', path: '/shipping-policy', desc: 'Dispatch timelines, zones, and fees' },
    { title: 'Returns & Replacement Policy', path: '/return-policy', desc: 'Unboxing video rules, transit damage claims' },
    { title: 'Privacy & Data Protection', path: '/privacy-policy', desc: 'Razorpay SSL encryption and data rights' },
    { title: 'Terms & Conditions', path: '/terms', desc: 'Store terms of use and order policies' },
  ];

  const handleSavePage = (title: string) => {
    setSaved(title);
    setTimeout(() => setSaved(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Content Management (CMS)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage corporate pages, customer guidelines, policies, and FAQ content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((p) => (
          <div
            key={p.path}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
                  <FileText className="w-4 h-4" />
                </span>
                <Link
                  href={p.path}
                  target="_blank"
                  className="text-xs font-bold text-[#E83E68] hover:underline flex items-center gap-1"
                >
                  <span>Preview Live</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <h3 className="font-bold text-base text-slate-900 mt-1">{p.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">{p.path}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">
                Published & Indexed
              </span>
              <button
                onClick={() => handleSavePage(p.title)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
            {saved === p.title && (
              <p className="text-[10px] text-emerald-600 font-bold mt-2 text-right">
                ✓ CMS Page content published!
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
