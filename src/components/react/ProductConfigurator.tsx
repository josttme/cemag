// src/components/react/ProductConfigurator.tsx
import { useState, useEffect } from 'react';
import type { Product, ProductVariant } from '@lib/data';
import { buildProductImageUrl } from '@lib/images';

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
    // Validaciones previas (ej. asegurar que hay un talle seleccionado)
    if (!selectedSize) return;

    // 1. Fabricamos la URL miniatura dinámicamente para el carrito
    const cartImageUrl = buildProductImageUrl({
      folder: activeVariant.imageFolder,
      filename: activeVariant.images[0].filename,
      width: 150, // Un tamaño pequeño, perfecto para la vista del carrito
    });

    // 2. Despachamos el ítem al carrito con la URL correcta
    addCartItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      colorName: activeVariant.colorName,
      size: selectedSize,
      imageUrl: cartImageUrl, // <-- EL FIX: Usamos la constante que acabamos de crear
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-[1200px] mx-auto">
      {/* --- COLUMNA IZQ: GALERÍA --- */}
      <div className="w-full lg:w-[60%] flex flex-col-reverse lg:flex-row gap-4">
        {/* Miniaturas (Desktop) */}
        <div className="hidden lg:flex flex-col gap-3 w-20 flex-shrink-0">
          {activeVariant.images.map((img, idx) => (
            <button
              key={idx}
              onMouseEnter={() => setActiveImageIndex(idx)}
              className={`aspect-[4/5] w-full rounded-md overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-slate-900'
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              {/* EL FIX: Agregamos loading="lazy" */}
              <img
                src={buildProductImageUrl({
                  folder: activeVariant.imageFolder,
                  filename: img.filename,
                  width: 150, // El Worker la achica automáticamente en la nube
                })}
                alt={img.alt}
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Imagen Principal */}
        {/* EL FIX ARQUITECTÓNICO: 
          1. aspect-[4/5]: Obliga al contenedor a tener la proporción real de tus fotos (569x700).
          2. lg:max-h-[80vh]: En desktop, la imagen nunca medirá más del 80% del alto de la pantalla.
          3. w-full: Se asegura de usar el espacio disponible sin deformarse.
        */}
        {/* Imagen Principal */}
        <div className="w-full aspect-[4/5] lg:max-h-[80vh] bg-[#f6f6f6] rounded-xl overflow-hidden relative flex items-center justify-center">
          {/* Carrusel Táctil (Mobile) */}
          <div className="flex lg:hidden w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {activeVariant.images.map((img, idx) => {
              // SOLUCIÓN MÓVIL: Construimos la URL dinámica para cada foto del carrusel
              const mobileImageUrl = buildProductImageUrl({
                folder: activeVariant.imageFolder,
                filename: img.filename,
                width: 600, // Optimizamos el tamaño para pantallas móviles
              });

              return (
                <img
                  key={idx}
                  src={mobileImageUrl}
                  alt={img.alt}
                  className="w-full h-full object-cover flex-shrink-0 snap-center"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              );
            })}
          </div>

          {/* Imagen Activa (Desktop) */}
          {(() => {
            // SOLUCIÓN DESKTOP: Obtenemos la imagen del índice activo de forma segura
            const activeImage = activeVariant.images[activeImageIndex];
            if (!activeImage) return null;

            const desktopImageUrl = buildProductImageUrl({
              folder: activeVariant.imageFolder,
              filename: activeImage.filename,
              // Aquí no le pasamos width para traer la original en alta resolución de R2
            });

            return (
              <img
                src={desktopImageUrl}
                alt={activeImage.alt}
                className="hidden lg:block w-full h-full object-contain"
                fetchPriority="high"
              />
            );
          })()}
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
          {/* Selector de Color dinámico */}
          <div className="flex flex-wrap gap-3 mt-3">
            {product.variants.map((variant) => {
              // Fabricamos el swatch dinámicamente con la 1ra foto
              const swatchImageUrl = buildProductImageUrl({
                folder: variant.imageFolder,
                filename: variant.images[0].filename,
                width: 4,
              });

              return (
                <button
                  key={variant.id}
                  onClick={() => {
                    // USAMOS TU ESTADO REAL:
                    setActiveVariant(variant);
                    setActiveImageIndex(0); // Reseteamos la vista a la primera foto del nuevo color
                  }}
                  title={variant.colorName}
                  // USAMOS TU ESTADO REAL para comprobar si está activo:
                  className={`w-16 aspect-[4/5] rounded-md border-2 transition-all overflow-hidden ${
                    activeVariant.id === variant.id
                      ? 'border-slate-900 scale-110 '
                      : 'border-transparent  hover:scale-105 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={swatchImageUrl}
                    alt={variant.colorName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              );
            })}
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
