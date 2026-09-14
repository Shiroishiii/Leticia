import { useCallback, useState } from "react";

import { Atmosphere } from "@/components/gift/Atmosphere";
import { Envelope } from "@/components/gift/Envelope";
import { Letter } from "@/components/gift/Letter";
import { Bouquet } from "@/components/gift/Bouquet";
import { Finale } from "@/components/gift/Finale";

type Stage = "gift" | "letter" | "bouquet" | "finale";

const ORDER: Stage[] = ["gift", "letter", "bouquet", "finale"];

export default function App() {
  const [stage, setStage] = useState<Stage>("gift");
  const [visible, setVisible] = useState(true);

  const go = useCallback((next: Stage) => {
    setVisible(false);
    window.setTimeout(() => {
      setStage(next);
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 520);
  }, []);

  const index = ORDER.indexOf(stage);

  return (
    <main className="app-shell relative w-full">
      <Atmosphere intensity={stage === "letter" ? 0.8 : 1} />

      <div
        className="scene-fade relative z-10 my-auto flex w-full items-center justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        {stage === "gift" && <Envelope onOpen={() => go("letter")} />}
        {stage === "letter" && <Letter onNext={() => go("bouquet")} />}
        {stage === "bouquet" && <Bouquet onNext={() => go("finale")} />}
        {stage === "finale" && <Finale onRestart={() => go("gift")} />}
      </div>

      <div
        className="pointer-events-none fixed left-1/2 z-20 flex -translate-x-1/2 gap-2.5"
        style={{ bottom: "max(1.1rem, calc(env(safe-area-inset-bottom) + 0.7rem))" }}
        aria-hidden
      >
        {ORDER.map((s, i) => (
          <span
            key={s}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === index ? 28 : 7,
              background:
                i === index
                  ? "var(--violet-3)"
                  : "color-mix(in oklab, var(--lavender) 30%, transparent)",
            }}
          />
        ))}
      </div>
    </main>
  );
}
