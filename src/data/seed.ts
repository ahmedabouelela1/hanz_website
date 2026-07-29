import type {
  CatalogCategory,
  CatalogProduct,
  NewsArticle,
  Partner,
} from "@/types/content";
import { stockImages } from "@/lib/images";

// Local seed content. The site renders fully from this without a backend.
// When NEXT_PUBLIC_API_URL responds, the loaders in lib/content.ts use the API instead.
//
// Company facts (1986 founding, Sadat City → Obour City 2015, aluminum/Zamak
// die casting, 100–500 t machines, ~70% commercial vehicle) come from the
// client company profile and are accurate.
//
// TODO(client): the per-product technical specs below are representative of
// high-pressure die casting but have NOT been confirmed by Hanz. Replace the
// alloy grades and finishes with the real figures before launch.

const IMG = stockImages;

export const catalogCategories: CatalogCategory[] = [
  { slug: "bus", title: "Bus & Coach Components" },
  { slug: "minibus", title: "Minibus Components" },
  { slug: "railway", title: "Railway Components" },
  { slug: "industrial", title: "Industrial Die Castings" },
];

export const catalogProducts: CatalogProduct[] = [
  {
    slug: "bus-door-fittings",
    category: "bus",
    categoryLabel: "Bus & Coach Components",
    title: "Bus Door & Window Fittings",
    summary:
      "Aluminum die-cast door, window, and glazing fittings for bus and coach bodybuilders.",
    description:
      "Aluminum die-cast fittings for passenger door mechanisms, window frames, and glazing hardware. Cast under high pressure for thin, consistent wall sections, then trimmed and finished so panels fit repeatably down the bodybuilding line.",
    image: IMG.gears,
    gallery: [IMG.gears, IMG.cnc, IMG.metrology],
    specs: [
      { label: "Alloy", value: "Aluminum (ADC12 / A380)" },
      { label: "Process", value: "High-pressure die casting" },
      { label: "Machine range", value: "100–500 tons" },
      { label: "Finish", value: "As-cast / polished / coated" },
    ],
    applications: ["City buses", "Intercity coaches", "Door mechanisms"],
    featured: true,
  },
  {
    slug: "interior-brackets",
    category: "bus",
    categoryLabel: "Bus & Coach Components",
    title: "Handrail & Seat Brackets",
    summary:
      "Zamak die-cast brackets and end caps for handrails, stanchions, and seat frames.",
    description:
      "Zinc (Zamak) die-cast brackets, end caps, and clamps for passenger handrails, stanchions, and seat mounting. Zamak holds fine detail and tight dimensions straight from the die, giving a clean surface ready for plating or paint.",
    image: IMG.metrology,
    gallery: [IMG.metrology, IMG.gears, IMG.fab],
    specs: [
      { label: "Alloy", value: "Zamak 3 / Zamak 5" },
      { label: "Process", value: "High-pressure die casting" },
      { label: "Detail", value: "Fine detail, as-cast surface" },
      { label: "Finish", value: "Plated / painted / as-cast" },
    ],
    applications: ["Handrails & stanchions", "Seat frames", "Interior trim"],
    featured: true,
  },
  {
    slug: "minibus-body-fittings",
    category: "minibus",
    categoryLabel: "Minibus Components",
    title: "Minibus Body Fittings",
    summary:
      "Die-cast hinges, latches, and body hardware produced at series volumes for minibus lines.",
    description:
      "Hinges, latches, handles, and body hardware die-cast in aluminum or Zamak to suit the load case. Produced at series volumes with consistent shot weight and dimensional control, so assembly lines see the same part every batch.",
    image: IMG.fab,
    gallery: [IMG.fab, IMG.hall, IMG.gears],
    specs: [
      { label: "Alloy", value: "Aluminum or Zamak" },
      { label: "Process", value: "High-pressure die casting" },
      { label: "Volumes", value: "Series production" },
      { label: "Tooling", value: "In-house die design" },
    ],
    applications: ["Minibuses", "Light commercial vehicles", "Body hardware"],
    featured: true,
  },
  {
    slug: "railway-fittings",
    category: "railway",
    categoryLabel: "Railway Components",
    title: "Railway Interior Fittings",
    summary:
      "Die-cast fittings and mounting components for railway carriage interiors.",
    description:
      "Die-cast fittings, mounts, and trim components for railway carriage interiors, cast to the customer's drawing and inspected for dimensional consistency across the batch before dispatch.",
    image: IMG.hall,
    gallery: [IMG.hall, IMG.plant, IMG.steel],
    specs: [
      { label: "Alloy", value: "Aluminum / Zamak" },
      { label: "Process", value: "High-pressure die casting" },
      { label: "Machine range", value: "100–500 tons" },
      { label: "Inspection", value: "Per-batch dimensional check" },
    ],
    applications: [
      "Passenger carriages",
      "Interior fittings",
      "Mounting hardware",
    ],
    featured: false,
  },
  {
    slug: "industrial-housings",
    category: "industrial",
    categoryLabel: "Industrial Die Castings",
    title: "Housings & Enclosures",
    summary:
      "Aluminum die-cast housings, covers, and enclosures for general industrial customers.",
    description:
      "Aluminum die-cast housings, covers, and enclosures for equipment builders outside the vehicle sector. Cast to your drawing on machines from 100 to 500 tons, with trimming and surface finishing handled in-house.",
    image: IMG.plant,
    gallery: [IMG.plant, IMG.cnc, IMG.steel],
    specs: [
      { label: "Alloy", value: "Aluminum (ADC12 / A380)" },
      { label: "Process", value: "High-pressure die casting" },
      { label: "Machine range", value: "100–500 tons" },
      { label: "Secondary ops", value: "Trimming & machining" },
    ],
    applications: ["Equipment housings", "Electrical enclosures", "Machine covers"],
    featured: false,
  },
];

