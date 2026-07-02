/// src/lib/data.ts

// 1. Tipados Estrictos (Categorías permitidas)
// Previene errores de tipeo. Si pones "pantalon" en vez de "pantalones", TypeScript te gritará.
export type Category =
  | 'remeras'
  | 'pantalones'
  | 'buzos'
  | 'accesorios'
  | 'calzado';
export type Fit =
  | 'Oversize'
  | 'Regular Fit'
  | 'Slim Fit'
  | 'Boxy Fit'
  | 'Pierna Recta';

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
  imageFolder: string; // <-- NUEVO: Agregamos la ruta de la carpeta base de esta variante
  images: { filename: string; alt: string }[]; // <-- EL FIX: Cambiamos 'url' por 'filename'
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
        imageFolder: '',
        images: [
          {
            filename:
              'https://placehold.co/800x800/1a1a1a/ffffff?text=Remera+Negra+Frontal',
            alt: 'Remera Heavy Negra Frontal',
          },
          {
            filename:
              'https://placehold.co/800x800/1a1a1a/ffffff?text=Remera+Negra+Dorso',
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
        imageFolder: '',
        images: [
          {
            filename:
              'https://placehold.co/800x800/f8f9fa/1a1a1a?text=Remera+Blanca+Frontal',
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
        imageFolder: '',
        images: [
          {
            filename: `pantuflas-marfil.avif`,
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
        imageFolder: '',
        images: [
          {
            filename: `pantuflas-marron.avif`,
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
        imageFolder: '',
        images: [
          {
            filename: `pantuflas-rosado.avif`,
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
  {
    id: 'prod-jeans-star-patch',
    slug: 'jeans-star-patch-high-waist',
    name: 'Jeans Retazos de Estrellas Tiro Alto',
    category: 'pantalones',
    price: 45700,
    description:
      'Lindos jeans para mujeres y niñas, pantalones de retazos de estrellas, cintura alta, pierna recta, ropa casual de preppy.',
    details: {
      fabric: 'Mezclilla',
      fit: 'Pierna Recta',
      features: [
        'Cintura alta (Tiro alto)',
        'Cierre de cremallera',
        'Diseño de retazos de estrellas',
        'Estilo clásico casual',
        'Origen: Importado',
      ],
    },
    variants: [
      {
        id: 'var-negro',
        colorName: 'Negro',
        imageFolder: 'products/pants/jeans-star-patch/black1',
        images: [
          {
            filename: `jean-estrellas-negro-frontal-1.jpg`,
            alt: 'Jean Negro Frontal Pose 1',
          },
          {
            filename: `jean-estrellas-negro-frontal-2.jpg`,
            alt: 'Jean Negro Frontal Pose 2',
          },
          {
            filename: `jean-estrellas-negro-trasero.jpg`,
            alt: 'Jean Negro Vista Trasera',
          },
          {
            filename: `jean-estrellas-negro-modelo-1.jpg`,
            alt: 'Modelo con Jean Negro Cuerpo Entero 1',
          },
          {
            filename: `jean-estrellas-negro-modelo-2.jpg`,
            alt: 'Modelo con Jean Negro Cuerpo Entero 2',
          },
          {
            filename: `jean-estrellas-negro-modelo-3.jpg`,
            alt: 'Modelo con Jean Negro Cuerpo Entero 3',
          },
        ],
        inventory: [
          { size: 'S', stock: 4 },
          { size: 'M', stock: 8 },
          { size: 'L', stock: 6 },
          { size: 'XL', stock: 2 },
        ],
      },
      {
        id: 'var-azul1',
        colorName: 'Azul 1',
        imageFolder: 'products/pants/jeans-star-patch/blue1',
        images: [
          {
            filename: 'jean-estrellas-azul-frontal-1.jpg',
            alt: 'Jean Azul 1 Frontal Pose 1',
          },
          {
            filename: 'jean-estrellas-azul-frontal-2.jpg',
            alt: 'Jean Azul 1 Frontal Pose 2',
          },
          {
            filename: 'jean-estrellas-azul-modelo-1.jpg',
            alt: 'Modelo con Jean Azul 1 Cuerpo Entero 1',
          },
          {
            filename: 'jean-estrellas-azul-modelo-2.jpg',
            alt: 'Modelo con Jean Azul 1 Cuerpo Entero 2',
          },
          {
            filename: 'jean-estrellas-azul-trasero.jpg',
            alt: 'Jean Azul 1 Vista Trasera',
          },
        ],
        inventory: [
          { size: 'S', stock: 3 },
          { size: 'M', stock: 5 },
          { size: 'L', stock: 7 },
          { size: 'XL', stock: 4 },
        ],
      },
      {
        id: 'var-azul2', // Asumí que la descripción de "azul4" correspondía a esta variante
        colorName: 'Azul 2',
        imageFolder: 'products/pants/jeans-star-patch/blue2',
        images: [
          {
            filename: `jean-estrellas-azul4-frontal-1.jpg`,
            alt: 'Jean Azul 2 Frontal Pose 1',
          },
          {
            filename: `jean-estrellas-azul4-frontal-2.jpg`,
            alt: 'Jean Azul 2 Frontal Pose 2',
          },
          {
            filename: `jean-estrellas-azul4-frontal-3.jpg`,
            alt: 'Jean Azul 2 Frontal Pose 3',
          },
          {
            filename: `jean-estrellas-azul4-frontal-4.jpg`,
            alt: 'Jean Azul 2 Frontal Pose 4',
          },
          {
            filename: `jean-estrellas-azul4-extendido.jpg`,
            alt: 'Jean Azul 2 Plano Extendido',
          },
        ],
        inventory: [
          { size: 'S', stock: 2 },
          { size: 'M', stock: 6 },
          { size: 'L', stock: 4 },
          { size: 'XL', stock: 1 },
        ],
      },
      {
        id: 'var-azul-oscuro',
        colorName: 'Azul Oscuro',
        imageFolder: 'products/pants/jeans-star-patch/blue-dark',
        images: [
          {
            filename: 'jean-estrellas-azul-oscuro-frontal-1.jpg',
            alt: 'Jean Azul Oscuro Frontal Pose 1',
          },
          {
            filename: 'jean-estrellas-azul-oscuro-frontal-2.jpg',
            alt: 'Jean Azul Oscuro Frontal Pose 2',
          },
          {
            filename: 'jean-estrellas-azul-oscuro-modelo-1.jpg',
            alt: 'Modelo con Jean Azul Oscuro Cuerpo Entero 1',
          },
          {
            filename: 'jean-estrellas-azul-oscuro-modelo-2.jpg',
            alt: 'Modelo con Jean Azul Oscuro Cuerpo Entero 2',
          },
          {
            filename: 'jean-estrellas-azul-oscuro-trasero.jpg',
            alt: 'Jean Azul Oscuro Vista Trasera',
          },
        ],
        inventory: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 9 },
          { size: 'L', stock: 3 },
          { size: 'XL', stock: 2 },
        ],
      },
      {
        id: 'var-azul3',
        colorName: 'Azul 3',
        imageFolder: 'products/pants/jeans-star-patch/blue3',
        images: [
          {
            filename: `jean-estrellas-azul3-frontal.jpg`,
            alt: 'Jean Azul 3 Frontal',
          },
          {
            filename: `jean-estrellas-azul3-lateral.jpg`,
            alt: 'Jean Azul 3 Vista Lateral',
          },
          {
            filename: `jean-estrellas-azul3-trasera.jpg`,
            alt: 'Jean Azul 3 Vista Trasera',
          },
          {
            filename: `jean-estrellas-azul3-modelo.jpg`,
            alt: 'Modelo con Jean Azul 3 Cuerpo Entero',
          },
        ],
        inventory: [
          { size: 'S', stock: 4 },
          { size: 'M', stock: 7 },
          { size: 'L', stock: 5 },
          { size: 'XL', stock: 3 },
        ],
      },
    ],
  },
];
