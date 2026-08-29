"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { enquiryStatuses, type EnquiryStatus } from "@/lib/enquiries/status";

const labels: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  converted: "Converted",
  closed: "Closed",
  spam: "Spam",
};

export function EnquiryStatusForm({ id, status }: { id: string; status: EnquiryStatus }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/admin/enquiries/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: data.get("status") }),
      });
      if (response.status === 401) {
        router.replace("/admin/login");
        router.refresh();
        return;
      }
      if (!response.ok) {
        setState("error");
        return;
      }
      setState("saved");
      router.refresh();
    } catch {
      setState("error");
    }
  }

  return (
    <form className="admin-status-form" onSubmit={handleSubmit}>
      <label>
        Status
        <select name="status" defaultValue={status} onChange={() => setState("idle")}>
          {enquiryStatuses.map((value) => (
            <option key={value} value={value}>
              {labels[value]}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={state === "saving"}>
        {state === "saving" ? "Saving…" : "Update"}
      </button>
      <span className={`admin-save-state admin-save-state--${state}`} aria-live="polite">
        {state === "saved" ? "Saved" : state === "error" ? "Could not save" : ""}
      </span>
    </form>
  );
}
