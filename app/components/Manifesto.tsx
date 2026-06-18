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
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: "60%", clipPath: "inset(0 0 100% 0)" },
    show: {
      opacity: 1,
      y: "0%",
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: reduce ? 0.4 : 0.8, ease: EASE },
    },
  };

  return (
    <section
      id="manifiesto"
      className="relative bg-ink text-paper overflow-hidden grain"
    >
      {/* Atmospheric blue gradient blob */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[60vw] h-[60vw] max-w-[820px] max-h-[820px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,134,214,0.6) 0%, rgba(0,134,214,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[640px] max-h-[640px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(91,111,184,0.55) 0%, rgba(91,111,184,0) 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-28 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 items-center">
          {/* Main statement — line-by-line reveal */}
          <div className="md:col-span-7">
            <motion.h2
              className="display text-paper text-[clamp(2.6rem,5.8vw,5.6rem)]"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              aria-label="La proteína no tiene que ser pesada ni quitarte tiempo. Guarda tu shaker, nosotros ya la mezclamos por ti."
            >
              <span className="block overflow-hidden leading-[1.12]">
                <motion.span className="block" variants={line}>
                  La proteína no tiene que
                </motion.span>
              </span>
              <span className="block overflow-hidden leading-[1.12]">
                <motion.span className="block" variants={line}>
                  ser pesada ni quitarte tiempo.
                </motion.span>
              </span>
              <span className="block overflow-hidden leading-[1.12]">
                <motion.span className="block" variants={line}>
                  Guarda tu shaker, nosotros
                </motion.span>
              </span>
              <span className="block overflow-hidden leading-[1.12]">
                <motion.span className="block" variants={line}>
                  ya la mezclamos por ti.
                </motion.span>
              </span>
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
              {/* Respaldo negro que iguala el fondo de la foto y se funde con el
                  bg-ink, para que no se vea la costura entre foto y sección */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 78% 72% at 50% 50%, #000 60%, rgba(0,0,0,0) 96%)",
                }}
              />
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
                      "radial-gradient(ellipse 76% 70% at 50% 50%, black 46%, rgba(0,0,0,0.65) 70%, transparent 94%)",
                    maskImage:
                      "radial-gradient(ellipse 76% 70% at 50% 50%, black 46%, rgba(0,0,0,0.65) 70%, transparent 94%)",
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

              {/* Viñeta que pinta el color de la sección sobre los bordes de la
                  foto: disuelve el recuadro sin importar el fondo de la imagen */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 84% 80% at 50% 50%, transparent 36%, var(--color-ink) 82%)",
                }}
              />
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
