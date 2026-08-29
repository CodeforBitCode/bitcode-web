import { handleAdminEnquiryStatusUpdate } from "@/lib/enquiries/admin-handler";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleAdminEnquiryStatusUpdate(request, (await params).id);
}
