import type { CSSProperties, ReactNode } from "react";

type TapeTone = "violet" | "cream" | "wine" | "clear";

/** Fita washi de colagem. */
export function Tape({
  className = "",
  rotate = -6,
  width = 90,
  tone = "violet",
  style,
}: {
  className?: string;
  rotate?: number;
  width?: number;
  tone?: TapeTone;
  style?: CSSProperties;
}) {
  const fills: Record<TapeTone, string> = {
    violet:
      "repeating-linear-gradient(90deg, color-mix(in oklab, var(--violet-2) 62%, var(--cream)) 0 7px, color-mix(in oklab, var(--lavender) 78%, white) 7px 14px)",
    cream:
      "repeating-linear-gradient(115deg, color-mix(in oklab, var(--cream) 88%, var(--paper)) 0 10px, color-mix(in oklab, var(--paper) 70%, var(--violet-3)) 10px 12px)",
    wine: "repeating-linear-gradient(90deg, color-mix(in oklab, var(--wine) 55%, var(--violet-1)) 0 6px, color-mix(in oklab, var(--lavender) 50%, var(--wine)) 6px 12px)",
    clear:
      "linear-gradient(180deg, color-mix(in oklab, var(--cream) 45%, transparent), color-mix(in oklab, var(--violet-3) 28%, transparent))",
  };

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 block ${className}`}
      style={{
        width,
        height: 22,
        transform: `rotate(${rotate}deg)`,
        background: fills[tone],
        opacity: tone === "clear" ? 0.55 : 0.82,
        boxShadow: "0 4px 10px -6px oklch(0.15 0.05 275 / .7)",
        ...style,
      }}
    />
  );
}

/** Pedaço de papel rasgado, base das colagens. */
export function PaperScrap({
  children,
  rotate = 0,
  className = "",
  tone = "cream",
  lined = false,
  torn = true,
  style,
}: {
  children?: ReactNode;
  rotate?: number;
  className?: string;
  tone?: "cream" | "paper" | "lavender" | "kraft";
  lined?: boolean;
  torn?: boolean;
  style?: CSSProperties;
}) {
  const bg =
    tone === "paper"
      ? "linear-gradient(158deg, var(--paper), color-mix(in oklab, var(--paper) 78%, var(--lavender)))"
      : tone === "lavender"
        ? "linear-gradient(158deg, color-mix(in oklab, var(--lavender) 72%, var(--cream)), var(--lavender))"
        : tone === "kraft"
          ? "linear-gradient(158deg, color-mix(in oklab, var(--paper) 70%, var(--wine)), color-mix(in oklab, var(--paper) 55%, var(--violet-4)))"
          : "linear-gradient(158deg, var(--cream), var(--paper))";

  return (
    <div
      className={`relative ${className}`}
      style={{
        background: bg,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "var(--shadow-paper)",
        clipPath: torn
          ? "polygon(1.2% 2.4%, 18% 0.2%, 41% 2.8%, 63% 0%, 86% 2.2%, 99.2% 1.6%, 100% 22%, 98.4% 48%, 100% 73%, 98.6% 97.4%, 78% 99.4%, 54% 97.2%, 29% 100%, 2.2% 98.2%, 0% 76%, 1.8% 49%, 0% 23%)"
          : undefined,
        borderRadius: torn ? undefined : "0.25rem 0.4rem 0.3rem 0.45rem",
        ...style,
      }}
    >
      <div
        aria-hidden
        className="paper-grain pointer-events-none absolute inset-0"
      />
      {lined && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent 0 27px, color-mix(in oklab, var(--violet-3) 38%, transparent) 27px 28px)",
            backgroundPosition: "0 18px",
            maskImage: "linear-gradient(180deg, transparent 8%, #000 18%, #000 92%, transparent)",
          }}
        />
      )}
      {children}
    </div>
  );
}

/** Polaroid sem clip-path — moldura reta para fotos. */
export function Polaroid({
  children,
  caption,
  className = "",
  rotate = 0,
}: {
  children?: ReactNode;
  caption?: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <figure
      className={`relative bg-[var(--cream)] px-3 pb-4 pt-3 shadow-[var(--shadow-paper)] ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative overflow-hidden bg-[color-mix(in_oklab,var(--night)_88%,var(--violet-4))]">
        {children}
      </div>
      {caption ? (
        <figcaption
          className="relative mt-3 text-center text-[1.15rem] leading-tight"
          style={{ fontFamily: "var(--font-hand)", color: "var(--wine)" }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Carimbo de correio. */
export function Stamp({ className = "", rotate = 8 }: { className?: string; rotate?: number }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-10 grid h-[4.4rem] w-[3.5rem] place-items-center border-[3px] border-dashed ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        borderColor: "color-mix(in oklab, var(--violet-1) 70%, var(--wine))",
        background:
          "linear-gradient(160deg, color-mix(in oklab, var(--lavender) 55%, var(--cream)), color-mix(in oklab, var(--violet-3) 45%, var(--cream)))",
        fontFamily: "var(--font-stamp)",
        color: "var(--violet-4)",
        boxShadow: "2px 3px 0 color-mix(in oklab, var(--wine) 25%, transparent)",
      }}
    >
      <span className="text-center text-[0.62rem] leading-tight tracking-wider">
        TE
        <br />
        AMO
      </span>
    </div>
  );
}

export function SceneButton({
  children,
  onClick,
  delay = 0,
  invert = false,
}: {
  children: ReactNode;
  onClick: () => void;
  delay?: number;
  invert?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="scene-btn relative z-10 mt-6 min-h-11 px-5 py-3 text-[11px] uppercase tracking-[0.28em] sm:mt-8"
      style={{
        fontFamily: "var(--font-body)",
        color: invert ? "var(--wine-deep)" : "var(--lavender)",
        background: invert
          ? "color-mix(in oklab, var(--cream) 82%, var(--lavender))"
          : "color-mix(in oklab, var(--violet-4) 42%, transparent)",
        animation: delay ? `rise 900ms ease ${delay}ms both` : undefined,
      }}
    >
      {children}
    </button>
  );
}
