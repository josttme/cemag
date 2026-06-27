// src/lib/data.ts

export interface ProductVariant {
  id: string;
  colorName: string;
  swatchUrl: string;
  images: { url: string; alt: string }[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  sizes: string[];
  variants: ProductVariant[];
}

const r2Url = import.meta.env.PUBLIC_R2_URL;

export const products: Product[] = [
  {
    id: 'pantuflas-zueco-plat',
    name: 'Pantuflas Zueco Plataforma',
    category: 'accesorios',
    price: 20000,
    description: 'Zueco plataforma ideal para el confort en casa.',
    sizes: ['36', '37', '38', '39', '40'],
    variants: [
      {
        id: 'var-marfil',
        colorName: 'Marfil',
        // Idealmente, el swatch es una imagen pequeña cuadrada enfocada en el color/textura
        swatchUrl: `${r2Url}/pantuflas-marfil.avif`,
        images: [
          {
            url: `${r2Url}/pantuflas-marfil.avif`,
            alt: 'Pantuflas Zueco Marfil Frontal',
          },
          // Aquí agregarías más vistas de la variante marfil si las tuvieras
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
      },
    ],
  },
  // Aquí puedes seguir agregando más productos completos...
];
