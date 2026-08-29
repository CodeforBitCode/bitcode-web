import { readCookie, sessionCookieName } from "./cookies";
import { hasPermission, type Permission } from "./roles";
import { findAuthenticatedSession } from "./session";

export type ApiAuthorization =
  | { kind: "unauthenticated" }
  | { kind: "forbidden" }
  | { kind: "authorized"; session: NonNullable<Awaited<ReturnType<typeof findAuthenticatedSession>>> };

export async function authorizeApiRequest(
  request: Request,
  permission: Permission,
): Promise<ApiAuthorization> {
  const token = readCookie(request.headers.get("cookie"), sessionCookieName);
  const session = await findAuthenticatedSession(token);
  if (!session) return { kind: "unauthenticated" };
  if (!hasPermission(session.roles, permission)) return { kind: "forbidden" };
  return { kind: "authorized", session };
}
