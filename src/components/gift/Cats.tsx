/** Os gatinhos — desenhados à mão em SVG. */
export function Cat({
  flip = false,
  delay = 0,
  width = 110,
  furColor = "color-mix(in oklab, #ffd1bd 76%, var(--cream))",
  innerEarColor = "color-mix(in oklab, #f27fa7 72%, var(--lavender))",
  eyesClosed = true,
}: {
  flip?: boolean;
  delay?: number;
  width?: number;
  furColor?: string;
  innerEarColor?: string;
  eyesClosed?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={width}
      fill="none"
      aria-hidden
      style={{
        transform: `scaleX(${flip ? -1 : 1})`,
        animation: `rise 1200ms cubic-bezier(.22,1,.36,1) ${delay}ms both, breathe 6s ease-in-out ${delay}ms infinite`,
      }}
    >
      {/* sombra */}
      <ellipse cx="60" cy="104" rx="34" ry="8" fill="color-mix(in oklab, var(--violet-4) 55%, transparent)" opacity="0.5" />

      {/* rabo */}
      <path
        d="M92 100 C106 94 106 78 94 76 C84 74 80 84 84 92"
        stroke={furColor}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* corpo */}
      <path
        d="M32 102 C26 74 40 54 60 54 C80 54 94 74 88 102 Z"
        fill={furColor}
      />

      {/* patinhas dianteiras */}
      <ellipse cx="46" cy="100" rx="7" ry="6" fill={furColor} />
      <ellipse cx="74" cy="100" rx="7" ry="6" fill={furColor} />

      {/* cabeça */}
      <circle cx="60" cy="44" r="25" fill={furColor} />

      {/* orelhas */}
      <path d="M38 30 L35 10 L54 24 Z" fill={furColor} />
      <path d="M82 30 L85 10 L66 24 Z" fill={furColor} />
      <path d="M41 27 L40 16 L51 24 Z" fill={innerEarColor} />
      <path d="M79 27 L80 16 L69 24 Z" fill={innerEarColor} />

      {/* olhos */}
      {eyesClosed ? (
        <>
          <path d="M47 44 q4 5 8 0" stroke="var(--wine-deep)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M65 44 q4 5 8 0" stroke="var(--wine-deep)" strokeWidth="2.4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="51" cy="44" r="3.2" fill="var(--wine-deep)" />
          <circle cx="69" cy="44" r="3.2" fill="var(--wine-deep)" />
        </>
      )}

      {/* nariz + boca */}
      <path d="M57 52 h6 l-3 3 z" fill="var(--wine)" />
      <path d="M60 55 q-5 5 -10 2 M60 55 q5 5 10 2" stroke="var(--wine-deep)" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />

      {/* bigodes */}
      <g stroke="var(--wine-deep)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
        <path d="M34 48 h-14 M35 53 h-13" />
        <path d="M86 48 h14 M85 53 h13" />
      </g>
    </svg>
  );
}
