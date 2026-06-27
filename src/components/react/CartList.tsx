// src/components/react/CartList.tsx
import { useStore } from '@nanostores/react';
import { useState, useEffect } from 'react';
import { $cart, removeCartItem } from '@store/cartStore';

export default function CartList() {
  const cart = useStore($cart);
  // Estado vital para evitar el Hydration Mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Mientras carga, mostramos un esqueleto o texto simple para evitar saltos visuales
    return (
      <div className="animate-pulse h-40 bg-slate-100 rounded-lg w-full"></div>
    );
  }

  const cartItems = Object.values(cart);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-slate-500 mb-4">Tu bolsa está vacía</h2>
        <a
          href="/"
          className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
        >
          Continuar comprando
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Columna de Productos */}
      <div className="w-full lg:w-[65%] flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border-b border-slate-200 pb-6"
          >
            <div className="w-24 h-24 bg-[#f6f6f6] rounded-md overflow-hidden flex-shrink-0">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {item.colorName} | Talle {item.size}
                  </p>
                </div>
                <p className="font-medium">
                  ${item.price.toLocaleString('es-AR')}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-slate-600">
                  Cantidad: {item.quantity}
                </p>
                <button
                  onClick={() => removeCartItem(item.id)}
                  className="text-sm text-red-500 underline hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Columna de Resumen */}
      <div className="w-full lg:w-[35%]">
        <div className="bg-slate-50 p-6 rounded-xl">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Resumen de compra
          </h2>

          <div className="flex justify-between mb-4 text-slate-600">
            <span>Subtotal</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>
          <div className="flex justify-between mb-6 text-slate-600">
            <span>Envío</span>
            <span>Calculado en el checkout</span>
          </div>

          <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-black/90 active:scale-[0.98] transition-all">
            Ir a pagar
          </button>
        </div>
      </div>
    </div>
  );
}
