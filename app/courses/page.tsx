import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { LearningPathAccordion } from "@/components/LearningPathAccordion";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Coding Learning Paths for Students and Beginners",
  description:
    "Find a practical BitCode learning path for complete beginners, school learners, web development, logic building, college support, or project mentorship.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning paths"
        title="The right path starts at the learner’s current level."
      >
        Choose a goal below. BitCode adapts the starting point to the learner’s
        experience, confidence, and readiness to build.
      </PageHero>
      <section className="section learning-path-page">
        <div className="container">
          <Reveal>
            <div className="course-choice">
              <div>
                <span className="eyebrow">Choose by need</span>
                <h2>What does the learner need next?</h2>
                <p>
                  You do not need to diagnose the perfect course. Pick the
                  closest goal, or share the learner’s background and we will
                  help narrow it down.
                </p>
              </div>
              <div className="course-choice__signals">
                {[
                  "Starting from zero",
                  "Strengthening foundations",
                  "Turning ideas into projects",
                ].map((item) => (
                  <span key={item}>
                    <CheckIcon /> {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <LearningPathAccordion variant="grid" />
          <Reveal>
            <div className="path-help">
              <div>
                <span>Unsure which path fits?</span>
                <h2>Find a sensible starting point.</h2>
                <p>
                  Share the learner’s age or year, current experience, and goal.
                  We will help map the next step.
                </p>
              </div>
              <Button href="/contact">
                Find a starting path <ArrowIcon />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
