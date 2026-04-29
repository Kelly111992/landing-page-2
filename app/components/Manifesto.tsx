"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function Manifesto() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) =>
    reduce
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.5, delay: 0 },
          viewport: { once: true, margin: "-50px" },
        }
      : {
          initial: { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: "easeOut" as const },
          viewport: { once: true, margin: "-50px" },
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
        <div className="md:col-span-2 md:pt-2">
          <span className="eyebrow text-h2pro-glow">[ 01 ] Manifiesto</span>
        </div>

        {/* Main statement */}
        <motion.div {...reveal(0)} className="md:col-span-7">
          <h2 className="display text-paper text-[clamp(2.6rem,6.4vw,5.8rem)]">
            La proteína no
            <br />
            tenía que ser
            <br />
            <span className="editorial text-h2pro-glow font-normal">
              espesa, lenta
            </span>
            <br />
            ni complicada.
          </h2>
          <div className="mt-12 max-w-xl space-y-5 text-paper/75 text-[1rem] md:text-[1.05rem] leading-relaxed">
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
          </div>
        </motion.div>

        {/* Cinematic bottle photograph on right column */}
        <motion.figure
          {...reveal(0.1)}
          className="md:col-span-3 relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/lifestyle/manifesto.jpg"
              alt="Botella H2PRO Blueberry sobre piedra negra, iluminada por un haz de luz cálida"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between text-[0.6rem] tracking-[0.28em] uppercase text-paper/40">
            <span>Pieza única</span>
            <span>Ed. 01</span>
          </figcaption>
        </motion.figure>
      </div>

      {/* Marquee strip with brand keywords */}
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
