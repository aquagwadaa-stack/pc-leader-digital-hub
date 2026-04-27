import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  AppWindow,
  Apple,
  ArrowRight,
  Award,
  BadgeCheck,
  Clock,
  Cpu,
  Droplet,
  Gamepad2,
  HardDrive,
  Laptop,
  MapPin,
  Monitor,
  Mouse,
  Phone,
  Plug,
  Printer,
  Projector,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tablet,
  Tags,
  Wifi,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-store.jpg";
import { categories, products, type Product } from "@/data/products";
import { stores } from "@/data/stores";
import { ProductCard } from "@/components/ProductCard";
import { ReservationModal } from "@/components/ReservationModal";

const categoryIconMap: Record<string, React.ElementType> = {
  portables: Laptop,
  bureau: Monitor,
  apple: Apple,
  smartphones: Smartphone,
  tablettes: Tablet,
  ecrans: Monitor,
  imprimantes: Printer,
  consoles: Gamepad2,
  accessoires: Mouse,
  stockage: HardDrive,
  reseau: Wifi,
  logiciels: AppWindow,
  encres: Droplet,
  pieces: Cpu,
  videoprojecteurs: Projector,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PC Leader Caraïbes — Revendeur Apple agréé et informatique en Guadeloupe" },
      {
        name: "description",
        content:
          "PC Leader Caraïbes : revendeur agréé Apple, informatique, téléphonie, multimédia, pièces détachées, consommables et SAV en Guadeloupe.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [search, setSearch] = useState("");
  const [reserveProduct, setReserveProduct] = useState<Product | null>(null);
  const navigate = useNavigate({ from: "/" });
  const featured = products.filter((p) => p.isNew || p.oldPrice || p.popular).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="gradient-hero">
        <div className="container-wide grid gap-10 py-12 md:py-20 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              Revendeur agréé Apple · Informatique en Guadeloupe depuis 1998
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Le magasin high-tech local,
              <br />
              <span className="text-primary">enfin représenté correctement.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Apple, PC portables, téléphones, imprimantes, consoles, pièces détachées et
              consommables. Une vitrine claire avec nouveautés, promotions, stock par magasin et
              SAV.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/catalogue", search: { q: search.trim() } });
              }}
              className="mt-6 flex max-w-xl min-w-0 items-center gap-2 rounded-xl border bg-card p-2 shadow-card"
            >
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Que cherchez-vous ? (ex : MacBook Air, cartouche HP)"
                className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none"
              />
              <Button type="submit" size="lg" className="shrink-0 px-4">
                Rechercher
              </Button>
            </form>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <QuickAction
                to="/catalogue"
                search={{ category: "apple" }}
                icon={Apple}
                label="Apple agréé"
              />
              <QuickAction
                to="/catalogue"
                search={{ newOnly: true }}
                icon={Sparkles}
                label="Nouveautés"
              />
              <QuickAction to="/catalogue" search={{ promo: true }} icon={Tags} label="Promos" />
              <QuickAction to="/sav" icon={Wrench} label="SAV" />
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
            <div className="absolute -bottom-6 -left-4 hidden rounded-xl border bg-card p-4 shadow-card sm:block lg:-left-8">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-success/15 text-success">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">SAV Jarry & Dothémare</p>
                  <p className="text-xs text-muted-foreground">Diagnostic après dépôt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="border-y bg-card">
        <div className="container-wide grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <Trust
            icon={Award}
            title="Depuis 1998"
            desc="Enseigne informatique installée localement"
          />
          <Trust icon={Apple} title="Apple agréé" desc="Mac, iPhone, iPad, Watch et AirPods" />
          <Trust icon={MapPin} title="3 magasins" desc="Jarry, Dothémare, Le Moule" />
          <Trust icon={Wrench} title="SAV & réparations" desc="Dépôt possible en magasin" />
        </div>
      </section>

      {/* APPLE */}
      <section className="border-b bg-secondary text-secondary-foreground">
        <div className="container-wide grid gap-6 py-10 md:grid-cols-[1fr,auto] md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              <Apple className="h-3.5 w-3.5" />
              Produits Apple · Revendeur agréé
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Une entrée Apple assumée, comme sur le site officiel actuel.
            </h2>
            <p className="mt-2 max-w-2xl text-secondary-foreground/70">
              Mac, MacBook, iPad, iPhone, Watch et AirPods sont regroupés dans un univers clair,
              avec les disponibilités par magasin et une demande de réservation.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/catalogue" search={{ category: "apple" }}>
              Voir l'univers Apple <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="container-wide py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Catégories</h2>
            <p className="mt-1 text-muted-foreground">Tout l'univers informatique et high-tech.</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/catalogue">
              Voir tout <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/catalogue"
              search={{ category: c.id }}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              {(() => {
                const Icon = categoryIconMap[c.id] || Plug;
                return <Icon className="h-6 w-6 text-primary" />;
              })()}
              <span className="text-xs font-medium leading-tight group-hover:text-primary">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* NOUVEAUTÉS & PROMOS */}
      <section className="container-wide pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Nouveautés & promotions</h2>
            <p className="mt-1 text-muted-foreground">
              Deux entrées déjà présentes dans l'univers PC Leader, mais plus lisibles.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/catalogue" search={{ newOnly: true }}>
              Voir les nouveautés
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onReserve={setReserveProduct} />
          ))}
        </div>
      </section>

      {/* DOUBLE CTA RÉSERVER / SAV */}
      <section className="container-wide pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          <CtaCard
            tag="Click & Collect simplifié"
            title="Réservez en magasin"
            desc="Choisissez votre produit, votre magasin, on vous rappelle pour confirmer la disponibilité. Aucun paiement en ligne."
            cta="Voir le catalogue"
            to="/catalogue"
            icon={ShoppingBag}
          />
          <CtaCard
            tag="SAV & Réparation"
            title="Besoin d'un diagnostic ou d'une réparation ?"
            desc="PC, smartphone, tablette, imprimante. Atelier à Jarry, dépôt possible dans tous nos magasins."
            cta="Demander un diagnostic"
            to="/sav"
            icon={Wrench}
            dark
          />
        </div>
      </section>

      {/* MAGASINS */}
      <section className="container-wide pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Nos 3 magasins en Guadeloupe</h2>
            <p className="mt-1 text-muted-foreground">Conseil, retrait, SAV.</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/magasins">
              Détails <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
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
              <p className="mt-2 flex items-start gap-1.5 text-sm">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {s.hours[0].value}
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

      {/* CONTACT BANNER */}
      <section className="container-wide pb-20">
        <div className="overflow-hidden rounded-2xl border bg-secondary text-secondary-foreground">
          <div className="grid gap-6 p-8 md:grid-cols-[1fr,auto] md:items-center md:p-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Conseil en magasin
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Un doute sur un produit, une panne ou une disponibilité ?
              </h2>
              <p className="mt-3 max-w-2xl text-secondary-foreground/70">
                La démo privilégie le contact direct : appel, email, réservation et passage en
                magasin. C'est plus fidèle à une enseigne locale déjà connue.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  <ShoppingBag className="h-4 w-4" /> Contacter le magasin
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
              >
                <a href="tel:0590326363">
                  <Phone className="h-4 w-4" /> 05 90 32 63 63
                </a>
              </Button>
            </div>
          </div>
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

