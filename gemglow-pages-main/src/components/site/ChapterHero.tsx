import { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronRight, Play } from "lucide-react";
import ring from "@/assets/hero-ring.jpg";
import gems from "@/assets/gemstones.jpg";
import atelier from "@/assets/jewellery.jpg";

const chapters = [
  { number: "01", label: "Material", title: <>Where material becomes <em className="text-gold">possibility.</em></>,
    description: "Exceptional materials, considered design and precise execution — created for those who imagine beyond the ordinary.",
    image: ring, alt: "Gold ring set with a large emerald-cut emerald, cinematically lit" },
  { number: "02", label: "Design", title: <>Selected for colour <em className="text-gold">and character.</em></>,
    description: "Natural, certified emeralds, sapphires and rubies sourced around your exact specification.",
    image: gems, alt: "Natural rough and faceted coloured gemstones on dark slate" },
  { number: "03", label: "Craft", title: <>From an idea to a <em className="text-gold">finished piece.</em></>,
    description: "CAD, prototyping, finishing and precision manufacturing — jewellery developed around your vision.",
    image: atelier, alt: "Jeweller finishing a gold emerald ring at an atelier bench" },
];

export function ChapterHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const chapter = chapters[active] ?? chapters[0]!;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const s = sectionRef.current;
        if (!s) return;
        const len = s.offsetHeight - window.innerHeight;
        const next = len > 0 ? Math.max(0, Math.min(1, -s.getBoundingClientRect().top / len)) : 0;
        setProgress(next);
        setActive(Math.min(chapters.length - 1, Math.floor(next * chapters.length)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const next = () => {
    const s = sectionRef.current;
    if (!s) return;
    if (active === chapters.length - 1) { window.scrollTo({ top: s.offsetTop + s.offsetHeight, behavior: "smooth" }); return; }
    const d = s.offsetHeight - window.innerHeight;
    window.scrollTo({ top: s.offsetTop + ((active + 1) / chapters.length + 0.02) * d, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative h-[300vh]" aria-label="Material, design, craft">
      <div className="sticky top-0 h-dvh min-h-[550px] overflow-hidden">
        {chapters.map((c, i) => (
          <div key={c.number} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${active === i ? "opacity-100" : "opacity-0"}`} aria-hidden={active !== i}>
            <img src={c.image} alt={c.alt} width={1600} height={1008} loading={i === 0 ? "eager" : "lazy"}
              className="size-full object-cover object-[65%_center]"
              style={{ transform: active === i ? "scale(1)" : "scale(1.07)", transition: "transform 1.4s ease" }} />
          </div>
        ))}
        <div className="chapter-shade absolute inset-0" />
        <div className="chapter-grain pointer-events-none absolute inset-0 opacity-20" />

        <div className="container-x absolute inset-0 z-20 flex items-center pb-16 pt-24">
          <div key={active} className="chapter-copy max-w-[780px]">
            <div className="mb-8 flex items-center gap-4 text-gold">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em]">Chapter {chapter.number} / {chapter.label}</span>
            </div>
            {active === 0
              ? <h1 className="display text-6xl md:text-[clamp(4.5rem,7.5vw,8rem)]">{chapter.title}</h1>
              : <h2 className="display text-6xl md:text-[clamp(4.5rem,7.5vw,8rem)]">{chapter.title}</h2>}
            <p className="mt-7 max-w-md border-l border-gold/70 pl-5 leading-7 text-ivory/85">{chapter.description}</p>
            <button type="button" onClick={next} className="group mt-9 flex items-center gap-4 hover:text-gold">
              <span className="flex size-12 items-center justify-center rounded-full border border-ivory/50 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-background">
                <ChevronRight size={20} strokeWidth={1.5} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em]">{active === chapters.length - 1 ? "Discover the house" : "Explore sequence"}</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-9 left-12 z-30 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ivory/70 md:flex">
          <ArrowDown size={15} /> Scroll to explore
        </div>
        <div className="absolute bottom-5 right-5 z-30 flex items-center gap-4 rounded-full border border-ivory/20 bg-background/85 py-2 pl-5 pr-2 backdrop-blur-xl md:bottom-8 md:right-12">
          <div className="min-w-24">
            <span className="block text-[9px] uppercase tracking-[0.17em] text-gold">Chapter {chapter.number}</span>
            <span className="block text-xs">{chapter.label}</span>
          </div>
          <div className="relative flex size-11 items-center justify-center">
            <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--chapter-track)" strokeWidth="1.5" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--chapter-progress)" strokeWidth="1.5" strokeDasharray="113.1" strokeDashoffset={113.1 * (1 - progress)} strokeLinecap="round" />
            </svg>
            <Play size={13} fill="currentColor" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
