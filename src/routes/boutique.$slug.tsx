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
  useEffect(() => { setActiveImg(images[0]?.url); }, [product.handle, images]);
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

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* GALLERY */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-muted ring-1 ring-border/60 shadow-[var(--shadow-soft)]">
            {discount > 0 && (
              <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground shadow-lg">
                <Flame size={12} /> -{discount}%
              </div>
            )}
            <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-background/85 px-3 py-1 text-[11px] font-medium backdrop-blur">
              <Sparkles size={12} className="text-primary" /> Best-seller
            </div>
            {activeImg && (
              <img
                key={activeImg}
                src={activeImg}
                alt={product.title}
                className="aspect-square w-full object-cover animate-fade-up"
              />
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-2">
              {images.map((img) => (
                <button
                  key={img.url}
                  onClick={() => setActiveImg(img.url)}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    activeImg === img.url ? "border-primary scale-[0.97]" : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={img.url} alt={img.altText ?? ""} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-primary">
            <span className="h-px w-6 bg-primary/40" />
            {product.productType}
          </div>
          <h1 className="mt-3 font-display text-3xl leading-[1.05] md:text-5xl">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
            </div>
            <span>4.9 · Recommandé par notre communauté</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl text-primary">{formatPrice(price.amount, price.currencyCode)}</span>
            {compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(compareAt.amount, compareAt.currencyCode)}
                </span>
                <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground">
                  Économise {formatPrice(String(parseFloat(compareAt.amount) - parseFloat(price.amount)), price.currencyCode)}
                </span>
              </>
            )}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">ou 3× {formatPrice(String(parseFloat(price.amount) / 3), price.currencyCode)} sans frais</div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

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

          {/* URGENCY */}
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-gold/30 bg-gold/5 px-4 py-2.5 text-sm">
            <Flame size={14} className="text-gold" />
            <span className="text-foreground">Stock limité —</span>
            <span className="text-muted-foreground">expédié sous 24h</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center self-start rounded-full border bg-card">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-primary" aria-label="-"><Minus size={14} /></button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-primary" aria-label="+"><Plus size={14} /></button>
            </div>
            <button
              onClick={handleAdd}
              disabled={adding || !variant?.availableForSale}
              className="group relative flex-1 overflow-hidden rounded-full bg-gold px-6 py-4 text-sm font-semibold text-gold-foreground shadow-[0_10px_30px_-12px_oklch(0.78_0.14_78/0.7)] transition hover:brightness-110 disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative inline-flex items-center justify-center gap-2">
                {adding ? <Loader2 size={16} className="animate-spin" /> : (
                  <>Ajouter au panier · {formatPrice(String(parseFloat(price.amount) * qty), price.currencyCode)}</>
                )}
              </span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border bg-card p-3 text-center text-[11px]">
            <div className="flex flex-col items-center gap-1 px-1">
              <Truck size={18} className="text-primary" />
              <span className="font-medium">Livraison 48h</span>
              <span className="text-muted-foreground">Gratuite dès 50€</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x px-1">
              <RotateCcw size={18} className="text-primary" />
              <span className="font-medium">Retours 30j</span>
              <span className="text-muted-foreground">Sans frais</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-1">
              <ShieldCheck size={18} className="text-primary" />
              <span className="font-medium">Garantie 2 ans</span>
              <span className="text-muted-foreground">SAV en France</span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-muted/40 p-3 text-xs text-muted-foreground">
            <Package size={16} className="text-primary shrink-0" />
            Commande avant 14h ? Expédiée aujourd'hui depuis nos entrepôts français.
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
