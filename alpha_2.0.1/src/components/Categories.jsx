import { Link } from 'react-router-dom';
import { leerColeccion } from '../services/adminService.js';

export default function Categories({ productos }) {
    const categorias = [
        ...new Set([
            ...leerColeccion('gamehub_categorias_ev2'),
            ...productos.map((producto) => producto.categoria),
        ]),
    ];
    return (
        <section className="seccion">
            <h2>Categorías</h2>
            <div className="grilla-categorias">
                {categorias.map((categoria) => (
                    <Link
                        className="tarjeta categoria"
                        key={categoria}
                        to={`/categorias/${encodeURIComponent(categoria)}`}
                    >
                        <h3>{categoria}</h3>
                        <p>
                            {
                                productos.filter((producto) => producto.categoria === categoria)
                                    .length
                            }{' '}
                            producto(s)
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
