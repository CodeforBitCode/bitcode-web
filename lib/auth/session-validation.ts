import { appRoles, hasPermission, type AppRole, type Permission } from "./roles";

export type StoredSession = {
  tokenHash: string;
  userId: string;
  email: string;
  displayName: string;
  userStatus: "active" | "inactive";
  expiresAt: Date;
  roles: readonly string[];
};

export type AuthenticatedSession = Omit<StoredSession, "roles"> & {
  roles: readonly AppRole[];
};

export function validateStoredSession(
  session: StoredSession | null,
  now = new Date(),
): AuthenticatedSession | null {
  if (!session || session.userStatus !== "active" || session.expiresAt <= now) {
    return null;
  }

  const roles = session.roles.filter((role): role is AppRole =>
    appRoles.includes(role as AppRole),
  );
  if (roles.length === 0) return null;
  return { ...session, roles };
}

export function getPageAccessDecision(
  session: AuthenticatedSession | null,
  permission: Permission,
) {
  if (!session) return "login" as const;
  return hasPermission(session.roles, permission) ? ("allow" as const) : ("forbidden" as const);
}
