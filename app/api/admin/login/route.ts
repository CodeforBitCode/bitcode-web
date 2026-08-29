import { handleLoginPost } from "@/lib/auth/login-handler";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleLoginPost(request);
}
