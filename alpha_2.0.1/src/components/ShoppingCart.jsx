import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext.js';
import { descuentoCupon, subtotalCarrito } from '../services/carritoService.js';
import { precioFinal } from '../services/productosService.js';
import ProductImage from './ProductImage.jsx';

export default function ShoppingCart() {
    const {
        carrito,
        eliminarProducto,
        vaciarCarrito,
        actualizarCantidad,
        cuponAplicado,
        setCuponAplicado,
    } = useContext(CartContext);
    const [cupon, setCupon] = useState('');
    const [mensaje, setMensaje] = useState('');
    const subtotal = subtotalCarrito(carrito);
    const descuento = descuentoCupon(carrito, cuponAplicado ? 'GAME10' : '');

    const aplicarCupon = () => {
        const valido = cupon.trim().toUpperCase() === 'GAME10';
        setCuponAplicado(valido);
        setMensaje(
            valido ? 'Cupón aplicado solo a productos sin oferta.' : 'Cupón inválido o expirado.',
        );
    };

    if (carrito.length === 0) {
        return (
            <section className="seccion centrado">
                <h1>Tu carrito está vacío</h1>
                <p>Aún no has agregado productos.</p>
                <Link className="boton" to="/productos">
                    Ver catálogo
                </Link>
            </section>
        );
    }

    return (
        <section className="seccion">
            <h1>Carrito de compra</h1>
            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    {carrito.map((item) => (
                        <article className="item-carrito" key={item.id}>
                            <ProductImage producto={item} />
                            <div>
                                <h2>{item.nombre}</h2>
                                <p className="precio">
                                    ${precioFinal(item).toLocaleString('es-CL')}
                                </p>
                                <label>
                                    Cantidad de {item.nombre}
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        max={item.stock}
                                        value={item.cantidad}
                                        onChange={(e) =>
                                            actualizarCantidad(item.id, Number(e.target.value))
                                        }
                                    />
                                </label>
                            </div>
                            <button
                                className="boton"
                                aria-label={`Quitar ${item.nombre}`}
                                onClick={() => eliminarProducto(item.id)}
                            >
                                Quitar
                            </button>
                        </article>
                    ))}
                    <div className="acciones">
                        <button className="boton boton-secundario" onClick={vaciarCarrito}>
                            Vaciar carrito
                        </button>
                        <Link className="boton boton-secundario" to="/productos">
                            Seguir comprando
                        </Link>
                    </div>
                </div>
                <aside className="col-12 col-lg-4">
                    <div className="resumen-carrito">
                        <h2>Resumen</h2>
                        <p>Subtotal: ${subtotal.toLocaleString('es-CL')}</p>
                        {descuento > 0 && (
                            <p className="oferta">Cupón: -${descuento.toLocaleString('es-CL')}</p>
                        )}
                        <p className="precio">
                            Total: ${(subtotal - descuento).toLocaleString('es-CL')}
                        </p>
                        <div className="campo">
                            <label htmlFor="cupon">Cupón</label>
                            <input
                                id="cupon"
                                value={cupon}
                                onChange={(e) => setCupon(e.target.value)}
                                placeholder="GAME10"
                            />
                        </div>
                        <button className="boton boton-secundario" onClick={aplicarCupon}>
                            Aplicar cupón
                        </button>
                        {mensaje && (
                            <p className="mensaje" role="status">
                                {mensaje}
                            </p>
                        )}
                        <Link className="boton boton-pagar" to="/checkout">
                            Continuar al pago
                        </Link>
                    </div>
                </aside>
            </div>
        </section>
    );
}
