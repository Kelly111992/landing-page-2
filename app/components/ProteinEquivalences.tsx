"use client";

import { motion, useReducedMotion } from "framer-motion";
import CountUp from "./CountUp";
import { spring } from "../lib/springs";

// Equivalencia proteica como ecuación tipográfica fija (minuta 01-jun):
// "20 g de proteína real ≃ 100 g de pechuga de pollo, carne de res o pescado".
// Sin video, sin revelación renglón por renglón: un solo enunciado, mismo bg-ink.
export default function ProteinEquivalences() {
  const reduce = useReducedMotion();

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

            {/* ≃ — aproximación */}
            <motion.div
              variants={item}
              className="md:col-span-2 flex flex-row md:flex-col items-center justify-center gap-4 py-8 md:py-16 border-y md:border-y-0 md:border-x border-paper/12"
            >
              <span
                aria-hidden
                className="display text-h2pro-glow"
                style={{ fontSize: "clamp(3.2rem, 6vw, 5.4rem)", lineHeight: 1 }}
              >
                ≃
              </span>
            </motion.div>

            {/* 100 g — el plato */}
            <motion.div
              variants={item}
              className="md:col-span-5 py-12 md:py-16 md:pl-12 flex flex-col gap-10 md:gap-14 md:items-end md:text-right"
            >
              <span className="eyebrow text-paper/40">Aporte equivalente</span>
              <div>
                <span className="display text-paper block" style={numberStyle}>
                  <CountUp to={100} duration={1.6} />
                  <span style={{ fontSize: "0.42em", marginLeft: "0.1em" }}>g</span>
                </span>
                <p className="mt-5 text-paper/65 text-[0.95rem] md:text-[1.05rem] max-w-[26ch]">
                  de pechuga de pollo, carne de res o pescado
                </p>
              </div>
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
