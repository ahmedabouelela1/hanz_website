import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper px-7 py-4 hover:bg-accent",
  outline:
    "border border-ink/25 text-ink px-7 py-4 hover:border-accent hover:text-accent",
  ghost: "text-ink px-0 py-1 hover:text-accent",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  arrow = true,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
        >
          →
        </span>
      )}
    </Link>
  );
}
