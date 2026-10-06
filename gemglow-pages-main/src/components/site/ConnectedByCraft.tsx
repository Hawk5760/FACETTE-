import { Reveal } from "@/components/site/Reveal";
import { InteractiveWorldMap } from "@/components/site/InteractiveWorldMap";

export function ConnectedByCraft() {
  return (
    <section
      className="relative py-28 md:py-36 bg-[#07090e] border-t hairline border-gold/25 overflow-hidden"
      aria-label="Connected by Craft"
    >
      <div className="container-x">
        {/* Section Headline & Editorial Prologue */}
        <div className="max-w-4xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" />
              <p className="eyebrow !text-gold tracking-[0.32em]">
                CONNECTED BY CRAFT
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="display mt-6 text-4xl sm:text-5xl md:text-6xl text-ivory leading-[1.08]">
              WE MOVE WHERE<br />
              <span className="text-gold italic font-serif">
                MATERIAL, EXPERTISE AND OPPORTUNITY MEET.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
              From historic gemstone lapidaries and diamond-cutting origins in South Asia to the high jewellery ateliers of Place Vendôme, Milanese metal casting studios and global trade crossroads.
            </p>
          </Reveal>
        </div>

        {/* Real Interactive World Map with Smooth Camera Transitions & Scroll Illumination */}
        <div className="mt-14 sm:mt-16">
          <InteractiveWorldMap />
        </div>

        {/* Global reach footnote */}
        <div className="mt-14 pt-8 border-t hairline border-gold/15 text-center max-w-2xl mx-auto">
          <p className="text-xs text-muted-foreground/80 tracking-[0.24em] uppercase font-light">
            Global reach + proximity to important material, manufacturing, design and luxury markets.
          </p>
        </div>
      </div>
    </section>
  );
}
