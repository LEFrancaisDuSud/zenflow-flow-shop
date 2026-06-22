import { createFileRoute } from "@tanstack/react-router";
import { Mail, Clock, Instagram } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ZenFlow" },
      { name: "description", content: "Une question, un retour ? Notre équipe répond en moins de 24h." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-x py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="text-xs uppercase tracking-wider text-primary">Contact</div>
          <h1 className="mt-3 text-4xl md:text-6xl">Parlons-en.</h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Une question sur un produit, un suivi de commande, ou juste envie de discuter routine bien-être ? Écris-nous.
          </p>

          {sent ? (
            <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <p className="font-medium text-primary">Merci, ton message a bien été envoyé.</p>
              <p className="mt-1 text-sm text-muted-foreground">On te répond sous 24h ouvrées.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-10 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom"><input required className={inputCls} placeholder="Camille Dupont" /></Field>
                <Field label="Email"><input required type="email" className={inputCls} placeholder="camille@email.fr" /></Field>
              </div>
              <Field label="Sujet">
                <select className={inputCls} defaultValue="">
                  <option value="" disabled>Choisir un sujet</option>
                  <option>Question produit</option>
                  <option>Suivi de commande</option>
                  <option>Retour / remboursement</option>
                  <option>Partenariat / presse</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea required rows={6} className={inputCls} placeholder="Dis-nous tout..." />
              </Field>
              <button className="btn-primary">Envoyer le message</button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <Info icon={Mail} title="Email" value="bonjour@zenflow.fr" />
          <Info icon={Clock} title="Temps de réponse" value="< 24h, du lundi au samedi" />
          <Info icon={Instagram} title="Instagram & TikTok" value="@zenflow.fr" />

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg">FAQ rapide</h3>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <p className="font-medium">Quels délais de livraison ?</p>
                <p className="text-muted-foreground">48 à 72h en France métropolitaine.</p>
              </div>
              <div>
                <p className="font-medium">Puis-je retourner un produit ?</p>
                <p className="text-muted-foreground">Oui, 30 jours satisfait ou remboursé.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Info({ icon: Icon, title, value }: { icon: typeof Mail; title: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border bg-card p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon size={18} /></div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}
