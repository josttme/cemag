// src/lib/data.ts

export type Category = 'pantuflas' | 'pantalones' | 'accesorios';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  patternType: string;
  sizes: string[];
  stock: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Pantuflas Marfil Zueco Plataforma',
    description: 'Zueco plataforma ideal para el confort en casa.',
    price: 20000,
    category: 'accesorios',
    patternType: 'Plataforma',
    sizes: ['36', '37', '38', '39', '40'],
    stock: 15,
    // BEST PRACTICE: Solo guardamos el nombre del archivo exacto tal como está en Cloudflare
    imageUrl: 'pantuflas-marfil.avif',
  },
  {
    id: 'prod-002',
    name: 'Pantuflas Marron Zueco Plataforma',
    description: 'Zueco plataforma ideal para el confort en casa.',
    price: 20000,
    category: 'accesorios',
    patternType: 'Plataforma',
    sizes: ['36', '37', '38', '39', '40'],
    stock: 12,
    imageUrl: 'pantuflas-marron.avif',
  },
  {
    id: 'prod-003',
    name: 'Pantuflas Rosas Zueco Plataforma',
    description: 'Zueco plataforma ideal para el confort en casa.',
    price: 20000,
    category: 'accesorios',
    patternType: 'Plataforma',
    sizes: ['36', '37', '38', '39', '40'],
    stock: 8,
    imageUrl: 'pantuflas-rosado.avif',
  },
];
