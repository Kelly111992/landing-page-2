import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhyClear from "./components/WhyClear";
import Manifesto from "./components/Manifesto";
import TactileBanner from "./components/TactileBanner";
import Claims from "./components/Claims";
import ProteinEquivalences from "./components/ProteinEquivalences";
import Flavors from "./components/Flavors";
import NutritionLabel from "./components/NutritionLabel";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Nav />
      <Hero />
      <WhyClear />
      <Manifesto />
      <TactileBanner />
      <Claims />
      <ProteinEquivalences />
      <Flavors />
      <NutritionLabel />
      <Contact />
    </main>
  );
}
