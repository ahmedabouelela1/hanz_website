"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export function SubmitButton({
  label,
  pendingLabel,
  className,
}: {
  label: string;
  pendingLabel: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 bg-paper px-8 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-accent disabled:opacity-60",
        className,
      )}
    >
      {pending ? pendingLabel : label}
      {!pending && (
        <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
          →
        </span>
      )}
    </button>
  );
}
