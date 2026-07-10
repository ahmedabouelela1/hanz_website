"use server";

import { z } from "zod";
import { postInquiry } from "./api";

export interface FormState {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
}

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
});

const quoteSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  quantity: z.string().optional(),
  material: z.string().optional(),
  deadline: z.string().optional(),
  message: z.string().min(5),
});

function fields(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([k, v]) => [k, String(v)]),
  );
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse(fields(formData));
  if (!parsed.success) {
    return { ok: false, message: "invalid", errors: flatten(parsed.error) };
  }
  const res = await postInquiry({ ...parsed.data, type: "contact" });
  return res.ok
    ? { ok: true, message: "success" }
    : { ok: false, message: "error" };
}

export async function submitQuote(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = quoteSchema.safeParse(fields(formData));
  if (!parsed.success) {
    return { ok: false, message: "invalid", errors: flatten(parsed.error) };
  }
  const res = await postInquiry({ ...parsed.data, type: "quote" });
  return res.ok
    ? { ok: true, message: "success" }
    : { ok: false, message: "error" };
}

function flatten(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
