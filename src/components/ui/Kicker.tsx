import { cn } from "@/lib/utils";

interface KickerProps {
  children: React.ReactNode;
  className?: string;
  tick?: boolean;
}

export function Kicker({ children, className, tick = true }: KickerProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.28em] text-accent", className)}>
      {tick && <span className="inline-block h-[2px] w-5 bg-accent" aria-hidden />}
      {children}
    </span>
  );
}
