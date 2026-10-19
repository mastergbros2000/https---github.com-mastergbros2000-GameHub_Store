import { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App.jsx';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Flujo administrativo del anexo EV2', () => {
    let contenedor;
    let raiz;
    beforeEach(() => {
        localStorage.clear();
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
    const escribir = async (id, valor) => {
        await act(async () => {
            const campo = contenedor.querySelector(id);
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(
                campo,
                valor,
            );
            campo.dispatchEvent(new Event('input', { bubbles: true }));
        });
    };
    const enviar = async () =>
        act(async () =>
            contenedor
                .querySelector('form')
                .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })),
        );

    it('ofrece los siete módulos administrativos desde el panel', async () => {
        await abrir('/administracion');
        expect(contenedor.querySelectorAll('main .tarjeta').length).toBe(7);
    });

    it('crea una categoría y la guarda en la persistencia', async () => {
        await abrir('/administracion/categorias');
        await escribir('#entidad-nombre', 'Accesorios');
        await enviar();
        expect(JSON.parse(localStorage.getItem('gamehub_categorias_ev2'))).toContain('Accesorios');
    });

    it('renombra una categoría y actualiza los productos relacionados', async () => {
        await abrir('/administracion/categorias');
        const fila = [...contenedor.querySelectorAll('tbody tr')].find((item) =>
            item.textContent.includes('Notebooks'),
        );
        await act(async () => fila.querySelector('button').click());
        await escribir('#entidad-nombre', 'Portátiles');
        await enviar();
        expect(JSON.parse(localStorage.getItem('gamehub_productos_ev2'))[0].categoria).toBe(
            'Portátiles',
        );
    });

    it('impide eliminar una categoría utilizada por productos', async () => {
        await abrir('/administracion/categorias');
        await act(async () =>
            contenedor.querySelectorAll('tbody tr')[0].querySelectorAll('button')[1].click(),
        );
        expect(contenedor.querySelector('main').textContent).toContain(
            'No puedes eliminar una categoría',
        );
    });

    it('crea y elimina un usuario sin guardar contraseña', async () => {
        await abrir('/administracion/usuarios');
        await escribir('#entidad-nombre', 'Cliente de prueba');
        await escribir('#entidad-correo', 'cliente@correo.cl');
        await escribir('#entidad-rol', 'Cliente');
        await enviar();
        expect(JSON.parse(localStorage.getItem('gamehub_usuarios_ev2')).length).toBe(1);
        expect(localStorage.getItem('gamehub_usuarios_ev2')).not.toContain('password');
        await act(async () => contenedor.querySelectorAll('tbody button')[1].click());
        expect(JSON.parse(localStorage.getItem('gamehub_usuarios_ev2')).length).toBe(0);
    });

    it('permite abrir el resumen de una orden administrativa', async () => {
        localStorage.setItem(
            'gamehub_ordenes_ev2',
            JSON.stringify([
                {
                    numero: 'GH1',
                    cliente: 'Cliente',
                    productos: [],
                    total: 1000,
                    subtotal: 1000,
                    descuento: 0,
                    exito: true,
                },
            ]),
        );
        await abrir('/administracion/ordenes');
        await act(async () => contenedor.querySelector('main button').click());
        expect(contenedor.querySelector('.resumen-orden').textContent).toContain('GH1');
    });

    it('muestra productos críticos con cinco unidades o menos', async () => {
        await abrir('/administracion/stock-critico');
        expect(contenedor.querySelector('main').textContent).toContain(
            'PC Gamer AORUS: 2 unidades',
        );
        expect(contenedor.querySelector('main').textContent).not.toContain('Mouse Gamer HP:');
    });

    it('guarda el perfil administrativo de demostración', async () => {
        await abrir('/administracion/perfil');
        await escribir('#perfil-nombre', 'Administración QA');
        await escribir('#perfil-correo', 'qa@correo.cl');
        await enviar();
        expect(JSON.parse(localStorage.getItem('gamehub_perfil_admin_ev2')).nombre).toBe(
            'Administración QA',
        );
    });
});
