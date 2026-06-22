import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, Lock, Headphones, ArrowRight, Star, Sparkles } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZenFlow — Libère ton corps, recharge ton énergie" },
      { name: "description", content: "Masseurs, ceintures chauffantes, pistolets de récupération. Le meilleur du bien-être à domicile, livré en France." },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: Truck, title: "Livraison offerte", sub: "Dès 50€ en France" },
  { icon: ShieldCheck, title: "Satisfait ou remboursé", sub: "30 jours" },
  { icon: Lock, title: "Paiement sécurisé", sub: "CB, PayPal, Apple Pay" },
  { icon: Headphones, title: "Support 7j/7", sub: "Réponse < 24h" },
];

const testimonials = [
  { name: "Camille L.", city: "Paris", text: "Le masseur cervical a changé mes journées en télétravail. Plus de tensions le soir." },
  { name: "Julien M.", city: "Lyon", text: "Pistolet de massage top qualité, je m'en sers après chaque séance de running." },
  { name: "Sophie B.", city: "Bordeaux", text: "La ceinture lombaire chauffante est devenue indispensable. Livraison rapide, packaging soigné." },
  { name: "Maxime D.", city: "Toulouse", text: "Service client réactif, et le coussin shiatsu vaut chaque euro. Je recommande." },
  { name: "Élodie R.", city: "Nantes", text: "Une vraie marque française premium, ça change des produits Amazon sans âme." },
];

function Home() {
  const bestSellers = products.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="container-x grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <Sparkles size={12} className="text-gold" /> Nouvelle collection 2026
          </div>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-7xl">
            Libère ton corps,<br /><span className="text-primary italic">recharge</span> ton énergie.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Des outils de massage et de récupération pensés pour le rythme moderne — télétravail, sport, sommeil.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/boutique" className="btn-primary">Découvrir la collection <ArrowRight size={16} /></Link>
            <a href="#comment" className="btn-outline">Comment ça marche</a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
            </div>
            <span><strong className="text-foreground">4.8/5</strong> · 2 300+ clients satisfaits</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80" alt="ZenFlow lifestyle" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-background/90 p-4 backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Best-seller</div>
              <div className="mt-1 flex items-end justify-between">
                <div className="font-medium">Masseur Cervical Bionique Pro</div>
                <div className="font-semibold text-primary">109€</div>
              </div>
            </div>
          </div>
          <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full bg-gold/30 blur-2xl md:block" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y bg-card">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><t.icon size={18} /></div>
              <div>
                <div className="text-sm font-semibold">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-x py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary">Best-sellers</div>
            <h2 className="mt-2 text-3xl md:text-5xl">Les chouchous de la communauté</h2>
          </div>
          <Link to="/boutique" className="hidden text-sm font-medium text-primary hover:underline sm:inline">Tout voir →</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="comment" className="bg-card py-16 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-wider text-primary">Comment ça marche</div>
            <h2 className="mt-2 text-3xl md:text-5xl">3 étapes vers le bien-être</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Choisis ton outil", d: "Parcours notre sélection — cervical, lombaire, sport, sommeil." },
              { n: "02", t: "Reçois en 48-72h", d: "Livraison soignée, gratuite dès 50€ partout en France." },
              { n: "03", t: "Ressens la différence", d: "Une routine de 10 min suffit pour libérer tensions et énergie." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border bg-background p-7">
                <div className="font-display text-5xl text-primary/30">{s.n}</div>
                <h3 className="mt-4 text-xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-wider text-primary">Témoignages</div>
          <h2 className="mt-2 text-3xl md:text-5xl">Ils ont retrouvé leur énergie</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border bg-card p-6">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}</div>
              <p className="mt-3 text-sm leading-relaxed">"{t.text}"</p>
              <div className="mt-4 text-xs text-muted-foreground">{t.name} — {t.city}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-x pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-foreground px-6 py-14 text-background md:px-14 md:py-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl text-background md:text-5xl">-10% sur ta première commande.</h2>
            <p className="mt-3 text-background/80">Reçois nos routines, conseils récupération et ventes privées.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-md gap-2">
              <input type="email" required placeholder="ton@email.fr" className="flex-1 rounded-full border border-background/30 bg-background/10 px-5 py-3 text-sm placeholder:text-background/50 outline-none focus:border-gold" />
              <button className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground hover:brightness-105">S'inscrire</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
