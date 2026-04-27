import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { stores } from "@/data/stores";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary text-secondary-foreground">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg gradient-brand font-display font-bold text-primary-foreground">PC</span>
            <span className="font-display text-lg font-bold">PC Leader Caraïbes</span>
          </div>
          <p className="mt-3 text-sm text-secondary-foreground/70">
            Le n°1 de l'informatique en Guadeloupe depuis 1998. Vente, conseil, SAV et solutions pour particuliers et professionnels.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-md bg-secondary-foreground/10 hover:bg-primary"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-md bg-secondary-foreground/10 hover:bg-primary"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold">Boutique</h4>
          <ul className="mt-3 space-y-2 text-sm text-secondary-foreground/70">
            <li><Link to="/catalogue" className="hover:text-primary">Catalogue</Link></li>
            <li><Link to="/stock" className="hover:text-primary">Stock par magasin</Link></li>
            <li><Link to="/professionnels" className="hover:text-primary">Espace pros</Link></li>
            <li><Link to="/sav" className="hover:text-primary">SAV & réparation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold">Magasins</h4>
          <ul className="mt-3 space-y-2 text-sm text-secondary-foreground/70">
            {stores.map((s) => (
              <li key={s.id} className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{s.shortName} – {s.city}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-secondary-foreground/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 05 90 32 63 63</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@pcleader.fr</li>
            <li><Link to="/contact" className="text-primary hover:underline">Formulaire de contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="container-wide flex flex-col items-start justify-between gap-2 py-4 text-xs text-secondary-foreground/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} PC Leader Caraïbes — Tous droits réservés</p>
          <span className="rounded-md border border-secondary-foreground/20 px-2 py-0.5">Démo conceptuelle</span>
        </div>
      </div>
    </footer>
  );
}
