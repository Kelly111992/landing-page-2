import type { Transition } from "framer-motion";

export const spring = {
  snappy: { type: "spring", stiffness: 500, damping: 30 } as Transition,
  smooth: { type: "spring", stiffness: 300, damping: 25 } as Transition,
  gentle: { type: "spring", stiffness: 200, damping: 20 } as Transition,
  bouncy: { type: "spring", stiffness: 400, damping: 15 } as Transition,
};
