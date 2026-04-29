"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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
  /** Native aspect ratio of the source photo. Used to avoid cropping. */
  orientation: "portrait" | "landscape";
};

const personas: Persona[] = [
  {
    n: "01",
    name: "Juan Pablo",
    age: "28",
    role: "Financiero",
    moment: "Antes del corre-corre.",
    insight:
      "Necesito algo práctico y ligero que me ayude a cuidar mi salud sin interrumpir mi rutina.",
    routine: ["Oficina + remoto", "Corre por la mañana", "Gym 2× semana"],
    color: "limonada",
    image: "/lifestyle/juan-pablo.jpg",
    imageAlt:
      "Juan Pablo, mexicano de 28 años, en su oficina con una botella H2PRO Limonada sobre el escritorio",
    align: "left",
    orientation: "portrait",
  },
  {
    n: "02",
    name: "Carlos",
    age: "30",
    role: "Ingeniero",
    moment: "Después de cargar la última.",
    insight:
      "Quiero proteína efectiva, que me recupere después del entreno, pero que sea ligera y limpia.",
    routine: ["Crossfit 5× semana", "Bici fines de semana", "Viajes"],
    color: "h2pro",
    image: "/lifestyle/carlos.jpg",
    imageAlt:
      "Carlos, mexicano de 30 años, sentado en una banca de gimnasio tomando H2PRO Blueberry",
    align: "right",
    orientation: "landscape",
  },
  {
    n: "03",
    name: "Ana Sofía",
    age: "34",
    role: "Emprendedora",
    moment: "A media mañana, sin remordimiento.",
    insight:
      "Prefiero pagar más por algo natural y honesto que me cuide por dentro y me haga sentir ligera.",
    routine: ["Pilates", "Hiking", "Cocina saludable"],
    color: "blueberry",
    image: "/lifestyle/ana-sofia.jpg",
    imageAlt:
      "Ana Sofía, mexicana de 34 años, caminando en un patio interior con una botella H2PRO Limonada y un tapete de yoga",
    align: "left",
    orientation: "portrait",
  },
];

const colorMap = {
  limonada: { dot: "bg-limonada", text: "text-limonada-deep" },
  h2pro: { dot: "bg-h2pro", text: "text-h2pro-deep" },
  blueberry: { dot: "bg-blueberry", text: "text-blueberry-deep" },
};

export default function Personas() {
  const reduce = useReducedMotion();

  return (
    <section id="para-quien" className="relative bg-paper">
      {/* Section header */}
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <span className="eyebrow text-ink/55">[ 05 ] Para quién</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-ink text-[clamp(2.4rem,5.4vw,4.6rem)] max-w-[18ch]">
              No es para los gritos del gym.{" "}
              <span className="editorial text-h2pro font-normal">
                Es para tu día.
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Three editorial spreads */}
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

  // Portrait photos get a narrower image column (5/6) so the photo doesn't
  // tower over the viewport; landscape photos take a wider column (7/5).
  const imageCol = isPortrait ? "md:col-span-5" : "md:col-span-7";
  const textCol = isPortrait ? "md:col-span-6" : "md:col-span-5";

  // Native aspect ratios — match each source photo to avoid object-cover crops.
  const aspectClass = isPortrait
    ? "aspect-[4/5]"
    : "aspect-[3/2]";

  return (
    <article
      className={`relative border-b border-ink/10 ${
        index % 2 === 1 ? "bg-paper-warm" : "bg-paper"
      }`}
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Image */}
          <motion.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${imageCol} relative ${
              isLeft ? "md:order-1" : "md:order-2"
            }`}
          >
            <div className={`relative ${aspectClass} w-full overflow-hidden`}>
              <Image
                src={persona.image}
                alt={persona.imageAlt}
                fill
                sizes={
                  isPortrait
                    ? "(max-width: 768px) 100vw, 42vw"
                    : "(max-width: 768px) 100vw, 58vw"
                }
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between text-[0.65rem] tracking-[0.28em] uppercase text-ink/40">
              <span className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                Perfil {persona.n}
              </span>
              <span>{persona.moment}</span>
            </figcaption>
          </motion.figure>

          {/* Text */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${textCol} ${
              isLeft ? "md:order-2" : "md:order-1"
            }`}
          >
            <div className={`flex items-baseline justify-between mb-8`}>
              <span
                className={`text-[0.68rem] tracking-[0.3em] uppercase ${c.text}`}
              >
                Perfil {persona.n}
              </span>
              <span className="text-[0.65rem] tracking-[0.28em] uppercase text-ink/40">
                {persona.age} años
              </span>
            </div>

            <h3 className="display text-ink text-[clamp(2.6rem,4.8vw,3.8rem)] leading-[0.95]">
              {persona.name}
            </h3>
            <p className="mt-3 text-[0.95rem] text-ink/55 tracking-wide">
              {persona.role}
            </p>

            <p className="editorial text-ink text-[clamp(1.4rem,2.2vw,1.8rem)] mt-10 leading-snug">
              &ldquo;{persona.insight}&rdquo;
            </p>

            <div className="mt-12 pt-6 border-t border-ink/15">
              <span className="text-[0.65rem] tracking-[0.3em] uppercase text-ink/40 block mb-4">
                Su rutina
              </span>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {persona.routine.map((tag, j) => (
                  <li
                    key={tag}
                    className="flex items-baseline gap-2 text-[0.85rem] text-ink/75"
                  >
                    <span
                      className={`text-[0.6rem] tracking-[0.24em] uppercase ${c.text} tabular-nums`}
                    >
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
