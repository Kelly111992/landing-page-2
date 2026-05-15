"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { spring } from "../lib/springs";

type Props = {
  open: boolean;
  onClose: () => void;
  video: string;
  flavorName: string;
  accent: string;
};

export default function Bottle360Modal(props: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<ModalContent {...props} />, document.body);
}

function ModalContent({
  open,
  onClose,
  video,
  flavorName,
  accent,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const circleId = `orbit-${flavorName.toLowerCase()}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          /* Círculo expansivo desde el centro */
          initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 50% 50%)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 50% 50%)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 50% 50%)" }}
          transition={
            reduce
              ? { duration: 0.2 }
              : { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
          }
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{
            /* Studio-lit dark: bg ink + accent-tinted glow + soft floor light from below */
            background: `
              radial-gradient(ellipse 60% 55% at 50% 50%, ${accent}33 0%, ${accent}14 32%, transparent 62%),
              radial-gradient(ellipse 140% 80% at 50% 100%, ${accent}1F 0%, transparent 55%),
              radial-gradient(ellipse 160% 120% at 50% 50%, #101820 0%, #0a0e12 60%, #06080b 100%)
            `,
          }}
          onClick={onClose}
        >
          {/* Hairline grid — premium scientific texture */}
          <div
            aria-hidden
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(240,237,232,0.5) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(240,237,232,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "120px 120px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%)",
            }}
          />

          {/* Grain overlay — film texture */}
          <div
            aria-hidden
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.35] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Stage hairline — bottle "stands on" a thin accent line */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-10"
            style={{
              top: "75%",
              width: "min(46vw, 520px)",
              height: "1px",
              background: `linear-gradient(to right, transparent 0%, ${accent}66 50%, transparent 100%)`,
              boxShadow: `0 0 24px ${accent}40`,
            }}
          />

          {/* Scan line */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 z-10 h-[1px] pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent 0%, ${accent}80 50%, transparent 100%)`,
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              delay: 1,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 6,
            }}
          />

          {/* Esquinas */}
          {(["top-5 left-5", "top-5 right-5 rotate-90", "bottom-5 right-5 rotate-180", "bottom-5 left-5 -rotate-90"] as const).map(
            (pos, i) => (
              <motion.span
                key={i}
                aria-hidden
                className={`absolute w-5 h-5 z-20 pointer-events-none ${pos}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: reduce ? 0 : 0.5 + i * 0.05 }}
              >
                <span className="absolute top-0 left-0 w-full h-px" style={{ background: `${accent}55` }} />
                <span className="absolute top-0 left-0 w-px h-full" style={{ background: `${accent}55` }} />
              </motion.span>
            )
          )}

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, delay: reduce ? 0 : 0.38 }}
            className="relative z-30 flex items-center justify-between px-6 md:px-12 py-5 md:py-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px w-10 origin-left"
                style={{ background: accent }}
              />
              <span className="text-[0.57rem] tracking-[0.44em] uppercase text-white/55">
                H2PRO · Clear Protein
              </span>
              <span
                className="text-[0.67rem] tracking-[0.26em] uppercase font-semibold"
                style={{ color: accent }}
              >
                {flavorName}
              </span>
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Cerrar vista 360°"
              className="group flex items-center gap-3 text-[0.6rem] tracking-[0.38em] uppercase text-white/50 hover:text-white/85 transition-colors"
              whileHover={reduce ? {} : { x: -3 }}
              whileTap={reduce ? {} : { scale: 0.92 }}
              transition={spring.snappy}
            >
              <span>ESC</span>
              <span
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                style={{ borderColor: `${accent}40` }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                  <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" />
                  <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" />
                </svg>
              </span>
            </motion.button>
          </motion.header>

          {/* Escenario del video */}
          <div
            className="relative z-30 flex-1 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Órbita */}
            <motion.div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.42 }}
            >
              <svg viewBox="0 0 400 200" className="w-[min(68vw,500px)]" fill="none" aria-hidden>
                <ellipse
                  cx="200" cy="100" rx="196" ry="92"
                  stroke={accent} strokeWidth="0.5"
                  strokeDasharray="3 7" opacity="0.3"
                />
                <motion.circle
                  cx="200" cy="8" r="3.5"
                  fill={accent} opacity="0.8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                  style={{ transformOrigin: "200px 100px" }}
                />
              </svg>
            </motion.div>

            {/* Video — bottle plays inside; the donut overlay below erases its white backdrop */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -16 }}
              transition={{
                duration: reduce ? 0.2 : 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: reduce ? 0 : 0.18,
              }}
              className="relative"
              style={{
                filter: `drop-shadow(0 30px 50px ${accent}33) drop-shadow(0 10px 18px rgba(0,0,0,0.5))`,
              }}
            >
              <video
                ref={videoRef}
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="max-h-[62vh] w-auto object-contain block"
              />

              {/* Donut eraser — transparent over the bottle silhouette, opaque
                  ink over the video's white backdrop. Center hole is sized to the
                  widest bottle profile. */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(
                    ellipse 19% 50% at 50% 50%,
                    transparent 0%,
                    transparent 72%,
                    rgba(10,14,18,0.6) 84%,
                    #0a0e12 95%,
                    #0a0e12 100%
                  )`,
                }}
              />

              {/* Soft inner rim of flavor color — implies studio rim-light on the bottle */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                  background: `radial-gradient(
                    ellipse 22% 56% at 50% 50%,
                    transparent 60%,
                    ${accent}26 78%,
                    transparent 92%
                  )`,
                }}
              />
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, delay: reduce ? 0 : 0.4 }}
            className="relative z-30 flex items-center justify-between px-6 md:px-12 py-5 md:py-7"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[0.55rem] tracking-[0.42em] uppercase text-white/45">
              500 ml · 20 g proteína · PET tapa rosca 38 mm
            </span>
            <SpinningBadge accent={accent} circleId={circleId} />
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpinningBadge({ accent, circleId }: { accent: string; circleId: string }) {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        aria-hidden
      >
        <defs>
          <path id={circleId} d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <text fontSize="9" letterSpacing="3.5">
          <textPath href={`#${circleId}`} style={{ fill: accent, opacity: 0.45 }}>
            360° · VISTA COMPLETA · H2PRO ·&nbsp;
          </textPath>
        </text>
      </motion.svg>
      <span className="text-[0.72rem] font-bold tracking-tight" style={{ color: accent }}>
        360°
      </span>
    </div>
  );
}
