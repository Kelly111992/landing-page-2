"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  align: "left" | "right";
  orientation: "portrait" | "landscape";
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
    align: "left",
    orientation: "landscape",
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
    align: "right",
    orientation: "landscape",
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
    align: "left",
    orientation: "portrait",
  },
];

const colorMap = {
  limonada: { dot: "bg-limonada", text: "text-limonada-deep" },
  h2pro: { dot: "bg-h2pro", text: "text-h2pro-deep" },
  blueberry: { dot: "bg-blueberry", text: "text-blueberry-deep" },
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Personas() {
  const reduce = useReducedMotion();

  return (
    <section id="para-quien" className="relative bg-paper">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring.smooth}
          >
            <span className="eyebrow text-ink/55">[ 05 ] Para quién</span>
          </motion.div>
          <motion.div
            className="md:col-span-8"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...spring.gentle, delay: 0.1 }}
          >
            <h2 className="display text-ink text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[18ch]">
              No es para los gritos del gym.{" "}
              <span className="editorial text-h2pro font-normal">
                Es para tu día.
              </span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-ink/10">
        {personas.map((p, i) => (
          <PersonaSpread key={p.n} persona={p} index={i} reduce={!!reduce} />
        ))}
      </div>
    </section>
  );
}

function PersonaSpread({
  persona,
  index,
  reduce,
}: {
  persona: Persona;
  index: number;
  reduce: boolean;
}) {
  const c = colorMap[persona.color];
  const isLeft = persona.align === "left";
  const isPortrait = persona.orientation === "portrait";

  const imageCol = isPortrait ? "md:col-span-5" : "md:col-span-7";
  const textCol = isPortrait ? "md:col-span-6" : "md:col-span-5";
  const aspectClass = isPortrait ? "aspect-[4/5]" : "aspect-[3/2]";

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30]);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.15 } },
  };

  return (
    <article
      className={`relative border-b border-ink/10 ${index % 2 === 1 ? "bg-paper-warm" : "bg-paper"}`}
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Image — slides from the outside edge */}
          <motion.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring.gentle}
            className={`${imageCol} relative ${isLeft ? "md:order-1" : "md:order-2"}`}
          >
            <div
              ref={imgRef}
              className={`relative ${aspectClass} w-full overflow-hidden`}
            >
              <motion.div
                className="parallax-img"
                style={{
                  y: imageY,
                  position: "absolute",
                  top: "-15%",
                  bottom: "-15%",
                  left: 0,
                  right: 0,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={persona.image}
                    alt={persona.imageAlt}
                    fill
                    sizes={isPortrait ? "(max-width: 768px) 100vw, 42vw" : "(max-width: 768px) 100vw, 58vw"}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              </motion.div>
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between text-[0.65rem] tracking-[0.28em] uppercase text-ink/40">
              <span className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                Perfil {persona.n}
              </span>
              <span>{persona.moment}</span>
            </figcaption>
          </motion.figure>

          {/* Text — slides from the opposite side */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className={`${textCol} ${isLeft ? "md:order-2" : "md:order-1"}`}
          >
            {[
              // render as staggered children
              <div key="meta" className="flex items-baseline justify-between mb-8">
                <span className={`text-[0.68rem] tracking-[0.3em] uppercase ${c.text}`}>
                  Perfil {persona.n}
                </span>
                <span className="text-[0.65rem] tracking-[0.28em] uppercase text-ink/40">
                  {persona.age} años
                </span>
              </div>,

              <div key="name">
                <h3 className="display text-ink text-[clamp(2.6rem,4.8vw,3.8rem)] leading-[0.95]">
                  {persona.name}
                </h3>
                <p className="mt-3 text-[0.95rem] text-ink/55 tracking-wide">{persona.role}</p>
              </div>,

              <p key="insight" className="editorial text-ink text-[clamp(1.4rem,2.2vw,1.8rem)] mt-10 leading-snug">
                &ldquo;{persona.insight}&rdquo;
              </p>,

              <div key="routine" className="mt-12 pt-6 border-t border-ink/15">
                <span className="text-[0.65rem] tracking-[0.3em] uppercase text-ink/40 block mb-4">
                  Su rutina
                </span>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {persona.routine.map((tag, j) => (
                    <li key={tag} className="flex items-baseline gap-2 text-[0.85rem] text-ink/75">
                      <span className={`text-[0.6rem] tracking-[0.24em] uppercase ${c.text} tabular-nums`}>
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>,
            ].map((child, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65, ease: EASE },
                  },
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </article>
  );
}
