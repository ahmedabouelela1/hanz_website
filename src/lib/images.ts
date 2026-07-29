import { isAllowedImageSrc } from "./imageHosts";

/** Verified stock photography URLs — all return HTTP 200 from Unsplash. */
export const stockImages = {
  cnc: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1400&q=80",
  fab: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1400&q=80",
  weld: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&w=1400&q=80",
  gears: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
  steel: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
  plant: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
  metrology:
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80",
  hall: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=80",
} as const;

export const fallbackImage = stockImages.plant;

/** Unsplash IDs that were removed upstream — remap to working replacements. */
const retiredPhotoIds: Record<string, keyof typeof stockImages> = {
  "photo-1531758854681-1c5f0d2a9b0e": "steel",
};

/** Normalize image URLs from API/seed — fixes retired Unsplash links and empty values. */
export function normalizeImageUrl(url: string | null | undefined): string {
  const trimmed = url?.trim();
  if (!trimmed) return fallbackImage;

  for (const [retiredId, replacement] of Object.entries(retiredPhotoIds)) {
    if (trimmed.includes(retiredId)) return stockImages[replacement];
  }

  // A host next/image isn't configured for makes <Image> throw at render and
  // takes the page down with it. CMS editors can supply any URL, so degrade to
  // the placeholder instead of trusting the input.
  if (!isAllowedImageSrc(trimmed)) return fallbackImage;

  return trimmed;
}

export function normalizeImageList(urls: string[] | null | undefined): string[] {
  if (!urls?.length) return [];
  return urls.map(normalizeImageUrl).filter(Boolean);
}
