# LumoraHome

A complete headless Shopify dropshipping store for an ambient lighting brand built with Next.js 14, TypeScript, Tailwind CSS, and Shopify Storefront API.

## Features

- 🌙 Dark, aesthetic design perfect for Gen Z & millennials
- 🛒 Full e-commerce functionality powered by Shopify
- � Real-time cart sync with Shopify
- 🎨 Glassmorphism UI with smooth animations
- 📱 Fully responsive, mobile-first design
- 🔍 SEO optimized with dynamic metadata
- ⚡ Edge-ready with static generation

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shopify Storefront API
- @shopify/hydrogen-react
- graphql-request
- Zustand (cart state)
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

### Prerequisites

- A Shopify store with products added
- Shopify Storefront API access token

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Copy `.env.local.example` to `.env.local` and fill in your Shopify credentials:
```bash
cp .env.local.example .env.local
```

3. Get your Shopify Storefront API credentials:
   - Go to Shopify Admin → Settings → Apps and sales channels
   - Click "Develop apps" → "Create an app"
   - Enable "Storefront API access"
   - Install the app and copy the Storefront access token

4. Add products to your Shopify store with these tags for best results:
   - `new` - Shows "New" badge
   - `bestseller` - Shows "Best Seller" badge

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

```env
# Shopify Storefront API
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

## Shopify Setup

1. Create a private/custom app in your Shopify admin
2. Enable Storefront API with these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_checkout`
   - `unauthenticated_read_customer_tags`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_pickup_locations`

3. Products are managed entirely through Shopify admin
4. Orders and payments are handled by Shopify's hosted checkout

## Project Structure

```
app/                    # Next.js app router pages
├── products/[handle]/  # Product detail pages (SSG)
├── shop/              # Product collection
├── cart/              # Full page cart
├── about/             # About page
├── success/           # Order confirmation
├── layout.tsx         # Root layout
└── page.tsx           # Homepage

components/
├── layout/            # Navbar, Footer, AnnouncementBar
├── products/          # ProductCard, ProductGrid, Gallery, Form
├── cart/              # CartDrawer
├── sections/          # Hero, FeaturedProducts, ViewCollection
├── shop/              # ShopFilters
└── ui/                # Badge, TrustBadges, Testimonials

lib/
├── shopify.ts         # Storefront API client
└── queries.ts         # GraphQL queries

store/
└── cartStore.ts       # Zustand cart with Shopify sync

types/
└── shopify.ts         # TypeScript types for Shopify
```

## Pages

- `/` - Homepage with hero, featured products, testimonials
- `/shop` - Product collection with category filters & sorting
- `/products/[handle]` - Product detail page with variants
- `/cart` - Full page cart
- `/about` - About us page
- `/success` - Order confirmation page (clears cart)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Shopify Storefront API Rate Limits

- 2 requests per second for unauthenticated requests
- Cart mutations are limited but sufficient for typical usage

## License

MIT
