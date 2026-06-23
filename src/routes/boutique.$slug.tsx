import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Check, ChevronRight, Flame, Loader2, Minus, Package, Plus, RotateCcw, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { productByHandleQueryOptions, productsQueryOptions } from "@/lib/productQueries";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/boutique/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — ZenFlow` },
      { name: "description", content: "Découvrez ce produit ZenFlow, pensé pour libérer votre corps." },
    ],
  }),
  loader: async ({ params, context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(productByHandleQueryOptions(params.slug)),
      context.queryClient.ensureQueryData(productsQueryOptions()),
    ]);
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl">Produit introuvable</h1>
      <Link to="/boutique" className="btn-primary mt-6">Retour à la boutique</Link>
    </div>
  ),
});

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency, maximumFractionDigits: 0 }).format(parseFloat(amount));
}

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data: product } = useSuspenseQuery(productByHandleQueryOptions(slug));
  const { data: all } = useSuspenseQuery(productsQueryOptions());

  if (!product) throw notFound();

  const variant = product.variants.edges[0]?.node;
  const images = product.images.edges.map((e) => e.node);
  const [activeImg, setActiveImg] = useState(images[0]?.url);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [tab, setTab] = useState<"desc" | "ship">("desc");
  const addItem = useCartStore((s) => s.addItem);

  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice ?? null;
  const discount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount)
    ? Math.round(((parseFloat(compareAt.amount) - parseFloat(price.amount)) / parseFloat(compareAt.amount)) * 100)
    : 0;

  const related = all
    .filter((p) => p.node.handle !== product.handle && p.node.productType === product.productType)
    .slice(0, 3);
  const finalRelated = related.length >= 3
    ? related
    : [...related, ...all.filter((p) => p.node.handle !== product.handle && !related.includes(p))].slice(0, 3);

  const handleAdd = async () => {
    if (!variant) return;
    setAdding(true);
    await addItem({
      variantId: variant.id,
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: variant.title,
      image: images[0]?.url ?? null,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions || [],
    });
    setAdding(false);
  };

  return (
    <div className="container-x py-6 md:py-12">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-hidden">
        <Link to="/" className="hover:text-primary">Accueil</Link>
        <ChevronRight size={12} />
        <Link to="/boutique" className="hover:text-primary">Boutique</Link>
        <ChevronRight size={12} />
        <span className="truncate text-foreground">{product.title}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-3xl bg-muted">
            {activeImg && <img src={activeImg} alt={product.title} className="aspect-square w-full object-cover" />}
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((img) => (
                <button
                  key={img.url}
                  onClick={() => setActiveImg(img.url)}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    activeImg === img.url ? "border-primary" : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={img.url} alt={img.altText ?? ""} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:pl-4">
          <div className="text-[11px] uppercase tracking-[0.16em] text-primary">{product.productType}</div>
          <h1 className="mt-2 font-display text-3xl leading-tight md:text-5xl">{product.title}</h1>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{formatPrice(price.amount, price.currencyCode)}</span>
            {compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(compareAt.amount, compareAt.currencyCode)}
                </span>
                <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          {product.tags.length > 0 && (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {product.tags.slice(0, 4).map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm capitalize">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check size={12} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center self-start rounded-full border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3" aria-label="-"><Minus size={14} /></button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3" aria-label="+"><Plus size={14} /></button>
            </div>
            <button
              onClick={handleAdd}
              disabled={adding || !variant?.availableForSale}
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {adding ? <Loader2 size={16} className="animate-spin" /> : (
                <>Ajouter au panier — {formatPrice(String(parseFloat(price.amount) * qty), price.currencyCode)}</>
              )}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border bg-card p-4 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2"><Truck size={16} className="text-primary" /> Livraison 48-72h</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> Satisfait ou remboursé 30j</div>
          </div>

          <div className="mt-10 border-t pt-6">
            <div className="flex gap-6 border-b text-sm">
              {([
                { k: "desc", l: "Description" },
                { k: "ship", l: "Livraison & retours" },
              ] as const).map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`-mb-px border-b-2 px-1 py-3 transition ${
                    tab === t.k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.l}
                </button>
              ))}
            </div>
            <div className="py-5 text-sm leading-relaxed text-muted-foreground">
              {tab === "desc" && <p>{product.description}</p>}
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

      {finalRelated.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl">Vous aimerez aussi</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {finalRelated.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
