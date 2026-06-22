"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

// "¿Por qué H2PRO es clara?" — primera sección (copys finales de Diego)
export default function WhyClear() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="¿Por qué H2PRO es clara?"
      className="relative bg-ink text-paper overflow-hidden grain"
    >
      {/* Atmósfera cristalina — luz fría que atraviesa el líquido */}
      <div
        aria-hidden
        className="absolute -top-32 left-[10%] w-[55vw] h-[55vw] max-w-[720px] max-h-[720px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(120,200,255,0.45) 0%, rgba(120,200,255,0) 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 items-end">
          <motion.h2
            className="md:col-span-7 display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring.gentle}
          >
            ¿Por qué H2PRO es clara?
          </motion.h2>

          <motion.p
            className="md:col-span-5 text-paper/75 text-[1rem] md:text-[1.15rem] leading-relaxed"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...spring.gentle, delay: reduce ? 0 : 0.2 }}
          >
            H2PRO es clara porque su proteína aislada de suero de leche es
            microfiltrada. Al eliminar grasas, lactosa y otras partículas que
            dispersan la luz, el líquido permite su paso libremente, dando esa
            apariencia cristalina. Así interactúan la luz y la materia a escala
            cuántica.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
