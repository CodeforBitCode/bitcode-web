import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { CheckIcon, CodeIcon, SparkIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "What Coding Progress Looks Like at BitCode",
  description:
    "See the practical signs of coding progress BitCode works toward: clear explanation, problem breakdown, reasoned debugging, and presentable projects.",
  alternates: { canonical: "/testimonials" },
};

const progressSignals = [
  {
    icon: <SparkIcon />,
    title: "Explain without reading",
    text: "The learner can describe the idea in their own words and connect it to the code.",
  },
  {
    icon: <CodeIcon />,
    title: "Break down a problem",
    text: "They can turn a larger task into smaller steps and make a sensible first attempt.",
  },
  {
    icon: <CheckIcon />,
    title: "Debug with a reason",
    text: "They trace what happened, identify the faulty assumption, and improve the solution.",
  },
  {
    icon: <SparkIcon />,
    title: "Build and present",
    text: "They can demonstrate the output, explain key choices, and identify what they would improve.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning outcomes"
        title="Don’t only ask what they covered. Ask what they can do."
      >
        Useful progress appears in the way a learner explains, attempts, debugs,
        and presents—not only in the number of topics completed.
      </PageHero>
      <section className="section outcomes-page">
        <div className="container">
          <div className="outcome-card-grid">
            {progressSignals.map((signal, index) => (
              <Reveal key={signal.title} delay={index * 60}>
                <article>
                  <span>{signal.icon}</span>
                  <code>0{index + 1}</code>
                  <h2>{signal.title}</h2>
                  <p>{signal.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="feedback-note">
              <span className="eyebrow">A transparent standard</span>
              <h2>Genuine feedback only.</h2>
              <p>
                Verified learner and parent feedback will be published here with
                permission as the BitCode community grows. We will not use
                invented reviews, borrowed results, or exaggerated claims.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <CTASection title="Ready to make progress visible?" />
    </>
  );
}
