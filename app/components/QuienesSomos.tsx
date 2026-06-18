"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

// "Quiénes somos" — el manifiesto corporativo que antes vivía como letra
// chiquita en el footer, presentado aquí con peso. Destino del botón del hero.
export default function QuienesSomos() {
  const reduce = useReducedMotion();

  return (
    <section
      id="quienes-somos"
      aria-label="Quiénes somos"
      className="relative bg-ink text-paper overflow-hidden grain"
    >
      {/* Halo frío atmosférico, coherente con las otras secciones oscuras */}
      <div
        aria-hidden
        className="absolute -bottom-40 right-[6%] w-[52vw] h-[52vw] max-w-[680px] max-h-[680px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,134,214,0.5) 0%, rgba(0,134,214,0) 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-28 md:py-40">
        <motion.div
          className="max-w-3xl"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring.gentle}
        >
          <span className="eyebrow text-paper/55 block mb-7">Quiénes somos</span>

          <h2 className="display text-paper text-[clamp(2.6rem,5.8vw,5rem)] leading-[0.95]">
            Lo tenemos claro
          </h2>

          <motion.p
            className="mt-8 max-w-2xl text-paper text-[clamp(1.3rem,2.8vw,2.1rem)] font-medium leading-snug"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...spring.gentle, delay: reduce ? 0 : 0.15 }}
          >
            Nutrir a México con productos disruptivos, creciendo de forma
            responsable con el medio ambiente.
          </motion.p>

          <motion.p
            className="mt-8 max-w-2xl text-paper/70 text-[1rem] md:text-[1.05rem] leading-relaxed"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...spring.gentle, delay: reduce ? 0 : 0.25 }}
          >
            Somos Suplementos Disruptivos, desde Zapopan, Jalisco. Creemos que
            cuidarte debería ser claro y honesto: sin letra chiquita, sin
            promesas de revista. H2PRO es nuestro primer paso. Proteína clara,
            fresca y honesta, hecha en México.
          </motion.p>
        </motion.div>

        {/* Franja de identidad — sello + datos, con regla superior */}
        <motion.div
          className="mt-14 md:mt-20 border-t border-paper/12 pt-8 flex flex-wrap items-center gap-x-8 gap-y-5"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...spring.gentle, delay: reduce ? 0 : 0.35 }}
        >
          <Image
            src="/brand/hecho-en-mexico.png"
            alt="Hecho en México, sello oficial"
            width={56}
            height={56}
            className="w-12 h-12 shrink-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.62rem] tracking-[0.28em] uppercase text-paper/55">
            <li>Hecho en México</li>
            <li aria-hidden className="text-paper/25">·</li>
            <li>Suplementos Disruptivos S.A. de C.V.</li>
            <li aria-hidden className="text-paper/25">·</li>
            <li>Zapopan, Jalisco</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
