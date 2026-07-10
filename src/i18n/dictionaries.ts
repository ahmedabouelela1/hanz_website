import "server-only";
import type { Locale } from "./config";
import en from "./dictionaries/en.json";
import ar from "./dictionaries/ar.json";

// Statically imported so dictionaries ship with the bundle and never miss.
const dictionaries = { en, ar } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  // ar is a partial translation; fall back to en for any missing keys.
  return deepMerge(en, dictionaries[locale] as Partial<typeof en>) as Dictionary;
}

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (Array.isArray(base)) return (override ?? base) as T;
  if (typeof base === "object" && base !== null) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(override ?? {})) {
      const b = (base as Record<string, unknown>)[key];
      const o = (override as Record<string, unknown>)[key];
      out[key] =
        typeof b === "object" && b !== null && !Array.isArray(b)
          ? deepMerge(b, o as Partial<typeof b>)
          : (o ?? b);
    }
    return out as T;
  }
  return (override ?? base) as T;
}
