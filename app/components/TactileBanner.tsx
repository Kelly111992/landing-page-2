"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function TactileBanner() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Producto" className="relative bg-paper overflow-hidden">
      <motion.figure
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/7]">
          <Image
            src="/lifestyle/hero-product.jpg"
            alt="Las dos botellas H2PRO — Limonada y Blueberry — en composición editorial con condensación y fruta fresca"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,14,18,0.75) 0%, rgba(10,14,18,0.4) 50%, transparent 100%), linear-gradient(to right, rgba(10,14,18,0.65) 0%, rgba(10,14,18,0.2) 55%, transparent 80%)",
            }}
          />

          {/* Texto editorial */}
          <div className="absolute inset-0 flex items-end md:items-center px-6 md:px-16 lg:px-20 pb-6 md:pb-0 max-w-xl">
            <div>
              <span className="eyebrow text-paper/50 block mb-4">
                Una vuelta de tapa
              </span>
              <p
                className="display text-paper leading-[0.94]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
              >
                <span className="editorial font-normal text-h2pro-glow">
                  Sin diluir,
                </span>{" "}
                sin shake,{" "}
                <br className="hidden md:block" />
                sin pretexto.
              </p>
              <p className="mt-5 text-paper/55 text-[0.88rem] leading-relaxed max-w-xs">
                20 g de proteína aislada en 500 ml de agua clara. Lista cuando tú lo estés.
              </p>
            </div>
          </div>
        </div>

        <figcaption className="mx-auto max-w-[1480px] px-6 md:px-10 mt-4 flex items-baseline justify-between text-[0.62rem] tracking-[0.28em] uppercase text-ink/40">
          <span>Limonada · Blueberry</span>
          <span>500 ml · 20 g · listo</span>
        </figcaption>
      </motion.figure>
    </section>
  );
}
