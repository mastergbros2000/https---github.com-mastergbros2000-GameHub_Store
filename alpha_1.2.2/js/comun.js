/* =========================================================
   FUNCIONES COMPARTIDAS
   Formato, mensajes, localStorage, regiones y navegación.
   ========================================================= */

function formatoPrecio(valor) {
    return '$' + Math.round(valor).toLocaleString('es-CL');
}

function precioFinal(producto) {
    return producto.precio - (producto.precio * producto.descuento / 100);
}

function leerAlmacenamiento(clave, valorInicial) {
    const contenido = localStorage.getItem(clave);

    if (!contenido) {
        return valorInicial;
    }

    try {
        return JSON.parse(contenido);
    } catch (error) {
        localStorage.removeItem(clave);
        return valorInicial;
    }
}

function guardarAlmacenamiento(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerCarrito() {
    const carrito = leerAlmacenamiento('carritoGameHub', []);
    return carrito.filter(linea => productos.some(producto => producto.id === linea.id));
}

function guardarCarrito(carrito) {
    guardarAlmacenamiento('carritoGameHub', carrito);
    actualizarContador();
}

function actualizarContador() {
    document.querySelectorAll('.contador-carrito').forEach(contador => {
        contador.textContent = obtenerCarrito().reduce(
            (total, linea) => total + linea.cantidad,
            0
        );
    });
}

function mostrarMensaje(id, mensaje, tipo) {
    const elemento = document.getElementById(id);

    if (!elemento) {
        return mensaje === '';
    }

    elemento.textContent = mensaje;
    elemento.className = mensaje ? `mensaje mensaje-${tipo}` : 'mensaje';
    return mensaje === '';
}

function correoPermitido(correo) {
    return /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
}

function limpiarRut(rut) {
    return rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
}

function validarRut(rut) {
    const rutLimpio = limpiarRut(rut);

    if (!/^[0-9]{6,8}[0-9K]$/.test(rutLimpio)) {
        return false;
    }

    const cuerpo = rutLimpio.slice(0, -1);
    const digitoIngresado = rutLimpio.slice(-1);
    let suma = 0;
    let multiplicador = 2;

    for (let indice = cuerpo.length - 1; indice >= 0; indice -= 1) {
        suma += Number(cuerpo[indice]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);
    const digitoCalculado = resultado === 11 ? '0' : resultado === 10 ? 'K' : String(resultado);
    return digitoIngresado === digitoCalculado;
}

function cargarRegiones(idRegion) {
    const region = document.getElementById(idRegion);

    if (!region || region.options.length > 1) {
        return;
    }

    Object.keys(regionesComunas).forEach(nombre => {
        const opcion = document.createElement('option');
        opcion.value = nombre;
        opcion.textContent = nombre;
        region.appendChild(opcion);
    });
}

function conectarRegionComuna(idRegion, idComuna) {
    const region = document.getElementById(idRegion);
    const comuna = document.getElementById(idComuna);

    if (!region || !comuna) {
        return;
    }

    cargarRegiones(idRegion);

    region.addEventListener('change', () => {
        comuna.innerHTML = '<option value="">Selecciona una comuna</option>';

        (regionesComunas[region.value] || []).forEach(nombre => {
            const opcion = document.createElement('option');
            opcion.value = nombre;
            opcion.textContent = nombre;
            comuna.appendChild(opcion);
        });

        comuna.disabled = region.value === '';
    });
}

document.addEventListener('DOMContentLoaded', actualizarContador);
