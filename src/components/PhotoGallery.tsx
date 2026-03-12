import { useState, useCallback, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

import eiffelImg from "@/assets/eiffel-tower.jpg";
import provenceImg from "@/assets/provence-lavender.jpg";
import brittanyImg from "@/assets/brittany-coast.jpg";
import louvreImg from "@/assets/louvre.jpg";
import croissantImg from "@/assets/croissant.jpg";
import versaillesImg from "@/assets/versailles.jpg";
import calanquesImg from "@/assets/calanques.jpg";
import montImg from "@/assets/mont-saint-michel.jpg";
import notreDameImg from "@/assets/notre-dame.jpg";

const photos = [
  { src: eiffelImg, label: "Paris — Eiffel Tower" },
  { src: provenceImg, label: "Provence — Lavender Fields" },
  { src: brittanyImg, label: "Brittany — Atlantic Coast" },
  { src: louvreImg, label: "Paris — The Louvre" },
  { src: croissantImg, label: "French Cuisine — Croissant" },
  { src: versaillesImg, label: "Versailles — Palace" },
  { src: calanquesImg, label: "Provence — Calanques" },
  { src: montImg, label: "Normandy — Mont Saint-Michel" },
  { src: notreDameImg, label: "Paris — Notre-Dame" },
];

const PhotoGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const navigate = useCallback((dir: number) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + photos.length) % photos.length);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, navigate]);

  // Swipe support
  useEffect(() => {
    if (lightbox === null) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) navigate(diff < 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [lightbox, navigate]);

  return (
    <>
      <div className="masonry-grid">
        {photos.map((photo, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div
              className="image-card gold-border-card rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <img src={photo.src} alt={photo.label} className="w-full h-auto object-cover" loading="lazy" />
              <div className="image-card-overlay !items-end">
                <p className="font-body text-sm text-cream font-semibold">{photo.label}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button
            className="absolute top-6 right-6 text-cream text-3xl hover:text-french-gold transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream text-4xl hover:text-french-gold transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream text-4xl hover:text-french-gold transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Next"
          >
            ›
          </button>
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].label}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-cream font-body text-sm">{photos[lightbox].label}</p>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
