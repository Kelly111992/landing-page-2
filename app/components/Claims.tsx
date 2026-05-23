"use client";

import { motion, useReducedMotion } from "framer-motion";
import CountUp from "./CountUp";
import { spring } from "../lib/springs";

const hero = {
  unit: "g",
  index: "01",
  title: "Proteína aislada de suero de leche",
  body:
    "Aislado de suero de leche con alta biodisponibilidad. La misma calidad de un suplemento premium, en el formato más simple posible.",
};

const secondary = [
  {
    n: "4.5 g",
    index: "02",
    title: "BCAAs",
    body: "4.5 g de aminoácidos de cadena ramificada en cada botella.",
  },
  {
    n: "0 g",
    index: "03",
    title: "Azúcar añadida",
    body: "Sin azúcar disfrazada, sin maltodextrinas, sin jarabes.",
  },
  {
    n: "0 g",
    index: "04",
    title: "Lactosa",
    body: "Sin la pesadez ni inflamación que provocan las proteínas tradicionales.",
  },
  {
    n: "✓",
    index: "05",
    title: "Ingredientes naturales",
    body: "Saborizantes y colores de origen natural. Nada que no reconozcas.",
  },
  {
    n: "✓",
    index: "06",
    title: "Clean Label",
    body: "Etiqueta limpia: en la fórmula está lo único que hay.",
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
    <section className="relative bg-ink py-28 md:py-40 overflow-hidden">
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
            <span className="eyebrow text-paper/55">[ 02 ] Composición</span>
          </motion.div>
          <motion.div variants={item} className="md:col-span-8">
            <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[14ch]">
              Lo esencial, cero compromisos
            </h2>
          </motion.div>
        </motion.div>

        {/* Editorial spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 items-start">

          {/* Hero claim — animated CountUp on "20" */}
          <motion.article
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-8 md:pr-12 lg:pr-20 relative"
          >
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[0.68rem] tracking-[0.28em] uppercase text-paper/40">
                {hero.index}
              </span>
              <span className="h-px flex-1 max-w-[80px] bg-paper/20" />
              <span className="text-[0.65rem] tracking-[0.28em] uppercase text-paper/40">
                por 500 ml
              </span>
            </div>

            {/* The number — count-up that resolves into focus */}
            <motion.div
              className="relative leading-none -ml-[0.05em]"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, filter: "blur(26px)", scale: 1.12 }
              }
              whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: reduce ? 0.3 : 1.4, ease: EASE }}
            >
              <span
                className="display text-paper block"
                style={{
                  fontSize: "clamp(8rem, 22vw, 22rem)",
                  letterSpacing: "-0.06em",
                  lineHeight: 0.82,
                }}
              >
                <CountUp to={20} duration={1.6} />
                <motion.span
                  className="display text-paper inline-block"
                  style={{
                    fontSize: "0.55em",
                    marginLeft: "0.08em",
                    verticalAlign: "0.32em",
                  }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.4em" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ ...spring.bouncy, delay: reduce ? 0 : 1.1 }}
                >
                  {hero.unit}
                </motion.span>
              </span>
            </motion.div>

            <motion.div
              className="mt-10 max-w-md"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...spring.gentle, delay: reduce ? 0 : 0.5 }}
            >
              <h3 className="display text-paper text-[1.4rem] md:text-[1.6rem] leading-tight">
                {hero.title}
              </h3>
              <p className="mt-4 text-[0.95rem] md:text-[1rem] leading-relaxed text-paper/70">
                {hero.body}
              </p>
            </motion.div>
          </motion.article>

          {/* Secondary rail — staggered */}
          <motion.div
            className="md:col-span-4 border-t md:border-t-0 md:border-l border-paper/15 md:pl-10 pt-6 md:pt-0 flex flex-col"
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
                className={`flex-1 py-5 md:py-7 ${i > 0 ? "border-t border-paper/15" : ""}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.68rem] tracking-[0.28em] uppercase text-paper/40">
                    {it.index}
                  </span>
                  <span
                    className="display leading-none text-paper"
                    style={{
                      fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {it.n}
                  </span>
                </div>
                <h3 className="mt-5 text-[0.95rem] md:text-[1.05rem] font-semibold text-paper leading-tight">
                  {it.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-paper/65">
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
          className="mt-20 md:mt-28 max-w-2xl text-[0.95rem] md:text-[1.05rem] leading-relaxed text-paper/60"
        >
          Toda decisión arriba puede comprobarse en la{" "}
          <a
            href="#nutrimental"
            className="text-paper underline underline-offset-4 decoration-paper/30 hover:decoration-h2pro decoration-1 transition-colors"
          >
            tabla nutrimental
          </a>
          . No hay segunda lectura.
        </motion.p>
      </div>
    </section>
  );
}
