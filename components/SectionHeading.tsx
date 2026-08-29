import type { ReactNode } from "react";

const alignmentClasses = {
  left: "section-heading section-heading--left",
  center: "section-heading section-heading--center",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={alignmentClasses[align]}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
