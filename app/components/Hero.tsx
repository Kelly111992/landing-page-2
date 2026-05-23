"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

const EASE_CINEMA = [0.76, 0, 0.24, 1] as const;

const slide = {
  bg: "/lifestyle/hero-product.jpg",
  eyebrow: "El primer Protein Water · México",
  headline: ["Proteína refrescante", "lista para tomar"],
  sub: "20 g de proteína aislada · 500 ml · Sin azúcar ni espesantes.",
  accent: "limonada" as const,
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-paper"
    >
      {/* ─── Background image (fixed, no animation) ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.bg}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      {/* Light wash on the left for text legibility — paper-tinted, very subtle */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(240,237,232,0.78) 0%, rgba(240,237,232,0.45) 35%, rgba(240,237,232,0) 65%)",
        }}
      />
      {/* Soft bottom lift so the colophon hairline reads */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(240,237,232,0.55) 0%, rgba(240,237,232,0) 100%)",
        }}
      />

{/* ─── Main editorial content ─── */}
      <div className="relative z-20 min-h-[100svh] flex flex-col justify-end px-6 md:px-14 lg:px-20 pb-28 md:pb-32 pt-28">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.span
            className="eyebrow text-ink/60 block mb-5"
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.35, duration: 0.6 }}
          >
            {slide.eyebrow}
          </motion.span>

          {/* Headline */}
          <h1
            className="display text-ink leading-[0.88] mb-6"
            style={{ fontSize: "clamp(3.4rem, 10vw, 9rem)" }}
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

          {/* Subtext */}
          <motion.p
            className="text-ink/72 text-[0.9rem] md:text-[1rem] leading-relaxed max-w-sm md:max-w-md"
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.72, duration: 0.7 }}
          >
            {slide.sub}
          </motion.p>

          {/* CTA row */}
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
        </div>
      </div>

      {/* ─── Bottom colophon ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
      >
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 pb-[4.5rem] md:pb-[4.5rem]">
          <div className="border-t border-ink/15 pt-4 grid grid-cols-12 items-baseline gap-4">
            <span className="col-span-4 text-[0.58rem] tracking-[0.28em] uppercase text-ink/40">
              <span className="hidden md:inline">Ed. 01 — Vol. 01 / N° 01</span>
              <span className="md:hidden">Ed. 01 — N°01</span>
            </span>
            <span className="col-span-4 text-center hidden md:block">
              <span className="editorial text-ink/55 text-[0.9rem] md:text-[1rem] leading-snug">
                Clear Protein. Hecho en México.
              </span>
            </span>
            <a
              href="#manifiesto"
              className="col-span-4 pointer-events-auto group flex items-center justify-end gap-3 text-[0.58rem] tracking-[0.28em] uppercase text-ink/50 hover:text-ink/80 transition-colors"
            >
              <span className="hidden md:inline">01 → Quiénes somos</span>
              <span className="md:hidden">01 →</span>
              <ScrollLine />
            </a>
          </div>
        </div>
      </motion.div>
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
