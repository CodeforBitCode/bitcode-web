import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { CheckIcon, CodeIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { sampleGuidedProjects } from "@/data/bitcode";

export const metadata: Metadata = {
  title: "Guided Coding Projects for Students",
  description:
    "Explore realistic guided project formats across web development, JavaScript, Python, logic, and college project work.",
  alternates: { canonical: "/projects" },
};

const featuredProjects = sampleGuidedProjects.slice(0, 6);
const projectVisualClasses = [
  "sample-project__visual sample-project__visual--1",
  "sample-project__visual sample-project__visual--2",
  "sample-project__visual sample-project__visual--3",
] as const;

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Guided project lab"
        title="From “I understand it” to “I built it.”"
      >
        These are honest sample project formats, not claims of completed student
        work. Each one is chosen to strengthen a specific skill and produce
        something the learner can test and explain.
      </PageHero>
      <section className="section projects-compact">
        <div className="container">
          <Reveal>
            <div className="project-principles project-principles--new">
              <article>
                <span className="project-principles__icon">
                  <CodeIcon />
                </span>
                <div>
                  <span>Build at the right level</span>
                  <h2>Every project has a learning job.</h2>
                  <p>
                    The scope matches the learner’s current foundations, so each
                    new feature teaches something useful.
                  </p>
                </div>
              </article>
              <article className="project-principles__honesty">
                <span className="project-principles__icon">{"//"}</span>
                <div>
                  <span>Finish with understanding</span>
                  <h2>Build work that is explainable.</h2>
                  <p>
                    Learners are guided to understand what the code is doing,
                    test their decisions, and present the result without blind
                    copying.
                  </p>
                </div>
              </article>
            </div>
          </Reveal>
          <div className="sample-project-grid">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.title} delay={(index % 3) * 65}>
                <article className="sample-project">
                  <div
                    className={
                      projectVisualClasses[index % projectVisualClasses.length]
                    }
                  >
                    <div className="sample-project__bar">
                      <span>
                        <i />
                        <i />
                        <i />
                      </span>
                      <code>build_0{index + 1}</code>
                    </div>
                    <strong>
                      {index === 0
                        ? "<portfolio />"
                        : index === 1
                          ? "question.next()"
                          : index === 2
                            ? "7 × 8 = 56"
                            : index === 3
                              ? "design → code"
                              : index === 4
                                ? "score++;"
                                : "demo.ready()"}
                    </strong>
                  </div>
                  <div className="sample-project__copy">
                    <div>
                      <span>{project.difficulty}</span>
                      <code>Sample build</code>
                    </div>
                    <h2>{project.title}</h2>
                    <p>{project.learningOutcome}</p>
                    <ul>
                      {project.skillsUsed.map((skill) => (
                        <li key={skill}>
                          <CheckIcon /> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Have an idea worth building?"
        text="Bring the rough concept, current code, or even the confusion. We’ll help turn it into a realistic build plan."
      />
    </>
  );
}
