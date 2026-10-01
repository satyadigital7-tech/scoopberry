import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem } from '@/types';
import { useCartStore } from './useCartStore';

interface WishlistState {
  items: WishlistItem[];
  toggleWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (item) => {
        const { items } = get();
        const exists = items.some((i) => i.productId === item.productId);

        if (exists) {
          set({ items: items.filter((i) => i.productId !== item.productId) });
        } else {
          set({
            items: [
              ...items,
              {
                ...item,
                addedAt: new Date().toISOString(),
              },
            ],
          });
        }
      },

      removeFromWishlist: (productId: string) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      isInWishlist: (productId: string) => {
        return get().items.some((i) => i.productId === productId);
      },

      moveToCart: (productId: string) => {
        const item = get().items.find((i) => i.productId === productId);
        if (!item) return;

        // Add to cart
        useCartStore.getState().addItem({
          id: 'cart_' + item.productId,
          productId: item.productId,
          name: item.name,
          slug: item.slug,
          price: item.price,
          mrp: item.mrp,
          image: item.image,
          maxStock: 99,
        });

        // Remove from wishlist
        get().removeFromWishlist(productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'scoopberry-wishlist-storage',
    }
  )
);
