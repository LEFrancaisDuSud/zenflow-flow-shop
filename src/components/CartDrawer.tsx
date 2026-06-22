import { Link } from "@tanstack/react-router";
import { ExternalLink, Loader2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

function formatPrice(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(amount);
}

export function CartDrawer() {
  const {
    items, isOpen, closeCart, isLoading, isSyncing,
    updateQuantity, removeItem, getCheckoutUrl, syncCart,
  } = useCartStore();
  const total = useCartStore((s) => s.totalPrice());
  const count = useCartStore((s) => s.totalItems());
  const currency = items[0]?.price.currencyCode || "EUR";

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      closeCart();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-display text-xl">Mon panier</h2>
            <p className="text-xs text-muted-foreground">
              {count === 0 ? "Votre panier est vide" : `${count} article${count > 1 ? "s" : ""}`}
            </p>
          </div>
          <button onClick={closeCart} className="rounded-full p-2 hover:bg-accent" aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={36} className="text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">Aucun produit pour l'instant</p>
              <Link to="/boutique" onClick={closeCart} className="btn-primary mt-6">
                Découvrir la boutique
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.variantId} className="grid grid-cols-[64px_minmax(0,1fr)_auto] gap-3">
                  <div className="aspect-square w-16 overflow-hidden rounded-lg bg-muted">
                    {it.image && <img src={it.image} alt={it.productTitle} className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <Link
                      to="/boutique/$slug"
                      params={{ slug: it.productHandle }}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-medium hover:text-primary"
                    >
                      {it.productTitle}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatPrice(parseFloat(it.price.amount), it.price.currencyCode)}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full border">
                      <button
                        onClick={() => updateQuantity(it.variantId, it.quantity - 1)}
                        className="grid h-7 w-7 place-items-center rounded-full hover:bg-accent"
                        aria-label="Diminuer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-xs">{it.quantity}</span>
                      <button
                        onClick={() => updateQuantity(it.variantId, it.quantity + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full hover:bg-accent"
                        aria-label="Augmenter"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(it.variantId)}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-destructive"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                    <span className="text-sm font-semibold">
                      {formatPrice(parseFloat(it.price.amount) * it.quantity, it.price.currencyCode)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t bg-card px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-semibold">{formatPrice(total, currency)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Livraison et taxes calculées à la caisse.</p>
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="btn-primary mt-4 w-full"
            >
              {isLoading || isSyncing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>Passer commande <ExternalLink size={14} /></>
              )}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
