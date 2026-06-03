"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

const EASE_CINEMA = [0.76, 0, 0.24, 1] as const;

const slide = {
  bg: "/lifestyle/hero-product.jpg",
  headline: ["Proteína refrescante", "y lista para tomar"],
  sub: "20 g de proteína · 500 ml · Sin azúcar ni espesantes.",
};

export default function Hero() {
  const reduce = useReducedMotion();

  const headline = (
    <h1
      className="display text-ink leading-[0.88] mb-6"
      style={{ fontSize: "clamp(2.8rem, 9vw, 9rem)" }}
    >
      {slide.headline.map((line, i) => (
        <motion.span
          key={i}
          className="block"
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduce ? 0 : 0.4 + i * 0.12,
            duration: 0.7,
            ease: EASE_CINEMA,
          }}
        >
          {line}
        </motion.span>
      ))}
    </h1>
  );

  const ctaRow = (
    <motion.div
      className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
      initial={reduce ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduce ? 0 : 0.88, duration: 0.6 }}
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
  );

  return (
    <section id="top" className="relative w-full overflow-hidden bg-paper">
      {/* ─── MÓVIL: botellas arriba, descripción debajo ─── */}
      <div className="md:hidden">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={slide.bg}
            alt="Las dos botellas H2PRO — Limonada y Blueberry"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        </div>
        <div className="px-6 pt-10 pb-16">
          {headline}
          <motion.p
            className="text-ink/72 text-[0.95rem] leading-relaxed max-w-sm"
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.72, duration: 0.7 }}
          >
            {slide.sub}
          </motion.p>
          {ctaRow}
        </div>
      </div>

      {/* ─── DESKTOP: imagen de fondo con overlay editorial ─── */}
      <div className="hidden md:block relative min-h-[100svh]">
        {/* Background image — reencuadrada hacia la derecha y arriba */}
        <div className="absolute inset-0 z-0">
          <Image
            src={slide.bg}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "72% top" }}
          />
        </div>

        {/* Light wash on the left for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(240,237,232,0.78) 0%, rgba(240,237,232,0.42) 32%, rgba(240,237,232,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(240,237,232,0.55) 0%, rgba(240,237,232,0) 100%)",
          }}
        />

        {/* Editorial content */}
        <div className="relative z-20 min-h-[100svh] flex flex-col justify-end px-14 lg:px-20 pb-32 pt-28">
          <div className="max-w-4xl">
            {headline}
            <motion.p
              className="text-ink/72 text-[1rem] leading-relaxed max-w-md"
              initial={reduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.72, duration: 0.7 }}
            >
              {slide.sub}
            </motion.p>
            {ctaRow}
          </div>
        </div>

        {/* Bottom colophon */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        >
          <div className="mx-auto max-w-[1480px] px-10 pb-[4.5rem]">
            <div className="border-t border-ink/15 pt-4 grid grid-cols-12 items-baseline gap-4">
              <span className="col-span-4 text-[0.58rem] tracking-[0.28em] uppercase text-ink/40">
                Ed. 01 — Vol. 01 / N° 01
              </span>
              <span className="col-span-4 text-center">
                <span className="editorial text-ink/55 text-[1rem] leading-snug">
                  Protein Water. Hecho en México.
                </span>
              </span>
              <a
                href="#manifiesto"
                className="col-span-4 pointer-events-auto group flex items-center justify-end gap-3 text-[0.58rem] tracking-[0.28em] uppercase text-ink/50 hover:text-ink/80 transition-colors"
              >
                <span>01 → Quiénes somos</span>
                <ScrollLine />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollLine() {
  return (
    <span
      aria-hidden
      className="relative block h-5 w-px overflow-hidden bg-ink/20"
    >
      <span
        className="absolute inset-x-0 top-0 h-3 bg-current opacity-50"
        style={{ animation: "scrollCue 2.4s ease-in-out infinite" }}
      />
      <style jsx>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          span { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
