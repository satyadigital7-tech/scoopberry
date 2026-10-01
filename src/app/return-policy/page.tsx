import React from 'react';
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F6A6B8]/30 cute-shadow space-y-6 text-xs sm:text-sm text-[#54281F] leading-relaxed">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#54281F]">
          Returns & Replacement Policy 🍓
        </h1>
        <p className="text-gray-400 text-xs">Last Updated: January 2026</p>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            1. Mystery Products Policy
          </h2>
          <p>
            Due to the unique nature of surprise mystery scoops and limited-edition blind items, <b>items cannot be returned or exchanged purely for subjective preference or color choice</b>. The thrill and surprise is the essence of the product!
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            2. Damaged or Defective Items Guarantee
          </h2>
          <p>
            We take pride in packaging each scoop safely. However, if any product arrives damaged, broken, or malfunctioning due to transit, we provide a <b>100% free replacement or full refund</b>.
          </p>
          <p className="bg-[#FFF8F2] p-4 rounded-2xl border border-[#F6A6B8]/30">
            <b>Mandatory Requirement:</b> To claim a transit damage refund or replacement, please record a continuous, unedited video while unboxing the parcel from the initial outer courier seal. Send this video to <b>hello@scoopberry.com</b> or via WhatsApp within 48 hours of delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-base text-[#54281F]">
            3. Non-Mystery Products (Mugs, Stationery, Lamps)
          </h2>
          <p>
            Standard non-mystery products are eligible for return or exchange within 7 days of delivery provided they remain unused, in their original packaging, with all tags and seals intact.
          </p>
        </section>
      </div>
    </div>
  );
}
