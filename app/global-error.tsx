"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="system-page">
          <div className="container system-page__panel">
            <span className="eyebrow">Temporary error</span>
            <h1>BitCode could not finish loading.</h1>
            <p>
              No enquiry details were sent. Try once more, or reload the page.
            </p>
            <button
              className="button button--primary"
              type="button"
              onClick={reset}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
