"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Lifestyle() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-paper py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Editorial caption */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:col-span-4 md:order-1 order-2"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.68rem] tracking-[0.28em] uppercase text-ink/45">
                Interludio
              </span>
              <span className="h-px w-16 bg-ink/20" />
            </div>

            <p className="display text-ink text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05] max-w-[18ch]">
              Hecha para la{" "}
              <span className="editorial text-h2pro font-normal">mesa,</span>{" "}
              no para el botiquín.
            </p>

            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ink/65">
              Donde vivas tu día — la oficina, el café, después del pilates —
              cabe una botella clara con 20 g de proteína. Sin preparar nada,
              sin diluir nada.
            </p>
          </motion.div>

          {/* Photograph */}
          <motion.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:col-span-8 md:order-2 order-1 relative"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/lifestyle/bodegon.jpg"
                alt="Dos botellas H2PRO sobre una mesa de madera con un libro de Annie Leibovitz, lentes y una taza de café"
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                priority={false}
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between text-[0.65rem] tracking-[0.28em] uppercase text-ink/40">
              <span>Producto en contexto</span>
              <span>Ed. 01 · 2026</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
