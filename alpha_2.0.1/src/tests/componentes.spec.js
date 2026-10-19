import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import ProductList from '../components/ProductList.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';
import { CartContext } from '../context/cartContext.js';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const productoOferta = {
    id: 1,
    nombre: 'Notebook ASUS TUF Gaming',
    categoria: 'Notebooks',
    marca: 'ASUS',
    precio: 1000000,
    descuento: 10,
    stock: 3,
    imagen: '/imagenes/notebook_asus_tuf.png',
};

describe('Componentes React de GameHub Store', () => {
    let contenedor;
    let raiz;

    beforeEach(() => {
        contenedor = document.createElement('div');
        document.body.appendChild(contenedor);
        raiz = createRoot(contenedor);
    });

    afterEach(() => {
        act(() => raiz.unmount());
        contenedor.remove();
    });

    it('renderiza los datos recibidos mediante props', () => {
        act(() => {
            raiz.render(
                <MemoryRouter>
                    <CartContext.Provider
                        value={{ agregarAlCarrito: jasmine.createSpy('agregar') }}
                    >
                        <ProductList
                            productos={[productoOferta]}
                            seleccionarProducto={() => {}}
                            mostrarFiltros={false}
                        />
                    </CartContext.Provider>
                </MemoryRouter>,
            );
        });

        expect(contenedor.textContent).toContain('Notebook ASUS TUF Gaming');
        expect(contenedor.textContent).toContain('ASUS - Notebooks');
    });

    it('muestra el contenido condicional cuando existe una oferta', () => {
        act(() => {
            raiz.render(
                <MemoryRouter>
                    <CartContext.Provider value={{ agregarAlCarrito: () => {} }}>
                        <ProductList
                            productos={[productoOferta]}
                            seleccionarProducto={() => {}}
                            mostrarFiltros={false}
                        />
                    </CartContext.Provider>
                </MemoryRouter>,
            );
        });

        expect(contenedor.textContent).toContain('Oferta -10%');
        expect(contenedor.textContent).toContain('$900.000');
    });

    it('ejecuta el evento para agregar un producto al carrito', () => {
        const agregar = jasmine.createSpy('agregar');
        act(() => {
            raiz.render(
                <MemoryRouter>
                    <CartContext.Provider value={{ agregarAlCarrito: agregar }}>
                        <ProductList
                            productos={[productoOferta]}
                            seleccionarProducto={() => {}}
                            mostrarFiltros={false}
                        />
                    </CartContext.Provider>
                </MemoryRouter>,
            );
        });

        const boton = [...contenedor.querySelectorAll('button')].find(
            (item) => item.textContent === 'Agregar',
        );
        act(() => boton.click());
        expect(agregar).toHaveBeenCalledWith(productoOferta, 1);
    });

    it('renderiza el formulario de registro con contraseña y confirmación', () => {
        act(() => raiz.render(<RegistrationForm />));

        const camposPassword = contenedor.querySelectorAll('input[type="password"]');
        expect(camposPassword.length).toBe(2);
        expect(contenedor.textContent).toContain('Contraseña');
        expect(contenedor.textContent).toContain('Confirmar contraseña');
    });
});
