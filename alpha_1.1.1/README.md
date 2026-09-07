# GameHub Store - Evaluación Parcial 1

Proyecto frontend desarrollado con HTML5, CSS3 y JavaScript puro para la asignatura Desarrollo FullStack II.

## Integrantes

- Brayan Alarcón
- Benjamín Bravo
- Daniela Salinas

## Ejecución

1. Descomprimir el proyecto.
2. Abrir `index.html` en Google Chrome.
3. Mantener todas las carpetas y archivos en su ubicación original.

## Estructura

- `index.html`: inicio.
- `catalogo.html`: filtros y catálogo dinámico.
- `detalle.html`: información de cada producto.
- `carrito.html`: carrito, cupón y totales.
- `checkout.html`: formulario de despacho y pago simulado.
- `ordenes.html`: seguimiento de órdenes.
- `css/estilos.css`: hoja de estilos externa compartida.
- `js/app.js`: datos simulados, DOM, carrito y validaciones.
- `img/`: imágenes locales del catálogo.
- `video/`: video local de novedades, sin dependencia de YouTube.

## Pruebas rápidas

- Cupón válido: `GAME10`.
- El catálogo contiene 9 productos con fotografías reales y 3 ofertas activas.
- El cupón no se acumula con productos que ya tengan oferta.
- Teléfono válido: 9 dígitos comenzando con 9.
- El catálogo no permite que el precio mínimo supere el máximo.
- Los productos sin stock tienen deshabilitado el botón de compra.
- El carrito y las órdenes se conservan al cambiar de página.

## Tecnologías de EP1

- HTML5 para la estructura de las páginas.
- CSS3 para los estilos personalizados.
- JavaScript puro para el catálogo, carrito y validaciones.
- Bootstrap 5.3.3 para el carrusel de imágenes.
- Git y GitHub para el control de versiones.

El proyecto no utiliza React ni conexión con backend.
