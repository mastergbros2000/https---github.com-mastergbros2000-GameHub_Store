import { productosIniciales } from '../data/productos.js';

// Una versión anterior guardaba /img/productos/; los archivos actuales están en /imagenes/.
// Se reconoce el nombre del archivo para conservar la foto elegida en administración.
export function normalizarImagenProducto(producto) {
    const archivo = (producto.imagen || '').replaceAll('\\', '/').split('/').pop();
    const porArchivo = productosIniciales.find((item) => item.imagen.split('/').pop() === archivo);
    const porCodigo = productosIniciales.find((item) => item.codigo === producto.codigo);
    return porArchivo?.imagen || porCodigo?.imagen || producto.imagen;
}

// BASE_URL permite servir los medios desde la carpeta configurada en Vite.
export function rutaPublica(ruta) {
    return `${import.meta.env.BASE_URL}${ruta.replace(/^\/+/, '')}`;
}

export function imagenProducto(producto) {
    const ruta = normalizarImagenProducto(producto);
    return ruta?.startsWith('/imagenes/') ? rutaPublica(ruta) : ruta;
}
