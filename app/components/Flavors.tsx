"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { spring } from "../lib/springs";
import Bottle360Modal from "./Bottle360Modal";

type Flavor = {
  id: string;
  name: string;
  spanish: string;
  // Foto de producto sobre fondo negro (generada a partir del banner
  // principal): botella centrada, glow del color del sabor y fruta en la base.
  photo: string;
  // Video de la botella girando 360°, se abre en el modal a pantalla completa.
  video: string;
  accent: string;
};

// Desvanecido suave del contorno: el negro de la foto empalma con el bg-ink
const FEATHER_MASK =
  "radial-gradient(ellipse 74% 68% at 50% 50%, #000 58%, rgba(0,0,0,0.6) 80%, transparent 98%)";

const flavors: Flavor[] = [
  {
    id: "limonada",
    name: "Limonada",
    spanish: "Cítrico fresco",
    photo: "/flavors/limonada-dark.jpg",
    video: "/videos/limonada-360.mp4",
    accent: "#f4e04d",
  },
  {
    id: "blueberry",
    name: "Blueberry",
    spanish: "Frutal silvestre",
    photo: "/flavors/blueberry-dark.jpg",
    video: "/videos/blueberry-360.mp4",
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
  // Sabor activo en el modal 360°. Se mantiene durante la animación de salida
  // (controlada por `open`) para que el video no parpadee al cerrar.
  const [active, setActive] = useState<Flavor | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <section id="sabores" className="relative bg-ink grain overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 pt-28 md:pt-40 pb-12 md:pb-16">
        <div className="text-center">
          <h2 className="display text-paper text-[clamp(2.4rem,5.4vw,4.6rem)] mx-auto">
            Dos perfiles. Una promesa de claridad
          </h2>
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
            <FlavorPanel
              key={f.id}
              flavor={f}
              index={i}
              onOpen={(fl) => {
                setActive(fl);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <Bottle360Modal
        open={open}
        onClose={() => setOpen(false)}
        video={active?.video ?? ""}
        flavorName={active?.name ?? ""}
        accent={active?.accent ?? "#0086d6"}
      />
    </section>
  );
}

function FlavorPanel({
  flavor,
  index,
  onOpen,
}: {
  flavor: Flavor;
  index: number;
  onOpen: (flavor: Flavor) => void;
}) {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  // Ken Burns ligado al scroll: la foto entra acercada y se aleja despacio
  // conforme el panel atraviesa el viewport (1.12x → 1x).
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 0.6], [1.12, 1], {
    clamp: true,
  });

  return (
    <motion.article
      id={flavor.id}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...spring.gentle, delay: reduce ? 0 : 0.05 + index * 0.12 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Botella — clickeable, abre la vista 360° a pantalla completa */}
      <button
        type="button"
        onClick={() => onOpen(flavor)}
        aria-label={`Ver la botella de ${flavor.name} girando en 360 grados`}
        className="group relative w-full max-w-[520px] aspect-[2/3] cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        style={{ ["--tw-ring-color" as string]: flavor.accent }}
      >
        {/* Respaldo negro que iguala el fondo de la foto y se funde con el
            bg-ink, para que no se vea la costura entre foto y sección */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 76% 70% at 50% 50%, #000 62%, rgba(0,0,0,0) 98%)",
          }}
        />

        {/* Foto de producto fundida con el fondo */}
        <div
          ref={frameRef}
          className="absolute inset-0 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ WebkitMaskImage: FEATHER_MASK, maskImage: FEATHER_MASK }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ scale: reduce ? 1 : scrollScale }}
          >
            <Image
              src={flavor.photo}
              alt={`Botella H2PRO sabor ${flavor.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>

        {/* Invitación "Girar 360°" — visible en móvil, aparece al hover/focus en desktop */}
        <span
          className="pointer-events-none absolute left-1/2 bottom-[7%] flex -translate-x-1/2 items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur-md transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100"
          style={{
            borderColor: rgba(flavor.accent, 0.5),
            background: "rgba(10,14,18,0.55)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={flavor.accent}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 transition-transform duration-700 group-hover:rotate-180"
            aria-hidden
          >
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 3v4.5h-4.5" />
          </svg>
          <span
            className="text-[0.62rem] font-semibold tracking-[0.28em] uppercase"
            style={{ color: flavor.accent }}
          >
            Girar 360°
          </span>
        </span>
      </button>

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
          className="text-[clamp(1.1rem,2vw,1.5rem)] mt-2 font-medium tracking-wide"
          style={{ color: flavor.accent }}
        >
          {flavor.spanish}.
        </p>
      </div>
    </motion.article>
  );
}
