import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CheckIcon, MailIcon, MessageIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { siteConfig, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Course Guidance and Contact",
  description:
    "Tell BitCode about the learner’s starting point, current experience, and goal to receive practical coding path guidance.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const shareItems = [
    "Current class or age",
    "Coding experience",
    "Learning goal",
    "Preferred path, if known",
  ];

  return (
    <>
      <PageHero
        eyebrow="Course guidance"
        title="Tell us the starting point. We’ll help shape the next step."
        aside={
          <div className="contact-hero-card">
            <div className="contact-hero-card__code">
              <i />
              <i />
              <i />
              <code>goal -&gt; clear path</code>
            </div>
            <span>What helps us guide you</span>
            <h2>A little context goes a long way.</h2>
            <p>
              Share what the learner knows today and what they want to do next.
            </p>
            <ul>
              {shareItems.map((item) => (
                <li key={item}>
                  <span>
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        You do not need to know the right course before reaching out. A short
        question or a detailed form both work.
      </PageHero>
      <section className="section contact-section">
        <div className="container contact-grid">
          <aside className="contact-aside">
            <div>
              <span className="eyebrow">Simple and direct</span>
              <h2>Start with the learner’s goal.</h2>
              <p>
                We will understand the context, suggest a sensible path, and
                keep the next step clear.
              </p>
            </div>
            <a
              className="contact-option contact-option--primary"
              href={`mailto:${siteConfig.email}`}
            >
              <span>
                <MailIcon />
              </span>
              <div>
                <small>Detailed enquiries</small>
                <strong>{siteConfig.email}</strong>
                <p>Best when you want to share full context</p>
              </div>
            </a>
            <a
              className="contact-option"
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <MessageIcon />
              </span>
              <div>
                <small>Direct message</small>
                <strong>Message BitCode</strong>
                <p>A convenient option for a short first question</p>
              </div>
            </a>
            <div className="response-note">
              <strong>What happens next?</strong>
              <p>
                We review the learner’s needs and suggest a practical place to
                begin—without pressure or a complicated admission process.
              </p>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
