// src/components/react/ProductConfigurator.tsx
import { useState } from 'react';
import { addCartItem } from '../../store/cartStore';
import type { Product, ProductVariant } from '../../lib/data';

interface Props {
  product: Product;
}

export default function ProductConfigurator({ product }: Props) {
  // Estados inicializados con la primera variante y sin talle
  const [activeVariant, setActiveVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  // Lógica de WhatsApp
  const handleWhatsApp = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    // Formateamos el mensaje para WhatsApp
    const phone = '1127257046'; // Reemplaza con el número de Cemag
    const message = `Hola Cemag! Me interesa comprar el producto:
🛍️ *${product.name}*
🎨 Color: ${activeVariant.colorName}
📏 Talle: ${selectedSize}
💰 Precio: $${product.price}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    // 2. Reemplazamos el alert() por la función del store
    addCartItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      colorName: activeVariant.colorName,
      size: selectedSize,
      imageUrl: activeVariant.swatchUrl, // Guardamos la miniatura para verla en el carrito
    });

    // Opcional: Feedback visual más profesional que un alert()
    console.log('Ítem agregado al Nanostore global');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-[1200px] mx-auto">
      {/* =========================================
          COLUMNA IZQUIERDA: GALERÍA (ESTILO NIKE)
          ========================================= */}
      <div className="w-full lg:w-[60%] flex flex-col-reverse lg:flex-row gap-4">
        {/* Desktop: Miniaturas Verticales */}
        <div className="hidden lg:flex flex-col gap-2 w-16 flex-shrink-0">
          {activeVariant.images.map((img, idx) => (
            <button
              key={idx}
              onMouseEnter={() => setActiveImageIndex(idx)}
              className={`aspect-square w-full rounded-md overflow-hidden border ${
                activeImageIndex === idx
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Imagen Principal Desktop / Carrusel Mobile */}
        <div className="w-full aspect-square bg-[#f6f6f6] rounded-xl overflow-hidden relative">
          {/* Best Practice: En móviles usamos overflow-x-auto con snap-x 
            para un carrusel nativo súper fluido sin JavaScript adicional.
            En desktop mostramos solo la imagen activa.
          */}
          <div className="flex lg:hidden w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {activeVariant.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover flex-shrink-0 snap-center"
              />
            ))}
          </div>

          <img
            src={activeVariant.images[activeImageIndex].url}
            alt={activeVariant.images[activeImageIndex].alt}
            className="hidden lg:block w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* =========================================
          COLUMNA DERECHA: DETALLES Y CONFIGURACIÓN
          ========================================= */}
      <div className="w-full lg:w-[40%] flex flex-col gap-8 px-4 lg:px-0">
        {/* Header del Producto */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-medium text-slate-900">
            {product.name}
          </h1>
          <p className="text-base text-slate-500 mt-1">{product.category}</p>
          <p className="text-xl font-medium text-slate-900 mt-4">
            ${product.price.toLocaleString('es-AR')}
          </p>
        </div>

        {/* Selector de Variantes (Colores) */}
        <div>
          <p className="font-medium text-sm mb-3">
            Color:{' '}
            <span className="text-slate-500">{activeVariant.colorName}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => {
                  setActiveVariant(variant);
                  setActiveImageIndex(0); // Resetea la imagen al cambiar de color
                }}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  activeVariant.id === variant.id
                    ? 'border-black'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={variant.swatchUrl}
                  alt={variant.colorName}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Talles */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-sm text-slate-900">
              Selecciona tu talla
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={`py-3 text-sm text-center border rounded-md transition-all ${
                  selectedSize === size
                    ? 'border-black ring-1 ring-black text-black font-medium'
                    : 'border-gray-300 text-gray-700 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {sizeError && (
            <p className="text-red-500 text-sm mt-2 font-medium">
              Por favor, selecciona una talla.
            </p>
          )}
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-black/90 active:scale-[0.98] transition-all"
          >
            Agregar a la bolsa de compra
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full bg-white text-black border border-gray-300 py-4 rounded-full font-medium hover:border-black active:scale-[0.98] transition-all flex justify-center items-center gap-2"
          >
            {/* Ícono simple de WhatsApp SVG nativo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Comprar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
