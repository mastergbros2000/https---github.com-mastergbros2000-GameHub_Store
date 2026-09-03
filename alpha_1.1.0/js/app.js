const productos = [
    { 
        id: 7, 
        nombre: 'Notebook ASUS TUF Gaming', 
        categoria: 'Notebooks', 
        marca: 'ASUS', 
        precio: 1099990, 
        descuento: 12, 
        stock: 6, 
        imagen: 'img/productos/notebook_asus_tuf.png', 
        descripcion: 'Notebook ASUS TUF Gaming con gráficos dedicados y teclado retroiluminado.' 
    },
    { 
        id: 8, 
        nombre: 'Mouse Gamer HP', 
        categoria: 'Periféricos', 
        marca: 'HP', 
        precio: 24990, 
        descuento: 0, 
        stock: 18, 
        imagen: 'img/productos/mouse_hp.png', 
        descripcion: 'Mouse HP con cable, rueda central y botones laterales.' 
    },
    { 
        id: 9, 
        nombre: 'MSI GeForce RTX 5060', 
        categoria: 'Componentes', 
        marca: 'MSI', 
        precio: 429990, 
        descuento: 8, 
        stock: 4, 
        imagen: 'img/productos/rtx_5060.png', 
        descripcion: 'Tarjeta gráfica MSI GeForce RTX 5060 Shadow 2X con 8 GB GDDR7.' 
    },
    { 
        id: 10, 
        nombre: 'Teclado mecánico RGB Pro', 
        categoria: 'Periféricos', 
        marca: 'Redragon', 
        precio: 64990, 
        descuento: 0, 
        stock: 14, 
        imagen: 'img/productos/teclado_rgb.png', 
        descripcion: 'Teclado mecánico de tamaño completo con iluminación RGB.' 
    },
    { 
        id: 11, 
        nombre: 'Monitor Master-G 27 pulgadas', 
        categoria: 'Monitores', 
        marca: 'Master-G', 
        precio: 219990, 
        descuento: 0, 
        stock: 8, 
        imagen: 'img/productos/monitor_masterg.png', 
        descripcion: 'Monitor gamer Full HD de 27 pulgadas, 180 Hz y respuesta de 1 ms.' 
    },
    { 
        id: 12, 
        nombre: 'Nintendo Switch 2', 
        categoria: 'Consolas', 
        marca: 'Nintendo', 
        precio: 599990, 
        descuento: 0, 
        stock: 5, 
        imagen: 'img/productos/nintendo_switch_2.png', 
        descripcion: 'Consola Nintendo Switch 2 con controles Joy-Con y modo portátil.' 
    },
    { 
        id: 13, 
        nombre: 'PlayStation 5', 
        categoria: 'Consolas', 
        marca: 'Sony', 
        precio: 649990, 
        descuento: 0, 
        stock: 7, 
        imagen: 'img/productos/playstation_5.png', 
        descripcion: 'Consola PlayStation 5 con control inalámbrico DualSense.' 
    },
    { 
        id: 14, 
        nombre: 'PC Gamer AORUS', 
        categoria: 'Computadores', 
        marca: 'Gigabyte', 
        precio: 2499990, 
        descuento: 0, 
        stock: 2, 
        imagen: 'img/productos/pc_gamer_aorus.png', 
        descripcion: 'Computador gamer AORUS con procesador Ryzen 9 y tarjeta gráfica de alto rendimiento.' 
    },
    { 
        id: 15, 
        nombre: 'Audífonos Gamer JBL', 
        categoria: 'Periféricos', 
        marca: 'JBL', 
        precio: 89990, 
        descuento: 15, 
        stock: 10, 
        imagen: 'img/productos/audifonos_jbl.png', 
        descripcion: 'Audífonos JBL con micrófono integrado para juegos y comunicación.' 
    }
];

function formatoPrecio(valor) { 
    return '$' + Math.round(valor).toLocaleString('es-CL'); 
}

function precioFinal(producto) { 
    return producto.precio - (producto.precio * producto.descuento / 100); 
}

function obtenerCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carritoGameHub')) || [];
    return carritoGuardado.filter(linea => productos.some(producto => producto.id === linea.id));
}

function guardarCarrito(carrito) { 
    localStorage.setItem('carritoGameHub', JSON.stringify(carrito)); 
    actualizarContador(); 
}

function actualizarContador() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = obtenerCarrito().reduce((total, linea) => total + linea.cantidad, 0);
    }
}

