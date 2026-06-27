// src/store/cartStore.ts
import { persistentMap } from '@nanostores/persistent';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  colorName: string;
  size: string;
  imageUrl: string;
  quantity: number;
}

// 1. Reemplazamos 'map' por 'persistentMap'
// El primer argumento es un prefijo para que no choque con otras webs en el mismo localhost
export const $cart = persistentMap<Record<string, CartItem>>(
  'cemag_cart:', // Prefijo único
  {},
  {
    // Le enseñamos a Nanostores cómo guardar objetos complejos (JSON)
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export function addCartItem(item: Omit<CartItem, 'id' | 'quantity'>) {
  const uniqueId = `${item.productId}-${item.colorName}-${item.size}`;
  const currentCart = $cart.get();
  const existingItem = currentCart[uniqueId];

  if (existingItem) {
    $cart.setKey(uniqueId, {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    });
  } else {
    $cart.setKey(uniqueId, { ...item, id: uniqueId, quantity: 1 });
  }
}

// 2. Nueva acción para eliminar ítems
export function removeCartItem(id: string) {
  const currentCart = { ...$cart.get() };
  delete currentCart[id];
  $cart.set(currentCart); // Sobrescribimos el store completo sin ese ítem
}
