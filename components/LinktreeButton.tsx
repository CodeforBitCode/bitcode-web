import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./Icons";

export function LinktreeButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
      <ArrowIcon />
    </>
  );
  if (!href.startsWith("/")) {
    const opensNewTab = href.startsWith("http");
    return (
      <a
        className="linktree-button"
        href={href}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className="linktree-button" href={href} prefetch={false}>
      {content}
    </Link>
  );
}
