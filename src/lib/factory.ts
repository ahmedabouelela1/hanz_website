/** Real plant photography — cleaned for web use, kept authentic. */
export const factoryPhotos = {
  muller: {
    src: "/factory/muller-press.webp",
    alt: "Müller hydraulic press on the hanz production floor",
    caption: "Hydraulic press",
    detail: "Müller · Floor A",
  },
  productionLine: {
    src: "/factory/production-line.webp",
    alt: "Die-casting production line inside the hanz plant",
    caption: "Die casting",
    detail: "Italpresse cell",
  },
  heavyMachinery: {
    src: "/factory/heavy-machinery.webp",
    alt: "Heavy hydraulic machinery and control cabinets",
    caption: "Heavy forming",
    detail: "Press bay",
  },
  stamping: {
    src: "/factory/stamping-presses.webp",
    alt: "Stamping presses along a tiled workshop bay",
    caption: "Stamping bay",
    detail: "Line 03",
  },
  italpress: {
    src: "/factory/italpress-die-casting.webp",
    alt: "Italpresse die-casting machine control station",
    caption: "Process control",
    detail: "Die cast · live",
  },
} as const;

export type FactoryPhotoKey = keyof typeof factoryPhotos;
