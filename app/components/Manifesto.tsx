"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

const EASE = [0.22, 1, 0.36, 1] as const;

// Palabra negada: serif editorial con un tachado en azul de marca que se
// dibuja después del reveal del titular. Hereda hidden/show del h2 para no
// pelear con su propio observer dentro de los variants del titular.
function Struck({ children, delay }: { children: string; delay: number }) {
  const reduce = useReducedMotion();
  const strike = {
    hidden: { scaleX: reduce ? 1 : 0 },
    show: {
      scaleX: 1,
      transition: {
        duration: reduce ? 0 : 0.5,
        ease: EASE,
        delay: reduce ? 0 : delay,
      },
    },
  };
  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        aria-hidden
        className="absolute left-[-0.06em] right-[-0.06em] top-[55%] h-[0.045em] bg-h2pro-glow origin-left"
        variants={strike}
      />
    </span>
  );
}

export default function Manifesto() {
  const reduce = useReducedMotion();

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

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-28 md:py-44">
        <motion.span
          className="eyebrow text-paper/55 block mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={spring.gentle}
        >
          Manifiesto
        </motion.span>

        {/* Lo que la proteína no tiene que ser, tachado en azul */}
        <motion.h2
          className="display text-paper text-[clamp(2.6rem,7.4vw,7rem)]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          aria-label="La proteína no tiene que ser pesada, lenta ni complicada"
        >
          <span className="block overflow-hidden leading-[1.12]">
            <motion.span className="block" variants={line}>
              La proteína no
            </motion.span>
          </span>
          <span className="block overflow-hidden leading-[1.12]">
            <motion.span className="block" variants={line}>
              tiene que ser
            </motion.span>
          </span>
          {/* Instrument Serif corre óptico más chico: se compensa con 1.14em */}
          <span className="block overflow-hidden leading-[1.02] text-[1.14em]">
            <motion.span
              className="block editorial tracking-[-0.01em]"
              variants={line}
            >
              <Struck delay={1.05}>pesada</Struck>,{" "}
              <Struck delay={1.3}>lenta</Struck>
            </motion.span>
          </span>
          <span className="block overflow-hidden leading-[1.02] text-[1.14em]">
            <motion.span
              className="block editorial tracking-[-0.01em]"
              variants={line}
            >
              ni <Struck delay={1.55}>complicada</Struck>
            </motion.span>
          </span>
        </motion.h2>

        {/* Cierre — el párrafo remata la composición a la derecha */}
        <div className="mt-16 md:mt-24 border-t border-paper/12 pt-10 md:pt-12 grid grid-cols-1 md:grid-cols-12">
          <motion.div
            className="md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...spring.gentle, delay: reduce ? 0 : 0.2 }}
          >
            <p className="text-paper/70 text-[1rem] md:text-[1.05rem] leading-relaxed">
              H2PRO es agua con 20 gramos de proteína. Sin shakes pesados, sin
              sabores artificiales, sin promesas de cuerpo de revista.
            </p>
            <p className="mt-6 editorial text-paper text-[1.4rem] md:text-[1.7rem] leading-snug">
              El primer Protein Water hecho en México.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 border-t border-paper/10 py-6 overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 animate-[shimmer_30s_linear_infinite] text-paper/40 text-[0.78rem] tracking-[0.32em] uppercase">
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
