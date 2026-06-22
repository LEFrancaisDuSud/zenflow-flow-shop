import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ThemeToggle } from "./ThemeToggle";

export function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background">
      <div className="container-x flex items-center justify-center py-2 text-center text-xs sm:text-sm">
        🚚 Livraison gratuite dès 50€&nbsp;&nbsp;|&nbsp;&nbsp;Code <strong className="text-gold mx-1">ZEN10</strong> pour -10%
      </div>
    </div>
  );
}

const nav = [
  { to: "/boutique", label: "Boutique" },
  { to: "/boutique", label: "Best-sellers", search: { tag: "best" } as Record<string, string> | undefined },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { itemCount, openCart, lastAddedAt } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lastAddedAt) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      return () => clearTimeout(t);
    }
  }, [lastAddedAt]);

  return (
    <>
      <AnnouncementBar />
      <header className={`sticky top-0 z-30 transition-all ${scrolled ? "bg-background/90 backdrop-blur shadow-sm" : "bg-background"}`}>
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" className="font-display text-2xl font-medium tracking-tight">
            Zen<span className="text-primary">Flow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} className="text-foreground/80 hover:text-primary transition" activeProps={{ className: "text-primary" }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={openCart}
              aria-label="Ouvrir le panier"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-accent"
            >
              <ShoppingBag size={16} />
              {itemCount > 0 && (
                <span className={`absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-gold-foreground ${bump ? "animate-pop" : ""}`}>
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden ml-1 rounded-full p-2 hover:bg-accent" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container-x flex flex-col py-3">
              {nav.map((n) => (
                <Link key={n.label} to={n.to} onClick={() => setMobileOpen(false)} className="py-3 text-foreground/80">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
