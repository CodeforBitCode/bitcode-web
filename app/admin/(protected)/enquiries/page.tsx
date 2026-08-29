import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryStatusForm } from "@/components/admin/EnquiryStatusForm";
import { learningPathTitles } from "@/data/site";
import { requirePagePermission } from "@/lib/auth/session";
import { listAdminEnquiries } from "@/lib/enquiries/admin-repository";
import { enquiryListQuerySchema } from "@/lib/enquiries/admin-validation";
import { enquiryStatuses, type EnquiryStatus } from "@/lib/enquiries/status";

export const metadata: Metadata = {
  title: "Enquiries admin",
  robots: { index: false, follow: false },
};

const statusLabels: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  converted: "Converted",
  closed: "Closed",
  spam: "Spam",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function pageHref(
  page: number,
  filters: { q?: string; status?: string; learningPath?: string },
) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.status) params.set("status", filters.status);
  if (filters.learningPath) params.set("learningPath", filters.learningPath);
  params.set("page", String(page));
  return `/admin/enquiries?${params}`;
}

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requirePagePermission("enquiries:manage");
  const raw = await searchParams;
  const parsed = enquiryListQuerySchema.safeParse({
    q: first(raw.q),
    status: first(raw.status),
    learningPath: first(raw.learningPath),
    page: first(raw.page) ?? 1,
  });
  const filters = parsed.success ? parsed.data : { page: 1 as const };
  const result = await listAdminEnquiries(filters);
  const formatter = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="admin-enquiries">
      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">Operations</span>
          <h1>Enquiries</h1>
          <p>{result.total} enquiry{result.total === 1 ? "" : "ies"}</p>
        </div>
      </div>

      <form className="admin-filters" method="get">
        <label>
          Search
          <input name="q" type="search" defaultValue={filters.q ?? ""} placeholder="Name, email, or phone" />
        </label>
        <label>
          Status
          <select name="status" defaultValue={filters.status ?? ""}>
            <option value="">All statuses</option>
            {enquiryStatuses.map((status) => (
              <option key={status} value={status}>{statusLabels[status]}</option>
            ))}
          </select>
        </label>
        <label>
          Learning path
          <select name="learningPath" defaultValue={filters.learningPath ?? ""}>
            <option value="">All learning paths</option>
            {learningPathTitles.map((path) => <option key={path}>{path}</option>)}
          </select>
        </label>
        <div className="admin-filter-actions">
          <button className="button button--primary" type="submit">Apply</button>
          <Link href="/admin/enquiries">Clear</Link>
        </div>
      </form>

      {result.items.length === 0 ? (
        <div className="admin-empty"><h2>No enquiries found</h2><p>Try clearing one or more filters.</p></div>
      ) : (
        <div className="admin-enquiry-list">
          {result.items.map((enquiry) => (
            <article className="admin-enquiry-card" key={enquiry.id}>
              <div className="admin-enquiry-summary">
                <div>
                  <span className={`admin-status admin-status--${enquiry.status}`}>{statusLabels[enquiry.status]}</span>
                  <h2>{enquiry.name}</h2>
                  <time dateTime={enquiry.createdAt.toISOString()}>{formatter.format(enquiry.createdAt)}</time>
                </div>
                <EnquiryStatusForm id={enquiry.id} status={enquiry.status} />
              </div>
              <dl className="admin-enquiry-facts">
                <div><dt>Email</dt><dd><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></dd></div>
                <div><dt>Phone</dt><dd><a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a></dd></div>
                <div><dt>Student</dt><dd>{enquiry.studentAgeOrClass}</dd></div>
                <div><dt>Learning path</dt><dd>{enquiry.learningPathInterest}</dd></div>
                <div><dt>Source</dt><dd>{enquiry.source}</dd></div>
              </dl>
              <details className="admin-enquiry-detail">
                <summary>View message</summary>
                <p>{enquiry.message}</p>
              </details>
            </article>
          ))}
        </div>
      )}

      {result.totalPages > 1 && (
        <nav className="admin-pagination" aria-label="Enquiry pages">
          {result.page > 1 ? <Link href={pageHref(result.page - 1, filters)}>Previous</Link> : <span />}
          <span>Page {result.page} of {result.totalPages}</span>
          {result.page < result.totalPages ? <Link href={pageHref(result.page + 1, filters)}>Next</Link> : <span />}
        </nav>
      )}
    </div>
  );
}
