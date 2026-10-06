import { useState, type FormEvent, type ChangeEvent } from "react";
import { Upload, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export type VerticalType = "gemstones" | "design-manufacturing" | "fashion-hardware" | "corporate-gifting";

interface RequirementBuilderProps {
  vertical: VerticalType;
  title?: string;
  ctaText: string;
  onSubmitted?: (summary: Record<string, string>) => void;
}

export function RequirementBuilder({ vertical, title = "Tell us what you're looking for.", ctaText, onSubmitted }: RequirementBuilderProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFormData((prev) => ({ ...prev, referenceFile: file.name }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitted) {
      onSubmitted(formData);
    }
  };

  if (submitted) {
    return (
      <div className="border hairline p-10 md:p-14 bg-card/60 backdrop-blur-sm transition-all duration-700">
        <div className="flex items-center gap-3 text-gold">
          <CheckCircle2 size={24} strokeWidth={1.5} />
          <p className="eyebrow">Specification Received</p>
        </div>
        <h3 className="display mt-4 text-3xl md:text-4xl text-ivory">
          Your requirement has been catalogued.
        </h3>
        <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
          Our technical specialists and sourcing directors review all parameters against our live inventory and production ateliers. We will contact you with matched specifications.
        </p>
        <div className="mt-8 pt-6 border-t hairline flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="btn-line !py-2.5 !px-5 text-xs"
          >
            Edit Specification
          </button>
          <a href="#enquire" className="btn-gold !py-2.5 !px-5 text-xs">
            Proceed to Final Details <ArrowRight size={14} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border hairline p-8 md:p-12 bg-card/40 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b hairline pb-6 mb-8">
        <div>
          <p className="eyebrow">Interactive Builder</p>
          <h3 className="font-serif text-3xl md:text-4xl mt-2 text-ivory">{title}</h3>
        </div>
        <span className="text-[10px] tracking-[0.25em] uppercase text-gold/70 hidden sm:inline-block">
          Bespoke Parameter Engine
        </span>
      </div>

      {vertical === "gemstones" && (
        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <label className="block field-label mb-1">Stone — Select Gemstone</label>
            <select required name="stone" onChange={handleChange} className="field">
              <option value="" disabled selected>Select gemstone</option>
              <option>Emerald</option>
              <option>Ruby</option>
              <option>Sapphire</option>
              <option>Diamond</option>
              <option>Spinel</option>
              <option>Tourmaline</option>
              <option>Garnet</option>
              <option>Opal</option>
              <option>Other Coloured Gemstones</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Stone Type</label>
            <select name="stoneType" onChange={handleChange} className="field">
              <option>Natural (Standard)</option>
              <option>Other / Treated</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Size — Required Size (Carat / mm)</label>
            <input name="size" placeholder="e.g. 3.50 carats or 10 × 8 mm" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Colour — Preferred Colour</label>
            <input name="colour" placeholder="e.g. Vivid Green / Pigeon Blood / Royal Blue" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Grade — Preferred Grade</label>
            <input name="grade" placeholder="e.g. Eye-clean, Minor oil, Top gem" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Certification — Required Certification</label>
            <select name="certification" onChange={handleChange} className="field">
              <option>GIA Certified</option>
              <option>IGI Certified</option>
              <option>Gubelin / SSEF</option>
              <option>Direct Trade Access / Any Tier-1</option>
              <option>None required</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Quantity — Required Quantity</label>
            <input name="quantity" placeholder="Single stone, matched pair, or parcel" onChange={handleChange} className="field" />
          </div>

          <div className="md:col-span-2">
            <label className="block field-label mb-1">Additional Requirements</label>
            <textarea
              name="additionalRequirements"
              rows={3}
              placeholder="Origin preference (e.g., Colombia, Burma, Ceylon), cut preference (emerald cut, oval, cushion), budget parameters."
              onChange={handleChange}
              className="field resize-none"
            />
          </div>
        </div>
      )}

      {vertical === "design-manufacturing" && (
        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <label className="block field-label mb-1">Project Type</label>
            <select name="projectType" onChange={handleChange} className="field">
              <option value="" disabled selected>Select project type</option>
              <option>Fine Jewellery Collection</option>
              <option>Bespoke Metal Object</option>
              <option>Custom Architectural Component</option>
              <option>Private-Label Production</option>
              <option>Other Bespoke Creation</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Development Stage</label>
            <select name="developmentStage" onChange={handleChange} className="field">
              <option>Concept</option>
              <option>Sketch</option>
              <option>CAD / 3D Model</option>
              <option>Prototype in Progress</option>
              <option>Existing Product Refinement</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Material</label>
            <select name="material" onChange={handleChange} className="field">
              <option>18k Yellow Gold</option>
              <option>18k White Gold</option>
              <option>18k Rose Gold</option>
              <option>Platinum (PT950)</option>
              <option>Sterling Silver (925)</option>
              <option>Sculptural Brass / Bronze</option>
              <option>Titanium / Stainless Steel</option>
              <option>Mixed Precious Metals</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Quantity</label>
            <input name="quantity" placeholder="e.g. 1 Sample prototype / 50 piece run" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Dimensions</label>
            <input name="dimensions" placeholder="e.g. Ring size 7, or 45 × 25 × 8 mm" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Finish</label>
            <select name="finish" onChange={handleChange} className="field">
              <option>High Polish</option>
              <option>Brushed Satin</option>
              <option>Micro-Textured / Hammered</option>
              <option>Grand Feu Enamelling</option>
              <option>Heavy Micron Plating</option>
              <option>Custom Artisan Finish</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">NDA Requirement</label>
            <select name="nda" onChange={handleChange} className="field">
              <option>Required (We provide NDA)</option>
              <option>Not Required</option>
              <option>Discuss on Call</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Reference (Sketch / CAD / STL / Image)</label>
            <label className="field flex items-center justify-between cursor-pointer text-sm py-2">
              <span className="truncate text-muted-foreground">{fileName || "Upload sketch, CAD or reference"}</span>
              <Upload size={16} className="text-gold shrink-0" />
              <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.png,.jpg,.jpeg,.stl,.step,.dwg,.ai" />
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block field-label mb-1">Project Details</label>
            <textarea
              name="projectDetails"
              rows={3}
              placeholder="Describe the aesthetic vision, technical constraints, stones to be set, or target delivery window."
              onChange={handleChange}
              className="field resize-none"
            />
          </div>
        </div>
      )}

      {vertical === "fashion-hardware" && (
        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <label className="block field-label mb-1">Component / Idea</label>
            <input name="componentIdea" placeholder="e.g. Sculptural buckle, magnetic clasp, custom lock" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Application</label>
            <select name="application" onChange={handleChange} className="field">
              <option>Fashion Garment</option>
              <option>Luxury Handbag / Leather Goods</option>
              <option>Footwear Hardware</option>
              <option>Fine Accessory / Jewellery Accent</option>
              <option>Other Custom Category</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Material</label>
            <input name="material" placeholder="e.g. Solid Brass, Grade 5 Titanium, 925 Silver, Stainless Steel" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Dimensions</label>
            <input name="dimensions" placeholder="e.g. Width 35mm strap opening, 5mm depth" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Finish</label>
            <select name="finish" onChange={handleChange} className="field">
              <option>Mirror Polished</option>
              <option>Directional Brushed</option>
              <option>Matte PVD / DLC Coating</option>
              <option>Textured / Chiseled</option>
              <option>Artisan Patina / Custom</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Quantity</label>
            <input name="quantity" placeholder="Single sample / Production batch volume" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">NDA Requirement</label>
            <select name="ndaRequirement" onChange={handleChange} className="field">
              <option>Yes (NDA required before technical review)</option>
              <option>No</option>
              <option>Discuss</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Reference (Drawing / Image / CAD)</label>
            <label className="field flex items-center justify-between cursor-pointer text-sm py-2">
              <span className="truncate text-muted-foreground">{fileName || "Upload drawing, CAD or moodboard"}</span>
              <Upload size={16} className="text-gold shrink-0" />
              <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.png,.jpg,.jpeg,.stl,.step,.dxf,.ai" />
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block field-label mb-1">Additional Requirements</label>
            <textarea
              name="additionalRequirements"
              rows={3}
              placeholder="Mechanism requirements, tensile load expectations, engraving/logo details, and target timelines."
              onChange={handleChange}
              className="field resize-none"
            />
          </div>
        </div>
      )}

      {vertical === "corporate-gifting" && (
        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <label className="block field-label mb-1">Company / Brand</label>
            <input required name="companyBrand" placeholder="Your organisation or brand name" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Occasion</label>
            <select name="occasion" onChange={handleChange} className="field">
              <option>Company Anniversary &amp; Heritage Milestone</option>
              <option>Executive Leadership Summit / Board Gifting</option>
              <option>Major Deal Closing / IPO Commemoration</option>
              <option>VIP Client / Investor Recognition</option>
              <option>Global Brand Experience / Launch Event</option>
              <option>Employee Appreciation &amp; Honors</option>
              <option>Other Custom Occasion</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Audience</label>
            <select name="audience" onChange={handleChange} className="field">
              <option>Clients</option>
              <option>C-Suite Executives</option>
              <option>Employees / Team</option>
              <option>VIP Investors / Partners</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Quantity</label>
            <input name="quantity" placeholder="e.g. 25 bespoke pieces / 250 units" onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="block field-label mb-1">Budget Range</label>
            <select name="budgetRange" onChange={handleChange} className="field">
              <option>Premium ($150 – $350 / unit)</option>
              <option>Executive ($350 – $750 / unit)</option>
              <option>High Luxury ($750 – $2,000 / unit)</option>
              <option>Bespoke Artistry ($2,000+ / unit)</option>
              <option>To be determined</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Product Preference</label>
            <select name="productPreference" onChange={handleChange} className="field">
              <option>Existing Concept Adaption</option>
              <option>Fully Bespoke Sculptural Object</option>
              <option>Fine Jewellery / Lapel / Cuff Accents</option>
              <option>Architectural Desk Pieces</option>
              <option>Open to Design Studio Recommendations</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Personalisation</label>
            <select name="personalisation" onChange={handleChange} className="field">
              <option>Logo &amp; Discreet Typography</option>
              <option>Individual Recipient Name &amp; Date</option>
              <option>Custom Serialisation / Hallmark</option>
              <option>Custom Inscription</option>
            </select>
          </div>

          <div>
            <label className="block field-label mb-1">Packaging</label>
            <select name="packaging" onChange={handleChange} className="field">
              <option>Required (Handcrafted Presentation Box)</option>
              <option>Not Required</option>
              <option>Discuss Options</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block field-label mb-1">Project Details</label>
            <textarea
              name="projectDetails"
              rows={3}
              placeholder="Tell us about the narrative you wish to celebrate, materials preferred, or specific distribution deadlines."
              onChange={handleChange}
              className="field resize-none"
            />
          </div>
        </div>
      )}

      <div className="mt-10 pt-6 border-t hairline flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs text-muted-foreground max-w-sm">
          Specifications are reviewed under strict confidentiality and routed directly to our dedicated craft studio.
        </p>
        <button type="submit" className="btn-gold w-full sm:w-auto text-center !px-8 !py-4">
          {ctaText} →
        </button>
      </div>
    </form>
  );
}
