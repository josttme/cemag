import { useState } from 'react';

interface SizeSelectorProps {
  sizes: string[];
  productId: string;
}

export default function SizeSelector({ sizes, productId }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(true); // Disparamos el error visual si no hay talle
      return;
    }
    setError(false);

    // Aquí irá tu lógica real de agregar al carrito (ej. Zustand, Context, o LocalStorage)
    console.log(`Agregado: Producto ${productId}, Talle ${selectedSize}`);
    alert(`Agregado a la bolsa: Talle ${selectedSize}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Selecciona tu talla</h3>
          <button className="text-gray-500 hover:text-black text-sm underline transition-colors">
            Guía de tallas
          </button>
        </div>

        {/* Grilla de talles estilo Nike (3 columnas) */}
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setError(false); // Limpiamos el error al seleccionar
                }}
                className={`py-3 text-center border rounded-md transition-all duration-200 ${
                  isSelected
                    ? 'border-black ring-1 ring-black text-black font-medium' // Estado activo
                    : 'border-gray-300 text-gray-700 hover:border-black' // Estado inactivo
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {/* Mensaje de error condicional */}
        {error && (
          <p className="text-red-500 text-sm mt-2 font-medium">
            Por favor, selecciona una talla.
          </p>
        )}
      </div>

      {/* Botón de compra integrado en el mismo componente para leer el estado del talle */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 mt-2"
      >
        Agregar a la bolsa
      </button>
    </div>
  );
}
