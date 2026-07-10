import { cn } from "@/lib/utils";

/** Faint engineering grid used behind hero/section blocks. */
export function BlueprintBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 blueprint-grid opacity-70" />
      {/* fade the grid toward the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--paper)_92%)]" />
    </div>
  );
}
