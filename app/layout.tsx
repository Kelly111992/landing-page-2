import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "H2Pro protein water",
  description:
    "El primer protein water mexicano. 20 g de proteína, sin azúcar, sin lactosa, sin espesantes. Lista para tomar.",
  metadataBase: new URL("https://landing-propuesta-2.vercel.app"),
  openGraph: {
    title: "H2Pro protein water",
    description:
      "20 g de proteína en agua clara. Sin pesadez. Lista para tomar.",
    type: "website",
    locale: "es_MX",
    url: "https://landing-propuesta-2.vercel.app",
    siteName: "H2PRO",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "H2Pro protein water",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "H2Pro protein water",
    description:
      "20 g de proteína en agua clara. Sin pesadez. Lista para tomar.",
    images: ["/brand/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${manrope.variable} ${instrument.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
