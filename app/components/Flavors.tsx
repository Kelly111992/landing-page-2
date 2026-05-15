"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Bottle360Modal from "./Bottle360Modal";
import { spring } from "../lib/springs";

type Flavor = {
  id: string;
  index: string;
  ghostNumeral: string;
  name: string;
  spanish: string;
  bottle: string;
  video: string;
  notes: string[];
  description: string;
  accent: string;
  accentDeep: string;
  align: "left" | "right";
};

const flavors: Flavor[] = [
  {
    id: "limonada",
    index: "Sabor 01",
    ghostNumeral: "01",
    name: "Limonada",
    spanish: "Cítrico fresco",
    bottle: "/bottles/bottle-limonada.png",
    video: "/videos/limonada-360.mp4",
    notes: ["Cáscara de limón", "Acidez ligera", "Final limpio"],
    description:
      "El clásico que abre el apetito y refresca después del entrenamiento. Cítrico nítido, sin notas dulces falsas.",
    accent: "#f4e04d",
    accentDeep: "#b89c1f",
    align: "left",
  },
  {
    id: "blueberry",
    index: "Sabor 02",
    ghostNumeral: "02",
    name: "Blueberry",
    spanish: "Mora silvestre",
    bottle: "/bottles/bottle-blueberry.png",
    video: "/videos/blueberry-360.mp4",
    notes: ["Mora azul", "Ligero toque dulce", "Profundidad violácea"],
    description:
      "Un perfil más redondo, casi de postre. Blueberry de verdad, sin caer en el caramelo artificial.",
    accent: "#7d8fd6",
    accentDeep: "#4659a3",
    align: "right",
  },
];

export default function Flavors() {
  return (
    <section id="sabores" className="relative bg-ink">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <span className="eyebrow text-paper/55">[ 03 ] Sabores</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[16ch]">
              Dos perfiles.{" "}
              <span className="editorial text-h2pro font-normal">
                Una promesa
              </span>{" "}
              de claridad.
            </h2>
          </div>
        </div>
      </div>

      {flavors.map((f, i) => (
        <FlavorBlock key={f.id} flavor={f} position={i + 1} total={flavors.length} />
      ))}
    </section>
  );
}

