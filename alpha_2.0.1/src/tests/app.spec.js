import { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App.jsx';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Integración de vistas y estado compartido', () => {
    let contenedor;
    let raiz;

    beforeEach(() => {
        localStorage.clear();
        window.history.replaceState({}, '', '/');
        contenedor = document.createElement('div');
        document.body.appendChild(contenedor);
        raiz = createRoot(contenedor);
    });

    afterEach(async () => {
        await act(async () => raiz.unmount());
        contenedor.remove();
        localStorage.clear();
        window.history.replaceState({}, '', '/');
    });

    const abrir = async (ruta) => {
        window.history.replaceState({}, '', ruta);
        await act(async () => raiz.render(<App />));
    };

    it('incluye el video local solicitado y los destacados en inicio', async () => {
        await abrir('/');
        expect(contenedor.querySelector('video source').getAttribute('src')).toBe(
            '/video/novedades_gamehub.mp4',
        );
        expect(contenedor.querySelectorAll('article.producto').length).toBe(3);
        const video = contenedor.querySelector('video');
        expect(video.autoplay).toBeTrue();
        expect(video.muted).toBeTrue();
        expect(video.loop).toBeTrue();
        expect(video.playsInline).toBeTrue();
    });

    it('abre un detalle por su ID sin tener una selección anterior', async () => {
        await abrir('/detalle/3');
        expect(contenedor.querySelector('main h1').textContent).toBe('MSI GeForce RTX 5060');
    });

    it('no muestra otro producto para un ID inexistente', async () => {
        await abrir('/detalle/999999');
        expect(contenedor.querySelector('main').textContent).toContain('Producto no encontrado');
    });

    it('muestra la página 404 para una ruta desconocida', async () => {
        await abrir('/ruta-inexistente');
        expect(contenedor.querySelector('main').textContent).toContain('Página no encontrada');
    });

    it('muestra solo los tres productos en oferta', async () => {
        await abrir('/ofertas');
        expect(contenedor.querySelectorAll('article.producto').length).toBe(3);
    });

    it('resuelve una categoría con tilde desde la URL', async () => {
        await abrir('/categorias/Perif%C3%A9ricos');
        expect(contenedor.querySelectorAll('article.producto').length).toBe(3);
    });

    it('actualiza el contador de la cabecera y persiste al agregar', async () => {
        await abrir('/productos');
        await act(async () => contenedor.querySelector('article.producto button').click());
        expect(contenedor.querySelector('.contador-carrito').textContent).toBe('1');
        expect(JSON.parse(localStorage.getItem('gamehub_carrito_ev2'))[0].cantidad).toBe(1);
    });

    it('recupera el carrito después de volver a montar la aplicación', async () => {
        localStorage.setItem('gamehub_carrito_ev2', JSON.stringify([{ id: 2, cantidad: 2 }]));
        await abrir('/carrito');
        expect(contenedor.querySelector('.contador-carrito').textContent).toBe('2');
        expect(contenedor.querySelector('main').textContent).toContain('Mouse Gamer HP');
    });

    it('actualiza una cantidad y permite quitar el producto del carrito compartido', async () => {
        localStorage.setItem('gamehub_carrito_ev2', JSON.stringify([{ id: 2, cantidad: 2 }]));
        await abrir('/carrito');
        await act(async () => {
            const campo = contenedor.querySelector('main input');
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(
                campo,
                '4',
            );
            campo.dispatchEvent(new Event('input', { bubbles: true }));
        });
        expect(contenedor.querySelector('.contador-carrito').textContent).toBe('4');
        await act(async () => contenedor.querySelector('.item-carrito button').click());
        expect(contenedor.querySelector('main').textContent).toContain('Tu carrito está vacío');
    });

    it('confirma el checkout integrado, descuenta stock y muestra el resumen', async () => {
        localStorage.setItem('gamehub_carrito_ev2', JSON.stringify([{ id: 2, cantidad: 2 }]));
        await abrir('/checkout');
        for (const [campo, valor] of Object.entries({
            nombre: 'Cliente',
            correo: 'a@correo.cl',
            direccion: 'Calle 1',
        })) {
            await act(async () => {
                const input = contenedor.querySelector(`[name="${campo}"]`);
                Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(
                    input,
                    valor,
                );
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        }
        await act(async () => {
            const region = contenedor.querySelector('[name="region"]');
            region.value = 'Valparaíso';
            region.dispatchEvent(new Event('change', { bubbles: true }));
        });
        await act(async () =>
            contenedor
                .querySelector('form')
                .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })),
        );
        expect(contenedor.querySelector('main').textContent).toContain(
            'Compra realizada correctamente',
        );
        expect(
            JSON.parse(localStorage.getItem('gamehub_productos_ev2')).find((p) => p.id === 2).stock,
        ).toBe(16);
        expect(contenedor.querySelector('.contador-carrito').textContent).toBe('0');
    });
});
