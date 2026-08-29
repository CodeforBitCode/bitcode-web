"use client";

import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element -- The loader reuses the same precompressed 5 KB CSS asset. */
export function LogoLoader({ intro = false }: { intro?: boolean }) {
  const [visible, setVisible] = useState(intro);

  useEffect(() => {
    if (!intro) return;
    const timer = window.setTimeout(() => setVisible(false), 1750);
    return () => window.clearTimeout(timer);
  }, [intro]);

  if (intro && !visible) return null;

  return (
    <div
      className={intro ? "logo-loader logo-loader--overlay" : "logo-loader"}
      role={intro ? undefined : "status"}
      aria-label={intro ? undefined : "Loading BitCode"}
      aria-hidden={intro || undefined}
    >
      <div className="logo-loader__mark">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} />
        ))}
        <img
          src="/bitcode-logo.webp"
          alt=""
          width="150"
          height="150"
          className="logo-loader__final"
          fetchPriority="high"
        />
      </div>
      <p>Putting the pieces together</p>
    </div>
  );
}
