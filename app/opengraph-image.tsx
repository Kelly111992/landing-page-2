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
          background: "#f0ede8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "0 80px",
        }}
      >
        <img
          src={logoSrc}
          style={{ width: 580, objectFit: "contain" }}
          alt="H2PRO"
        />
        <p
          style={{
            color: "#0086d6",
            fontSize: 28,
            fontFamily: "sans-serif",
            fontWeight: 600,
            letterSpacing: "0.04em",
            margin: 0,
            textAlign: "center",
          }}
        >
          20 g de proteína en agua clara · Sin azúcar · Sin lactosa
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
