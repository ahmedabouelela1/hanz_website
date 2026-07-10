import { cn } from "@/lib/utils";

interface KickerProps {
  children: React.ReactNode;
  className?: string;
  /** Show the accent index tick before the label. */
  tick?: boolean;
}

export function Kicker({ children, className, tick = true }: KickerProps) {
  return (
    <span className={cn("kicker inline-flex items-center gap-2.5", className)}>
      {tick && <span className="inline-block h-px w-6 bg-accent" aria-hidden />}
      {children}
    </span>
  );
}
