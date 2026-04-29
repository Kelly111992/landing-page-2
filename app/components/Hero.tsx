"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PAPER_GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  const reveal = (delay = 0, y = 30) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-paper"
    >
      {/* Split background — two vertical halves */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div
          className="relative"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(244,224,77,0.55) 0%, rgba(244,224,77,0.18) 35%, rgba(250,251,248,1) 75%)",
          }}
        >
          <div
            className="absolute inset-y-0 right-0 w-[1px] bg-ink/10"
            aria-hidden
          />
        </div>
        <div
          className="relative"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(91,111,184,0.42) 0%, rgba(91,111,184,0.14) 38%, rgba(245,247,248,1) 78%)",
          }}
        />
      </div>

      {/* Editorial paper grain — barely perceptible */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply z-[1]"
        style={{ backgroundImage: PAPER_GRAIN, backgroundSize: "240px 240px" }}
      />

      {/* Vertical edge wordmark — left spine */}
      <div
        aria-hidden
        className="hidden md:block absolute top-1/2 left-4 lg:left-6 z-20 pointer-events-none origin-center"
        style={{ transform: "translateY(-50%) rotate(-90deg)" }}
      >
        <span className="block whitespace-nowrap text-[0.62rem] tracking-[0.42em] uppercase text-ink/35 font-medium">
          H2PRO &nbsp;·&nbsp; Clear Protein &nbsp;·&nbsp; Ed. 01 &nbsp;·&nbsp; México 2026
        </span>
      </div>

      {/* Eyebrow tags top corners — hidden on mobile to avoid collision */}
      <motion.div
        {...reveal(0.4, -8)}
        className="hidden md:block absolute top-28 left-16 z-20"
      >
        <span className="eyebrow text-limonada-deep">Sabor 01 · Limonada</span>
      </motion.div>
      <motion.div
        {...reveal(0.5, -8)}
        className="hidden md:block absolute top-28 right-10 z-20 text-right"
      >
        <span className="eyebrow text-blueberry-deep">
          Sabor 02 · Blueberry
        </span>
      </motion.div>

      {/* Two bottle floats — parallax (reduced-motion safe) */}
      <motion.div
        style={{ y: yLeft }}
        className="absolute left-0 top-[8%] bottom-[10%] w-1/2 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          {...reveal(0.2, 60)}
          className="relative w-[70%] max-w-[440px] aspect-[3/5]"
        >
          <Image
            src="/bottles/bottle-limonada.png"
            alt="H2PRO Limonada 500 ml"
            fill
            priority
            sizes="(max-width: 768px) 50vw, 420px"
            style={{
              objectFit: "contain",
              filter:
                "drop-shadow(0 40px 60px rgba(184,156,31,0.25)) drop-shadow(0 8px 14px rgba(10,14,18,0.18))",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: yRight }}
        className="absolute right-0 top-[8%] bottom-[10%] w-1/2 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          {...reveal(0.35, 80)}
          className="relative w-[70%] max-w-[440px] aspect-[3/5]"
        >
          <Image
            src="/bottles/bottle-blueberry.png"
            alt="H2PRO Blueberry 500 ml"
            fill
            priority
            sizes="(max-width: 768px) 50vw, 420px"
            style={{
              objectFit: "contain",
              filter:
                "drop-shadow(0 40px 60px rgba(44,58,114,0.28)) drop-shadow(0 8px 14px rgba(10,14,18,0.2))",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Center editorial copy */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 md:pb-36 pointer-events-none"
      >
        <motion.span
          {...reveal(0.1, 12)}
          className="eyebrow text-ink/55 mb-6"
        >
          El primer Protein Water · Hecho en México
        </motion.span>

        <h1 className="display text-ink text-[clamp(2.8rem,8vw,7.4rem)] max-w-[14ch]">
          <motion.span
            {...reveal(0.3, 30)}
            className="block"
          >
            Proteína
          </motion.span>
          <motion.span
            {...reveal(0.5, 30)}
            className="block"
          >
            <span className="editorial text-h2pro font-normal">clara,</span>
          </motion.span>
          <motion.span
            {...reveal(0.7, 30)}
            className="block"
          >
            sin pesadez.
          </motion.span>
        </h1>

        {/* Typographic pause */}
        <motion.div
          {...reveal(0.95, 8)}
          aria-hidden
          className="mt-10 flex items-center gap-3 text-ink/30"
        >
          <span className="block w-1 h-1 rounded-full bg-current" />
          <span className="block w-1 h-1 rounded-full bg-current" />
          <span className="block w-1 h-1 rounded-full bg-current" />
        </motion.div>

        <motion.p
          {...reveal(1.05, 16)}
          className="mt-8 max-w-md text-[0.92rem] md:text-[1rem] leading-relaxed text-ink/70"
        >
          20 g de proteína aislada de suero de leche en 500 ml de agua. Sin
          azúcar. Sin lactosa. Sin espesantes. Lista para tomar.
        </motion.p>

        <motion.div
          {...reveal(1.3, 0)}
          className="mt-8 flex items-center gap-5 pointer-events-auto"
        >
          <a
            href="#sabores"
            className="px-7 py-3.5 rounded-full bg-ink text-paper text-[0.78rem] tracking-[0.22em] uppercase hover:bg-h2pro transition-colors"
          >
            Conoce los sabores
          </a>
          <a
            href="#manifiesto"
            className="text-[0.78rem] tracking-[0.22em] uppercase text-ink/70 hover:text-ink transition-colors flex items-center gap-2"
          >
            <span className="w-8 h-px bg-current" /> Manifiesto
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom colophon — magazine masthead-foot */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
      >
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 pb-7 md:pb-9">
          <div className="border-t border-ink/15 pt-5 grid grid-cols-12 items-baseline gap-4">
            {/* Edition mark */}
            <span className="col-span-4 text-[0.62rem] tracking-[0.28em] uppercase text-ink/45">
              <span className="hidden md:inline">Ed. 01 — Vol. 01 / N° 01</span>
              <span className="md:hidden">Ed. 01 — N°01</span>
            </span>

            {/* Center tagline — italic editorial */}
            <span className="col-span-4 text-center">
              <span className="editorial text-ink/60 text-[0.92rem] md:text-[1.05rem] leading-snug">
                Clear Protein. Hecho en México.
              </span>
            </span>

            {/* Scroll / index indicator */}
            <a
              href="#manifiesto"
              className="col-span-4 pointer-events-auto group flex items-center justify-end gap-3 text-[0.62rem] tracking-[0.28em] uppercase text-ink/55 hover:text-ink transition-colors"
            >
              <span className="hidden md:inline">01 → Manifiesto</span>
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
      className="relative block h-5 w-px overflow-hidden bg-ink/15"
    >
      <span
        className="absolute inset-x-0 top-0 h-3 bg-current opacity-60"
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
