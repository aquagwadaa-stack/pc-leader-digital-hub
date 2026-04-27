import { createFileRoute } from "@tanstack/react-router";
import { Building2, Mail, Phone, Server } from "lucide-react";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — PC Leader Caraïbes" },
      {
        name: "description",
        content:
          "Mentions légales de PC Leader Caraïbes : société, adresse, contact, hébergement et directeur de publication.",
      },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="container-wide py-12">
      <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
        Démo à valider avant mise en ligne officielle
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Mentions légales</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Cette page reprend les informations publiques affichées sur le site actuel de PC Leader.
        Elles devront être confirmées par l'entreprise avant publication définitive.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <LegalBlock icon={Building2} title="Société">
          <p>PC Leader Caraïbes</p>
          <p>SARL au capital de 300 000 euros</p>
          <p>RCS Pointe-à-Pitre BT 98 B372</p>
        </LegalBlock>

        <LegalBlock icon={Building2} title="Adresse">
          <p>404 rue de l'Industrie</p>
          <p>Anciennement 42 rue de l'Industrie prolongée</p>
          <p>Z.I. Jarry, 97122 Baie-Mahault</p>
        </LegalBlock>

        <LegalBlock icon={Phone} title="Téléphone">
          <p>Service commercial et service après-vente : 0590 32 63 63</p>
          <p>Télécopie : 0590 26 87 56</p>
        </LegalBlock>

        <LegalBlock icon={Mail} title="Courriel">
          <p>
            <a href="mailto:contact@pcleader.fr" className="text-primary hover:underline">
              contact@pcleader.fr
            </a>
          </p>
          <p>
            Webmaster :{" "}
            <a href="mailto:webmaster@pcleader.fr" className="text-primary hover:underline">
              webmaster@pcleader.fr
            </a>
          </p>
        </LegalBlock>

        <LegalBlock icon={Server} title="Hébergement">
          <p>OVH.COM</p>
          <p>2 rue Kellermann, 59053 Roubaix</p>
        </LegalBlock>

        <LegalBlock icon={Building2} title="Publication">
          <p>Directeur de la publication : Raphaël Hen</p>
          <p>Webmaster : Olivier Bonnefoy</p>
        </LegalBlock>
      </div>
    </div>
  );
}

function LegalBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5 shadow-card">
      <Icon className="h-5 w-5 text-primary" />
      <h2 className="mt-3 font-display text-lg font-semibold">{title}</h2>
      <div className="mt-2 space-y-1 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}
