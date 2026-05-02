"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const HEADLINE = [
  { text: "La proteína no", style: "" },
  { text: "tenía que ser", style: "" },
  { text: "espesa, lenta", style: "editorial text-h2pro-glow font-normal" },
  { text: "ni complicada.", style: "" },
];

export default function Manifesto() {
  const reduce = useReducedMotion();
  const bottleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bottleRef, offset: ["start end", "end start"] });
  const bottleY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-50, 50]);

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
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "60%", clipPath: "inset(0 0 100% 0)" },
    show: {
      opacity: 1,
      y: "0%",
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: reduce ? 0.4 : 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-28 md:py-44 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        {/* Side label */}
        <motion.div
          className="md:col-span-2 md:pt-2"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="eyebrow text-h2pro-glow">[ 01 ] Manifiesto</span>
        </motion.div>

        {/* Main statement — line-by-line reveal */}
        <div className="md:col-span-7">
          <motion.h2
            className="display text-paper text-[clamp(2.6rem,6.4vw,5.8rem)]"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            aria-label="La proteína no tenía que ser espesa, lenta ni complicada."
          >
            {HEADLINE.map((l, i) => (
              <span key={i} className="block overflow-hidden leading-[1.1]">
                <motion.span
                  className={`block ${l.style}`}
                  variants={line}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.div
            className="mt-12 max-w-xl space-y-5 text-paper/75 text-[1rem] md:text-[1.05rem] leading-relaxed"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, delay: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              Después de 20 años en el mundo de los suplementos naturistas vimos
              que faltaba algo: una bebida proteica clara, ligera y honesta.
              Sin shakes pesados, sin sabores artificiales, sin promesas de
              cuerpo de revista.
            </p>
            <p>
              H2PRO es agua con 20 gramos de proteína. Eso es todo —y eso lo
              cambia todo. Es el primer{" "}
              <span className="editorial text-paper">protein water</span>{" "}
              hecho en México.
            </p>
          </motion.div>
        </div>

        {/* Cinematic bottle photograph — with parallax */}
        <motion.figure
          className="md:col-span-3 relative"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
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
              <div className="relative w-full h-full">
                <Image
                  src="/lifestyle/manifesto.jpg"
                  alt="Botella H2PRO Blueberry sobre piedra negra, iluminada por un haz de luz cálida"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between text-[0.6rem] tracking-[0.28em] uppercase text-paper/40">
            <span>Pieza única</span>
            <span>Ed. 01</span>
          </figcaption>
        </motion.figure>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 border-t border-paper/10 py-6 overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 animate-[shimmer_30s_linear_infinite] text-paper/40 text-[0.78rem] tracking-[0.32em] uppercase">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              <span>Clear Protein</span>
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
