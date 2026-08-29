import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { CheckIcon } from "@/components/Icons";
import { MethodLoop } from "@/components/MethodLoop";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { teachingSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "How Learning Works at BitCode",
  description:
    "See how BitCode turns explanations into active coding, independent attempts, useful debugging, review, and steady progress.",
  alternates: { canonical: "/teaching-method" },
};

export default function TeachingMethodPage() {
  const classBenefits = [
    [
      "Clear before complex",
      "New ideas are broken into useful steps before more syntax is added.",
    ],
    [
      "Practice during the session",
      "Learners apply the concept while the explanation is still fresh.",
    ],
    [
      "Review and level up",
      "The learner explains the result, improves the approach, and leaves with a useful next step.",
    ],
  ];

  return (
    <>
      <PageHero
        eyebrow="How learning works"
        title="A class is useful when the learner is doing the thinking."
      >
        BitCode follows a practical loop: make the idea clear, code it together,
        let the learner try, debug the thinking, and review what comes next.
      </PageHero>
      <section className="section method-page method-page--preferred">
        <div className="method-tech-chips" aria-hidden="true">
          <span>{"{ }"}</span>
          <span>{"< >"}</span>
          <span>{"//"}</span>
          <span>++</span>
        </div>
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Inside a BitCode session"
              title="The keyboard does not stay with the mentor."
            >
              We explain, demonstrate, and then hand the thinking back to the
              learner through focused tasks, debugging, and review.
            </SectionHeading>
          </Reveal>
          <MethodLoop
            steps={teachingSteps.slice(0, 4)}
            className="method-loop--method-page"
          />
          <Reveal>
            <div className="class-meaning">
              <div className="class-meaning__intro">
                <span className="eyebrow eyebrow--light">
                  Inside the session
                </span>
                <h2>Less passive watching. More useful practice.</h2>
                <p>
                  The mentor guides the pace, but the learner owns the attempt.
                </p>
              </div>
              <div className="class-meaning__points">
                {classBenefits.map(([title, text]) => (
                  <article key={title}>
                    <CheckIcon />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <CTASection
        title="Need a learning plan that meets the learner where they are?"
        text="Share what feels easy, what feels confusing, and what they want to build. We’ll help shape a useful next step."
      />
    </>
  );
}
