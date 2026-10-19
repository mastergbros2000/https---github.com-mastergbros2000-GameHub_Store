import { precioFinal } from './productosService.js';

export function limitarCantidad(cantidad, stock) {
    const numero = Number(cantidad);
    return Number.isFinite(numero) ? Math.max(1, Math.min(Math.trunc(numero), stock)) : 1;
}

export function agregarProducto(carrito, producto, cantidad = 1) {
    if (producto.stock <= 0 || !Number.isInteger(cantidad) || cantidad <= 0) return carrito;
    const existente = carrito.find((item) => item.id === producto.id);
    if (existente) {
        return carrito.map((item) =>
            item.id === producto.id
                ? {
                      ...producto,
                      cantidad: limitarCantidad(item.cantidad + cantidad, producto.stock),
                  }
                : item,
        );
    }
    return [...carrito, { ...producto, cantidad: limitarCantidad(cantidad, producto.stock) }];
}

// Refleja cambios de stock, precio o eliminación hechos desde administración.
export function sincronizarCarrito(carrito, productos) {
    if (!Array.isArray(carrito)) return [];
    return carrito.flatMap((item) => {
        const actual = productos.find((producto) => producto.id === item?.id);
        return actual && actual.stock > 0
            ? [{ ...actual, cantidad: limitarCantidad(item.cantidad, actual.stock) }]
            : [];
    });
}

export function subtotalCarrito(carrito) {
    return carrito.reduce((total, item) => total + precioFinal(item) * item.cantidad, 0);
}

export function descuentoCupon(carrito, cupon) {
    if (cupon.trim().toUpperCase() !== 'GAME10') return 0;
    const base = carrito
        .filter((item) => !item.descuento)
        .reduce((total, item) => total + item.precio * item.cantidad, 0);
    return Math.round(base * 0.1);
}
