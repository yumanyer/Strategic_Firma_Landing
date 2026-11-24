# Firma Strategic — Astro

Migración estática de la maqueta HTML original a Astro, conservando su contenido, clases Tailwind, recursos, tipografías e interacciones vanilla.

## Desarrollo

```sh
npm install
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

El build genera `dist/`, listo para publicar como sitio estático en Cloudflare Pages. Tailwind CDN y Google Fonts se mantienen igual que en la maqueta de origen para maximizar la fidelidad visual.

## Estructura

- `src/pages/index.astro`: contenido completo de la landing y todas sus secciones.
- `src/layouts/SiteLayout.astro`: documento HTML, metadatos, fuentes y tema Tailwind original.
- `src/styles/global.css`: reset global original.
- `public/scripts/site.js`: lógica vanilla para prellenar el formulario, actualizar WhatsApp y mostrar la confirmación.
- `public/manus-routes.json`: manifiesto de la ruta de inicio.
