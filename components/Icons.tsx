import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
export function MessageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M9 9.5c.8 2 2 3.2 4 4" />
    </svg>
  );
}
export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </svg>
  );
}
export function SparkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3ZM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
    </svg>
  );
}
export function RocketIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 5.5c2.4-2.4 4.8-2.5 5.8-2.4.1 1 .1 3.4-2.4 5.8l-4.5 4.5-5-5 4.5-4.5Z" />
      <path d="m10.2 6.2-4.3.6-2.8 2.8 5.3.7M15.2 11.2l-.6 4.3-2.8 2.8-.7-5.3M7.2 13.8c-2.1.5-3.4 1.8-3.9 4 2.1-.5 3.4-1.8 3.9-4ZM16.3 7.1h.01" />
    </svg>
  );
}
export function SchoolIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 12v4.5c2.9 2 7.1 2 10 0V12M21 9v6" />
    </svg>
  );
}
export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
    </svg>
  );
}
