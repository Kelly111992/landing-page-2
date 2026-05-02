"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { spring } from "../lib/springs";

type Props = {
  open: boolean;
  onClose: () => void;
  video: string;
  flavorName: string;
  accent: string;
};

export default function Bottle360Modal({
  open,
  onClose,
  video,
  flavorName,
  accent,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={spring.smooth}
            className="relative w-full max-w-[860px] bg-paper text-ink overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header strip */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-ink/10">
              <div className="flex items-baseline gap-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: accent }}
                />
                <span className="eyebrow text-ink/55">Vista 360°</span>
                <span className="text-[0.92rem] text-ink">
                  H2PRO {flavorName}
                </span>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="text-[0.7rem] tracking-[0.24em] uppercase text-ink/55 hover:text-ink transition-colors flex items-center gap-3"
                whileHover={{ scale: 1.08, x: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={spring.snappy}
              >
                Cerrar
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden
                >
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </motion.button>
            </div>

            {/* Video stage — paper bg matches video's white background */}
            <div
              className="relative aspect-[4/5] md:aspect-[16/10] w-full flex items-center justify-center bg-paper"
              style={{
                background:
                  "radial-gradient(ellipse at center, #ffffff 0%, #f5f7f8 70%)",
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
                className="h-full w-auto max-h-full object-contain"
                style={{
                  filter:
                    "drop-shadow(0 30px 50px rgba(10,14,18,0.18)) drop-shadow(0 8px 14px rgba(10,14,18,0.12))",
                }}
              />

              {/* Decorative corner ticks */}
              <CornerTick className="top-4 left-4" />
              <CornerTick className="top-4 right-4" rotate={90} />
              <CornerTick className="bottom-4 right-4" rotate={180} />
              <CornerTick className="bottom-4 left-4" rotate={270} />
            </div>

            {/* Footer strip */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 md:px-8 py-4 border-t border-ink/10 text-[0.78rem] text-ink/60">
              <span className="tracking-[0.18em] uppercase">
                500 ml · 20 g proteína · PET con tapa rosca 38 mm
              </span>
              <span className="text-[0.7rem] tracking-[0.24em] uppercase text-ink/40">
                Loop 360°
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CornerTick({
  className = "",
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden
      className={`absolute w-5 h-5 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute top-0 left-0 w-full h-px bg-ink/30" />
      <span className="absolute top-0 left-0 w-px h-full bg-ink/30" />
    </span>
  );
}
