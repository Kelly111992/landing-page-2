"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function TactileBanner() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) =>
    reduce
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.5, delay: 0 },
          viewport: { once: true, margin: "-50px" },
        }
      : {
          initial: { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: "easeOut" as const },
          viewport: { once: true, margin: "-50px" },
        };

  return (
    <section
      aria-label="Apertura"
      className="relative bg-paper overflow-hidden"
    >
      <motion.figure {...reveal(0)} className="relative w-full">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src="/lifestyle/macro-hands.jpg"
            alt="Manos abriendo una botella H2PRO en macro, con condensación visible"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />

          {/* Editorial overlay — left third */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[42%] flex items-center">
            <div className="px-6 md:px-12 lg:px-16 max-w-md">
              <span className="text-[0.62rem] tracking-[0.32em] uppercase text-ink/50 block mb-4">
                Una vuelta de tapa
              </span>
              <p className="display text-ink text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05]">
                <span className="editorial text-h2pro font-normal">
                  Sin diluir,
                </span>{" "}
                sin shake, sin pretexto.
              </p>
            </div>
          </div>
        </div>

        <figcaption className="mx-auto max-w-[1480px] px-6 md:px-10 mt-4 flex items-baseline justify-between text-[0.62rem] tracking-[0.28em] uppercase text-ink/40">
          <span>Apertura · macro</span>
          <span>500 ml · 20 g · listo</span>
        </figcaption>
      </motion.figure>
    </section>
  );
}
