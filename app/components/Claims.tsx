"use client";

import { motion, useReducedMotion } from "framer-motion";

const hero = {
  n: "20",
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

export default function Claims() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0, y = 24) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
        };

  return (
    <section className="relative bg-paper py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-4">
            <span className="eyebrow text-ink/55">[ 02 ] Composición</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-ink text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[14ch]">
              Cuatro decisiones,{" "}
              <span className="editorial text-h2pro font-normal">
                cero compromisos.
              </span>
            </h2>
          </div>
        </div>

        {/* Editorial spread: hero number + spec rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 items-stretch">
          {/* Hero claim — 20g */}
          <motion.article
            {...reveal(0, 32)}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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

            {/* The number itself — extreme scale */}
            <div className="relative leading-none -ml-[0.05em]">
              <span
                className="display text-ink block"
                style={{
                  fontSize: "clamp(8rem, 22vw, 22rem)",
                  letterSpacing: "-0.06em",
                  lineHeight: 0.82,
                }}
              >
                {hero.n}
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

          {/* Secondary rail */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-ink/15 md:pl-10 pt-6 md:pt-0 flex flex-col">
            {secondary.map((item, i) => (
              <motion.article
                key={item.title}
                {...reveal(0, 20)}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: reduce ? 0 : 0.15 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex-1 py-8 md:py-10 ${
                  i > 0 ? "border-t border-ink/15" : ""
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.68rem] tracking-[0.28em] uppercase text-ink/40">
                    {item.index}
                  </span>
                  <span
                    className="display text-ink leading-none"
                    style={{
                      fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {item.n}
                  </span>
                </div>
                <h3 className="mt-5 text-[0.95rem] md:text-[1.05rem] font-semibold text-ink leading-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink/65">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing editorial line */}
        <motion.p
          {...reveal(0.4, 16)}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.5 }}
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
