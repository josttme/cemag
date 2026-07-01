// src/components/react/HeroCarousel.tsx

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 1. Importamos la interfaz oficial desde nuestro nuevo archivo de marketing
import type { HeroSlide } from '@lib/storefront';

// 2. Actualizamos las props para usar el contrato estricto
interface HeroCarouselProps {
  slides: HeroSlide[];
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

  // Si no hay slides activos, no renderizamos nada (Evita errores si se "apagan" todos)
  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0">
              {/* 
                3. EL ENLACE: Envolvemos la imagen en un tag <a> 
                Usamos aria-label combinando el título para excelente SEO y Accesibilidad.
              */}
              <a
                href={slide.ctaLink}
                className="block w-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-black"
                aria-label={`Ver promoción: ${slide.title}`}
              >
                <picture className="block w-full md:aspect-video">
                  <source
                    media="(min-width: 768px)"
                    srcSet={slide.desktopImageUrl}
                  />
                  <img
                    src={slide.mobileImageUrl}
                    alt={slide.altText}
                    className="w-full h-full object-cover"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación (se mantienen igual) */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 md:flex hidden items-center justify-center focus:opacity-100"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 md:flex hidden items-center justify-center focus:opacity-100"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
