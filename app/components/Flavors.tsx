"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

type Flavor = {
  id: string;
  name: string;
  spanish: string;
  bottle: string;
  // PROVISIONAL — composición gráfica de frutas reales (limones / moras)
  // pendiente de entrega por Diego. Va de fondo en lugar de texto.
  fruitBg?: string;
  accent: string;
};

const flavors: Flavor[] = [
  {
    id: "limonada",
    name: "Limonada",
    spanish: "Cítrico fresco",
    bottle: "/bottles/bottle-limonada.png",
    accent: "#f4e04d",
  },
  {
    id: "blueberry",
    name: "Blueberry",
    spanish: "Mora silvestre",
    bottle: "/bottles/bottle-blueberry.png",
    accent: "#7d8fd6",
  },
];

// Hex → rgba helper for inline alpha tints
const rgba = (hex: string, a: number) => {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export default function Flavors() {
  return (
    <section id="sabores" className="relative bg-ink grain overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <span className="eyebrow text-paper/55">[ 03 ] Sabores</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[16ch]">
              Dos perfiles. Una promesa de claridad
            </h2>
          </div>
        </div>
      </div>

      {/* ====== BANNER ÚNICO — ambos sabores, botellas ampliadas ====== */}
      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 pb-28 md:pb-40">
        {/* Hairline central que separa los dos sabores en desktop */}
        <div
          aria-hidden
          className="hidden md:block absolute top-[8%] bottom-[8%] left-1/2 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(240,237,232,0.14) 22%, rgba(240,237,232,0.14) 78%, transparent 100%)",
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          {flavors.map((f, i) => (
            <FlavorPanel key={f.id} flavor={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlavorPanel({ flavor, index }: { flavor: Flavor; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      id={flavor.id}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...spring.gentle, delay: reduce ? 0 : 0.05 + index * 0.12 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Halo de acento del sabor */}
      <div
        aria-hidden
        className="absolute top-[18%] left-1/2 -translate-x-1/2 rounded-full blur-[120px] pointer-events-none"
        style={{
          width: "min(560px, 78vw)",
          height: "min(560px, 78vw)",
          background: `radial-gradient(circle, ${rgba(flavor.accent, 0.5)} 0%, ${rgba(flavor.accent, 0.16)} 40%, ${rgba(flavor.accent, 0)} 70%)`,
        }}
      />

      {/* Botella — ampliada */}
      <div className="relative w-[78%] max-w-[440px] aspect-[3/5]">
        <motion.div
          animate={reduce ? { y: 0 } : { y: [0, -16, 0] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }
          }
          className="relative w-full h-full"
        >
          <Image
            src={flavor.bottle}
            alt={`H2PRO ${flavor.name}`}
            fill
            sizes="(max-width: 768px) 78vw, 440px"
            style={{
              objectFit: "contain",
              filter: `drop-shadow(0 60px 80px ${rgba(flavor.accent, 0.18)}) drop-shadow(0 18px 26px rgba(0,0,0,0.55)) drop-shadow(0 4px 8px rgba(0,0,0,0.4))`,
            }}
          />
        </motion.div>
      </div>

      {/* Nombre del sabor */}
      <div className="relative mt-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-3">
          <span
            aria-hidden
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: flavor.accent,
              boxShadow: `0 0 16px ${rgba(flavor.accent, 0.6)}`,
            }}
          />
        </div>
        <motion.h3
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0.3 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="display text-paper text-[clamp(2.6rem,6vw,5rem)] leading-[0.94]"
        >
          {flavor.name}
        </motion.h3>
        <p
          className="editorial text-[clamp(1.3rem,2.4vw,2rem)] mt-2 font-normal"
          style={{ color: flavor.accent }}
        >
          {flavor.spanish}.
        </p>
      </div>
    </motion.article>
  );
}
