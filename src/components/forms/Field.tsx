import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border-b border-hairline bg-transparent py-3 font-sans text-ink placeholder:text-steel-500 focus:border-accent focus:outline-none transition-colors";

interface BaseProps {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function Field({
  name,
  label,
  required,
  error,
  className,
  type = "text",
  placeholder,
}: BaseProps & { type?: string; placeholder?: string }) {
  return (
    <label className={cn("block", className)}>
      <LabelRow label={label} required={required} error={error} />
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClass}
      />
    </label>
  );
}

export function TextArea({
  name,
  label,
  required,
  error,
  className,
  placeholder,
  rows = 4,
}: BaseProps & { placeholder?: string; rows?: number }) {
  return (
    <label className={cn("block", className)}>
      <LabelRow label={label} required={required} error={error} />
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={cn(fieldClass, "resize-none")}
      />
    </label>
  );
}

export function SelectField({
  name,
  label,
  required,
  error,
  className,
  placeholder,
  options,
}: BaseProps & { placeholder?: string; options: string[] }) {
  return (
    <label className={cn("block", className)}>
      <LabelRow label={label} required={required} error={error} />
      <select
        name={name}
        required={required}
        defaultValue=""
        className={cn(fieldClass, "appearance-none")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function LabelRow({
  label,
  required,
  error,
}: {
  label: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <span className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
      <span>
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {error && <span className="text-accent">{error}</span>}
    </span>
  );
}
