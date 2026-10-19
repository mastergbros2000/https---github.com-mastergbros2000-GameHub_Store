import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cartContext.js';
import { descuentoCupon, subtotalCarrito } from '../services/carritoService.js';
import { validarCheckout } from '../services/validaciones.js';
import { guardarJSON } from '../services/storageService.js';
import { registrarOrden } from '../services/adminService.js';

export default function Checkout({ usuario = null, confirmarCompra = () => {} }) {
    const { carrito, vaciarCarrito, cuponAplicado } = useContext(CartContext);
    const [datos, setDatos] = useState({
        nombre: usuario?.nombre || '',
        correo: usuario?.correo || '',
        direccion: usuario?.direccion || '',
        region: usuario?.region || '',
        entrega: 'Despacho a domicilio',
    });
    const [errores, setErrores] = useState({});
    const [resultado, setResultado] = useState('aprobado');
    const navigate = useNavigate();
    const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    const enviar = (e) => {
        e.preventDefault();
        const encontrados = validarCheckout(datos);
        setErrores(encontrados);
        if (Object.keys(encontrados).length > 0) return;

        const subtotal = subtotalCarrito(carrito);
        const descuento = descuentoCupon(carrito, cuponAplicado ? 'GAME10' : '');
        const orden = {
            numero: `GH-${Date.now()}`,
            cliente: datos.nombre.trim(),
            correo: datos.correo.trim(),
            direccion: datos.direccion.trim(),
            region: datos.region,
            entrega: datos.entrega,
            productos: carrito.map((item) => ({ ...item })),
            subtotal,
            descuento,
            total: subtotal - descuento,
            exito: resultado === 'aprobado',
        };
        guardarJSON('gamehub_ultima_orden_ev2', orden);
        registrarOrden(orden);
        if (orden.exito) {
            confirmarCompra(carrito);
            vaciarCarrito();
        }
        navigate(orden.exito ? '/compra-exitosa' : '/compra-error', {
            state: orden,
        });
    };

    if (carrito.length === 0) {
        return (
            <section className="seccion centrado">
                <h1>Checkout</h1>
                <p>El carrito está vacío.</p>
                <Link className="boton" to="/productos">
                    Ver catálogo
                </Link>
            </section>
        );
    }

    return (
        <section className="seccion">
            <h1>Datos de envío y entrega</h1>
            <p>Pago de demostración. No se solicitan datos de tarjeta ni se realizan cobros.</p>
            <form className="formulario" onSubmit={enviar} noValidate>
                {[
                    ['nombre', 'Nombre completo', 'text'],
                    ['correo', 'Correo', 'email'],
                    ['direccion', 'Dirección de envío o retiro', 'text'],
                ].map(([campo, etiqueta, tipo]) => (
                    <div className="campo" key={campo}>
                        <label htmlFor={`checkout-${campo}`}>{etiqueta}</label>
                        <input
                            id={`checkout-${campo}`}
                            name={campo}
                            type={tipo}
                            value={datos[campo]}
                            onChange={cambiar}
                            aria-invalid={Boolean(errores[campo])}
                            aria-describedby={errores[campo] ? `error-${campo}` : undefined}
                        />
                        {errores[campo] && (
                            <p className="mensaje-error" id={`error-${campo}`} role="alert">
                                {errores[campo]}
                            </p>
                        )}
                    </div>
                ))}
                <div className="campo">
                    <label htmlFor="checkout-region">Región</label>
                    <select
                        id="checkout-region"
                        name="region"
                        value={datos.region}
                        onChange={cambiar}
                    >
                        <option value="">Selecciona una región</option>
                        <option>Valparaíso</option>
                        <option>Metropolitana</option>
                        <option>Biobío</option>
                    </select>
                    {errores.region && (
                        <p className="mensaje-error" role="alert">
                            {errores.region}
                        </p>
                    )}
                </div>
                <div className="campo">
                    <label htmlFor="checkout-entrega">Entrega</label>
                    <select
                        id="checkout-entrega"
                        name="entrega"
                        value={datos.entrega}
                        onChange={cambiar}
                    >
                        <option>Despacho a domicilio</option>
                        <option>Retiro en tienda</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="resultado-pago">Resultado del pago simulado</label>
                    <select
                        id="resultado-pago"
                        value={resultado}
                        onChange={(e) => setResultado(e.target.value)}
                    >
                        <option value="aprobado">Aprobado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                </div>
                <button className="boton" type="submit">
                    Confirmar compra
                </button>
            </form>
        </section>
    );
}
