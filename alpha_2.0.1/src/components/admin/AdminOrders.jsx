import { useState } from 'react';
import OrderSummary from '../OrderSummary.jsx';

export default function AdminOrders({ ordenes }) {
    const [seleccionada, setSeleccionada] = useState(null);
    return (
        <section>
            <h1>Órdenes y comprobantes de demostración</h1>
            <p>No son boletas tributarias, sino resúmenes de compras simuladas.</p>
            {ordenes.length === 0 ? (
                <p>Aún no hay órdenes registradas.</p>
            ) : (
                <div className="table-responsive">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th>Orden</th>
                                <th>Cliente</th>
                                <th>Estado</th>
                                <th>Total</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.map((orden) => (
                                <tr key={orden.numero}>
                                    <td>{orden.numero}</td>
                                    <td>{orden.cliente}</td>
                                    <td>{orden.exito ? 'Aprobada' : 'Rechazada'}</td>
                                    <td>${orden.total.toLocaleString('es-CL')}</td>
                                    <td>
                                        <button
                                            className="boton"
                                            onClick={() => setSeleccionada(orden)}
                                        >
                                            Ver resumen
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {seleccionada && (
                <div className="tarjeta mt-4">
                    <h2>Detalle de la orden</h2>
                    <OrderSummary orden={seleccionada} />
                    <button
                        className="boton boton-secundario"
                        onClick={() => setSeleccionada(null)}
                    >
                        Cerrar detalle
                    </button>
                </div>
            )}
        </section>
    );
}
