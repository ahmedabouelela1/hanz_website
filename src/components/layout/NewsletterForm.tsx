"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  placeholder: string;
  cta: string;
}

export function NewsletterForm({ placeholder, cta }: NewsletterFormProps) {
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.includes("@")) setDone(true);
      }}
      className="flex items-center border-b border-steel-700/60 focus-within:border-accent"
    >
      <input
        type="email"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={done ? "✓" : placeholder}
        disabled={done}
        className={cn(
          "w-full bg-transparent py-2.5 font-mono text-sm text-ink placeholder:text-steel-500 focus:outline-none",
          done && "text-accent",
        )}
      />
      <button
        type="submit"
        disabled={done}
        className="shrink-0 px-2 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-70 disabled:opacity-40"
      >
        {done ? "✓" : cta}
      </button>
    </form>
  );
}
