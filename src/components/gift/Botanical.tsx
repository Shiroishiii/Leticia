/** Ilustrações botânicas desenhadas à mão em SVG. */

export function Stem({
  delay = 0,
  color = "var(--violet-2)",
  bloomColor,
  height = 260,
  rotate = 0,
  flip = false,
}: {
  delay?: number;
  color?: string;
  bloomColor?: string;
  height?: number;
  rotate?: number;
  flip?: boolean;
}) {
  const petal = bloomColor ?? color;
  return (
    <svg
      viewBox="0 0 120 300"
      width={height * 0.4}
      height={height}
      fill="none"
      style={{
        transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`,
        transformOrigin: "50% 100%",
        overflow: "visible",
      }}
      aria-hidden
    >
      <path
        d="M60 300 C58 230 62 190 58 140 C55 100 60 60 60 30"
        stroke="color-mix(in oklab, var(--violet-4) 70%, var(--night))"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="320"
        strokeDashoffset="320"
        style={{ animation: `draw 1800ms ease-out ${delay}ms forwards` }}
      />
      {[
        { d: "M59 220 C36 210 28 190 30 172 C50 174 58 196 59 220Z", t: 500 },
        { d: "M61 178 C84 168 92 148 90 130 C70 132 62 154 61 178Z", t: 750 },
        { d: "M59 138 C40 130 33 112 35 96 C52 99 58 118 59 138Z", t: 950 },
      ].map((leaf, i) => (
        <path
          key={i}
          d={leaf.d}
          fill="color-mix(in oklab, var(--violet-4) 55%, var(--night))"
          opacity="0"
          style={{
            animation: `bloom-in 900ms cubic-bezier(.22,1,.36,1) ${delay + leaf.t}ms forwards`,
            transformOrigin: "59px 200px",
          }}
        />
      ))}
      <g
        opacity="0"
        style={{
          transformOrigin: "60px 30px",
          animation: `bloom-in 1200ms cubic-bezier(.22,1,.36,1) ${delay + 1100}ms forwards`,
        }}
      >
        {Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <ellipse
              key={i}
              cx={60 + Math.cos(a) * 17}
              cy={30 + Math.sin(a) * 17}
              rx="13"
              ry="9"
              fill={petal}
              opacity="0.88"
              transform={`rotate(${(a * 180) / Math.PI} ${60 + Math.cos(a) * 17} ${30 + Math.sin(a) * 17})`}
            />
          );
        })}
        <circle cx="60" cy="30" r="9" fill="var(--cream)" opacity="0.9" />
        <circle cx="60" cy="30" r="4.5" fill="color-mix(in oklab, var(--wine) 70%, var(--cream))" />
      </g>
    </svg>
  );
}

export function SprigLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 30" className={className} fill="none" aria-hidden>
      <path
        d="M10 15 H190"
        stroke="color-mix(in oklab, var(--violet-2) 60%, transparent)"
        strokeWidth="1"
      />
      <circle cx="100" cy="15" r="4" fill="var(--violet-2)" opacity="0.8" />
      <circle cx="86" cy="15" r="2" fill="var(--wine)" opacity="0.7" />
      <circle cx="114" cy="15" r="2" fill="var(--wine)" opacity="0.7" />
    </svg>
  );
}
