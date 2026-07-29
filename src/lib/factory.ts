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
  idra: {
    src: "/factory/idra-die-casting.webp",
    alt: "IDRA Brescia die-casting machine on the hanz floor",
    caption: "Die casting",
    detail: "IDRA · Brescia",
  },
  crucible: {
    src: "/factory/melting-crucible.webp",
    alt: "Molten aluminum pour into the melting crucible on the hanz foundry floor",
    caption: "Aluminum pour",
    detail: "Foundry · live melt",
  },
  comapress: {
    src: "/factory/comapress-die-casting.webp",
    alt: "CO.MA.PRESS Colosio die-casting system",
    caption: "Die casting",
    detail: "Colosio · CO.MA.PRESS",
  },
  colosio: {
    src: "/factory/colosio-cell.webp",
    alt: "Colosio die-casting cell with safety enclosure",
    caption: "Casting cell",
    detail: "Colosio · Botticino",
  },
  comapressPanel: {
    src: "/factory/comapress-panel.webp",
    alt: "CO.MA.PRESS die casting system branded panel",
    caption: "System bay",
    detail: "CO.MA.PRESS",
  },
} as const;

export type FactoryPhotoKey = keyof typeof factoryPhotos;

export interface FactoryPhoto {
  src: string;
  alt: string;
  caption: string;
  detail: string;
}

/**
 * Photo set with caption/detail taken from the dictionary, so the plant
 * galleries read in the active locale. `src`/`alt` stay as authored.
 */
export function factoryPhotosFor(dict: {
  factory?: Partial<Record<FactoryPhotoKey, { caption?: string; detail?: string }>>;
}): Record<FactoryPhotoKey, FactoryPhoto> {
  const keys = Object.keys(factoryPhotos) as FactoryPhotoKey[];
  return Object.fromEntries(
    keys.map((key) => {
      const base = factoryPhotos[key];
      const copy = dict.factory?.[key];
      return [
        key,
        {
          src: base.src,
          alt: base.alt,
          caption: copy?.caption ?? base.caption,
          detail: copy?.detail ?? base.detail,
        },
      ];
    }),
  ) as Record<FactoryPhotoKey, FactoryPhoto>;
}
