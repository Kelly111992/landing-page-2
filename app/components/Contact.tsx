"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";
import Footer from "./Footer";

const WA_HREF =
  "https://wa.me/523331470485?text=Hola%20H2PRO%2C%20me%20interesa%20saber%20m%C3%A1s.";

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left — copy */}
          <div className="md:col-span-7">
            <span className="eyebrow text-h2pro-glow">[ 06 ] Hablemos</span>
            <motion.h2
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-paper text-[clamp(2.6rem,6.4vw,5.6rem)]"
            >
              ¿Distribución,
              <br />
              prensa o
              <br />
              <span className="editorial text-h2pro-glow font-normal">
                solo curiosidad?
              </span>
            </motion.h2>
            <p className="mt-8 max-w-md text-paper/70 text-[1rem] md:text-[1.05rem] leading-relaxed">
              Buscamos puntos de venta, gimnasios, hoteles y cafeterías que
              compartan la filosofía. También nos pueden escribir clientes
              finales —les decimos dónde encontrar la botella más cerca.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-paper/15 border border-paper/15 max-w-xl">
              {[
                { href: "mailto:info@h2pro.fit", label: "Correo", value: "info@h2pro.fit", target: undefined, rel: undefined },
                { href: "https://instagram.com/h2pro.fit", label: "Instagram", value: "@h2pro.fit", target: "_blank", rel: "noopener" },
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

          {/* Right — WhatsApp CTA */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 flex flex-col justify-center items-start gap-8 self-center"
          >
            <div>
              <span className="eyebrow text-paper/40">Canal directo</span>
              <h3 className="display text-paper text-[1.8rem] mt-3 leading-tight">
                La forma más rápida de hablar con nosotros.
              </h3>
              <p className="mt-4 text-paper/60 text-[0.95rem] leading-relaxed max-w-sm">
                Escríbenos por WhatsApp y te respondemos en minutos. Sin
                formularios, sin esperas.
              </p>
            </div>

            <motion.a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, backgroundColor: "var(--color-h2pro)" }}
              whileTap={{ scale: 0.97 }}
              transition={spring.snappy}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-paper text-ink text-[0.78rem] tracking-[0.22em] uppercase font-medium"
            >
              {/* WhatsApp glyph */}
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
