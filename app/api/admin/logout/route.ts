import { handleLogoutPost } from "@/lib/auth/logout-handler";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleLogoutPost(request);
}
