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
            <p className="mt-2">ZenFlow SAS — Capital social : 10 000€<br />Siège social : 12 rue de la Paix, 75002 Paris, France<br />RCS Paris : 920 000 000<br />SIRET : 920 000 000 00012<br />TVA intracommunautaire : FR12 920000000</p>
          </section>
          <section>
            <h2 className="font-medium text-foreground">Directeur de la publication</h2>
            <p className="mt-2">Léa Moreau, présidente</p>
          </section>
          <section>
            <h2 className="font-medium text-foreground">Hébergement</h2>
            <p className="mt-2">Shopify Inc. — 151 O'Connor Street, Ottawa, Ontario, K2P 2L8, Canada</p>
          </section>
          <section>
            <h2 className="font-medium text-foreground">Contact</h2>
            <p className="mt-2">hello@zenflow.fr</p>
          </section>
          <section>
            <h2 className="font-medium text-foreground">Propriété intellectuelle</h2>
            <p className="mt-2">L'ensemble du contenu de ce site (textes, images, logos, vidéos) est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
