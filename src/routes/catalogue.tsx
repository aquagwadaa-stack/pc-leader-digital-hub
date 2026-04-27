import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ReservationModal } from "@/components/ReservationModal";
import { products, categories, type Product, type CategoryId } from "@/data/products";
import { stores, type StoreId } from "@/data/stores";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "").default(""),
  brand: fallback(z.string(), "").default(""),
  store: fallback(z.string(), "").default(""),
  available: fallback(z.boolean(), false).default(false),
  max: fallback(z.number(), 0).default(0),
});

export const Route = createFileRoute("/catalogue")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Catalogue — PC Leader Caraïbes" },
      { name: "description", content: "Catalogue complet : ordinateurs, Apple, smartphones, écrans, imprimantes, accessoires. Stock par magasin en Guadeloupe." },
    ],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/catalogue" });
  const [reserve, setReserve] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search.q && !`${p.name} ${p.brand}`.toLowerCase().includes(search.q.toLowerCase())) return false;
      if (search.category && p.category !== search.category) return false;
      if (search.brand && p.brand !== search.brand) return false;
      if (search.store && p.stock[search.store as StoreId] === 0 && search.available) return false;
      if (search.available) {
        const total = Object.values(p.stock).reduce((a, b) => a + b, 0);
        if (total === 0) return false;
        if (search.store && p.stock[search.store as StoreId] === 0) return false;
      } else if (search.store) {
        // store filter without available => still show but rank
      }
      if (search.max > 0 && (p.price ?? 0) > search.max) return false;
      return true;
    });
  }, [search]);

  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const reset = () => navigate({ search: { q: "", category: "", brand: "", store: "", available: false, max: 0 } });

  const activeCount = [search.q, search.category, search.brand, search.store, search.available, search.max].filter(Boolean).length;

  return (
    <div className="container-wide py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold">Catalogue</h1>
        <p className="mt-1 text-muted-foreground">{filtered.length} produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</p>
      </div>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          defaultValue={search.q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder="Rechercher un produit, une marque…"
          className="h-11 w-full rounded-lg border bg-card pl-9 pr-3 text-sm shadow-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        onClick={() => setFiltersOpen((v) => !v)}
        className="mb-4 inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium md:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" /> Filtres {activeCount > 0 && `(${activeCount})`}
      </button>

      <div className="grid gap-6 md:grid-cols-[260px,1fr]">
        <aside className={`${filtersOpen ? "block" : "hidden"} md:block`}>
          <div className="sticky top-32 space-y-5 rounded-xl border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">Filtres</h3>
              {activeCount > 0 && (
                <button onClick={reset} className="text-xs text-primary hover:underline">Réinitialiser</button>
              )}
            </div>

            <FilterGroup label="Catégorie">
              <RadioPill name="category" value="" current={search.category} label="Toutes" onChange={(v) => update({ category: v as CategoryId | "" })} />
              {categories.map((c) => (
                <RadioPill key={c.id} name="category" value={c.id} current={search.category} label={c.name} onChange={(v) => update({ category: v as CategoryId | "" })} />
              ))}
            </FilterGroup>

            <FilterGroup label="Marque">
              <select
                value={search.brand}
                onChange={(e) => update({ brand: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="">Toutes les marques</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </FilterGroup>

            <FilterGroup label="Magasin">
              <RadioPill name="store" value="" current={search.store} label="Tous" onChange={(v) => update({ store: v })} />
              {stores.map((s) => (
                <RadioPill key={s.id} name="store" value={s.id} current={search.store} label={s.shortName} onChange={(v) => update({ store: v })} />
              ))}
            </FilterGroup>

            <FilterGroup label="Prix maximum">
              <input
                type="range" min={0} max={2000} step={50}
                value={search.max || 2000}
                onChange={(e) => update({ max: Number(e.target.value) === 2000 ? 0 : Number(e.target.value) })}
                className="w-full accent-primary"
              />
              <p className="text-xs text-muted-foreground">{search.max > 0 ? `Jusqu'à ${search.max} €` : "Sans limite"}</p>
            </FilterGroup>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={search.available}
                onChange={(e) => update({ available: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              Disponible uniquement
            </label>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center shadow-card">
              <X className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 font-display text-lg font-semibold">Aucun produit trouvé</p>
              <p className="mt-1 text-sm text-muted-foreground">Essayez d'élargir vos critères ou contactez-nous.</p>
              <Button onClick={reset} className="mt-4" variant="outline">Réinitialiser les filtres</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onReserve={setReserve} />
              ))}
            </div>
          )}
        </div>
      </div>

      <ReservationModal product={reserve} open={!!reserve} onOpenChange={(v) => !v && setReserve(null)} />
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function RadioPill({ name, value, current, label, onChange }: {
  name: string; value: string; current: string; label: string; onChange: (v: string) => void;
}) {
  const active = value === current;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition ${
        active ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary/50"
      }`}
      data-name={name}
    >
      {label}
    </button>
  );
}
