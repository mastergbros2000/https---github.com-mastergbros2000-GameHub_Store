import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import './App.css';

// Importación de componentes
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import Blog from './components/Blog';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';

// Importamos nuestro Contexto Global
import { CartProvider, CartContext } from './context/CartContext';

// Subcomponente que contiene el enrutamiento y la vista
const AppContent = () => {
  // Extraemos el carrito desde el estado global
  const { carrito } = useContext(CartContext);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Detectar el scroll de la página para encoger el header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {/* BARRA DE NAVEGACIÓN SUPERIOR FIJA Y REDUCIBLE */}
        <header className={`cabecera ${isScrolled ? 'shrunk' : ''}`} style={{ backgroundColor: '#1E1730' }}>
          <div className="contenedor cabecera-contenido" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="marca" style={{ color: 'white', margin: 0 }}>
              GameHub <span style={{ color: '#00D2FF' }}>Store</span>
            </h1>
            <nav className="navegacion">
              <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', margin: 0, padding: 0, alignItems: 'center', flexWrap: 'wrap' }}>
                <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link></li>
                <li><Link to="/productos" style={{ color: 'white', textDecoration: 'none' }}>Productos</Link></li>
                <li><Link to="/blog" style={{ color: 'white', textDecoration: 'none' }}>Blog</Link></li>
                <li><Link to="/nosotros" style={{ color: 'white', textDecoration: 'none' }}>Nosotros</Link></li>
                <li><Link to="/contacto" style={{ color: 'white', textDecoration: 'none' }}>Contacto</Link></li>
                <li><Link to="/ingresar" style={{ color: 'white', textDecoration: 'none' }}>Ingresar</Link></li>
                <li><Link to="/registro" style={{ color: 'white', textDecoration: 'none' }}>Registro</Link></li>
                <li>
                  <Link to="/carrito" style={{ color: 'white', textDecoration: 'none' }}>
                    Carrito <span style={{ backgroundColor: '#00D2FF', color: 'black', borderRadius: '50%', padding: '2px 8px', fontWeight: 'bold', fontSize: '0.8rem' }}>{carrito.length}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* DEFINICIÓN DE RUTAS */}
        <main className="contenedor" style={{ width: '90%', maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
          <Routes>
            <Route path="/" element={
              <>
                {/* BANNER PRINCIPAL (Fiel al original) */}
                <section className="banner-principal" style={{ backgroundColor: '#1E1730', padding: '60px 20px', marginBottom: '40px', borderBottom: '1px solid #D6236A' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
                    <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '15px' }}>
                      Tu próxima partida comienza aquí
                    </h2>
                    <p style={{ color: 'white', fontSize: '1.1rem', marginBottom: '25px' }}>
                      Equipos, consolas y periféricos para jugadores.
                    </p>
                    <Link 
                      to="/productos" 
                      style={{ 
                        backgroundColor: '#D6236A', 
                        color: 'white', 
                        padding: '10px 25px', 
                        textDecoration: 'none', 
                        borderRadius: '4px', 
                        fontWeight: 'bold',
                        display: 'inline-block'
                      }}
                    >
                      Ver catálogo
                    </Link>
                  </div>
                </section>

                {/* SECCIÓN DE CARRUSEL FIEL AL ORIGINAL */}
                <section className="seccion mt-4 mb-5">
                  <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>Novedades gamer</h2>
                  <Carousel className="rounded-3 shadow">
                  <Carousel.Item>
                    <img 
                      className="d-block w-100" 
                      src="/imagenes/personas jugando.jpg" 
                      alt="Personas jugando Nintendo Switch" 
                      style={{ height: '400px', objectFit: 'cover', backgroundColor: '#1E1730' }} 
                    />
                  </Carousel.Item>
                </Carousel>
                </section>

                {/* SECCIÓN DE VIDEO (Automático y en Bucle) */}
                <section className="seccion mt-5 mb-5" style={{ textAlign: 'center' }}>
                  <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>
                    Conoce las novedades gamer
                  </h2>
                  <div style={{ 
                    maxWidth: '800px', 
                    margin: '0 auto', 
                    backgroundColor: 'white', 
                    border: '2px solid #D6236A', 
                    borderRadius: '4px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '350px'
                  }}>
                    <video 
                      src="/video/novedades_gamehub.mp4" 
                      style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }}
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    />
                  </div>
                </section>

                <section className="seccion mt-5">
                  <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>Productos destacados</h2>
                  <ProductList seleccionarProducto={setProductoSeleccionado} mostrarFiltros={false} soloDestacados={true} />
                </section>
              </>
            } />
            
            <Route path="/productos" element={
              <div className="mt-4">
                <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>Catálogo de productos</h2>
                <ProductList seleccionarProducto={setProductoSeleccionado} mostrarFiltros={true} />
              </div>
            } />
            
            <Route path="/detalle" element={
              <ProductDetail producto={productoSeleccionado} />
            } />
            
            <Route path="/carrito" element={<ShoppingCart />} />
            
            <Route path="/blog" element={<Blog />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/ingresar" element={<Login />} />
            <Route path="/registro" element={<RegistrationForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

// El componente App principal se limita a envolver la aplicación entera con el Proveedor
function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;