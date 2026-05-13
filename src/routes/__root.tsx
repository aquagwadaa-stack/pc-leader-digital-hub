import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page demandée n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PC Leader Caraïbes — Revendeur Apple agréé et informatique en Guadeloupe" },
      {
        name: "description",
        content:
          "Revendeur agréé Apple, vente informatique, téléphonie, multimédia, consommables et SAV en Guadeloupe. 3 magasins : Jarry, Dothémare, Le Moule.",
      },
      { name: "author", content: "PC Leader Caraïbes" },
      { property: "og:title", content: "PC Leader Caraïbes — Revendeur Apple agréé et informatique en Guadeloupe" },
      {
        property: "og:description",
        content: "Revendeur agréé Apple, informatique, téléphonie et SAV en Guadeloupe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "PC Leader Caraïbes — Revendeur Apple agréé et informatique en Guadeloupe" },
      { name: "description", content: "PC Leader Digital Hub is a modern, responsive website for an IT retailer, showcasing products and store availability." },
      { property: "og:description", content: "PC Leader Digital Hub is a modern, responsive website for an IT retailer, showcasing products and store availability." },
      { name: "twitter:description", content: "PC Leader Digital Hub is a modern, responsive website for an IT retailer, showcasing products and store availability." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c00a044c-abce-403a-a370-1c53fa8a1630/id-preview-c87b6415--14118f79-5d51-4fc4-8ec4-2adc04f3ee3b.lovable.app-1777336303837.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c00a044c-abce-403a-a370-1c53fa8a1630/id-preview-c87b6415--14118f79-5d51-4fc4-8ec4-2adc04f3ee3b.lovable.app-1777336303837.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
