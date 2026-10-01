import React from 'react';
import Link from 'next/link';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F6A6B8]/30 cute-shadow space-y-6 text-xs sm:text-sm text-[#54281F] leading-relaxed">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#54281F]">
          Shipping & Delivery Policy 🚚
        </h1>
        <p className="text-gray-400 text-xs">Last Updated: January 2026</p>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            1. Order Dispatch Timeline
          </h2>
          <p>
            All ScoopBerry orders are processed and packaged with great care at our fulfillment studio in Bengaluru. Standard order dispatch occurs within <b>24 to 48 business hours</b> of order confirmation. During holiday seasons or viral mystery drop releases, dispatch may take up to 72 hours.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            2. Delivery Estimates Across India
          </h2>
          <ul className="list-disc list-inside space-y-1 text-[#8C6A64]">
            <li><b>Metro Cities (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai, Kolkata):</b> 2 - 4 business days.</li>
            <li><b>Tier 2 and Tier 3 Cities:</b> 3 - 6 business days.</li>
            <li><b>North-East & Remote Regions:</b> 5 - 8 business days.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            3. Shipping Charges
          </h2>
          <p>
            We offer <b>FREE Shipping on all orders of ₹499 or more</b>. For orders below ₹499, a flat shipping and safe-packing fee of <b>₹49</b> is added at checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            4. Order Tracking
          </h2>
          <p>
            Once your order is handed over to our courier partners (BlueDart, Delhivery, ExpressBees), you will receive a tracking link and AWB number via email and SMS. You can also track live order status directly in your <Link href="/account/orders" className="text-[#E83E68] font-bold underline">ScoopBerry Account</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
