import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList.jsx';
import { rutaPublica } from '../services/imagenesService.js';

export default function Home({ productos }) {
    return (
        <>
            <section className="banner-principal">
                <h1>Tu próxima partida comienza aquí</h1>
                <p>Equipos, consolas y periféricos para jugadores.</p>
                <Link className="boton" to="/productos">
                    Ver catálogo
                </Link>
            </section>
            <section className="seccion">
                <h2>Novedades gamer</h2>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="imagen-carrusel"
                            src={rutaPublica('/imagenes/personas jugando.jpg')}
                            alt="Personas jugando Nintendo Switch"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="imagen-carrusel"
                            src={rutaPublica('/imagenes/notebook_asus_tuf.png')}
                            alt="Notebook ASUS TUF Gaming"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="imagen-carrusel"
                            src={rutaPublica('/imagenes/pc_gamer_aorus.png')}
                            alt="Computador gamer AORUS"
                        />
                    </Carousel.Item>
                </Carousel>
            </section>
            <section className="seccion seccion-video">
                <h2>Conoce las novedades gamer</h2>
                <video
                    className="video-novedades"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src={rutaPublica('/video/novedades_gamehub.mp4')} type="video/mp4" />
                    Tu navegador no puede reproducir el video.
                </video>
            </section>
            <section className="seccion">
                <h2>Productos destacados</h2>
                <ProductList productos={productos} mostrarFiltros={false} soloDestacados />
            </section>
        </>
    );
}
