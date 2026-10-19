import { productosIniciales } from '../data/productos.js';
import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    filtrarProductos,
    precioFinal,
} from '../services/productosService.js';

describe('Productos GameHub Store', () => {
    it('calcula un precio con descuento', () => {
        expect(precioFinal({ precio: 10000, descuento: 20 })).toBe(8000);
    });

    it('mantiene el precio sin descuento', () => {
        expect(precioFinal({ precio: 24990, descuento: 0 })).toBe(24990);
    });

    it('filtra por texto sin distinguir mayúsculas', () => {
        expect(
            filtrarProductos(productosIniciales, 'Todas', 'Todas', 'Sin ordenar', 'MOUSE'),
        ).toHaveSize(1);
    });

    it('filtra la categoría Consolas', () => {
        expect(filtrarProductos(productosIniciales, 'Consolas', 'Todas', 'Sin ordenar')).toHaveSize(
            2,
        );
    });

    it('ordena productos por menor precio', () => {
        const resultado = filtrarProductos(productosIniciales, 'Todas', 'Todas', 'Menor precio');
        expect(resultado[0].nombre).toBe('Mouse Gamer HP');
    });

    it('crea un producto sin modificar la lista original', () => {
        const original = [{ id: 1, nombre: 'A' }];
        expect(crearProducto(original, { nombre: 'B' })).toHaveSize(2);
        expect(original).toHaveSize(1);
    });

    it('actualiza solo el producto seleccionado', () => {
        const resultado = actualizarProducto(
            [
                { id: 1, nombre: 'A' },
                { id: 2, nombre: 'B' },
            ],
            { id: 2, nombre: 'Editado' },
        );
        expect(resultado[0].nombre).toBe('A');
        expect(resultado[1].nombre).toBe('Editado');
    });

    it('elimina un producto por identificador', () => {
        expect(eliminarProducto([{ id: 1 }, { id: 2 }], 1)).toEqual([{ id: 2 }]);
    });
});
