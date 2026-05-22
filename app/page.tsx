import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import TactileBanner from "./components/TactileBanner";
import Lifestyle from "./components/Lifestyle";
import Claims from "./components/Claims";
import ProteinEquivalences from "./components/ProteinEquivalences";
import Flavors from "./components/Flavors";
import NutritionLabel from "./components/NutritionLabel";
import Personas from "./components/Personas";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Nav />
      <Hero />
      <Manifesto />
      <TactileBanner />
      <Lifestyle />
      <Claims />
      <ProteinEquivalences />
      <Flavors />
      <NutritionLabel />
      <Personas />
      <Contact />
    </main>
  );
}
