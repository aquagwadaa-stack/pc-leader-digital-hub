import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { stores, type StoreId } from "@/data/stores";
import { formatPrice, type Product } from "@/data/products";
import { CheckCircle2 } from "lucide-react";
import fallbackProductImage from "@/assets/hero-store.jpg";

interface Props {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultStore?: StoreId;
}

export function ReservationModal({ product, open, onOpenChange, defaultStore }: Props) {
  const [storeId, setStoreId] = useState<StoreId>(defaultStore ?? "jarry");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setDone(false);
      setStoreId(defaultStore ?? "jarry");
    }
  }, [open, defaultStore]);

  if (!product) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {done ? (
          <div className="space-y-3 py-4 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <DialogHeader>
              <DialogTitle className="text-center">Réservation envoyée</DialogTitle>
              <DialogDescription className="text-center">
                Notre équipe vous contacte dans la journée pour confirmer la disponibilité de
                <span className="font-medium text-foreground"> {product.name} </span>
                au magasin {stores.find((s) => s.id === storeId)?.shortName}.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => onOpenChange(false)} className="mt-2">
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Réserver en magasin</DialogTitle>
              <DialogDescription>
                Aucun paiement en ligne. Nous bloquons le produit et vous contactons pour confirmer.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 rounded-lg border bg-surface p-3">
              <img
                src={product.image}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackProductImage;
                }}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="text-sm">
                <p className="text-xs uppercase text-muted-foreground">{product.brand}</p>
                <p className="font-medium">{product.name}</p>
                <p className="font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
            </div>
            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="text-sm font-medium">Magasin de retrait</label>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {stores.map((s) => {
                    const qty = product.stock[s.id];
                    const active = storeId === s.id;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setStoreId(s.id)}
                        className={`rounded-md border px-2 py-2 text-left text-xs transition ${
                          active ? "border-primary bg-accent" : "hover:bg-muted"
                        }`}
                      >
                        <span className="block font-medium text-foreground">{s.shortName}</span>
                        <span className={qty > 0 ? "text-success" : "text-destructive"}>
                          {qty > 0 ? `${qty} dispo` : "Sur commande"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="Nom et prénom" value={name} onChange={setName} required />
                <Input label="Téléphone" type="tel" value={phone} onChange={setPhone} required />
              </div>
              <Input label="Email" type="email" value={email} onChange={setEmail} required />
              <div>
                <label className="text-sm font-medium">Message (optionnel)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Envoyer la réservation
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
