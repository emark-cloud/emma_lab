import clsx from "clsx";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={clsx(
        "max-w-3xl mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy font-bold leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-ink-body text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
