import { Kicker } from "./Kicker";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  lead,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && <Kicker className="mb-5">{kicker}</Kicker>}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05] tracking-tight text-ink text-balance">
        {title}
      </h2>
      {lead && (
        <p className="mt-5 text-steel-700 text-base sm:text-lg leading-relaxed max-w-xl">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
