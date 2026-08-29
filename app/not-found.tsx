import Link from "next/link";

export default function NotFound() {
  return (
    <section className="system-page">
      <div className="container system-page__panel">
        <span className="eyebrow">404 / Path not found</span>
        <h1>This page is not part of the learning path.</h1>
        <p>The link may have changed, or the page may no longer exist.</p>
        <Link className="button button--primary" href="/" prefetch={false}>
          Return to BitCode
        </Link>
      </div>
    </section>
  );
}