export const partners: Partner[] = [
  { slug: "mcv", name: "MCV — Manufacturing Commercial Vehicles", sector: "Bus Manufacturing", logo: "https://www.google.com/s2/favicons?domain=mcv-de.com&sz=256", featured: true, blurb: "Die-cast fittings and components for bus and coach production." },
  { slug: "gb-corporation", name: "GB Corporation", sector: "Automotive & Mobility", logo: "https://www.google.com/s2/favicons?domain=gb-corporation.com&sz=256", featured: true, blurb: "Aluminum and Zamak die-cast components at series volumes." },
  { slug: "el-nasr-automotive", name: "El Nasr Automotive", sector: "Automotive", logo: "https://www.google.com/s2/favicons?domain=nasr.eg&sz=256", featured: true, blurb: "Precision die-cast parts for bus and passenger-vehicle lines." },
  { slug: "geyushi-automotive", name: "Geyushi Automotive Industry", sector: "Commercial Vehicles", logo: "https://geyushi.com/storage/settings/2025/298fec9cfb390cdf71b153a1571a4826.png", featured: true, blurb: "Die-cast components for commercial-vehicle assembly." },
  { slug: "trust-industries", name: "Trust for Engineering Industries", sector: "Automotive Seating", logo: "https://www.trust-industries.com/img/logo-seats.png", featured: true, blurb: "Zamak die-cast brackets and fittings for vehicle seating." },
  { slug: "tepco-group", name: "TEPCO Group", sector: "Electrical Systems", logo: "https://www.google.com/s2/favicons?domain=tepco-group.com&sz=256", featured: true, blurb: "Die-cast housings and enclosures for electrical systems." },
  { slug: "khalaf-bus", name: "Khalaf Bus", sector: "Bus Manufacturing", logo: "http://khalafbus.com/images/url.png", featured: false, blurb: "Die-cast body fittings and mounts for bus bodybuilding." },
  { slug: "hashim-buses", name: "Hashim Buses", sector: "Bus & Special Units", logo: "https://www.hashimbus.com.eg/assets/images/logo.jpg", featured: false, blurb: "Die-cast fittings for buses and special-purpose units." },
  { slug: "mohm-furniture", name: "MOHM Furniture", sector: "Office Furniture", logo: "https://www.google.com/s2/favicons?domain=mohmfurniture.com&sz=256", featured: false, blurb: "Zamak die-cast fittings for office-furniture systems." },
  { slug: "balsam-trade", name: "Balsam Trade", sector: "Road Safety", logo: "https://www.google.com/s2/favicons?domain=balsamtrade.com&sz=256", featured: false, blurb: "Die-cast mounts and hardware for road-safety and signage systems." },
];

// TODO(client): the publish dates below are placeholders. Hanz exhibited at the
// SEMA Show (Las Vegas) and Automechanika (Germany), but the company profile
// does not state which years — confirm before launch.
export const newsArticles: NewsArticle[] = [
  {
    slug: "sema-show-las-vegas",
    title: "Hanz Industry at the SEMA Show, Las Vegas",
    excerpt:
      "Representing Egyptian die casting at one of the world's largest automotive specialty products trade events.",
    body: "Hanz Industry exhibited at the SEMA Show in Las Vegas, representing Egyptian manufacturing at one of the world's largest automotive specialty products trade events.\n\nFor us, shows like SEMA are less about the stand and more about the conversations — meeting buyers who work to international standards, and showing that precision aluminum and Zamak die casting out of Obour City holds up against anyone's benchmark.",
    image: IMG.gears,
    category: "Exhibitions",
    author: "Hanz Industry",
    publishedAt: "2025-11-04",
    readMinutes: 2,
    featured: true,
  },
  {
    slug: "automechanika-germany",
    title: "Exhibiting at Automechanika, Germany",
    excerpt:
      "Meeting international partners at the leading trade fair for the automotive service and parts industry.",
    body: "Hanz Industry took part in Automechanika in Germany, the leading international trade fair for the automotive service and parts industry.\n\nOur presence there reflects a long-term commitment: global standards on the floor in Obour City, and partnerships built to last. Around 70% of our production serves the commercial vehicle industry — buses, minibuses, and railway applications — and shows like this are where many of those relationships start.",
    image: IMG.hall,
    category: "Exhibitions",
    author: "Hanz Industry",
    publishedAt: "2024-09-12",
    readMinutes: 2,
    featured: true,
  },
  {
    slug: "obour-city-chapter",
    title: "A new chapter: Obour City and the Hanz Industry name",
    excerpt:
      "After nearly three decades in Sadat City, the factory moved to Obour City in 2015 and took the name Hanz Industry.",
    body: "The company began in 1986 as Rameskey Factory, founded in Sadat City by Mr. Mohamed Saad Mohamed (ElHag Samir) with a single 40-ton die casting machine.\n\nAfter nearly three decades there, production relocated to Obour City in 2015 to support continued expansion and increase capacity. That same year the company entered a new chapter under the name Hanz Industry, led today by Mr. Hussein Mohamed Saad.\n\nThe floor now runs machines from 100 to 500 tons — but the commitment behind them hasn't changed in forty years.",
    image: IMG.plant,
    category: "Company",
    author: "Hanz Industry",
    publishedAt: "2015-06-01",
    readMinutes: 3,
    featured: false,
  },
];
