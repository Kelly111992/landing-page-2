"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { spring } from "../lib/springs";

// "Solo destapa y disfruta" — atributo Ready-to-Drink, bloque puramente tipográfico
export default function TactileBanner() {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-50, 50]);

  return (
    <section aria-label="Solo destapa y disfruta" className="relative bg-ink overflow-hidden">
      <motion.figure
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={spring.gentle}
        className="relative w-full"
      >
        {/* Imagen ampliada — acción de apertura de la tapa, clara y completa */}
        <div ref={imgRef} className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]">
          <motion.div
            className="parallax-img"
            style={{
              y: imageY,
              position: "absolute",
              top: "-12%",
              bottom: "-12%",
              left: 0,
              right: 0,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/lifestyle/macro-hands.jpg"
                alt="Manos abriendo la tapa de una botella H2PRO — una vuelta y lista para tomar"
                fill
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center 32%" }}
              />
            </div>
          </motion.div>

          {/* Overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(10,14,18,0.78) 0%, rgba(10,14,18,0.4) 50%, transparent 100%), linear-gradient(to right, rgba(10,14,18,0.7) 0%, rgba(10,14,18,0.2) 55%, transparent 80%)",
            }}
          />

          {/* Texto editorial — puramente tipográfico */}
          <div className="absolute inset-0 z-20 flex items-end md:items-center px-6 md:px-16 lg:px-20 pb-8 md:pb-0 max-w-2xl">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...spring.gentle, delay: 0.15 }}
            >
              <span className="eyebrow text-paper/50 block mb-4">
                Solo destapa y disfruta
              </span>
              <p
                className="display text-paper leading-[0.96]"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)" }}
              >
                Sin polvos que disolver,{" "}
                <br className="hidden md:block" />
                sin grumos, sin pretextos
              </p>
              <p className="mt-5 text-paper/65 text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-md">
                20 g de proteína aislada de suero de leche, lista para tomar.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.figure>
    </section>
  );
}
