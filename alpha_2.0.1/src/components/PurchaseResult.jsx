import { Link, useLocation } from 'react-router-dom';
import { leerJSON } from '../services/storageService.js';
import OrderSummary from './OrderSummary.jsx';

export default function PurchaseResult({ exito = true }) {
    const { state } = useLocation();
    const guardada = state || leerJSON('gamehub_ultima_orden_ev2', null);
    const orden = guardada?.exito === exito && Array.isArray(guardada.productos) ? guardada : null;

    if (!orden) {
        return (
            <section className="seccion centrado">
                <h1>No hay una compra para mostrar</h1>
                <p>Completa primero el checkout para obtener el resumen.</p>
                <Link className="boton" to="/productos">
                    Ver catálogo
                </Link>
            </section>
        );
    }

    return (
        <section
            className={`seccion resultado-compra ${exito ? 'resultado-exito' : 'resultado-error'}`}
        >
            <h1>{exito ? 'Compra realizada correctamente' : 'No se pudo realizar el pago'}</h1>
            <p>
                {exito
                    ? 'Tu pedido de demostración fue confirmado.'
                    : 'El pago simulado fue rechazado. Conservamos tu carrito para que puedas reintentar.'}
            </p>
            <OrderSummary orden={orden} />
            <Link className="boton" to={exito ? '/productos' : '/checkout'}>
                {exito ? 'Seguir comprando' : 'Reintentar pago'}
            </Link>
        </section>
    );
}
