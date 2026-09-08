/* =========================================================
   FUNCIONES DE LA TIENDA
   Inicio, catálogo, detalle, carrito, órdenes y blog.
   ========================================================= */

function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta producto';

    const textoStock = producto.stock > 0
        ? `Stock disponible: ${producto.stock}`
        : 'Producto sin stock';

    tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.marca} - ${producto.categoria}</p>
        ${producto.descuento > 0 ? `
            <p class="oferta">Oferta -${producto.descuento}%</p>
            <p class="precio-anterior">Precio normal: ${formatoPrecio(producto.precio)}</p>
        ` : ''}
        <p class="precio">${formatoPrecio(precioFinal(producto))}</p>
        <div class="pie-tarjeta">
            <p class="${producto.stock > 0 ? '' : 'sin-stock'}">${textoStock}</p>
            <div class="acciones">
                <a class="boton boton-secundario" href="detalle.html?id=${producto.id}">Ver detalle</a>
                <button class="boton" type="button" data-agregar="${producto.id}" ${producto.stock > 0 ? '' : 'disabled'}>Agregar</button>
            </div>
        </div>
    `;

    return tarjeta;
}

function activarBotonesAgregar() {
    document.querySelectorAll('[data-agregar]').forEach(boton => {
        boton.addEventListener('click', () => {
            agregarAlCarrito(Number(boton.dataset.agregar));
        });
    });
}

function agregarAlCarrito(id, cantidad = 1) {
    const producto = productos.find(item => item.id === id);

    if (!producto || producto.stock === 0) {
        return;
    }

    const carrito = obtenerCarrito();
    const linea = carrito.find(item => item.id === id);
    const cantidadActual = linea ? linea.cantidad : 0;

    if (cantidadActual + cantidad > producto.stock) {
        alert('No existe stock suficiente para esa cantidad.');
        return;
    }

    if (linea) {
        linea.cantidad += cantidad;
    } else {
        carrito.push({ id, cantidad });
    }

    guardarCarrito(carrito);
    alert('Producto agregado al carrito.');
}

function iniciarInicio() {
    const contenedor = document.getElementById('productos-destacados');

    if (!contenedor) {
        return;
    }

    productos.slice(0, 3).forEach(producto => {
        contenedor.appendChild(crearTarjetaProducto(producto));
    });

    activarBotonesAgregar();
}

function iniciarCatalogo() {
    const contenedor = document.getElementById('lista-productos');
    const formulario = document.getElementById('formulario-filtros');

    if (!contenedor || !formulario) {
        return;
    }

    function mostrarProductos() {
        const categoria = document.getElementById('categoria').value;
        const marca = document.getElementById('marca').value;
        const orden = document.getElementById('orden').value;
        const minimo = Number(document.getElementById('precio-minimo').value) || 0;
        const valorMaximo = document.getElementById('precio-maximo').value;
        const maximo = valorMaximo === '' ? Infinity : Number(valorMaximo);

        if (minimo > maximo) {
            mostrarMensaje('error-precio', 'El precio mínimo no puede ser mayor que el máximo.', 'error');
            return;
        }

        mostrarMensaje('error-precio', '', 'error');

        const resultado = productos.filter(producto =>
            (!categoria || producto.categoria === categoria) &&
            (!marca || producto.marca === marca) &&
            precioFinal(producto) >= minimo &&
            precioFinal(producto) <= maximo
        );

        if (orden === 'precio-menor') {
            resultado.sort((a, b) => precioFinal(a) - precioFinal(b));
        } else if (orden === 'precio-mayor') {
            resultado.sort((a, b) => precioFinal(b) - precioFinal(a));
        } else if (orden === 'nombre') {
            resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }

        contenedor.innerHTML = '';

        resultado.forEach(producto => {
            contenedor.appendChild(crearTarjetaProducto(producto));
        });

        if (resultado.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron productos con esos filtros.</p>';
        }

        activarBotonesAgregar();
    }

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();
        mostrarProductos();
    });

    formulario.addEventListener('reset', () => {
        setTimeout(mostrarProductos, 0);
    });

    mostrarProductos();
}

function iniciarDetalle() {
    const contenedor = document.getElementById('detalle-producto');

    if (!contenedor) {
        return;
    }

    const id = Number(new URLSearchParams(window.location.search).get('id')) || productos[0].id;
    const producto = productos.find(item => item.id === id) || productos[0];

    contenedor.innerHTML = `
        <div>
            <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <article>
            <p>${producto.categoria} / ${producto.marca}</p>
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <h3>Especificaciones</h3>
            <ul>
                <li>Producto nuevo.</li>
                <li>Garantía de 12 meses.</li>
                <li>Despacho disponible.</li>
            </ul>
            ${producto.descuento > 0 ? `<p class="precio-anterior">Precio normal: ${formatoPrecio(producto.precio)}</p>` : ''}
            <p class="precio">${formatoPrecio(precioFinal(producto))}</p>
            <p>Stock disponible: ${producto.stock}</p>
            <label for="cantidad">Cantidad</label>
            <input id="cantidad" type="number" min="1" max="${producto.stock}" value="1">
            <p id="error-cantidad" class="mensaje"></p>
            <button id="agregar-detalle" class="boton" type="button" ${producto.stock > 0 ? '' : 'disabled'}>Agregar al carrito</button>
        </article>
    `;

    document.getElementById('agregar-detalle').addEventListener('click', () => {
        const cantidad = Number(document.getElementById('cantidad').value);

        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.stock) {
            mostrarMensaje('error-cantidad', `Ingresa una cantidad entre 1 y ${producto.stock}.`, 'error');
            return;
        }

        mostrarMensaje('error-cantidad', '', 'error');
        agregarAlCarrito(producto.id, cantidad);
    });
}

function calcularResumen(carrito) {
    const subtotal = carrito.reduce((total, linea) => {
        const producto = productos.find(item => item.id === linea.id);
        return total + precioFinal(producto) * linea.cantidad;
    }, 0);

    const montoSinOferta = carrito.reduce((total, linea) => {
        const producto = productos.find(item => item.id === linea.id);
        return total + (producto.descuento === 0 ? producto.precio * linea.cantidad : 0);
    }, 0);

    const cuponActivo = localStorage.getItem('cuponGameHub') === 'GAME10';
    const descuento = cuponActivo ? montoSinOferta * 0.10 : 0;

    return {
        subtotal,
        descuento,
        total: subtotal - descuento
    };
}

function iniciarCarrito() {
    const contenedor = document.getElementById('lineas-carrito');

    if (!contenedor) {
        return;
    }

    function mostrarCarrito() {
        const carrito = obtenerCarrito();
        contenedor.innerHTML = '';

        if (carrito.length === 0) {
            contenedor.innerHTML = '<p>Tu carrito está vacío. Visita el catálogo para agregar productos.</p>';
        }

        carrito.forEach(linea => {
            const producto = productos.find(item => item.id === linea.id);
            const tarjeta = document.createElement('article');
            tarjeta.className = 'tarjeta linea-carrito';
            tarjeta.innerHTML = `
                <strong>${producto.nombre}</strong>
                <span>${formatoPrecio(precioFinal(producto))}</span>
                <label>Cantidad
                    <input data-cantidad="${linea.id}" type="number" min="1" max="${producto.stock}" value="${linea.cantidad}">
                </label>
                <span>${formatoPrecio(precioFinal(producto) * linea.cantidad)}</span>
                <button class="boton" type="button" data-quitar="${linea.id}">Quitar</button>
            `;
            contenedor.appendChild(tarjeta);
        });

        const resumen = calcularResumen(carrito);
        document.getElementById('subtotal').textContent = formatoPrecio(resumen.subtotal);
        document.getElementById('descuento').textContent = formatoPrecio(resumen.descuento);
        document.getElementById('total').textContent = formatoPrecio(resumen.total);

        document.querySelectorAll('[data-quitar]').forEach(boton => {
            boton.addEventListener('click', () => {
                const actualizado = obtenerCarrito().filter(linea => linea.id !== Number(boton.dataset.quitar));
                guardarCarrito(actualizado);
                mostrarCarrito();
            });
        });

        document.querySelectorAll('[data-cantidad]').forEach(campo => {
            campo.addEventListener('change', () => {
                const carritoActual = obtenerCarrito();
                const linea = carritoActual.find(item => item.id === Number(campo.dataset.cantidad));
                const producto = productos.find(item => item.id === linea.id);
                const cantidad = Number(campo.value);

                if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.stock) {
                    alert(`La cantidad debe estar entre 1 y ${producto.stock}.`);
                    campo.value = linea.cantidad;
                    return;
                }

                linea.cantidad = cantidad;
                guardarCarrito(carritoActual);
                mostrarCarrito();
            });
        });
    }

    document.getElementById('aplicar-cupon').addEventListener('click', () => {
        const codigo = document.getElementById('cupon').value.trim().toUpperCase();

        if (codigo === 'GAME10') {
            localStorage.setItem('cuponGameHub', 'GAME10');
            mostrarMensaje('mensaje-cupon', 'Cupón aplicado: 10% en productos sin oferta.', 'exito');
        } else {
            localStorage.removeItem('cuponGameHub');
            mostrarMensaje('mensaje-cupon', 'El cupón no existe o está vencido.', 'error');
        }

        mostrarCarrito();
    });

    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        localStorage.removeItem('cuponGameHub');
        guardarCarrito([]);
        mostrarCarrito();
    });

    mostrarCarrito();
}

function iniciarOrdenes() {
    const contenedor = document.getElementById('lista-ordenes');

    if (!contenedor) {
        return;
    }

    const ordenes = leerAlmacenamiento('ordenesGameHub', []);

    if (ordenes.length === 0) {
        contenedor.innerHTML = '<p>Todavía no existen órdenes. Realiza una compra para ver su seguimiento.</p>';
        return;
    }

    ordenes.slice().reverse().forEach(orden => {
        const nombres = orden.productos.map(linea => {
            const producto = productos.find(item => item.id === linea.id);
            return producto ? producto.nombre : 'Producto no disponible';
        }).join(', ');

        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta';
        tarjeta.innerHTML = `
            <h2>Orden ${orden.numero}</h2>
            <p>Fecha: ${orden.fecha}</p>
            <p>Productos: ${nombres}</p>
            <p>Total: ${formatoPrecio(orden.total)}</p>
            <p><span class="estado">${orden.estado}</span></p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function iniciarBlog() {
    const lista = document.getElementById('lista-blog');

    if (!lista) {
        return;
    }

    publicaciones.forEach(publicacion => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta';
        tarjeta.innerHTML = `
            <img src="${publicacion.imagen}" alt="${publicacion.titulo}">
            <h2>${publicacion.titulo}</h2>
            <p>${publicacion.resumen}</p>
            <a class="boton" href="blog-detalle-${publicacion.id}.html">Leer publicación</a>
        `;
        lista.appendChild(tarjeta);
    });
}

function iniciarDetalleBlog() {
    const contenedor = document.getElementById('detalle-blog');

    if (!contenedor) {
        return;
    }

    const id = Number(contenedor.dataset.blogId);
    const publicacion = publicaciones.find(item => item.id === id);

    if (!publicacion) {
        contenedor.innerHTML = '<p>La publicación solicitada no existe.</p>';
        return;
    }

    contenedor.innerHTML = `
        <img class="imagen-blog" src="${publicacion.imagen}" alt="${publicacion.titulo}">
        <h2>${publicacion.titulo}</h2>
        <p>${publicacion.contenido}</p>
        <a class="boton boton-secundario" href="blog.html">Volver al blog</a>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarInicio();
    iniciarCatalogo();
    iniciarDetalle();
    iniciarCarrito();
    iniciarOrdenes();
    iniciarBlog();
    iniciarDetalleBlog();
});
