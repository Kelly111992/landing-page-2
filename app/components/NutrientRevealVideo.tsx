"use client";

export default function NutrientRevealVideo() {
  return (
    <section className="bg-ink py-0 flex justify-center items-center overflow-hidden border-t border-paper/10">
      <div className="w-full max-w-xl aspect-square">
        <video
          src="/videos/nutrient-reveal.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          aria-label="Por qué ahora: +40% dispuestos a probar versiones más saludables (NielsenIQ), 38% decide por beneficios nutrimentales (Alianza por la Salud Alimentaria), +18M hogares consumen funcionales (EXPOANTAD). H2PRO: 1.er protein water hecho en México."
        />
      </div>
    </section>
  );
}
