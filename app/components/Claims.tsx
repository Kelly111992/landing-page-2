"use client";

import { motion, useReducedMotion } from "framer-motion";
import CountUp from "./CountUp";
import { spring } from "../lib/springs";

const hero = {
  unit: "g",
  index: "01",
  title: "Proteína whey aislada",
  body:
    "Aislado de suero de leche con alta biodisponibilidad. La misma calidad de un suplemento premium, en el formato más simple posible.",
};

const secondary = [
  {
    n: "0 g",
    index: "02",
    title: "Azúcar añadida",
    body: "Sin azúcar disfrazada, sin maltodextrinas, sin jarabes.",
  },
  {
    n: "0 %",
    index: "03",
    title: "Lactosa",
    body: "Sin la pesadez ni inflamación que provocan las proteínas tradicionales.",
  },
  {
    n: "Ø",
    index: "04",
    title: "Espesantes",
    body: "Sin gomas, sin emulsionantes. Por eso se ve clara: porque no esconde nada.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Claims() {
  const reduce = useReducedMotion();

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: spring.smooth },
  };

  return (
    <section className="relative bg-paper-blue py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">

        {/* Section header */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={item} className="md:col-span-4">
            <span className="eyebrow text-ink/55">[ 02 ] Composición</span>
          </motion.div>
          <motion.div variants={item} className="md:col-span-8">
            <h2 className="display text-ink text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[14ch]">
              Cuatro decisiones,{" "}
              <span className="editorial text-h2pro font-normal">
                cero compromisos.
              </span>
            </h2>
          </motion.div>
        </motion.div>

        {/* Editorial spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 items-stretch">

          {/* Hero claim — animated CountUp on "20" */}
          <motion.article
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-8 md:pr-12 lg:pr-20 relative"
          >
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[0.68rem] tracking-[0.28em] uppercase text-ink/40">
                {hero.index}
              </span>
              <span className="h-px flex-1 max-w-[80px] bg-ink/20" />
              <span className="text-[0.65rem] tracking-[0.28em] uppercase text-ink/40">
                por 500 ml
              </span>
            </div>

            {/* The number — animated count-up */}
            <div className="relative leading-none -ml-[0.05em]">
              <span
                className="display text-ink block"
                style={{
                  fontSize: "clamp(8rem, 22vw, 22rem)",
                  letterSpacing: "-0.06em",
                  lineHeight: 0.82,
                }}
              >
                <CountUp to={20} duration={1.6} />
                <span
                  className="editorial text-h2pro font-normal"
                  style={{
                    fontSize: "0.55em",
                    marginLeft: "0.08em",
                    verticalAlign: "0.32em",
                  }}
                >
                  {hero.unit}
                </span>
              </span>
            </div>

            <div className="mt-10 max-w-md">
              <h3 className="display text-ink text-[1.4rem] md:text-[1.6rem] leading-tight">
                {hero.title}
              </h3>
              <p className="mt-4 text-[0.95rem] md:text-[1rem] leading-relaxed text-ink/70">
                {hero.body}
              </p>
            </div>
          </motion.article>

          {/* Secondary rail — staggered */}
          <motion.div
            className="md:col-span-4 border-t md:border-t-0 md:border-l border-ink/15 md:pl-10 pt-6 md:pt-0 flex flex-col"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {secondary.map((it, i) => (
              <motion.article
                key={it.title}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 20 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      ...spring.smooth,
                      delay: reduce ? 0 : i * 0.1,
                    },
                  },
                }}
                className={`flex-1 py-8 md:py-10 ${i > 0 ? "border-t border-ink/15" : ""}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.68rem] tracking-[0.28em] uppercase text-ink/40">
                    {it.index}
                  </span>
                  <span
                    className="display text-ink leading-none"
                    style={{
                      fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {it.n}
                  </span>
                </div>
                <h3 className="mt-5 text-[0.95rem] md:text-[1.05rem] font-semibold text-ink leading-tight">
                  {it.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink/65">
                  {it.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...spring.gentle, delay: reduce ? 0 : 0.3 }}
          className="mt-20 md:mt-28 max-w-2xl text-[0.95rem] md:text-[1.05rem] leading-relaxed text-ink/60"
        >
          Toda decisión arriba puede comprobarse en la{" "}
          <a
            href="#nutrimental"
            className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-h2pro decoration-1 transition-colors"
          >
            tabla nutrimental
          </a>
          . No hay segunda lectura.
        </motion.p>
      </div>
    </section>
  );
}
