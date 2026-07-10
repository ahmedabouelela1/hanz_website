// Thin fetch wrapper for the hanz Laravel API.
// Every call is best-effort: on any failure it returns null so the content
// loaders can fall back to local seed data and the site still renders.

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiGet<T>(
  path: string,
  { revalidate = 300 }: { revalidate?: number } = {},
): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { success?: boolean; data?: T };
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
    // No backend wired yet — treat as accepted so the UX is complete in dev.
    return { ok: true };
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
