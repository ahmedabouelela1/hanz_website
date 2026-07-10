import type {
  CatalogCategory,
  CatalogProduct,
  NewsArticle,
  Partner,
} from "@/types/content";
import { stockImages } from "@/lib/images";

// Local seed content. The site renders fully from this without a backend.
// When NEXT_PUBLIC_API_URL responds, the loaders in lib/content.ts use the API instead.

const IMG = stockImages;

export const catalogCategories: CatalogCategory[] = [
  { slug: "machined", title: "Machined Components" },
  { slug: "fabricated", title: "Fabricated Assemblies" },
  { slug: "structural", title: "Structural Steel" },
  { slug: "fasteners", title: "Fasteners & Fittings" },
];

export const catalogProducts: CatalogProduct[] = [
  {
    slug: "precision-shafts",
    category: "machined",
    categoryLabel: "Machined Components",
    title: "Precision Drive Shafts",
    summary: "Multi-axis turned shafts held to ±0.01 mm for rotating equipment.",
    description:
      "Precision drive shafts turned from certified alloy steel on multi-axis CNC lathes. Balanced, hardened, and ground to a mirror finish for high-speed rotating assemblies where runout is not negotiable.",
    image: IMG.cnc,
    gallery: [IMG.cnc, IMG.gears, IMG.metrology],
    specs: [
      { label: "Material", value: "42CrMo4 / 316L" },
      { label: "Tolerance", value: "±0.01 mm" },
      { label: "Surface finish", value: "Ra 0.4 µm" },
      { label: "Max length", value: "1,200 mm" },
    ],
    applications: ["Pumps & compressors", "Gearboxes", "Conveyor drives"],
    featured: true,
  },
  {
    slug: "welded-frames",
    category: "fabricated",
    categoryLabel: "Fabricated Assemblies",
    title: "Welded Machine Frames",
    summary: "Certified structural weldments, stress-relieved and machined flat.",
    description:
      "Heavy-gauge welded frames fabricated from laser-cut plate, welded to ISO 3834 by certified welders, then stress-relieved and precision-machined on datum faces for direct equipment mounting.",
    image: IMG.weld,
    gallery: [IMG.weld, IMG.fab, IMG.steel],
    specs: [
      { label: "Plate range", value: "6–40 mm" },
      { label: "Weld standard", value: "ISO 3834-2" },
      { label: "Flatness", value: "0.1 mm/m machined" },
      { label: "Finish", value: "Powder coat / galv" },
    ],
    applications: ["Machine bases", "Press frames", "Skid packages"],
    featured: true,
  },
  {
    slug: "structural-beams",
    category: "structural",
    categoryLabel: "Structural Steel",
    title: "Structural Beam Sets",
    summary: "Cut, drilled, and coated structural members ready to erect.",
    description:
      "Fabricated structural steel — beams, columns, and bracing — cut and drilled from your connection drawings, blast-cleaned and coated to spec, and delivered marked and bundled for erection.",
    image: IMG.steel,
    gallery: [IMG.steel, IMG.hall, IMG.plant],
    specs: [
      { label: "Grades", value: "S275 / S355" },
      { label: "Sections", value: "UB, UC, RHS, angle" },
      { label: "Coating", value: "Sa 2.5 + 2-coat" },
      { label: "Traceability", value: "Per-member cert" },
    ],
    applications: ["Industrial buildings", "Mezzanines", "Support structures"],
    featured: false,
  },
  {
    slug: "flanged-fittings",
    category: "fasteners",
    categoryLabel: "Fasteners & Fittings",
    title: "Flanged Pipe Fittings",
    summary: "Machined flanges and fittings for pressure and process lines.",
    description:
      "Precision-machined flanges and fittings to EN 1092 / ASME B16.5, pressure-tested and marked, in carbon and stainless grades for process and utility piping.",
    image: IMG.gears,
    gallery: [IMG.gears, IMG.cnc, IMG.metrology],
    specs: [
      { label: "Standards", value: "EN 1092 / ASME B16.5" },
      { label: "Rating", value: "PN10–PN40" },
      { label: "Material", value: "Carbon / 304 / 316" },
      { label: "Test", value: "Hydro + PMI" },
    ],
    applications: ["Process piping", "Utilities", "Skid assemblies"],
    featured: false,
  },
];

