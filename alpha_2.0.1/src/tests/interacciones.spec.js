import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductDetail from '../components/ProductDetail.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';
import Checkout from '../components/Checkout.jsx';
import PurchaseResult from '../components/PurchaseResult.jsx';
import AdminProducts from '../components/AdminProducts.jsx';
import Contacto from '../components/Contacto.jsx';
import Login from '../components/Login.jsx';
import Blog from '../components/Blog.jsx';
import Categories from '../components/Categories.jsx';
import { CartContext } from '../context/cartContext.js';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const oferta = {
    id: 1,
    nombre: 'Notebook ASUS',
    codigo: 'NB1',
    marca: 'ASUS',
    categoria: 'Notebooks',
    precio: 10000,
    descuento: 10,
    stock: 3,
    imagen: '/imagenes/notebook_asus_tuf.png',
};
const mouse = {
    ...oferta,
    id: 2,
    nombre: 'Mouse HP',
    codigo: 'M2',
    marca: 'HP',
    categoria: 'Periféricos',
    precio: 2000,
    descuento: 0,
};
const datosCompra = {
    nombre: 'Cliente de prueba',
    correo: 'cliente@correo.cl',
    direccion: 'Calle 123',
    region: 'Valparaíso',
};

function Ubicacion() {
    const ubicacion = useLocation();
    return <output data-location>{ubicacion.pathname}</output>;
}

