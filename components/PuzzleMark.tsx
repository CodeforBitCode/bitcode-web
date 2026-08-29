import { useId } from "react";

export function PuzzleMark({ className = "" }: { className?: string }) {
  const clipId = `bitcode-mark-${useId().replace(/:/g, "")}`;

  return (
    <svg
      className={`puzzle-mark ${className}`}
      viewBox="321 203 630 624"
      role="img"
      aria-label="BitCode puzzle mark"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d="M321 203H484V359H404V438H321Z" />
          <path d="M560 203H796V359H638V281H560Z" />
          <path d="M873 203H951V515H795V359H873Z" />
          <path d="M483 359H638V410H721V465H638V515H483Z" />
          <path d="M321 515H483V669H404V826H321Z" />
          <path d="M638 515H796V669H638V618H560V564H638Z" />
          <path d="M483 669H638V748H717V827H483Z" />
          <path d="M873 591H951V827H795V669H873Z" />
        </clipPath>
      </defs>
      <image
        href="/bitcode-logo.webp"
        x="0"
        y="0"
        width="1254"
        height="1254"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="none"
      />
    </svg>
  );
}
