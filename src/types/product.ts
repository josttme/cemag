// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: { url: string; alt: string }[];
  colors: { id: string; hex: string; name: string }[];
  sizes: string[];
}
