import type { ComponentType, SVGProps } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Stroke-only marks drawn on the same 24-unit grid so weights stay identical
 * across the row. They inherit colour, so the hover state is handled in CSS.
 */
const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12 2.4 4.6 5.5v5.9c0 4.6 3.1 8.4 7.4 9.9 4.3-1.5 7.4-5.3 7.4-9.9V5.5L12 2.4Z" />
      <path d="m8.7 11.8 2.4 2.4 4.4-4.5" />
    </svg>
  );
}

function PrecisionIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="6.4" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 1.6v3.6M12 18.8v3.6M1.6 12h3.6M18.8 12h3.6" />
    </svg>
  );
}

function GearIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M19.1 14.8a1.6 1.6 0 0 0 .32 1.77l.06.06a1.94 1.94 0 1 1-2.75 2.75l-.06-.06a1.6 1.6 0 0 0-1.77-.32 1.6 1.6 0 0 0-.97 1.47v.17a1.94 1.94 0 1 1-3.88 0v-.09a1.6 1.6 0 0 0-1.03-1.46 1.6 1.6 0 0 0-1.77.32l-.06.06a1.94 1.94 0 1 1-2.75-2.75l.06-.06a1.6 1.6 0 0 0 .32-1.77 1.6 1.6 0 0 0-1.47-.97h-.17a1.94 1.94 0 1 1 0-3.88h.09a1.6 1.6 0 0 0 1.46-1.03 1.6 1.6 0 0 0-.32-1.77l-.06-.06a1.94 1.94 0 1 1 2.75-2.75l.06.06a1.6 1.6 0 0 0 1.77.32h.08a1.6 1.6 0 0 0 .97-1.47v-.17a1.94 1.94 0 1 1 3.88 0v.09a1.6 1.6 0 0 0 .97 1.46 1.6 1.6 0 0 0 1.77-.32l.06-.06a1.94 1.94 0 1 1 2.75 2.75l-.06.06a1.6 1.6 0 0 0-.32 1.77v.08a1.6 1.6 0 0 0 1.47.97h.17a1.94 1.94 0 1 1 0 3.88h-.09a1.6 1.6 0 0 0-1.46.97Z" />
    </svg>
  );
}

function HandshakeIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="m11 17.2 2 2a1 1 0 0 0 3-3" />
      <path d="m14 14.2 2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a3 3 0 0 0-4.24 0l-.86.86a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3.2 1 11h-2" />
      <path d="M3 3.2 2 14.2l6.5 6.5a1 1 0 0 0 3-3" />
      <path d="M3 4.2h8" />
    </svg>
  );
}

/** Marks are positional — they pair with the dictionary items by index. */
const icons: ComponentType<IconProps>[] = [
  ShieldCheckIcon,
  PrecisionIcon,
  GearIcon,
  HandshakeIcon,
];

interface HeroPillarsProps {
  pillars: Dictionary["home"]["hero"]["pillars"];
}

export function HeroPillars({ pillars }: HeroPillarsProps) {
  return (
    <div className="tech-frame relative border border-paper/15 bg-ink/25 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 border-b border-paper/15 bg-ink/45 px-5 py-4">
        <h2 className="font-mono text-[10px] uppercase leading-none tracking-[0.22em] text-paper/70">
          {pillars.title}
        </h2>
        <span className="flex items-center gap-2 font-mono text-[10px] leading-none tracking-[0.14em] text-accent-hot">
          <span className="h-1 w-1 rounded-full bg-accent-hot" />
          {String(pillars.items.length).padStart(2, "0")}
        </span>
      </div>

      {/* gap-px over a light base draws the hairline rules between cells */}
      <ul className="grid grid-cols-2 gap-px bg-paper/15">
        {pillars.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li
              key={item.label}
              className="group/cell relative flex flex-col gap-5 bg-ink/55 px-5 py-7 transition-colors duration-300 hover:bg-ink/25 sm:px-6 sm:py-8"
            >
              <span
                aria-hidden
                className="absolute end-4 top-4 font-mono text-[10px] leading-none tracking-[0.14em] text-paper/25 transition-colors duration-300 group-hover/cell:text-accent-hot"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <Icon
                aria-hidden
                className="h-11 w-11 text-accent-hot transition-transform duration-500 ease-out group-hover/cell:-translate-y-0.5 group-hover/cell:scale-[1.06]"
              />

              <div>
                <h3 className="font-display text-[15px] font-bold uppercase leading-tight tracking-[0.06em] text-paper">
                  {item.label}
                </h3>
                <span
                  aria-hidden
                  className="mt-2.5 block h-px w-6 bg-accent-hot/40 transition-all duration-300 group-hover/cell:w-12 group-hover/cell:bg-accent-hot"
                />
                <p className="mt-2.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-paper/45">
                  {item.note}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
