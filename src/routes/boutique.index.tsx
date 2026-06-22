import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCT_CATEGORIES, productsQueryOptions } from "@/lib/productQueries";

export const Route = createFileRoute("/boutique/")({
  head: () => ({
    meta: [
      { title: "Boutique — ZenFlow" },
      {
        name: "description",
        content:
          "Découvrez tous les produits ZenFlow : masseurs, ceintures chauffantes, pistolets de récupération, tapis d'acupression.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions()),
  component: Boutique,
});

function Boutique() {
  const { data: products } = useSuspenseQuery(productsQueryOptions());
  const [cat, setCat] = useState("Tous");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filtered = useMemo(() => {
    let list = cat === "Tous" ? products : products.filter((p) => p.node.productType === cat);
    if (sort !== "featured") {
      list = [...list].sort((a, b) => {
        const ap = parseFloat(a.node.priceRange.minVariantPrice.amount);
        const bp = parseFloat(b.node.priceRange.minVariantPrice.amount);
        return sort === "price-asc" ? ap - bp : bp - ap;
      });
    }
    return list;
  }, [products, cat, sort]);

  return (
    <div className="container-x py-10 md:py-16">
      <div className="max-w-2xl">
        <div className="text-[11px] uppercase tracking-[0.16em] text-primary">Boutique</div>
        <h1 className="mt-2 font-display text-4xl leading-tight md:text-6xl">
          Tout pour libérer ton corps
        </h1>
        <p className="mt-4 text-muted-foreground">
          Une sélection resserrée d'outils premium, testés et approuvés. Pas de bazar, que des essentiels.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3.5 py-1.5 text-xs sm:text-sm transition ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-full border bg-background px-4 py-1.5 text-sm self-start sm:self-auto"
        >
          <option value="featured">Mis en avant</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-20 rounded-3xl border bg-card p-16 text-center">
          <p className="font-display text-2xl">Aucun produit pour le moment</p>
          <p className="mt-2 text-sm text-muted-foreground">Revenez bientôt — nous travaillons sur la prochaine collection.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
