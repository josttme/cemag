/// src/lib/data.ts

// 1. Tipados Estrictos (Categorías permitidas)
// Previene errores de tipeo. Si pones "pantalon" en vez de "pantalones", TypeScript te gritará.
export type Category =
  | 'remeras'
  | 'pantalones'
  | 'buzos'
  | 'accesorios'
  | 'calzado';
export type Fit = 'Oversize' | 'Regular Fit' | 'Slim Fit' | 'Boxy Fit';

// 2. Control de Inventario Granular
// Cada talle tiene su propio control de stock.
export interface SizeStock {
  size: string; // ej: 'S', 'M', 'L', o '38', '40'
  stock: number;
}

// 3. La Variante (La prenda física real)
export interface ProductVariant {
  id: string; // ej: 'var-negro'
  colorName: string; // ej: 'Negro Profundo'
  swatchUrl: string; // Miniatura del color/textura
  images: { url: string; alt: string }[];
  inventory: SizeStock[]; // <-- ARCHITECTURE WIN: El stock vive dentro del color
}

// 4. El Producto Base (El molde / La moldería)
export interface Product {
  id: string; // ej: 'prod-remera-heavy'
  slug: string; // <-- BEST PRACTICE SEO: 'remera-heavy-algodon' (para URLs limpias en vez de IDs feos)
  name: string;
  category: Category;
  price: number;
  description: string;

  // Propiedades Técnicas Textiles (Tu ventaja competitiva)
  details: {
    fabric: string; // ej: 'Algodón Peinado 24/1' o 'Frisa Invisible'
    fit: Fit;
    features: string[]; // ej: ['Doble costura en cuello', 'Estampa serigrafía plastisol']
  };

  variants: ProductVariant[];
}

// ==========================================
// BASE DE DATOS SIMULADA (MOCKS)
// ==========================================
const r2Url = import.meta.env.PUBLIC_R2_URL;

export const products: Product[] = [
  {
    id: 'prod-remera-heavy',
    slug: 'remera-heavy-oversize', // Esta será la URL: cemag.com/productos/remera-heavy-oversize
    name: 'Remera Heavyweight Blank',
    category: 'remeras',
    price: 25000,
    description:
      'Remera de alto gramaje con caída pesada. Ideal para uso diario con una estructura que no pierde la forma tras los lavados.',
    details: {
      fabric: 'Algodón Peinado 24/1 - 220gr',
      fit: 'Regular Fit',
      features: [
        'Cuello de rib 2x1 grueso',
        'Costuras de hombro caídas (Drop shoulder)',
        'Prelavada (No encoge)',
      ],
    },
    variants: [
      {
        id: 'var-negro',
        colorName: 'Negro Onyx',
        swatchUrl: 'https://placehold.co/100x100/1a1a1a/ffffff?text=N',
        images: [
          {
            url: 'https://placehold.co/800x800/1a1a1a/ffffff?text=Remera+Negra+Frontal',
            alt: 'Remera Heavy Negra Frontal',
          },
          {
            url: 'https://placehold.co/800x800/1a1a1a/ffffff?text=Remera+Negra+Dorso',
            alt: 'Remera Heavy Negra Dorso',
          },
        ],
        inventory: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 12 },
          { size: 'L', stock: 0 }, // Agotado en L negro
          { size: 'XL', stock: 3 },
        ],
      },
      {
        id: 'var-blanco',
        colorName: 'Blanco Tiza',
        swatchUrl: 'https://placehold.co/100x100/f8f9fa/1a1a1a?text=B',
        images: [
          {
            url: 'https://placehold.co/800x800/f8f9fa/1a1a1a?text=Remera+Blanca+Frontal',
            alt: 'Remera Heavy Blanca Frontal',
          },
        ],
        inventory: [
          { size: 'S', stock: 2 },
          { size: 'M', stock: 8 },
          { size: 'L', stock: 10 }, // Sí hay stock en L blanco
          { size: 'XL', stock: 5 },
        ],
      },
    ],
  },
  // Aquí puedes agregar tus pantuflas reales adaptando sus datos a este esquema
  {
    id: 'pantuflas-zueco-plat',
    slug: 'pantuflas-zueco-plataforma', // URL amigable: cemag.com/productos/pantuflas-zueco-plataforma
    name: 'Pantuflas Zueco Plataforma',
    category: 'accesorios',
    price: 20000,
    description:
      'Zueco plataforma ideal para el confort en casa. Suela gruesa y acolchado interior para máximo descanso.',
    details: {
      fabric: 'EVA de alta densidad y forro de felpa',
      fit: 'Oversize',
      features: [
        'Suela antideslizante',
        'Plantilla anatómica extraíble',
        'Fácil limpieza',
      ],
    },
    variants: [
      {
        id: 'var-marfil',
        colorName: 'Marfil',
        swatchUrl: `${r2Url}/pantuflas-marfil.avif`,
        images: [
          {
            url: `${r2Url}/pantuflas-marfil.avif`,
            alt: 'Pantuflas Zueco Marfil Frontal',
          },
          // Podrías agregar más vistas si existen
        ],
        inventory: [
          { size: '36', stock: 4 },
          { size: '37', stock: 7 },
          { size: '38', stock: 10 },
          { size: '39', stock: 5 },
          { size: '40', stock: 2 },
        ],
      },
      {
        id: 'var-marron',
        colorName: 'Marrón',
        swatchUrl: `${r2Url}/pantuflas-marron.avif`,
        images: [
          {
            url: `${r2Url}/pantuflas-marron.avif`,
            alt: 'Pantuflas Zueco Marrón Frontal',
          },
        ],
        inventory: [
          { size: '36', stock: 3 },
          { size: '37', stock: 8 },
          { size: '38', stock: 12 },
          { size: '39', stock: 6 },
          { size: '40', stock: 4 },
        ],
      },
      {
        id: 'var-rosa',
        colorName: 'Rosa',
        swatchUrl: `${r2Url}/pantuflas-rosado.avif`,
        images: [
          {
            url: `${r2Url}/pantuflas-rosado.avif`,
            alt: 'Pantuflas Zueco Rosa Frontal',
          },
        ],
        inventory: [
          { size: '36', stock: 0 }, // Agotado en 36
          { size: '37', stock: 5 },
          { size: '38', stock: 9 },
          { size: '39', stock: 3 },
          { size: '40', stock: 1 },
        ],
      },
    ],
  },
  // Aquí puedes seguir agregando más productos completos...
];
