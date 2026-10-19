import { agregarProducto, descuentoCupon, subtotalCarrito } from '../services/carritoService.js';

describe('Carrito GameHub Store', () => {
    const producto = { id: 1, precio: 10000, descuento: 0, stock: 5 };

    it('agrega un producto con cantidad uno', () => {
        expect(agregarProducto([], producto)[0].cantidad).toBe(1);
    });

    it('aumenta cantidad sin superar el stock', () => {
        expect(agregarProducto([{ ...producto, cantidad: 4 }], producto, 3)[0].cantidad).toBe(5);
    });

    it('calcula el subtotal con precios finales', () => {
        expect(subtotalCarrito([{ ...producto, cantidad: 2 }])).toBe(20000);
    });

    it('aplica GAME10 a productos sin oferta', () => {
        expect(descuentoCupon([{ ...producto, cantidad: 2 }], 'GAME10')).toBe(2000);
    });

    it('no suma cupón sobre productos en oferta', () => {
        expect(descuentoCupon([{ ...producto, descuento: 20, cantidad: 2 }], 'GAME10')).toBe(0);
    });
});
