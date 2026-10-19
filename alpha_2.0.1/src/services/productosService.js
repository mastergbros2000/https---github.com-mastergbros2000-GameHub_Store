import { productosIniciales } from '../data/productos.js';
import { leerJSON, guardarJSON } from './storageService.js';
import { normalizarImagenProducto } from './imagenesService.js';

export const CLAVE_PRODUCTOS = 'gamehub_productos_ev2';

export function leerProductos() {
    const respaldo = productosIniciales.map((producto) => ({ ...producto }));
    const guardados = leerJSON(CLAVE_PRODUCTOS, respaldo);
    const esCatalogo =
        Array.isArray(guardados) &&
        guardados.every(
            (producto) =>
                producto &&
                Number.isInteger(producto.id) &&
                typeof producto.nombre === 'string' &&
                typeof producto.categoria === 'string' &&
                typeof producto.marca === 'string' &&
                typeof producto.codigo === 'string' &&
                typeof producto.imagen === 'string' &&
                Number.isFinite(producto.precio) &&
                producto.precio > 0 &&
                Number.isInteger(producto.stock) &&
                producto.stock >= 0 &&
                Number.isFinite(producto.descuento) &&
                producto.descuento >= 0 &&
                producto.descuento <= 100,
        );
    return esCatalogo
        ? guardados.map((producto) => ({ ...producto, imagen: normalizarImagenProducto(producto) }))
        : respaldo;
}

export function guardarProductos(productos) {
    return guardarJSON(CLAVE_PRODUCTOS, productos);
}

export function crearProducto(productos, producto) {
    const id = Math.max(Date.now(), ...productos.map((item) => item.id + 1));
    return [...productos, { ...producto, id }];
}

export function actualizarProducto(productos, editado) {
    return productos.map((producto) => (producto.id === editado.id ? { ...editado } : producto));
}

export function eliminarProducto(productos, id) {
    return productos.filter((producto) => producto.id !== id);
}

export function precioFinal(producto) {
    return Math.round(producto.precio * (1 - (producto.descuento || 0) / 100));
}

export function filtrarProductos(productos, categoria, marca, orden, busqueda = '') {
    const texto = busqueda.trim().toLowerCase();
    const filtrados = productos.filter(
        (producto) =>
            (categoria === 'Todas' || producto.categoria === categoria) &&
            (marca === 'Todas' || producto.marca === marca) &&
            producto.nombre.toLowerCase().includes(texto),
    );

    return [...filtrados].sort((a, b) => {
        if (orden === 'Menor precio') return precioFinal(a) - precioFinal(b);
        if (orden === 'Mayor precio') return precioFinal(b) - precioFinal(a);
        if (orden === 'Alfabético') return a.nombre.localeCompare(b.nombre);
        return 0;
    });
}
