CREATE TYPE "public"."app_role" AS ENUM('student', 'parent_guardian', 'instructor', 'admin');--> statement-breakpoint
CREATE TYPE "public"."cohort_status" AS ENUM('planned', 'open', 'active', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."enquiry_status" AS ENUM('new', 'contacted', 'closed', 'spam');--> statement-breakpoint
CREATE TYPE "public"."enrollment_status" AS ENUM('pending', 'active', 'waitlisted', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('not_required', 'pending', 'paid', 'failed', 'refunded', 'partially_refunded');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "cohorts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"code" varchar(80) NOT NULL,
	"name" varchar(180) NOT NULL,
	"status" "cohort_status" DEFAULT 'planned' NOT NULL,
	"starts_on" date,
	"ends_on" date,
	"capacity" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cohorts_capacity_positive" CHECK ("cohorts"."capacity" is null or "cohorts"."capacity" > 0),
	CONSTRAINT "cohorts_dates_valid" CHECK ("cohorts"."ends_on" is null or "cohorts"."starts_on" is null or "cohorts"."ends_on" >= "cohorts"."starts_on")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(120) NOT NULL,
	"title" varchar(180) NOT NULL,
	"summary" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(18) NOT NULL,
	"student_age_or_class" varchar(80) NOT NULL,
	"learning_path_interest" varchar(160) NOT NULL,
	"message" text NOT NULL,
	"source" varchar(40) DEFAULT 'website' NOT NULL,
	"status" "enquiry_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_profile_id" uuid NOT NULL,
	"cohort_id" uuid NOT NULL,
	"status" "enrollment_status" DEFAULT 'pending' NOT NULL,
	"payment_status" "payment_status" DEFAULT 'not_required' NOT NULL,
	"amount_minor" integer,
	"currency" varchar(3),
	"payment_provider" varchar(80),
	"external_order_reference" varchar(180),
	"external_payment_reference" varchar(180),
	"paid_at" timestamp with time zone,
	"enrolled_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "enrollments_amount_nonnegative" CHECK ("enrollments"."amount_minor" is null or "enrollments"."amount_minor" >= 0),
	CONSTRAINT "enrollments_currency_with_amount" CHECK (("enrollments"."amount_minor" is null and "enrollments"."currency" is null) or ("enrollments"."amount_minor" is not null and "enrollments"."currency" is not null))
);
--> statement-breakpoint
CREATE TABLE "guardian_students" (
	"guardian_user_id" uuid NOT NULL,
	"student_profile_id" uuid NOT NULL,
	"relationship" varchar(80) NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guardian_students_guardian_user_id_student_profile_id_pk" PRIMARY KEY("guardian_user_id","student_profile_id")
);
--> statement-breakpoint
CREATE TABLE "student_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"full_name" varchar(160) NOT NULL,
	"date_of_birth" date,
	"grade_or_level" varchar(120),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" uuid NOT NULL,
	"role" "app_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_user_id_role_pk" PRIMARY KEY("user_id","role")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"display_name" varchar(160) NOT NULL,
	"email_verified_at" timestamp with time zone,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cohorts" ADD CONSTRAINT "cohorts_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_profile_id_student_profiles_id_fk" FOREIGN KEY ("student_profile_id") REFERENCES "public"."student_profiles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_cohort_id_cohorts_id_fk" FOREIGN KEY ("cohort_id") REFERENCES "public"."cohorts"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guardian_students" ADD CONSTRAINT "guardian_students_guardian_user_id_users_id_fk" FOREIGN KEY ("guardian_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guardian_students" ADD CONSTRAINT "guardian_students_student_profile_id_student_profiles_id_fk" FOREIGN KEY ("student_profile_id") REFERENCES "public"."student_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "cohorts_code_unique" ON "cohorts" USING btree ("code");--> statement-breakpoint
CREATE INDEX "cohorts_course_idx" ON "cohorts" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX "courses_slug_unique" ON "courses" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "enquiries_status_created_idx" ON "enquiries" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "enquiries_email_idx" ON "enquiries" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "enrollments_student_cohort_unique" ON "enrollments" USING btree ("student_profile_id","cohort_id");--> statement-breakpoint
CREATE INDEX "enrollments_cohort_status_idx" ON "enrollments" USING btree ("cohort_id","status");--> statement-breakpoint
CREATE INDEX "enrollments_external_order_idx" ON "enrollments" USING btree ("payment_provider","external_order_reference");--> statement-breakpoint
CREATE INDEX "guardian_students_student_idx" ON "guardian_students" USING btree ("student_profile_id");--> statement-breakpoint
CREATE INDEX "student_profiles_name_idx" ON "student_profiles" USING btree ("full_name");--> statement-breakpoint
CREATE INDEX "user_roles_role_idx" ON "user_roles" USING btree ("role");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");