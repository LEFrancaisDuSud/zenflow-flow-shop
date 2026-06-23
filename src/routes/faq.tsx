import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ZenFlow" },
      { name: "description", content: "Réponses aux questions fréquentes sur les produits, la livraison et les retours ZenFlow." },
    ],
  }),
  component: FAQ,
});

const faqs = [
  { q: "Combien de temps prend la livraison ?", a: "Vos commandes sont expédiées sous 24h ouvrées et livrées sous 4 à 10 jours en France métropolitaine via Colissimo ou Mondial Relay." },
  { q: "La livraison est-elle gratuite ?", a: "Oui, dès 50€ d'achat en France métropolitaine. En dessous, la livraison standard est à 4,90€." },
  { q: "Quels sont les délais de retour ?", a: "Vous disposez de 30 jours pour nous retourner votre produit, dans son emballage d'origine, et être intégralement remboursé." },
  { q: "Les produits sont-ils garantis ?", a: "Tous nos appareils électriques bénéficient d'une garantie de 2 ans contre les défauts de fabrication." },
  { q: "Comment utiliser le masseur cervical ?", a: "10 à 15 minutes par session, 1 à 2 fois par jour. Évitez l'usage sur peau lésée ou en cas de pathologie cervicale sans avis médical." },
  { q: "Puis-je payer en plusieurs fois ?", a: "Oui, le paiement en 3x ou 4x sans frais est disponible à partir de 50€ d'achat via Shop Pay." },
  { q: "Comment vous contacter ?", a: "Par email à hello@zenflow.fr ou via notre page contact. Réponse sous 24h, 7j/7." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="container-x py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.16em] text-primary text-center">Aide</div>
        <h1 className="mt-2 text-center font-display text-4xl md:text-6xl">Questions fréquentes</h1>
        <p className="mt-4 text-center text-muted-foreground">Tout ce qu'il faut savoir avant et après votre commande.</p>

        <div className="mt-12 divide-y rounded-3xl border bg-card">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7"
              >
                <span className="font-medium">{f.q}</span>
                {open === i ? <Minus size={16} className="shrink-0" /> : <Plus size={16} className="shrink-0" />}
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground md:px-7">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
