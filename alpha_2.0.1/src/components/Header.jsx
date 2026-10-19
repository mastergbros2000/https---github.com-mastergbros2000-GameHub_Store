import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

const enlaces = [
    ['/', 'Inicio'],
    ['/productos', 'Productos'],
    ['/categorias', 'Categorías'],
    ['/ofertas', 'Ofertas'],
    ['/blog', 'Blog'],
    ['/nosotros', 'Nosotros'],
    ['/contacto', 'Contacto'],
    ['/administracion', 'Administración'],
];

export default function Header({ cantidad, usuario, cerrarSesion }) {
    const [abierto, setAbierto] = useState(false);
    const { pathname } = useLocation();

    return (
        <header className="cabecera">
            <Navbar expand="xl" expanded={abierto} onToggle={setAbierto} data-bs-theme="dark">
                <Container className="contenedor">
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        className="marca"
                        onClick={() => setAbierto(false)}
                    >
                        GameHub <span>Store</span>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="menu-principal"
                        label="Abrir menú"
                        aria-expanded={abierto}
                    />
                    <Navbar.Collapse id="menu-principal">
                        <Nav className="navegacion ms-auto" aria-label="Navegación principal">
                            {enlaces.map(([ruta, texto]) => (
                                <Nav.Link
                                    as={NavLink}
                                    to={ruta}
                                    end={ruta === '/'}
                                    key={ruta}
                                    onClick={() => setAbierto(false)}
                                >
                                    {texto}
                                </Nav.Link>
                            ))}
                            <Nav.Link as={Link} to="/carrito" onClick={() => setAbierto(false)}>
                                Carrito <span className="contador-carrito">{cantidad}</span>
                            </Nav.Link>
                            {usuario ? (
                                <button className="boton boton-secundario" onClick={cerrarSesion}>
                                    Cerrar sesión
                                </button>
                            ) : (
                                <Nav.Link
                                    as={Link}
                                    to="/ingresar"
                                    onClick={() => setAbierto(false)}
                                >
                                    Ingresar
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="visually-hidden" aria-live="polite">
                Página {pathname}
            </div>
        </header>
    );
}
