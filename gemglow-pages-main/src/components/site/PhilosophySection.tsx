import { Reveal } from "@/components/site/Reveal";

export function PhilosophySection() {
  return (
    <section className="relative py-36 md:py-48 bg-background border-t hairline overflow-hidden" aria-label="Brand Philosophy">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,_rgba(213,181,129,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container-x relative z-10 max-w-5xl">
        {/* Eyebrow */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" />
            <p className="eyebrow !text-gold tracking-[0.34em]">
              BEYOND THE CONVENTIONAL
            </p>
          </div>
        </Reveal>

        {/* Main statement */}
        <Reveal delay={120}>
          <h2 className="display mt-10 text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-ivory leading-[1.04] tracking-[-0.01em] uppercase">
            WE DO NOT DEFINE OURSELVES MERELY BY WHAT WE MANUFACTURE.
          </h2>
        </Reveal>

        {/* Then reveal: NOR SIMPLY BY WHAT WE SUPPLY. */}
        <Reveal delay={240}>
          <p className="display mt-6 text-3xl sm:text-5xl md:text-6xl text-gold italic">
            Nor simply by what we supply.
          </p>
        </Reveal>

        {/* Supporting copy */}
        <div className="mt-16 md:mt-24 grid gap-10 md:grid-cols-[1.2fr_1fr] items-start pt-12 border-t hairline">
          <Reveal delay={360}>
            <p className="text-xl sm:text-2xl text-ivory/85 font-light leading-relaxed">
              Our vision is to create curated works of fine metal artistry that transcend conventional jewellery and materials. Every creation is conceived as a distinctive artistic expression, thoughtfully crafted to inspire designers, creators and visionaries.
            </p>
          </Reveal>

          {/* Then a final statement */}
          <Reveal delay={480}>
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed border-l hairline pl-6">
              Rather than simply producing products, we shape objects that can be imagined, named and redefined by the creative minds who bring them to life.
            </p>
          </Reveal>
        </div>

        {/* End with a large visual statement */}
        <div className="mt-24 md:mt-32 pt-16 border-t hairline">
          <Reveal delay={540}>
            <div className="space-y-3">
              <p className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-[0.14em]">
                MATERIALS WITH POSSIBILITY.
              </p>
              <p className="font-serif text-3xl sm:text-5xl md:text-6xl text-gold tracking-[0.14em] italic">
                OBJECTS WITH INTENT.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
