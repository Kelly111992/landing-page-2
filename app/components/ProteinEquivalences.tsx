"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

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

        {/* Anchor — cinematic video reveal */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative"
        >
          <div className="relative w-full overflow-hidden bg-ink" style={{ aspectRatio: "16 / 9" }}>
            <video
              src="/videos/protein-equivalences.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Animación: una botella H2PRO equivale a 20 g de proteína real, lo mismo que 100 g de pechuga de pollo, 100 g de carne de res o 100 g de pescado"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
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
