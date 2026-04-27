import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { stores } from "@/data/stores";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary text-secondary-foreground">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg gradient-brand font-display font-bold text-primary-foreground">
              PC
            </span>
            <span className="font-display text-lg font-bold">PC Leader Caraïbes</span>
          </div>
          <p className="mt-3 text-sm text-secondary-foreground/70">
            Revendeur agréé Apple et référence informatique en Guadeloupe depuis 1998. Vente,
            conseil, SAV, pièces détachées et consommables.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold">Boutique</h4>
          <ul className="mt-3 space-y-2 text-sm text-secondary-foreground/70">
            <li>
              <Link to="/catalogue" search={{ category: "apple" }} className="hover:text-primary">
                Produits Apple
              </Link>
            </li>
            <li>
              <Link to="/catalogue" search={{ newOnly: true }} className="hover:text-primary">
                Nouveautés
              </Link>
            </li>
            <li>
              <Link to="/catalogue" search={{ promo: true }} className="hover:text-primary">
                Promotions
              </Link>
            </li>
            <li>
              <Link to="/sav" className="hover:text-primary">
                SAV & réparation
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold">Magasins</h4>
          <ul className="mt-3 space-y-2 text-sm text-secondary-foreground/70">
            {stores.map((s) => (
              <li key={s.id} className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {s.shortName} – {s.city}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-secondary-foreground/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 05 90 32 63 63
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> contact@pcleader.fr
            </li>
            <li>
              <Link to="/contact" className="text-primary hover:underline">
                Formulaire de contact
              </Link>
            </li>
            <li>
              <Link to="/mentions-legales" className="hover:text-primary">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="container-wide flex flex-col items-start justify-between gap-2 py-4 text-xs text-secondary-foreground/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} PC Leader Caraïbes — Tous droits réservés</p>
          <span>Informatique, téléphonie, multimédia et SAV en Guadeloupe</span>
        </div>
      </div>
    </footer>
  );
}
