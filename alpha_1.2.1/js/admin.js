/* =========================================================
   MODULO DE ADMINISTRACION
   Mantiene productos y usuarios usando localStorage.
   ========================================================= */

function productosAdministrables() {
    return leerAlmacenamiento('productosAdminGameHub', productos);
}

function renderProductosAdmin() {
    const cuerpo = document.getElementById('tabla-productos-admin');
    if (!cuerpo) return;

    cuerpo.innerHTML = productosAdministrables()
        .map(
            producto => `
        <tr>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${formatoPrecio(producto.precio)}</td>
            <td>${producto.stock}</td>
        </tr>
    `
        )
        .join('');
}

function prepararProductoAdmin() {
    const formulario = document.getElementById('formulario-producto-admin');
    if (!formulario) return;

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();
        const codigo = document.getElementById('producto-codigo');
        const nombre = document.getElementById('producto-nombre');
        const descripcion = document.getElementById('producto-descripcion');
        const precio = document.getElementById('producto-precio');
        const stock = document.getElementById('producto-stock');
        const critico = document.getElementById('producto-critico');
        const categoria = document.getElementById('producto-categoria');
        const validaciones = [
            mostrarMensaje(
                'error-producto-codigo',
                codigo.value.trim().length >= 3
                    ? ''
                    : 'El código es obligatorio y debe tener al menos 3 caracteres.',
                'error'
            ),
            mostrarMensaje(
                'error-producto-nombre',
                nombre.value.trim() && nombre.value.trim().length <= 100
                    ? ''
                    : 'El nombre es obligatorio y permite hasta 100 caracteres.',
                'error'
            ),
            mostrarMensaje(
                'error-producto-descripcion',
                descripcion.value.length <= 500
                    ? ''
                    : 'La descripción permite hasta 500 caracteres.',
                'error'
            ),
            mostrarMensaje(
                'error-producto-precio',
                precio.value !== '' && Number(precio.value) >= 0
                    ? ''
                    : 'El precio es obligatorio y no puede ser negativo.',
                'error'
            ),
            mostrarMensaje(
                'error-producto-stock',
                stock.value !== '' &&
                    Number.isInteger(Number(stock.value)) &&
                    Number(stock.value) >= 0
                    ? ''
                    : 'El stock debe ser un número entero igual o mayor que cero.',
                'error'
            ),
            mostrarMensaje(
                'error-producto-critico',
                critico.value === '' ||
                    (Number.isInteger(Number(critico.value)) &&
                        Number(critico.value) >= 0)
                    ? ''
                    : 'El stock crítico debe ser un entero igual o mayor que cero.',
                'error'
            ),
            mostrarMensaje(
                'error-producto-categoria',
                categoria.value ? '' : 'Selecciona una categoría.',
                'error'
            )
        ];

        if (validaciones.every(Boolean)) {
            const lista = productosAdministrables();
            lista.push({
                id: Date.now(),
                codigo: codigo.value.trim(),
                nombre: nombre.value.trim(),
                descripcion: descripcion.value.trim(),
                precio: Number(precio.value),
                descuento: 0,
                stock: Number(stock.value),
                stockCritico: Number(critico.value || 0),
                categoria: categoria.value,
                marca: 'Sin marca',
                imagen: 'img/productos/teclado_rgb.png'
            });
            guardarAlmacenamiento('productosAdminGameHub', lista);
            formulario.reset();
            mostrarMensaje(
                'resultado-producto',
                'Producto guardado correctamente.',
                'exito'
            );
        }
    });
}

function renderUsuariosAdmin() {
    const cuerpo = document.getElementById('tabla-usuarios-admin');
    if (!cuerpo) return;
    const usuarios = leerAlmacenamiento('usuariosGameHub', []);
    cuerpo.innerHTML = usuarios.length
        ? usuarios
              .map(
                  usuario => `
        <tr><td>${usuario.rut}</td><td>${usuario.nombre}</td><td>${usuario.correo}</td><td>${usuario.tipo}</td></tr>
    `
              )
              .join('')
        : '<tr><td colspan="4">Todavía no hay usuarios registrados.</td></tr>';
}

function prepararUsuarioAdmin() {
    const formulario = document.getElementById('formulario-usuario-admin');
    if (!formulario) return;
    conectarRegionComuna('usuario-region', 'usuario-comuna');

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();
        const rut = document.getElementById('usuario-rut');
        const nombre = document.getElementById('usuario-nombre');
        const apellidos = document.getElementById('usuario-apellidos');
        const correo = document.getElementById('usuario-correo');
        const direccion = document.getElementById('usuario-direccion');
        const tipo = document.getElementById('usuario-tipo');
        const region = document.getElementById('usuario-region');
        const comuna = document.getElementById('usuario-comuna');
        const validaciones = [
            mostrarMensaje(
                'error-usuario-rut',
                validarRut(rut.value)
                    ? ''
                    : 'Ingresa un RUN válido, sin puntos ni guion.',
                'error'
            ),
            validarTexto(nombre, 'error-usuario-nombre', 'El nombre', 50),
            validarTexto(apellidos, 'error-usuario-apellidos', 'Los apellidos', 100),
            validarCorreo(correo, 'error-usuario-correo'),
            validarTexto(direccion, 'error-usuario-direccion', 'La dirección', 300),
            mostrarMensaje(
                'error-usuario-tipo',
                tipo.value ? '' : 'Selecciona un tipo de usuario.',
                'error'
            ),
            mostrarMensaje(
                'error-usuario-region',
                region.value ? '' : 'Selecciona una región.',
                'error'
            ),
            mostrarMensaje(
                'error-usuario-comuna',
                comuna.value ? '' : 'Selecciona una comuna.',
                'error'
            )
        ];

        if (validaciones.every(Boolean)) {
            const usuarios = leerAlmacenamiento('usuariosGameHub', []);
            usuarios.push({
                rut: limpiarRut(rut.value),
                nombre: `${nombre.value.trim()} ${apellidos.value.trim()}`,
                correo: correo.value.trim(),
                tipo: tipo.value
            });
            guardarAlmacenamiento('usuariosGameHub', usuarios);
            formulario.reset();
            mostrarMensaje(
                'resultado-usuario',
                'Usuario guardado correctamente.',
                'exito'
            );
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductosAdmin();
    prepararProductoAdmin();
    renderUsuariosAdmin();
    prepararUsuarioAdmin();
});
