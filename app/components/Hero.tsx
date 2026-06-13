"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

const EASE_CINEMA = [0.76, 0, 0.24, 1] as const;

const slide = {
  bg: "/lifestyle/hero-bottles.jpg",
  headline: ["Proteína refrescante", "y lista para tomar"],
  sub: "20 g de proteína · 500 ml · Sin azúcar ni espesantes.",
};

export default function Hero() {
  const reduce = useReducedMotion();

  const headline = (
    <h1
      className="display text-ink leading-[0.95] mb-6 text-balance"
      style={{ fontSize: "clamp(2.7rem, 6.2vw, 5.4rem)" }}
    >
      {slide.headline.map((line, i) => (
        <motion.span
          key={i}
          className="block"
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduce ? 0 : 0.35 + i * 0.12,
            duration: 0.7,
            ease: EASE_CINEMA,
          }}
        >
          {line}
        </motion.span>
      ))}
    </h1>
  );

  const text = (
    <div className="max-w-xl">
      {headline}
      <motion.p
        className="text-ink/70 text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-md"
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.7, duration: 0.7 }}
      >
        {slide.sub}
      </motion.p>
      <motion.div
        className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.85, duration: 0.6 }}
      >
        <motion.a
          href="#sabores"
          className="px-7 py-3.5 rounded-full bg-ink text-paper text-[0.78rem] tracking-[0.18em] uppercase"
          whileHover={reduce ? {} : { scale: 1.03, backgroundColor: "var(--color-h2pro-deep)", color: "var(--color-paper)" }}
          whileTap={reduce ? {} : { scale: 0.97 }}
          transition={spring.snappy}
        >
          Conoce los sabores
        </motion.a>
        <motion.a
          href="#manifiesto"
          className="text-[0.78rem] tracking-[0.18em] uppercase text-ink/65 hover:text-ink transition-colors flex items-center gap-2.5"
          whileHover={reduce ? {} : { x: 4 }}
          transition={spring.snappy}
        >
          <span className="w-7 h-px bg-current" /> Quiénes somos
        </motion.a>
      </motion.div>
    </div>
  );

  // Difuminado vertical para la foto a todo ancho en móvil (funde arriba/abajo)
  const vignetteFull =
    "linear-gradient(to bottom, var(--color-paper) 0%, rgba(240,237,232,0) 16%, rgba(240,237,232,0) 80%, var(--color-paper) 100%)";

  return (
    <section
      id="top"
      tabIndex={-1}
      className="relative w-full overflow-hidden bg-paper outline-none"
    >
      {/* ─── MÓVIL: foto completa arriba, texto debajo ─── */}
      <div className="md:hidden relative">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring.gentle, delay: 0.1 }}
          className="relative w-full pt-14"
        >
          <div className="relative w-full aspect-[1451/1084] overflow-hidden">
            {/* Ken Burns: abre acercada y se aleja lentamente */}
            <motion.div
              className="absolute inset-0"
              initial={reduce ? { scale: 1 } : { scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={slide.bg}
                alt="Las dos botellas H2PRO — Limonada y Blueberry, con limones y moras"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: vignetteFull }} />
          </div>
        </motion.div>
        <div className="px-6 pt-2 pb-16">{text}</div>
      </div>

      {/* ─── DESKTOP: split-screen — texto a la izquierda, foto a sangre ─── */}
      <div className="hidden md:block relative min-h-[100svh]">
        {/* Panel de imagen a sangre (toca borde superior, derecho e inferior) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring.gentle, delay: 0.1 }}
          className="absolute inset-y-0 right-0 left-[40%] lg:left-[44%] overflow-hidden"
        >
          {/* Ken Burns: abre acercada y se aleja lentamente */}
          <motion.div
            className="absolute inset-0"
            initial={reduce ? { scale: 1 } : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={slide.bg}
              alt="Las dos botellas H2PRO — Limonada y Blueberry, con limones y moras"
              fill
              priority
              sizes="60vw"
              style={{ objectFit: "cover", objectPosition: "55% center" }}
            />
          </motion.div>
          {/* Funde el borde izquierdo de la foto con el crema del texto */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[55%] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--color-paper) 0%, rgba(240,237,232,0.85) 30%, rgba(240,237,232,0) 100%)",
            }}
          />
          {/* Funde sutilmente arriba y abajo para integrar con la página */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, var(--color-paper) 0%, rgba(240,237,232,0) 100%)" }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to top, var(--color-paper) 0%, rgba(240,237,232,0) 100%)" }}
          />
        </motion.div>

        {/* Texto a la izquierda, por encima del panel */}
        <div className="relative z-10 min-h-[100svh] flex items-center px-14 lg:px-20 pt-20 pointer-events-none">
          <div className="pointer-events-auto">{text}</div>
        </div>
      </div>
    </section>
  );
}