function crearTarjeta(producto) {
    const article = document.createElement('article');
    article.className = 'tarjeta';
    
    const stock = producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Producto sin stock';
    
    article.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.marca} - ${producto.categoria}</p>
        ${producto.descuento ? `<p class="oferta">Oferta -${producto.descuento}%</p><p class="precio-anterior">Precio normal: ${formatoPrecio(producto.precio)}</p>` : ''}
        <p class="precio">${formatoPrecio(precioFinal(producto))}</p>
        <p class="${producto.stock ? '' : 'sin-stock'}">${stock}</p>
        <a class="boton boton-secundario" href="detalle.html?id=${producto.id}">Ver detalle</a>
        <button class="boton" data-agregar="${producto.id}" ${producto.stock ? '' : 'disabled'}>Agregar</button>
    `;
    
    return article;
}

function agregarAlCarrito(id, cantidad = 1) {
    const producto = productos.find(item => item.id === id);
    if (!producto || producto.stock === 0) return;
    
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

function activarBotonesAgregar() {
    document.querySelectorAll('[data-agregar]').forEach(boton => {
        boton.addEventListener('click', () => agregarAlCarrito(Number(boton.dataset.agregar)));
    });
}

function iniciarInicio() {
    const contenedor = document.getElementById('productos-destacados');
    if (!contenedor) return;
    
    productos.slice(0, 3).forEach(producto => {
        contenedor.appendChild(crearTarjeta(producto));
    });
    
    activarBotonesAgregar();
}

function iniciarCatalogo() {
    const contenedor = document.getElementById('lista-productos');
    const formulario = document.getElementById('formulario-filtros');
    if (!contenedor || !formulario) return;
    
    function mostrar() {
        const categoria = document.getElementById('categoria').value;
        const marca = document.getElementById('marca').value;
        const minimo = Number(document.getElementById('precio-minimo').value) || 0;
        const maximoCampo = document.getElementById('precio-maximo').value;
        const maximo = maximoCampo === '' ? Infinity : Number(maximoCampo);
        const orden = document.getElementById('orden').value;
        const error = document.getElementById('error-precio');
        
        if (minimo > maximo) { 
            error.textContent = 'El precio mínimo no puede ser mayor que el máximo.'; 
            return; 
        }
        
        error.textContent = '';
        
        let resultado = productos.filter(p => 
            (!categoria || p.categoria === categoria) && 
            (!marca || p.marca === marca) && 
            precioFinal(p) >= minimo && 
            precioFinal(p) <= maximo
        );
        
        if (orden === 'precio-menor') resultado.sort((a, b) => precioFinal(a) - precioFinal(b));
        if (orden === 'precio-mayor') resultado.sort((a, b) => precioFinal(b) - precioFinal(a));
        if (orden === 'nombre') resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        
        contenedor.innerHTML = '';
        resultado.forEach(p => contenedor.appendChild(crearTarjeta(p)));
        
        if (!resultado.length) {
            contenedor.innerHTML = '<p>No se encontraron productos con esos filtros.</p>';
        }
        
        activarBotonesAgregar();
    }
    
    formulario.addEventListener('submit', evento => { 
        evento.preventDefault(); 
        mostrar(); 
    });
    
    formulario.addEventListener('reset', () => setTimeout(mostrar, 0));
    mostrar();
}

function iniciarDetalle() {
    const contenedor = document.getElementById('detalle-producto');
    if (!contenedor) return;
    
    const id = Number(new URLSearchParams(window.location.search).get('id')) || 7;
    const producto = productos.find(p => p.id === id) || productos[0];
    
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
                <li>Producto nuevo</li>
                <li>Garantía de 12 meses</li>
                <li>Despacho disponible</li>
            </ul>
            <p class="precio">${formatoPrecio(precioFinal(producto))}</p>
            <p>Stock disponible: ${producto.stock}</p>
            
            <label for="cantidad">Cantidad</label>
            <input id="cantidad" type="number" min="1" max="${producto.stock}" value="1">
            <p id="error-cantidad" class="mensaje-error"></p>
            
            <button id="agregar-detalle" class="boton" ${producto.stock ? '' : 'disabled'}>Agregar al carrito</button>
            
            <h3>Reseñas</h3>
            <p>★★★★★ Excelente producto y despacho rápido.</p>
            <p>★★★★☆ Buena relación entre precio y calidad.</p>
        </article>
    `;
    
    document.getElementById('agregar-detalle').addEventListener('click', () => {
        const cantidad = Number(document.getElementById('cantidad').value);
        const error = document.getElementById('error-cantidad');
        
        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.stock) { 
            error.textContent = `Ingresa una cantidad entre 1 y ${producto.stock}.`; 
            return; 
        }
        
        error.textContent = ''; 
        agregarAlCarrito(producto.id, cantidad);
    });
}

