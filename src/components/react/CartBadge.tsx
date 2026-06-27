// src/components/react/CartBadge.tsx
import { useStore } from '@nanostores/react';
import { $cart } from '../../store/cartStore';

export default function CartBadge() {
  // Nos suscribimos a los cambios del store
  const cart = useStore($cart);

  // Calculamos la cantidad total de ítems
  const totalItems = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // Si no hay ítems, no mostramos el badge
  if (totalItems === 0) return null;

  return (
    <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
      {totalItems}
    </span>
  );
}
