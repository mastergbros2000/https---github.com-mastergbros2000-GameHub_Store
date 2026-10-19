# GameHub Store EV2

Migración a React del caso semestral GameHub Store para la Evaluación Parcial 2 de Desarrollo Fullstack II.

## Funcionalidades implementadas

- Catálogo de nueve productos cargados desde un archivo JavaScript.
- Búsqueda, filtro por categoría y marca, y ordenamiento por precio o nombre.
- Vistas independientes de categorías, ofertas y detalle del producto.
- Carrito con cantidades, eliminación, vaciado, subtotal y cupón `GAME10`.
- El cupón no vuelve a descontar productos que ya están en oferta.
- Checkout validado y vistas de compra exitosa o rechazada.
- Panel administrativo con creación, lectura, edición y eliminación de productos.
- Panel, órdenes y detalle, stock crítico, categorías, usuarios e historial, reportes y perfil administrativo.
- Persistencia del catálogo, carrito, órdenes y datos de demostración mediante `localStorage`.
- Registro con contraseña y confirmación, validación y sesión de demostración para autocompletar checkout.
- La contraseña no se guarda ni se imprime en la consola.
- Video local de novedades, Bootstrap, estilos personalizados y diseño adaptable.
- Video con reproducción automática, silenciado y en bucle. Conserva los controles para pausarlo o activar el sonido.
- Rutas de imágenes compatibles con los datos guardados de versiones anteriores, sin perder modificaciones del catálogo.
- Botón de contacto por WhatsApp.
- Pruebas unitarias con Jasmine y Karma.

## Tecnologías

- React 19 y Vite
- React Router
- Bootstrap y React Bootstrap
- JavaScript, HTML y CSS
- Jasmine, Karma, Chrome Headless, esbuild e Istanbul para cobertura

## Ejecución local

Requiere Node.js 20.19 o una versión compatible de Node.js 22.12 o posterior. Para las pruebas se necesita Google Chrome instalado.

```bash
npm ci
npm run dev
```

Vite mostrará la dirección local que se debe abrir en el navegador.

## Verificación

```bash
npm run lint
npm run format:check
npm test
npm run build
```

- `npm run lint` revisa las reglas del código.
- `npm test` ejecuta las pruebas de servicios y componentes.
- `npm test` también genera un informe real en `coverage/index.html`. Para repetir mientras editas, usa `npm run test:watch`.
- `npm run build` genera la versión final dentro de `dist`.
- `npm run format` ordena el código con sangría de cuatro espacios. `format:check` lo comprueba sin modificarlo.

## Estructura principal

```text
src/
  components/   Componentes y vistas reutilizables
    admin/       Vistas de la administración
  context/      Estado compartido del carrito
  data/         Datos iniciales de productos
  pages/        Portada de la tienda
  services/     CRUD, cálculos y validaciones
  tests/        Pruebas Jasmine ejecutadas con Karma
public/
  imagenes/     Imágenes locales del catálogo
  video/        Video local de novedades
documentos/     ERS final y evidencia de testing
```

## Persistencia y alcance

Esta entrega implementa el frontend con datos simulados en JavaScript. No existe servidor ni base de datos remota. La sesión y los roles administrativos son demostraciones: no verifican una contraseña real ni protegen el panel. El pago no procesa dinero y los comprobantes no son boletas tributarias. Contacto valida la información, pero no envía mensajes a un servidor.

Al confirmar una compra aprobada se guarda la orden, se descuenta stock y se vacía el carrito. Un pago rechazado conserva el carrito y permite reintentar. La última orden sigue visible al recargar. El cupón se debe aplicar nuevamente si se recarga toda la aplicación.

El perfil registrado guarda solo nombre, correo, dirección y región opcionales. Con ese correo y una contraseña de demostración de al menos seis caracteres se puede ingresar para autocompletar el checkout. No es un sistema de autenticación real.

En administración, una categoría usada no puede eliminarse; al renombrarla, se actualizan sus productos. Los reportes usan las compras simuladas registradas y el stock crítico corresponde a cinco unidades o menos.

El resultado de la segunda revisión está en `REVISION_EV2.md` y la evidencia en `documentos`. La carpeta `coverage` se regenera al ejecutar las pruebas y no se necesita para iniciar el sitio.

## Antes de publicar

Cambiar el número ficticio `56912345678` del enlace de WhatsApp por el número definido por el equipo.

El repositorio público y la publicación en Vercel se gestionan por separado. No se ha publicado esta revisión ni se ha modificado GitHub automáticamente.
