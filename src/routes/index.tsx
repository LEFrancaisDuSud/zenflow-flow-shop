import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Headphones, Leaf, Lock, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { productsQueryOptions } from "@/lib/productQueries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZenFlow — Libère ton corps, recharge ton énergie" },
      {
        name: "description",
        content: "Masseurs, ceintures chauffantes, pistolets de récupération. Le meilleur du bien-être à domicile, livré en France.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions()),
  component: Home,
});

const trust = [
  { icon: Truck, title: "Livraison offerte", sub: "Dès 50€ en France" },
  { icon: ShieldCheck, title: "Satisfait ou remboursé", sub: "30 jours" },
  { icon: Lock, title: "Paiement sécurisé", sub: "CB, PayPal, Apple Pay" },
  { icon: Headphones, title: "Support 7j/7", sub: "Réponse < 24h" },
];

function Home() {
  const { data: products } = useSuspenseQuery(productsQueryOptions());
  const bestSellers = products.slice(0, 6);
  const heroProduct = products[0];

  return (
    <>
      {/* HERO */}
      <section className="container-x grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-20">
        <div className="animate-fade-up order-2 md:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <Sparkles size={12} className="text-gold" /> Nouvelle collection 2026
          </div>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
            Libère ton corps,<br />
            <span className="text-primary italic">recharge</span> ton énergie.
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
            Des outils de massage et de récupération pensés pour le rythme moderne — télétravail, sport, sommeil.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/boutique" className="btn-primary">
              Découvrir la collection <ArrowRight size={16} />
            </Link>
            <a href="#comment" className="btn-outline">Comment ça marche</a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
            </div>
            <span>Livraison soignée · Livraison rapide</span>
          </div>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
            {heroProduct?.node.images.edges[0]?.node ? (
              <img
                src={heroProduct.node.images.edges[0].node.url}
                alt={heroProduct.node.title}
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div className="aspect-[4/5] w-full bg-muted" />
            )}
            {heroProduct && (
              <Link
                to="/boutique/$slug"
                params={{ slug: heroProduct.node.handle }}
                className="absolute bottom-4 left-4 right-4 rounded-2xl bg-background/90 p-4 backdrop-blur hover:bg-background"
              >
                <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Best-seller</div>
                <div className="mt-1 flex items-end justify-between gap-3">
                  <div className="font-medium truncate">{heroProduct.node.title}</div>
                  <div className="font-semibold text-primary shrink-0">
                    {parseFloat(heroProduct.node.priceRange.minVariantPrice.amount).toFixed(0)}€
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full bg-gold/30 blur-2xl md:block" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y bg-card">
        <div className="container-x grid grid-cols-2 gap-5 py-7 md:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <t.icon size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{t.title}</div>
                <div className="text-xs text-muted-foreground truncate">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-x py-14 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-primary">Best-sellers</div>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">Les chouchous de la communauté</h2>
          </div>
          <Link to="/boutique" className="hidden whitespace-nowrap text-sm font-medium text-primary hover:underline sm:inline">
            Tout voir →
          </Link>
        </div>
        {bestSellers.length === 0 ? (
          <div className="rounded-3xl border bg-card p-12 text-center text-muted-foreground">
            Aucun produit disponible.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3">
            {bestSellers.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="bg-card py-14 md:py-24">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-primary">Pourquoi ZenFlow</div>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">
              Le rituel quotidien<br /><em className="text-primary">qui change tout.</em>
            </h2>
            <p className="mt-5 text-muted-foreground">
              10 minutes par jour. C'est tout ce qu'il faut pour relâcher les tensions accumulées, retrouver une posture, et finir la journée plus léger qu'au matin.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { i: Leaf, t: "Matériaux durables" },
                { i: ShieldCheck, t: "Testés en France" },
                { i: Truck, t: "Livraison 4-10 jours" },
                { i: Headphones, t: "Support humain" },
              ].map(({ i: Icon, t }) => (
                <li key={t} className="flex items-center gap-2 text-sm">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary"><Icon size={14} /></span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/a-propos" className="btn-outline mt-8 inline-flex">Notre histoire</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(1, 5).map((p, i) => (
              <Link
                key={p.node.id}
                to="/boutique/$slug"
                params={{ slug: p.node.handle }}
                className={`overflow-hidden rounded-2xl bg-muted ${i % 2 === 0 ? "translate-y-6" : ""}`}
              >
                {p.node.images.edges[0]?.node && (
                  <img src={p.node.images.edges[0].node.url} alt={p.node.title} className="aspect-square w-full object-cover transition hover:scale-105" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="comment" className="container-x py-14 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] uppercase tracking-[0.16em] text-primary">Comment ça marche</div>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">3 étapes vers le bien-être</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { n: "01", t: "Choisis ton outil", d: "Parcours notre sélection — cervical, lombaire, sport, sommeil." },
            { n: "02", t: "Reçois en 4-10 jours", d: "Livraison soignée, gratuite dès 50€ partout en France." },
            { n: "03", t: "Ressens la différence", d: "Une routine de 10 min suffit pour libérer tensions et énergie." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border bg-card p-7">
              <div className="font-display text-5xl text-primary/30">{s.n}</div>
              <h3 className="mt-4 text-xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-x pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-foreground px-6 py-12 text-background md:px-14 md:py-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl text-background md:text-5xl">-10% sur ta première commande.</h2>
            <p className="mt-3 text-background/80">Reçois nos routines, conseils récupération et ventes privées.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                placeholder="ton@email.fr"
                className="flex-1 rounded-full border border-background/30 bg-background/10 px-5 py-3 text-sm placeholder:text-background/50 outline-none focus:border-gold"
              />
              <button className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground hover:brightness-105">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
