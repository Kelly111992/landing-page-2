"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";
import Footer from "./Footer";

export default function Contact() {
  const reduce = useReducedMotion();
  return (
    <section
      id="contacto"
      className="relative bg-ink text-paper overflow-hidden grain"
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(0,134,214,0.55) 0%, rgba(0,134,214,0) 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-28 md:py-40">
        <span className="eyebrow text-h2pro-glow">[ 06 ] Hablemos</span>
        <motion.h2
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-6 text-paper text-[clamp(2.6rem,6.4vw,5.6rem)] max-w-[14ch]"
        >
          ¿Distribución,
          <br />
          prensa o
          <br />
          solo curiosidad?
        </motion.h2>
        <p className="mt-8 max-w-md text-paper/70 text-[1rem] md:text-[1.05rem] leading-relaxed">
          Buscamos puntos de venta, gimnasios, hoteles y cafeterías que
          compartan la filosofía. También nos pueden escribir clientes
          finales —les decimos dónde encontrar la botella más cerca.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-paper/15 border border-paper/15 max-w-2xl">
          {[
            { href: "mailto:info@h2pro.fit", label: "Correo", value: "info@h2pro.fit", target: undefined, rel: undefined },
            { href: "https://instagram.com/h2pro.fit", label: "Instagram", value: "@h2pro.fit", target: "_blank", rel: "noopener noreferrer" },
            { href: "https://www.h2pro.fit", label: "Web", value: "www.h2pro.fit", target: undefined, rel: undefined },
          ].map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.target}
              rel={card.rel}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ backgroundColor: "var(--color-h2pro-deep)", y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ...spring.smooth, delay: reduce ? 0 : 0.08 * i }}
              className="group bg-ink p-6"
            >
              <span className="block text-[0.65rem] tracking-[0.3em] uppercase text-paper/45 mb-2">
                {card.label}
              </span>
              <span className="block text-[1.05rem] text-paper group-hover:underline">
                {card.value}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}
