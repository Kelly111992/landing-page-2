import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = readFileSync(
    join(process.cwd(), "public/brand/logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0086d6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          padding: "0 80px",
        }}
      >
        {/* subtle radial glow */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(74,180,240,0.35) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <img
          src={logoSrc}
          style={{ width: 560, objectFit: "contain" }}
          alt="H2PRO"
        />
        <p
          style={{
            color: "#f0ede8",
            fontSize: 32,
            fontFamily: "sans-serif",
            fontWeight: 400,
            letterSpacing: "0.02em",
            margin: 0,
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          20 g de proteína en agua clara · Sin azúcar · Sin lactosa
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
