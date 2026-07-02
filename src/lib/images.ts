// src/lib/images.ts

const r2Url = import.meta.env.PUBLIC_R2_URL;
const workerUrl = import.meta.env.PUBLIC_IMAGE_SERVICE_URL;

interface BuildUrlOptions {
  folder: string;
  filename: string;
  width?: number; // Opcional: si viene, usamos el Worker; si no, R2 directo
}

export function buildProductImageUrl({
  folder,
  filename,
  width,
}: BuildUrlOptions): string {
  const path = `${folder}/${filename}`;

  // Si pasamos un ancho, usamos el optimizador/worker
  if (width && workerUrl) {
    return `${workerUrl}/${path}?width=${width}`;
  }

  // Si no pide ancho, entregamos la imagen original directa de R2
  return `${r2Url}/${path}`;
}
