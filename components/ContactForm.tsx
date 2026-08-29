"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { learningPathTitles, siteConfig, whatsappUrl } from "@/data/site";
import { ArrowIcon, MailIcon, MessageIcon } from "./Icons";

type FormStatus = {
  type: "idle" | "saving" | "ready";
  whatsapp?: string;
  mailto?: string;
  persisted?: boolean;
};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const courseRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const requestedCourse = new URLSearchParams(window.location.search).get(
      "course",
    );
    if (
      requestedCourse &&
      learningPathTitles.includes(
        requestedCourse as (typeof learningPathTitles)[number],
      ) &&
      courseRef.current
    ) {
      courseRef.current.value = requestedCourse;
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const summary = [
      "Hi BitCode, I’m interested in coding guidance.",
      "",
      `Name: ${String(data.name).trim()}`,
      `Email: ${String(data.email).trim()}`,
      `Phone: ${String(data.phone).trim()}`,
      `Student age/class: ${String(data.studentClass).trim()}`,
      `Learning path: ${String(data.course).trim()}`,
      `Message: ${String(data.message).trim()}`,
    ].join("\n");
    const subject = encodeURIComponent(
      `BitCode enquiry: ${String(data.course).trim()}`,
    );
    const contactOptions = {
      whatsapp: whatsappUrl(summary),
      mailto: `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(summary)}`,
    };

    setStatus({ type: "saving" });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          studentAgeOrClass: data.studentClass,
          learningPathInterest: data.course,
          message: data.message,
          website: data.website,
        }),
      });

      setStatus({
        type: "ready",
        persisted: response.ok,
        ...contactOptions,
      });
    } catch {
      setStatus({ type: "ready", persisted: false, ...contactOptions });
    }
  }

  return (
    <form
      className="contact-form"
      action={`mailto:${siteConfig.email}`}
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
    >
      <div className="form-heading">
        <span>Tell us a little about the learner</span>
        <p>We will use these details to understand the right starting point.</p>
      </div>
      <div className="form-grid">
        <label>
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={150}
            required
            placeholder="you@example.com"
          />
        </label>
        <label>
          Phone number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            pattern="[+0-9 ()-]{8,18}"
            maxLength={18}
            required
            placeholder="+91 98765 43210"
          />
        </label>
        <label>
          Student age / class
          <input
            name="studentClass"
            type="text"
            maxLength={80}
            required
            placeholder="Example: Age 14 / Class 9"
          />
        </label>
        <label className="form-full">
          Learning path interested in
          <select ref={courseRef} name="course" defaultValue="" required>
            <option value="">Choose an option</option>
            {learningPathTitles.map((title) => (
              <option key={title}>{title}</option>
            ))}
          </select>
        </label>
        <label className="form-full">
          Message
          <textarea
            name="message"
            rows={5}
            minLength={10}
            maxLength={1500}
            required
            placeholder="What would you like help with?"
          />
        </label>
        <label className="form-honeypot" aria-hidden="true">
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        className="button button--primary form-submit"
        type="submit"
        disabled={status.type === "saving"}
      >
        {status.type === "saving" ? "Saving enquiry…" : "Continue enquiry"}{" "}
        <ArrowIcon />
      </button>
      {status.type === "ready" && (
        <div
          className="form-status form-status--ready"
          role="status"
          aria-live="polite"
        >
          <p>
            {status.persisted
              ? "Your enquiry has been saved. You can also contact BitCode directly below."
              : "We could not save the enquiry right now. Please use email or WhatsApp below."}
          </p>
          <div>
            <a className="button button--primary" href={status.mailto}>
              <MailIcon /> Send by email
            </a>
            <a
              className="button button--secondary"
              href={status.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageIcon /> Message BitCode
            </a>
          </div>
        </div>
      )}
      <p className="form-privacy">
        When you continue, BitCode records these details so the team can
        respond. Email and WhatsApp remain available as direct alternatives.
      </p>
    </form>
  );
}
