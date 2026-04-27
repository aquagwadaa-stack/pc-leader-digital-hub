import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, Phone, MapPin, X, Wrench, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/catalogue", label: "Catalogue" },
  { to: "/stock", label: "Stock par magasin" },
  { to: "/sav", label: "SAV" },
  { to: "/professionnels", label: "Pros" },
  { to: "/magasins", label: "Magasins" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { location } = useRouterState();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      {/* Top bar */}
      <div className="hidden border-b bg-secondary text-secondary-foreground md:block">
        <div className="container-wide flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Jarry · Dothémare · Le Moule</span>
            <span className="opacity-50">|</span>
            <span>Le n°1 de l'informatique en Guadeloupe depuis 1998</span>
          </div>
          <a href="tel:0590326363" className="flex items-center gap-1.5 font-medium hover:text-primary">
            <Phone className="h-3.5 w-3.5" /> 05 90 32 63 63
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-wide flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg gradient-brand text-primary-foreground font-display font-bold">PC</span>
          <span className="hidden font-display text-lg font-bold leading-tight sm:block">
            PC Leader<span className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Caraïbes</span>
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const url = `/catalogue?q=${encodeURIComponent(q)}`;
            window.location.href = url;
          }}
          className="relative hidden flex-1 max-w-xl md:block"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher : MacBook, iPhone, imprimante…"
            className="h-10 w-full rounded-lg border bg-surface pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </form>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/sav"><Wrench className="h-4 w-4" />SAV</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/professionnels"><Briefcase className="h-4 w-4" />Devis pro</Link>
          </Button>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="hidden border-t bg-background lg:block">
        <div className="container-wide flex h-11 items-center gap-1 overflow-x-auto">
          {navLinks.map((l) => {
            const active = location.pathname === l.to || location.pathname.startsWith(l.to + "/");
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition",
                  active ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <span className="mx-2 h-5 w-px bg-border" />
          <div className="flex items-center gap-1 overflow-x-auto">
            {categories.slice(0, 7).map((c) => (
              <Link
                key={c.id}
                to="/catalogue"
                search={{ category: c.id }}
                className="whitespace-nowrap rounded-md px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t lg:hidden">
          <div className="container-wide space-y-2 py-3">
            <form
              onSubmit={(e) => { e.preventDefault(); window.location.href = `/catalogue?q=${encodeURIComponent(q)}`; }}
              className="relative"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher un produit"
                className="h-10 w-full rounded-lg border bg-surface pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </form>
            <div className="grid gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
