import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Leaf } from "lucide-react";
import brandHero from "@/assets/brand-hero.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — ZenFlow" },
      { name: "description", content: "ZenFlow, marque française dédiée au massage, à la récupération et au bien-être quotidien." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Sparkles, t: "Qualité", d: "Des produits sélectionnés, testés sur la durée. Pas de gadget, que des essentiels qui durent." },
  { icon: Heart, t: "Accessibilité", d: "Le bien-être premium ne doit pas être réservé à une élite. Des prix justes, sans intermédiaire." },
  { icon: Leaf, t: "Bien-être", d: "Une routine de 10 min par jour suffit. On vous accompagne, on ne vous noie pas sous le marketing." },
];

function About() {
  return (
    <>
      <section className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs uppercase tracking-wider text-primary">Notre histoire</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Le bien-être, sans compromis ni superflu.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            ZenFlow est né d'un constat simple : le corps moderne souffre. Trop d'écrans, trop de stress, trop de chaises. On a voulu créer une marque française qui propose des outils premium pour libérer les tensions et recharger l'énergie — sans le jargon wellness, sans le snobisme, sans les promesses creuses.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1800&q=80" alt="" className="aspect-[21/9] w-full object-cover" />
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-wider text-primary">Nos valeurs</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Trois piliers, zéro compromis</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.t} className="rounded-2xl border bg-background p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><v.icon size={20} /></div>
                <h3 className="mt-5 text-xl">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl">
            <img src={brandHero} alt="L'univers ZenFlow" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-primary">L'esprit ZenFlow</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Un rituel, pas un gadget.</h2>
            <p className="mt-5 text-muted-foreground">
              Chaque produit ZenFlow est pensé comme un objet de soin du quotidien : matériaux nobles, design épuré, gestes simples. On élimine le superflu pour ne garder que ce qui fonctionne vraiment — le geste, la chaleur, la pression, le souffle.
            </p>
            <p className="mt-3 text-muted-foreground">
              Notre promesse : 10 minutes par jour pour retrouver un corps libre, une tête claire, et l'énergie d'avancer.
            </p>
            <Link to="/boutique" className="btn-primary mt-7 inline-flex">Découvrir la collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
