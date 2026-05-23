"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

const rows = [
  { label: "Contenido energético", per100: "16 kcal", per500: "80 kcal" },
  { label: "Proteínas", per100: "4 g", per500: "20 g", emphasis: true },
  { label: "Grasas", per100: "0 g", per500: "0 g" },
  { label: "Carbohidratos", per100: "0 g", per500: "0 g" },
  { label: "Sodio", per100: "7.6 mg", per500: "38 mg" },
];

const ingredients = [
  "Agua",
  "Proteína aislada de suero de leche",
  "Saborizante idéntico al natural",
  "Color natural",
  "Sucralosa",
];

export default function NutritionLabel() {
  const reduce = useReducedMotion();
  return (
    <section
      id="nutrimental"
      className="relative bg-ink text-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="md:col-span-4">
            <span className="eyebrow text-h2pro-glow">[ 04 ] Etiqueta</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[16ch]">
              Lo que ves es lo que hay.
            </h2>
            <p className="mt-6 max-w-md text-paper/65 text-[0.95rem] md:text-[1rem] leading-relaxed">
              Cinco ingredientes. Cero letra chiquita. Si no entendieras qué es
              algo, no lo pondríamos en la fórmula.
            </p>
          </div>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring.gentle}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 border-2 border-paper"
        >
          {/* Big label panel */}
          <div className="lg:col-span-7 border-b-2 lg:border-b-0 lg:border-r-2 border-paper p-8 md:p-12">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-paper/30">
              <h3 className="display text-paper text-[1.6rem]">
                Declaración nutrimental
              </h3>
              <span className="text-[0.7rem] tracking-[0.28em] uppercase text-paper/55">
                NOM 051
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-0 text-[0.92rem]">
              <span className="text-[0.68rem] tracking-[0.28em] uppercase text-paper/50 pb-3 border-b border-paper/20">
                Por porción
              </span>
              <span className="text-[0.68rem] tracking-[0.28em] uppercase text-paper/50 pb-3 border-b border-paper/20 text-right">
                100 ml
              </span>
              <span className="text-[0.68rem] tracking-[0.28em] uppercase text-paper/50 pb-3 border-b border-paper/20 text-right">
                500 ml
              </span>

              {rows.map((r) => (
                <div
                  key={r.label}
                  className="contents"
                >
                  <span
                    className={`py-4 border-b border-paper/15 ${
                      r.emphasis ? "text-paper font-semibold" : "text-paper/85"
                    }`}
                  >
                    {r.label}
                  </span>
                  <span
                    className={`py-4 border-b border-paper/15 text-right tabular-nums ${
                      r.emphasis ? "text-paper font-semibold" : "text-paper/70"
                    }`}
                  >
                    {r.per100}
                  </span>
                  <span
                    className={`py-4 border-b border-paper/15 text-right tabular-nums ${
                      r.emphasis
                        ? "display text-paper text-[1.2rem]"
                        : "text-paper/70"
                    }`}
                  >
                    {r.per500}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[0.78rem] text-paper/50 leading-relaxed">
              Tamaño de la porción: 500 ml · Una bebida al día. No exceder la
              porción diaria recomendada.
            </p>
          </div>

          {/* Ingredients */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-paper/30">
              <h3 className="display text-paper text-[1.6rem]">
                Ingredientes
              </h3>
              <span className="text-[0.7rem] tracking-[0.28em] uppercase text-paper/55">
                05
              </span>
            </div>

            <ol className="space-y-1 flex-1">
              {ingredients.map((ing, i) => (
                <motion.li
                  key={ing}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...spring.smooth, delay: reduce ? 0 : 0.1 + i * 0.07 }}
                  className="flex items-baseline gap-5 py-4 border-b border-paper/15"
                >
                  <span className="text-[0.7rem] tracking-[0.24em] text-paper/40 tabular-nums shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.05rem] md:text-[1.15rem] text-paper">
                    {ing}
                  </span>
                </motion.li>
              ))}
            </ol>

            <div className="mt-10 pt-6 border-t border-paper/20 grid grid-cols-2 gap-6 text-[0.78rem] text-paper/65">
              <div>
                <span className="block text-[0.65rem] tracking-[0.28em] uppercase text-paper/40 mb-2">
                  Vida de anaquel
                </span>
                18 meses
              </div>
              <div>
                <span className="block text-[0.65rem] tracking-[0.28em] uppercase text-paper/40 mb-2">
                  Presentación
                </span>
                PET 500 ml · 19 cm × 6.5 cm
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer line */}
        <p className="mt-10 text-[0.78rem] text-paper/45 leading-relaxed max-w-3xl">
          No recomendable en niños. No consumir durante el embarazo o
          lactancia. Almacenar en lugar fresco, seco y alejado de la luz solar
          directa. Una vez abierto, consérvese en refrigeración.
        </p>
      </div>
    </section>
  );
}
