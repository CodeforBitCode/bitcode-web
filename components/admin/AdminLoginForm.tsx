"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      if (!response.ok) {
        setState("error");
        return;
      }
      router.replace("/admin/enquiries");
      router.refresh();
    } catch {
      setState("error");
    }
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={320}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={12}
          maxLength={128}
        />
      </label>
      {state === "error" && (
        <p className="admin-form-error" role="alert">
          The email or password is incorrect, or login is temporarily unavailable.
        </p>
      )}
      <button className="button button--primary" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
