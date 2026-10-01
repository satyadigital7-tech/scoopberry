import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Product,
  MysteryScoop,
  GiftHamper,
  Category,
  Order,
  OrderStatus,
  Coupon,
  Review,
  Banner,
  StoreSettings,
} from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_MYSTERY_SCOOPS,
  INITIAL_HAMPERS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_BANNERS,
  INITIAL_SETTINGS,
} from '@/lib/data/sampleData';

interface AdminState {
  products: Product[];
  mysteryScoops: MysteryScoop[];
  hampers: GiftHamper[];
  categories: Category[];
  orders: Order[];
  coupons: Coupon[];
  reviews: Review[];
  banners: Banner[];
  settings: StoreSettings;

  // Products
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;

  // Mystery Scoops
  addMysteryScoop: (scoop: Omit<MysteryScoop, 'id'>) => void;
  updateMysteryScoop: (id: string, updates: Partial<MysteryScoop>) => void;
  deleteMysteryScoop: (id: string) => void;

  // Hampers
  addHamper: (hamper: Omit<GiftHamper, 'id'>) => void;
  updateHamper: (id: string, updates: Partial<GiftHamper>) => void;
  deleteHamper: (id: string) => void;

  // Categories
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Orders
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  refundOrder: (orderId: string) => void;

  // Inventory
  updateStock: (productId: string, newStock: number) => void;

  // Coupons
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;

  // Banners
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (id: string, updates: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Reset to default data
  resetToSampleData: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      mysteryScoops: INITIAL_MYSTERY_SCOOPS,
      hampers: INITIAL_HAMPERS,
      categories: INITIAL_CATEGORIES,
      orders: INITIAL_ORDERS,
      coupons: INITIAL_COUPONS,
      reviews: INITIAL_REVIEWS,
      banners: INITIAL_BANNERS,
      settings: INITIAL_SETTINGS,

      // Products
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: 'prod-' + Date.now(),
          createdAt: new Date().toISOString(),
        };
        set({ products: [newProduct, ...get().products] });
      },

      updateProduct: (id, updates) => {
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        });
      },

      deleteProduct: (id) => {
        set({
          products: get().products.filter((p) => p.id !== id),
        });
      },

      toggleProductStatus: (id) => {
        set({
          products: get().products.map((p) =>
            p.id === id
              ? { ...p, status: p.status === 'published' ? 'draft' : 'published' }
              : p
          ),
        });
      },

      // Mystery Scoops
      addMysteryScoop: (scoop) => {
        const newScoop: MysteryScoop = {
          ...scoop,
          id: 'scoop-' + Date.now(),
        };
        set({ mysteryScoops: [newScoop, ...get().mysteryScoops] });
      },

      updateMysteryScoop: (id, updates) => {
        set({
          mysteryScoops: get().mysteryScoops.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        });
      },

      deleteMysteryScoop: (id) => {
        set({
          mysteryScoops: get().mysteryScoops.filter((s) => s.id !== id),
        });
      },

      // Hampers
      addHamper: (hamper) => {
        const newHamper: GiftHamper = {
          ...hamper,
          id: 'hamper-' + Date.now(),
        };
        set({ hampers: [newHamper, ...get().hampers] });
      },

      updateHamper: (id, updates) => {
        set({
          hampers: get().hampers.map((h) => (h.id === id ? { ...h, ...updates } : h)),
        });
      },

      deleteHamper: (id) => {
        set({
          hampers: get().hampers.filter((h) => h.id !== id),
        });
      },

      // Categories
      addCategory: (category) => {
        const newCat: Category = {
          ...category,
          id: 'cat-' + Date.now(),
        };
        set({ categories: [...get().categories, newCat] });
      },

      updateCategory: (id, updates) => {
        set({
          categories: get().categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        });
      },

      deleteCategory: (id) => {
        set({
          categories: get().categories.filter((c) => c.id !== id),
        });
      },

      // Orders
      createOrder: (order) => {
        set({ orders: [order, ...get().orders] });

        // Update inventory for each purchased item
        const { products } = get();
        const updatedProducts = products.map((prod) => {
          const matchedItem = order.items.find((item) => item.productId === prod.id);
          if (matchedItem) {
            return {
              ...prod,
              stock: Math.max(0, prod.stock - matchedItem.quantity),
            };
          }
          return prod;
        });
        set({ products: updatedProducts });
      },

      updateOrderStatus: (orderId, status, note) => {
        const updated = get().orders.map((ord) => {
          if (ord.id === orderId) {
            const historyEntry = {
              status,
              timestamp: new Date().toISOString(),
              note: note || `Order status updated to ${status}`,
            };
            return {
              ...ord,
              orderStatus: status,
              statusHistory: [...ord.statusHistory, historyEntry],
              updatedAt: new Date().toISOString(),
            };
          }
          return ord;
        });
        set({ orders: updated });
      },

      cancelOrder: (orderId, reason) => {
        get().updateOrderStatus(orderId, 'cancelled', reason || 'Order cancelled by customer/admin');
      },

      refundOrder: (orderId) => {
        set({
          orders: get().orders.map((ord) =>
            ord.id === orderId ? { ...ord, paymentStatus: 'refunded' } : ord
          ),
        });
      },

      // Inventory
      updateStock: (productId, newStock) => {
        set({
          products: get().products.map((p) =>
            p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p
          ),
        });
      },

      // Coupons
      addCoupon: (coupon) => {
        const newCoupon: Coupon = {
          ...coupon,
          id: 'cpn-' + Date.now(),
        };
        set({ coupons: [newCoupon, ...get().coupons] });
      },

      updateCoupon: (id, updates) => {
        set({
          coupons: get().coupons.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        });
      },

      deleteCoupon: (id) => {
        set({
          coupons: get().coupons.filter((c) => c.id !== id),
        });
      },

      // Reviews
      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: 'rev-' + Date.now(),
          date: new Date().toISOString().split('T')[0],
        };
        set({ reviews: [newReview, ...get().reviews] });
      },

      approveReview: (id) => {
        set({
          reviews: get().reviews.map((r) => (r.id === id ? { ...r, isApproved: true } : r)),
        });
      },

      rejectReview: (id) => {
        set({
          reviews: get().reviews.map((r) => (r.id === id ? { ...r, isApproved: false } : r)),
        });
      },

      deleteReview: (id) => {
        set({
          reviews: get().reviews.filter((r) => r.id !== id),
        });
      },

      // Banners
      addBanner: (banner) => {
        const newBanner: Banner = {
          ...banner,
          id: 'banner-' + Date.now(),
        };
        set({ banners: [newBanner, ...get().banners] });
      },

      updateBanner: (id, updates) => {
        set({
          banners: get().banners.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        });
      },

      deleteBanner: (id) => {
        set({
          banners: get().banners.filter((b) => b.id !== id),
        });
      },

      // Settings
      updateSettings: (newSettings) => {
        set({ settings: { ...get().settings, ...newSettings } });
      },

      resetToSampleData: () => {
        set({
          products: INITIAL_PRODUCTS,
          mysteryScoops: INITIAL_MYSTERY_SCOOPS,
          hampers: INITIAL_HAMPERS,
          categories: INITIAL_CATEGORIES,
          orders: INITIAL_ORDERS,
          coupons: INITIAL_COUPONS,
          reviews: INITIAL_REVIEWS,
          banners: INITIAL_BANNERS,
          settings: INITIAL_SETTINGS,
        });
      },
    }),
    {
      name: 'scoopberry-admin-store',
    }
  )
);
