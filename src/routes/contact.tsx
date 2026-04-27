import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PC Leader Caraïbes" },
      {
        name: "description",
        content:
          "Contactez PC Leader Caraïbes par téléphone, email ou formulaire. Achat, stock, SAV, réservation ou demande spécifique.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [done, setDone] = useState(false);

  return (
    <div className="container-wide py-12">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Nous contacter</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Une question, un besoin spécifique ? Notre équipe vous répond sous 24h ouvrées.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,360px]">
        <div className="rounded-xl border bg-card p-6 shadow-card md:p-8">
          {done ? (
            <div className="rounded-lg border border-success/40 bg-success/10 p-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
              <h3 className="mt-3 font-display text-xl font-bold">Message envoyé</h3>
              <p className="mt-2 text-sm">
                Nous revenons vers vous très vite. Merci de votre confiance.
              </p>
              <Button className="mt-4" variant="outline" onClick={() => setDone(false)}>
                Nouveau message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium">
                  Motif du contact <span className="text-destructive">*</span>
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="">Sélectionner…</option>
                  <option>Achat / conseil produit</option>
                  <option>Vérification de stock</option>
                  <option>SAV / réparation</option>
                  <option>Demande de devis</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom et prénom" required />
                <Field label="Téléphone" type="tel" />
                <Field label="Email" type="email" required />
                <Field label="Magasin concerné (si applicable)" />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Votre message <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <Button type="submit" size="lg">
                Envoyer le message
              </Button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <Info icon={Phone} title="Téléphone" lines={["05 90 32 63 63"]} link="tel:0590326363" />
          <Info
            icon={Mail}
            title="Email"
            lines={["contact@pcleader.fr"]}
            link="mailto:contact@pcleader.fr"
          />
          <Info
            icon={MapPin}
            title="Magasins"
            lines={["Jarry / Baie-Mahault", "Dothémare / Les Abymes", "Le Moule"]}
          />
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  required,
}: {
  label: string;
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
        className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function Info({
  icon: Icon,
  title,
  lines,
  link,
}: {
  icon: React.ElementType;
  title: string;
  lines: string[];
  link?: string;
}) {
  const content = (
    <div className="rounded-xl border bg-card p-5 shadow-card transition hover:border-primary">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-2 font-display font-semibold">{title}</p>
      <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
  return link ? <a href={link}>{content}</a> : content;
}
