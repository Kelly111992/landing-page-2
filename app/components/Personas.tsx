"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

type Persona = {
  n: string;
  name: string;
  age: string;
  role: string;
  moment: string;
  insight: string;
  routine: string[];
  color: "limonada" | "h2pro" | "blueberry";
  image: string;
  imageAlt: string;
};

const personas: Persona[] = [
  {
    n: "01",
    name: "Juan Pablo",
    age: "28",
    role: "Financiero",
    moment: "Antes del corre-corre.",
    insight: "Necesito algo práctico y ligero que me ayude a cuidar mi salud sin interrumpir mi rutina.",
    routine: ["Oficina + remoto", "Corre por la mañana", "Gym 2× semana"],
    color: "limonada",
    image: "/lifestyle/juan-pablo.jpg",
    imageAlt: "Juan Pablo, mexicano de 28 años, trabajando en su computadora con una botella H2PRO Limonada en el escritorio",
  },
  {
    n: "02",
    name: "Carlos",
    age: "30",
    role: "Ingeniero",
    moment: "Después de cargar la última.",
    insight: "Quiero proteína efectiva, que me recupere después del entreno, pero que sea ligera y limpia.",
    routine: ["Crossfit 5× semana", "Bici fines de semana", "Viajes"],
    color: "h2pro",
    image: "/lifestyle/carlos.jpg",
    imageAlt: "Carlos, mexicano de 30 años, sentado en una banca de gimnasio tomando H2PRO Blueberry",
  },
  {
    n: "03",
    name: "Ana Sofía",
    age: "34",
    role: "Emprendedora",
    moment: "A media mañana, sin remordimiento.",
    insight: "Prefiero pagar más por algo natural y honesto que me cuide por dentro y me haga sentir ligera.",
    routine: ["Pilates", "Hiking", "Cocina saludable"],
    color: "blueberry",
    image: "/lifestyle/ana-sofia.jpg",
    imageAlt: "Ana Sofía, mexicana de 34 años, caminando en un patio interior con una botella H2PRO Limonada y un tapete de yoga",
  },
];

const colorMap = {
  limonada: { dot: "bg-limonada", text: "text-limonada-deep", accent: "var(--color-limonada)" },
  h2pro: { dot: "bg-h2pro", text: "text-h2pro", accent: "var(--color-h2pro)" },
  blueberry: { dot: "bg-blueberry", text: "text-blueberry", accent: "var(--color-blueberry)" },
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Personas() {
  const reduce = useReducedMotion();

  return (
    <section id="para-quien" className="relative bg-ink">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-24 md:pb-36">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-28">
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring.smooth}
          >
            <span className="eyebrow text-paper/55">[ 05 ] Para quién</span>
          </motion.div>
          <motion.div
            className="md:col-span-8"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...spring.gentle, delay: 0.1 }}
          >
            <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[18ch]">
              Es para todos.
            </h2>
          </motion.div>
        </div>

        {/* Linear 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-paper/10">
          {personas.map((p, i) => (
            <PersonaCard key={p.n} persona={p} index={i} reduce={!!reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonaCard({
  persona,
  index,
  reduce,
}: {
  persona: Persona;
  index: number;
  reduce: boolean;
}) {
  const c = colorMap[persona.color];

  return (
    <motion.article
      className="bg-ink flex flex-col"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0 : index * 0.1 }}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Image
          src={persona.image}
          alt={persona.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        {/* Overlay with persona number */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <span
            className="display text-paper leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.04em" }}
          >
            {persona.name}
          </span>
          <span
            className="text-[0.6rem] tracking-[0.3em] uppercase font-medium"
            style={{ color: c.accent }}
          >
            {persona.n}
          </span>
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-1 p-8 md:p-10">
        {/* Meta row */}
        <div className="flex items-baseline justify-between mb-6">
          <span className={`text-[0.68rem] tracking-[0.3em] uppercase ${c.text}`}>
            {persona.role}
          </span>
          <span className="text-[0.65rem] tracking-[0.28em] uppercase text-paper/40">
            {persona.age} años
          </span>
        </div>

        {/* Insight quote */}
        <p className="text-paper/85 text-[1rem] md:text-[1.05rem] leading-relaxed flex-1">
          &ldquo;{persona.insight}&rdquo;
        </p>

        {/* Routine tags */}
        <div className="mt-8 pt-6 border-t border-paper/15">
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-paper/40 block mb-4">
            Su rutina
          </span>
          <ul className="flex flex-col gap-2">
            {persona.routine.map((tag, j) => (
              <li key={tag} className="flex items-baseline gap-2 text-[0.85rem] text-paper/75">
                <span className={`text-[0.6rem] tracking-[0.24em] uppercase ${c.text} tabular-nums`}>
                  {String(j + 1).padStart(2, "0")}
                </span>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Moment caption */}
        <div className="mt-6 flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
          <span className="text-[0.68rem] tracking-[0.22em] uppercase text-paper/45">
            {persona.moment}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
