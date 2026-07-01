// src/lib/storefront.ts

//* ============================================ *//
//* **************** HERO SLIDE **************** *//
//* ============================================ *//

// 1. Definimos la Interfaz estricta.
// Si mañana conectas Supabase, la API DEBE devolverte exactamente esta forma.
export interface HeroSlide {
  id: string;
  title: string; // Para SEO o uso interno
  mobileImageUrl: string;
  desktopImageUrl: string;
  altText: string;
  ctaLink: string; // ¡CRÍTICO! ¿A dónde lleva el clic? (ej. /categorias/verano)
  isActive: boolean; // Best Practice: Permite "apagar" slides sin borrarlos del código
}

// 2. Extraemos la variable de entorno para no repetirla
const r2Url = import.meta.env.PUBLIC_R2_URL;

// 3. Nuestro Mock de Marketing.
// Esto simula la respuesta de una base de datos o un CMS (Content Management System).
export const heroCarouselData: HeroSlide[] = [
  {
    id: 'promo-invierno-01',
    title: 'Lanzamiento Pantuflas',
    mobileImageUrl: `${r2Url}/pantufla-claro-mobile.avif`,
    desktopImageUrl: `${r2Url}/pantufla-claro-desktop.avif`,
    altText: 'Nueva colección de temporada confort',
    ctaLink: '/productos/pantuflas-zueco-plat', // Lleva directo al producto estrella
    isActive: true,
  },
  {
    id: 'promo-basicos-02',
    title: 'Básicos de temporada',
    mobileImageUrl: `${r2Url}/pantufla-marron-mobile.avif`,
    desktopImageUrl: `${r2Url}/pantufla-marron-dektop.avif`,
    altText: 'Descubre los nuevos básicos',
    ctaLink: '/colecciones/esenciales', // Lleva a un listado filtrado
    isActive: true,
  },
  {
    id: 'promo-verano-03',
    title: 'Liquidación Verano',
    mobileImageUrl: `${r2Url}/pantufla-rosa-mobile.avif`,
    desktopImageUrl: `${r2Url}/pantufla-rosa-desktop.avif`,
    altText: 'Hasta 50% off en seleccionados',
    ctaLink: '/colecciones/sale',
    isActive: true, // Está apagado porque no es verano. No se renderizará.
  },
];

// Función "getter" que simula la llamada a la API y filtra solo los activos
export const getActiveHeroSlides = (): HeroSlide[] => {
  return heroCarouselData.filter((slide) => slide.isActive);
};

//* ============================================ *//
//* *************** CATEGORY NAV *************** *//
//* ============================================ *//
// 1. Interfaz para la navegación de categorías
export interface CategoryNav {
  id: string;
  label: string;
  imageUrl: string;
  link: string;
}

// 2. Datos falsos de navegación
export const categoryNavData: CategoryNav[] = [
  {
    id: 'cat-remeras',
    label: 'Remeras',
    imageUrl: 'https://placehold.co/200x200/f8f9fa/1a1a1a?text=Remeras',
    link: '/colecciones/remeras',
  },
  {
    id: 'cat-pantalones',
    label: 'Pantalones',
    imageUrl: 'https://placehold.co/200x200/f8f9fa/1a1a1a?text=Pantalones',
    link: '/colecciones/pantalones',
  },
  {
    id: 'cat-buzos',
    label: 'Buzos',
    imageUrl: 'https://placehold.co/200x200/f8f9fa/1a1a1a?text=Buzos',
    link: '/colecciones/buzos',
  },
  {
    id: 'cat-pantuflas',
    label: 'Pantuflas',
    imageUrl: 'https://placehold.co/200x200/f8f9fa/1a1a1a?text=Pantuflas',
    link: '/colecciones/pantuflas',
  },
  {
    id: 'cat-accesorios',
    label: 'Accesorios',
    imageUrl: 'https://placehold.co/200x200/f8f9fa/1a1a1a?text=Accesorios',
    link: '/colecciones/accesorios',
  },
];
