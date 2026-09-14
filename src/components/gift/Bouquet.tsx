import bouquetUrl from "@/assets/bouquet.png";

import { Cat } from "./Cats";
import { Polaroid, SceneButton, Tape } from "./Paper";

/** Momento 3 — polaroid colada no álbum. */
export function Bouquet({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative flex w-full max-w-[28rem] flex-col items-center px-3 sm:max-w-[32rem] sm:px-6">
      <p
        className="mb-4 text-center text-[10px] uppercase tracking-[0.4em] sm:mb-6 sm:text-[11px]"
        style={{
          color: "var(--lavender)",
          fontFamily: "var(--font-stamp)",
          animation: "rise 900ms ease 120ms both",
        }}
      >
        Tulipas para você pois são as suas flores favoritas, e também porque você merece.
      </p>

      <div className="relative w-full" style={{ animation: "rise 1100ms cubic-bezier(.22,1,.36,1) 200ms both" }}>
        <Tape className="left-4 -top-2" rotate={-14} width={110} />
        <Tape className="right-6 -top-1" rotate={10} width={88} tone="wine" />

        <Polaroid caption="Flores para minha princesa" className="mx-auto max-w-[18rem] sm:max-w-[20rem]">
          <img
            src={bouquetUrl}
            alt="Buquê de tulipas roxas e rosas azuis embrulhado em papel jornal com fita roxa"
            className="mx-auto block h-auto w-full max-w-[18rem] select-none sm:max-w-[20rem]"
            draggable={false}
          />
        </Polaroid>

        <div className="mt-1 flex items-end justify-between px-2 sm:px-4">
          <Cat delay={700} width={72} />
          <Cat flip delay={950} width={72} />
        </div>
      </div>

      <SceneButton onClick={onNext} delay={1600}>
        continuar
      </SceneButton>
    </div>
  );
}
