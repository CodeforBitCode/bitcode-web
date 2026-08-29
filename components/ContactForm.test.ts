import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("declares the secure enquiry endpoint while preserving field semantics", () => {
    const markup = renderToStaticMarkup(createElement(ContactForm));

    expect(markup).toContain('action="/api/enquiries"');
    expect(markup).toContain('method="post"');
    expect(markup).not.toContain('action="mailto:');
    expect(markup).toMatch(
      /<input(?=[^>]*type="text")(?=[^>]*autoComplete="name")(?=[^>]*name="name")/,
    );
    expect(markup).toMatch(
      /<input(?=[^>]*type="email")(?=[^>]*autoComplete="email")(?=[^>]*name="email")/,
    );
    expect(markup).toMatch(
      /<input(?=[^>]*type="tel")(?=[^>]*autoComplete="tel")(?=[^>]*name="phone")/,
    );
  });
});
