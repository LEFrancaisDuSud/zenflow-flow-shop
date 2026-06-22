import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="font-display text-2xl">Zen<span className="text-primary">Flow</span></Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Libère ton corps, recharge ton énergie. Outils premium pour le massage, la récupération et le bien-être quotidien.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Boutique</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/boutique" className="hover:text-primary">Tous les produits</Link></li>
            <li><Link to="/boutique" className="hover:text-primary">Best-sellers</Link></li>
            <li><Link to="/boutique" className="hover:text-primary">Nouveautés</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Aide</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/a-propos" className="hover:text-primary">À propos</Link></li>
            <li><a href="#" className="hover:text-primary">Livraison & retours</a></li>
            <li><a href="#" className="hover:text-primary">CGV / Mentions légales</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Suivez-nous</h4>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-accent"><Instagram size={16} /></a>
            <a href="#" aria-label="TikTok" className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-accent text-xs font-bold">TT</a>
            <a href="#" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-accent"><Facebook size={16} /></a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded border px-2 py-1">VISA</span>
            <span className="rounded border px-2 py-1">Mastercard</span>
            <span className="rounded border px-2 py-1">PayPal</span>
            <span className="rounded border px-2 py-1">Apple Pay</span>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container-x py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ZenFlow. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
