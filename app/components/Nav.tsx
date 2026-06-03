"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";
import H2ProLogo from "./H2ProLogo";

const links = [
  { href: "#sabores", label: "Sabores" },
  { href: "#nutrimental", label: "Etiqueta" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // El hero ahora es claro, así que el nav siempre va en tono paper.
  const light = true;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-shadow duration-500 bg-paper/85 border-b border-ink/5 ${
          scrolled ? "shadow-[0_1px_20px_rgba(10,14,18,0.06)]" : ""
        }`}
      >
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            aria-label="H2PRO — Protein Water"
            className={`flex items-center gap-4 group transition-colors duration-500 ${
              light ? "text-ink" : "text-paper"
            }`}
          >
            <H2ProLogo className="h-9 md:h-11 w-auto" colorful={light} />
            <span
              className={`hidden lg:inline-block text-[0.6rem] tracking-[0.32em] uppercase mt-1 transition-colors duration-500 ${
                light ? "text-ink/50" : "text-paper/55"
              }`}
            >
              Protein&nbsp;Water
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-4 lg:gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <motion.a
                  href={l.href}
                  className={`text-[0.66rem] lg:text-[0.78rem] tracking-[0.1em] lg:tracking-[0.18em] uppercase whitespace-nowrap inline-block transition-colors duration-500 ${
                    light
                      ? "text-ink/65 hover:text-ink"
                      : "text-paper/70 hover:text-paper"
                  }`}
                  whileHover={{ x: 2 }}
                  transition={spring.snappy}
                >
                  {l.label}
                </motion.a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`md:hidden flex items-center gap-3 text-[0.74rem] tracking-[0.2em] uppercase transition-colors duration-500 ${
              light ? "text-ink" : "text-paper"
            }`}
          >
            <span>{open ? "Cerrar" : "Menú"}</span>
            <span
              aria-hidden
              className="relative w-5 h-3 inline-block"
            >
              <span
                className={`absolute left-0 right-0 h-px transition-all duration-300 ${
                  light ? "bg-ink" : "bg-paper"
                } ${open ? "top-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 right-0 h-px transition-all duration-300 ${
                  light ? "bg-ink" : "bg-paper"
                } ${open ? "top-1/2 -rotate-45" : "bottom-0"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-paper pt-20"
          >
            <div className="h-full overflow-y-auto px-6 pb-12 flex flex-col">
              <span className="eyebrow text-ink/45 mt-6 mb-2">
                [ ] Navegación
              </span>
              <ul className="mt-2 divide-y divide-ink/10">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={
                      reduce ? { opacity: 0 } : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.05 + i * 0.04,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 group"
                    >
                      <span className="display text-ink text-[2rem] leading-tight">
                        {l.label}
                      </span>
                      <span className="text-[0.65rem] tracking-[0.28em] uppercase text-ink/40 group-hover:text-h2pro transition-colors">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-12">
                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-ink/45 text-center">
                  info@h2pro.fit · @h2pro.fit
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
