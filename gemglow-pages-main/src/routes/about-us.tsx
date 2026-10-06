import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { InteractiveWorldMap } from "@/components/site/InteractiveWorldMap";
import { pageHead } from "@/lib/seo";
import mark from "@/assets/facette-mark.png";

export const Route = createFileRoute("/about-us")({
  head: () => pageHead({
    title: "About Us — A Design-Led House of Material & Craft",
    description: "Facette & Co. is a design-led house working across gemstones, jewellery manufacturing, fashion hardware and corporate gifting, connected to global craft centres.",
    path: "/about-us",
    jsonLd: { "@type": "Organization", name: "Facette & Co.", url: "/", description: "Gemstones, design & manufacturing, fashion hardware and corporate gifting." },
  }),
  component: AboutPage,
});

const verticals = [
  { n: "Gemstones", d: "Natural gemstones selected for colour, character and possibility.", to: "/gemstones" as const },
  { n: "Design & Manufacturing", d: "From an idea to a precisely finished piece.", to: "/jewellery" as const },
  { n: "Fashion Hardware", d: "Distinctive metal components made to define the details.", to: "/contact" as const },
  { n: "Corporate Gifting", d: "Thoughtfully crafted objects made to be remembered.", to: "/contact" as const },
];


function AboutPage() {
  return (
    <>
      <section className="container-x pb-24 pt-44">
        <img src={mark} alt="Facette & Co. emblem" width={96} height={96} className="h-24 w-24" />
        <p className="eyebrow mt-10">Beyond the conventional</p>
        <h1 className="display mt-6 max-w-5xl text-5xl md:text-8xl">
          We do not define ourselves merely by what we manufacture.
        </h1>
        <Reveal><p className="display mt-6 text-4xl text-gold md:text-6xl"><em>Nor simply by what we supply.</em></p></Reveal>
      </section>

      <section className="border-t hairline py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal className="text-xl leading-relaxed text-muted-foreground">
            Our vision is to create curated works of fine metal artistry that transcend conventional jewellery and materials.
            Every creation is conceived as a distinctive artistic expression, thoughtfully crafted to inspire designers, creators and visionaries.
          </Reveal>
          <Reveal delay={150} className="font-serif text-3xl leading-snug">
            Rather than simply producing products, we shape objects that can be imagined, named and redefined by the creative minds who bring them to life.
          </Reveal>
        </div>
        <div className="container-x mt-24">
          <p className="display text-5xl md:text-7xl">Materials with possibility.<br /><span className="text-gradient-gold">Objects with intent.</span></p>
        </div>
      </section>

      <section className="surface-ivory py-28">
        <div className="container-x">
          <p className="eyebrow">Four verticals</p>
          <h2 className="display mt-5 text-5xl">One house, four capabilities.</h2>
          <div className="mt-14 grid gap-px border border-current/15 bg-current/15 md:grid-cols-2">
            {verticals.map((v, i) => (
              <Link key={v.n} to={v.to} className="group bg-ivory p-10 transition-colors hover:bg-bone">
                <p className="font-serif text-emerald">0{i + 1}</p>
                <h3 className="mt-4 text-4xl">{v.n}</h3>
                <p className="mt-3 italic opacity-75">{v.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#07090e] border-t hairline border-gold/25">
        <div className="container-x">
          <p className="eyebrow !text-gold">Connected by craft</p>
          <h2 className="display mt-5 text-4xl sm:text-5xl md:text-6xl text-ivory">
            We move where material, expertise <em className="text-gold italic font-serif">and opportunity meet.</em>
          </h2>
          <div className="mt-14">
            <InteractiveWorldMap />
          </div>
          <div className="mt-16 text-center">
            <Link to="/contact" className="btn-gold">Begin the conversation →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
