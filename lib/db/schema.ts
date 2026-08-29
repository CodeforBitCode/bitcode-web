import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { appRoles } from "@/lib/auth/roles";

export const userStatus = pgEnum("user_status", ["active", "inactive"]);
export const appRole = pgEnum("app_role", appRoles);
export const cohortStatus = pgEnum("cohort_status", [
  "planned",
  "open",
  "active",
  "completed",
  "cancelled",
]);
export const enrollmentStatus = pgEnum("enrollment_status", [
  "pending",
  "active",
  "waitlisted",
  "completed",
  "cancelled",
]);
export const paymentStatus = pgEnum("payment_status", [
  "not_required",
  "pending",
  "paid",
  "failed",
  "refunded",
  "partially_refunded",
]);
export const enquiryStatus = pgEnum("enquiry_status", [
  "new",
  "contacted",
  "closed",
  "spam",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    displayName: varchar("display_name", { length: 160 }).notNull(),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    status: userStatus("status").default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export const userRoles = pgTable(
  "user_roles",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: appRole("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.role] }),
    index("user_roles_role_idx").on(table.role),
  ],
);

export const studentProfiles = pgTable(
  "student_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .unique()
      .references(() => users.id, { onDelete: "set null" }),
    fullName: varchar("full_name", { length: 160 }).notNull(),
    dateOfBirth: date("date_of_birth"),
    gradeOrLevel: varchar("grade_or_level", { length: 120 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("student_profiles_name_idx").on(table.fullName)],
);

export const guardianStudents = pgTable(
  "guardian_students",
  {
    guardianUserId: uuid("guardian_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    studentProfileId: uuid("student_profile_id")
      .notNull()
      .references(() => studentProfiles.id, { onDelete: "cascade" }),
    relationship: varchar("relationship", { length: 80 }).notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.guardianUserId, table.studentProfileId],
    }),
    index("guardian_students_student_idx").on(table.studentProfileId),
  ],
);

export const courses = pgTable(
  "courses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 120 }).notNull(),
    title: varchar("title", { length: 180 }).notNull(),
    summary: text("summary"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex("courses_slug_unique").on(table.slug)],
);

export const cohorts = pgTable(
  "cohorts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "restrict" }),
    code: varchar("code", { length: 80 }).notNull(),
    name: varchar("name", { length: 180 }).notNull(),
    status: cohortStatus("status").default("planned").notNull(),
    startsOn: date("starts_on"),
    endsOn: date("ends_on"),
    capacity: integer("capacity"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("cohorts_code_unique").on(table.code),
    index("cohorts_course_idx").on(table.courseId),
    check(
      "cohorts_capacity_positive",
      sql`${table.capacity} is null or ${table.capacity} > 0`,
    ),
    check(
      "cohorts_dates_valid",
      sql`${table.endsOn} is null or ${table.startsOn} is null or ${table.endsOn} >= ${table.startsOn}`,
    ),
  ],
);

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studentProfileId: uuid("student_profile_id")
      .notNull()
      .references(() => studentProfiles.id, { onDelete: "restrict" }),
    cohortId: uuid("cohort_id")
      .notNull()
      .references(() => cohorts.id, { onDelete: "restrict" }),
    status: enrollmentStatus("status").default("pending").notNull(),
    paymentStatus: paymentStatus("payment_status")
      .default("not_required")
      .notNull(),
    amountMinor: integer("amount_minor"),
    currency: varchar("currency", { length: 3 }),
    paymentProvider: varchar("payment_provider", { length: 80 }),
    externalOrderReference: varchar("external_order_reference", {
      length: 180,
    }),
    externalPaymentReference: varchar("external_payment_reference", {
      length: 180,
    }),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    enrolledAt: timestamp("enrolled_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("enrollments_student_cohort_unique").on(
      table.studentProfileId,
      table.cohortId,
    ),
    index("enrollments_cohort_status_idx").on(table.cohortId, table.status),
    index("enrollments_external_order_idx").on(
      table.paymentProvider,
      table.externalOrderReference,
    ),
    check(
      "enrollments_amount_nonnegative",
      sql`${table.amountMinor} is null or ${table.amountMinor} >= 0`,
    ),
    check(
      "enrollments_currency_with_amount",
      sql`(${table.amountMinor} is null and ${table.currency} is null) or (${table.amountMinor} is not null and ${table.currency} is not null)`,
    ),
  ],
);

export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 18 }).notNull(),
    studentAgeOrClass: varchar("student_age_or_class", { length: 80 }).notNull(),
    learningPathInterest: varchar("learning_path_interest", {
      length: 160,
    }).notNull(),
    message: text("message").notNull(),
    source: varchar("source", { length: 40 }).default("website").notNull(),
    status: enquiryStatus("status").default("new").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("enquiries_status_created_idx").on(table.status, table.createdAt),
    index("enquiries_email_idx").on(table.email),
  ],
);
