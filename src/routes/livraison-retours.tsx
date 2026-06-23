import { createFileRoute } from "@tanstack/react-router";
import { Package, RefreshCw, Truck } from "lucide-react";

export const Route = createFileRoute("/livraison-retours")({
  head: () => ({
    meta: [
      { title: "Livraison & retours — ZenFlow" },
      { name: "description", content: "Modalités de livraison, délais et politique de retour ZenFlow." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="container-x py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.16em] text-primary">Pratique</div>
        <h1 className="mt-2 font-display text-4xl md:text-6xl">Livraison & retours</h1>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { i: Truck, t: "Livraison 4 à 10 jours", d: "Monde Entier" },
            { i: Package, t: "Offerte dès 50€", d: "4,90€ en dessous" },
            { i: RefreshCw, t: "Retour 30 jours", d: "Satisfait ou remboursé" },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border bg-card p-5">
              <Icon className="text-primary" size={20} />
              <div className="mt-3 font-medium">{t}</div>
              <div className="text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-2xl text-foreground">Modes de livraison</h2>
            <ul className="mt-3 space-y-2">
              <li>• <strong className="text-foreground">Colissimo Domicile</strong> — 4,90€, 4 à 10 jours, gratuit dès 50€.</li>
              <li>• <strong className="text-foreground">Mondial Relay</strong> — 3,90€, 3-5j ouvrés.</li>
              <li>• <strong className="text-foreground">Express Chronopost</strong> — 9,90€, livraison J+1 avant 13h.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground">Suivi de commande</h2>
            <p className="mt-3">Un email de confirmation est envoyé dès l'expédition avec un numéro de suivi. Vous pouvez aussi nous écrire à hello@zenflow.fr à tout moment.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground">Politique de retour</h2>
            <p className="mt-3">Vous disposez de 30 jours après réception pour retourner votre produit. Il doit être en état neuf, dans son emballage d'origine. Le remboursement est effectué sous 5 à 10 jours après réception du colis.</p>
            <p className="mt-2">Les frais de retour sont à votre charge sauf en cas de produit défectueux.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground">Garantie</h2>
            <p className="mt-3">Tous nos produits électriques sont garantis 2 ans contre les défauts de fabrication. En cas de problème, contactez-nous : nous nous occupons de tout.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
