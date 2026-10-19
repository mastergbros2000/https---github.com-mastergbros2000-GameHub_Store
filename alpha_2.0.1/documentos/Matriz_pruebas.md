# Matriz de pruebas ejecutadas

Resultado total: 84 de 84 aprobadas.

| ID | Archivo | Caso | Resultado |
| --- | --- | --- | --- |
| P001 | admin.spec.js | ofrece los siete módulos administrativos desde el panel | Aprobada |
| P002 | admin.spec.js | crea una categoría y la guarda en la persistencia | Aprobada |
| P003 | admin.spec.js | renombra una categoría y actualiza los productos relacionados | Aprobada |
| P004 | admin.spec.js | impide eliminar una categoría utilizada por productos | Aprobada |
| P005 | admin.spec.js | crea y elimina un usuario sin guardar contraseña | Aprobada |
| P006 | admin.spec.js | permite abrir el resumen de una orden administrativa | Aprobada |
| P007 | admin.spec.js | muestra productos críticos con cinco unidades o menos | Aprobada |
| P008 | admin.spec.js | guarda el perfil administrativo de demostración | Aprobada |
| P009 | app.spec.js | incluye el video local solicitado y los destacados en inicio | Aprobada |
| P010 | app.spec.js | abre un detalle por su ID sin tener una selección anterior | Aprobada |
| P011 | app.spec.js | no muestra otro producto para un ID inexistente | Aprobada |
| P012 | app.spec.js | muestra la página 404 para una ruta desconocida | Aprobada |
| P013 | app.spec.js | muestra solo los tres productos en oferta | Aprobada |
| P014 | app.spec.js | resuelve una categoría con tilde desde la URL | Aprobada |
| P015 | app.spec.js | actualiza el contador de la cabecera y persiste al agregar | Aprobada |
| P016 | app.spec.js | recupera el carrito después de volver a montar la aplicación | Aprobada |
| P017 | app.spec.js | actualiza una cantidad y permite quitar el producto del carrito compartido | Aprobada |
| P018 | app.spec.js | confirma el checkout integrado, descuenta stock y muestra el resumen | Aprobada |
| P019 | carrito.spec.js | agrega un producto con cantidad uno | Aprobada |
| P020 | carrito.spec.js | aumenta cantidad sin superar el stock | Aprobada |
| P021 | carrito.spec.js | calcula el subtotal con precios finales | Aprobada |
| P022 | carrito.spec.js | aplica GAME10 a productos sin oferta | Aprobada |
| P023 | carrito.spec.js | no suma cupón sobre productos en oferta | Aprobada |
| P024 | componentes.spec.js | renderiza los datos recibidos mediante props | Aprobada |
| P025 | componentes.spec.js | muestra el contenido condicional cuando existe una oferta | Aprobada |
| P026 | componentes.spec.js | ejecuta el evento para agregar un producto al carrito | Aprobada |
| P027 | componentes.spec.js | renderiza el formulario de registro con contraseña y confirmación | Aprobada |
| P028 | interacciones.spec.js | renderiza todos los productos recibidos por props | Aprobada |
| P029 | interacciones.spec.js | oculta la etiqueta de oferta cuando no hay descuento | Aprobada |
| P030 | interacciones.spec.js | deshabilita Agregar si el producto no tiene stock | Aprobada |
| P031 | interacciones.spec.js | actualiza el estado de búsqueda al escribir y filtra el DOM | Aprobada |
| P032 | interacciones.spec.js | muestra un mensaje condicional si no hay coincidencias | Aprobada |
| P033 | interacciones.spec.js | filtra por marca al cambiar el selector | Aprobada |
| P034 | interacciones.spec.js | restablece los filtros mediante el botón Limpiar | Aprobada |
| P035 | interacciones.spec.js | muestra un producto inexistente sin reutilizar el seleccionado antes | Aprobada |
| P036 | interacciones.spec.js | rechaza una cantidad fraccionaria en el detalle | Aprobada |
| P037 | interacciones.spec.js | agrega desde el detalle y muestra confirmación | Aprobada |
| P038 | interacciones.spec.js | muestra error al enviar un registro vacío | Aprobada |
| P039 | interacciones.spec.js | comprueba la confirmación de contraseña usando el estado del formulario | Aprobada |
| P040 | interacciones.spec.js | guarda solo el perfil y no guarda ni muestra la contraseña | Aprobada |
| P041 | interacciones.spec.js | muestra carrito vacío en checkout | Aprobada |
| P042 | interacciones.spec.js | autocompleta checkout con el perfil conectado | Aprobada |
| P043 | interacciones.spec.js | muestra cuatro errores al enviar checkout incompleto | Aprobada |
| P044 | interacciones.spec.js | redirige una compra rechazada y conserva el carrito | Aprobada |
| P045 | interacciones.spec.js | confirma una compra, vacía el carrito y guarda resumen con productos | Aprobada |
| P046 | interacciones.spec.js | no inventa una compra exitosa al abrir la URL sin pedido | Aprobada |
| P047 | interacciones.spec.js | rechaza un producto administrativo con descuento fuera de rango | Aprobada |
| P048 | interacciones.spec.js | permite editar y enviar un producto existente | Aprobada |
| P049 | interacciones.spec.js | ejecuta eliminación por el ID correcto | Aprobada |
| P050 | interacciones.spec.js | valida campos obligatorios de contacto | Aprobada |
| P051 | interacciones.spec.js | confirma contacto válido indicando que es una demostración | Aprobada |
| P052 | interacciones.spec.js | muestra categorías con su cantidad de productos | Aprobada |
| P053 | interacciones.spec.js | abre una publicación del blog y permite volver al listado | Aprobada |
| P054 | interacciones.spec.js | rechaza un ingreso con campos inválidos | Aprobada |
| P055 | interacciones.spec.js | informa que se necesita un perfil registrado antes de ingresar | Aprobada |
| P056 | interacciones.spec.js | recupera un perfil de demostración sin almacenar contraseña | Aprobada |
| P057 | interacciones.spec.js | muestra un resumen recuperado después de recargar el resultado | Aprobada |
| P058 | interacciones.spec.js | muestra resumen y reintento para una compra rechazada | Aprobada |
| P059 | interacciones.spec.js | crea un producto administrativo normalizando los números | Aprobada |
| P060 | interacciones.spec.js | rechaza un código administrativo duplicado | Aprobada |
| P061 | persistencia.spec.js | usa un mock de Storage para recuperar el catálogo inicial si el JSON está dañado | Aprobada |
| P062 | persistencia.spec.js | no pierde un catálogo que el administrador dejó vacío | Aprobada |
| P063 | persistencia.spec.js | descarta un objeto almacenado que no sea un catálogo | Aprobada |
| P064 | persistencia.spec.js | persiste productos y permite recuperarlos sin perder las ediciones | Aprobada |
| P065 | persistencia.spec.js | informa un error de escritura mediante un mock que lanza excepción | Aprobada |
| P066 | persistencia.spec.js | genera IDs diferentes aunque dos productos se creen en el mismo milisegundo | Aprobada |
| P067 | persistencia.spec.js | limita al stock la primera incorporación al carrito | Aprobada |
| P068 | persistencia.spec.js | no agrega productos agotados | Aprobada |
| P069 | persistencia.spec.js | normaliza cantidades fraccionarias e inválidas | Aprobada |
| P070 | persistencia.spec.js | sincroniza el carrito con stock y precio actuales y elimina productos borrados | Aprobada |
| P071 | persistencia.spec.js | calcula el cupón solo sobre la parte sin oferta de un carrito mixto | Aprobada |
| P072 | persistencia.spec.js | rechaza stock vacío, fraccionario y descuento fuera de rango | Aprobada |
| P073 | persistencia.spec.js | valida correo y largo de contraseña en el registro | Aprobada |
| P074 | productos.spec.js | calcula un precio con descuento | Aprobada |
| P075 | productos.spec.js | mantiene el precio sin descuento | Aprobada |
| P076 | productos.spec.js | filtra por texto sin distinguir mayúsculas | Aprobada |
| P077 | productos.spec.js | filtra la categoría Consolas | Aprobada |
| P078 | productos.spec.js | ordena productos por menor precio | Aprobada |
| P079 | productos.spec.js | crea un producto sin modificar la lista original | Aprobada |
| P080 | productos.spec.js | actualiza solo el producto seleccionado | Aprobada |
| P081 | productos.spec.js | elimina un producto por identificador | Aprobada |
| P082 | validaciones.spec.js | acepta un checkout completo | Aprobada |
| P083 | validaciones.spec.js | detecta campos y correo inválidos | Aprobada |
| P084 | validaciones.spec.js | valida los datos mínimos de un producto | Aprobada |
