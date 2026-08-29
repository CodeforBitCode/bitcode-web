import type { ReactNode } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { requirePagePermission } from "@/lib/auth/session";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await requirePagePermission("admin:access");

  return (
    <section className="admin-shell">
      <header className="admin-shell-header">
        <div>
          <Link href="/admin/enquiries">BitCode Admin</Link>
          <span>{session.displayName}</span>
        </div>
        <LogoutButton />
      </header>
      {children}
    </section>
  );
}
