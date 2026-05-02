import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";

const { fontFamily: manrope } = loadManrope();
const { fontFamily: instrumentSerif } = loadInstrumentSerif();

// H2PRO design tokens
const C = {
  paper: "#f5f7f8",
  ink: "#0a0e12",
  ice: "#d3d9dc",
  h2pro: "#0086d6",
  h2proGlow: "#4ab4f0",
  inkSoft: "#101820",
};

const STATS = [
  { value: 20, unit: "g", label: "proteína whey aislada", color: C.h2pro },
  { value: 0, unit: "g", label: "azúcar añadida", color: C.ink },
  { value: 0, unit: "g", label: "lactosa", color: C.ink },
  { value: 0, unit: "", label: "espesantes", color: C.ink },
];

// Frames per stat card
const STAT_DUR = 72; // 2.4s each
const TRANSITION = 12;
const INTRO_DUR = 28;
const SUMMARY_DUR = 80;

function EyebrowText({ children }: { children: string }) {
  return (
    <span
      style={{
        fontFamily: manrope,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase" as const,
        color: C.ink,
        opacity: 0.45,
      }}
    >
      {children}
    </span>
  );
}

function Intro({ frame }: { frame: number }) {
  const opacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [0, 20], [18, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <EyebrowText>[ 01 ] Composición</EyebrowText>
      <div
        style={{
          marginTop: 20,
          fontFamily: manrope,
          fontWeight: 800,
          fontSize: 72,
          letterSpacing: "-0.04em",
          color: C.ink,
          lineHeight: 0.92,
        }}
      >
        H2P
        <span style={{ color: C.h2pro }}>R</span>O
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: instrumentSerif,
          fontStyle: "italic",
          fontSize: 22,
          color: C.h2pro,
          letterSpacing: "0.01em",
        }}
      >
        clara, honesta, ligera.
      </div>
    </AbsoluteFill>
  );
}

function StatCard({
  stat,
  frame,
  totalDuration,
}: {
  stat: (typeof STATS)[0];
  frame: number;
  totalDuration: number;
}) {
  const { fps } = useVideoConfig();

  // Entry spring
  const progress = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 180, mass: 1 },
  });
  const translateY = interpolate(progress, [0, 1], [56, 0]);

  // Opacity in
  const opacityIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Opacity out
  const opacityOut = interpolate(
    frame,
    [totalDuration - TRANSITION - 4, totalDuration - 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = opacityIn * opacityOut;

  // Number counter (only counts up for non-zero values)
  const numValue =
    stat.value > 0
      ? Math.round(
          interpolate(frame, [8, 48], [0, stat.value], {
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })
        )
      : 0;

  // Underline scale
  const lineScale = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const isHighlight = stat.value > 0;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Number */}
      <div style={{ position: "relative", display: "inline-flex", alignItems: "baseline" }}>
        <span
          style={{
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 200,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: stat.color,
          }}
        >
          {numValue}
        </span>
        {stat.unit && (
          <span
            style={{
              fontFamily: manrope,
              fontWeight: 800,
              fontSize: 80,
              letterSpacing: "-0.04em",
              color: stat.color,
              marginLeft: 8,
              opacity: 0.75,
            }}
          >
            {stat.unit}
          </span>
        )}
      </div>

      {/* Underline */}
      <div
        style={{
          width: 480,
          height: 1,
          backgroundColor: C.ice,
          marginTop: 8,
          marginBottom: 24,
          transformOrigin: "left center",
          transform: `scaleX(${lineScale})`,
        }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: isHighlight ? instrumentSerif : manrope,
          fontStyle: isHighlight ? "italic" : "normal",
          fontSize: isHighlight ? 34 : 28,
          fontWeight: isHighlight ? 400 : 500,
          letterSpacing: isHighlight ? "0.01em" : "0.12em",
          textTransform: isHighlight ? "none" : ("uppercase" as const),
          color: isHighlight ? C.h2pro : C.inkSoft,
          opacity: isHighlight ? 1 : 0.6,
        }}
      >
        {stat.label}
      </div>
    </AbsoluteFill>
  );
}

function SummaryGrid({ frame }: { frame: number }) {
  useVideoConfig();

  const gridItems = STATS.map((stat, i) => {
    const delay = i * 8;
    const itemOpacity = interpolate(frame, [delay, delay + 18], [0, 1], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const itemY = interpolate(frame, [delay, delay + 22], [24, 0], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

    const isHighlight = stat.value > 0;

    return (
      <div
        key={i}
        style={{
          opacity: itemOpacity,
          transform: `translateY(${itemY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 40px",
          borderRight: i % 2 === 0 ? `1px solid ${C.ice}` : "none",
          borderBottom: i < 2 ? `1px solid ${C.ice}` : "none",
        }}
      >
        <div
          style={{
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 64,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            color: stat.value > 0 ? C.h2pro : C.ink,
          }}
        >
          {stat.value}
          {stat.unit}
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: isHighlight ? instrumentSerif : manrope,
            fontStyle: isHighlight ? "italic" : "normal",
            fontSize: isHighlight ? 16 : 12,
            fontWeight: isHighlight ? 400 : 600,
            letterSpacing: isHighlight ? "0.01em" : "0.18em",
            textTransform: isHighlight ? "none" : ("uppercase" as const),
            color: isHighlight ? C.h2pro : C.inkSoft,
            opacity: isHighlight ? 1 : 0.5,
            textAlign: "center",
          }}
        >
          {stat.label}
        </div>
      </div>
    );
  });

  // Eyebrow fade in
  const eyebrowOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Outro fade
  const outroOpacity = interpolate(frame, [SUMMARY_DUR - 20, SUMMARY_DUR - 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: outroOpacity,
      }}
    >
      <div style={{ opacity: eyebrowOpacity, marginBottom: 32 }}>
        <EyebrowText>5 ingredientes · puedes contarlos</EyebrowText>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          border: `1px solid ${C.ice}`,
          width: 640,
        }}
      >
        {gridItems}
      </div>
    </AbsoluteFill>
  );
}

export function NutrientReveal() {
  const frame = useCurrentFrame();

  const introEnd = INTRO_DUR;
  const stat1Start = introEnd;
  const stat2Start = stat1Start + STAT_DUR;
  const stat3Start = stat2Start + STAT_DUR;
  const stat4Start = stat3Start + STAT_DUR;
  const summaryStart = stat4Start + STAT_DUR;

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      {/* Intro */}
      <Sequence from={0} durationInFrames={introEnd + TRANSITION}>
        <Intro frame={frame} />
      </Sequence>

      {/* Stats */}
      {STATS.map((stat, i) => {
        const start = introEnd + i * STAT_DUR;
        return (
          <Sequence key={i} from={start} durationInFrames={STAT_DUR + TRANSITION}>
            <StatCard
              stat={stat}
              frame={frame - start}
              totalDuration={STAT_DUR + TRANSITION}
            />
          </Sequence>
        );
      })}

      {/* Summary grid */}
      <Sequence from={summaryStart} durationInFrames={SUMMARY_DUR}>
        <SummaryGrid frame={frame - summaryStart} />
      </Sequence>
    </AbsoluteFill>
  );
}