let descuentoAplicado = localStorage.getItem('cuponGameHub') === 'GAME10' ? 0.10 : 0;

function calcularResumen(carrito) {
    const subtotal = carrito.reduce((total, linea) => {
        const producto = productos.find(p => p.id === linea.id);
        return total + precioFinal(producto) * linea.cantidad;
    }, 0);
    
    const montoSinOferta = carrito.reduce((total, linea) => {
        const producto = productos.find(p => p.id === linea.id);
        return total + (producto.descuento === 0 ? producto.precio * linea.cantidad : 0);
    }, 0);
    
    const descuento = Math.min(montoSinOferta * descuentoAplicado, subtotal);
    
    return { 
        subtotal, 
        descuento, 
        total: Math.max(0, subtotal - descuento) 
    };
}

function iniciarCarrito() {
    const contenedor = document.getElementById('lineas-carrito');
    if (!contenedor) return;
    
    function mostrar() {
        const carrito = obtenerCarrito(); 
        contenedor.innerHTML = '';
        
        if (!carrito.length) {
            contenedor.innerHTML = '<p>Tu carrito está vacío. Visita el catálogo para agregar productos.</p>';
        }
        
        carrito.forEach(linea => {
            const producto = productos.find(p => p.id === linea.id);
            const article = document.createElement('article'); 
            article.className = 'tarjeta linea-carrito';
            
            article.innerHTML = `
                <strong>${producto.nombre}</strong>
                <span>${formatoPrecio(precioFinal(producto))}</span>
                <label>Cantidad 
                    <input data-cantidad="${linea.id}" type="number" min="1" max="${producto.stock}" value="${linea.cantidad}">
                </label>
                <span>${formatoPrecio(precioFinal(producto) * linea.cantidad)}</span>
                <button class="boton" data-quitar="${linea.id}">Quitar</button>
            `;
            contenedor.appendChild(article);
        });
        
        const resumen = calcularResumen(carrito);
        document.getElementById('subtotal').textContent = formatoPrecio(resumen.subtotal);
        document.getElementById('descuento').textContent = formatoPrecio(resumen.descuento);
        document.getElementById('total').textContent = formatoPrecio(resumen.total);
        
        document.querySelectorAll('[data-quitar]').forEach(b => {
            b.addEventListener('click', () => { 
                guardarCarrito(obtenerCarrito().filter(l => l.id !== Number(b.dataset.quitar))); 
                mostrar(); 
            });
        });
        
        document.querySelectorAll('[data-cantidad]').forEach(c => {
            c.addEventListener('change', () => {
                const carritoActual = obtenerCarrito(); 
                const linea = carritoActual.find(l => l.id === Number(c.dataset.cantidad)); 
                const producto = productos.find(p => p.id === linea.id); 
                const valor = Number(c.value);
                
                if (!Number.isInteger(valor) || valor < 1 || valor > producto.stock) { 
                    alert(`La cantidad debe estar entre 1 y ${producto.stock}.`); 
                    c.value = linea.cantidad; 
                    return; 
                }
                
                linea.cantidad = valor; 
                guardarCarrito(carritoActual); 
                mostrar();
            });
        });
    }
    
    document.getElementById('aplicar-cupon').addEventListener('click', () => {
        const codigo = document.getElementById('cupon').value.trim().toUpperCase(); 
        const mensaje = document.getElementById('mensaje-cupon');
        
        if (codigo === 'GAME10') { 
            descuentoAplicado = 0.10; 
            localStorage.setItem('cuponGameHub', 'GAME10'); 
            mensaje.textContent = 'Cupón aplicado: 10% en productos sin oferta.'; 
            mensaje.className = 'mensaje-exito'; 
        } else { 
            descuentoAplicado = 0; 
            localStorage.removeItem('cuponGameHub'); 
            mensaje.textContent = 'El cupón no existe o está vencido.'; 
            mensaje.className = 'mensaje-error'; 
        }
        
        mostrar();
    });
    
    document.getElementById('vaciar-carrito').addEventListener('click', () => { 
        descuentoAplicado = 0; 
        localStorage.removeItem('cuponGameHub'); 
        guardarCarrito([]); 
        mostrar(); 
    });
    
    mostrar();
}

