import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
  formatCheckoutUrl,
  isCartNotFoundError,
  storefrontApiRequest,
} from "@/lib/shopify";

export interface CartItem {
  lineId: string | null;
  variantId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  image: string | null;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isOpen: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  lastAddedAt: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
  totalItems: () => number;
  totalPrice: () => number;
}

async function createShopifyCart(item: CartItem) {
  const data = await storefrontApiRequest<any>(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });
  const errs = data?.data?.cartCreate?.userErrors || [];
  if (errs.length) {
    console.error(errs);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;
  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

async function addLine(cartId: string, item: CartItem) {
  const data = await storefrontApiRequest<any>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });
  const errs = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length) return { success: false };
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l: any) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id };
}

async function updateLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest<any>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const errs = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length) return { success: false };
  return { success: true };
}

async function removeLine(cartId: string, lineId: string) {
  const data = await storefrontApiRequest<any>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });
  const errs = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length) return { success: false };
  return { success: true };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isOpen: false,
      isLoading: false,
      isSyncing: false,
      lastAddedAt: 0,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: async (item) => {
        const { cartId, items, clearCart } = get();
        const existing = items.find((i) => i.variantId === item.variantId);
        set({ isLoading: true });
        try {
          if (!cartId) {
            const res = await createShopifyCart({ ...item, lineId: null });
            if (res) {
              set({
                cartId: res.cartId,
                checkoutUrl: res.checkoutUrl,
                items: [{ ...item, lineId: res.lineId }],
                isOpen: true,
                lastAddedAt: Date.now(),
              });
            }
          } else if (existing) {
            const newQty = existing.quantity + item.quantity;
            if (!existing.lineId) return;
            const res = await updateLine(cartId, existing.lineId, newQty);
            if (res.success) {
              set({
                items: get().items.map((i) =>
                  i.variantId === item.variantId ? { ...i, quantity: newQty } : i
                ),
                isOpen: true,
                lastAddedAt: Date.now(),
              });
            } else if (res.cartNotFound) clearCart();
          } else {
            const res = await addLine(cartId, { ...item, lineId: null });
            if (res.success) {
              set({
                items: [...get().items, { ...item, lineId: res.lineId ?? null }],
                isOpen: true,
                lastAddedAt: Date.now(),
              });
            } else if (res.cartNotFound) clearCart();
          }
        } catch (e) {
          console.error("addItem failed", e);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) return get().removeItem(variantId);
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const res = await updateLine(cartId, item.lineId, quantity);
          if (res.success) {
            set({
              items: get().items.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)),
            });
          } else if (res.cartNotFound) clearCart();
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const res = await removeLine(cartId, item.lineId);
          if (res.success) {
            const next = get().items.filter((i) => i.variantId !== variantId);
            if (next.length === 0) clearCart();
            else set({ items: next });
          } else if (res.cartNotFound) clearCart();
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => get().checkoutUrl,
      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0),

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest<any>(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
        } catch (e) {
          console.error(e);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: "zenflow-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
      }),
    }
  )
);
