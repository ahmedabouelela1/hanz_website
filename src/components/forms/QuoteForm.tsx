"use client";

import { useActionState } from "react";
import { submitQuote, type FormState } from "@/lib/actions";
import type { Dictionary } from "@/i18n/dictionaries";
import { Field, TextArea, SelectField } from "./Field";
import { SubmitButton } from "./SubmitButton";
import { FormResult } from "./FormResult";

const initial: FormState = { ok: false, message: "" };

export function QuoteForm({ dict }: { dict: Dictionary }) {
  const [state, formAction] = useActionState(submitQuote, initial);
  const f = dict.quote.form;

  if (state.ok) {
    return <FormResult success message={f.success} />;
  }

  return (
    <form action={formAction} className="space-y-10">
      <fieldset>
        <legend className="kicker mb-6 block border-b border-hairline pb-3">
          {f.contactSection}
        </legend>
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
      </fieldset>

      <fieldset>
        <legend className="kicker mb-6 block border-b border-hairline pb-3">
          {f.projectSection}
        </legend>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SelectField
            name="service"
            label={f.service}
            placeholder={f.servicePlaceholder}
            options={f.services}
          />
          <Field name="quantity" label={f.quantity} />
          <Field name="material" label={f.material} />
          <Field name="deadline" label={f.deadline} type="date" />
        </div>
        <TextArea
          name="message"
          label={f.details}
          placeholder={f.detailsPlaceholder}
          required
          rows={5}
          className="mt-6"
          error={state.errors?.message}
        />
      </fieldset>

      {state.message === "error" && (
        <FormResult success={false} message={f.error} />
      )}

      <SubmitButton label={f.submit} pendingLabel={dict.cta.sending} />
    </form>
  );
}
