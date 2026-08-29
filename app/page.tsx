import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { HeroCircuitBackdrop } from "@/components/HeroCircuitBackdrop";
import {
  ArrowIcon,
  BriefcaseIcon,
  CheckIcon,
  CodeIcon,
  RocketIcon,
  SchoolIcon,
  SparkIcon,
} from "@/components/Icons";
import { LearningShowcase } from "@/components/LearningShowcase";
import { MethodLoop } from "@/components/MethodLoop";
import { PuzzleMark } from "@/components/PuzzleMark";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { bitcodeLearningPaths, sampleGuidedProjects } from "@/data/bitcode";
import { teachingSteps } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "BitCode" },
  description:
    "Mentor-led coding for beginners, school learners, and college learners—built around clear logic, active practice, and projects students can explain.",
  alternates: { canonical: "/" },
};

const audiences = [
  {
    icon: <RocketIcon />,
    title: "Beginners",
    text: "Start strong. Code with confidence.",
    href: "/courses#coding-for-absolute-beginners",
  },
  {
    icon: <SchoolIcon />,
    title: "School Learners",
    text: "Build skills. Solve real problems.",
    href: "/courses#coding-programs-for-schools",
  },
  {
    icon: <BriefcaseIcon />,
    title: "College Learners",
    text: "Go deeper. Build the future.",
    href: "/courses#college-coding-support",
  },
];

const reasons = [
  {
    icon: <SparkIcon />,
    number: "01",
    label: "Clarity first",
    title: "Understand the why",
    text: "New concepts are broken into clear steps before syntax takes over.",
  },
  {
    icon: <CodeIcon />,
    number: "02",
    label: "Active practice",
    title: "Practise by doing",
    text: "Learners write code, test ideas, and work through mistakes during the session.",
  },
  {
    icon: <BriefcaseIcon />,
    number: "03",
    label: "Purposeful builds",
    title: "Build when ready",
    text: "Projects arrive when learners are ready to make decisions—not copy answers.",
  },
];

const pathSelections = [
  bitcodeLearningPaths[0],
  bitcodeLearningPaths[2],
  bitcodeLearningPaths[5],
];
const projectSelections = [
  sampleGuidedProjects[0],
  sampleGuidedProjects[1],
  sampleGuidedProjects[6],
];

