// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  image: {
    domains: ['pub-7e3025ea79e842a6ae8074f0babc6ff6.r2.dev', 'placehold.co'], // Reemplaza con tu dominio real de Cloudflare R2 o tu dominio personalizado
  },
});
