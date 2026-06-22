import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/boutique/")({
  head: () => ({
    meta: [
      { title: "Boutique — ZenFlow" },
      { name: "description", content: "Découvre tous les produits ZenFlow : masseurs, ceintures chauffantes, pistolets de récupération, tapis d'acupression." },
    ],
  }),
  component: Boutique,
});

function Boutique() {
  const [cat, setCat] = useState("Tous");
  const filtered = cat === "Tous" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="container-x py-12 md:py-16">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-wider text-primary">Boutique</div>
        <h1 className="mt-2 text-4xl md:text-6xl">Tout pour libérer ton corps</h1>
        <p className="mt-4 text-muted-foreground">Une sélection resserrée d'outils premium, testés et approuvés. Pas de bazar, que des essentiels.</p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-2 text-sm transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
