import "./index.css";
import { Composition } from "remotion";
import { NutrientReveal } from "./NutrientReveal";

// 4 stats × 72 frames + 12 transition each + 28 intro + 80 summary = 420 frames = 14s
const TOTAL_FRAMES = 28 + (72 + 12) * 4 + 80; // = 444

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NutrientReveal"
        component={NutrientReveal}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
