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
  // Estado para controlar el índice de la imagen principal seleccionada
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Funciones para los botones de navegación (con lógica de loop)
  const showNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Prevenir errores si la lista de imágenes está vacía
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        No hay imágenes
      </div>
    );
  }

  const currentImage = images[selectedIndex];
  return (
    // Cambiamos Grid por Flex (row) para garantizar que estén uno al lado del otro
    <div className="flex flex-row gap-4 w-full">
      {/* 1. COLUMNA DE MINIATURAS (Fija a la izquierda) */}
      <aside className="flex flex-col gap-2 w-16 flex-shrink-0 max-h-[600px] overflow-y-auto scrollbar-hide">
        {images.map((image, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={`${image.url}-${index}`}
              onClick={() => setSelectedIndex(index)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`relative aspect-square w-full overflow-hidden rounded-md transition-all ${
                isActive
                  ? 'border-2 border-black p-[2px]'
                  : 'border border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover rounded-[4px]"
              />
            </button>
          );
        })}
      </aside>

      {/* 2. ÁREA DE IMAGEN PRINCIPAL (Ocupa todo el resto del espacio) */}
      <div className="relative group aspect-square flex-grow overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-contain"
        />
        {/* ... (Aquí dejas los botones <button> de Anterior/Siguiente que ya tenías) ... */}
      </div>
    </div>
  );
}
