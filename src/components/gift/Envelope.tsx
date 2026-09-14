import { useState } from "react";

import { PaperScrap, Stamp, Tape } from "./Paper";

const FLAP_MS = 1000;
const SLIDE_MS = 650;
const UNFOLD_MS = 850;
const BUFFER_MS = 300;

type Stage = "idle" | "flap" | "slide" | "unfold" | "done";

/** Momento 1 — envelope colado no caderno, lacre e carimbo. */
export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [stage, setStage] = useState<Stage>("idle");

  const open = () => {
    if (stage !== "idle") return;
    setStage("flap");
    window.setTimeout(() => setStage("slide"), FLAP_MS);
    window.setTimeout(() => setStage("unfold"), FLAP_MS + SLIDE_MS);
    window.setTimeout(
      () => {
        setStage("done");
        onOpen();
      },
      FLAP_MS + SLIDE_MS + UNFOLD_MS + BUFFER_MS,
    );
  };

  const isIdle = stage === "idle";
  const flapOpen = stage !== "idle";
  const slidOut = stage === "slide" || stage === "unfold" || stage === "done";
  const unfolded = stage === "unfold" || stage === "done";
  const letterOffset = unfolded ? -128 : slidOut ? 0 : 132;

  return (
    <div className="relative flex w-full max-w-[28rem] flex-col items-center px-4">
      <PaperScrap
        rotate={-6}
        tone="lavender"
        className="absolute -left-2 top-8 hidden h-28 w-24 sm:block"
      />
      <PaperScrap rotate={7} tone="kraft" className="absolute -right-3 top-16 h-20 w-16 opacity-80" />

      <div className="relative" style={{ animation: "rise 900ms cubic-bezier(.22,1,.36,1) both" }}>
        <Tape className="-left-3 -top-2" rotate={-18} width={108} />
        <Tape className="-right-4 top-2" rotate={14} width={86} tone="wine" />
        <Stamp className="-right-1 -top-7 sm:-right-6" rotate={12} />

        <button
          type="button"
          onClick={open}
          aria-label="Abrir o presente"
          className="group relative min-h-11 cursor-pointer bg-transparent"
          style={{
            animation: isIdle ? "breathe 7s ease-in-out infinite" : undefined,
            transform: flapOpen && !slidOut ? "scale(1.04)" : undefined,
            transition: "transform 1200ms cubic-bezier(.22,1,.36,1)",
          }}
        >
          <svg
            viewBox="0 0 320 230"
            className="h-auto w-[min(86vw,22rem)]"
            fill="none"
            style={{ filter: "drop-shadow(0 24px 40px oklch(0.12 0.05 275 / .7))", overflow: "visible" }}
          >
            {/* corpo de trás do envelope */}
            <path
              d="M18 48 L302 48 L310 214 L12 208 Z"
              fill="color-mix(in oklab, var(--paper) 82%, var(--lavender))"
            />
            <path
              d="M18 48 L160 138 L302 48"
              stroke="color-mix(in oklab, var(--violet-4) 35%, transparent)"
              strokeWidth="1.4"
            />

            {/* carta: desliza pra fora e depois se desdobra ao meio */}
            <g
              style={{
                transform: `translateY(${letterOffset}px)`,
                transition: `transform ${unfolded ? UNFOLD_MS : SLIDE_MS}ms cubic-bezier(.22,1,.36,1)`,
              }}
            >
              {/* metade de cima, sempre visível assim que sai do envelope */}
              <rect
                x="64"
                y="-6"
                width="192"
                height="86"
                rx="3"
                fill="color-mix(in oklab, #ffd3e1 72%, var(--lavender))"
                stroke="color-mix(in oklab, var(--wine) 64%, var(--violet-4))"
                strokeWidth="1.8"
              />
              <line x1="86" y1="18" x2="234" y2="18" stroke="var(--wine)" strokeWidth="1.6" opacity="0.42" />
              <line x1="86" y1="32" x2="220" y2="32" stroke="var(--wine)" strokeWidth="1.6" opacity="0.36" />
              <line x1="86" y1="46" x2="228" y2="46" stroke="var(--wine)" strokeWidth="1.6" opacity="0.3" />

              {/* metade de baixo, dobrada por baixo até o momento de desdobrar */}
              <g
                style={{
                  transformOrigin: "160px 80px",
                  transform: `scaleY(${unfolded ? 1 : 0.02})`,
                  transition: `transform ${UNFOLD_MS}ms cubic-bezier(.16,1,.3,1)`,
                }}
              >
                <rect
                  x="64"
                  y="80"
                  width="192"
                  height="86"
                  rx="3"
                  fill="color-mix(in oklab, #f29bc1 58%, var(--lavender))"
                  stroke="color-mix(in oklab, var(--wine) 68%, var(--violet-4))"
                  strokeWidth="1.8"
                />
                <line x1="86" y1="102" x2="230" y2="102" stroke="var(--wine-deep)" strokeWidth="1.6" opacity="0.42" />
                <line x1="86" y1="116" x2="216" y2="116" stroke="var(--wine-deep)" strokeWidth="1.6" opacity="0.36" />
                <line x1="86" y1="130" x2="196" y2="130" stroke="var(--wine-deep)" strokeWidth="1.6" opacity="0.3" />
              </g>

              {/* sombra da dobra, some quando totalmente desdobrada */}
              <rect
                x="64"
                y="77"
                width="192"
                height="6"
                fill="color-mix(in oklab, var(--night) 30%, transparent)"
                opacity={unfolded ? 0 : 0.5}
                style={{ transition: `opacity ${UNFOLD_MS}ms ease` }}
              />
            </g>

            {/* frente inteira do envelope: mantém a carta escondida até ela passar pela abertura */}
            <path
              d="M18 48 L302 48 L310 214 L12 208 Z"
              fill="color-mix(in oklab, var(--paper) 88%, var(--violet-3))"
            />
            <path
              d="M18 214 L160 122 L302 214"
              fill="none"
              stroke="color-mix(in oklab, var(--violet-4) 38%, transparent)"
              strokeWidth="1.4"
            />
            <path
              d="M18 48 L160 138 L302 48"
              fill="none"
              stroke="color-mix(in oklab, var(--violet-4) 24%, transparent)"
              strokeWidth="1.2"
            />

            {/* aba, abre e revela a carta por baixo */}
            <g
              style={{
                transformOrigin: "160px 50px",
                transform: flapOpen ? "translate(-16px, -52px) rotate(-12deg)" : "translate(0, 0) rotate(0deg)",
                transition: `transform ${FLAP_MS}ms cubic-bezier(.65,0,.35,1)`,
                filter: flapOpen ? "drop-shadow(0 12px 8px oklch(0.12 0.05 275 / .32))" : undefined,
              }}
            >
              <path
                d="M18 50 L160 148 L302 50 Q302 40 290 40 L30 40 Q18 40 18 50 Z"
                fill="color-mix(in oklab, var(--cream) 90%, var(--violet-2))"
              />
            </g>

            <g style={{ opacity: isIdle ? 1 : 0, transition: "opacity 400ms ease" }}>
              <circle cx="160" cy="136" r="28" fill="var(--wine)" />
              <circle
                cx="160"
                cy="136"
                r="20"
                fill="none"
                stroke="color-mix(in oklab, var(--cream) 50%, transparent)"
                strokeWidth="1.2"
              />
              <path
                d="M160 146 C150 138 146 132 150 127 C153 123 159 125 160 129 C161 125 167 123 170 127 C174 132 170 138 160 146Z"
                fill="color-mix(in oklab, var(--cream) 80%, var(--wine))"
              />
            </g>
            <text
              x="160"
              y="188"
              textAnchor="middle"
              fill="var(--violet-4)"
              fontSize="13"
              letterSpacing="4"
              fontFamily="Karla, sans-serif"
              opacity={isIdle ? 0.7 : 0}
            >
              PARA LETÍCIA, COM AMOR
            </text>
          </svg>
        </button>
      </div>

      <p
        className="mt-6 text-center text-[1.35rem]"
        style={{
          fontFamily: "var(--font-hand)",
          color: "var(--lavender)",
          opacity: isIdle ? 0.9 : 0,
          transition: "opacity 500ms ease",
        }}
      >
        toque o lacre
      </p>
    </div>
  );
}
