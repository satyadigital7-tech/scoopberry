# ScoopBerry 🍓 — “Little Scoops. Big Surprises.”

ScoopBerry is a modern, cute, premium ecommerce application specialized in **Mystery Scoops**, **Cute Finds**, **Gifts**, and curated **Gift Hampers**.

---

## 🌸 Tech Stack

- **Frontend Framework**: Next.js 16 (App Router) & React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Custom ScoopBerry Design System
- **State Management**: Zustand with persistent storage
- **Backend / DB**: Firebase (Authentication, Cloud Firestore, Firebase Storage)
- **Payment Processing**: Razorpay (server-side order creation and cryptographic HMAC SHA-256 signature verification)
- **Micro-Delights**: Canvas Confetti, custom SVG vectors, floating strawberries and sparkles

---

## 🎨 Brand Design System

- **Primary Pink**: `#E83E68`
- **Soft Pink**: `#F6A6B8`
- **Cream Background**: `#FFF8F2`
- **Chocolate Brown**: `#54281F`
- **Strawberry Red**: `#E52F4F`
- **Botanical Green**: `#4E8B3A`
- **Typography**: Google Fonts — *Fredoka* (Headings) & *Poppins* (Body)

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Firebase and Razorpay credentials in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

> **Note**: ScoopBerry works completely out-of-the-box in simulated testing mode even before keys are provided. Once keys are configured, it automatically transitions to live Firebase and Razorpay!

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the customer storefront.

---

## 👑 Admin Portal Access

The Admin Dashboard is completely separated and protected:

- **Admin Login Route**: `/admin/login`
- **Demo Master Password**: `admin123`
- **Admin Dashboard**: `/admin`

### Admin Features:
1. **Product Management**: Full CRUD, image URLs, pricing, MRP, stock levels, and badges (Best Seller, New Arrival, Mystery).
2. **Category Management**: Create, edit, and toggle categories.
3. **Mystery Scoops USP**: Dedicated bin config with scoop sizes, item quantity ranges, and guaranteed retail value claims.
4. **Gift Hampers**: Multi-product bundles breakdown, occasion tags, and custom notes.
5. **Order Management**: Real-time 6-stage order status updater (`placed` -> `confirmed` -> `packed` -> `shipped` -> `out_for_delivery` -> `delivered`), cancellations, and printable invoices.
6. **Customer Directory**: Customer profiles, spending values, and VIP status.
7. **Inventory**: In-Stock, Low-Stock (≤5), and Out-of-Stock warnings with quick +/- stock adjustments.
8. **Coupons**: Percentage and flat vouchers (`WELCOME10`, `SCOOP20`, `GIFT100`), minimum order thresholds, and usage limits.
9. **Review Moderation**: Approve or reject customer unboxing reviews.
10. **Store Settings**: Real-time WhatsApp floating chat number configuration, Instagram URL, and free delivery thresholds.

---

## 💳 Razorpay Payment Flow

```
Customer 
   ↓ (Checkout)
Server Route (/api/razorpay/create-order)
   ↓ (Razorpay Modal Checkout)
Server Route (/api/razorpay/verify-order)
   ↓ (Cryptographic Signature Verification)
Order Confirmed & Stock Automatically Deducted
   ↓
Customer Receives Live Order Tracker & Printable Receipt
```

---

## 📦 Firestore Security Rules

See `firestore.rules` for full rules protecting customer carts, wishlists, and orders while reserving catalog and inventory mutations strictly for verified admins.

---

## 🚢 Deployment

Deploy to Vercel with one click:
```bash
npm run build
```
Add environment variables in the Vercel project dashboard under Settings > Environment Variables.
