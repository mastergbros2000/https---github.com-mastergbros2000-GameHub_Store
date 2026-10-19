# Corrección de imágenes y video

Se corrigió una incompatibilidad reproducida con el catálogo guardado por versiones anteriores: las rutas `/img/productos/...` apuntaban a una carpeta que no está en esta entrega. Los archivos reales están incluidos en `public/imagenes`.

El lector del catálogo ahora normaliza las rutas conocidas sin cambiar nombres, IDs, precios, descuentos ni stock. Catálogo, destacados, detalle y carrito comparten el componente `ProductImage`, que resuelve las fotos desde los archivos locales. Se conserva la foto elegida en administración. Las rutas de medios respetan la carpeta base configurada en Vite.

El video local de inicio utiliza `autoPlay`, `muted`, `loop` y `playsInline`. Conserva los controles. Se verificó el arranque automático y el regreso al inicio al alcanzar el final en el navegador de prueba.

Los documentos de ERS y testing conservan la evidencia de la segunda revisión. La evidencia adicional de este cambio se encuentra en `evidencias/medios_corregidos.txt`.

Para ejecutarlo se debe extraer el proyecto completo, abrir una terminal en la carpeta con `package.json` y ejecutar `npm ci` seguido de `npm run dev`. La carpeta `public` debe mantenerse completa al compartir o subir el código.
