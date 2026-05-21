// Shopify Cart Store with Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createCart,
  addToCart,
  updateCartLines,
  removeFromCart,
  getCart,
} from "@/lib/shopify";
import { ShopifyCart, ShopifyCartLine } from "@/types/shopify";

interface CartState {
  cartId: string | null;
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  initialized: boolean;

  // Actions
  initCart: () => Promise<void>;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getCartCount: () => number;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      isOpen: false,
      isLoading: false,
      initialized: false,

      initCart: async () => {
        const { cartId, initialized } = get();
        if (initialized) return;

        if (cartId) {
          // Try to fetch existing cart
          const existingCart = await getCart(cartId);
          if (existingCart) {
            set({ cart: existingCart, initialized: true });
            return;
          }
        }

        // Create new cart if none exists or expired
        const newCart = await createCart();
        if (newCart) {
          set({ cartId: newCart.id, cart: newCart, initialized: true });
        }
      },

      addItem: async (merchandiseId: string, quantity = 1) => {
        const { cartId, initCart } = get();
        set({ isLoading: true });

        try {
          // Initialize cart if needed
          if (!cartId) {
            await initCart();
          }

          const currentCartId = get().cartId;
          if (!currentCartId) return;

          const updatedCart = await addToCart(
            currentCartId,
            merchandiseId,
            quantity
          );

          if (updatedCart) {
            set({ cart: updatedCart, isOpen: true });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (lineId: string, quantity: number) => {
        const { cartId } = get();
        if (!cartId) return;

        set({ isLoading: true });

        try {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            const updatedCart = await removeFromCart(cartId, lineId);
            if (updatedCart) {
              set({ cart: updatedCart });
            }
          } else {
            const updatedCart = await updateCartLines(cartId, lineId, quantity);
            if (updatedCart) {
              set({ cart: updatedCart });
            }
          }
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (lineId: string) => {
        const { cartId } = get();
        if (!cartId) return;

        set({ isLoading: true });

        try {
          const updatedCart = await removeFromCart(cartId, lineId);
          if (updatedCart) {
            set({ cart: updatedCart });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => {
        set({ cartId: null, cart: null });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getCartCount: () => {
        const { cart } = get();
        return cart?.totalQuantity || 0;
      },

      getCheckoutUrl: () => {
        const { cart } = get();
        return cart?.checkoutUrl || null;
      },
    }),
    {
      name: "stellux-shopify-cart",
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
);

