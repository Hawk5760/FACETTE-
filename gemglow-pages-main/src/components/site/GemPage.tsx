import { Link } from "@tanstack/react-router";
import { PageHero, SectionHead } from "./PageHero";
import { Reveal } from "./Reveal";
import { EnquirySection } from "./EnquiryForm";

export type GemContent = {
  name: string;
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  storyTitle: React.ReactNode;
  story: string[];
  qualities: { label: string; text: string }[];
  origins: string[];
  shapes: string[];
  interest: string;
};

export function GemPage({ c }: { c: GemContent }) {
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} intro={c.intro} image={c.image} imageAlt={c.imageAlt}>
        <Link to="/contact" className="btn-gold">Request {c.name.toLowerCase()} sourcing</Link>
        <Link to="/gemstones" className="btn-line">All gemstones</Link>
      </PageHero>

      <section className="py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <SectionHead index="01" eyebrow={`About ${c.name}`} title={c.storyTitle} />
          <Reveal className="space-y-6 text-lg text-muted-foreground lg:pt-16">
            {c.story.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      <section className="surface-ivory py-28">
        <div className="container-x">
          <SectionHead index="02" eyebrow="What defines quality" title="Built around the details that matter." />
          <div className="mt-16 grid gap-px border border-current/15 bg-current/15 md:grid-cols-2 lg:grid-cols-4">
            {c.qualities.map((q, i) => (
              <Reveal key={q.label} delay={i * 80} className="bg-ivory p-8">
                <p className="font-serif text-5xl text-emerald">0{i + 1}</p>
                <h3 className="mt-6 text-2xl">{q.label}</h3>
                <p className="mt-3 text-sm opacity-75">{q.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="container-x grid gap-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">Origins we source from</p>
            <ul className="mt-8 divide-y divide-border border-y hairline">
              {c.origins.map((o) => <li key={o} className="py-5 font-serif text-3xl">{o}</li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Shapes &amp; cuts</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {c.shapes.map((s) => <li key={s} className="border hairline px-5 py-3 text-sm">{s}</li>)}
            </ul>
            <p className="mt-12 text-muted-foreground">
              IGI and GIA certification as standard. Tell us the colour, size, grade, quantity and certification you require —
              we source to your specification, not a fixed catalogue.
            </p>
          </div>
        </div>
      </section>

      <EnquirySection
        title={<>Looking for a specific <em className="text-gold">{c.name.toLowerCase()}</em>?</>}
        copy="Send us your requirement, reference or specification and we'll take it from there."
        defaultInterest={c.interest}
        cta="Request sourcing"
      />
    </>
  );
}
