"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="system-page">
      <div className="container system-page__panel">
        <span className="eyebrow">Temporary error</span>
        <h1>Something interrupted this page.</h1>
        <p>
          Your information has not been submitted. Try the page again or return
          to BitCode.
        </p>
        <div className="system-page__actions">
          <button
            className="button button--primary"
            type="button"
            onClick={reset}
          >
            Try again
          </button>
          <Link className="button button--secondary" href="/" prefetch={false}>
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
