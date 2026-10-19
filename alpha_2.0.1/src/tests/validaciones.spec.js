import { productoValido, validarCheckout } from '../services/validaciones.js';

describe('Validaciones GameHub Store', () => {
    it('acepta un checkout completo', () => {
        const errores = validarCheckout({
            nombre: 'Daniela Salinas',
            correo: 'daniela@correo.cl',
            direccion: 'Calle 123',
            region: 'Valparaíso',
        });
        expect(Object.keys(errores)).toHaveSize(0);
    });

    it('detecta campos y correo inválidos', () => {
        const errores = validarCheckout({
            nombre: '',
            correo: 'correo-malo',
            direccion: '',
            region: '',
        });
        expect(Object.keys(errores)).toHaveSize(4);
    });

    it('valida los datos mínimos de un producto', () => {
        expect(
            productoValido({
                nombre: 'Mouse',
                categoria: 'Periféricos',
                precio: 20000,
                stock: 5,
            }),
        ).toBeTrue();
    });
});
