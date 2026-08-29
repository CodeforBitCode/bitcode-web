"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");

  async function logout() {
    setState("submitting");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) {
        setState("error");
        return;
      }
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setState("error");
    }
  }

  return (
    <div className="admin-logout-control">
      <button className="admin-logout" type="button" onClick={logout} disabled={state === "submitting"}>
        {state === "submitting" ? "Signing out…" : "Sign out"}
      </button>
      {state === "error" && <span role="alert">Could not sign out</span>}
    </div>
  );
}
