import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variantClasses = {
  primary: "button button--primary",
  secondary: "button button--secondary",
  ghost: "button button--ghost",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();
  if (!href.startsWith("/"))
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  return (
    <Link className={classes} href={href} prefetch={false}>
      {children}
    </Link>
  );
}
