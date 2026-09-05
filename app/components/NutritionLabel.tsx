"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

// Valores de la etiqueta vigente (355 ml). Las filas `sub` son los desgloses
// que en la etiqueta impresa van indentados bajo su renglón padre.
const rows = [
  { label: "Contenido energético", per100: "16.4 kcal", per355: "58.4 kcal" },
  { label: "Proteínas", per100: "3.1 g", per355: "10.9 g", emphasis: true },
  { label: "Grasas totales", per100: "0.4 g", per355: "1.6 g" },
  { label: "Grasas saturadas", per100: "0.2 g", per355: "0.6 g", sub: true },
  { label: "Grasas trans", per100: "0 mg", per355: "0 mg", sub: true },
  { label: "Hidratos de carbono disponibles", per100: "0.0 g", per355: "0.1 g" },
  { label: "Azúcares", per100: "0.0 g", per355: "0.0 g", sub: true },
  { label: "Azúcares añadidos", per100: "0.0 g", per355: "0.0 g", sub: true },
  { label: "Fibra dietética", per100: "0.0 g", per355: "0.0 g", sub: true },
  { label: "Sodio", per100: "5 mg", per355: "19 mg" },
];

export default function NutritionLabel() {
  const reduce = useReducedMotion();
  return (
    <section
      id="nutrimental"
      className="relative bg-ink text-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="mb-7 md:mb-9">
          <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)]">
            Tan clara como su etiqueta.
          </h2>
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
            </div>

            <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-0 text-[0.92rem]">
              <span className="text-[0.7rem] tracking-[0.28em] uppercase text-paper/50 pb-3 border-b border-paper/20">
                Por porción
              </span>
              <span className="text-[0.7rem] tracking-[0.28em] uppercase text-paper/50 pb-3 border-b border-paper/20 text-right">
                100 ml
              </span>
              <span className="text-[0.7rem] tracking-[0.28em] uppercase text-paper/50 pb-3 border-b border-paper/20 text-right">
                355 ml
              </span>

              {rows.map((r) => (
                <div
                  key={r.label}
                  className="contents"
                >
                  <span
                    className={`py-4 border-b border-paper/15 ${
                      r.emphasis ? "text-paper font-semibold" : "text-paper/85"
                    } ${r.sub ? "pl-5 text-paper/65" : ""}`}
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
                    {r.per355}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Disclaimer line */}
        <p className="mt-10 text-[0.78rem] text-paper/60 leading-relaxed max-w-3xl">
          Una vez abierto, consérvese en refrigeración.
        </p>

        {/* Punto de venta */}
        <div className="mt-14 md:mt-16 flex flex-col items-center gap-5">
          <span className="eyebrow text-paper/55">Disponible en Jalisco en</span>
          <Image
            src="/brand/7eleven.png"
            alt="7-Eleven"
            width={1500}
            height={260}
            className="h-9 md:h-11 w-auto"
          />
        </div>
      </div>
    </section>
  );
}
