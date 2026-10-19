import { useContext, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import AdminPanel from './components/admin/AdminPanel.jsx';
import Blog from './components/Blog.jsx';
import Categories from './components/Categories.jsx';
import Checkout from './components/Checkout.jsx';
import Contacto from './components/Contacto.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Nosotros from './components/Nosotros.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import ProductList from './components/ProductList.jsx';
import PurchaseResult from './components/PurchaseResult.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { CartContext } from './context/cartContext.js';
import Home from './pages/Home.jsx';
import { guardarProductos, leerProductos } from './services/productosService.js';

function CategoryRoute({ productos }) {
    const { nombre } = useParams();
    return (
        <section className="seccion">
            <h1>Productos por categoría</h1>
            <ProductList key={nombre} productos={productos} categoriaInicial={nombre} />
        </section>
    );
}

function DetailRoute({ productos }) {
    const { id } = useParams();
    return <ProductDetail key={id} producto={productos.find((item) => item.id === Number(id))} />;
}

function AppContent() {
    const { carrito, sincronizarCatalogo } = useContext(CartContext);
    const [productos, setProductos] = useState(leerProductos);
    const [usuario, setUsuario] = useState(null);
    const [errorPersistencia, setErrorPersistencia] = useState('');

    const cambiarCatalogo = (nuevos) => {
        setProductos(nuevos);
        sincronizarCatalogo(nuevos);
        setErrorPersistencia(
            guardarProductos(nuevos)
                ? ''
                : 'No se pudo guardar el catálogo en este navegador. Los cambios solo durarán en esta sesión.',
        );
    };

    const confirmarCompra = (comprados) => {
        cambiarCatalogo(
            productos.map((producto) => {
                const comprado = comprados.find((item) => item.id === producto.id);
                return comprado
                    ? {
                          ...producto,
                          stock: Math.max(0, producto.stock - comprado.cantidad),
                      }
                    : producto;
            }),
        );
    };

    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div className="App">
                <Header
                    cantidad={carrito.reduce((total, item) => total + item.cantidad, 0)}
                    usuario={usuario}
                    cerrarSesion={() => setUsuario(null)}
                />
                <main className="contenedor contenido-principal">
                    {errorPersistencia && (
                        <p className="mensaje-error" role="alert">
                            {errorPersistencia}
                        </p>
                    )}
                    <Routes>
                        <Route path="/" element={<Home productos={productos} />} />
                        <Route
                            path="/productos"
                            element={
                                <section className="seccion">
                                    <h1>Catálogo de productos</h1>
                                    <ProductList productos={productos} />
                                </section>
                            }
                        />
                        <Route path="/categorias" element={<Categories productos={productos} />} />
                        <Route
                            path="/categorias/:nombre"
                            element={<CategoryRoute productos={productos} />}
                        />
                        <Route
                            path="/ofertas"
                            element={
                                <section className="seccion">
                                    <h1>Productos en oferta</h1>
                                    <ProductList
                                        productos={productos}
                                        mostrarFiltros={false}
                                        soloOfertas
                                    />
                                </section>
                            }
                        />
                        <Route
                            path="/detalle/:id"
                            element={<DetailRoute productos={productos} />}
                        />
                        <Route path="/carrito" element={<ShoppingCart />} />
                        <Route
                            path="/checkout"
                            element={
                                <Checkout
                                    key={usuario?.correo || 'invitado'}
                                    usuario={usuario}
                                    confirmarCompra={confirmarCompra}
                                />
                            }
                        />
                        <Route path="/compra-exitosa" element={<PurchaseResult />} />
                        <Route path="/compra-error" element={<PurchaseResult exito={false} />} />
                        <Route
                            path="/administracion/*"
                            element={
                                <AdminPanel
                                    productos={productos}
                                    cambiarCatalogo={cambiarCatalogo}
                                />
                            }
                        />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/nosotros" element={<Nosotros />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/ingresar" element={<Login iniciarSesion={setUsuario} />} />
                        <Route path="/registro" element={<RegistrationForm />} />
                        <Route
                            path="*"
                            element={
                                <section className="seccion centrado">
                                    <h1>Página no encontrada</h1>
                                    <Link className="boton" to="/">
                                        Volver al inicio
                                    </Link>
                                </section>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
                <a
                    className="boton-whatsapp"
                    href="https://wa.me/56912345678?text=Hola%20GameHub%20Store"
                    target="_blank"
                    rel="noreferrer"
                >
                    WhatsApp
                </a>
            </div>
        </BrowserRouter>
    );
}

export default function App() {
    return (
        <CartProvider>
            <AppContent />
        </CartProvider>
    );
}
