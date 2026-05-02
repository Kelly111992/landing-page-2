"use client";

export default function NutrientRevealVideo() {
  return (
    <section className="bg-paper py-0 flex justify-center items-center overflow-hidden border-t border-ice">
      <div className="w-full max-w-xl aspect-square">
        <video
          src="/videos/nutrient-reveal.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          aria-label="Animación de los 4 diferenciadores de H2PRO: 20g proteína, 0g azúcar, 0g lactosa, 0 espesantes"
        />
      </div>
    </section>
  );
}
