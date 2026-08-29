"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CodeIcon, SparkIcon } from "./Icons";
import { TechMotionGraphic } from "./TechMotionGraphic";

const slides = [
  {
    step: "01",
    label: "Understand",
    title: "See how the logic works",
    text: "Simple explanations turn unfamiliar syntax into ideas learners can reason about.",
    code: ["const goal = “build”;", "learn(basics);", "practice(logic);"],
  },
  {
    step: "02",
    label: "Practise",
    title: "Try it while it is fresh",
    text: "Focused tasks reveal what is clear, what needs another example, and what to try next.",
    code: ["if (stuck) {", "  debugTogether();", "}"],
  },
  {
    step: "03",
    label: "Build",
    title: "Turn learning into output",
    text: "Web pages, mini tools, and guided projects make progress visible and explainable.",
    code: ["idea", "  → plan", "  → working project"],
  },
] as const;

export function LearningShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.01 },
    );

    updatePreference();
    updateVisibility();
    if (rootRef.current) observer.observe(rootRef.current);
    media.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !inView || !documentVisible) return;
    const interval = window.setInterval(
      () => setActive((value) => (value + 1) % slides.length),
      4300,
    );
    return () => window.clearInterval(interval);
  }, [paused, reducedMotion, inView, documentVisible]);

  const slide = slides[active];

  return (
    <div
      ref={rootRef}
      className="learning-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setPaused(false);
      }}
    >
      <TechMotionGraphic className="learning-showcase__motion" />
      <div className="learning-showcase__toolbar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <code>bitcode / learning-flow</code>
        <button
          type="button"
          className="learning-showcase__pause"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          disabled={reducedMotion}
          aria-label={
            reducedMotion
              ? "Automatic playback disabled by reduced-motion preference"
              : undefined
          }
        >
          {reducedMotion ? "Motion off" : paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="learning-showcase__stage">
        <div className="learning-showcase__step">{slide.step}</div>
        <span className="learning-showcase__label">
          <SparkIcon /> {slide.label}
        </span>
        <h2>{slide.title}</h2>
        <p>{slide.text}</p>
        <div className="learning-showcase__code">
          <div>
            <CodeIcon />
            <span>learner.js</span>
          </div>
          <pre>
            {slide.code.map((line, index) => (
              <code key={`${active}-${index}`}>{line}</code>
            ))}
          </pre>
        </div>
        <div className="learning-showcase__outcome">
          <CheckIcon /> One clear next step
        </div>
      </div>
      <div
        className="learning-showcase__nav"
        role="group"
        aria-label="Learning flow"
      >
        {slides.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={active === index}
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
          >
            <span>{item.step}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
