// src/components/react/HeroCarousel.tsx
import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 1. Actualizamos la interfaz para exigir ambas versiones de la imagen
interface Slide {
  id: string;
  mobileImageUrl: string;
  desktopImageUrl: string;
  altText: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-7xl mx-auto group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y  ">
          {slides.map((slide) => (
            // 2. Quitamos el alto fijo en píxeles (h-[400px]) que teníamos antes
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 ">
              {/* 
                3. Arquitectura CSS (Tailwind):
                - aspect-[5/4]: Obliga al contenedor en móviles a ser exactamente 5:4.
                - md:aspect-video: En tablets/desktop (768px o más), cambia la proporción a 16:9.
                Esto previene el "Layout Shift" (que la página salte mientras carga la foto).
              */}
              <picture className="block w-full  md:aspect-video">
                {/* Si la pantalla es 768px o mayor, el navegador usa esta imagen */}
                <source
                  media="(min-width: 768px)"
                  srcSet={slide.desktopImageUrl}
                />

                {/* Fallback obligatorio: Si es móvil o no soporta <picture>, usa esta */}
                <img
                  src={slide.mobileImageUrl}
                  alt={slide.altText}
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>

      {/* Botones (sin cambios) */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 md:flex hidden items-center justify-center"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 md:flex hidden items-center justify-center"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
