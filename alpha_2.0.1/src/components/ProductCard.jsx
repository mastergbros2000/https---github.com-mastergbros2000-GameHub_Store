import { Link } from 'react-router-dom';
import { precioFinal } from '../services/productosService.js';
import ProductImage from './ProductImage.jsx';

export default function ProductCard({ producto, agregar }) {
    return (
        <article className="tarjeta producto h-100">
            <ProductImage producto={producto} />
            <h3>{producto.nombre}</h3>
            <p>
                {producto.marca} - {producto.categoria}
            </p>
            <div className="espacio-oferta">
                {producto.descuento > 0 && (
                    <>
                        <p className="oferta">Oferta -{producto.descuento}%</p>
                        <p className="precio-anterior">
                            Precio normal: ${producto.precio.toLocaleString('es-CL')}
                        </p>
                    </>
                )}
            </div>
            <p className="precio">${precioFinal(producto).toLocaleString('es-CL')}</p>
            <p>
                {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Producto sin stock'}
            </p>
            <div className="acciones pie-tarjeta">
                <Link className="boton boton-secundario" to={`/detalle/${producto.id}`}>
                    Ver detalle
                </Link>
                <button
                    className="boton"
                    disabled={producto.stock === 0}
                    onClick={() => agregar(producto, 1)}
                >
                    Agregar
                </button>
            </div>
        </article>
    );
}
