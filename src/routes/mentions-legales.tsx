import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — ZenFlow" },
      { name: "description", content: "Mentions légales du site ZenFlow." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="container-x py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-6xl">Mentions légales</h1>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-medium text-foreground">Éditeur du site</h2>
            <p className="mt-2">Site édité par ZenFlow, marque française dédiée au bien-être et à la récupération.</p>
          </section>
          <section>
            <h2 className="font-medium text-foreground">Hébergement & paiement</h2>
            <p className="mt-2">Ce site est hébergé et propulsé par Shopify Inc. — 151 O'Connor Street, Ottawa, Ontario, K2P 2L8, Canada. Les paiements sont sécurisés et traités par Shopify Payments.</p>
          </section>
          <section>
            <h2 className="font-medium text-foreground">Contact</h2>
            <p className="mt-2">Une question ? Écris-nous à hello@zenflow.fr — nous répondons sous 24h ouvrées.</p>
          </section>
          <section>
            <h2 className="font-medium text-foreground">Propriété intellectuelle</h2>
            <p className="mt-2">L'ensemble du contenu de ce site (textes, images, logos, vidéos) est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite.</p>
          </section>
          <section>
            <h2 className="font-medium text-foreground">Données personnelles</h2>
            <p className="mt-2">Vos données sont traitées dans le respect du RGPD. Pour plus d'informations, consultez notre <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
