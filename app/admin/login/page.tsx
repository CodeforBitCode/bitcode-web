import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getCurrentSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";

export const metadata: Metadata = {
  title: "Staff login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getCurrentSession();
  if (session && hasPermission(session.roles, "admin:access")) {
    redirect("/admin/enquiries");
  }

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <span className="eyebrow">BitCode internal</span>
        <h1>Staff sign in</h1>
        <p>Use your BitCode staff credentials to manage enquiries.</p>
        <AdminLoginForm />
      </div>
    </section>
  );
}
