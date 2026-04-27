import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wrench,
  Search,
  CheckCircle2,
  FileText,
  Clock,
  Package,
  Laptop,
  Smartphone,
  Tablet,
  Printer,
  AppWindow,
  HardDrive,
  Settings,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { stores } from "@/data/stores";

export const Route = createFileRoute("/sav")({
  head: () => ({
    meta: [
      { title: "SAV & Réparation informatique — PC Leader Caraïbes" },
      {
        name: "description",
        content:
          "Service après-vente PC, Mac, smartphone, tablette, imprimante. Diagnostic, réparation, récupération de données. Atelier à Jarry.",
      },
    ],
  }),
  component: SavPage,
});

const savCategories = [
  { id: "ordi", icon: Laptop, label: "Ordinateur PC / Mac" },
  { id: "smart", icon: Smartphone, label: "Smartphone" },
  { id: "tab", icon: Tablet, label: "Tablette" },
  { id: "imp", icon: Printer, label: "Imprimante" },
  { id: "log", icon: AppWindow, label: "Logiciel" },
  { id: "data", icon: HardDrive, label: "Récupération données" },
  { id: "inst", icon: Settings, label: "Installation" },
  { id: "ent", icon: Building2, label: "Maintenance entreprise" },
];

function SavPage() {
  const [done, setDone] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<null | { status: string; step: number }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const track = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    // Démo
    const step = (trackId.length % 3) + 1;
    const labels = ["Diagnostic en cours", "Réparation en atelier", "Prêt à récupérer"];
    setTrackResult({ status: labels[step - 1], step });
  };

  return (
    <div>
      {/* Header */}
      <section className="border-b bg-secondary text-secondary-foreground">
        <div className="container-wide py-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            <Wrench className="h-3.5 w-3.5" /> Service après-vente
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Diagnostic, réparation, dépannage.
          </h1>
          <p className="mt-3 max-w-2xl text-secondary-foreground/70">
            SAV à Jarry et Dothémare. Dépôt possible dans nos 3 magasins. Toutes marques,
            particuliers et professionnels.
          </p>
        </div>
      </section>

      <div className="container-wide grid gap-10 py-12 lg:grid-cols-[1fr,360px]">
        <div>
          {/* Steps */}
          <h2 className="font-display text-2xl font-bold">Comment ça marche ?</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                n: 1,
                icon: FileText,
                t: "Déposez une demande",
                d: "En ligne ou directement en magasin avec votre appareil.",
              },
              {
                n: 2,
                icon: Search,
                t: "Diagnostic",
                d: "Nos techniciens analysent et établissent un devis avant intervention.",
              },
              {
                n: 3,
                icon: Package,
                t: "Réparation & retrait",
                d: "Vous êtes prévenu dès que l'appareil est prêt à récupérer.",
              },
            ].map((s) => (
              <li key={s.n} className="rounded-xl border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                    {s.n}
                  </span>
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-3 font-display font-semibold">{s.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>

          {/* Form */}
          <h2 className="mt-12 font-display text-2xl font-bold">Déposer une demande SAV</h2>
          {done ? (
            <div className="mt-5 rounded-xl border border-success/40 bg-success/10 p-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
              <h3 className="mt-3 font-display text-xl font-bold">Demande envoyée</h3>
              <p className="mt-2 text-sm">
                Notre équipe SAV vous recontacte sous 24h ouvrées. Un numéro de dossier vous sera
                envoyé par email.
              </p>
              <Button className="mt-4" variant="outline" onClick={() => setDone(false)}>
                Nouvelle demande
              </Button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="mt-5 space-y-5 rounded-xl border bg-card p-6 shadow-card"
            >
              <div>
                <p className="text-sm font-semibold">Type d'appareil ou de service</p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {savCategories.map((c) => (
                    <label
                      key={c.id}
                      className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border bg-background p-3 text-center text-xs transition hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-accent"
                    >
                      <input type="radio" name="cat" required className="sr-only" />
                      <c.icon className="h-5 w-5 text-primary" />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom et prénom" required />
                <Field label="Téléphone" type="tel" required />
                <Field label="Email" type="email" required />
                <Field label="Marque de l'appareil" placeholder="ex : Apple, HP, Lenovo" />
                <Field label="Modèle" placeholder="ex : MacBook Pro 14 2023" />
                <div>
                  <label className="text-sm font-medium">Magasin de dépôt préféré</label>
                  <select
                    required
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {stores.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.shortName} — {s.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Description du problème <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Décrivez le symptôme, depuis quand, ce qui a déclenché…"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Photo (optionnel)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent-foreground"
                />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Envoyer la demande SAV
              </Button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="flex items-center gap-2 font-display font-semibold">
              <Search className="h-4 w-4 text-primary" /> Suivre une demande SAV
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Saisissez votre numéro de dossier (démo).
            </p>
            <form onSubmit={track} className="mt-3 flex gap-2">
              <input
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="ex : SAV-24871"
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <Button type="submit">Suivre</Button>
            </form>
            {trackResult && (
              <div className="mt-4 rounded-lg border bg-surface p-3 text-sm">
                <p className="text-xs text-muted-foreground">Dossier {trackId}</p>
                <p className="mt-1 font-semibold">{trackResult.status}</p>
                <div className="mt-3 flex gap-1">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className={`h-1.5 flex-1 rounded ${n <= trackResult.step ? "bg-primary" : "bg-border"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border bg-secondary p-5 text-secondary-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="mt-2 font-display font-semibold">Ateliers SAV</h3>
            <p className="mt-2 text-sm text-secondary-foreground/70">
              404 rue de l'Industrie
              <br />
              Z.I. Jarry, 97122 Baie-Mahault
              <br />
              Dothémare, Les Abymes
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
              Horaires SAV
            </p>
            <ul className="mt-1 space-y-0.5 text-sm">
              <li>Lun. - Ven. : 8h30 – 14h00</li>
              <li>Samedi : 9h00 – 12h30</li>
            </ul>
            <Button asChild className="mt-4 w-full">
              <a href="tel:0590326363">05 90 32 63 63</a>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
