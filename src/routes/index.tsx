import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Apple,
  Laptop,
  Smartphone,
  Printer,
  Gamepad2,
  HardDrive,
  MapPin,
  Phone,
  Search,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-store.jpg";
import { products, type Product } from "@/data/products";
import { stores } from "@/data/stores";
import { ProductCard } from "@/components/ProductCard";
import { ReservationModal } from "@/components/ReservationModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PC Leader Caraïbes — Apple, informatique et SAV en Guadeloupe" },
      {
        name: "description",
        content:
          "Revendeur Apple agréé, ordinateurs, téléphones, imprimantes et SAV. 3 magasins en Guadeloupe : Jarry, Dothémare, Le Moule.",
      },
    ],
  }),
  component: HomePage,
});

const shortcutCategories = [
  { id: "apple", name: "Apple", icon: Apple },
  { id: "portables", name: "Portables", icon: Laptop },
  { id: "smartphones", name: "Téléphones", icon: Smartphone },
  { id: "imprimantes", name: "Imprimantes", icon: Printer },
  { id: "consoles", name: "Consoles", icon: Gamepad2 },
  { id: "stockage", name: "Stockage", icon: HardDrive },
] as const;

function HomePage() {
  const [search, setSearch] = useState("");
  const [reserveProduct, setReserveProduct] = useState<Product | null>(null);
  const navigate = useNavigate({ from: "/" });
  const selection = products.filter((p) => p.popular || p.isNew).slice(0, 8);

  return (
    <>
      {/* HERO — simple, une seule promesse */}
      <section className="gradient-hero border-b">
        <div className="container-wide grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0">
            <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              L'informatique en Guadeloupe,
              <span className="block text-primary">en confiance.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Revendeur Apple agréé. Ordinateurs, téléphones, imprimantes et SAV — disponibles
              dans nos 3 magasins.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/catalogue", search: { q: search.trim() } });
              }}
              className="mt-7 flex max-w-xl items-center gap-2 rounded-xl border bg-card p-2 shadow-card"
            >
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="MacBook, iPhone, cartouche…"
                className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none"
              />
              <Button type="submit" size="lg" className="shrink-0 px-5">
                Rechercher
              </Button>
            </form>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Apple className="h-4 w-4 text-primary" /> Apple agréé
              </span>
              <span className="opacity-30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> 3 magasins
              </span>
              <span className="opacity-30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Wrench className="h-4 w-4 text-primary" /> SAV sur place
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border shadow-card-hover">
              <img
                src={heroImg}
                alt="Magasin PC Leader"
                width={1600}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RACCOURCIS CATÉGORIES — 6 max */}
      <section className="container-wide py-14">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {shortcutCategories.map((c) => (
            <Link
              key={c.id}
              to="/catalogue"
              search={{ category: c.id }}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-5 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <c.icon className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium group-hover:text-primary">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SÉLECTION — un seul bloc produits */}
      <section className="container-wide pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Sélection du moment</h2>
            <p className="mt-1 text-muted-foreground">
              Nos produits les plus demandés et nouveautés.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/catalogue">
              Tout le catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {selection.map((p) => (
            <ProductCard key={p.id} product={p} onReserve={setReserveProduct} />
          ))}
        </div>
      </section>

      {/* SAV — bloc unique, pas de double CTA */}
      <section className="border-y bg-secondary text-secondary-foreground">
        <div className="container-wide grid gap-8 py-14 md:grid-cols-[1fr,auto] md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Service après-vente
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold">
              Une panne, un diagnostic, une réparation ?
            </h2>
            <p className="mt-3 max-w-2xl text-secondary-foreground/70">
              PC, Mac, smartphone, tablette, imprimante. Atelier à Jarry, dépôt possible dans
              tous nos magasins.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/sav">
              Demander un diagnostic <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* MAGASINS */}
      <section className="container-wide py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Nos magasins</h2>
            <p className="mt-1 text-muted-foreground">Conseil, retrait, SAV.</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/magasins">
              Détails <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {stores.map((s) => (
            <Link
              key={s.id}
              to="/magasins"
              className="group rounded-xl border bg-card p-6 shadow-card transition hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">{s.shortName}</h3>
                {s.hasSav && (
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    SAV
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.city}</p>
              <p className="mt-3 flex items-start gap-1.5 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {s.address}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-medium">
                <Phone className="h-4 w-4 text-primary" />
                {s.phone}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Voir le magasin <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ReservationModal
        product={reserveProduct}
        open={!!reserveProduct}
        onOpenChange={(v) => !v && setReserveProduct(null)}
      />
    </>
  );
}
