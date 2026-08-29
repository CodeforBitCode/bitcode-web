import type { ReactNode } from "react";
import { TechMotionGraphic } from "./TechMotionGraphic";

export function PageHero({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <TechMotionGraphic className="page-hero__motion" />
      <div className="container page-hero__grid">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <div className="page-hero__description">{children}</div>
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </section>
  );
}
