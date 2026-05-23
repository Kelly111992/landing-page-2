"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

type Flavor = {
  id: string;
  index: string;
  ghostNumeral: string;
  name: string;
  spanish: string;
  bottle: string;
  video: string;
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
              Dos perfiles. Una promesa de claridad
            </h2>
          </div>
        </div>
      </div>

      {flavors.map((f, i) => (
        <FlavorBlock key={f.id} flavor={f} position={i + 1} total={flavors.length} />
      ))}

      {/* ====== TEASER CLOSING BEAT ====== */}
      <TeaserLine />
    </section>
  );
}

function TeaserLine() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduce
          ? { duration: 0.3 }
          : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
      }
      className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-20 md:py-28"
    >
      {/* Hairline anchor above the copy */}
      <div aria-hidden className="mb-10 h-px bg-paper/10 max-w-[280px]" />

      <p className="display text-paper text-[clamp(1.55rem,3.2vw,2.8rem)] max-w-[28ch] leading-[1.18]">
        Arrancamos con limonada y blueberry — pero ya hay más en desarrollo
      </p>
    </motion.div>
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

          <div className="relative w-[72%] max-w-[380px] aspect-[3/5]">
            <motion.div
              animate={reduce ? { y: 0 } : { y: [0, -16, 0] }}
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
          </div>
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

          {/* Footer row: spec */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-8"
              style={{ background: flavor.accent }}
            />
            <span className="text-[0.7rem] tracking-[0.3em] uppercase text-paper/55">
              500 ml · 20 g proteína
            </span>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
