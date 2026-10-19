import { precioFinal } from '../services/productosService.js';

export default function OrderSummary({ orden }) {
    return (
        <div className="resumen-orden">
            <p>
                Número de orden: <strong>{orden.numero}</strong>
            </p>
            <p>Cliente: {orden.cliente}</p>
            <p>
                {orden.entrega}: {orden.direccion}, {orden.region}
            </p>
            <ul>
                {orden.productos.map((item) => (
                    <li key={item.id}>
                        {item.nombre} × {item.cantidad} — $
                        {(precioFinal(item) * item.cantidad).toLocaleString('es-CL')}
                    </li>
                ))}
            </ul>
            <p>Subtotal: ${orden.subtotal.toLocaleString('es-CL')}</p>
            <p>Cupón: -${orden.descuento.toLocaleString('es-CL')}</p>
            <p className="precio">Total: ${orden.total.toLocaleString('es-CL')}</p>
        </div>
    );
}
