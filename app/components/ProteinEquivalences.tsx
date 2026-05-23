"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

// ---------------------------------------------------------------------------
// PROVISIONAL — valores pendientes de la tabla de conversión de Diego (Word doc)
// Actualizar estas cantidades cuando llegue el documento oficial.
// ---------------------------------------------------------------------------
const equivalences = [
  {
    amount: "100",
    unit: "g",
    food: "Pechuga de pollo",
    detail: "Fuente clásica de proteína magra — sin el tiempo de cocción.",
  },
  {
    amount: "100",
    unit: "g",
    food: "Carne de res",
    detail: "El mismo aporte proteico de un corte, en formato de bolsillo.",
  },
  {
    amount: "100",
    unit: "g",
    food: "Pescado",
    detail: "Proteína completa de mar, sin hielo, sin sartén, sin olor.",
  },
];
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;

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

  const cardVariant = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 32, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { ...spring.smooth },
    },
  };

  return (
    <section className="relative bg-ink py-24 md:py-32 overflow-hidden border-t border-paper/10">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">

        {/* Section header */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={item}
            className="md:col-span-4"
          >
            <span className="eyebrow text-paper/55">Proteína real</span>
          </motion.div>

          <motion.div
            variants={item}
            className="md:col-span-8"
          >
            <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[18ch]">
              Una botella. La proteína de un plato completo
            </h2>
            <p className="mt-6 max-w-lg text-paper/65 text-[0.95rem] md:text-[1rem] leading-relaxed">
              20 g de proteína aislada de suero de leche por botella — el mismo
              aporte que una porción de proteína animal de alta calidad, sin
              preparación, sin calorías de más.
            </p>
          </motion.div>
        </motion.div>

        {/* Anchor stat — "1 botella = 20 g" */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-16 md:mb-20 pb-12 border-b border-paper/15"
        >
          <span
            className="display text-paper leading-none"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)", letterSpacing: "-0.05em" }}
          >
            1&nbsp;botella
          </span>
          <span
            className="display text-paper leading-none"
            style={{ fontSize: "clamp(3rem, 7vw, 5.6rem)", letterSpacing: "-0.05em" }}
          >
            = 20&nbsp;g
          </span>
          <span className="text-[0.8rem] tracking-[0.26em] uppercase text-paper/45 self-end pb-2">
            proteína real
          </span>
        </motion.div>

        {/* Equivalences grid */}
        <span className="text-[0.68rem] tracking-[0.28em] uppercase text-paper/40 mb-8 block">
          Equivalente a
        </span>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {equivalences.map((eq, i) => (
            <motion.article
              key={eq.food}
              variants={cardVariant}
              className={`relative py-10 md:py-12 ${
                i < equivalences.length - 1
                  ? "border-b md:border-b-0 md:border-r border-paper/15"
                  : ""
              } ${i > 0 ? "md:pl-10 lg:pl-14" : ""} ${
                i < equivalences.length - 1 ? "md:pr-10 lg:pr-14" : ""
              }`}
            >
              {/* Index line */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[0.68rem] tracking-[0.28em] uppercase text-paper/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 max-w-[60px] bg-paper/20" />
              </div>

              {/* Amount */}
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="display text-paper leading-none"
                  style={{
                    fontSize: "clamp(3.6rem, 7vw, 6rem)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {eq.amount}
                </span>
                <span
                  className="display text-paper leading-none"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {eq.unit}
                </span>
              </div>

              {/* Food label */}
              <h3 className="display text-paper text-[1.3rem] md:text-[1.5rem] leading-tight mb-4">
                {eq.food}
              </h3>

              {/* Supporting copy */}
              <p className="text-[0.88rem] leading-relaxed text-paper/60 max-w-[28ch]">
                {eq.detail}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Closing note */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...spring.gentle, delay: reduce ? 0 : 0.3 }}
          className="mt-20 md:mt-24 max-w-2xl text-[0.95rem] md:text-[1.05rem] leading-relaxed text-paper/60"
        >
          Sin sartén, sin batidora, sin pretextos.{" "}
          <span className="text-paper">H2PRO</span> es tu proteína diaria en el
          formato más simple posible.
        </motion.p>
      </div>
    </section>
  );
}
