import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link to="/" className="font-display text-2xl">
            Zen<span className="text-primary">Flow</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Libère ton corps, recharge ton énergie. Outils premium pour le massage, la récupération et le bien-être quotidien.
          </p>
          <div className="mt-5 flex gap-2">
            <a href="https://instagram.com" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-accent">
              <Instagram size={15} />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-accent">
              <Facebook size={15} />
            </a>
            <a href="mailto:hello@zenflow.fr" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-accent">
              <Mail size={15} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em]">Boutique</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/boutique" className="hover:text-primary">Tous les produits</Link></li>
            <li><Link to="/boutique" className="hover:text-primary">Best-sellers</Link></li>
            <li><Link to="/boutique" className="hover:text-primary">Nouveautés</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em]">Aide</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/livraison-retours" className="hover:text-primary">Livraison & retours</Link></li>
            <li><Link to="/a-propos" className="hover:text-primary">Notre histoire</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em]">Légal</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/cgv" className="hover:text-primary">CGV</Link></li>
            <li><Link to="/mentions-legales" className="hover:text-primary">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="hover:text-primary">Confidentialité</Link></li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
            <span className="rounded border px-2 py-1">VISA</span>
            <span className="rounded border px-2 py-1">MC</span>
            <span className="rounded border px-2 py-1">PayPal</span>
            <span className="rounded border px-2 py-1">Apple Pay</span>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container-x py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ZenFlow · Made with care in France
        </div>
      </div>
    </footer>
  );
}
