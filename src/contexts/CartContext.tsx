import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  addItem: (p: Product, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  lastAddedAt: number;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "zenflow_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const addItem = useCallback((p: Product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image, qty }];
    });
    setLastAddedAt(Date.now());
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => setItems((prev) => prev.filter((x) => x.id !== id)), []);
  const updateQty = useCallback((id: number, qty: number) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))), []);
  const clearCart = useCallback(() => setItems([]), []);

  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const itemCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  const value: CartCtx = {
    items, addItem, removeItem, updateQty, clearCart, total, itemCount,
    isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), lastAddedAt,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
};
