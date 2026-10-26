interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold sm:text-sm">
        {align === "center" ? null : <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />}
        <span>{eyebrow}</span>
      </p>
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle ? <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{subtitle}</p> : null}
    </div>
  );
}
