// Thin fetch wrapper for the hanz Laravel API.
// Every call is best-effort: on any failure the content loaders can fall back
// to local seed data and the site still renders.

import type { Locale } from "@/i18n/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Give up on a hung backend rather than stalling the whole render. */
const TIMEOUT_MS = 8000;

/**
 * Why a call didn't return data. The distinction matters for detail pages:
 * `missing` is the API positively saying the record is gone (→ 404 the page),
 * while `unavailable`/`disabled` mean we simply couldn't reach it (→ fall back
 * to seed). Collapsing the two turned every backend hiccup into a 404.
 */
export type ApiFailure = "missing" | "unavailable" | "disabled";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: ApiFailure };

export async function apiFetch<T>(
  path: string,
  {
    revalidate = 300,
    locale,
  }: { revalidate?: number; locale?: Locale } = {},
): Promise<ApiResult<T>> {
  if (!API_URL) return { ok: false, reason: "disabled" };
  try {
    const url = new URL(`${API_URL}${path}`);
    if (locale) url.searchParams.set("locale", locale);

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        ...(locale ? { "Accept-Language": locale } : {}),
      },
      next: { revalidate },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      // Only a 404/410 is the API telling us the record doesn't exist. A 5xx,
      // a rate limit, or a gateway error is the backend being unwell.
      const gone = res.status === 404 || res.status === 410;
      return { ok: false, reason: gone ? "missing" : "unavailable" };
    }

    const json = (await res.json()) as { success?: boolean; data?: T };
    if (json?.success === false) return { ok: false, reason: "missing" };

    const data = (json?.data ?? (json as unknown as T)) ?? null;
    if (data === null) return { ok: false, reason: "missing" };
    return { ok: true, data: data as T };
  } catch {
    // Network error, DNS failure, timeout, malformed JSON — all "can't reach".
    return { ok: false, reason: "unavailable" };
  }
}

/** Convenience wrapper for list endpoints, where any failure means "use seed". */
export async function apiGet<T>(
  path: string,
  options: { revalidate?: number; locale?: Locale } = {},
): Promise<T | null> {
  const res = await apiFetch<T>(path, options);
  return res.ok ? res.data : null;
}

export interface InquiryPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type: "contact" | "quote";
  service?: string;
  quantity?: string;
  material?: string;
  deadline?: string;
}

export async function postInquiry(
  payload: InquiryPayload,
): Promise<{ ok: boolean }> {
  if (!API_URL) {
    // Dev-only soft success so forms work without a backend.
    // In production a missing API URL is a misconfiguration — fail honestly.
    return { ok: process.env.NODE_ENV === "development" };
  }
  try {
    const res = await fetch(`${API_URL}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
