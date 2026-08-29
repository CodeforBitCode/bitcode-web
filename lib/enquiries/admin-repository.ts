import { and, count, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { enquiries } from "@/lib/db/schema";
import type { EnquiryStatus } from "./status";

export const adminEnquiriesPageSize = 20;

export type EnquiryListFilters = {
  q?: string;
  status?: EnquiryStatus;
  learningPath?: string;
  page: number;
};

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, "\\$&");
}

export async function listAdminEnquiries(filters: EnquiryListFilters) {
  const conditions: SQL[] = [];
  if (filters.q) {
    const pattern = `%${escapeLike(filters.q)}%`;
    const search = or(
      ilike(enquiries.name, pattern),
      ilike(enquiries.email, pattern),
      ilike(enquiries.phone, pattern),
    );
    if (search) conditions.push(search);
  }
  if (filters.status) conditions.push(eq(enquiries.status, filters.status));
  if (filters.learningPath) {
    conditions.push(
      eq(enquiries.learningPathInterest, filters.learningPath),
    );
  }

  const where = conditions.length ? and(...conditions) : undefined;
  const database = getDb();
  const totals = await database.select({ total: count() }).from(enquiries).where(where);
  const total = totals[0]?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / adminEnquiriesPageSize));
  const page = Math.min(filters.page, totalPages);
  const items = await database
    .select({
      id: enquiries.id,
      name: enquiries.name,
      email: enquiries.email,
      phone: enquiries.phone,
      studentAgeOrClass: enquiries.studentAgeOrClass,
      learningPathInterest: enquiries.learningPathInterest,
      message: enquiries.message,
      source: enquiries.source,
      status: enquiries.status,
      createdAt: enquiries.createdAt,
      updatedAt: enquiries.updatedAt,
    })
    .from(enquiries)
    .where(where)
    .orderBy(desc(enquiries.createdAt), desc(enquiries.id))
    .limit(adminEnquiriesPageSize)
    .offset((page - 1) * adminEnquiriesPageSize);

  return {
    items,
    page,
    pageSize: adminEnquiriesPageSize,
    total,
    totalPages,
  };
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
  now = new Date(),
) {
  const [updated] = await getDb()
    .update(enquiries)
    .set({ status, updatedAt: now })
    .where(eq(enquiries.id, id))
    .returning({
      id: enquiries.id,
      status: enquiries.status,
      updatedAt: enquiries.updatedAt,
    });
  return updated ?? null;
}
