import { Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency, maximumFractionDigits: 0 }).format(
    parseFloat(amount)
  );
}

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const [adding, setAdding] = useState(false);

  const price = variant?.price ?? node.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice ?? node.compareAtPriceRange?.minVariantPrice ?? null;
  const discount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount)
      ? Math.round(
          ((parseFloat(compareAt.amount) - parseFloat(price.amount)) / parseFloat(compareAt.amount)) * 100
        )
      : 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant || adding) return;
    setAdding(true);
    await addItem({
      variantId: variant.id,
      productHandle: node.handle,
      productTitle: node.title,
      variantTitle: variant.title,
      image: image?.url ?? null,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setAdding(false);
  };

  return (
    <div className="group relative flex flex-col">
      <Link
        to="/boutique/$slug"
        params={{ slug: node.handle }}
        className="relative block aspect-square overflow-hidden rounded-2xl bg-muted"
      >
        {image && (
          <img
            src={image.url}
            alt={image.altText ?? node.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-gold-foreground">
            -{discount}%
          </span>
        )}
        <button
          onClick={handleAdd}
          disabled={adding || !variant?.availableForSale}
          aria-label="Ajouter au panier"
          className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition hover:bg-primary disabled:opacity-60 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
        >
          {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        </button>
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {node.productType || node.vendor}
        </span>
        <Link
          to="/boutique/$slug"
          params={{ slug: node.handle }}
          className="font-medium leading-snug hover:text-primary line-clamp-2"
        >
          {node.title}
        </Link>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold">{formatPrice(price.amount, price.currencyCode)}</span>
          {compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