function mostrarError(id, mensaje) { 
    const campo = document.getElementById(id); 
    campo.textContent = mensaje; 
    return mensaje === ''; 
}

function iniciarCheckout() {
    const formulario = document.getElementById('formulario-checkout'); 
    if (!formulario) return;
    
    const carrito = obtenerCarrito(); 
    const resumen = calcularResumen(carrito);
    
    document.getElementById('resumen-checkout').textContent = carrito.length 
        ? `Productos: ${carrito.reduce((t, l) => t + l.cantidad, 0)} - Total: ${formatoPrecio(resumen.total)}` 
        : 'El carrito está vacío.';
        
    formulario.addEventListener('submit', evento => {
        evento.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim(); 
        const correo = document.getElementById('correo').value.trim(); 
        const telefono = document.getElementById('telefono').value.trim();
        const region = document.getElementById('region').value; 
        const comuna = document.getElementById('comuna').value.trim(); 
        const direccion = document.getElementById('direccion').value.trim();
        
        let valido = true;
        
        valido = mostrarError('error-nombre', nombre.length >= 3 ? '' : 'Ingresa un nombre de al menos 3 caracteres.') && valido;
        valido = mostrarError('error-correo', /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo) ? '' : 'Ingresa un correo válido.') && valido;
        valido = mostrarError('error-telefono', /^9[0-9]{8}$/.test(telefono) ? '' : 'Ingresa 9 dígitos comenzando con 9.') && valido;
        valido = mostrarError('error-region', region ? '' : 'Selecciona una región.') && valido;
        valido = mostrarError('error-comuna', comuna ? '' : 'Ingresa la comuna.') && valido;
        valido = mostrarError('error-direccion', direccion.length >= 5 ? '' : 'Ingresa una dirección válida.') && valido;
        valido = mostrarError('error-carrito', carrito.length ? '' : 'No puedes comprar con el carrito vacío.') && valido;
        
        if (!valido) return;
        
        const numero = 'GH-' + Date.now().toString().slice(-6);
        const ordenes = JSON.parse(localStorage.getItem('ordenesGameHub')) || [];
        
        ordenes.push({ 
            numero, 
            fecha: new Date().toLocaleDateString('es-CL'), 
            total: resumen.total, 
            estado: 'Preparando pedido', 
            productos: carrito 
        });
        
        localStorage.setItem('ordenesGameHub', JSON.stringify(ordenes)); 
        localStorage.removeItem('cuponGameHub'); 
        descuentoAplicado = 0; 
        guardarCarrito([]);
        
        document.getElementById('confirmacion').innerHTML = `<p class="mensaje-exito">Compra confirmada. Tu número de orden es <strong>${numero}</strong>.</p>`;
        formulario.reset();
    });
}

function iniciarOrdenes() {
    const contenedor = document.getElementById('lista-ordenes'); 
    if (!contenedor) return;
    
    const ordenes = JSON.parse(localStorage.getItem('ordenesGameHub')) || [];
    
    if (!ordenes.length) { 
        contenedor.innerHTML = '<p>Todavía no existen órdenes. Realiza una compra para ver su seguimiento.</p>'; 
        return; 
    }
    
    ordenes.slice().reverse().forEach(orden => {
        const nombres = orden.productos.map(l => productos.find(p => p.id === l.id).nombre).join(', ');
        const article = document.createElement('article'); 
        article.className = 'tarjeta';
        
        article.innerHTML = `
            <h2>Orden ${orden.numero}</h2>
            <p>Fecha: ${orden.fecha}</p>
            <p>Productos: ${nombres}</p>
            <p>Total: ${formatoPrecio(orden.total)}</p>
            <p><span class="estado">${orden.estado}</span></p>
            <p>Pago aprobado - Despacho pendiente de asignación.</p>
            <button class="boton">Escribir reseña</button> 
            <button class="boton boton-secundario">Solicitar garantía</button>
        `;
        contenedor.appendChild(article);
    });
}

document.addEventListener('DOMContentLoaded', () => { 
    actualizarContador(); 
    iniciarInicio(); 
    iniciarCatalogo(); 
    iniciarDetalle(); 
    iniciarCarrito(); 
    iniciarCheckout(); 
    iniciarOrdenes(); 
});