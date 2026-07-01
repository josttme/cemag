// src/components/react/ProductConfigurator.tsx
import { useState, useEffect } from 'react';
import type { Product, ProductVariant } from '@lib/data';
import { addCartItem } from '@store/cartStore';

interface Props {
  product: Product;
}

export default function ProductConfigurator({ product }: Props) {
  const [activeVariant, setActiveVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  // EFECTO DE SEGURIDAD (Best Practice):
  // Si el usuario cambia de color, verificamos si el talle que tenía seleccionado
  // sigue teniendo stock en el nuevo color. Si no hay stock, lo deseleccionamos.
  useEffect(() => {
    if (selectedSize) {
      const sizeInNewVariant = activeVariant.inventory.find(
        (i) => i.size === selectedSize
      );
      if (!sizeInNewVariant || sizeInNewVariant.stock === 0) {
        setSelectedSize(null);
      }
    }
  }, [activeVariant, selectedSize]);

  const handleWhatsApp = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    const phone = '5491123456789';
    const message = `Hola Cemag! Me interesa:
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

    addCartItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      colorName: activeVariant.colorName,
      size: selectedSize,
      imageUrl: activeVariant.swatchUrl,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-[1200px] mx-auto">
      {/* --- COLUMNA IZQ: GALERÍA (Se mantiene igual, consume activeVariant.images) --- */}
      <div className="w-full lg:w-[60%] flex flex-col-reverse lg:flex-row gap-4">
        <div className="hidden lg:flex flex-col gap-2 w-16 flex-shrink-0">
          {activeVariant.images.map((img, idx) => (
            <button
              key={idx}
              onMouseEnter={() => setActiveImageIndex(idx)}
              className={`aspect-square w-full rounded-md overflow-hidden border ${
                activeImageIndex === idx
                  ? 'border-slate-900'
                  : 'border-transparent hover:border-slate-300'
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

        <div className="w-full aspect-square bg-[#f6f6f6] rounded-xl overflow-hidden relative">
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

      {/* --- COLUMNA DER: DETALLES Y CONFIGURACIÓN --- */}
      <div className="w-full lg:w-[40%] flex flex-col gap-8 px-4 lg:px-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-medium text-slate-900">
            {product.name}
          </h1>
          <p className="text-base text-slate-500 mt-1 capitalize">
            {product.category}
          </p>
          <p className="text-xl font-medium text-slate-900 mt-4">
            ${product.price.toLocaleString('es-AR')}
          </p>
        </div>

        {/* Variantes (Colores) */}
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
                  setActiveImageIndex(0);
                }}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  activeVariant.id === variant.id
                    ? 'border-slate-900'
                    : 'border-transparent hover:border-slate-300'
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

        {/* Selector de Talles con Validación de Stock */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-sm text-slate-900">
              Selecciona tu talla
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {activeVariant.inventory.map(({ size, stock }) => {
              const isSelected = selectedSize === size;
              const isOutOfStock = stock === 0;

              return (
                <button
                  key={size}
                  disabled={isOutOfStock}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  // Estilos dinámicos: Si no hay stock, lo mostramos gris y tachado
                  className={`py-3 text-sm text-center border rounded-md transition-all ${
                    isOutOfStock
                      ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                      : isSelected
                        ? 'border-slate-900 ring-1 ring-slate-900 text-slate-900 font-medium'
                        : 'border-slate-300 text-slate-700 hover:border-slate-900'
                  }`}
                >
                  {size}
                </button>
              );
            })}
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
            className="w-full bg-slate-900 text-white py-4 rounded-full font-medium hover:bg-slate-800 active:scale-[0.98] transition-all"
          >
            Agregar a la bolsa de compra
          </button>
          <button
            onClick={handleWhatsApp}
            className="w-full bg-white text-slate-900 border border-slate-300 py-4 rounded-full font-medium hover:border-slate-900 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
          >
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

        {/* Ficha Técnica (El valor agregado textil) */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="font-medium text-slate-900 mb-4">
            Detalles de la prenda
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <span className="font-medium text-slate-900">Textil:</span>{' '}
              {product.details.fabric}
            </li>
            <li>
              <span className="font-medium text-slate-900">Fit:</span>{' '}
              {product.details.fit}
            </li>
            {product.details.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
