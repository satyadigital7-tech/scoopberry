import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Coupon } from '@/types';
import { INITIAL_COUPONS, INITIAL_SETTINGS } from '@/lib/data/sampleData';

interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  couponError: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  // Computed helpers
  getSubtotal: () => number;
  getDiscount: () => number;
  getShippingFee: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], // Strictly empty initially for new users
      appliedCoupon: null,
      couponError: null,

      addItem: (item, quantity = 1) => {
        const { items } = get();
        const existingIndex = items.findIndex((i) => i.productId === item.productId);

        if (existingIndex > -1) {
          const updated = [...items];
          const newQty = Math.min(
            updated[existingIndex].quantity + quantity,
            updated[existingIndex].maxStock || 99
          );
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          set({ items: updated });
        } else {
          set({
            items: [
              ...items,
              {
                ...item,
                quantity: Math.min(quantity, item.maxStock || 99),
              },
            ],
          });
        }
      },

      removeItem: (productId: string) => {
        const { items, appliedCoupon } = get();
        const remaining = items.filter((i) => i.productId !== productId);
        set({ items: remaining });

        // If coupon minimum order is no longer met, remove it
        if (appliedCoupon) {
          const newSubtotal = remaining.reduce((sum, item) => sum + item.price * item.quantity, 0);
          if (newSubtotal < appliedCoupon.minOrderValue) {
            set({
              appliedCoupon: null,
              couponError: `Coupon removed: Minimum order of ₹${appliedCoupon.minOrderValue} required.`,
            });
          }
        }
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items, removeItem } = get();
        if (quantity <= 0) {
          removeItem(productId);
          return;
        }

        const updated = items.map((i) => {
          if (i.productId === productId) {
            const cappedQty = Math.min(quantity, i.maxStock || 99);
            return { ...i, quantity: cappedQty };
          }
          return i;
        });
        set({ items: updated });
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, couponError: null });
      },

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const coupon = INITIAL_COUPONS.find(
          (c) => c.code.toUpperCase() === cleanCode && c.isActive
        );

        if (!coupon) {
          return { success: false, message: 'Invalid or expired coupon code' };
        }

        const subtotal = get().getSubtotal();
        if (subtotal < coupon.minOrderValue) {
          return {
            success: false,
            message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}. Add ₹${coupon.minOrderValue - subtotal} more!`,
          };
        }

        set({ appliedCoupon: coupon, couponError: null });
        return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null, couponError: null });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const { appliedCoupon } = get();
        if (!appliedCoupon) return 0;
        const subtotal = get().getSubtotal();

        let discount = 0;
        if (appliedCoupon.discountType === 'percentage') {
          discount = (subtotal * appliedCoupon.discountValue) / 100;
          if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
            discount = appliedCoupon.maxDiscount;
          }
        } else {
          discount = appliedCoupon.discountValue;
        }

        return Math.min(discount, subtotal);
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= INITIAL_SETTINGS.freeShippingThreshold
          ? 0
          : INITIAL_SETTINGS.defaultShippingFee;
      },

      getTax: () => {
        return 0; // All prices inclusive of taxes
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscount();
        const shipping = get().getShippingFee();
        const tax = get().getTax();
        return Math.max(0, subtotal - discount + shipping + tax);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'scoopberry-cart-storage',
      // Persist only items and appliedCoupon
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
      }),
    }
  )
);
