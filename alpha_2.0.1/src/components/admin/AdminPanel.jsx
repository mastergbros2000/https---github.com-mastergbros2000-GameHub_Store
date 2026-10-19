import { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import AdminProducts from '../AdminProducts.jsx';
import AdminOrders from './AdminOrders.jsx';
import AdminEntityManager from './AdminEntityManager.jsx';
import AdminReports from './AdminReports.jsx';
import AdminProfile from './AdminProfile.jsx';
import { leerColeccion } from '../../services/adminService.js';
import { guardarJSON } from '../../services/storageService.js';
import {
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from '../../services/productosService.js';

const enlaces = [
    ['', 'Panel'],
    ['ordenes', 'Órdenes'],
    ['productos', 'Productos'],
    ['stock-critico', 'Stock crítico'],
    ['categorias', 'Categorías'],
    ['usuarios', 'Usuarios'],
    ['reportes', 'Reportes'],
    ['perfil', 'Perfil'],
];

export default function AdminPanel({ productos, cambiarCatalogo }) {
    const [usuarios, setUsuarios] = useState(() => leerColeccion('gamehub_usuarios_ev2'));
    const [guardadas, setCategorias] = useState(() => leerColeccion('gamehub_categorias_ev2'));
    const [historial, setHistorial] = useState(null);
    const ordenes = leerColeccion('gamehub_ordenes_ev2');
    const categorias = [...new Set([...guardadas, ...productos.map((item) => item.categoria)])];
    const guardarLista = (clave, datos, actualizar) => {
        if (!guardarJSON(clave, datos)) return 'No se pudo guardar en este navegador.';
        actualizar(datos);
        return '';
    };
    const guardarCategoria = (dato) => {
        const nombre = dato.nombre.trim();
        if (
            !nombre ||
            categorias.some(
                (item) => item !== dato.id && item.toLowerCase() === nombre.toLowerCase(),
            )
        )
            return 'Ingresa un nombre único y no vacío.';
        const error = guardarLista(
            'gamehub_categorias_ev2',
            dato.id
                ? categorias.map((item) => (item === dato.id ? nombre : item))
                : [...categorias, nombre],
            setCategorias,
        );
        if (!error && dato.id)
            cambiarCatalogo(
                productos.map((item) =>
                    item.categoria === dato.id ? { ...item, categoria: nombre } : item,
                ),
            );
        return error;
    };
    const eliminarCategoria = (dato) =>
        productos.some((item) => item.categoria === dato.nombre)
            ? 'No puedes eliminar una categoría que tiene productos.'
            : guardarLista(
                  'gamehub_categorias_ev2',
                  categorias.filter((item) => item !== dato.nombre),
                  setCategorias,
              );
    const guardarUsuario = (dato) => {
        const nombre = dato.nombre.trim();
        const correo = dato.correo.trim().toLowerCase();
        if (
            !nombre ||
            !/^\S+@\S+\.\S+$/.test(correo) ||
            usuarios.some((item) => item.id !== dato.id && item.correo.toLowerCase() === correo)
        )
            return 'Ingresa nombre y correo válido no repetido.';
        const registro = {
            ...dato,
            nombre,
            correo,
            id: dato.id || Math.max(Date.now(), ...usuarios.map((item) => item.id + 1)),
        };
        return guardarLista(
            'gamehub_usuarios_ev2',
            dato.id
                ? usuarios.map((item) => (item.id === dato.id ? registro : item))
                : [...usuarios, registro],
            setUsuarios,
        );
    };
    return (
        <div className="seccion">
            <nav className="menu-administracion" aria-label="Navegación administrativa">
                {enlaces.map(([ruta, nombre]) => (
                    <NavLink
                        key={ruta}
                        to={`/administracion${ruta ? `/${ruta}` : ''}`}
                        end={ruta === ''}
                    >
                        {nombre}
                    </NavLink>
                ))}
            </nav>
            <p>Administración local de demostración. Sin autenticación ni permisos de servidor.</p>
            <Routes>
                <Route
                    index
                    element={
                        <section>
                            <h1>Panel administrativo</h1>
                            <p>Recorrido administrativo propuesto en el anexo de la evaluación.</p>
                            <div className="row row-cols-1 row-cols-md-3 g-3">
                                {enlaces.slice(1).map(([ruta, nombre]) => (
                                    <div className="col" key={ruta}>
                                        <Link className="tarjeta d-block categoria h-100" to={ruta}>
                                            <h2>{nombre}</h2>
                                            <p>Abrir {nombre.toLowerCase()}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>
                    }
                />
                <Route
                    path="productos"
                    element={
                        <AdminProducts
                            productos={productos}
                            crear={(producto) =>
                                cambiarCatalogo(crearProducto(productos, producto))
                            }
                            actualizar={(producto) =>
                                cambiarCatalogo(actualizarProducto(productos, producto))
                            }
                            eliminar={(id) => cambiarCatalogo(eliminarProducto(productos, id))}
                        />
                    }
                />
                <Route path="ordenes" element={<AdminOrders ordenes={ordenes} />} />
                <Route
                    path="categorias"
                    element={
                        <AdminEntityManager
                            titulo="Administrar categorías"
                            campos={[['nombre', 'Nombre de categoría']]}
                            registros={categorias.map((nombre) => ({ id: nombre, nombre }))}
                            guardar={guardarCategoria}
                            eliminar={eliminarCategoria}
                        />
                    }
                />
                <Route
                    path="usuarios"
                    element={
                        <>
                            <p>
                                Los roles son etiquetas de ejemplo, no permisos reales. No se
                                guardan contraseñas.
                            </p>
                            <AdminEntityManager
                                titulo="Administrar usuarios de demostración"
                                campos={[
                                    ['nombre', 'Nombre'],
                                    ['correo', 'Correo'],
                                    ['rol', 'Rol de demostración'],
                                ]}
                                registros={usuarios}
                                guardar={guardarUsuario}
                                eliminar={(dato) =>
                                    guardarLista(
                                        'gamehub_usuarios_ev2',
                                        usuarios.filter((item) => item.id !== dato.id),
                                        setUsuarios,
                                    )
                                }
                                verHistorial={setHistorial}
                            />
                            {historial && (
                                <div className="mt-4">
                                    <h2>Historial de {historial.nombre}</h2>
                                    <AdminOrders
                                        ordenes={ordenes.filter(
                                            (orden) => orden.correo === historial.correo,
                                        )}
                                    />
                                </div>
                            )}
                        </>
                    }
                />
                <Route
                    path="reportes"
                    element={
                        <AdminReports productos={productos} ordenes={ordenes} usuarios={usuarios} />
                    }
                />
                <Route
                    path="stock-critico"
                    element={
                        <AdminReports
                            productos={productos}
                            ordenes={ordenes}
                            usuarios={usuarios}
                            soloCriticos
                        />
                    }
                />
                <Route path="perfil" element={<AdminProfile />} />
                <Route path="*" element={<p>Vista administrativa no encontrada.</p>} />
            </Routes>
        </div>
    );
}
