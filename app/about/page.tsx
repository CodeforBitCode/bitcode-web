import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { CheckIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About BitCode Technologies",
  description:
    "Learn why BitCode makes coding less confusing through clear explanations, active practice, patient feedback, and independent thinking.",
  alternates: { canonical: "/about" },
};

const values = [
  "Clear explanations",
  "Active practice",
  "Patient feedback",
  "Steady progress",
  "Independent thinking",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About BitCode"
        title="Making coding less confusing—and more usable."
      >
        BitCode is a mentor-led learning space for beginners, school learners,
        and college students who want to understand what they code and use it
        with confidence.
      </PageHero>
      <section className="section about-compact">
        <div className="container about-compact__grid">
          <Reveal>
            <article className="about-brand-card">
              <span className="eyebrow">The BitCode standard</span>
              <h2>Clarity before shortcuts.</h2>
              <p>
                We teach one idea at a time, connect it to active practice, and
                create room for questions. Strong thinking comes before speed or
                oversized projects.
              </p>
              <div className="about-values">
                {values.map((value) => (
                  <span key={value}>
                    <CheckIcon /> {value}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="founder-summary">
              <div className="founder-summary__mark">SS</div>
              <div>
                <span className="eyebrow">Founder</span>
                <h2>Shubham Shah</h2>
                <p>
                  Shubham created BitCode around one clear standard: learners
                  should understand what they code, not memorise their way
                  through it.
                </p>
                <blockquote>
                  &quot;Confidence grows when logic starts making sense.&quot;
                </blockquote>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
      <CTASection title="Let’s find a starting point that makes sense." />
    </>
  );
}
