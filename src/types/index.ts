export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  mrp: number;
  discount: number; // percentage
  stock: number;
  sku: string;
  category: string;
  categorySlug: string;
  tags: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isMystery?: boolean;
  mysteryTier?: 'Mini' | 'Standard' | 'Deluxe' | 'Mega';
  mysteryItemCount?: string;
  mysteryPotentialTypes?: string[];
  includes?: string[];
  specifications?: Record<string, string>;
  occasion?: string[];
  status: 'published' | 'draft';
  createdAt: string;
}

export interface MysteryScoop {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  mrp: number;
  scoopTier: 'Mini' | 'Standard' | 'Deluxe' | 'Mega';
  itemCount: string;
  guaranteedValue: string;
  potentialTypes: string[];
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  badge: string;
  status: 'published' | 'draft';
}

export interface HamperItem {
  name: string;
  quantity: number;
  detail?: string;
}

export interface GiftHamper {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  mrp: number;
  discount: number;
  stock: number;
  occasion: string[];
  itemsIncluded: HamperItem[];
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  status: 'published' | 'draft';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
  productCount: number;
  isEnabled: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  image: string;
  quantity: number;
  isMystery?: boolean;
  scoopTier?: string;
  maxStock: number;
}

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
  inStock: boolean;
  addedAt: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  email: string;
  houseFlat: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'razorpay' | 'cod' | 'test' | 'whatsapp';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderStatus: OrderStatus;
  statusHistory: OrderStatusHistory[];
  trackingNumber?: string;
  carrier?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  firstOrderOnly?: boolean;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productName?: string;
  customerName: string;
  customerId?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  isApproved: boolean;
  likes?: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  type: 'hero' | 'promo' | 'category' | 'seasonal';
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  badge?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  freeShippingThreshold: number;
  defaultShippingFee: number;
  announcementBarText: string;
  showAnnouncementBar: boolean;
  currencySymbol: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: 'customer' | 'admin';
  photoURL?: string;
  createdAt: string;
  savedAddresses: Address[];
}
