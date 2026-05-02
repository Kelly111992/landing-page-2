"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

const links = [
  { href: "#manifiesto", label: "Manifiesto" },
  { href: "#sabores", label: "Sabores" },
  { href: "#nutrimental", label: "Etiqueta" },
  { href: "#para-quien", label: "Para quién" },
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-paper/85 backdrop-blur-xl border-b border-ink/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 group"
          >
            <span
              className="display text-[1.6rem] md:text-[1.8rem] leading-none text-ink"
              style={{ letterSpacing: "-0.05em" }}
            >
              H<span className="text-h2pro">2</span>PRO
            </span>
            <span className="hidden lg:inline-block text-[0.6rem] tracking-[0.32em] uppercase text-ink/50 mt-1">
              Clear&nbsp;Protein
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-4 lg:gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <motion.a
                  href={l.href}
                  className="text-[0.66rem] lg:text-[0.78rem] tracking-[0.1em] lg:tracking-[0.18em] uppercase text-ink/65 hover:text-ink transition-colors whitespace-nowrap inline-block"
                  whileHover={scrolled ? { x: 2 } : {}}
                  transition={spring.snappy}
                >
                  {l.label}
                </motion.a>
              </li>
            ))}
          </ul>

          <motion.a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-paper text-[0.66rem] lg:text-[0.74rem] tracking-[0.15em] lg:tracking-[0.2em] uppercase whitespace-nowrap"
            whileHover={{ scale: 1.03, backgroundColor: "var(--color-h2pro)" }}
            whileTap={{ scale: 0.97 }}
            transition={spring.snappy}
          >
            Pedidos
            <span aria-hidden>→</span>
          </motion.a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden flex items-center gap-3 text-[0.74rem] tracking-[0.2em] uppercase text-ink"
          >
            <span>{open ? "Cerrar" : "Menú"}</span>
            <span
              aria-hidden
              className="relative w-5 h-3 inline-block"
            >
              <span
                className={`absolute left-0 right-0 h-px bg-ink transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-px bg-ink transition-all duration-300 ${
                  open ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
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
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="block text-center px-7 py-4 rounded-full bg-ink text-paper text-[0.78rem] tracking-[0.22em] uppercase"
                >
                  Pedidos &nbsp;→
                </a>
                <p className="mt-6 text-[0.7rem] tracking-[0.18em] uppercase text-ink/45 text-center">
                  diego@h2pro.fit · @h2pro.fit
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
