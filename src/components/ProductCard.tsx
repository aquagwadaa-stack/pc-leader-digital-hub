import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { StockBadges } from "./StockBadges";
import { Button } from "@/components/ui/button";
import fallbackProductImage from "@/assets/hero-store.jpg";

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
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackProductImage;
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              Nouveau
            </span>
          )}
          {product.oldPrice && (
            <span className="rounded-md bg-warning px-2 py-0.5 text-xs font-semibold text-warning-foreground">
              Promo
            </span>
          )}
          {product.popular && !product.isNew && !product.oldPrice && (
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
              Populaire
            </span>
          )}
        </div>
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
            <p className="text-lg font-bold leading-none text-foreground">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </p>
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
