"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Bottle360Modal from "./Bottle360Modal";
import { spring } from "../lib/springs";

type Flavor = {
  id: string;
  index: string;
  name: string;
  spanish: string;
  bottle: string;
  video: string;
  notes: string[];
  description: string;
  contextPhoto: string;
  contextAlt: string;
  contextCaption: string;
  contextTime: string;
  bg: string;
  text: string;
  accent: string;
  align: "left" | "right";
};

const flavors: Flavor[] = [
  {
    id: "limonada",
    index: "Sabor 01",
    name: "Limonada",
    spanish: "Cítrico fresco",
    bottle: "/bottles/bottle-limonada.png",
    video: "/videos/limonada-360.mp4",
    notes: ["Cáscara de limón", "Acidez ligera", "Final limpio"],
    description:
      "El clásico que abre el apetito y refresca después del entrenamiento. Cítrico nítido, sin notas dulces falsas.",
    contextPhoto: "/lifestyle/flavor-limonada.jpg",
    contextAlt:
      "Botella H2PRO Limonada sobre una mesa de madera al amanecer con un limón cortado, hielos y una taza de café",
    contextCaption: "Mesa de la mañana",
    contextTime: "07:00 a.m.",
    bg: "linear-gradient(135deg, #fdf6c4 0%, #f4e04d 65%, #d9c130 100%)",
    text: "#1a1505",
    accent: "#7a6510",
    align: "left",
  },
  {
    id: "blueberry",
    index: "Sabor 02",
    name: "Blueberry",
    spanish: "Mora silvestre",
    bottle: "/bottles/bottle-blueberry.png",
    video: "/videos/blueberry-360.mp4",
    notes: ["Mora azul", "Ligero toque dulce", "Profundidad violácea"],
    description:
      "Un perfil más redondo, casi de postre. Blueberry de verdad, sin caer en el caramelo artificial.",
    contextPhoto: "/lifestyle/flavor-blueberry.jpg",
    contextAlt:
      "Botella H2PRO Blueberry sobre una mesa oscura al atardecer con un cuaderno abierto, una pluma y un bowl de moras",
    contextCaption: "Pausa de tarde",
    contextTime: "05:00 p.m.",
    bg: "linear-gradient(135deg, #c9d0e8 0%, #5b6fb8 70%, #3a4a93 100%)",
    text: "#f5f7f8",
    accent: "#cdd5f0",
    align: "right",
  },
];

export default function Flavors() {
  return (
    <section id="sabores" className="relative bg-paper">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <span className="eyebrow text-ink/55">[ 03 ] Sabores</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-ink text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[16ch]">
              Dos perfiles.{" "}
              <span className="editorial text-h2pro font-normal">
                Una promesa
              </span>{" "}
              de claridad.
            </h2>
          </div>
        </div>
      </div>

      {flavors.map((f) => (
        <FlavorBlock key={f.id} flavor={f} />
      ))}
    </section>
  );
}

