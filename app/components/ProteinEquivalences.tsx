"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { spring } from "../lib/springs";

const EASE = [0.22, 1, 0.36, 1] as const;

// Secuencia cinemática auto-reproducida (sin fijar el scroll): el 20 de una
// botella rueda hasta el 100 del plato y cada alimento se re-proyecta con su
// nombre gigante en outline detrás. Avanza sola mientras está en pantalla.
const FOODS = [
  { label: "de pechuga de pollo", word: "Pollo" },
  { label: "de carne de res", word: "Res" },
  { label: "de pescado", word: "Pescado" },
];
const INTRO_MS = 1400; // tiempo en "20 g" antes de rodar
const CYCLE_MS = 2200; // tiempo por alimento

export default function ProteinEquivalences() {
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { amount: 0.5 });

  // Fase 0 = botella (20 g); fases 1-3 = alimentos (100 g, en bucle)
  const [phase, setPhase] = useState(0);
  const [num, setNum] = useState(20);
  const rolled = useRef(false);

  // Auto-avance mientras la escena está en pantalla
  useEffect(() => {
    if (reduce || !inView) return;
    const delay = phase === 0 ? INTRO_MS : CYCLE_MS;
    const t = setTimeout(() => {
      setPhase((p) => (p === 0 ? 1 : (p % 3) + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [reduce, inView, phase]);

  // Rodado 20 → 100 una sola vez, al salir de la botella
  useEffect(() => {
    if (reduce) {
      setNum(phase === 0 ? 20 : 100);
      return;
    }
    if (phase === 0 || rolled.current) return;
    rolled.current = true;
    let raf = 0;
    let start: number | null = null;
    const dur = 850;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setNum(Math.round(20 + eased * 80));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce, phase]);

  const food = phase > 0 ? FOODS[phase - 1] : null;

  return (
    <section
      className="relative bg-ink border-t border-paper/10 grain"
      aria-label="20 gramos de proteína real por botella: el aporte equivalente a 100 gramos de pechuga de pollo, carne de res o pescado"
    >
      {/* Header */}
      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 pt-24 md:pt-32 pb-6 md:pb-10">
        <motion.div
          className="text-center"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring.gentle}
        >
          <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] mx-auto">
            Una botella. La proteína de un plato completo
          </h2>
          <p className="mt-8 max-w-2xl mx-auto text-paper/65 text-[0.95rem] md:text-[1rem] leading-relaxed">
            20 g de proteína aislada de suero de leche por botella: el mismo
            aporte que una porción de proteína animal de alta calidad, sin
            preparación, sin calorías de más.
          </p>
        </motion.div>
      </div>

      {reduce ? (
        /* Reduced motion: ecuación completa, estática */
        <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 pb-28">
          <div className="border-y border-paper/12 py-16 text-center">
            <span
              className="display text-paper block"
              style={{
                fontSize: "clamp(5rem, 16vw, 13rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
              }}
            >
              20<span className="text-paper text-[0.4em]">g</span>
              <span className="text-paper/45 text-[0.32em] mx-[0.5em]">≃</span>
              100<span className="text-paper text-[0.4em]">g</span>
            </span>
            <p className="mt-8 text-paper/65 text-[1rem] md:text-[1.1rem]">
              de proteína real, el aporte de 100 g de pechuga de pollo, carne
              de res o pescado
            </p>
          </div>
          <p className="mt-6 text-[0.62rem] tracking-[0.28em] uppercase text-paper/35">
            Equivalencia aproximada de aporte proteico
          </p>
        </div>
      ) : (
        /* Escena auto-reproducida — altura normal, el scroll fluye */
        <div
          ref={sceneRef}
          className="relative h-[80svh] min-h-[560px] overflow-hidden"
        >
          {/* Atmósfera central */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-3xl pointer-events-none"
            animate={{ opacity: phase === 0 ? 0.16 : 0.34 }}
            transition={{ duration: 1, ease: EASE }}
            style={{
              background:
                "radial-gradient(circle, rgba(0,134,214,0.55) 0%, rgba(0,134,214,0) 65%)",
            }}
          />

          {/* Nombre del alimento — gigante, outline, detrás del número */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {food && (
                <motion.span
                  key={food.word}
                  className="display whitespace-nowrap select-none"
                  style={{
                    fontSize: "clamp(7rem, 30vw, 26rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(245,247,248,0.13)",
                  }}
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  {food.word}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Composición central */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
            {/* Contexto superior */}
            <div className="h-[1.2em] overflow-hidden" aria-hidden>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={phase === 0 ? "botella" : "plato"}
                  className="block eyebrow text-paper/50"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {phase === 0 ? "Una botella H2PRO" : "Aporte equivalente"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Número gigante — rueda 20 → 100 y se re-proyecta por alimento */}
            <div
              className="relative mt-6 md:mt-8"
              style={{
                fontSize: "clamp(7rem, 24vw, 19rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
              }}
              aria-hidden
            >
              {/* Signo de equivalencia — pulsa con cada alimento */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 md:mr-7">
                <AnimatePresence mode="popLayout">
                  {food && (
                    <motion.span
                      key={`sym-${phase}`}
                      className="block display text-h2pro-glow"
                      style={{ fontSize: "0.3em", lineHeight: 1 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      ≃
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>

              <div className="display text-paper tabular-nums overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={phase <= 1 ? "base" : `food-${phase}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: "0.45em", filter: "blur(14px)" }}
                    animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: "-0.45em", filter: "blur(14px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {num}
                    <span className="text-paper" style={{ fontSize: "0.4em" }}>
                      g
                    </span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Lectura — qué significa el número en esta fase */}
            <div
              className="mt-7 md:mt-9 h-[1.6em] overflow-hidden text-[1.15rem] md:text-[1.5rem]"
              aria-hidden
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={phase}
                  className="block text-paper/75"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {food ? food.label : "de proteína real"}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="sr-only">
              20 g de proteína real por botella: el aporte equivalente a 100 g
              de pechuga de pollo, carne de res o pescado.
            </p>

            {/* Rastro de fases */}
            <div className="mt-12 md:mt-16 flex items-center gap-7" aria-hidden>
              {FOODS.map((f, i) => (
                <span
                  key={f.word}
                  className={`text-[0.62rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
                    phase === i + 1 ? "text-paper" : "text-paper/30"
                  }`}
                >
                  {f.word}
                </span>
              ))}
            </div>
          </div>

          {/* Pie de escena */}
          <p className="absolute bottom-6 left-6 right-20 md:right-auto md:left-10 text-[0.62rem] tracking-[0.28em] uppercase text-paper/35">
            Equivalencia aproximada de aporte proteico
          </p>
        </div>
      )}
    </section>
  );
}
