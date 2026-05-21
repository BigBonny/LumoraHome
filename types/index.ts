export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  description: string;
  category: string;
  badge?: string;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}
