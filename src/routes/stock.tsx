import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, Mail, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ReservationModal } from "@/components/ReservationModal";
import { StoreSelector } from "@/components/StoreSelector";
import { products, type Product } from "@/data/products";
import { stores, type StoreId } from "@/data/stores";

export const Route = createFileRoute("/stock")({
  head: () => ({
    meta: [
      { title: "Stock par magasin — PC Leader Caraïbes" },
      { name: "description", content: "Consultez la disponibilité de nos produits dans nos 3 magasins en Guadeloupe : Jarry, Dothémare, Le Moule." },
    ],
  }),
  component: StockPage,
});

function StockPage() {
  const [store, setStore] = useState<StoreId | "all">("jarry");
  const [reserve, setReserve] = useState<Product | null>(null);
  const selectedStore = store !== "all" ? stores.find((s) => s.id === store) : null;
  const visible = products.filter((p) => store === "all" ? true : p.stock[store] > 0);

  return (
    <div className="container-wide py-8">
      <h1 className="font-display text-3xl font-bold">Stock par magasin</h1>
      <p className="mt-1 max-w-2xl text-muted-foreground">
        Sélectionnez votre magasin pour voir les produits actuellement disponibles.
      </p>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <StoreSelector value={store} onChange={setStore} includeAll={false} />
        {selectedStore && (
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm"><a href={`tel:${selectedStore.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4" /> Appeler</a></Button>
            <Button asChild size="sm" variant="outline"><a href="https://wa.me/590590326363" target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp</a></Button>
            <Button asChild size="sm" variant="outline"><a href="mailto:contact@pcleader.fr"><Mail className="h-4 w-4" /> Email</a></Button>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
        <p className="text-warning-foreground">
          Disponibilité indicative mise à jour en temps réel. Une confirmation sera faite par l'équipe PC Leader avant le retrait.
        </p>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-sm text-muted-foreground">{visible.length} produits disponibles</p>
        {visible.length === 0 ? (
          <div className="rounded-xl border bg-card p-12 text-center shadow-card">
            <p className="font-display text-lg font-semibold">Aucun produit en stock dans ce magasin</p>
            <p className="mt-1 text-sm text-muted-foreground">Contactez-nous, nous pouvons commander ou transférer depuis un autre magasin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((p) => <ProductCard key={p.id} product={p} onReserve={setReserve} />)}
          </div>
        )}
      </div>

      <ReservationModal
        product={reserve}
        open={!!reserve}
        onOpenChange={(v) => !v && setReserve(null)}
        defaultStore={store !== "all" ? store : "jarry"}
      />
    </div>
  );
}
