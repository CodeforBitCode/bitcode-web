import { DatabaseConfigurationError } from "@/lib/db";
import { authenticateCredentials } from "./authentication";
import { createSessionCookie } from "./cookies";
import { isSameOriginRequest } from "./http";
import { authenticationRepository } from "./repository";
import { loginSchema } from "./validation";

const maxLoginRequestBytes = 4 * 1024;

type Authenticate = typeof authenticateCredentials;

function errorResponse(status: number, code: string, message: string) {
  return Response.json({ success: false, code, message }, { status });
}

export async function handleLoginPost(
  request: Request,
  authenticate: Authenticate = (credentials, _repository, now) =>
    authenticateCredentials(credentials, authenticationRepository, now),
) {
  if (!isSameOriginRequest(request)) {
    return errorResponse(403, "INVALID_ORIGIN", "The request was rejected.");
  }
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    return errorResponse(415, "UNSUPPORTED_MEDIA_TYPE", "JSON is required.");
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > maxLoginRequestBytes) {
    return errorResponse(413, "REQUEST_TOO_LARGE", "The request is too large.");
  }

  let rawCredentials: unknown;
  try {
    const body = await request.arrayBuffer();
    if (body.byteLength > maxLoginRequestBytes) {
      return errorResponse(
        413,
        "REQUEST_TOO_LARGE",
        "The request is too large.",
      );
    }
    rawCredentials = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return errorResponse(400, "INVALID_JSON", "The request is invalid.");
  }

  const parsed = loginSchema.safeParse(rawCredentials);
  if (!parsed.success) {
    return errorResponse(
      401,
      "INVALID_CREDENTIALS",
      "The email or password is incorrect.",
    );
  }

  try {
    const result = await authenticate(
      parsed.data,
      authenticationRepository,
      new Date(),
    );
    if (!result.ok) {
      return errorResponse(
        401,
        "INVALID_CREDENTIALS",
        "The email or password is incorrect.",
      );
    }

    return Response.json(
      { success: true },
      {
        headers: { "Set-Cookie": createSessionCookie(result.token, result.expiresAt) },
      },
    );
  } catch (error) {
    if (!(error instanceof DatabaseConfigurationError)) {
      console.error(
        JSON.stringify({
          level: "error",
          service: "bitcode-auth",
          event: "login_failed",
          errorName: error instanceof Error ? error.name : "UnknownError",
        }),
      );
    }
    return errorResponse(
      503,
      "LOGIN_UNAVAILABLE",
      "Login is temporarily unavailable.",
    );
  }
}
