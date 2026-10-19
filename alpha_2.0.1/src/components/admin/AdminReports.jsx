import { Link } from 'react-router-dom';

export default function AdminReports({ productos, ordenes, usuarios, soloCriticos = false }) {
    const criticos = productos.filter((item) => item.stock <= 5);
    const aprobadas = ordenes.filter((item) => item.exito);
    const ventas = aprobadas.reduce((total, item) => total + item.total, 0);
    return (
        <section>
            <h1>{soloCriticos ? 'Productos con stock crítico' : 'Reportes de demostración'}</h1>
            {!soloCriticos && (
                <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
                    <div className="col">
                        <article className="tarjeta">
                            <h2>Productos</h2>
                            <p>{productos.length}</p>
                            <p>
                                {productos.reduce((total, item) => total + item.stock, 0)} unidades
                                en inventario
                            </p>
                        </article>
                    </div>
                    <div className="col">
                        <article className="tarjeta">
                            <h2>Compras aprobadas</h2>
                            <p>{aprobadas.length}</p>
                            <p>${ventas.toLocaleString('es-CL')} en ventas simuladas</p>
                        </article>
                    </div>
                    <div className="col">
                        <article className="tarjeta">
                            <h2>Usuarios</h2>
                            <p>{usuarios.length}</p>
                        </article>
                    </div>
                </div>
            )}
            <p>Se consideran críticos los productos con cinco unidades o menos.</p>
            {criticos.length === 0 ? (
                <p>No hay productos críticos.</p>
            ) : (
                <ul>
                    {criticos.map((item) => (
                        <li key={item.id}>
                            {item.nombre}: {item.stock} unidades
                        </li>
                    ))}
                </ul>
            )}
            <Link className="boton" to="/administracion/productos">
                Administrar productos
            </Link>
        </section>
    );
}
