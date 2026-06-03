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
      style={{ fontSize: "clamp(1.9rem, 5.2vw, 5.2rem)" }}
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
          className="px-7 py-3.5 rounded-full bg-ink text-paper text-[0.76rem] tracking-[0.22em] uppercase"
          whileHover={reduce ? {} : { scale: 1.03, backgroundColor: "var(--color-h2pro)", color: "var(--color-paper)" }}
          whileTap={reduce ? {} : { scale: 0.97 }}
          transition={spring.snappy}
        >
          Conoce los sabores
        </motion.a>
        <motion.a
          href="#manifiesto"
          className="text-[0.76rem] tracking-[0.22em] uppercase text-ink/65 hover:text-ink transition-colors flex items-center gap-2.5"
          whileHover={reduce ? {} : { x: 4 }}
          transition={spring.snappy}
        >
          <span className="w-7 h-px bg-current" /> Quiénes somos
        </motion.a>
      </motion.div>
    </div>
  );

  // Foto de producto — siempre completa (object-contain), nunca debajo del texto
  const photo = (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...spring.gentle, delay: 0.1 }}
      className="relative w-full"
    >
      <div className="relative w-full aspect-[1451/1084]">
        <Image
          src={slide.bg}
          alt="Las dos botellas H2PRO — Limonada y Blueberry, con limones y moras"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="top" className="relative w-full overflow-hidden bg-paper">
      {/* ─── MÓVIL: foto completa arriba, texto debajo ─── */}
      <div className="md:hidden">
        <div className="pt-16">{photo}</div>
        <div className="px-6 pt-8 pb-16">{text}</div>
      </div>

      {/* ─── DESKTOP: texto a la izquierda, foto completa a la derecha ─── */}
      <div className="hidden md:grid min-h-[100svh] grid-cols-12 items-center gap-6 px-14 lg:px-20 pt-20">
        <div className="col-span-5 lg:col-span-5">{text}</div>
        <div className="col-span-7 lg:col-span-7">{photo}</div>
      </div>
    </section>
  );
}
