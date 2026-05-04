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
  title: "H2PRO — Clear Protein. Hecho en México.",
  description:
    "El primer protein water mexicano. 20 g de proteína, sin azúcar, sin lactosa, sin espesantes. Lista para tomar.",
  metadataBase: new URL("https://www.h2pro.fit"),
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
  openGraph: {
    title: "H2PRO — Clear Protein",
    description:
      "20 g de proteína en agua clara. Sin pesadez. Lista para tomar.",
    type: "website",
    locale: "es_MX",
    url: "https://www.h2pro.fit",
    siteName: "H2PRO",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "H2PRO — Clear Protein",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "H2PRO — Clear Protein",
    description:
      "20 g de proteína en agua clara. Sin pesadez. Lista para tomar.",
    images: ["/opengraph-image"],
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
