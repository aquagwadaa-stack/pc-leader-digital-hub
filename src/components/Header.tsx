import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/catalogue", label: "Catalogue" },
  { to: "/sav", label: "SAV" },
  { to: "/magasins", label: "Magasins" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { location } = useRouterState();
  const navigate = useNavigate();

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate({ to: "/catalogue", search: { q: q.trim() } });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-wide flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg gradient-brand text-primary-foreground font-display font-bold">
            PC
          </span>
          <span className="hidden font-display text-base font-bold leading-tight sm:block">
            PC Leader
            <span className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Caraïbes
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active =
              location.pathname === l.to || location.pathname.startsWith(l.to + "/");
            return (
              <Link
                key={l.label}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition",
                  active ? "text-primary" : "text-foreground hover:text-primary",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={submitSearch}
          className="relative ml-auto hidden flex-1 max-w-sm md:block"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un produit…"
            className="h-10 w-full rounded-lg border bg-surface pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </form>

        <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex">
          <a href="tel:0590326363">
            <Phone className="h-4 w-4" />
            05 90 32 63 63
          </a>
        </Button>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t md:hidden">
          <div className="container-wide space-y-2 py-3">
            <form onSubmit={submitSearch} className="relative">
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
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="tel:0590326363"
                className="rounded-md px-3 py-2 text-sm font-medium text-primary"
              >
                05 90 32 63 63
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
