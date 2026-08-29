/* eslint-disable @next/next/no-img-element -- This fixed-size 5 KB asset avoids client image runtime and optimizer work. */
import Link from "next/link";

type LogoProps = { compact?: boolean; priority?: boolean; className?: string };

export function Logo({
  compact = false,
  priority = false,
  className = "",
}: LogoProps) {
  return (
    <Link
      href="/"
      prefetch={false}
      className={`brand-logo ${className}`}
      aria-label="BitCode home"
    >
      <img
        src="/bitcode-logo.webp"
        alt="BitCode geometric block logo"
        width="52"
        height="52"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="brand-logo__image"
      />
      {!compact && (
        <span className="brand-logo__text">
          <strong>BitCode</strong>
        </span>
      )}
    </Link>
  );
}
