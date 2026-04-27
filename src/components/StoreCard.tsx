import { Phone, MapPin, Clock, ExternalLink, Wrench } from "lucide-react";
import type { Store } from "@/data/stores";
import { Button } from "@/components/ui/button";

export function StoreCard({ store }: { store: Store }) {
  const mapsQuery = encodeURIComponent(`${store.address}, ${store.postalCode} ${store.city}`);
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="relative aspect-[16/9] bg-muted">
        <iframe
          title={store.name}
          src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          loading="lazy"
          className="h-full w-full border-0"
        />
        {store.hasSav && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground shadow">
            <Wrench className="h-3 w-3" /> Atelier SAV
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-bold">{store.name}</h3>
          <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{store.address}<br />{store.postalCode} {store.city}</span>
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold"><Clock className="h-4 w-4" /> Horaires</p>
          <ul className="mt-1.5 space-y-0.5 text-sm">
            {store.hours.map((h) => (
              <li key={h.label} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{h.label}</span>
                <span className="font-medium">{h.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Button asChild size="sm" variant="default">
            <a href={`tel:${store.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4" /> Appeler</a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" /> Itinéraire
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
