import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Server,
  Printer,
  Network,
  Laptop,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/professionnels")({
  head: () => ({
    meta: [
      { title: "Espace professionnels — PC Leader Caraïbes" },
      {
        name: "description",
        content:
          "Solutions informatiques pour entreprises, écoles et administrations en Guadeloupe : devis matériel, maintenance, parc informatique, réseau.",
      },
    ],
  }),
  component: ProsPage,
});

const services = [
  {
    icon: Laptop,
    title: "Devis matériel",
    desc: "PC, Mac, écrans, périphériques. Offre adaptée selon besoin et volume.",
  },
  {
    icon: Server,
    title: "Installation poste de travail",
    desc: "Configuration, déploiement, transfert des données.",
  },
  {
    icon: ShieldCheck,
    title: "Contrats de maintenance",
    desc: "Maintenance préventive et curative, infogérance légère.",
  },
  {
    icon: Users,
    title: "Renouvellement parc",
    desc: "Audit, plan de renouvellement, reprise de l'ancien parc.",
  },
  {
    icon: Printer,
    title: "Imprimantes & consommables",
    desc: "Multifonctions pro, contrats à la page, livraison de toners.",
  },
  {
    icon: Network,
    title: "Réseau & logiciels",
    desc: "Wi-Fi pro, pare-feu, Microsoft 365, sauvegardes.",
  },
];

function ProsPage() {
  const [done, setDone] = useState(false);

  return (
    <div>
      <section className="border-b bg-secondary text-secondary-foreground">
        <div className="container-wide py-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            <Briefcase className="h-3.5 w-3.5" /> Espace professionnels
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Votre partenaire informatique en Guadeloupe.
          </h1>
          <p className="mt-3 max-w-2xl text-secondary-foreground/70">
            Entreprises, écoles, administrations : équipement, maintenance et conseil. Un
            interlocuteur dédié, des délais maîtrisés.
          </p>
        </div>
      </section>

      <section className="container-wide py-12">
        <h2 className="font-display text-2xl font-bold">Nos services pros</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-5 shadow-card">
              <s.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-display font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide pb-16">
        <div className="grid gap-8 rounded-2xl border bg-card p-6 shadow-card md:grid-cols-2 md:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold">Demander un devis pro</h2>
            <p className="mt-2 text-muted-foreground">
              Décrivez votre besoin, nous revenons vers vous sous 24-48h ouvrées avec une
              proposition adaptée.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Offres adaptées selon volume",
                "Livraison ou retrait selon organisation",
                "Suivi par un interlocuteur dédié",
                "Dossiers pros et collectivités",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {done ? (
              <div className="rounded-xl border border-success/40 bg-success/10 p-6">
                <CheckCircle2 className="h-10 w-10 text-success" />
                <h3 className="mt-3 font-display text-xl font-bold">Demande reçue</h3>
                <p className="mt-2 text-sm">
                  Un conseiller pro vous recontacte sous 24-48h ouvrées au numéro indiqué.
                </p>
                <Button className="mt-4" variant="outline" onClick={() => setDone(false)}>
                  Nouvelle demande
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="space-y-3"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Société / Organisme" required />
                  <Field label="Secteur" placeholder="ex : industrie, école…" />
                  <Field label="Nom et prénom" required />
                  <Field label="Fonction" placeholder="ex : RSI, gérant" />
                  <Field label="Email pro" type="email" required />
                  <Field label="Téléphone" type="tel" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Type de besoin</label>
                  <select
                    required
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="">Sélectionner…</option>
                    <option>Devis matériel</option>
                    <option>Installation poste de travail</option>
                    <option>Contrat de maintenance</option>
                    <option>Renouvellement parc</option>
                    <option>Imprimantes / consommables</option>
                    <option>Réseau / logiciels</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Détails du besoin <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Volumes, contexte, échéances…"
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Envoyer la demande
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
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
