import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasPermission, type Permission } from "./roles";
import { sessionCookieName } from "./cookies";
import { sessionRepository, type SessionRepository } from "./repository";
import {
  validateStoredSession,
  type AuthenticatedSession,
} from "./session-validation";
import { hashSessionToken } from "./tokens";

export async function findAuthenticatedSession(
  token: string | null,
  repository: SessionRepository = sessionRepository,
  now = new Date(),
): Promise<AuthenticatedSession | null> {
  if (!token || token.length > 128) return null;
  const tokenHash = hashSessionToken(token);
  const storedSession = await repository.findSessionByTokenHash(tokenHash);
  const session = validateStoredSession(storedSession, now);
  if (!session && storedSession) {
    await repository.deleteSessionByTokenHash(tokenHash);
  }
  return session;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  return findAuthenticatedSession(
    cookieStore.get(sessionCookieName)?.value ?? null,
  );
}

export async function requirePagePermission(permission: Permission) {
  const session = await getCurrentSession();
  if (!session) redirect("/admin/login");
  if (!hasPermission(session.roles, permission)) {
    redirect("/admin/login?reason=forbidden");
  }
  return session;
}
