"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/lib/actions";
import type { Dictionary } from "@/i18n/dictionaries";
import { Field, TextArea } from "./Field";
import { SubmitButton } from "./SubmitButton";
import { FormResult } from "./FormResult";

const initial: FormState = { ok: false, message: "" };

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [state, formAction] = useActionState(submitContact, initial);
  const f = dict.contact.form;

  if (state.ok) {
    return <FormResult success message={f.success} />;
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field name="name" label={f.name} required error={state.errors?.name} />
        <Field name="company" label={f.company} />
        <Field
          name="email"
          label={f.email}
          type="email"
          required
          error={state.errors?.email}
        />
        <Field name="phone" label={f.phone} type="tel" />
      </div>
      <Field name="subject" label={f.subject} />
      <TextArea
        name="message"
        label={f.message}
        required
        rows={5}
        error={state.errors?.message}
      />

      {state.message === "error" && (
        <FormResult success={false} message={f.error} />
      )}

      <SubmitButton label={dict.cta.send} pendingLabel={dict.cta.sending} />
    </form>
  );
}
