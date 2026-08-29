export function TechMotionGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`tech-motion ${className}`}
      viewBox="0 0 240 180"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="tech-motion-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#42d9e9" />
          <stop offset="1" stopColor="#4f7dcc" />
        </linearGradient>
        <filter
          id="tech-motion-glow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        className="tech-motion__grid"
        d="M20 30H220M20 70H220M20 110H220M20 150H220M40 14V166M80 14V166M120 14V166M160 14V166M200 14V166"
      />
      <path
        className="tech-motion__route"
        d="M28 132C66 132 66 48 112 48S156 116 212 66"
      />
      <path
        className="tech-motion__route tech-motion__route--two"
        d="M32 44C72 44 78 136 126 136S170 82 214 138"
      />
      <g className="tech-motion__blocks">
        <rect x="42" y="28" width="34" height="34" rx="8" />
        <rect x="76" y="62" width="34" height="34" rx="8" />
        <rect x="150" y="104" width="34" height="34" rx="8" />
      </g>
      <g className="tech-motion__chip">
        <rect x="126" y="24" width="54" height="28" rx="9" />
        <text x="153" y="43" textAnchor="middle">
          {"{ }"}
        </text>
      </g>
      <g filter="url(#tech-motion-glow)">
        <circle
          className="tech-motion__node tech-motion__node--one"
          cx="28"
          cy="132"
          r="5"
        />
        <circle
          className="tech-motion__node tech-motion__node--two"
          cx="212"
          cy="66"
          r="5"
        />
        <circle
          className="tech-motion__node tech-motion__node--three"
          cx="32"
          cy="44"
          r="3.5"
        />
      </g>
      <g className="tech-motion__orbit">
        <circle cx="121" cy="92" r="56" />
        <circle cx="121" cy="92" r="69" />
      </g>
    </svg>
  );
}
