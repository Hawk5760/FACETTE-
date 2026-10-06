import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-[#080a0f] py-20">
      <div className="container-x flex flex-col md:flex-row md:items-end justify-between gap-12">
        {/* Brand & Verticals */}
        <div>
          <p className="font-serif text-3xl tracking-[0.2em] text-ivory uppercase">
            FACETTE <span className="text-gold">&amp;</span> CO
          </p>
          <p className="mt-4 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground font-light max-w-lg leading-relaxed">
            GEMSTONES · DESIGN &amp; MANUFACTURING · FASHION HARDWARE · CORPORATE GIFTING
          </p>
        </div>

        {/* Links: Instagram · LinkedIn · Contact · Privacy */}
        <div className="flex flex-col md:items-end gap-5">
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              LinkedIn
            </a>
            <Link to="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
            <a href="#privacy" className="hover:text-gold transition-colors">
              Privacy
            </a>
          </nav>

          {/* Final statement */}
          <p className="font-serif text-lg text-gold/90 italic tracking-wider">
            CRAFTED FOR THOSE WHO CREATE.
          </p>

          <p className="text-[10px] text-muted-foreground/60 tracking-widest uppercase">
            © {new Date().getFullYear()} FACETTE &amp; CO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
