import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, image, imageAlt, children }: {
  eyebrow: string; title: ReactNode; intro: string; image: string; imageAlt: string; children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden pb-20 pt-32">
      <img src={image} alt={imageAlt} width={1600} height={1008}
        className="animate-slow-zoom absolute inset-0 h-full w-full object-cover object-right" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "var(--gradient-fade)" }} />
      <div className="container-x relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-6 max-w-4xl text-5xl md:text-7xl lg:text-8xl">{title}</h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">{intro}</p>
        {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ index, eyebrow, title, className = "" }: {
  index?: string; eyebrow: string; title: ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow">{index && <span className="mr-3 opacity-60">{index}</span>}{eyebrow}</p>
      <h2 className="display mt-5 max-w-3xl text-4xl md:text-6xl">{title}</h2>
    </div>
  );
}
