import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHead } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquirySection } from "@/components/site/EnquiryForm";
import { pageHead, breadcrumb } from "@/lib/seo";
import hero from "@/assets/jewellery.jpg";

export const Route = createFileRoute("/jewellery")({
  head: () => pageHead({
    title: "Jewellery Design & Manufacturing — CAD to Finished Piece",
    description: "Bespoke and private-label jewellery design and manufacturing: CAD, 3D modelling, prototyping, plating, enamelling and finishing. NDA available.",
    path: "/jewellery",
    jsonLd: breadcrumb("Jewellery", "/jewellery"),
  }),
  component: JewelleryPage,
});

const why = [
  { t: "Design + engineering", d: "Creative intent is developed alongside technical feasibility." },
  { t: "Dedicated technical expertise", d: "CAD designers, 3D development specialists and finishing experts work across the development process." },
  { t: "Prototype before commitment", d: "A physical sample can be developed before larger production." },
  { t: "Finishing as part of the design", d: "Enamelling, plating, polishing, texturing and other surface treatments are considered as part of the object." },
];
const process = [
  { t: "Concept", d: "We understand your creative direction, reference material, application and intended outcome." },
  { t: "CAD & 3D development", d: "Our CAD and 3D design team translates the concept into a precise digital model." },
  { t: "Technical refinement", d: "Dimensions, tolerances, construction, assembly and production feasibility are reviewed." },
  { t: "Prototype", d: "A sample can be developed to evaluate form, fit, functionality and finish." },
  { t: "Surface & finish", d: "Plating, enamelling, polishing, texturing and other finishing requirements are developed." },
  { t: "Production", d: "The approved specification moves into production." },
];
const caps = [
  { t: "Design & CAD", d: "Jewellery CAD · 3D product modelling · Technical modelling · STL preparation · Design refinement · Production-ready digital files" },
  { t: "Product development", d: "Concept development · Design engineering · Prototyping · Sample development · Technical refinement · Production feasibility" },
  { t: "Metal manufacturing", d: "Jewellery manufacturing · Bespoke metal objects · Custom components · Fashion hardware · Private-label production" },
  { t: "Surface & finishing", d: "Plating · Enamelling · Polishing · Brushing · Texturing · Surface treatments · Custom finishes" },
];

function JewelleryPage() {
  return (
    <>
      <PageHero
        eyebrow="02 — Jewellery · Design & Manufacturing"
        title={<>From concept to finished object, <em className="text-gold">built around your vision.</em></>}
        intro="Design development, technical engineering, prototyping and precision manufacturing for jewellery, metal objects and bespoke components."
        image={hero}
        imageAlt="Jeweller finishing a gold emerald ring at an atelier bench with sketches"
      >
        <Link to="/contact" className="btn-gold">Start a project</Link>
      </PageHero>

      <section className="py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <SectionHead eyebrow="What you need" title={<>You bring the idea. <em className="text-gold">We develop everything around it.</em></>} />
          <p className="text-lg text-muted-foreground lg:pt-16">
            From an initial sketch, reference or concept to a production-ready piece, our technical and creative teams work together
            to translate the idea into a manufacturable object.
          </p>
        </div>
        <div className="container-x mt-20 grid gap-px border hairline bg-border md:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 80} className="bg-background p-8">
              <h3 className="eyebrow">{w.t}</h3>
              <p className="mt-4 text-muted-foreground">{w.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="surface-ivory py-28">
        <div className="container-x">
          <SectionHead eyebrow="Development process" title="From idea to production-ready object." />
          <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3">
            {process.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 60} className="border-t border-current/20 pt-6">
                <p className="font-serif text-5xl text-emerald">0{i + 1}</p>
                <h3 className="mt-4 text-2xl">{s.t}</h3>
                <p className="mt-2 opacity-75">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-28">
        <div className="container-x">
          <SectionHead eyebrow="Capabilities" title={<>Designed with intention. <em className="text-gold">Made with precision.</em></>} />
          <div className="mt-16 divide-y divide-border border-y hairline">
            {caps.map((c) => (
              <div key={c.t} className="grid gap-4 py-8 md:grid-cols-[1fr_2fr]">
                <h3 className="font-serif text-3xl">{c.t}</h3>
                <p className="text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-emerald py-28">
        <div className="container-x grid gap-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">Development &amp; confidentiality</p>
            <h2 className="display mt-5 text-5xl">Develop before you scale.</h2>
            <p className="mt-6 opacity-80">A single-piece sample can be developed alongside the applicable development and production costs, allowing you to assess the design before moving into larger quantities.</p>
          </div>
          <div className="border-l border-gold/40 pl-10">
            <p className="eyebrow">Your idea remains yours</p>
            <p className="mt-5 font-serif text-3xl leading-snug">Where required, development can be undertaken under an NDA to maintain confidentiality around designs, concepts and product development.</p>
          </div>
        </div>
      </section>

      <EnquirySection
        title={<>Have an idea <em className="text-gold">worth making?</em></>}
        copy="Send us your concept, reference or requirement and let's explore what it can become."
        defaultInterest="Jewellery / Design & Manufacturing"
        cta="Start a conversation"
      />
    </>
  );
}
