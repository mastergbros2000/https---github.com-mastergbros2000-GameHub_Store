import {
    leerProductos,
    guardarProductos,
    crearProducto,
    CLAVE_PRODUCTOS,
} from '../services/productosService.js';
import {
    agregarProducto,
    limitarCantidad,
    sincronizarCarrito,
    descuentoCupon,
} from '../services/carritoService.js';
import { guardarJSON } from '../services/storageService.js';
import { productoValido, validarRegistro } from '../services/validaciones.js';

describe('Persistencia y casos límite', () => {
    afterEach(() => localStorage.clear());

    it('usa un mock de Storage para recuperar el catálogo inicial si el JSON está dañado', () => {
        spyOn(Storage.prototype, 'getItem').and.returnValue('{JSON-invalido');
        expect(leerProductos().length).toBe(9);
    });

    it('no pierde un catálogo que el administrador dejó vacío', () => {
        spyOn(Storage.prototype, 'getItem').and.returnValue('[]');
        expect(leerProductos()).toEqual([]);
    });

    it('descarta un objeto almacenado que no sea un catálogo', () => {
        spyOn(Storage.prototype, 'getItem').and.returnValue('{"dato":1}');
        expect(leerProductos().length).toBe(9);
    });

    it('persiste productos y permite recuperarlos sin perder las ediciones', () => {
        const productos = leerProductos();
        productos[0].nombre = 'Nombre editado';
        productos[0].imagen = '/img/productos/notebook_asus_tuf.png';
        productos[0].precio = 800000;
        expect(guardarProductos(productos)).toBeTrue();
        expect(leerProductos()[0].nombre).toBe('Nombre editado');
        expect(leerProductos()[0].imagen).toBe('/imagenes/notebook_asus_tuf.png');
        expect(leerProductos()[0].precio).toBe(800000);
        expect(localStorage.getItem(CLAVE_PRODUCTOS)).not.toBeNull();
    });

    it('informa un error de escritura mediante un mock que lanza excepción', () => {
        spyOn(Storage.prototype, 'setItem').and.throwError('Sin espacio');
        expect(guardarJSON('prueba', {})).toBeFalse();
    });

    it('genera IDs diferentes aunque dos productos se creen en el mismo milisegundo', () => {
        spyOn(Date, 'now').and.returnValue(100);
        const primero = crearProducto([], { nombre: 'A' });
        const segundo = crearProducto(primero, { nombre: 'B' });
        expect(segundo[0].id).not.toBe(segundo[1].id);
    });

    it('limita al stock la primera incorporación al carrito', () => {
        expect(agregarProducto([], { id: 1, stock: 2 }, 8)[0].cantidad).toBe(2);
    });

    it('no agrega productos agotados', () => {
        expect(agregarProducto([], { id: 1, stock: 0 })).toEqual([]);
    });

    it('normaliza cantidades fraccionarias e inválidas', () => {
        expect(limitarCantidad(1.7, 10)).toBe(1);
        expect(limitarCantidad(NaN, 10)).toBe(1);
        expect(limitarCantidad(-1, 10)).toBe(1);
    });

    it('sincroniza el carrito con stock y precio actuales y elimina productos borrados', () => {
        const resultado = sincronizarCarrito(
            [
                { id: 1, cantidad: 8 },
                { id: 2, cantidad: 1 },
            ],
            [{ id: 1, stock: 2, precio: 999 }],
        );
        expect(resultado).toEqual([{ id: 1, stock: 2, precio: 999, cantidad: 2 }]);
    });

    it('calcula el cupón solo sobre la parte sin oferta de un carrito mixto', () => {
        expect(
            descuentoCupon(
                [
                    { precio: 10000, descuento: 20, cantidad: 1 },
                    { precio: 5000, descuento: 0, cantidad: 2 },
                ],
                ' game10 ',
            ),
        ).toBe(1000);
    });

    it('rechaza stock vacío, fraccionario y descuento fuera de rango', () => {
        const base = {
            nombre: 'Mouse',
            categoria: 'Periféricos',
            precio: 1000,
            stock: 2,
            descuento: 0,
        };
        expect(productoValido({ ...base, stock: '' })).toBeFalse();
        expect(productoValido({ ...base, stock: 1.5 })).toBeFalse();
        expect(productoValido({ ...base, descuento: 120 })).toBeFalse();
    });

    it('valida correo y largo de contraseña en el registro', () => {
        const base = {
            nombre: 'Cliente',
            correo: 'correo-invalido',
            password: '123456',
            confirmPassword: '123456',
        };
        expect(validarRegistro(base)).toContain('correo válido');
        expect(validarRegistro({ ...base, correo: 'a@b.cl', password: '123' })).toContain(
            'al menos 6',
        );
    });
});
