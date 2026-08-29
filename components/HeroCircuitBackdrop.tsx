export function HeroCircuitBackdrop() {
  return (
    <svg
      className="hero-circuit"
      viewBox="0 0 1731 909"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-circuit-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#43e7e2" />
          <stop offset="1" stopColor="#5c7cff" />
        </linearGradient>
        <radialGradient id="hero-circuit-node">
          <stop offset="0" stopColor="#d3fff9" />
          <stop offset=".35" stopColor="#43e7e2" />
          <stop offset="1" stopColor="#43e7e2" stopOpacity="0" />
        </radialGradient>
        <filter
          id="hero-circuit-glow"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-circuit__routes">
        <path d="M0 790H310Q350 790 350 750V730H555Q595 730 595 690V664H713" />
        <path d="M0 836H410Q450 836 450 796V765H630Q670 765 670 725V708H800" />
        <path d="M1460 104H1575Q1615 104 1615 144V196H1731" />
        <path d="M1452 194H1535Q1575 194 1575 234V282H1660Q1700 282 1700 242V218H1731" />
        <path d="M1438 310H1510Q1544 310 1544 344V370H1650Q1686 370 1686 334V312H1731" />
      </g>

      <g
        className="hero-circuit__nodes"
        filter="url(#hero-circuit-glow)"
      >
        <circle cx="350" cy="730" r="6" />
        <circle cx="595" cy="690" r="5" />
        <circle cx="450" cy="796" r="5" />
        <circle cx="1615" cy="104" r="6" />
        <circle cx="1575" cy="282" r="5" />
        <circle cx="1686" cy="370" r="5" />
      </g>

      <g className="hero-circuit__window" transform="translate(1058 74)">
        <rect width="430" height="218" rx="20" />
        <path d="M0 54H430" />
        <circle cx="34" cy="28" r="7" />
        <circle cx="60" cy="28" r="7" />
        <circle cx="86" cy="28" r="7" />
        <path
          className="hero-circuit__bracket"
          d="m56 92-18 15 18 15M92 92l18 15-18 15M80 83l-14 49"
        />
        <g className="hero-circuit__code">
          <rect x="42" y="147" width="105" height="8" rx="4" />
          <rect x="164" y="147" width="206" height="8" rx="4" />
          <rect x="42" y="172" width="68" height="8" rx="4" />
          <rect x="127" y="172" width="145" height="8" rx="4" />
          <rect x="289" y="172" width="78" height="8" rx="4" />
        </g>
      </g>

      <circle
        className="hero-circuit__traveller hero-circuit__traveller--one"
        cx="0"
        cy="0"
        r="9"
        fill="url(#hero-circuit-node)"
      />
      <circle
        className="hero-circuit__traveller hero-circuit__traveller--two"
        cx="0"
        cy="0"
        r="9"
        fill="url(#hero-circuit-node)"
      />
    </svg>
  );
}
