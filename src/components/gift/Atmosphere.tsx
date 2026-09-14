import { useEffect, useState } from "react";

import heartCatsUrl from "@/assets/GatinCore.png";
import flowerCatUrl from "@/assets/gatinFlor.png";
import photoStripUrl from "@/assets/gatinhosFotos.png";
import nightCatsUrl from "@/assets/gatinhosFundoCarta.png";
import nerdCatUrl from "@/assets/gatoNerd.png";

type Mote = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  dx: string;
  opacity: number;
};

type Scrap = {
  id: number;
  left: number;
  top: number;
  w: number;
  h: number;
  rotate: number;
  tone: number;
};

const collagePhotos = [
  { src: heartCatsUrl, className: "collage-heart", rotate: -11, tape: "lavender" },
  { src: flowerCatUrl, className: "collage-flower", rotate: 9, tape: "pink" },
  { src: photoStripUrl, className: "collage-strip", rotate: -5, tape: "cream" },
  { src: nightCatsUrl, className: "collage-night", rotate: 5, tape: "violet" },
  { src: nerdCatUrl, className: "collage-nerd", rotate: -8, tape: "pink" },
];

/** Mesa de colagem: papel, washi e poeira roxa. */
export function Atmosphere({ intensity = 1 }: { intensity?: number }) {
  const [motes, setMotes] = useState<Mote[]>([]);
  const [scraps, setScraps] = useState<Scrap[]>([]);

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 640px)").matches;
    setMotes(
      Array.from({ length: compact ? 18 : 36 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 4,
        delay: Math.random() * 22,
        duration: 20 + Math.random() * 26,
        dx: `${(Math.random() - 0.5) * 160}px`,
        opacity: 0.22 + Math.random() * 0.45,
      })),
    );
    setScraps(
      Array.from({ length: compact ? 5 : 9 }, (_, i) => ({
        id: i,
        left: (i * 19 + 4) % 92,
        top: (i * 27 + 8) % 86,
        w: 42 + ((i * 17) % 70),
        h: 28 + ((i * 11) % 48),
        rotate: -18 + ((i * 13) % 36),
        tone: i % 3,
      })),
    );
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ opacity: intensity }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 115%, color-mix(in oklab, var(--violet-4) 60%, transparent) 0%, transparent 55%), radial-gradient(80% 60% at 10% 0%, color-mix(in oklab, var(--violet-1) 28%, transparent) 0%, transparent 50%), linear-gradient(180deg, var(--night-deep) 0%, var(--night) 58%, var(--night-deep) 100%)",
        }}
      />
      <div
        className="absolute -inset-1/4 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--violet-2) 28%, transparent), transparent)",
          animation: "aurora 26s ease-in-out infinite",
        }}
      />
      <div className="paper-grain absolute inset-0 opacity-30 mix-blend-overlay" />

      <div className="cat-collage" aria-hidden>
        {collagePhotos.map((photo) => (
          <figure
            key={photo.className}
            className={`collage-photo ${photo.className}`}
            style={{ transform: `rotate(${photo.rotate}deg)` }}
          >
            <span className={`collage-tape collage-tape-${photo.tape}`} />
            <img src={photo.src} alt="" draggable={false} />
          </figure>
        ))}
      </div>

      {scraps.map((s) => (
        <span
          key={s.id}
          className="absolute opacity-[0.14]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.w,
            height: s.h,
            transform: `rotate(${s.rotate}deg)`,
            background:
              s.tone === 0
                ? "var(--paper)"
                : s.tone === 1
                  ? "color-mix(in oklab, var(--lavender) 70%, var(--cream))"
                  : "color-mix(in oklab, var(--violet-3) 55%, var(--paper))",
            clipPath:
              "polygon(2% 4%, 40% 0%, 97% 3%, 100% 60%, 96% 98%, 50% 100%, 1% 96%, 0% 40%)",
          }}
        />
      ))}

      <span
        className="absolute left-[-8%] top-[18%] h-7 w-[46%] opacity-25"
        style={{
          transform: "rotate(-8deg)",
          background:
            "repeating-linear-gradient(90deg, color-mix(in oklab, var(--violet-2) 70%, transparent) 0 10px, color-mix(in oklab, var(--lavender) 50%, transparent) 10px 20px)",
        }}
      />
      <span
        className="absolute bottom-[14%] right-[-10%] h-6 w-[40%] opacity-20"
        style={{
          transform: "rotate(12deg)",
          background:
            "repeating-linear-gradient(90deg, color-mix(in oklab, var(--wine) 55%, var(--violet-1)) 0 8px, transparent 8px 16px)",
        }}
      />

      {motes.map((m) => (
        <span
          key={m.id}
          className="absolute bottom-[-8vh] rounded-full"
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            background:
              "radial-gradient(circle, var(--cream) 0%, color-mix(in oklab, var(--violet-3) 70%, transparent) 60%, transparent 70%)",
            ["--dx" as string]: m.dx,
            animation: `drift ${m.duration}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
