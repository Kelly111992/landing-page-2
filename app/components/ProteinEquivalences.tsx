"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import CountUp from "./CountUp";
import { spring } from "../lib/springs";

const EASE = [0.22, 1, 0.36, 1] as const;

// Equivalencia proteica: el enunciado queda quieto y sólo el alimento se
// re-proyecta (crossfade con blur). Auto-avanza mientras está en pantalla;
// el selector permite elegir y reinicia el ciclo (el efecto depende de idx).
const FOODS = [
  { label: "pechuga de pollo", short: "Pollo" },
  { label: "carne de res", short: "Res" },
  { label: "pescado", short: "Pescado" },
];
const CYCLE_MS = 3400;

export default function ProteinEquivalences() {
  const reduce = useReducedMotion();
  const eqRef = useRef<HTMLDivElement>(null);
  const inView = useInView(eqRef, { amount: 0.35 });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % FOODS.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [reduce, inView, idx]);

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: spring.smooth },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  const numberStyle = {
    fontSize: "clamp(4.6rem, 10.5vw, 10rem)",
    letterSpacing: "-0.05em",
    lineHeight: 0.85,
  } as const;

  return (
    <section className="relative bg-ink py-24 md:py-32 overflow-hidden border-t border-paper/10 grain">
      {/* Atmósfera — luz fría detrás del aporte equivalente */}
      <div
        aria-hidden
        className="absolute -top-44 right-[-12%] w-[52vw] h-[52vw] max-w-[700px] max-h-[700px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,134,214,0.55) 0%, rgba(0,134,214,0) 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10">

        {/* Section header */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 md:mb-24"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={item} className="md:col-span-4">
            <span className="eyebrow text-paper/55">Proteína real</span>
          </motion.div>

          <motion.div variants={item} className="md:col-span-8">
            <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[18ch]">
              Una botella. La proteína de un plato completo
            </h2>
            <p className="mt-6 max-w-lg text-paper/65 text-[0.95rem] md:text-[1rem] leading-relaxed">
              20 g de proteína aislada de suero de leche por botella: el mismo
              aporte que una porción de proteína animal de alta calidad, sin
              preparación, sin calorías de más.
            </p>
          </motion.div>
        </motion.div>

        {/* Ecuación — el enunciado quieto, el alimento se re-proyecta */}
        <motion.div
          ref={eqRef}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative border-y border-paper/12"
          aria-label="20 g de proteína real equivalen aproximadamente a 100 g de pechuga de pollo, carne de res o pescado"
        >
          {/* Ticks de esquina */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((c) => (
            <span
              key={c}
              aria-hidden
              className={`absolute w-3 h-3 border-paper/45 ${c}`}
            />
          ))}

          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">

            {/* 20 g — la botella */}
            <motion.div
              variants={item}
              className="md:col-span-5 py-12 md:py-20 flex flex-col gap-10 md:gap-14"
            >
              <span className="eyebrow text-paper/40">Una botella H2PRO</span>
              <div>
                <span className="display text-paper block" style={numberStyle}>
                  <CountUp to={20} duration={1.2} />
                  <span
                    className="text-paper/55"
                    style={{ fontSize: "0.42em", marginLeft: "0.1em" }}
                  >
                    g
                  </span>
                </span>
                <p className="mt-5 text-paper/60 text-[0.95rem] md:text-[1.05rem]">
                  de proteína real
                </p>
              </div>
            </motion.div>

            {/* ≃ — pulsa con cada alimento */}
            <motion.div
              variants={item}
              className="relative md:col-span-2 flex items-center justify-center py-8 md:py-20 border-y md:border-y-0 md:border-x border-paper/12"
            >
              <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="w-36 h-36 rounded-full blur-2xl opacity-25"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(74,180,240,0.7) 0%, rgba(74,180,240,0) 70%)",
                  }}
                />
              </div>
              <motion.span
                key={reduce ? "static" : idx}
                aria-hidden
                className="relative display text-h2pro-glow"
                style={{ fontSize: "clamp(3.2rem, 6vw, 5.4rem)", lineHeight: 1 }}
                initial={reduce ? false : { scale: 0.92, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                ≃
              </motion.span>
            </motion.div>

            {/* 100 g — el alimento se re-proyecta */}
            <motion.div
              variants={item}
              className="md:col-span-5 py-12 md:py-20 md:pl-12 flex flex-col gap-10 md:gap-14 md:items-end md:text-right"
            >
              <span className="eyebrow text-paper/40">Aporte equivalente</span>

              {reduce ? (
                /* Reduced motion: enunciado completo, fijo */
                <div>
                  <span className="display text-paper block" style={numberStyle}>
                    100
                    <span
                      className="text-paper/55"
                      style={{ fontSize: "0.42em", marginLeft: "0.1em" }}
                    >
                      g
                    </span>
                  </span>
                  <p className="mt-5 text-paper/65 text-[0.95rem] md:text-[1.05rem] max-w-[26ch]">
                    de pechuga de pollo, carne de res o pescado
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col md:items-end">
                  <p className="sr-only">
                    de pechuga de pollo, carne de res o pescado
                  </p>

                  <div aria-hidden>
                    <span className="display text-paper block" style={numberStyle}>
                      100
                      <span
                        className="text-paper/55"
                        style={{ fontSize: "0.42em", marginLeft: "0.1em" }}
                      >
                        g
                      </span>
                    </span>

                    {/* Alimento — crossfade con blur */}
                    <span
                      className="mt-5 block overflow-hidden whitespace-nowrap text-[1.25rem] md:text-[1.6rem]"
                      style={{ height: "1.55em" }}
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={idx}
                          className="block"
                          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                          transition={{ duration: 0.7, ease: EASE }}
                        >
                          <span className="text-paper/45">de </span>
                          <span className="editorial text-paper text-[1.08em]">
                            {FOODS[idx].label}
                          </span>
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </div>

                  {/* Selector — auto-avanza, un click reinicia el ciclo */}
                  <div className="mt-10 flex gap-8 md:justify-end">
                    {FOODS.map((f, i) => (
                      <button
                        key={f.short}
                        type="button"
                        onClick={() => setIdx(i)}
                        aria-pressed={i === idx}
                        aria-label={`Ver equivalencia: ${f.label}`}
                        className={`relative pb-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
                          i === idx
                            ? "text-paper"
                            : "text-paper/35 hover:text-paper/70"
                        }`}
                      >
                        {f.short}
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-0 h-px w-full bg-paper/20"
                        />
                        {i === idx && inView && (
                          <motion.span
                            aria-hidden
                            className="absolute bottom-0 left-0 h-px w-full bg-h2pro-glow origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: CYCLE_MS / 1000,
                              ease: "linear",
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Nota de aproximación */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...spring.gentle, delay: reduce ? 0 : 0.4 }}
          className="mt-6 text-[0.62rem] tracking-[0.28em] uppercase text-paper/35"
        >
          Equivalencia aproximada de aporte proteico
        </motion.p>
      </div>
    </section>
  );
}
