import { CassettePlayer } from "./CassettePlayer";
import { Cat } from "./Cats";
import { PaperScrap, SceneButton, Tape } from "./Paper";

/** Momento final — álbum aberto, mixtape no toca-fitas. */
export function Finale({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="relative flex w-full max-w-136 flex-col items-center px-3 sm:px-6">
      <PaperScrap
        rotate={-7}
        tone="lavender"
        className="absolute left-0 top-8 hidden h-28 w-20 sm:block"
      />
      <PaperScrap rotate={8} tone="kraft" className="absolute right-1 top-24 h-16 w-14 opacity-80" />

      <div className="relative z-10 w-full" style={{ animation: "rise 1000ms cubic-bezier(.22,1,.36,1) both" }}>
        <Tape className="left-2 -top-2" rotate={-11} width={100} />
        <Tape className="right-3 top-0" rotate={9} width={84} tone="cream" />

        <CassettePlayer />

        <div className="mt-5 flex items-end justify-center gap-1">
          <Cat delay={300} width={68} />
          <Cat flip delay={520} width={68} />
        </div>

        <h2
          className="mt-5 text-center text-[clamp(1.35rem,6vw,2.15rem)] leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--cream)",
            textShadow: "0 8px 24px oklch(0.12 0.05 275 / .55)",
          }}
        >
          Que a gente continue
          <br />
          <span style={{ fontFamily: "var(--font-hand)", color: "var(--lavender)" }}>
            colecionando momentos assim.
          </span>
        </h2>

        <p
          className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            color: "color-mix(in oklab, var(--lavender) 80%, white)",
          }}
        >
          Este presente fica aqui, sempre aberto, sempre seu.
        </p>
      </div>

      <SceneButton onClick={onRestart} delay={1400}>
        viver de novo
      </SceneButton>
    </div>
  );
}