function FlavorBlock({ flavor }: { flavor: Flavor }) {
  const isLeft = flavor.align === "left";
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <article
      id={flavor.id}
      className="relative overflow-hidden grain"
      style={{ background: flavor.bg, color: flavor.text }}
    >
      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* Bottle — clickable to open 360° */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring.gentle, delay: 0.05 }}
          className={`md:col-span-5 relative h-[460px] md:h-[600px] flex items-center justify-center ${
            isLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          {/* Halo behind */}
          <div
            aria-hidden
            className="absolute inset-[8%] rounded-full blur-3xl opacity-50"
            style={{
              background: isLeft
                ? "radial-gradient(circle, rgba(255,235,120,0.8) 0%, rgba(255,235,120,0) 70%)"
                : "radial-gradient(circle, rgba(180,200,255,0.6) 0%, rgba(180,200,255,0) 70%)",
            }}
          />

          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Ver botella ${flavor.name} en 360°`}
            className="group relative w-[68%] max-w-[360px] aspect-[3/5] cursor-pointer"
            whileTap={reduce ? {} : { scale: 0.97 }}
            transition={spring.snappy}
          >
            <motion.div
              animate={reduce ? { y: 0 } : { y: [0, -14, 0] }}
              whileHover={reduce ? {} : { scale: 1.05 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative w-full h-full"
            >
              <Image
                src={flavor.bottle}
                alt={`H2PRO ${flavor.name}`}
                fill
                sizes="(max-width: 768px) 60vw, 360px"
                style={{
                  objectFit: "contain",
                  filter:
                    "drop-shadow(0 40px 60px rgba(0,0,0,0.28)) drop-shadow(0 8px 14px rgba(0,0,0,0.18))",
                }}
              />
            </motion.div>

            {/* Hover hint */}
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 px-4 py-2 rounded-full text-[0.66rem] tracking-[0.28em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
              style={{
                background: flavor.text,
                color: flavor.bg.includes("#f4e04d") ? "#fdf6c4" : "#3a4a93",
              }}
            >
              Vista 360° ↻
            </span>
          </motion.button>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: isLeft ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring.gentle, delay: 0.1 }}
          className={`md:col-span-7 ${isLeft ? "md:order-2" : "md:order-1"}`}
        >
          <span className="eyebrow" style={{ color: flavor.accent }}>
            {flavor.index}
          </span>

          <h3
            className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]"
            style={{ color: flavor.text }}
          >
            {flavor.name}
          </h3>
          <p
            className="editorial text-[clamp(1.4rem,2.4vw,2.2rem)] mt-1"
            style={{ color: flavor.accent }}
          >
            {flavor.spanish}.
          </p>

          <p
            className="mt-8 max-w-md text-[1rem] md:text-[1.05rem] leading-relaxed"
            style={{ color: flavor.text, opacity: 0.85 }}
          >
            {flavor.description}
          </p>

          <ul className="mt-10 space-y-3">
            {flavor.notes.map((note, i) => (
              <li
                key={note}
                className="flex items-baseline gap-4 text-[0.92rem]"
                style={{ color: flavor.text }}
              >
                <span
                  className="text-[0.68rem] tracking-[0.28em] uppercase shrink-0 w-10"
                  style={{ color: flavor.accent }}
                >
                  N{i + 1}
                </span>
                <span
                  className="border-b w-full pb-3"
                  style={{ borderColor: `${flavor.accent}40` }}
                >
                  {note}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <span
              className="text-[0.7rem] tracking-[0.3em] uppercase"
              style={{ color: flavor.accent }}
            >
              500 ml · 20 g proteína
            </span>
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.72rem] tracking-[0.24em] uppercase"
              style={{
                background: flavor.text,
                color: flavor.bg.includes("#f4e04d") ? "#fdf6c4" : "#cdd5f0",
              }}
              whileHover={reduce ? {} : { scale: 1.04 }}
              whileTap={reduce ? {} : { scale: 0.96 }}
              transition={spring.snappy}
            >
              <span>Ver en 360°</span>
              <span aria-hidden className="text-base">↻</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Contextual editorial photograph */}
      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 pb-20 md:pb-32">
        <motion.figure
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end ${
            isLeft ? "" : "[&>figcaption]:md:order-1"
          }`}
        >
          <div
            className={`relative aspect-[3/2] w-full overflow-hidden md:col-span-9 ${
              isLeft ? "md:order-1" : "md:order-2"
            }`}
          >
            <Image
              src={flavor.contextPhoto}
              alt={flavor.contextAlt}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption
            className={`md:col-span-3 ${
              isLeft ? "md:order-2 md:pl-2" : "md:order-1 md:pr-2"
            }`}
            style={{ color: flavor.text }}
          >
            <div
              className="flex items-center gap-3 text-[0.62rem] tracking-[0.32em] uppercase mb-3"
              style={{ color: flavor.accent }}
            >
              <span className="block h-px w-8 bg-current opacity-50" />
              <span>{flavor.contextTime}</span>
            </div>
            <p
              className="editorial leading-snug text-[clamp(1.2rem,1.8vw,1.5rem)]"
              style={{ color: flavor.text }}
            >
              {flavor.contextCaption}.
            </p>
            <p
              className="mt-2 text-[0.78rem] leading-relaxed opacity-75"
              style={{ color: flavor.text }}
            >
              {flavor.id === "limonada"
                ? "Antes de salir, cuando el día apenas empieza."
                : "El descanso del día. Pluma, libreta, mora."}
            </p>
          </figcaption>
        </motion.figure>
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
