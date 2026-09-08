/* =========================================================
   VALIDACIONES DE FORMULARIOS PUBLICOS
   Cada funcion revisa un formulario y muestra mensajes claros.
   ========================================================= */

function validarTexto(campo, idMensaje, nombre, maximo, obligatorio = true) {
    const valor = campo.value.trim();
    let mensaje = '';

    if (obligatorio && valor === '') {
        mensaje = `${nombre} es obligatorio.`;
    } else if (valor.length > maximo) {
        mensaje = `${nombre} permite un máximo de ${maximo} caracteres.`;
    }

    return mostrarMensaje(idMensaje, mensaje, 'error');
}

function validarCorreo(campo, idMensaje, obligatorio = true) {
    const correo = campo.value.trim();
    let mensaje = '';

    if (obligatorio && correo === '') {
        mensaje = 'El correo es obligatorio.';
    } else if (correo.length > 100) {
        mensaje = 'El correo permite un máximo de 100 caracteres.';
    } else if (correo !== '' && !correoPermitido(correo)) {
        mensaje = 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }

    return mostrarMensaje(idMensaje, mensaje, 'error');
}

function validarClave(campo, idMensaje) {
    let mensaje = '';

    if (campo.value === '') {
        mensaje = 'La contraseña es obligatoria.';
    } else if (campo.value.length < 4 || campo.value.length > 10) {
        mensaje = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    return mostrarMensaje(idMensaje, mensaje, 'error');
}

function prepararRegistro() {
    const formulario = document.getElementById('formulario-registro');
    if (!formulario) return;

    conectarRegionComuna('registro-region', 'registro-comuna');

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();
        const rut = document.getElementById('registro-rut');
        const nombre = document.getElementById('registro-nombre');
        const apellidos = document.getElementById('registro-apellidos');
        const correo = document.getElementById('registro-correo');
        const clave = document.getElementById('registro-clave');
        const direccion = document.getElementById('registro-direccion');
        const region = document.getElementById('registro-region');
        const comuna = document.getElementById('registro-comuna');
        const rutCorrecto = mostrarMensaje(
            'error-registro-rut',
            validarRut(rut.value)
                ? ''
                : 'Ingresa un RUN válido, sin puntos ni guion. Ejemplo: 19011022K.',
            'error'
        );
        const nombreCorrecto = validarTexto(
            nombre,
            'error-registro-nombre',
            'El nombre',
            50
        );
        const apellidosCorrectos = validarTexto(
            apellidos,
            'error-registro-apellidos',
            'Los apellidos',
            100
        );
        const correoCorrecto = validarCorreo(correo, 'error-registro-correo');
        const claveCorrecta = validarClave(clave, 'error-registro-clave');
        const direccionCorrecta = validarTexto(
            direccion,
            'error-registro-direccion',
            'La dirección',
            300
        );
        const regionCorrecta = mostrarMensaje(
            'error-registro-region',
            region.value ? '' : 'Selecciona una región.',
            'error'
        );
        const comunaCorrecta = mostrarMensaje(
            'error-registro-comuna',
            comuna.value ? '' : 'Selecciona una comuna.',
            'error'
        );

        if (
            rutCorrecto &&
            nombreCorrecto &&
            apellidosCorrectos &&
            correoCorrecto &&
            claveCorrecta &&
            direccionCorrecta &&
            regionCorrecta &&
            comunaCorrecta
        ) {
            const usuarios = leerAlmacenamiento('usuariosGameHub', []);
            usuarios.push({
                rut: limpiarRut(rut.value),
                nombre: nombre.value.trim(),
                correo: correo.value.trim(),
                clave: clave.value,
                tipo: 'Cliente'
            });
            guardarAlmacenamiento('usuariosGameHub', usuarios);
            formulario.reset();
            document.getElementById('registro-comuna').disabled = true;
            mostrarMensaje(
                'resultado-registro',
                'Registro completado correctamente.',
                'exito'
            );
        }
    });
}

function prepararLogin() {
    const formulario = document.getElementById('formulario-login');
    if (!formulario) return;

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();
        const correo = document.getElementById('login-correo');
        const clave = document.getElementById('login-clave');
        const correoCorrecto = validarCorreo(correo, 'error-login-correo');
        const claveCorrecta = validarClave(clave, 'error-login-clave');
        if (correoCorrecto && claveCorrecta) {
            mostrarMensaje(
                'resultado-login',
                'Datos válidos. Inicio de sesión simulado correctamente.',
                'exito'
            );
        }
    });
}