export default function Home() {
  return (
    <>
      <section className="signal-hero">
        <div className="signal-hero__grid" aria-hidden="true" />
        <HeroCircuitBackdrop />
        <div className="container signal-hero__layout">
          <div className="signal-brand">
            <PuzzleMark className="signal-brand__mark" />
            <strong>BITCODE</strong>
          </div>

          <div className="signal-content">
            <h1>
              Understand. <span>Practise.</span> <em>Build.</em>
            </h1>
            <p className="signal-content__subtitle">
              Mentor-led coding for students
            </p>
            <nav
              className="signal-audience"
              aria-label="Choose a learning path"
            >
              {audiences.map((audience) => (
                <Link
                  className="signal-audience__card"
                  href={audience.href}
                  prefetch={false}
                  key={audience.title}
                >
                  <span className="signal-audience__icon">{audience.icon}</span>
                  <i aria-hidden="true" />
                  <span className="signal-audience__copy">
                    <strong>{audience.title}</strong>
                    <small>{audience.text}</small>
                  </span>
                  <ArrowIcon className="signal-audience__arrow" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="section runtime-section">
        <div className="container runtime-layout">
          <Reveal>
            <div className="runtime-copy">
              <span className="eyebrow eyebrow--light">
                A better way to learn
              </span>
              <h2>Coding should make sense before it feels fast.</h2>
              <p>
                BitCode helps learners understand the logic, practise it with
                guidance, and use it in work they can explain.
              </p>
              <div className="runtime-points">
                <span>
                  <CheckIcon /> Understand the why
                </span>
                <span>
                  <CheckIcon /> Practise by doing
                </span>
                <span>
                  <CheckIcon /> Build with purpose
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <LearningShowcase />
          </Reveal>
        </div>
      </section>

      <section className="section advantage-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="How BitCode helps"
              title="Understanding grows through the right kind of practice."
              align="center"
            >
              Clear explanations, useful attempts, and patient feedback turn
              unfamiliar ideas into skills learners can use independently.
            </SectionHeading>
          </Reveal>
          <div className="feature-grid">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 70}>
                <article className="feature-card feature-card--signal">
                  <div className="feature-card__top">
                    <span className="feature-icon">{reason.icon}</span>
                    <code>{reason.number}</code>
                  </div>
                  <span className="card-label">{reason.label}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                  <div className="feature-card__trace" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paths-section">
        <div className="paths-section__grid" aria-hidden="true" />
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="Learning paths"
                title="Start with the learner’s goal—not a one-size-fits-all syllabus."
              >
                Begin from zero, strengthen weak fundamentals, learn web
                development, or turn an idea into a working project.
              </SectionHeading>
              <Link href="/courses" prefetch={false} className="text-link">
                Compare all learning paths <ArrowIcon />
              </Link>
            </div>
          </Reveal>
          <div className="path-snapshot-grid">
            {pathSelections.map((path, index) => (
              <Reveal key={path.id} delay={index * 70}>
                <article className="path-snapshot">
                  <div className="path-snapshot__meta">
                    <span>0{index + 1}</span>
                    <code>
                      {index === 0
                        ? "start();"
                        : index === 1
                          ? "create();"
                          : "ship();"}
                    </code>
                  </div>
                  <h3>{path.title}</h3>
                  <p>{path.subtitle}</p>
                  <ul>
                    {path.learns.slice(0, 3).map((item) => (
                      <li key={item}>
                        <CheckIcon /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?course=${encodeURIComponent(path.title)}`}
                    prefetch={false}
                  >
                    Discuss this path <ArrowIcon />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section method-section--home">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="Inside a BitCode session"
                title="The keyboard does not stay with the mentor."
              >
                We explain, demonstrate, and then hand the thinking back to the
                learner through focused tasks, debugging, and review.
              </SectionHeading>
              <Button href="/teaching-method" variant="secondary">
                See the BitCode method <ArrowIcon />
              </Button>
            </div>
          </Reveal>
          <MethodLoop steps={teachingSteps.slice(0, 4)} />
        </div>
      </section>

      <section className="section project-lab">
        <div className="container project-lab__layout">
          <Reveal>
            <div className="project-lab__intro">
              <span className="eyebrow eyebrow--light">Guided project lab</span>
              <h2>Understanding becomes visible when something works.</h2>
              <p>
                Learners move from small outputs to guided builds they can test,
                improve, and explain.
              </p>
              <Button href="/projects" variant="secondary">
                Explore sample builds <ArrowIcon />
              </Button>
            </div>
          </Reveal>
          <div className="project-lab__cards">
            {projectSelections.map((project, index) => (
              <Reveal key={project.title} delay={index * 70}>
                <article className="mini-project-card">
                  <div className="mini-project-card__top">
                    <span>{project.difficulty}</span>
                    <code>0{index + 1}</code>
                  </div>
                  <div className="mini-project-card__window">
                    <span>
                      <i />
                      <i />
                      <i />
                    </span>
                    <code>
                      {index === 0
                        ? "<portfolio />"
                        : index === 1
                          ? "score += 1;"
                          : "for idea in ideas:"}
                    </code>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.finalOutput}</p>
                  <div>
                    {project.skillsUsed.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section founder-section founder-section--signal">
        <div className="container founder-note">
          <div className="founder-note__visual" aria-hidden="true">
            <div className="founder-note__mark">SS</div>
            <span>{"{ clarity > complexity }"}</span>
            <i />
            <i />
          </div>
          <Reveal className="founder-copy">
            <span className="eyebrow">From the founder</span>
            <p>
              BitCode was created around one clear standard: learners should
              understand what they code, not memorise their way through it.
            </p>
            <blockquote>
              &quot;Good coding starts when logic stops feeling scary.&quot;
            </blockquote>
            <span className="founder-byline">
              <strong>Shubham Shah</strong> Founder, BitCode
            </span>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