function FlavorBlock({
  flavor,
  position,
  total,
}: {
  flavor: Flavor;
  position: number;
  total: number;
}) {
  const isLeft = flavor.align === "left";
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Hex → rgba helper for inline alpha tints
  const rgba = (hex: string, a: number) => {
    const m = hex.replace("#", "");
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  return (
    <article
      id={flavor.id}
      className="relative overflow-hidden bg-ink grain"
    >
      {/* ============ DECORATIVE BACKGROUND ============ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft accent halo on the bottle side */}
        <motion.div
          aria-hidden
          className="absolute rounded-full blur-[140px]"
          style={{
            width: "min(820px, 80vw)",
            height: "min(820px, 80vw)",
            background: `radial-gradient(circle, ${rgba(flavor.accent, 0.55)} 0%, ${rgba(flavor.accent, 0.18)} 38%, ${rgba(flavor.accent, 0)} 70%)`,
            top: "50%",
            [isLeft ? "left" : "right"]: "-12%",
          }}
          animate={reduce ? { y: "-50%" } : { y: ["-50%", "-46%", "-50%"] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 9, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Ghost numeral — flavor-tinted, oversized, low opacity */}
        <span
          aria-hidden
          className="absolute select-none font-extrabold"
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "clamp(20rem, 38vw, 42rem)",
            lineHeight: 0.78,
            letterSpacing: "-0.06em",
            color: flavor.accent,
            opacity: 0.045,
            top: "52%",
            transform: "translateY(-50%)",
            [isLeft ? "right" : "left"]: "-4rem",
            whiteSpace: "nowrap",
            zIndex: 1,
          }}
        >
          {flavor.ghostNumeral}
        </span>

        {/* Vertical hairline as quiet anchor */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: isLeft ? "62%" : "38%",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(240,237,232,0.12) 25%, rgba(240,237,232,0.12) 75%, transparent 100%)",
          }}
        />

        {/* Top hairline — bicolor, references flavor */}
        <div className="absolute top-0 left-0 right-0 h-px bg-paper/[0.06]" />
        <div
          aria-hidden
          className="absolute top-0 h-px"
          style={{
            background: flavor.accent,
            width: "12vw",
            maxWidth: "180px",
            [isLeft ? "left" : "right"]: 0,
          }}
        />

        {/* Section counter (top-right metadata) */}
        <div
          className="absolute top-10 md:top-14 right-6 md:right-10 z-10 flex items-center gap-3 text-[0.66rem] tracking-[0.32em] uppercase text-paper/45"
        >
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: flavor.accent }}
          />
          <span>
            {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-24 md:py-36 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* Bottle — clickable to open 360° */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring.gentle, delay: 0.05 }}
          className={`md:col-span-5 relative h-[480px] md:h-[640px] flex items-center justify-center ${
            isLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          {/* Inner accent glow that follows the bottle */}
          <div
            aria-hidden
            className="absolute inset-[14%] rounded-full blur-[80px] opacity-70"
            style={{
              background: `radial-gradient(circle, ${rgba(flavor.accent, 0.32)} 0%, ${rgba(flavor.accent, 0)} 65%)`,
            }}
          />

          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Ver botella ${flavor.name} en 360°`}
            className="group relative w-[72%] max-w-[380px] aspect-[3/5] cursor-pointer"
            whileTap={reduce ? {} : { scale: 0.97 }}
            transition={spring.snappy}
          >
            <motion.div
              animate={reduce ? { y: 0 } : { y: [0, -16, 0] }}
              whileHover={reduce ? {} : { scale: 1.04 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative w-full h-full"
            >
              <Image
                src={flavor.bottle}
                alt={`H2PRO ${flavor.name}`}
                fill
                sizes="(max-width: 768px) 60vw, 380px"
                style={{
                  objectFit: "contain",
                  filter: `drop-shadow(0 60px 80px ${rgba(flavor.accent, 0.16)}) drop-shadow(0 18px 26px rgba(0,0,0,0.55)) drop-shadow(0 4px 8px rgba(0,0,0,0.4))`,
                }}
              />
            </motion.div>

            {/* Persistent tap hint — refined chip */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 flex items-center gap-2 px-4 py-2 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap pointer-events-none border border-paper/15 backdrop-blur-sm bg-ink/40">
              <span
                aria-hidden
                className="inline-block w-1 h-1 rounded-full"
                style={{ background: flavor.accent }}
              />
              <span
                className="text-[0.6rem] tracking-[0.32em] uppercase"
                style={{ color: flavor.accent }}
              >
                Tap · 360°
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: isLeft ? 36 : -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring.gentle, delay: 0.1 }}
          className={`md:col-span-7 ${isLeft ? "md:order-2" : "md:order-1"}`}
        >
          {/* Eyebrow with color swatch */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: flavor.accent,
                boxShadow: `0 0 16px ${rgba(flavor.accent, 0.6)}`,
              }}
            />
            <span className="eyebrow text-paper/55">{flavor.index}</span>
          </div>

          {/* Flavor name — blur-resolve entrance */}
          <motion.h3
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 24, filter: "blur(14px)" }
            }
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reduce ? 0.3 : 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-7 text-paper text-[clamp(3rem,7.2vw,6.8rem)] leading-[0.94]"
          >
            {flavor.name}
          </motion.h3>

          <p
            className="editorial text-[clamp(1.45rem,2.5vw,2.3rem)] mt-2 font-normal"
            style={{ color: flavor.accent }}
          >
            {flavor.spanish}.
          </p>

          {/* Hairline separator with accent dash */}
          <div className="mt-8 mb-7 flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-10"
              style={{ background: flavor.accent }}
            />
            <span aria-hidden className="h-px flex-1 max-w-[280px] bg-paper/15" />
          </div>

          <p className="max-w-md text-[1rem] md:text-[1.05rem] leading-relaxed text-paper/72">
            {flavor.description}
          </p>

          {/* Tasting notes — editorial table */}
          <ul className="mt-12 max-w-lg border-t border-paper/10">
            {flavor.notes.map((note, i) => (
              <motion.li
                key={note}
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, x: isLeft ? 18 : -18 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  ...spring.smooth,
                  delay: reduce ? 0 : 0.15 + i * 0.08,
                }}
                className="flex items-center gap-6 py-4 border-b border-paper/10"
              >
                <span
                  className="text-[0.66rem] tracking-[0.32em] uppercase shrink-0 w-10"
                  style={{ color: flavor.accent }}
                >
                  N·{i + 1}
                </span>
                <span className="text-paper text-[0.95rem] md:text-[1rem]">
                  {note}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Footer row: spec + ghost CTA */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <span className="text-[0.7rem] tracking-[0.3em] uppercase text-paper/55">
              500 ml · 20 g proteína
            </span>

            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full border overflow-hidden"
              style={{
                borderColor: rgba(flavor.accent, 0.45),
                color: flavor.accent,
              }}
              whileHover={reduce ? {} : { scale: 1.03 }}
              whileTap={reduce ? {} : { scale: 0.97 }}
              transition={spring.snappy}
            >
              {/* Hover fill */}
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background: rgba(flavor.accent, 0.12) }}
              />
              <span className="relative text-[0.7rem] tracking-[0.28em] uppercase font-semibold">
                Ver en 360°
              </span>
              <span
                aria-hidden
                className="relative text-base inline-block group-hover:rotate-180 transition-transform duration-700"
              >
                ↻
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Bottle360Modal
        open={open}
        onClose={() => setOpen(false)}
        video={flavor.video}
        flavorName={flavor.name}
        accent={flavor.accent}
      />
    </article>
  );
}
