import { authorizeApiRequest, type ApiAuthorization } from "@/lib/auth/api-authorization";
import { isSameOriginRequest } from "@/lib/auth/http";
import type { Permission } from "@/lib/auth/roles";
import {
  listAdminEnquiries,
  updateEnquiryStatus,
} from "./admin-repository";
import {
  enquiryIdSchema,
  enquiryListQuerySchema,
  enquiryStatusUpdateSchema,
} from "./admin-validation";

type Authorize = (
  request: Request,
  permission: Permission,
) => Promise<ApiAuthorization>;

function authorizationError(authorization: ApiAuthorization) {
  if (authorization.kind === "unauthenticated") {
    return Response.json(
      { success: false, code: "UNAUTHENTICATED" },
      { status: 401 },
    );
  }
  if (authorization.kind === "forbidden") {
    return Response.json(
      { success: false, code: "FORBIDDEN" },
      { status: 403 },
    );
  }
  return null;
}

export async function handleAdminEnquiryList(
  request: Request,
  authorize: Authorize = authorizeApiRequest,
  list = listAdminEnquiries,
) {
  const authorization = await authorize(request, "enquiries:manage");
  const rejected = authorizationError(authorization);
  if (rejected) return rejected;

  const url = new URL(request.url);
  const parsed = enquiryListQuerySchema.safeParse({
    q: url.searchParams.get("q"),
    status: url.searchParams.get("status"),
    learningPath: url.searchParams.get("learningPath"),
    page: url.searchParams.get("page") ?? 1,
  });
  if (!parsed.success) {
    return Response.json(
      { success: false, code: "INVALID_FILTERS" },
      { status: 400 },
    );
  }

  const result = await list(parsed.data);
  return Response.json({ success: true, ...result });
}

export async function handleAdminEnquiryStatusUpdate(
  request: Request,
  id: string,
  authorize: Authorize = authorizeApiRequest,
  update = updateEnquiryStatus,
) {
  const authorization = await authorize(request, "enquiries:manage");
  const rejected = authorizationError(authorization);
  if (rejected) return rejected;
  if (!isSameOriginRequest(request)) {
    return Response.json(
      { success: false, code: "INVALID_ORIGIN" },
      { status: 403 },
    );
  }

  const parsedId = enquiryIdSchema.safeParse(id);
  if (!parsedId.success) {
    return Response.json(
      { success: false, code: "INVALID_ENQUIRY" },
      { status: 400 },
    );
  }

  let rawBody: unknown;
  try {
    if (!request.headers.get("content-type")?.startsWith("application/json")) {
      return Response.json(
        { success: false, code: "UNSUPPORTED_MEDIA_TYPE" },
        { status: 415 },
      );
    }
    const body = await request.arrayBuffer();
    if (body.byteLength > 1024) {
      return Response.json(
        { success: false, code: "REQUEST_TOO_LARGE" },
        { status: 413 },
      );
    }
    rawBody = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return Response.json(
      { success: false, code: "INVALID_JSON" },
      { status: 400 },
    );
  }

  const parsedBody = enquiryStatusUpdateSchema.safeParse(rawBody);
  if (!parsedBody.success) {
    return Response.json(
      { success: false, code: "INVALID_STATUS" },
      { status: 422 },
    );
  }

  const updated = await update(parsedId.data, parsedBody.data.status);
  if (!updated) {
    return Response.json(
      { success: false, code: "ENQUIRY_NOT_FOUND" },
      { status: 404 },
    );
  }
  return Response.json({ success: true, enquiry: updated });
}
