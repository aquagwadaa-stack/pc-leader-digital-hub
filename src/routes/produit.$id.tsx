import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, Truck, CreditCard, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduct, getRelated, formatPrice, type Product } from "@/data/products";
import { stores, type StoreId } from "@/data/stores";
import { ProductCard } from "@/components/ProductCard";
import { ReservationModal } from "@/components/ReservationModal";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — PC Leader Caraïbes` },
      { name: "description", content: loaderData.product.description.slice(0, 160) },
      { property: "og:title", content: loaderData.product.name },
      { property: "og:description", content: loaderData.product.description.slice(0, 160) },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-wide py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Produit introuvable</h1>
      <Button asChild className="mt-6"><Link to="/catalogue">Voir le catalogue</Link></Button>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [storeId, setStoreId] = useState<StoreId>("jarry");
  const [reserve, setReserve] = useState<Product | null>(null);
  const related = getRelated(product);

  return (
    <div className="container-wide py-8">
      <Link to="/catalogue" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-surface shadow-card">
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">{product.brand}</p>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {product.shortSpecs.map((s: string) => <li key={s}>• {s}</li>)}
          </ul>

          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>}
          </div>
          {product.price === null && (
            <p className="mt-1 text-sm text-muted-foreground">Tarif sur devis selon configuration et options.</p>
          )}

          <p className="mt-5 text-foreground/80">{product.description}</p>

          {/* Store selection */}
          <div className="mt-6">
            <p className="text-sm font-semibold">Disponibilité par magasin</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {stores.map((s) => {
                const qty = product.stock[s.id];
                const active = storeId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setStoreId(s.id)}
                    className={`rounded-lg border p-3 text-left transition ${
                      active ? "border-primary bg-accent" : "hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium">{s.shortName}</p>
                    <p className={`text-xs ${qty > 0 ? "text-success" : "text-destructive"}`}>
                      {qty > 0 ? `${qty} en stock` : "Sur commande"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setReserve(product)}>Réserver en magasin</Button>
            <Button asChild size="lg" variant="outline"><Link to="/contact">Demander un devis</Link></Button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border bg-card p-4 text-xs">
            <Bullet icon={ShieldCheck} text="Garantie incluse" />
            <Bullet icon={Truck} text="Retrait magasin" />
            <Bullet icon={CreditCard} text="Paiement en magasin" />
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="tel:0590326363" className="inline-flex items-center gap-1.5 text-primary hover:underline"><Phone className="h-4 w-4" /> 05 90 32 63 63</a>
            <a href="mailto:contact@pcleader.fr" className="inline-flex items-center gap-1.5 text-primary hover:underline"><Mail className="h-4 w-4" /> contact@pcleader.fr</a>
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">Caractéristiques</h2>
        <div className="mt-4 overflow-hidden rounded-xl border bg-card shadow-card">
          <table className="w-full text-sm">
            <tbody>
              {product.specs.map((s: { label: string; value: string }, i: number) => (
                <tr key={s.label} className={i % 2 ? "bg-surface" : ""}>
                  <td className="w-1/3 px-4 py-3 font-medium text-muted-foreground">{s.label}</td>
                  <td className="px-4 py-3">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Produits similaires</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} onReserve={setReserve} />)}
          </div>
        </section>
      )}

      <ReservationModal product={reserve} open={!!reserve} onOpenChange={(v) => !v && setReserve(null)} defaultStore={storeId} />
    </div>
  );
}

function Bullet({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      <span>{text}</span>
    </div>
  );
}
