import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhyClear from "./components/WhyClear";
import Manifesto from "./components/Manifesto";
import TactileBanner from "./components/TactileBanner";
import Claims from "./components/Claims";
import ProteinEquivalences from "./components/ProteinEquivalences";
import Flavors from "./components/Flavors";
import NutritionLabel from "./components/NutritionLabel";
import QuienesSomos from "./components/QuienesSomos";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-paper focus:text-[0.74rem] focus:tracking-[0.18em] focus:uppercase focus:ring-2 focus:ring-h2pro"
      >
        Saltar al contenido
      </a>
      <Nav />
      <Hero />
      <WhyClear />
      <Manifesto />
      <TactileBanner />
      <Claims />
      <ProteinEquivalences />
      <Flavors />
      <NutritionLabel />
      <QuienesSomos />
      <Contact />
    </main>
  );
}