describe('Interacciones de componentes React', () => {
    let contenedor;
    let raiz;
    let contexto;

    beforeEach(() => {
        localStorage.clear();
        contenedor = document.createElement('div');
        document.body.appendChild(contenedor);
        raiz = createRoot(contenedor);
        contexto = {
            carrito: [{ ...mouse, cantidad: 1 }],
            cuponAplicado: false,
            agregarAlCarrito: jasmine.createSpy('agregar'),
            vaciarCarrito: jasmine.createSpy('vaciar'),
        };
    });

    afterEach(async () => {
        await act(async () => raiz.unmount());
        contenedor.remove();
        localStorage.clear();
    });

    const renderizar = async (elemento, entrada = '/') => {
        await act(async () =>
            raiz.render(
                <MemoryRouter initialEntries={[entrada]}>
                    <CartContext.Provider value={contexto}>
                        {elemento}
                        <Ubicacion />
                    </CartContext.Provider>
                </MemoryRouter>,
            ),
        );
    };

    const escribir = async (selector, valor) => {
        const campo = contenedor.querySelector(selector);
        const tipo =
            campo.tagName === 'SELECT'
                ? HTMLSelectElement
                : campo.tagName === 'TEXTAREA'
                  ? HTMLTextAreaElement
                  : HTMLInputElement;
        await act(async () => {
            Object.getOwnPropertyDescriptor(tipo.prototype, 'value').set.call(campo, valor);
            campo.dispatchEvent(
                new Event(campo.tagName === 'SELECT' ? 'change' : 'input', {
                    bubbles: true,
                }),
            );
        });
    };

    const enviar = async () => {
        await act(async () =>
            contenedor
                .querySelector('form')
                .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })),
        );
    };

    it('renderiza todos los productos recibidos por props', async () => {
        await renderizar(<ProductList productos={[oferta, mouse]} />);
        expect(contenedor.querySelectorAll('article').length).toBe(2);
    });

    it('oculta la etiqueta de oferta cuando no hay descuento', async () => {
        await renderizar(<ProductCard producto={mouse} agregar={() => {}} />);
        expect(contenedor.querySelector('.oferta')).toBeNull();
    });

    it('deshabilita Agregar si el producto no tiene stock', async () => {
        await renderizar(<ProductCard producto={{ ...mouse, stock: 0 }} agregar={() => {}} />);
        expect(contenedor.querySelector('button').disabled).toBeTrue();
    });

    it('actualiza el estado de búsqueda al escribir y filtra el DOM', async () => {
        await renderizar(<ProductList productos={[oferta, mouse]} />);
        await escribir('input', 'MOUSE');
        expect(contenedor.querySelectorAll('article').length).toBe(1);
        expect(contenedor.querySelector('article').textContent).toContain('Mouse HP');
    });

    it('muestra un mensaje condicional si no hay coincidencias', async () => {
        await renderizar(<ProductList productos={[mouse]} />);
        await escribir('input', 'INEXISTENTE');
        expect(contenedor.textContent).toContain('No se encontraron productos.');
    });

    it('filtra por marca al cambiar el selector', async () => {
        await renderizar(<ProductList productos={[oferta, mouse]} />);
        await escribir('select:nth-of-type(1)', 'Todas');
        const selects = contenedor.querySelectorAll('select');
        await act(async () => {
            selects[1].value = 'HP';
            selects[1].dispatchEvent(new Event('change', { bubbles: true }));
        });
        expect(contenedor.querySelectorAll('article').length).toBe(1);
    });

    it('restablece los filtros mediante el botón Limpiar', async () => {
        await renderizar(<ProductList productos={[oferta, mouse]} />);
        await escribir('input', 'Mouse');
        await act(async () => contenedor.querySelector('.filtros-productos button').click());
        expect(contenedor.querySelector('input').value).toBe('');
        expect(contenedor.querySelectorAll('article').length).toBe(2);
    });

    it('muestra un producto inexistente sin reutilizar el seleccionado antes', async () => {
        await renderizar(<ProductDetail producto={undefined} />);
        expect(contenedor.textContent).toContain('Producto no encontrado');
    });

    it('rechaza una cantidad fraccionaria en el detalle', async () => {
        await renderizar(<ProductDetail producto={mouse} />);
        await escribir('#cantidad-detalle', '1.5');
        await act(async () => contenedor.querySelector('button').click());
        expect(contenedor.querySelector('[role="alert"]')).not.toBeNull();
        expect(contexto.agregarAlCarrito).not.toHaveBeenCalled();
    });

    it('agrega desde el detalle y muestra confirmación', async () => {
        await renderizar(<ProductDetail producto={mouse} />);
        await act(async () => contenedor.querySelector('button').click());
        expect(contexto.agregarAlCarrito).toHaveBeenCalledWith(mouse, 1);
        expect(contenedor.querySelector('[role="status"]')).not.toBeNull();
    });

    it('muestra error al enviar un registro vacío', async () => {
        await renderizar(<RegistrationForm />);
        await enviar();
        expect(contenedor.textContent).toContain('completa todos los campos');
    });

    it('comprueba la confirmación de contraseña usando el estado del formulario', async () => {
        await renderizar(<RegistrationForm />);
        await escribir('[name="nombre"]', 'Cliente');
        await escribir('[name="correo"]', 'cliente@correo.cl');
        await escribir('[name="password"]', 'abc123');
        await escribir('[name="confirmPassword"]', 'otra123');
        await enviar();
        expect(contenedor.textContent).toContain('Las contraseñas no coinciden.');
    });

    it('guarda solo el perfil y no guarda ni muestra la contraseña', async () => {
        await renderizar(<RegistrationForm />);
        await escribir('[name="nombre"]', 'Cliente');
        await escribir('[name="correo"]', 'cliente@correo.cl');
        await escribir('[name="password"]', 'secreto123');
        await escribir('[name="confirmPassword"]', 'secreto123');
        await enviar();
        expect(contenedor.textContent).toContain('Registro de demostración guardado');
        expect(localStorage.getItem('gamehub_perfil_ev2')).not.toContain('secreto123');
    });

    it('muestra carrito vacío en checkout', async () => {
        contexto.carrito = [];
        await renderizar(<Checkout />);
        expect(contenedor.textContent).toContain('El carrito está vacío.');
    });

    it('autocompleta checkout con el perfil conectado', async () => {
        await renderizar(<Checkout usuario={datosCompra} />);
        expect(contenedor.querySelector('[name="nombre"]').value).toBe(datosCompra.nombre);
        expect(contenedor.querySelector('[name="direccion"]').value).toBe(datosCompra.direccion);
    });

    it('muestra cuatro errores al enviar checkout incompleto', async () => {
        await renderizar(<Checkout />);
        await enviar();
        expect(contenedor.querySelectorAll('[role="alert"]').length).toBe(4);
    });

    it('redirige una compra rechazada y conserva el carrito', async () => {
        await renderizar(<Checkout usuario={datosCompra} />);
        await escribir('#resultado-pago', 'rechazado');
        await enviar();
        expect(contenedor.querySelector('[data-location]').textContent).toBe('/compra-error');
        expect(contexto.vaciarCarrito).not.toHaveBeenCalled();
    });

    it('confirma una compra, vacía el carrito y guarda resumen con productos', async () => {
        const confirmar = jasmine.createSpy('confirmar');
        await renderizar(<Checkout usuario={datosCompra} confirmarCompra={confirmar} />);
        await enviar();
        expect(confirmar).toHaveBeenCalledWith(contexto.carrito);
        expect(contexto.vaciarCarrito).toHaveBeenCalled();
        expect(JSON.parse(localStorage.getItem('gamehub_ultima_orden_ev2')).productos.length).toBe(
            1,
        );
        expect(contenedor.querySelector('[data-location]').textContent).toBe('/compra-exitosa');
    });

    it('no inventa una compra exitosa al abrir la URL sin pedido', async () => {
        await renderizar(<PurchaseResult />);
        expect(contenedor.textContent).toContain('No hay una compra para mostrar');
    });

    it('rechaza un producto administrativo con descuento fuera de rango', async () => {
        const crear = jasmine.createSpy('crear');
        await renderizar(
            <AdminProducts
                productos={[]}
                crear={crear}
                actualizar={() => {}}
                eliminar={() => {}}
            />,
        );
        await escribir('[name="nombre"]', 'Mouse');
        await escribir('[name="codigo"]', 'M1');
        await escribir('[name="categoria"]', 'Periféricos');
        await escribir('[name="marca"]', 'HP');
        await escribir('[name="precio"]', '2000');
        await escribir('[name="stock"]', '4');
        await escribir('[name="descuento"]', '120');
        await enviar();
        expect(crear).not.toHaveBeenCalled();
        expect(contenedor.querySelector('[role="alert"]')).not.toBeNull();
    });

    it('permite editar y enviar un producto existente', async () => {
        const actualizar = jasmine.createSpy('actualizar');
        await renderizar(
            <AdminProducts
                productos={[mouse]}
                crear={() => {}}
                actualizar={actualizar}
                eliminar={() => {}}
            />,
        );
        await act(async () => contenedor.querySelector('tbody button').click());
        await escribir('[name="nombre"]', 'Mouse editado');
        await enviar();
        expect(actualizar).toHaveBeenCalledWith(
            jasmine.objectContaining({ id: 2, nombre: 'Mouse editado' }),
        );
    });

    it('ejecuta eliminación por el ID correcto', async () => {
        const eliminar = jasmine.createSpy('eliminar');
        await renderizar(
            <AdminProducts
                productos={[mouse]}
                crear={() => {}}
                actualizar={() => {}}
                eliminar={eliminar}
            />,
        );
        await act(async () => contenedor.querySelectorAll('tbody button')[1].click());
        expect(eliminar).toHaveBeenCalledWith(2);
    });

    it('valida campos obligatorios de contacto', async () => {
        await renderizar(<Contacto />);
        await enviar();
        expect(contenedor.querySelector('[role="alert"]')).not.toBeNull();
    });

    it('confirma contacto válido indicando que es una demostración', async () => {
        await renderizar(<Contacto />);
        await escribir('[name="nombre"]', 'Cliente');
        await escribir('[name="correo"]', 'cliente@correo.cl');
        await escribir('[name="comentario"]', 'Consulta de prueba');
        await enviar();
        expect(contenedor.textContent).toContain('No se envió a un servidor.');
    });

    it('muestra categorías con su cantidad de productos', async () => {
        await renderizar(<Categories productos={[oferta, mouse]} />);
        expect(contenedor.querySelectorAll('.categoria').length).toBe(2);
        expect(contenedor.textContent).toContain('1 producto(s)');
    });

    it('abre una publicación del blog y permite volver al listado', async () => {
        await renderizar(<Blog />);
        await act(async () => contenedor.querySelector('article button').click());
        expect(contenedor.textContent).toContain('Antes de comprar un notebook');
        await act(async () => contenedor.querySelector('button').click());
        expect(contenedor.querySelectorAll('article').length).toBe(2);
    });

    it('rechaza un ingreso con campos inválidos', async () => {
        await renderizar(<Login iniciarSesion={() => {}} />);
        await enviar();
        expect(contenedor.querySelector('[role="alert"]')).not.toBeNull();
    });

    it('informa que se necesita un perfil registrado antes de ingresar', async () => {
        await renderizar(<Login iniciarSesion={() => {}} />);
        await escribir('#login-correo', 'a@correo.cl');
        await escribir('#login-password', 'demo123');
        await enviar();
        expect(contenedor.textContent).toContain('Primero registra un perfil');
    });

    it('recupera un perfil de demostración sin almacenar contraseña', async () => {
        const iniciar = jasmine.createSpy('iniciar');
        localStorage.setItem('gamehub_perfil_ev2', JSON.stringify(datosCompra));
        await renderizar(<Login iniciarSesion={iniciar} />);
        await escribir('#login-correo', datosCompra.correo);
        await escribir('#login-password', 'demo123');
        await enviar();
        expect(iniciar).toHaveBeenCalledWith(datosCompra);
        expect(contenedor.querySelector('[data-location]').textContent).toBe('/checkout');
    });

    it('muestra un resumen recuperado después de recargar el resultado', async () => {
        localStorage.setItem(
            'gamehub_ultima_orden_ev2',
            JSON.stringify({
                exito: true,
                numero: 'GH-PRUEBA',
                cliente: 'Cliente',
                productos: [{ ...mouse, cantidad: 2 }],
                subtotal: 4000,
                descuento: 400,
                total: 3600,
                direccion: 'Calle 1',
                region: 'Valparaíso',
                entrega: 'Despacho',
            }),
        );
        await renderizar(<PurchaseResult />);
        expect(contenedor.textContent).toContain('GH-PRUEBA');
        expect(contenedor.textContent).toContain('Mouse HP × 2');
        expect(contenedor.textContent).toContain('$3.600');
    });

    it('muestra resumen y reintento para una compra rechazada', async () => {
        localStorage.setItem(
            'gamehub_ultima_orden_ev2',
            JSON.stringify({
                exito: false,
                numero: 'GH-ERROR',
                cliente: 'Cliente',
                productos: [{ ...mouse, cantidad: 1 }],
                subtotal: 2000,
                descuento: 0,
                total: 2000,
                direccion: 'Calle 1',
                region: 'Valparaíso',
                entrega: 'Despacho',
            }),
        );
        await renderizar(<PurchaseResult exito={false} />);
        expect(contenedor.textContent).toContain('No se pudo realizar el pago');
        expect(contenedor.querySelector('a').getAttribute('href')).toBe('/checkout');
    });

    it('crea un producto administrativo normalizando los números', async () => {
        const crear = jasmine.createSpy('crear');
        await renderizar(
            <AdminProducts
                productos={[]}
                crear={crear}
                actualizar={() => {}}
                eliminar={() => {}}
            />,
        );
        for (const [campo, valor] of Object.entries({
            nombre: 'Mouse',
            codigo: 'M1',
            categoria: 'Periféricos',
            marca: 'HP',
            precio: '2000',
            stock: '4',
        }))
            await escribir(`[name="${campo}"]`, valor);
        await enviar();
        expect(crear).toHaveBeenCalledWith(jasmine.objectContaining({ precio: 2000, stock: 4 }));
    });

    it('rechaza un código administrativo duplicado', async () => {
        const crear = jasmine.createSpy('crear');
        await renderizar(
            <AdminProducts
                productos={[mouse]}
                crear={crear}
                actualizar={() => {}}
                eliminar={() => {}}
            />,
        );
        for (const [campo, valor] of Object.entries({
            nombre: 'Mouse',
            codigo: 'M2',
            categoria: 'Periféricos',
            marca: 'HP',
            precio: '2000',
            stock: '4',
        }))
            await escribir(`[name="${campo}"]`, valor);
        await enviar();
        expect(crear).not.toHaveBeenCalled();
    });
});
