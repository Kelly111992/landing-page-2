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

export default function NutritionLabel() {
  const reduce = useReducedMotion();
  return (
    <section
      id="nutrimental"
      className="relative bg-ink text-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="md:col-span-4" />
          <div className="md:col-span-8">
            <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[16ch]">
              Lo que ves es lo que hay
            </h2>
            <p className="mt-6 max-w-md text-paper/65 text-[0.95rem] md:text-[1rem] leading-relaxed">
              Sin letra chiquita. La declaración nutrimental oficial, tal cual
              aparece en la botella. Los valores cambian según el perfil del
              sabor.
            </p>
          </div>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring.gentle}
          className="border-2 border-paper"
        >
          {/* Tabla de declaración nutrimental — único panel conservado */}
          <div className="p-8 md:p-12">
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
        </motion.div>

        {/* Disclaimer line */}
        <p className="mt-10 text-[0.78rem] text-paper/45 leading-relaxed max-w-3xl">
          No consumir durante el embarazo o lactancia. Almacenar en lugar
          fresco, seco y alejado de la luz solar directa. Una vez abierto,
          consérvese en refrigeración.
        </p>
      </div>
    </section>
  );
}
