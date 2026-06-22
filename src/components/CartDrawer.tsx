import { Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h3 className="text-xl">Votre panier ({items.length})</h3>
          <button onClick={closeCart} className="rounded-full p-2 hover:bg-accent"><X size={18} /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={48} className="text-muted-foreground" />
            <p className="text-muted-foreground">Votre panier est vide</p>
            <Link to="/boutique" onClick={closeCart} className="btn-primary">Découvrir la boutique</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-4 border-b py-4">
                  <img src={i.image} alt={i.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">{i.name}</p>
                      <button onClick={() => removeItem(i.id)} aria-label="Retirer"><X size={16} className="text-muted-foreground hover:text-foreground" /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border">
                        <button onClick={() => updateQty(i.id, i.qty - 1)} className="p-1.5"><Minus size={12} /></button>
                        <span className="w-6 text-center text-sm">{i.qty}</span>
                        <button onClick={() => updateQty(i.id, i.qty + 1)} className="p-1.5"><Plus size={12} /></button>
                      </div>
                      <span className="font-semibold">{(i.price * i.qty).toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t bg-card px-6 py-5">
              <div className="mb-4 flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="text-lg font-semibold">{total.toFixed(2)}€</span>
              </div>
              <Link to="/panier" onClick={closeCart} className="btn-primary w-full">Voir le panier</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
