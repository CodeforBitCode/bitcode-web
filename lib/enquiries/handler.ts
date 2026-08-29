import { DatabaseConfigurationError } from "@/lib/db";
import { saveEnquiry, type SaveEnquiry } from "./repository";
import { enquirySubmissionSchema } from "./validation";

const maxRequestBytes = 16 * 1024;

function errorResponse(status: number, code: string, message: string) {
  return Response.json({ success: false, code, message }, { status });
}

export async function handleEnquiryPost(
  request: Request,
  persist: SaveEnquiry = saveEnquiry,
) {
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    return errorResponse(
      415,
      "UNSUPPORTED_MEDIA_TYPE",
      "Content-Type must be application/json.",
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxRequestBytes) {
    return errorResponse(413, "REQUEST_TOO_LARGE", "Request body is too large.");
  }

  const body = await request.arrayBuffer();
  if (body.byteLength > maxRequestBytes) {
    return errorResponse(413, "REQUEST_TOO_LARGE", "Request body is too large.");
  }

  let rawSubmission: unknown;
  try {
    rawSubmission = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return errorResponse(400, "INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = enquirySubmissionSchema.safeParse(rawSubmission);
  if (!parsed.success) {
    return Response.json(
      {
        success: false,
        code: "INVALID_ENQUIRY",
        message: "Please check the enquiry fields and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  try {
    const created = await persist(parsed.data);
    return Response.json(
      {
        success: true,
        enquiry: {
          id: created.id,
          createdAt: created.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (!(error instanceof DatabaseConfigurationError)) {
      console.error(
        JSON.stringify({
          level: "error",
          service: "bitcode-enquiries",
          event: "create_failed",
          errorName: error instanceof Error ? error.name : "UnknownError",
        }),
      );
    }

    return errorResponse(
      503,
      "ENQUIRY_UNAVAILABLE",
      "The enquiry could not be saved right now. Please use email or WhatsApp.",
    );
  }
}
