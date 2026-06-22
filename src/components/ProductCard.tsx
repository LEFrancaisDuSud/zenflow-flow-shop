import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <div className="group relative flex flex-col">
      <Link
        to="/boutique/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden rounded-2xl bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-gold-foreground">
            -{discount}%
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="w-full rounded-full bg-foreground/95 px-4 py-2.5 text-sm font-medium text-background backdrop-blur hover:bg-foreground"
          >
            + Ajouter au panier
          </button>
        </div>
      </Link>

      <div className="mt-4 flex flex-col gap-1.5">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</span>
        <Link to="/boutique/$slug" params={{ slug: product.slug }} className="font-medium leading-snug hover:text-primary">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star size={12} className="fill-gold text-gold" />
          <span>{product.rating}</span>
          <span>·</span>
          <span>{product.reviews} avis</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold">{product.price}€</span>
          <span className="text-sm text-muted-foreground line-through">{product.oldPrice}€</span>
        </div>
      </div>
    </div>
  );
}
