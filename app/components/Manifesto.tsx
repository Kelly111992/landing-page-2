"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { spring } from "../lib/springs";

const EASE = [0.22, 1, 0.36, 1] as const;

// "¿Por qué es clara?" — la explicación de Diego, desglosada en el riel editorial
const whySteps = [
  {
    index: "01",
    label: "Aislada",
    body: "Su proteína es aislada de suero de leche.",
  },
  {
    index: "02",
    label: "Microfiltrada",
    body: "Se eliminan grasas, lactosa y otras partículas que dispersan la luz.",
  },
  {
    index: "03",
    label: "Cristalina",
    body: "El líquido permite el paso libre de la luz. Así interactúan la luz y la materia a escala cuántica.",
  },
];

export default function Manifesto() {
  const reduce = useReducedMotion();
  const bottleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bottleRef,
    offset: ["start end", "end start"],
  });
  const bottleY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-50, 50],
  );

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const line = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.4 : 0.7, ease: EASE },
    },
  };

  return (
    <section
      id="manifiesto"
      className="relative bg-ink text-paper overflow-hidden grain"
    >

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-28 md:pb-40">
        {/* Bloque 1 — ¿Por qué es clara? (copys finales de Diego) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 items-center mb-24 md:mb-36">
          <motion.h2
            className="md:col-span-7 display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring.gentle}
          >
            ¿Por qué es clara?
          </motion.h2>

          <motion.div
            className="md:col-span-5 flex flex-col border-t md:border-t-0 md:border-l border-paper/15 md:pl-10 pt-6 md:pt-0"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {whySteps.map((step, i) => (
              <motion.article
                key={step.label}
                variants={line}
                className={`py-5 md:py-6 ${i > 0 ? "border-t border-paper/15" : ""}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[0.7rem] tracking-[0.28em] uppercase text-paper/55">
                    {step.index}
                  </span>
                  <span className="h-px flex-1 max-w-[60px] bg-paper/20" />
                  <span className="text-[0.7rem] tracking-[0.28em] uppercase text-paper/55">
                    {step.label}
                  </span>
                </div>
                <p className="mt-3 text-[0.95rem] md:text-[1.05rem] leading-relaxed text-paper/75">
                  {step.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Bloque 2 — Manifiesto */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 items-center">
          {/* Main statement — line-by-line reveal */}
          <div className="md:col-span-7">
            <motion.h2
              className="display text-paper text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.22] text-balance"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              aria-label="La proteína no tiene que ser pesada ni quitarte tiempo. Guarda tu shaker, nosotros ya la mezclamos por ti."
            >
              <motion.span className="block" variants={line}>
                La proteína no tiene que ser pesada ni quitarte tiempo.
              </motion.span>
              <motion.span className="block mt-6 md:mt-8" variants={line}>
                Guarda tu shaker, nosotros ya la mezclamos por ti.
              </motion.span>
            </motion.h2>
          </div>

          {/* Botella — parallax con halo, ocupa el lado derecho */}
          <motion.figure
            className="md:col-span-5 relative"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring.gentle}
          >
            {/* Halo frío detrás de la botella */}
            <div
              aria-hidden
              className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full opacity-35 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(74,180,240,0.55) 0%, rgba(74,180,240,0) 70%)",
              }}
            />
            <div
              ref={bottleRef}
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <motion.div
                className="parallax-img"
                style={{
                  y: bottleY,
                  position: "absolute",
                  top: "-15%",
                  bottom: "-15%",
                  left: 0,
                  right: 0,
                }}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 74% 68% at 50% 50%, black 38%, rgba(0,0,0,0.6) 66%, transparent 99%)",
                    maskImage:
                      "radial-gradient(ellipse 74% 68% at 50% 50%, black 38%, rgba(0,0,0,0.6) 66%, transparent 99%)",
                  }}
                >
                  <Image
                    src="/lifestyle/manifesto-float.jpg"
                    alt="Botella H2PRO Blueberry flotando ingrávida entre agua suspendida sobre fondo negro"
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </motion.div>

            </div>
          </motion.figure>
        </div>
      </div>

      {/* Marquee strip — decorativo, oculto a lectores de pantalla */}
      <div
        aria-hidden
        className="relative z-10 border-t border-paper/10 py-6 overflow-hidden whitespace-nowrap"
      >
        <div className="flex gap-12 animate-[shimmer_30s_linear_infinite] text-paper/55 text-[0.78rem] tracking-[0.28em] uppercase">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              <span>Protein Water</span>
              <span>·</span>
              <span>Clean Label</span>
              <span>·</span>
              <span>Hecho en México</span>
              <span>·</span>
              <span>Lista para tomar</span>
              <span>·</span>
              <span>20 g de proteína</span>
              <span>·</span>
              <span>Sin azúcar</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
