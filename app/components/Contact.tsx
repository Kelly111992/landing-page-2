import Footer from "./Footer";

// La sección intermedia de "Hablemos de distribución y puntos de venta" se
// eliminó. Los accesos directos de Correo e Instagram viven ahora en el Footer.
export default function Contact() {
  return (
    <section id="contacto" className="relative bg-ink text-paper">
      <Footer />
    </section>
  );
}
