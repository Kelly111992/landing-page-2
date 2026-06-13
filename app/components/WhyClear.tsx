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

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-28 md:py-40">
        <motion.div
          className="text-center"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring.gentle}
        >
          <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] mx-auto">
            ¿Por qué H2PRO es clara?
          </h2>

          <motion.p
            className="mt-10 max-w-2xl mx-auto text-paper/75 text-[1rem] md:text-[1.1rem] leading-relaxed"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...spring.gentle, delay: reduce ? 0 : 0.2 }}
          >
            H2PRO es clara porque su proteína aislada de suero de leche es
            microfiltrada. Al eliminar grasas, lactosa y otras partículas que
            dispersan la luz, el líquido permite su paso libremente, dando esa
            apariencia cristalina.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
