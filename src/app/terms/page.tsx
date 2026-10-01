import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F6A6B8]/30 cute-shadow space-y-6 text-xs sm:text-sm text-[#54281F] leading-relaxed">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#54281F]">
          Terms & Conditions 📜
        </h1>
        <p className="text-gray-400 text-xs">Last Updated: January 2026</p>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or ordering from ScoopBerry (&quot;scoopberry.com&quot;), you agree to be bound by these Terms and Conditions and our Privacy and Shipping policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            2. Products & Pricing
          </h2>
          <p>
            We strive to display accurate descriptions, photography, and prices for all products. In the event of an inadvertent technical error or price misprint, ScoopBerry reserves the right to cancel or adjust the order before dispatch with full refund notification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            3. Intellectual Property
          </h2>
          <p>
            The ScoopBerry name, logo, custom graphics, mascot visuals, website design, and marketing content are the exclusive intellectual property of ScoopBerry.
          </p>
        </section>
      </div>
    </div>
  );
}
