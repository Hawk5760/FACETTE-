import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mark from "@/assets/facette-mark.png";

const nav = [
  { to: "/gemstones", label: "Gemstones" },
  { to: "/design-manufacturing", label: "Design & Manufacturing" },
  { to: "/fashion-hardware", label: "Fashion Hardware" },
  { to: "/corporate-gifting", label: "Corporate Gifting" },
  { to: "/about-us", label: "About" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "bg-[#0a0d13]/95 backdrop-blur-md border-b hairline shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        {/* Logo: FACETTE & CO */}
        <Link to="/" className="flex items-center gap-3" aria-label="Facette & Co. home">
          <img src={mark} alt="" width={30} height={30} className="h-7 w-7 object-contain opacity-90" />
          <span className="font-serif text-lg tracking-[0.24em] text-ivory uppercase">
            FACETTE <span className="text-gold">&amp;</span> CO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 xl:gap-8 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-gold" }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href="#enquire"
            className="btn-line !px-5 !py-2.5 text-[0.68rem] tracking-[0.24em]"
          >
            Enquire
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[0.7rem] uppercase tracking-[0.26em] text-gold"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="container-x flex flex-col gap-5 pb-8 pt-4 lg:hidden bg-[#0a0d13]/98 border-b hairline" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="font-serif text-2xl text-ivory hover:text-gold transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <a
            href="#enquire"
            onClick={() => setOpen(false)}
            className="btn-gold !py-3 text-center text-xs mt-2"
          >
            Enquire
          </a>
        </nav>
      )}
    </header>
  );
}
