import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus, Star, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import { getProduct, products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";

export const Route = createFileRoute("/boutique/$slug")({
  head: ({ params }) => {
    const p = getProduct(params.slug);
    return {
      meta: [
        { title: p ? `${p.name} — ZenFlow` : "Produit — ZenFlow" },
        { name: "description", content: p?.description.slice(0, 155) ?? "Découvrez ce produit ZenFlow." },
        { property: "og:title", content: p?.name ?? "ZenFlow" },
        { property: "og:description", content: p?.description.slice(0, 155) ?? "" },
        { property: "og:image", content: p?.image ?? "" },
        { name: "twitter:image", content: p?.image ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl">Produit introuvable</h1>
      <Link to="/boutique" className="btn-primary mt-6">Retour à la boutique</Link>
    </div>
  ),
});

function ProductDetail() {
  const product = Route.useLoaderData() as ReturnType<typeof getProduct> & {};
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "spec" | "ship">("desc");

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fallbackRelated = related.length >= 3 ? related : [...related, ...products.filter((p) => p.id !== product.id && !related.includes(p))].slice(0, 3);

  return (
    <div className="container-x py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Accueil</Link>
        <ChevronRight size={12} />
        <Link to="/boutique" className="hover:text-primary">Boutique</Link>
        <ChevronRight size={12} />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-3xl bg-muted">
            <img src={activeImg} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImg(img)}
                className={`overflow-hidden rounded-xl border-2 ${activeImg === img ? "border-primary" : "border-transparent"}`}
              >
                <img src={img} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:pl-4">
          <div className="text-xs uppercase tracking-wider text-primary">{product.category}</div>
          <h1 className="mt-2 text-3xl md:text-5xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className={i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted"} />)}</div>
            <span>{product.rating}</span>
            <span>·</span>
            <span>{product.reviews} avis vérifiés</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{product.price}€</span>
            <span className="text-lg text-muted-foreground line-through">{product.oldPrice}€</span>
            {discount > 0 && <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground">-{discount}%</span>}
          </div>

          <p className="mt-5 text-muted-foreground">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary"><Check size={12} /></span>
                {b}
              </li>
            ))}
          </ul>

          {/* Quantity + add */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-full border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3"><Minus size={14} /></button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3"><Plus size={14} /></button>
            </div>
            <button onClick={() => addItem(product, qty)} className="btn-primary flex-1 sm:flex-none">Ajouter au panier — {(product.price * qty).toFixed(0)}€</button>
          </div>

          {/* SHOPIFY BUY BUTTON ZONE
            To connect this product to Shopify:
            1. In Shopify Admin → Sales Channels → Buy Button
            2. Create a Buy Button for this product
            3. Copy the embed script generated by Shopify
            4. Replace the div below with the embed code
            Shopify checkout fallback URL:
            https://zenflow.myshopify.com/products/{product.slug}
          */}
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shopify Buy Button</div>
            <div id={`shopify-buy-btn-${product.shopifyEmbedId}`} className="shopify-embed-zone my-2">
              Zone d'intégration Shopify Buy Button — remplacez cette div par le script généré dans Shopify Admin.
            </div>
            <a
              href={`https://zenflow.myshopify.com/products/${product.slug}`}
              className="btn-primary w-full text-center mt-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acheter sur Shopify →
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border bg-card p-4 text-sm">
            <div className="flex items-center gap-2"><Truck size={16} className="text-primary" /> Livraison 48-72h</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> Retour 30j</div>
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t pt-6">
            <div className="flex gap-6 border-b text-sm">
              {[
                { k: "desc", l: "Description" },
                { k: "spec", l: "Caractéristiques" },
                { k: "ship", l: "Livraison & retours" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k as typeof tab)}
                  className={`-mb-px border-b-2 px-1 py-3 ${tab === t.k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {t.l}
                </button>
              ))}
            </div>
            <div className="py-5 text-sm text-muted-foreground leading-relaxed">
              {tab === "desc" && <p>{product.description}</p>}
              {tab === "spec" && (
                <ul className="space-y-2">
                  {product.benefits.map((b) => <li key={b}>• {b}</li>)}
                </ul>
              )}
              {tab === "ship" && (
                <div className="space-y-2">
                  <p>Livraison gratuite en France métropolitaine dès 50€ d'achat. Sinon 4,90€.</p>
                  <p>Expédié sous 24h, livré sous 48-72h via Colissimo / Mondial Relay.</p>
                  <p>Retours offerts pendant 30 jours, satisfait ou remboursé.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-20">
        <h2 className="text-2xl md:text-3xl">Vous aimerez aussi</h2>
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {fallbackRelated.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
