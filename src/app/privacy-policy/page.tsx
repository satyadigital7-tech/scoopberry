import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F6A6B8]/30 cute-shadow space-y-6 text-xs sm:text-sm text-[#54281F] leading-relaxed">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#54281F]">
          Privacy Policy 🔒
        </h1>
        <p className="text-gray-400 text-xs">Last Updated: January 2026</p>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            1. Information We Collect
          </h2>
          <p>
            When you visit or make a purchase from ScoopBerry, we collect personal information necessary to fulfill your order, including your name, delivery address, phone number, email address, and order history.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            2. Payment Security (Razorpay)
          </h2>
          <p>
            ScoopBerry never stores or accesses your full credit card numbers, debit card PINs, or UPI passwords. All transactions are securely processed by Razorpay using 256-bit SSL encryption and strict PCI-DSS compliance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            3. How We Use Your Data
          </h2>
          <p>
            We use your data strictly to process and ship your orders, communicate delivery updates, respond to customer inquiries, and send promotional newsletters only if you have voluntarily subscribed. We never sell your personal information to third parties.
          </p>
        </section>
      </div>
    </div>
  );
}
