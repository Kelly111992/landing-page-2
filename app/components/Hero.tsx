"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    id: 0,
    bg: "/lifestyle/hero-product.jpg",
    eyebrow: "El primer Protein Water · México",
    headline: ["Proteína", "clara,", "sin pesadez."],
    sub: "20 g de proteína aislada · 500 ml · Sin azúcar ni espesantes.",
    accent: "limonada" as const,
  },
  {
    id: 1,
    bg: "/lifestyle/hero-runner-wide.jpg",
    eyebrow: "Para quién lo da todo",
    headline: ["Tu rutina,", "sin interrupciones."],
    sub: "Lista para tomar. Sin preparar. Sin mezclar. Sin excusas.",
    accent: "blueberry" as const,
  },
  {
    id: 2,
    bg: "/lifestyle/hero-carlos-gym.jpg",
    eyebrow: "Post-entreno, limpio y ligero",
    headline: ["Disponible", "ahora."],
    sub: "Recuperación real con proteína que el cuerpo absorbe fácil.",
    accent: "blueberry" as const,
  },
  {
    id: 3,
    bg: "/lifestyle/hero-desk.jpg",
    eyebrow: "H2PRO · Clear Protein · Ed. 01",
    headline: ["Proteína para", "todos los días."],
    sub: "No solo post-gym. También en la oficina, el café, el camino.",
    accent: "limonada" as const,
  },
];

const INTERVAL = 6000;

