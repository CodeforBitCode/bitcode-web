import { handleAdminEnquiryList } from "@/lib/enquiries/admin-handler";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleAdminEnquiryList(request);
}
