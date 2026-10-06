import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import intactRing from "@/assets/hero-ring.jpg";
import deconstructedRing from "@/assets/ring-deconstructed.jpg";

const fragments = [
  { label: "Gemstones", meta: "Direct Origin & Certification" },
  { label: "Jewellery", meta: "Bespoke Fine Atelier" },
  { label: "Metal", meta: "Precision Alloys & Gold" },
  { label: "Fashion Hardware", meta: "Sculpted Luxury Closures" },
  { label: "Crafted Objects", meta: "Executive Commemoratives" },
];

export function ScrollRingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      if (totalScroll > 0) {
        const p = Math.max(0, Math.min(1, -rect.top / totalScroll));
        targetProgressRef.current = p;
      }
    };

    const loop = () => {
      // Smooth linear interpolation (lerp) for cinematic fluid motion
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.085;
        setProgress(currentProgressRef.current);
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Animation states based on smooth progress (0 to 1)
  // Stage 1: 0 - 0.28 -> Beginning (complete ring, subtle rotation, traveling light)
  // Stage 2: 0.28 - 0.58 -> Macro camera zoom, prominent gemstone facets
  // Stage 3: 0.58 - 0.82 -> Deconstruction (emerald lifts, mount & prongs separate, MATERIAL -> DESIGN -> CRAFT)
  // Stage 4: 0.82 - 1.00 -> Wider world fragments & natural resolution

  const isZoomed = progress >= 0.22 && progress < 0.62;
  const isDeconstructed = progress >= 0.52;
  const isFragments = progress >= 0.80;

  // Smooth camera zoom: 1.00 -> 1.32 -> 1.15
  let cameraScale = 1;
  let ringRotation = -1.5 + progress * 8.5; // gentle, restrained rotation
  let deconstructOpacity = 0;

  if (progress < 0.50) {
    cameraScale = 1 + progress * 0.64;
    deconstructOpacity = 0;
  } else if (progress < 0.75) {
    cameraScale = 1.32 - (progress - 0.50) * 0.68;
    deconstructOpacity = Math.min(1, Math.max(0, (progress - 0.50) / 0.16));
  } else {
    cameraScale = 1.15 - (progress - 0.75) * 0.35;
    deconstructOpacity = 1;
  }

  // Smooth light travel sheen position
  const lightPos = (progress * 160) % 100;

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] bg-[#07090d] text-ivory"
      aria-label="Hero Experience"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Full-Screen Ambient Lighting & Dark Luxury Environment */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_65%_50%,_rgba(18,24,34,0.95)_0%,_rgba(7,9,13,1)_85%)] pointer-events-none z-0" />
        <div className="chapter-grain pointer-events-none absolute inset-0 opacity-20 z-0" />

        {/* 
          FULL-SCREEN SCULPTURAL RING VISUAL 
          Occupies the full viewport, seamlessly vignetted with radial masks so zero hard rectangular edges ever appear.
        */}
        <div className="absolute inset-0 z-10 flex items-center justify-center lg:justify-end lg:pr-12 pointer-events-none">
          <div
            className="relative w-[90vw] sm:w-[80vw] lg:w-[62vw] xl:w-[58vw] h-[70vh] sm:h-[80vh] lg:h-[90vh] flex items-center justify-center will-change-transform"
            style={{
              transform: `scale(${cameraScale}) rotate(${ringRotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            {/* Ambient Caustic Glow */}
            <div
              className="absolute inset-4 rounded-full blur-3xl opacity-35 transition-all duration-700"
              style={{
                background: isDeconstructed
                  ? "radial-gradient(circle, rgba(5,98,76,0.55) 0%, rgba(213,181,129,0.3) 45%, transparent 75%)"
                  : "radial-gradient(circle, rgba(213,181,129,0.32) 0%, rgba(14,61,61,0.38) 45%, transparent 70%)",
              }}
            />

            {/* 
              Layer 1: Intact Assembled Ring 
              Masked seamlessly with radial gradient so edges fade to 0 opacity
            */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
              style={{
                opacity: 1 - deconstructOpacity,
                maskImage: "radial-gradient(ellipse 62% 60% at 50% 48%, black 42%, transparent 78%)",
                WebkitMaskImage: "radial-gradient(ellipse 62% 60% at 50% 48%, black 42%, transparent 78%)",
              }}
            >
              <img
                src={intactRing}
                alt="Photorealistic sculptural ring with Colombian emerald"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
              />
            </div>

            {/* 
              Layer 2: Deconstructed Architectural Ring (Stone separates from mount)
              Masked seamlessly with radial gradient so edges fade to 0 opacity
            */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
              style={{
                opacity: deconstructOpacity,
                maskImage: "radial-gradient(ellipse 62% 60% at 50% 48%, black 42%, transparent 78%)",
                WebkitMaskImage: "radial-gradient(ellipse 62% 60% at 50% 48%, black 42%, transparent 78%)",
              }}
            >
              <img
                src={deconstructedRing}
                alt="Deconstructed architectural ring showing separated Colombian emerald and precision gold mount"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_70px_rgba(0,0,0,0.98)]"
              />
            </div>

            {/* Traveling Light Sheen Beam across emerald facets and gold */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 transition-opacity duration-500"
              style={{
                background: `linear-gradient(${110 + progress * 35}deg, transparent ${Math.max(0, lightPos - 22)}%, rgba(255,255,255,0.7) ${lightPos}%, rgba(213,181,129,0.85) ${lightPos + 5}%, transparent ${Math.min(100, lightPos + 22)}%)`,
                maskImage: "radial-gradient(ellipse 55% 55% at 50% 48%, black 40%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 55% 55% at 50% 48%, black 40%, transparent 75%)",
              }}
            />

            {/* Subtle Macro Callout Annotation */}
            <div
              className={`absolute bottom-8 right-8 border-l border-gold/60 pl-3 backdrop-blur-md bg-black/40 py-1.5 pr-3 transition-all duration-700 hidden sm:block ${
                isZoomed && !isDeconstructed ? "opacity-90 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold">Macro Faceting</p>
              <p className="text-xs text-ivory/85 font-serif">18K Au750 · Hand-set Prongs · Optical Reflection</p>
            </div>
          </div>
        </div>

        {/* 
          EDITORIAL HERO COPY 
          Positioned on the left side, carefully spaced and layered so it never collides with the central visual.
        */}
        <div className="container-x relative z-20 pt-28 sm:pt-32 lg:pt-36 max-w-7xl w-full pointer-events-auto">
          <div className="max-w-xl lg:max-w-2xl bg-gradient-to-r from-[#07090d]/80 via-[#07090d]/40 to-transparent p-2 sm:p-4 -ml-2 sm:-ml-4 rounded-sm">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" />
              <p className="eyebrow !text-gold tracking-[0.35em]">
                MATERIAL • DESIGN • CRAFT
              </p>
            </div>

            {/* Headline */}
            <h1 className="display text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] text-ivory mt-5 leading-[1.04] tracking-[-0.02em]">
              WHERE MATERIAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory via-ivory to-gold">
                BECOMES POSSIBILITY.
              </span>
            </h1>

            {/* Supporting Sentence */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-ivory/80 max-w-lg font-light leading-relaxed">
              Exceptional materials, considered design and precise execution — created for those who imagine beyond the ordinary.
            </p>

            {/* Deconstruction Stage Badge */}
            <div
              className={`mt-6 inline-flex items-center gap-3 px-4 py-2 border border-gold/30 bg-black/60 backdrop-blur-md transition-all duration-700 ${
                isDeconstructed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <Sparkles size={14} className="text-gold animate-pulse" />
              <span className="font-serif text-sm tracking-[0.2em] text-ivory">
                MATERIAL <span className="text-gold">→</span> DESIGN <span className="text-gold">→</span> CRAFT
              </span>
            </div>
          </div>
        </div>

        {/* Later Scroll: Fragments Representing Wider World */}
        {isFragments && (
          <div className="container-x relative z-20 my-auto pointer-events-auto transition-opacity duration-700">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
              The Facette &amp; Co. World
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl">
              {fragments.map((frag) => (
                <div
                  key={frag.label}
                  className="border hairline p-3 bg-black/75 backdrop-blur-md shadow-xl"
                >
                  <p className="font-serif text-base text-ivory">{frag.label}</p>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                    {frag.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Small Supporting Line & Progress Controls at Bottom */}
        <div className="container-x relative z-20 pb-8 pt-4 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto border-t border-white/5">
          {/* Small Supporting Line: Exact copy from Doc 2 */}
          <div className="max-w-xl">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-gold/90 font-light">
              GEMSTONES · DESIGN &amp; MANUFACTURING · FASHION HARDWARE · CORPORATE GIFTING
            </p>
          </div>

          {/* Scrubber & Current Phase Indicator */}
          <div className="flex items-center gap-4 self-end">
            <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ivory/60">
              <ArrowDown size={13} className="animate-bounce" />
              <span>Scroll to deconstruct</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-full border hairline bg-black/70 backdrop-blur-md">
              <div className="text-right">
                <span className="block text-[8px] uppercase tracking-[0.2em] text-gold">Phase</span>
                <span className="block text-xs font-serif text-ivory">
                  {isFragments
                    ? "Wider World"
                    : isDeconstructed
                    ? "Deconstruction"
                    : isZoomed
                    ? "Macro Geometry"
                    : "Assembled Ring"}
                </span>
              </div>
              <div className="w-8 h-8 relative flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="2"
                    strokeDasharray="88"
                    strokeDashoffset={88 * (1 - progress)}
                    strokeLinecap="round"
                    className="transition-all duration-75"
                  />
                </svg>
                <span className="absolute text-[8px] font-mono text-ivory">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