export const partners: Partner[] = [
  { slug: "mcv", name: "MCV — Manufacturing Commercial Vehicles", sector: "Bus Manufacturing", logo: "https://www.google.com/s2/favicons?domain=mcv-de.com&sz=256", featured: true, blurb: "Fabricated body sub-frames and machined fittings for bus and coach production." },
  { slug: "gb-corporation", name: "GB Corporation", sector: "Automotive & Mobility", logo: "https://www.google.com/s2/favicons?domain=gb-corporation.com&sz=256", featured: true, blurb: "Machined drivetrain parts and structural weldments at OEM volumes." },
  { slug: "el-nasr-automotive", name: "El Nasr Automotive", sector: "Automotive", logo: "https://www.google.com/s2/favicons?domain=nasr.eg&sz=256", featured: true, blurb: "Precision components and weldments for bus and passenger-vehicle lines." },
  { slug: "geyushi-automotive", name: "Geyushi Automotive Industry", sector: "Commercial Vehicles", logo: "https://geyushi.com/storage/settings/2025/298fec9cfb390cdf71b153a1571a4826.png", featured: true, blurb: "Machined chassis and drivetrain components for commercial-vehicle assembly." },
  { slug: "trust-industries", name: "Trust for Engineering Industries", sector: "Automotive Seating", logo: "https://www.trust-industries.com/img/logo-seats.png", featured: true, blurb: "Machined seat-frame components and structural brackets for vehicle seating." },
  { slug: "tepco-group", name: "TEPCO Group", sector: "Electrical Systems", logo: "https://www.google.com/s2/favicons?domain=tepco-group.com&sz=256", featured: true, blurb: "Machined enclosures and precision parts for LV/MV switchgear." },
  { slug: "khalaf-bus", name: "Khalaf Bus", sector: "Bus Manufacturing", logo: "http://khalafbus.com/images/url.png", featured: false, blurb: "Fabricated frames and machined mounts for bus bodybuilding." },
  { slug: "hashim-buses", name: "Hashim Buses", sector: "Bus & Special Units", logo: "https://www.hashimbus.com.eg/assets/images/logo.jpg", featured: false, blurb: "Structural weldments and brackets for buses and special-purpose units." },
  { slug: "mohm-furniture", name: "MOHM Furniture", sector: "Office Furniture", logo: "https://www.google.com/s2/favicons?domain=mohmfurniture.com&sz=256", featured: false, blurb: "Precision metal frames and fittings for office-furniture systems." },
  { slug: "balsam-trade", name: "Balsam Trade", sector: "Road Safety", logo: "https://www.google.com/s2/favicons?domain=balsamtrade.com&sz=256", featured: false, blurb: "Fabricated steel structures and mounts for road-safety and signage systems." },
];

export const newsArticles: NewsArticle[] = [
  {
    slug: "new-5-axis-cell",
    title: "hanz commissions a new 5-axis machining cell",
    excerpt:
      "A new multi-pallet 5-axis cell cuts lead times on complex geometry by a third and lifts our envelope on single-setup parts.",
    body: "A new multi-pallet 5-axis cell cuts lead times on complex geometry by a third and lifts our envelope on single-setup parts. The cell runs lights-out on scheduled batches, feeding directly into our metrology lab for in-line first-article inspection.\n\nFor partners, it means tighter tolerances on complex geometry with fewer setups — and a measurable drop in lead time on the parts that used to be bottlenecks.",
    image: IMG.cnc,
    category: "Capability",
    author: "Karim Fathy",
    publishedAt: "2026-05-18",
    readMinutes: 3,
    featured: true,
  },
  {
    slug: "iso-recertification-2026",
    title: "ISO 9001 recertification — zero non-conformities",
    excerpt:
      "Our quality-management system passed its 2026 surveillance audit with no non-conformities raised.",
    body: "Our quality-management system passed its 2026 surveillance audit with no non-conformities raised. The result reflects a floor culture where every dimension is measured, documented, and traceable to its material batch.\n\nCertification is renewed through 2029, covering machining, fabrication, and surface treatment.",
    image: IMG.metrology,
    category: "Quality",
    author: "Nour Adel",
    publishedAt: "2026-04-02",
    readMinutes: 2,
    featured: true,
  },
  {
    slug: "export-milestone",
    title: "Twelfth export market goes live",
    excerpt:
      "hanz components now ship to twelve markets after a new heavy-equipment partnership in the Gulf.",
    body: "hanz components now ship to twelve markets after a new heavy-equipment partnership in the Gulf. The programme covers machined drivetrain parts at OEM volumes, supported by per-batch certification and traceability.\n\nExport now accounts for a growing share of output — built on the same tolerance-first discipline that started in a three-machine shop.",
    image: IMG.hall,
    category: "Company",
    author: "Nour Adel",
    publishedAt: "2026-02-20",
    readMinutes: 2,
    featured: false,
  },
];
