import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Wrench, Briefcase, ShoppingBag, MapPin, ShieldCheck,
  Headphones, Award, Truck, ArrowRight, Clock, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-store.jpg";
import { categories, products, type Product } from "@/data/products";
import { stores } from "@/data/stores";
import { ProductCard } from "@/components/ProductCard";
import { ReservationModal } from "@/components/ReservationModal";

const categoryIconMap: Record<string, string> = {
  portables: "💻", bureau: "🖥️", apple: "", smartphones: "📱", tablettes: "📲",
  ecrans: "🖥️", imprimantes: "🖨️", consoles: "🎮", accessoires: "⌨️",
  stockage: "💾", reseau: "📶", logiciels: "💿", encres: "🖋️", pieces: "🔧",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PC Leader Caraïbes — Informatique, Apple, SAV en Guadeloupe" },
      { name: "description", content: "Trouvez votre matériel informatique en Guadeloupe : MacBook, iPhone, PC portables, imprimantes, consoles. Stock réel par magasin, SAV, conseil pro." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [search, setSearch] = useState("");
  const [reserveProduct, setReserveProduct] = useState<Product | null>(null);
  const popular = products.filter((p) => p.popular).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="gradient-hero">
        <div className="container-wide grid gap-10 py-12 md:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Le n°1 de l'informatique en Guadeloupe depuis 1998
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Trouvez votre matériel,<br />
              <span className="text-primary">en stock près de chez vous.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Apple, PC portables, imprimantes, smartphones, accessoires. Réservation en magasin, SAV expert, devis pour les pros.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); window.location.href = `/catalogue?q=${encodeURIComponent(search)}`; }}
              className="mt-6 flex max-w-xl items-center gap-2 rounded-xl border bg-card p-2 shadow-card"
            >
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Que cherchez-vous ? (ex : MacBook Air, cartouche HP)"
                className="flex-1 bg-transparent px-1 py-2 text-sm outline-none"
              />
              <Button type="submit" size="lg">Rechercher</Button>
            </form>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <QuickAction to="/catalogue" icon={ShoppingBag} label="Catalogue" />
              <QuickAction to="/stock" icon={MapPin} label="Stock magasin" />
              <QuickAction to="/sav" icon={Wrench} label="SAV" />
              <QuickAction to="/professionnels" icon={Briefcase} label="Devis pro" />
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
                <div className="grid h-10 w-10 place-items-center rounded-full bg-success/15 text-success"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-semibold">Atelier SAV à Jarry</p>
                  <p className="text-xs text-muted-foreground">Diagnostic en moins de 48h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="border-y bg-card">
        <div className="container-wide grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <Trust icon={Award} title="Depuis 1998" desc="Plus de 25 ans d'expertise locale" />
          <Trust icon={MapPin} title="3 magasins" desc="Jarry, Dothémare, Le Moule" />
          <Trust icon={Wrench} title="SAV intégré" desc="Réparation toutes marques" />
          <Trust icon={Headphones} title="Conseil local" desc="Une équipe qui répond vraiment" />
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="container-wide py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Catégories</h2>
            <p className="mt-1 text-muted-foreground">Tout l'univers informatique et high-tech.</p>
          </div>
          <Button asChild variant="ghost"><Link to="/catalogue">Voir tout <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {categories.slice(0, 14).map((c) => (
            <Link
              key={c.id}
              to="/catalogue"
              search={{ category: c.id }}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="text-2xl">{categoryIconMap[c.id] || "🔌"}</span>
              <span className="text-xs font-medium leading-tight group-hover:text-primary">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUITS POPULAIRES */}
      <section className="container-wide pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Produits populaires</h2>
            <p className="mt-1 text-muted-foreground">Les références les plus demandées en Guadeloupe.</p>
          </div>
          <Button asChild variant="outline"><Link to="/catalogue">Voir le catalogue</Link></Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {popular.map((p) => (
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
            cta="Voir le catalogue" to="/catalogue" icon={ShoppingBag}
          />
          <CtaCard
            tag="SAV & Réparation"
            title="Besoin d'un diagnostic ou d'une réparation ?"
            desc="PC, smartphone, tablette, imprimante. Atelier à Jarry, dépôt possible dans tous nos magasins."
            cta="Demander un diagnostic" to="/sav" icon={Wrench} dark
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
          <Button asChild variant="ghost"><Link to="/magasins">Détails <ArrowRight className="h-4 w-4" /></Link></Button>
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
                {s.hasSav && <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">SAV</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.city}</p>
              <p className="mt-3 flex items-start gap-1.5 text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{s.address}</p>
              <p className="mt-2 flex items-start gap-1.5 text-sm"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{s.hours[0].value}</p>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-medium"><Phone className="h-4 w-4 text-primary" />{s.phone}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Voir le magasin <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRO BANNER */}
      <section className="container-wide pb-20">
        <div className="overflow-hidden rounded-2xl border bg-secondary text-secondary-foreground">
          <div className="grid gap-6 p-8 md:grid-cols-[1fr,auto] md:items-center md:p-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Espace professionnels</span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Équipement, maintenance et parc informatique pour entreprises et collectivités.
              </h2>
              <p className="mt-3 max-w-2xl text-secondary-foreground/70">
                Devis matériel, installation, contrats de maintenance, imprimantes, réseau, logiciels. Un interlocuteur dédié à votre structure.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/professionnels"><Briefcase className="h-4 w-4" /> Demander un devis</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                <a href="tel:0590326363"><Phone className="h-4 w-4" /> 05 90 32 63 63</a>
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

function QuickAction({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      to={to as "/catalogue"}
      className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm font-medium shadow-card transition hover:border-primary hover:text-primary"
    >
      <Icon className="h-4 w-4 text-primary" />{label}
    </Link>
  );
}

function Trust({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="h-5 w-5" /></div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function CtaCard({ tag, title, desc, cta, to, icon: Icon, dark }: {
  tag: string; title: string; desc: string; cta: string; to: string; icon: React.ElementType; dark?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-8 shadow-card ${dark ? "bg-secondary text-secondary-foreground" : "bg-card"}`}>
      <div className="flex items-center gap-2">
        <span className={`grid h-10 w-10 place-items-center rounded-lg ${dark ? "bg-primary/20 text-primary" : "gradient-brand text-primary-foreground"}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-primary" : "text-primary"}`}>{tag}</span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold">{title}</h3>
      <p className={`mt-2 ${dark ? "text-secondary-foreground/70" : "text-muted-foreground"}`}>{desc}</p>
      <Button asChild className="mt-5" variant={dark ? "default" : "default"}>
        <Link to={to as "/catalogue"}>{cta} <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </div>
  );
}
