"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowIcon, CheckIcon, MailIcon } from "./Icons";
import { learningPaths, siteConfig } from "@/data/site";

export function LearningPathAccordion({
  variant = "list",
}: {
  variant?: "list" | "preview" | "grid";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId().replace(/:/g, "");

  return (
    <div className={`learning-paths learning-paths--${variant}`}>
      {learningPaths.map((path, index) => {
        const isOpen = openIndex === index;
        const pathId = path.title
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        const triggerId = `${baseId}-path-${index}`;
        const panelId = `${triggerId}-panel`;
        const message = `Hi BitCode, I'm interested in the ${path.title} learning path. Please share the details.`;
        const subject = encodeURIComponent(`BitCode enquiry: ${path.title}`);
        const body = encodeURIComponent(message);

        return (
          <article
            id={pathId}
            className={`learning-path ${isOpen ? "is-open" : ""}`}
            key={path.title}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="learning-path__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="learning-path__heading">
                  <strong>{path.title}</strong>
                  <small>{path.subtitle}</small>
                </span>
                <span className="learning-path__indicator" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              className="learning-path__panel"
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
            >
              <div className="learning-path__panel-inner">
                <ul>
                  {path.points.map((point) => (
                    <li key={point}>
                      <CheckIcon /> {point}
                    </li>
                  ))}
                </ul>
                <div className="learning-path__actions">
                  <Link
                    className="button button--primary"
                    href={`/contact?course=${encodeURIComponent(path.title)}`}
                    prefetch={false}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    Discuss this path <ArrowIcon />
                  </Link>
                  <a
                    className="learning-path__email"
                    href={`mailto:${siteConfig.email}?subject=${subject}&body=${body}`}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <MailIcon /> Email BitCode
                  </a>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