function prepararContacto() {
    const formulario = document.getElementById('formulario-contacto');
    if (!formulario) return;

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();
        const nombreCorrecto = validarTexto(
            document.getElementById('contacto-nombre'),
            'error-contacto-nombre',
            'El nombre',
            100
        );
        const correoCorrecto = validarCorreo(
            document.getElementById('contacto-correo'),
            'error-contacto-correo'
        );
        const comentarioCorrecto = validarTexto(
            document.getElementById('contacto-comentario'),
            'error-contacto-comentario',
            'El comentario',
            500
        );

        if (nombreCorrecto && correoCorrecto && comentarioCorrecto) {
            formulario.reset();
            mostrarMensaje(
                'resultado-contacto',
                'Mensaje enviado correctamente.',
                'exito'
            );
        }
    });
}

function prepararCheckout() {
    const formulario = document.getElementById('formulario-checkout');
    if (!formulario) return;

    conectarRegionComuna('checkout-region', 'checkout-comuna');

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();
        const nombreCorrecto = validarTexto(
            document.getElementById('checkout-nombre'),
            'error-checkout-nombre',
            'El nombre',
            100
        );
        const correoCorrecto = validarCorreo(
            document.getElementById('checkout-correo'),
            'error-checkout-correo'
        );
        const direccionCorrecta = validarTexto(
            document.getElementById('checkout-direccion'),
            'error-checkout-direccion',
            'La dirección',
            300
        );
        const region = document.getElementById('checkout-region');
        const comuna = document.getElementById('checkout-comuna');
        const regionCorrecta = mostrarMensaje(
            'error-checkout-region',
            region.value ? '' : 'Selecciona una región.',
            'error'
        );
        const comunaCorrecta = mostrarMensaje(
            'error-checkout-comuna',
            comuna.value ? '' : 'Selecciona una comuna.',
            'error'
        );

        if (obtenerCarrito().length === 0) {
            mostrarMensaje(
                'resultado-checkout',
                'Agrega productos antes de confirmar la compra.',
                'error'
            );
        } else if (
            nombreCorrecto &&
            correoCorrecto &&
            direccionCorrecta &&
            regionCorrecta &&
            comunaCorrecta
        ) {
            const carrito = obtenerCarrito();
            const resumen = calcularResumen(carrito);
            const ordenes = leerAlmacenamiento('ordenesGameHub', []);
            ordenes.push({
                numero: Date.now(),
                fecha: new Date().toLocaleDateString('es-CL'),
                estado: 'Recibido',
                productos: carrito,
                total: resumen.total
            });
            guardarAlmacenamiento('ordenesGameHub', ordenes);
            guardarCarrito([]);
            formulario.reset();
            mostrarMensaje(
                'resultado-checkout',
                'Compra confirmada. Puedes revisar el pedido en Mis órdenes.',
                'exito'
            );
        }
    });
}

function activarValidacionDuranteEscritura() {
    document.querySelectorAll('form input, form select, form textarea').forEach(campo => {
        campo.addEventListener('input', () => {
            const mensaje = campo.parentElement.querySelector('.mensaje');

            if (mensaje) {
                mensaje.textContent = '';
                mensaje.className = 'mensaje';
            }
        });
    });

    document.querySelectorAll('input[type="email"]').forEach(campo => {
        campo.addEventListener('blur', () => {
            const mensaje = campo.parentElement.querySelector('.mensaje');

            if (mensaje) {
                validarCorreo(campo, mensaje.id);
            }
        });
    });

    document.querySelectorAll('input[type="password"]').forEach(campo => {
        campo.addEventListener('blur', () => {
            const mensaje = campo.parentElement.querySelector('.mensaje');

            if (mensaje) {
                validarClave(campo, mensaje.id);
            }
        });
    });

    document.querySelectorAll('input[id$="-rut"]').forEach(campo => {
        campo.addEventListener('blur', () => {
            const mensaje = campo.parentElement.querySelector('.mensaje');
            mostrarMensaje(
                mensaje.id,
                validarRut(campo.value)
                    ? ''
                    : 'Ingresa un RUN válido, sin puntos ni guion.',
                'error'
            );
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    prepararRegistro();
    prepararLogin();
    prepararContacto();
    prepararCheckout();
    activarValidacionDuranteEscritura();
});