const EASE_CINEMA = [0.76, 0, 0.24, 1] as const;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > current ? 1 : -1));
      setCurrent(index);
      setProgress(0);
    },
    [current]
  );

  const advance = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused || reduce) return;
    timerRef.current = setTimeout(advance, INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, advance, reduce]);

  // Progress bar fill
  useEffect(() => {
    if (paused || reduce) {
      setProgress(paused ? progress : 100);
      return;
    }
    setProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct >= 100 && progressRef.current) clearInterval(progressRef.current);
    }, 30);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, paused, reduce]);

  const slide = SLIDES[current];

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ─── Background image stack with Ken Burns zoom-out ─── */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.9, ease: "easeInOut" }}
        >
          {/* Ken Burns: starts scale(1.08), slowly pulls back to scale(1) */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.08 }}
            animate={{ scale: 1 }}
            transition={{
              duration: reduce ? 0 : INTERVAL / 1000 + 1,
              ease: "linear",
            }}
          >
            <Image
              src={slide.bg}
              alt=""
              fill
              priority={current === 0}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </motion.div>

          {/* Cinematic overlay: dark vignette from bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,14,18,0.92) 0%, rgba(10,14,18,0.55) 40%, rgba(10,14,18,0.28) 70%, rgba(10,14,18,0.15) 100%)",
            }}
          />
          {/* Left edge fade for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,14,18,0.65) 0%, rgba(10,14,18,0.2) 50%, transparent 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ─── Vertical spine label ─── */}
      <div
        aria-hidden
        className="hidden lg:block absolute top-1/2 left-5 z-20 pointer-events-none origin-center"
        style={{ transform: "translateY(-50%) rotate(-90deg)" }}
      >
        <span className="block whitespace-nowrap text-[0.58rem] tracking-[0.42em] uppercase text-paper/30 font-medium">
          H2PRO &nbsp;·&nbsp; Clear Protein &nbsp;·&nbsp; Ed. 01 &nbsp;·&nbsp; México 2026
        </span>
      </div>

      {/* ─── Slide counter top-right ─── */}
      <div className="absolute top-24 right-8 z-20 hidden md:flex items-center gap-2">
        <span className="text-paper/40 text-[0.62rem] tracking-[0.32em] uppercase tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ─── Main editorial content ─── */}
      <div className="relative z-20 min-h-[100svh] flex flex-col justify-end px-6 md:px-14 lg:px-20 pb-28 md:pb-32 pt-28">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`copy-${current}`}
            className="max-w-4xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{
              duration: reduce ? 0.2 : 0.75,
              ease: EASE_CINEMA,
              delay: reduce ? 0 : 0.25,
            }}
          >
            {/* Eyebrow */}
            <motion.span
              className="eyebrow text-paper/55 block mb-5"
              initial={reduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.35, duration: 0.6 }}
            >
              {slide.eyebrow}
            </motion.span>

            {/* Headline — massive display type */}
            <h1
              className="display text-paper leading-[0.88] mb-6"
              style={{ fontSize: "clamp(3.4rem, 10vw, 9rem)" }}
            >
              {slide.headline.map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={reduce ? {} : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.4 + i * 0.12,
                    duration: 0.7,
                    ease: EASE_CINEMA,
                  }}
                >
                  {i === slide.headline.length - 1 ? (
                    <span
                      className="editorial font-normal"
                      style={{
                        color:
                          slide.accent === "limonada"
                            ? "var(--color-limonada)"
                            : "var(--color-blueberry-deep)",
                        filter:
                          slide.accent === "limonada"
                            ? "none"
                            : "brightness(1.8)",
                      }}
                    >
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              className="text-paper/65 text-[0.9rem] md:text-[1rem] leading-relaxed max-w-sm md:max-w-md"
              initial={reduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.72, duration: 0.7 }}
            >
              {slide.sub}
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="mt-9 flex items-center gap-5"
              initial={reduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.88, duration: 0.6 }}
            >
              <a
                href="#sabores"
                className="px-7 py-3.5 rounded-full bg-paper text-ink text-[0.76rem] tracking-[0.22em] uppercase hover:bg-h2pro hover:text-paper transition-colors duration-300"
              >
                Conoce los sabores
              </a>
              <a
                href="#manifiesto"
                className="text-[0.76rem] tracking-[0.22em] uppercase text-paper/60 hover:text-paper transition-colors flex items-center gap-2.5"
              >
                <span className="w-7 h-px bg-current" /> Manifiesto
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Progress bars + dot navigation ─── */}
      <div className="absolute bottom-10 left-6 md:left-14 lg:left-20 right-6 md:right-14 z-30 flex items-center gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Ir al slide ${i + 1}`}
            className="group relative flex-1 h-[2px] bg-paper/20 overflow-hidden rounded-full cursor-pointer hover:bg-paper/35 transition-colors"
          >
            <span
              className="absolute inset-y-0 left-0 bg-paper rounded-full transition-none"
              style={{
                width: i < current ? "100%" : i === current ? `${progress}%` : "0%",
                transition: i === current && !paused ? "none" : "width 0.3s ease",
              }}
            />
          </button>
        ))}
      </div>

      {/* ─── Arrow navigation ─── */}
      <button
        aria-label="Slide anterior"
        onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1)}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full border border-paper/20 text-paper/50 hover:border-paper/60 hover:text-paper transition-all duration-300 hover:scale-110"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        aria-label="Slide siguiente"
        onClick={() => goTo((current + 1) % SLIDES.length, 1)}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full border border-paper/20 text-paper/50 hover:border-paper/60 hover:text-paper transition-all duration-300 hover:scale-110"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ─── Bottom colophon ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
      >
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 pb-[4.5rem] md:pb-[4.5rem]">
          <div className="border-t border-paper/10 pt-4 grid grid-cols-12 items-baseline gap-4">
            <span className="col-span-4 text-[0.58rem] tracking-[0.28em] uppercase text-paper/30">
              <span className="hidden md:inline">Ed. 01 — Vol. 01 / N° 01</span>
              <span className="md:hidden">Ed. 01 — N°01</span>
            </span>
            <span className="col-span-4 text-center">
              <span className="editorial text-paper/45 text-[0.9rem] md:text-[1rem] leading-snug">
                Clear Protein. Hecho en México.
              </span>
            </span>
            <a
              href="#manifiesto"
              className="col-span-4 pointer-events-auto group flex items-center justify-end gap-3 text-[0.58rem] tracking-[0.28em] uppercase text-paper/40 hover:text-paper/70 transition-colors"
            >
              <span className="hidden md:inline">01 → Manifiesto</span>
              <span className="md:hidden">01 →</span>
              <ScrollLine />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ScrollLine() {
  return (
    <span
      aria-hidden
      className="relative block h-5 w-px overflow-hidden bg-paper/20"
    >
      <span
        className="absolute inset-x-0 top-0 h-3 bg-current opacity-50"
        style={{ animation: "scrollCue 2.4s ease-in-out infinite" }}
      />
      <style jsx>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          span { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
