import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Confidentialité — ZenFlow" },
      { name: "description", content: "Politique de confidentialité et protection des données ZenFlow." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="container-x py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-6xl">Politique de confidentialité</h1>
        <p className="mt-3 text-sm text-muted-foreground">Dernière mise à jour : juin 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          {[
            { t: "Données collectées", c: "Nom, prénom, email, adresse de livraison, historique de commandes. Aucune donnée bancaire n'est conservée." },
            { t: "Finalités", c: "Traitement des commandes, livraison, service client, envoi de la newsletter (avec votre consentement)." },
            { t: "Destinataires", c: "Nos prestataires logistiques (Colissimo, Mondial Relay), notre plateforme e-commerce Shopify, notre outil d'emailing." },
            { t: "Durée de conservation", c: "3 ans après le dernier contact pour les données commerciales, 10 ans pour les factures." },
            { t: "Vos droits", c: "Conformément au RGPD : accès, rectification, suppression, portabilité, opposition. Écrivez-nous à privacy@zenflow.fr." },
            { t: "Cookies", c: "Nous utilisons des cookies techniques (panier, session) et, avec votre consentement, des cookies d'analyse anonymisés." },
          ].map(({ t, c }) => (
            <section key={t}>
              <h2 className="font-medium text-foreground">{t}</h2>
              <p className="mt-2">{c}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
