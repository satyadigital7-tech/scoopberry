'use client';

import React from 'react';
import { Star, Check, X, Trash2, MessageSquare } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function AdminReviewsPage() {
  const { reviews, approveReview, rejectReview, deleteReview } = useAdminStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Review Moderation
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Approve, filter, or moderate customer ratings and unboxing testimonials.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Customer & Product</th>
                <th className="px-6 py-3.5">Rating</th>
                <th className="px-6 py-3.5">Review Feedback</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{rev.customerName}</p>
                    <p className="text-[11px] text-slate-500">{rev.productName || 'ScoopBerry Find'}</p>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-600 font-bold">
                        Verified Purchase ✓
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 max-w-sm">
                    <p className="line-clamp-2 leading-relaxed">{rev.comment}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{rev.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        rev.isApproved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {rev.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {!rev.isApproved ? (
                        <button
                          onClick={() => approveReview(rev.id)}
                          className="px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 font-bold rounded-lg flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => rejectReview(rev.id)}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-lg flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(rev.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
                        title="Delete review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
