/**
 * Single source of truth for which remote hosts `next/image` may load.
 *
 * Imported by BOTH `next.config.ts` (to build `images.remotePatterns`) and
 * `normalizeImageUrl` (to reject anything else before it reaches <Image>).
 * They have to agree: a URL the config doesn't allow makes next/image throw
 * "Invalid src prop" during render, which takes the whole page down — so an
 * editor pasting a cover image from any other host could break the news page.
 */

export interface ImageHostPattern {
  protocol: "https" | "http";
  hostname: string;
  pathname?: string;
}

function hostnameOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const configuredHosts = [
  // The Laravel backend, so API-served media works without extra config.
  hostnameOf(process.env.NEXT_PUBLIC_API_URL),
  // Escape hatch for a CDN / media host on deploy.
  process.env.NEXT_PUBLIC_MEDIA_HOSTNAME?.trim() || null,
].filter((h): h is string => Boolean(h));

export const imageHostPatterns: ImageHostPattern[] = [
  { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
  { protocol: "https", hostname: "hanz.thecodehaus.co", pathname: "/**" },
  // Admin cover/logo uploads land in DigitalOcean Spaces; the bucket and region
  // are subdomains, e.g. hanz-media.fra1.digitaloceanspaces.com.
  { protocol: "https", hostname: "**.digitaloceanspaces.com", pathname: "/**" },
  ...configuredHosts.map(
    (hostname): ImageHostPattern => ({
      protocol: "https",
      hostname,
      pathname: "/**",
    }),
  ),
];

/** Mirrors Next's remotePatterns hostname matching (`*` = one label, `**` = many). */
function hostnameMatches(pattern: string, hostname: string): boolean {
  if (pattern === hostname) return true;
  if (pattern.startsWith("**.")) {
    const base = pattern.slice(3);
    return hostname === base || hostname.endsWith(`.${base}`);
  }
  if (pattern.startsWith("*.")) {
    const base = pattern.slice(2);
    const dot = hostname.indexOf(".");
    return dot > 0 && hostname.slice(dot + 1) === base;
  }
  return false;
}

/**
 * True for anything <Image> can actually render: same-origin paths, data URIs,
 * and remote URLs on an allowed host. Everything else must be swapped for the
 * fallback rather than handed to next/image.
 */
export function isAllowedImageSrc(src: string): boolean {
  const value = src.trim();
  if (!value) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (value.startsWith("data:image/")) return true;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  return imageHostPatterns.some(
    (p) => `${p.protocol}:` === url.protocol && hostnameMatches(p.hostname, url.hostname),
  );
}
