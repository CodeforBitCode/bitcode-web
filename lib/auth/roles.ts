export const appRoles = [
  "student",
  "parent_guardian",
  "instructor",
  "admin",
] as const;

export type AppRole = (typeof appRoles)[number];

export const permissions = [
  "profile:read:own",
  "profile:manage:own",
  "linked_students:read",
  "courses:read",
  "cohorts:read",
  "cohorts:manage",
  "enrollments:read:own",
  "enrollments:read:cohort",
  "enrollments:manage",
  "enquiries:manage",
  "users:manage",
] as const;

export type Permission = (typeof permissions)[number];

export const rolePermissions: Record<AppRole, readonly Permission[]> = {
  student: [
    "profile:read:own",
    "profile:manage:own",
    "courses:read",
    "cohorts:read",
    "enrollments:read:own",
  ],
  parent_guardian: [
    "profile:read:own",
    "profile:manage:own",
    "linked_students:read",
    "courses:read",
    "cohorts:read",
    "enrollments:read:own",
  ],
  instructor: [
    "profile:read:own",
    "profile:manage:own",
    "courses:read",
    "cohorts:read",
    "enrollments:read:cohort",
  ],
  admin: permissions,
};

export function hasPermission(
  roles: readonly AppRole[],
  permission: Permission,
) {
  return roles.some((role) => rolePermissions[role].includes(permission));
}
