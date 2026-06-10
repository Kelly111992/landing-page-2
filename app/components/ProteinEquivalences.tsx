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

// Equivalencia proteica (minuta 01-jun): un solo enunciado completo, sin video.
// El aporte equivalente se re-proyecta por alimento: el 100 rueda dígito a
// dígito (split-flap) cada vez que rota pollo → res → pescado.
const FOODS = ["pechuga de pollo", "carne de res", "pescado"];
const CYCLE_MS = 2600;

export default function ProteinEquivalences() {
  const reduce = useReducedMotion();
  const eqRef = useRef<HTMLDivElement>(null);
  const inView = useInView(eqRef, { amount: 0.35 });
  const [idx, setIdx] = useState(0);

  // Rota el alimento sólo mientras la ecuación está en pantalla.
  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % FOODS.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [reduce, inView]);

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
    <section className="relative bg-ink py-24 md:py-32 overflow-hidden border-t border-paper/10">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">

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

        {/* Ecuación tipográfica — un solo enunciado fijo y completo */}
        <motion.div
          ref={eqRef}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="border-y border-paper/12"
          aria-label="20 g de proteína real equivalen aproximadamente a 100 g de pechuga de pollo, carne de res o pescado"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">

            {/* 20 g — la botella */}
            <motion.div
              variants={item}
              className="md:col-span-5 py-12 md:py-16 flex flex-col gap-10 md:gap-14"
            >
              <span className="eyebrow text-paper/40">Una botella H2PRO</span>
              <div>
                <span className="display text-paper block" style={numberStyle}>
                  <CountUp to={20} duration={1.2} />
                  <span style={{ fontSize: "0.42em", marginLeft: "0.1em" }}>g</span>
                </span>
                <p className="mt-5 text-paper/65 text-[0.95rem] md:text-[1.05rem]">
                  de proteína real
                </p>
              </div>
            </motion.div>

            {/* ≃ — pulsa con cada alimento */}
            <motion.div
              variants={item}
              className="md:col-span-2 flex items-center justify-center py-8 md:py-16 border-y md:border-y-0 md:border-x border-paper/12"
            >
              <motion.span
                key={reduce ? "static" : idx}
                aria-hidden
                className="display text-h2pro-glow"
                style={{ fontSize: "clamp(3.2rem, 6vw, 5.4rem)", lineHeight: 1 }}
                initial={reduce ? false : { scale: 0.88, opacity: 0.55 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                ≃
              </motion.span>
            </motion.div>

            {/* 100 g — re-proyectado por alimento */}
            <motion.div
              variants={item}
              className="md:col-span-5 py-12 md:py-16 md:pl-12 flex flex-col gap-10 md:gap-14 md:items-end md:text-right"
            >
              <span className="eyebrow text-paper/40">Aporte equivalente</span>

              {reduce ? (
                /* Reduced motion: enunciado completo, fijo */
                <div>
                  <span className="display text-paper block" style={numberStyle}>
                    100
                    <span style={{ fontSize: "0.42em", marginLeft: "0.1em" }}>g</span>
                  </span>
                  <p className="mt-5 text-paper/65 text-[0.95rem] md:text-[1.05rem] max-w-[26ch]">
                    de pechuga de pollo, carne de res o pescado
                  </p>
                </div>
              ) : (
                <div aria-hidden>
                  {/* 100 — split-flap: cada dígito rueda al cambiar el alimento */}
                  <span
                    className="display text-paper inline-flex items-baseline"
                    style={numberStyle}
                  >
                    {["1", "0", "0"].map((d, i) => (
                      <span
                        key={i}
                        className="relative inline-block overflow-hidden"
                        style={{ height: "0.85em" }}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={`${idx}-${i}`}
                            className="inline-block"
                            initial={{ y: "108%", filter: "blur(8px)" }}
                            animate={{ y: "0%", filter: "blur(0px)" }}
                            exit={{ y: "-108%", filter: "blur(8px)" }}
                            transition={{
                              duration: 0.6,
                              ease: EASE,
                              delay: i * 0.07,
                            }}
                          >
                            {d}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    ))}
                    <span style={{ fontSize: "0.42em", marginLeft: "0.1em" }}>g</span>
                  </span>

                  {/* Alimento — rodillo vertical */}
                  <span
                    className="mt-5 block overflow-hidden text-[1.05rem] md:text-[1.3rem]"
                    style={{ height: "1.5em" }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={idx}
                        className="block font-semibold text-paper"
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-115%" }}
                        transition={{ duration: 0.65, ease: EASE }}
                      >
                        <span className="text-paper/50 font-normal">de </span>
                        {FOODS[idx]}
                      </motion.span>
                    </AnimatePresence>
                  </span>

                  {/* Índice del rodillo */}
                  <span className="mt-6 flex gap-2 md:justify-end">
                    {FOODS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-px w-7 transition-colors duration-500 ${
                          i === idx ? "bg-paper" : "bg-paper/25"
                        }`}
                      />
                    ))}
                  </span>
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
