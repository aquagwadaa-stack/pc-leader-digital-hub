import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { StockBadges } from "./StockBadges";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
  onReserve?: (p: Product) => void;
}

export function ProductCard({ product, onReserve }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-card transition hover:shadow-card-hover">
      <Link
        to="/produit/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-surface"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
            Nouveau
          </span>
        )}
        {product.popular && !product.isNew && (
          <span className="absolute left-3 top-3 rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
            Populaire
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand}</p>
          <Link
            to="/produit/$id"
            params={{ id: product.id }}
            className="mt-0.5 line-clamp-2 font-display font-semibold leading-tight hover:text-primary"
          >
            {product.name}
          </Link>
        </div>
        <ul className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
          {product.shortSpecs.map((s) => (
            <li key={s}>• {s}</li>
          ))}
        </ul>
        <StockBadges stock={product.stock} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="text-lg font-bold leading-none text-foreground">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
            )}
          </div>
          <Button size="sm" onClick={() => onReserve?.(product)} className="shrink-0">
            Réserver
          </Button>
        </div>
      </div>
    </article>
  );
}
