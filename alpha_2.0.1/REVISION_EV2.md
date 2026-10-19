# Segunda revisión de GameHub Store

Actualización de medios: se corrigieron rutas de fotos guardadas por versiones anteriores y se activó el video automático en bucle. Detalle y evidencia en `documentos/CORRECCION_MEDIOS.md`. El diseño y los colores de esta revisión se conservan.

Se revisó la versión entregada previamente contra la rúbrica EV2 y el Anexo 1, incluidos sus diagramas de navegación. Esta revisión corrige omisiones concretas; no constituye una calificación del docente ni una garantía de ausencia de errores.

## Problemas encontrados y correcciones

| Problema anterior | Corrección comprobable |
| --- | --- |
| JSX demasiado comprimido y cabecera, portada y tarjetas mezcladas | Componentes separados, JSX expandido y formato automático de cuatro espacios |
| Solo cuatro de las veinte pruebas anteriores renderizaban componentes | Suite ampliada con renderizado, props, state, eventos, DOM, formularios, rutas e integración |
| Aprobación de pruebas confundida con cobertura | Instrumentación de código y porcentajes medidos por Istanbul y Karma |
| Ruta de pago rechazado sin un flujo desde checkout | Selector de resultado simulado, resumen y reintento sin perder carrito |
| Resumen incompleto y perdido al recargar | Productos, cantidades, entrega, subtotal, cupón y total persistidos |
| Cantidades y datos del carrito podían quedar desactualizados | Cantidades enteras, stock máximo y sincronización al editar catálogo |
| Inicio de sesión y contacto sin comportamiento | Validación controlada por React, confirmaciones y sesión explícitamente simulada |
| Contraseña registrada en consola | Eliminada; no se almacena contraseña en navegador |
| Diseño adaptable basado casi solo en CSS propio | Grilla `row` y `col`, navegación colapsable y tablas adaptables de Bootstrap |
| Administración limitada a productos | Panel, órdenes, comprobante, stock crítico, categorías, usuarios, historial, reportes y perfil de demostración |
| ID inexistente podía mostrar una selección anterior | Detalle resuelto solo por el ID de la URL y estado de no encontrado |
| JSON dañado podía romper la aplicación | Respaldo del catálogo, lectura segura y aviso de fallos de escritura |

## Correspondencia con la pauta

| Área | Evidencia |
| --- | --- |
| React, responsabilidad única, props y estados | `App`, `Header`, `Home`, `ProductList`, `ProductCard`, Context y componentes administrativos |
| Archivo JavaScript de datos y CRUD | `data/productos.js`, servicios y formularios administrativos |
| Persistencia conectada con la interfaz | `localStorage` y actualización de estado React |
| Bootstrap adaptable | Grilla de productos 1, 2 y 3 columnas; carrito, formularios, Navbar y tablas |
| Vistas públicas adicionales | Categorías, ofertas, detalle, checkout y ambos resultados de compra |
| Recorrido administrativo del anexo | Rutas bajo `/administracion` y sus enlaces internos |
| Jasmine y Karma | Archivos `.spec.js`, espías, mocks de Storage e informe de cobertura |
| ERS y documento de testing | Documentos actualizados en `documentos` |

## Límites que se deben explicar en la defensa

- La sesión, los roles y el pago son simulaciones frontend. No hay backend, control de acceso seguro ni procesamiento de dinero.
- El formulario de contacto no envía correos reales.
- El estado de demostración se guarda por navegador, no se comparte entre equipos.
- Las pruebas y los recorridos automatizados son evidencia parcial; no garantizan una nota ni cubren todos los navegadores o todas las situaciones.
- La instrucción de presentación menciona integración backend/frontend, mientras los requisitos técnicos trabajan con persistencia simulada en JavaScript. Si el docente exige un backend real adicional, debe confirmarse su alcance; esta entrega no lo implementa.
- Falta subir esta revisión al repositorio público, cambiar el WhatsApp ficticio y preparar Vercel cuando el equipo lo solicite.

## Fuentes revisadas

- Anexo 1 Instrucciones EV2: requisitos en páginas 1 y 2; navegación en 3 y 4; administración en 9 y 10; pruebas en 11; entregables en 12.
- Pauta EV2: instrucciones específicas en 3 y 4; indicadores y ponderaciones en 6 a 9.
- Ejemplo del docente: `https://github.com/cacc92/Fullstack2-React`.
- React: `https://react.dev/reference/react/act`.
- Bootstrap: `https://getbootstrap.com/docs/5.3/layout/grid/`.
