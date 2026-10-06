import { ArrowDown } from "lucide-react";

interface VerticalHeroProps {
  eyebrow: string;
  title: string | React.ReactNode;
  description: string;
  ctaText: string;
  ctaTargetId?: string;
  subline: string;
  image: string;
  imageAlt: string;
}

export function VerticalHero({
  eyebrow,
  title,
  description,
  ctaText,
  ctaTargetId = "requirement-builder",
  subline,
  image,
  imageAlt,
}: VerticalHeroProps) {
  const handleScrollToCta = () => {
    const el = document.getElementById(ctaTargetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden border-b hairline">
      {/* Background Cinematic Visual Integrated into Hero */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover object-center brightness-[0.45] contrast-[1.08] saturate-[0.95]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="chapter-grain pointer-events-none absolute inset-0 opacity-20" />
      </div>

      {/* Hero Content */}
      <div className="container-x relative z-10 my-auto py-12 max-w-4xl">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="display text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-ivory leading-[1.04]">
          {title}
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-ivory/85 max-w-2xl font-light leading-relaxed">
          {description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={handleScrollToCta}
            className="btn-gold !py-4 !px-8 text-xs tracking-[0.25em]"
          >
            {ctaText} →
          </button>
          <a
            href="#enquire"
            className="btn-line !py-4 !px-8 text-xs tracking-[0.25em]"
          >
            Direct Enquiry
          </a>
        </div>
      </div>

      {/* Subline bar at the bottom */}
      <div className="container-x relative z-10 pt-8 border-t hairline flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-gold font-medium max-w-2xl">
          {subline}
        </p>
        <button
          type="button"
          onClick={handleScrollToCta}
          className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground hover:text-gold transition-colors self-start md:self-auto"
        >
          <ArrowDown size={14} /> Explore Process
        </button>
      </div>
    </section>
  );
}
