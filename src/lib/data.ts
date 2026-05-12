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
  images: string[];
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
    images: [
      'pantuflas-marfil.avif', // Índice 0: Foto principal
      'pantuflas-marron.avif', // Índice 1: Foto secundaria
      'pantuflas-rosado.avif', // Índice 2: Foto terciaria
    ],
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
    images: [
      'pantuflas-marfil.avif', // Índice 0: Foto principal
      'pantuflas-marron.avif', // Índice 1: Foto secundaria
      'pantuflas-rosado.avif', // Índice 2: Foto terciaria
    ],
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
    images: [
      'pantuflas-marfil.avif', // Índice 0: Foto principal
      'pantuflas-marron.avif', // Índice 1: Foto secundaria
      'pantuflas-rosado.avif', // Índice 2: Foto terciaria
    ],
  },
];
