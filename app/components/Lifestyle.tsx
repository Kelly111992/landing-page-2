"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { spring } from "../lib/springs";

export default function Lifestyle() {
  const reduce = useReducedMotion();

  const primaryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: primaryProgress } = useScroll({ target: primaryRef, offset: ["start end", "end start"] });
  const primaryY = useTransform(primaryProgress, [0, 1], reduce ? [0, 0] : [-50, 50]);

  const bodegonRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bodegonProgress } = useScroll({ target: bodegonRef, offset: ["start end", "end start"] });
  const bodegonY = useTransform(bodegonProgress, [0, 1], reduce ? [0, 0] : [-35, 35]);

  const EASE = [0.22, 1, 0.36, 1] as const;
  const reveal = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-50px" }, transition: { duration: 0.4 } }
      : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { ...spring.gentle, delay } };

  return (
    <section className="relative bg-paper py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">

        {/* Top rule + section tag */}
        <motion.div
          {...reveal(0)}
          className="flex items-center justify-between mb-16 md:mb-20 border-t border-ink/10 pt-6"
        >
          <span className="eyebrow text-ink/45">Interludio</span>
          <span className="eyebrow text-ink/30">Ed. 01 · 2026</span>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

          {/* Editorial caption — sticky */}
          <motion.div
            {...reveal(0.1)}
            className="md:col-span-4 md:order-1 order-2 md:pt-8 md:sticky md:top-28"
          >
            <p className="display text-ink text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.02] max-w-[16ch]">
              Hecha para la{" "}
              <span className="editorial text-h2pro font-normal">mesa,</span>{" "}
              no para el botiquín.
            </p>

            <p className="mt-8 max-w-xs text-[0.95rem] leading-relaxed text-ink/65">
              Donde vivas tu día — la oficina, el café, después del pilates —
              cabe una botella clara con 20&nbsp;g de proteína. Sin preparar
              nada, sin diluir nada.
            </p>

            <ul className="mt-10 space-y-3 border-t border-ink/10 pt-8">
              {[
                "20 g proteína aislada",
                "0 g azúcar · 0 g grasa",
                "Sin lactosa · Sin espesantes",
                "Lista para tomar",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  {...reveal(0.3 + i * 0.06)}
                  className="flex items-center gap-3 text-[0.82rem] text-ink/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-h2pro flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Dual-image composition */}
          <div className="md:col-span-8 md:order-2 order-1">

            {/* Primary image — parallax */}
            <motion.figure
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={spring.gentle}
            >
              <div
                ref={primaryRef}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <motion.div
                  className="parallax-img"
                  style={{
                    y: primaryY,
                    position: "absolute",
                    top: "-15%",
                    bottom: "-15%",
                    left: 0,
                    right: 0,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/lifestyle/hero-product.jpg"
                      alt="Las dos botellas H2PRO — Limonada y Blueberry — en composición editorial con agua y fruta fresca"
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                </motion.div>
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between text-[0.62rem] tracking-[0.28em] uppercase text-ink/35">
                <span>Limonada · Blueberry — Los dos sabores</span>
                <span>Fotografía de producto</span>
              </figcaption>
            </motion.figure>

            {/* Secondary row */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">

              {/* Bodegón — with parallax */}
              <motion.figure
                {...reveal(0.15)}
              >
                <div
                  ref={bodegonRef}
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
                  <motion.div
                    className="parallax-img"
                    style={{
                      y: bodegonY,
                      position: "absolute",
                      top: "-15%",
                      bottom: "-15%",
                      left: 0,
                      right: 0,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/lifestyle/bodegon.jpg"
                        alt="Botellas H2PRO sobre una mesa con libro, lentes y taza de café"
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  </motion.div>
                </div>
                <figcaption className="mt-3 text-[0.62rem] tracking-[0.28em] uppercase text-ink/35">
                  Producto en contexto
                </figcaption>
              </motion.figure>

              {/* Pull quote */}
              <motion.blockquote
                {...reveal(0.25)}
                className="pb-2"
              >
                <span className="block text-[2.6rem] leading-none text-ink/10 font-serif select-none mb-3" aria-hidden>
                  "
                </span>
                <p className="editorial text-ink text-[clamp(1.15rem,1.8vw,1.4rem)] leading-snug">
                  Proteína clara, fresca y honesta que cuida tu cuerpo.
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-ink/30" />
                  <span className="text-[0.65rem] tracking-[0.28em] uppercase text-ink/45">
                    Esencia H2PRO
                  </span>
                </footer>
              </motion.blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
