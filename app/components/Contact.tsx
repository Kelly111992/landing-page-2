"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { spring } from "../lib/springs";
import Footer from "./Footer";

// Web3Forms access key — generado gratis en https://web3forms.com (apuntando a info@h2pro.fit)
const WEB3FORMS_ACCESS_KEY = "fb56be62-6c2c-4a4a-b863-c9d7c10fddd0";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
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

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-paper/15 border border-paper/15 max-w-xl">
              {[
                { href: "mailto:info@h2pro.fit", label: "Correo", value: "info@h2pro.fit", target: undefined, rel: undefined },
                { href: "tel:+523331470485", label: "Teléfono", value: "+52 33 3147 0485", target: undefined, rel: undefined },
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

          {/* Form */}
          <motion.form
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 bg-paper text-ink p-8 md:p-10 self-start"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              setStatus("sending");
              try {
                const res = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `[H2PRO web] ${data.get("intent")} — ${data.get("name")}`,
                    from_name: "H2PRO — Formulario web",
                    name: data.get("name"),
                    email: data.get("email"),
                    negocio: data.get("business"),
                    ciudad: data.get("city"),
                    intencion: data.get("intent"),
                    mensaje: data.get("message"),
                  }),
                });
                if (res.ok) {
                  setStatus("success");
                  form.reset();
                } else {
                  setStatus("error");
                }
              } catch {
                setStatus("error");
              }
            }}
          >
            <span className="eyebrow text-ink/60">Formulario</span>
            <h3 className="display text-ink text-[1.8rem] mt-3 mb-8 leading-tight">
              Cuéntanos qué traes en mente.
            </h3>

            <div className="space-y-5">
              <Field label="Nombre" name="name" required />
              <Field label="Correo" name="email" type="email" required />
              <Field label="Negocio o marca" name="business" />
              <Field label="Ciudad" name="city" />

              <div>
                <label className="block text-[0.65rem] tracking-[0.28em] uppercase text-ink/55 mb-2">
                  Intención
                </label>
                <select
                  name="intent"
                  className="w-full bg-transparent border-b border-ink/30 py-3 text-[0.95rem] outline-none focus:border-h2pro transition-colors"
                  defaultValue="Distribución"
                >
                  <option>Distribución</option>
                  <option>Punto de venta</option>
                  <option>Prensa</option>
                  <option>Cliente final</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.28em] uppercase text-ink/55 mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full bg-transparent border-b border-ink/30 py-3 text-[0.95rem] outline-none focus:border-h2pro transition-colors resize-none"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="mt-10 w-full px-7 py-4 rounded-full bg-ink text-paper text-[0.78rem] tracking-[0.22em] uppercase disabled:opacity-60"
              whileHover={{ scale: 1.02, backgroundColor: "var(--color-h2pro)" }}
              whileTap={{ scale: 0.97 }}
              transition={spring.snappy}
            >
              {status === "sending" ? "Enviando…" : "Enviar →"}
            </motion.button>

            <p className="mt-5 text-[0.78rem] leading-relaxed text-ink/60">
              {status === "success" ? (
                <>
                  ¡Gracias! Recibimos tu mensaje y te respondemos pronto.
                </>
              ) : status === "error" ? (
                <>
                  Hubo un problema al enviar. Escríbenos directo a{" "}
                  <a
                    href="mailto:info@h2pro.fit"
                    className="text-h2pro underline underline-offset-2 hover:text-h2pro-deep"
                  >
                    info@h2pro.fit
                  </a>
                  .
                </>
              ) : (
                <>
                  Te respondemos al correo que nos dejes. También puedes
                  escribirnos directo a{" "}
                  <a
                    href="mailto:info@h2pro.fit"
                    className="text-h2pro underline underline-offset-2 hover:text-h2pro-deep"
                  >
                    info@h2pro.fit
                  </a>
                  .
                </>
              )}
            </p>
          </motion.form>
        </div>
      </div>

      <Footer />
    </section>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[0.65rem] tracking-[0.28em] uppercase text-ink/55 mb-2">
        {label}
        {required && <span className="text-h2pro"> *</span>}
      </label>
      <input
        name={name}
        required={required}
        type={type}
        className="w-full bg-transparent border-b border-ink/30 py-3 text-[0.95rem] outline-none focus:border-h2pro transition-colors"
      />
    </div>
  );
}

