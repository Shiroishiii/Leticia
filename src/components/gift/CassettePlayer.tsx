import { useCallback, useEffect, useId, useRef, useState } from "react";
import partilharUrl from "@/assets/Music/Partilhar.mp3";

/** Coloque a música de vocês neste arquivo (mp3, wav ou m4a). */
export const MIXTAPE_SRC = partilharUrl;
export const MIXTAPE_TITLE = "Te amo minha princesa";
export const MIXTAPE_SIDE = "A";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function CassetteWindow({ playing, progress }: { playing: boolean; progress: number }) {
  const leftR = 11 + (1 - progress) * 15;
  const rightR = 11 + progress * 15;
  const leftSpin = `${(1.15 + progress * 1.35).toFixed(2)}s`;
  const rightSpin = `${(2.5 - progress * 1.35).toFixed(2)}s`;

  return (
    <svg viewBox="0 0 280 176" className="block h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="cassette-shell" x1="18" y1="14" x2="258" y2="166" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--violet-2)" />
          <stop offset="0.48" stopColor="var(--violet-4)" />
          <stop offset="1" stopColor="var(--wine-deep)" />
        </linearGradient>
        <linearGradient id="cassette-label" x1="36" y1="24" x2="244" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--cream)" />
          <stop offset="1" stopColor="color-mix(in oklab, var(--paper) 78%, var(--lavender))" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="264" height="160" rx="14" fill="color-mix(in oklab, var(--violet-4) 72%, var(--night))" />
      <rect
        x="14"
        y="14"
        width="252"
        height="148"
        rx="10"
        fill="url(#cassette-shell)"
      />
      <path d="M21 31 L259 31" stroke="color-mix(in oklab, white 28%, transparent)" strokeWidth="1.2" />
      {[
        [28, 28],
        [252, 28],
        [28, 148],
        [252, 148],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" fill="color-mix(in oklab, var(--cream) 35%, var(--violet-4))" />
      ))}

      <rect x="36" y="24" width="208" height="52" rx="3" fill="url(#cassette-label)" />
      <path d="M43 29 H237 M43 71 H237" stroke="color-mix(in oklab, var(--wine) 20%, transparent)" strokeWidth="1" />
      <rect
        x="36"
        y="24"
        width="208"
        height="52"
        rx="3"
        fill="none"
        stroke="color-mix(in oklab, var(--wine) 28%, transparent)"
        strokeWidth="1.2"
      />
      <text
        x="140"
        y="46"
        textAnchor="middle"
        fill="var(--wine)"
        style={{ fontFamily: "var(--font-hand)", fontSize: 22 }}
      >
        {MIXTAPE_TITLE}
      </text>
      <text
        x="140"
        y="66"
        textAnchor="middle"
        fill="color-mix(in oklab, var(--violet-4) 70%, var(--wine))"
        style={{ fontFamily: "var(--font-stamp)", fontSize: 8, letterSpacing: 2.4 }}
      >
        Partilhar · Rubel, ANAVITORIA
      </text>

      <rect x="48" y="86" width="184" height="62" rx="6" fill="color-mix(in oklab, var(--night) 82%, var(--violet-4))" />
      <rect
        x="52"
        y="90"
        width="176"
        height="54"
        rx="4"
        fill="color-mix(in oklab, var(--night-deep) 70%, var(--violet-1))"
      />

      <g className={playing ? "cassette-equalizer is-playing" : "cassette-equalizer"}>
        {[0, 1, 2, 3, 4].map((bar) => (
          <rect
            key={bar}
            className="cassette-bar"
            x={129 + bar * 4}
            y="95"
            width="2"
            height="8"
            rx="1"
            fill="var(--violet-2)"
            style={{ animationDelay: `${bar * 90}ms` }}
          />
        ))}
      </g>

      <circle cx="92" cy="117" r={leftR} fill="color-mix(in oklab, var(--wine) 45%, var(--violet-4))" />
      <circle cx="188" cy="117" r={rightR} fill="color-mix(in oklab, var(--wine) 45%, var(--violet-4))" />

      <g
        className={playing ? "cassette-reel is-playing" : "cassette-reel"}
        style={{ animationDuration: leftSpin, transformOrigin: "92px 117px" }}
      >
        <circle cx="92" cy="117" r="13" fill="color-mix(in oklab, var(--cream) 82%, var(--paper))" />
        <circle cx="92" cy="117" r="5" fill="var(--wine-deep)" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect
            key={deg}
            x="91"
            y="106"
            width="2"
            height="8"
            rx="0.5"
            fill="var(--wine)"
            transform={`rotate(${deg} 92 117)`}
          />
        ))}
      </g>
      <g
        className={playing ? "cassette-reel cassette-reel-reverse is-playing" : "cassette-reel cassette-reel-reverse"}
        style={{ animationDuration: rightSpin, transformOrigin: "188px 117px" }}
      >
        <circle cx="188" cy="117" r="13" fill="color-mix(in oklab, var(--cream) 82%, var(--paper))" />
        <circle cx="188" cy="117" r="5" fill="var(--wine-deep)" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect
            key={deg}
            x="187"
            y="106"
            width="2"
            height="8"
            rx="0.5"
            fill="var(--wine)"
            transform={`rotate(${deg} 188 117)`}
          />
        ))}
      </g>

      <path
        d={`M${92 + leftR * 0.72} 132 Q 140 148  ${188 - rightR * 0.72} 132`}
        fill="none"
        stroke="color-mix(in oklab, var(--wine) 55%, var(--violet-3))"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CassettePlayer({ src = MIXTAPE_SRC }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(false);
  const labelId = useId();

  const sync = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    const d = el.duration;
    const t = el.currentTime;
    setCurrent(t);
    setDuration(Number.isFinite(d) ? d : 0);
    setProgress(d > 0 ? Math.min(1, t / d) : 0);
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setProgress(1);
    };
    const onReady = () => {
      setReady(true);
      setMissing(false);
      sync();
    };
    const onError = () => {
      setReady(false);
      setMissing(true);
      setPlaying(false);
    };

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("timeupdate", sync);
    el.addEventListener("loadedmetadata", onReady);
    el.addEventListener("canplay", onReady);
    el.addEventListener("error", onError);

    el.load();

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("timeupdate", sync);
      el.removeEventListener("loadedmetadata", onReady);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("error", onError);
    };
  }, [src, sync]);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el || missing) return;
    if (el.paused) {
      try {
        await el.play();
      } catch {
        setPlaying(false);
      }
    } else {
      el.pause();
    }
  };

  const stop = () => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setProgress(0);
    setCurrent(0);
  };

  const seek = (value: number) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    el.currentTime = value * duration;
    sync();
  };

  return (
    <div className="flex w-full flex-col items-center">
      <audio ref={audioRef} src={src} preload="metadata" playsInline />

      <div
        className={`walkman relative w-full max-w-[min(100%,22rem)] px-3 pb-4 pt-3 ${playing ? "is-playing" : ""}`}
        style={{
          background:
            "linear-gradient(165deg, color-mix(in oklab, var(--cream) 88%, var(--lavender)), color-mix(in oklab, var(--paper) 82%, var(--violet-3)))",
          boxShadow: "var(--shadow-paper), inset 0 1px 0 color-mix(in oklab, white 55%, transparent)",
          transform: "rotate(-1.1deg)",
        }}
      >
        <div aria-hidden className="paper-grain pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mb-2 flex items-center justify-between px-1">
          <span
            className="text-[9px] uppercase tracking-[0.28em]"
            style={{ fontFamily: "var(--font-stamp)", color: "var(--wine)" }}
          >
            toca-fitas
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-stamp)", color: "var(--wine-deep)" }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: playing ? "var(--violet-2)" : "color-mix(in oklab, var(--wine) 35%, var(--paper))",
                boxShadow: playing ? "0 0 10px var(--violet-2)" : undefined,
              }}
            />
            {playing ? "tocando" : "pausado"}
          </span>
        </div>

        <div
          className={`cassette-deck relative overflow-hidden ${playing ? "is-playing" : ""}`}
          style={{
            background: "color-mix(in oklab, var(--night) 18%, var(--violet-4))",
            boxShadow: "inset 0 8px 18px oklch(0.15 0.05 275 / .45)",
          }}
        >
          <CassetteWindow playing={playing} progress={progress} />
        </div>

        <div className="relative mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={stop}
            aria-label="Parar e rebobinar"
            className="walkman-key grid h-11 w-11 shrink-0 place-items-center"
          >
            <span className="block h-3.5 w-3.5 rounded-[1px] bg-[var(--wine-deep)]" />
          </button>

          <button
            type="button"
            onClick={toggle}
            disabled={missing}
            aria-labelledby={labelId}
            className="walkman-key walkman-key-play relative flex min-h-11 flex-1 items-center justify-center gap-2 px-3"
          >
            {playing ? (
              <span className="flex gap-1" aria-hidden>
                <span className="block h-4 w-1.5 bg-[var(--cream)]" />
                <span className="block h-4 w-1.5 bg-[var(--cream)]" />
              </span>
            ) : (
              <span
                aria-hidden
                className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-[var(--cream)]"
              />
            )}
            <span id={labelId} className="text-[10px] uppercase tracking-[0.28em] text-[var(--cream)]">
              {missing ? "sem fita" : playing ? "pausar" : "play"}
            </span>
          </button>
        </div>

        <div className="relative mt-3">
          <input
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={progress}
            disabled={!ready || missing}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Posição da fita"
            className="tape-seek w-full"
          />
          <div
            className="mt-1 flex justify-between text-[10px] tabular-nums"
            style={{ fontFamily: "var(--font-stamp)", color: "var(--wine)" }}
          >
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="relative mt-2 flex justify-center gap-1" aria-hidden>
          <span className="walkman-detail" />
          <span className="walkman-detail walkman-detail-wide" />
          <span className="walkman-detail" />
        </div>
      </div>

      <p
        className="mt-4 text-center text-[1.15rem] leading-tight"
        style={{ fontFamily: "var(--font-hand)", color: "var(--lavender)" }}
      >
          Uma música para minha princesa · Partilhar
      </p>
      {missing ? (
        <p
          className="mt-1 max-w-xs text-center text-[11px] leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "color-mix(in oklab, var(--lavender) 70%, white)" }}
        >
          Coloque a música de vocês em <code>public/mixtape.wav</code> (ou .mp3, e ajuste o caminho).
        </p>
      ) : null}
    </div>
  );
}
