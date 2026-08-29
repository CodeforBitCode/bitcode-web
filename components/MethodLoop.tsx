import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type MethodStep = {
  number: string;
  cue: ReactNode;
  title: string;
  text: string;
};

export function MethodLoop({
  steps,
  className = "",
}: {
  steps: readonly MethodStep[];
  className?: string;
}) {
  return (
    <div className={`method-loop ${className}`.trim()}>
      {steps.map((step, index) => (
        <Reveal key={step.number} delay={index * 60}>
          <article>
            <span>{step.number}</span>
            <code>{step.cue}</code>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {index < steps.length - 1 && <i aria-hidden="true" />}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
