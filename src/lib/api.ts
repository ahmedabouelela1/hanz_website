// Thin fetch wrapper for the hanz Laravel API.
// Every call is best-effort: on any failure it returns null so the content
// loaders can fall back to local seed data and the site still renders.

import type { Locale } from "@/i18n/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiGet<T>(
  path: string,
  {
    revalidate = 300,
    locale,
  }: { revalidate?: number; locale?: Locale } = {},
): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const url = new URL(`${API_URL}${path}`);
    if (locale) url.searchParams.set("locale", locale);

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        ...(locale ? { "Accept-Language": locale } : {}),
      },
      next: { revalidate },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { success?: boolean; data?: T };
    if (json?.success === false) return null;
    return (json?.data ?? (json as unknown as T)) ?? null;
  } catch {
    return null;
  }
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
