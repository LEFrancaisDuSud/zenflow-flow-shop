import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "CGV — ZenFlow" },
      { name: "description", content: "Conditions générales de vente ZenFlow." },
    ],
  }),
  component: CGV,
});

function CGV() {
  return (
    <div className="container-x py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-6xl">Conditions générales de vente</h1>
        <p className="mt-3 text-sm text-muted-foreground">Dernière mise à jour : juin 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          {[
            { t: "1. Objet", c: "Les présentes CGV régissent les relations contractuelles entre ZenFlow SAS et toute personne effectuant un achat via le site zenflow.fr." },
            { t: "2. Produits", c: "Les caractéristiques essentielles des produits sont présentées sur chaque fiche produit. Les photographies sont non contractuelles." },
            { t: "3. Prix", c: "Les prix sont indiqués en euros, toutes taxes comprises (TTC). Les frais de livraison sont précisés avant validation de la commande." },
            { t: "4. Commande", c: "Toute commande validée vaut acceptation pleine et entière des présentes CGV. Un email de confirmation est envoyé après paiement." },
            { t: "5. Paiement", c: "Les paiements sont sécurisés via Stripe et Shopify Payments (CB, Apple Pay, PayPal). Aucune donnée bancaire n'est stockée sur nos serveurs." },
            { t: "6. Livraison", c: "Les commandes sont expédiées sous 24h ouvrées et livrées sous 48-72h en France métropolitaine. Voir notre page Livraison & retours pour le détail." },
            { t: "7. Droit de rétractation", c: "Conformément à l'article L221-18 du Code de la consommation, vous disposez de 14 jours pour exercer votre droit de rétractation. ZenFlow étend ce délai à 30 jours." },
            { t: "8. Garantie", c: "Tous nos produits bénéficient des garanties légales de conformité et contre les vices cachés. Les appareils électriques sont garantis 2 ans." },
            { t: "9. Données personnelles", c: "Voir notre Politique de confidentialité pour le détail du traitement de vos données." },
            { t: "10. Litiges", c: "Tout litige sera soumis aux tribunaux français. Une plateforme de règlement en ligne est disponible : ec.europa.eu/consumers/odr." },
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
