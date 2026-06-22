import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export const Route = createFileRoute("/panier")({
  head: () => ({ meta: [{ title: "Mon panier — ZenFlow" }, { name: "description", content: "Votre panier ZenFlow." }] }),
  component: PanierPage,
});

function PanierPage() {
  const { items, removeItem, updateQty, total } = useCart();
  const [promo, setPromo] = useState("");
  const shipping = total >= 50 || total === 0 ? 0 : 4.9;
  const grand = total + shipping;

  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <ShoppingBag size={56} className="mx-auto text-muted-foreground" />
        <h1 className="mt-6 text-3xl md:text-5xl">Ton panier est vide</h1>
        <p className="mt-3 text-muted-foreground">Découvre nos best-sellers pour libérer ton corps.</p>
        <Link to="/boutique" className="btn-primary mt-8 inline-flex">Voir la boutique <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="container-x py-12 md:py-16">
      <h1 className="text-3xl md:text-5xl">Mon panier</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 rounded-2xl border bg-card p-4">
              <img src={i.image} alt={i.name} className="h-28 w-28 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-primary mt-1">{i.price}€</p>
                  </div>
                  <button onClick={() => removeItem(i.id)} aria-label="Retirer" className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border">
                    <button onClick={() => updateQty(i.id, i.qty - 1)} className="p-2"><Minus size={12} /></button>
                    <span className="w-8 text-center text-sm">{i.qty}</span>
                    <button onClick={() => updateQty(i.id, i.qty + 1)} className="p-2"><Plus size={12} /></button>
                  </div>
                  <span className="font-semibold">{(i.price * i.qty).toFixed(2)}€</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border bg-card p-6">
          <h2 className="text-xl">Récapitulatif</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span>{total.toFixed(2)}€</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Livraison</span><span>{shipping === 0 ? "Offerte" : `${shipping.toFixed(2)}€`}</span></div>
            {shipping > 0 && <p className="text-xs text-muted-foreground">Plus que {(50 - total).toFixed(2)}€ pour la livraison gratuite.</p>}
            <div className="my-3 border-t" />
            <div className="flex justify-between text-base"><span className="font-medium">Total</span><span className="font-semibold">{grand.toFixed(2)}€</span></div>
          </div>

          <div className="mt-5">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Code promo</label>
            <div className="mt-2 flex gap-2">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="ZEN10" className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:border-primary" />
              <button className="rounded-full border px-4 text-sm hover:border-foreground">Appliquer</button>
            </div>
          </div>

          <a href="https://zenflow.myshopify.com/cart" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
            Passer à la caisse →
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">Paiement sécurisé via Shopify</p>
        </aside>
      </div>
    </div>
  );
}
