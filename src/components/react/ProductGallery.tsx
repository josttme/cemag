// src/components/react/ProductGallery.tsx
import { useState } from 'react';

interface Image {
  url: string;
  alt: string;
}

interface ProductGalleryProps {
  images: Image[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
        Imagen no disponible
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  return (
    // 1. MOBILE FIRST: En móvil es column-reverse (miniaturas abajo), en desktop es row (miniaturas a la izquierda)
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* 2. CONTENEDOR DE MINIATURAS: Horizontal en móvil, vertical en desktop */}
      <aside className="flex flex-row md:flex-col gap-2 w-full md:w-20 md:flex-shrink-0 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-hide pb-2 md:pb-0">
        {images.map((image, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={`${image.url}-${index}`}
              onClick={() => setSelectedIndex(index)}
              onMouseEnter={() => setSelectedIndex(index)}
              aria-label={`Ver ${image.alt}`}
              aria-current={isActive ? 'true' : 'false'}
              className={`relative aspect-square w-16 md:w-full flex-shrink-0 overflow-hidden rounded-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                isActive
                  ? 'border-2 border-slate-900 p-[2px]'
                  : 'border border-slate-200 hover:border-slate-400'
              }`}
            >
              <img
                src={image.url}
                alt="" // El botón ya tiene aria-label, evitamos que el lector de pantalla sea redundante
                className="w-full h-full object-cover rounded-sm"
                loading="lazy" // Las miniaturas sí deben tener lazy loading
                fetchPriority="high"
              />
            </button>
          );
        })}
      </aside>

      {/* 3. IMAGEN PRINCIPAL */}
      <div className="relative group aspect-square flex-grow overflow-hidden rounded-lg bg-[#f6f6f6] border border-slate-100">
        <img
          key={currentImage.url} // El key fuerza a React a re-renderizar la etiqueta al cambiar de imagen
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-contain"
          fetchPriority="high" // OPTIMIZACIÓN LCP (Crítico)
          loading="eager" // OPTIMIZACIÓN LCP (Crítico)
        />
      </div>
    </div>
  );
}