type AppRoute = "/" | "/catalogue" | "/sav" | "/magasins" | "/contact";

function QuickAction({
  to,
  search,
  icon: Icon,
  label,
}: {
  to: AppRoute;
  search?: Record<string, string | boolean>;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <Link
      to={to}
      search={search as never}
      className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm font-medium shadow-card transition hover:border-primary hover:text-primary"
    >
      <Icon className="h-4 w-4 text-primary" />
      {label}
    </Link>
  );
}

function Trust({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function CtaCard({
  tag,
  title,
  desc,
  cta,
  to,
  icon: Icon,
  dark,
}: {
  tag: string;
  title: string;
  desc: string;
  cta: string;
  to: AppRoute;
  icon: React.ElementType;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-8 shadow-card ${dark ? "bg-secondary text-secondary-foreground" : "bg-card"}`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`grid h-10 w-10 place-items-center rounded-lg ${dark ? "bg-primary/20 text-primary" : "gradient-brand text-primary-foreground"}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-primary" : "text-primary"}`}
        >
          {tag}
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold">{title}</h3>
      <p className={`mt-2 ${dark ? "text-secondary-foreground/70" : "text-muted-foreground"}`}>
        {desc}
      </p>
      <Button asChild className="mt-5" variant={dark ? "default" : "default"}>
        <Link to={to}>
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
