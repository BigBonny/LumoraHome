// Shopify Storefront API Client
import { GraphQLClient } from "graphql-request";
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from "./queries";
import {
  ShopifyProduct,
  ShopifyCart,
  ShopifyCartLine,
} from "@/types/shopify";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const adminAccessToken =
  process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || "";

const endpoint = `https://${domain}/api/2024-01/graphql.json`;
const adminEndpoint = `https://${domain}/admin/api/2024-01/graphql.json`;

// Storefront API client (for cart, checkout - client safe)
export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    "Content-Type": "application/json",
  },
  fetch: (url, options) =>
    fetch(url, { ...options, cache: "no-store" }),
});

// Admin API client (server-side only - sees ALL products regardless of channel)
export const shopifyAdminClient = new GraphQLClient(adminEndpoint, {
  headers: {
    "X-Shopify-Access-Token": adminAccessToken,
    "Content-Type": "application/json",
  },
  fetch: (url, options) =>
    fetch(url, { ...options, cache: "no-store" }),
});

// Map REST product to Storefront-compatible shape
function mapRestProduct(p: any): ShopifyProduct {
  return {
    id: `gid://shopify/Product/${p.id}`,
    title: p.title,
    handle: p.handle,
    description: p.body_html?.replace(/<[^>]*>/g, "") || "",
    descriptionHtml: p.body_html || "",
    productType: p.product_type || "",
    tags: p.tags || [],
    vendor: p.vendor || "",
    availableForSale: p.variants?.some((v: any) => v.available) ?? true,
    priceRange: {
      minVariantPrice: {
        amount: p.variants?.[0]?.price || "0",
        currencyCode: "EUR",
      },
      maxVariantPrice: {
        amount: p.variants?.[p.variants.length - 1]?.price || "0",
        currencyCode: "EUR",
      },
    },
    compareAtPriceRange: {
      minVariantPrice: {
        amount: p.variants?.[0]?.compare_at_price || "0",
        currencyCode: "EUR",
      },
    },
    images: {
      nodes: p.images?.map((img: any) => ({
        id: `gid://shopify/ProductImage/${img.id}`,
        url: img.src,
        altText: img.alt || p.title,
        width: img.width,
        height: img.height,
      })) || [],
    },
    variants: {
      nodes: p.variants?.map((v: any) => ({
        id: `gid://shopify/ProductVariant/${v.id}`,
        title: v.title,
        availableForSale: v.available,
        price: { amount: v.price, currencyCode: "EUR" },
        compareAtPrice: v.compare_at_price
          ? { amount: v.compare_at_price, currencyCode: "EUR" }
          : null,
        selectedOptions: v.option1
          ? [
              { name: p.options?.[0]?.name || "Option", value: v.option1 },
              ...(v.option2 ? [{ name: p.options?.[1]?.name || "Option 2", value: v.option2 }] : []),
            ]
          : [{ name: "Title", value: "Default Title" }],
      })) || [],
    },
    featuredImage: p.images?.[0]
      ? {
          id: `gid://shopify/ProductImage/${p.images[0].id}`,
          url: p.images[0].src,
          altText: p.images[0].alt || p.title,
          width: p.images[0].width,
          height: p.images[0].height,
        }
      : null,
    seo: { title: p.title, description: "" },
  };
}

// Products - uses REST API so ALL products show regardless of channel
export async function getProducts(
  first: number = 100,
  query?: string
): Promise<ShopifyProduct[]> {
  try {
    const res = await fetch(
      `https://${domain}/products.json?limit=${first}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`REST fetch failed: ${res.status}`);
    const data = await res.json();
    let products: ShopifyProduct[] = data.products.map(mapRestProduct);
    if (query) {
      const q = query.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.productType?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  try {
    const res = await fetch(
      `https://${domain}/products/${handle}.json`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return mapRestProduct(data.product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Cart
export async function createCart(): Promise<ShopifyCart | null> {
  try {
    const data = (await shopifyClient.request(CREATE_CART_MUTATION, {
      input: {},
    })) as {
      cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] };
    };
    if (data.cartCreate.userErrors.length > 0) {
      console.error("Cart creation errors:", data.cartCreate.userErrors);
      return null;
    }
    return data.cartCreate.cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    return null;
  }
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  try {
    const data = (await shopifyClient.request(ADD_TO_CART_MUTATION, {
      cartId,
      lines: [{ merchandiseId, quantity }],
    })) as {
      cartLinesAdd: { cart: ShopifyCart; userErrors: { message: string }[] };
    };
    if (data.cartLinesAdd.userErrors.length > 0) {
      console.error("Add to cart errors:", data.cartLinesAdd.userErrors);
      return null;
    }
    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
}

export async function updateCartLines(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  try {
    const data = (await shopifyClient.request(UPDATE_CART_MUTATION, {
      cartId,
      lines: [{ id: lineId, quantity }],
    })) as {
      cartLinesUpdate: {
        cart: ShopifyCart;
        userErrors: { message: string }[];
      };
    };
    if (data.cartLinesUpdate.userErrors.length > 0) {
      console.error("Update cart errors:", data.cartLinesUpdate.userErrors);
      return null;
    }
    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error("Error updating cart:", error);
    return null;
  }
}

export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<ShopifyCart | null> {
  try {
    const data = (await shopifyClient.request(REMOVE_FROM_CART_MUTATION, {
      cartId,
      lineIds: [lineId],
    })) as {
      cartLinesRemove: {
        cart: ShopifyCart;
        userErrors: { message: string }[];
      };
    };
    if (data.cartLinesRemove.userErrors.length > 0) {
      console.error("Remove from cart errors:", data.cartLinesRemove.userErrors);
      return null;
    }
    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return null;
  }
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const data = (await shopifyClient.request(GET_CART_QUERY, {
      cartId,
    })) as { cart: ShopifyCart };
    return data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}
