"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { spring } from "../lib/springs";

export default function TactileBanner() {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);

  return (
    <section aria-label="Producto" className="relative bg-ink overflow-hidden">
      <motion.figure
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={spring.gentle}
        className="relative w-full"
      >
        {/* Parallax image container */}
        <div ref={imgRef} className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/7]">
          <motion.div
            className="parallax-img"
            style={{
              y: imageY,
              position: "absolute",
              top: "-15%",
              bottom: "-15%",
              left: 0,
              right: 0,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/lifestyle/macro-hands.jpg"
                alt="Manos abriendo la tapa de una botella H2PRO Limonada — una vuelta y lista para tomar"
                fill
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            </div>
          </motion.div>

          {/* Overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(10,14,18,0.75) 0%, rgba(10,14,18,0.4) 50%, transparent 100%), linear-gradient(to right, rgba(10,14,18,0.65) 0%, rgba(10,14,18,0.2) 55%, transparent 80%)",
            }}
          />

          {/* Texto editorial */}
          <div className="absolute inset-0 z-20 flex items-end md:items-center px-6 md:px-16 lg:px-20 pb-6 md:pb-0 max-w-xl">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...spring.gentle, delay: 0.15 }}
            >
              <span className="eyebrow text-paper/50 block mb-4">
                Una vuelta de tapa
              </span>
              <p
                className="display text-paper leading-[0.94]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
              >
                <span className="editorial font-normal text-h2pro-glow">
                  Sin polvos,
                </span>{" "}
                sin shake,{" "}
                <br className="hidden md:block" />
                sin pretexto.
              </p>
              <p className="mt-5 text-paper/55 text-[0.88rem] leading-relaxed max-w-xs">
                20 g de proteína aislada en 500 ml de agua clara. Lista cuando tú lo estés.
              </p>
            </motion.div>
          </div>
        </div>

        <figcaption className="mx-auto max-w-[1480px] px-6 md:px-10 mt-4 flex items-baseline justify-between text-[0.62rem] tracking-[0.28em] uppercase text-paper/40">
          <span>Limonada · Blueberry</span>
          <span>500 ml · 20 g · listo</span>
        </figcaption>
      </motion.figure>
    </section>
  );
}
