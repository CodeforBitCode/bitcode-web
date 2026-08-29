import {
  clearSessionCookie,
  readCookie,
  sessionCookieName,
} from "./cookies";
import { isSameOriginRequest } from "./http";
import { sessionRepository } from "./repository";
import { hashSessionToken } from "./tokens";

type DeleteSession = (tokenHash: string) => Promise<void>;

export async function handleLogoutPost(
  request: Request,
  deleteSession: DeleteSession = (tokenHash) =>
    sessionRepository.deleteSessionByTokenHash(tokenHash),
) {
  if (!isSameOriginRequest(request)) {
    return Response.json(
      { success: false, code: "INVALID_ORIGIN" },
      { status: 403 },
    );
  }

  const token = readCookie(request.headers.get("cookie"), sessionCookieName);
  if (token && token.length <= 128) {
    await deleteSession(hashSessionToken(token));
  }

  return Response.json(
    { success: true },
    { headers: { "Set-Cookie": clearSessionCookie() } },
  );
}
