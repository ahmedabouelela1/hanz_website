import { cn } from "@/lib/utils";

export function FormResult({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 border p-5",
        success
          ? "border-accent/40 bg-accent/5"
          : "border-red-300 bg-red-50",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid h-6 w-6 shrink-0 place-items-center font-mono text-xs font-bold text-paper",
          success ? "bg-accent" : "bg-red-500",
        )}
      >
        {success ? "✓" : "!"}
      </span>
      <p className="text-sm leading-relaxed text-ink">{message}</p>
    </div>
  );
}
