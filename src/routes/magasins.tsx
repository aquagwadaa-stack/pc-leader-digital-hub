import { createFileRoute } from "@tanstack/react-router";
import { stores } from "@/data/stores";
import { StoreCard } from "@/components/StoreCard";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/magasins")({
  head: () => ({
    meta: [
      { title: "Nos magasins en Guadeloupe — PC Leader Caraïbes" },
      {
        name: "description",
        content:
          "Retrouvez PC Leader à Jarry, Dothémare et Le Moule. Adresses, horaires et itinéraires.",
      },
    ],
  }),
  component: StoresPage,
});

function StoresPage() {
  return (
    <div className="container-wide py-12">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Nos 3 magasins en Guadeloupe</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Conseil, vente et retrait dans tous nos magasins. Atelier SAV à Jarry.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {stores.map((s) => (
          <StoreCard key={s.id} store={s} />
        ))}
      </div>

      <div className="mt-12 rounded-2xl border bg-secondary p-8 text-secondary-foreground">
        <div className="grid gap-4 md:grid-cols-[1fr,auto] md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Une question ? Appelez-nous.</h2>
            <p className="mt-2 text-secondary-foreground/70">
              Un seul numéro pour les 3 magasins. Ouvert du lundi au samedi.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="tel:0590326363">
                <Phone className="h-4 w-4" /> 05 90 32 63 63
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              <a href="mailto:contact@pcleader.fr">
                <Mail className="h-4 w-4" /> contact@pcleader.fr
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
