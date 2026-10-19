import { useState } from 'react';
import { productoValido } from '../services/validaciones.js';

const productoVacio = {
    nombre: '',
    codigo: '',
    categoria: '',
    marca: '',
    precio: '',
    descuento: 0,
    stock: '',
    imagen: '/imagenes/mouse_hp.png',
    descripcion: '',
};
const imagenes = [
    ['notebook_asus_tuf.png', 'Notebook ASUS'],
    ['mouse_hp.png', 'Mouse HP'],
    ['rtx_5060.png', 'Tarjeta gráfica MSI'],
    ['teclado_rgb.png', 'Teclado RGB'],
    ['monitor_masterg.png', 'Monitor'],
    ['nintendo_switch_2.png', 'Nintendo Switch 2'],
    ['playstation_5.png', 'PlayStation 5'],
    ['pc_gamer_aorus.png', 'PC AORUS'],
    ['audifonos_jbl.png', 'Audífonos JBL'],
];

export default function AdminProducts({ productos, crear, actualizar, eliminar }) {
    const [formulario, setFormulario] = useState(productoVacio);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(false);
    const cambiar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

    const guardar = (e) => {
        e.preventDefault();
        const normalizado = {
            ...formulario,
            nombre: formulario.nombre.trim(),
            codigo: formulario.codigo.trim(),
            categoria: formulario.categoria.trim(),
            marca: formulario.marca.trim(),
            precio: Number(formulario.precio),
            descuento: Number(formulario.descuento),
            stock: formulario.stock === '' ? '' : Number(formulario.stock),
        };
        const repetido =
            normalizado.codigo &&
            productos.some(
                (item) =>
                    item.id !== normalizado.id &&
                    item.codigo.toLowerCase() === normalizado.codigo.toLowerCase(),
            );
        if (!productoValido(normalizado) || !normalizado.codigo || !normalizado.marca || repetido) {
            setError(true);
            setMensaje(
                'Completa los campos. El código debe ser único, el precio positivo, el stock entero y el descuento entre 0 y 100.',
            );
            return;
        }
        if (normalizado.id) actualizar(normalizado);
        else crear(normalizado);
        setFormulario(productoVacio);
        setError(false);
        setMensaje('Producto guardado correctamente.');
    };

    const quitar = (id) => {
        eliminar(id);
        if (formulario.id === id) setFormulario(productoVacio);
        setError(false);
        setMensaje('Producto eliminado correctamente.');
    };

    return (
        <section className="seccion">
            <h1>Administración de productos</h1>
            <p>
                CRUD académico: crear, leer, actualizar y eliminar. El acceso a esta demostración no
                tiene control de permisos de servidor.
            </p>
            <form className="formulario formulario-admin" onSubmit={guardar} noValidate>
                <div className="row g-3">
                    {[
                        ['nombre', 'Nombre', 'text'],
                        ['codigo', 'Código', 'text'],
                        ['categoria', 'Categoría', 'text'],
                        ['marca', 'Marca', 'text'],
                        ['precio', 'Precio', 'number'],
                        ['descuento', 'Descuento', 'number'],
                        ['stock', 'Stock', 'number'],
                    ].map(([campo, etiqueta, tipo]) => (
                        <div className="col-12 col-md-6 col-lg-4 campo" key={campo}>
                            <label htmlFor={`admin-${campo}`}>{etiqueta}</label>
                            <input
                                id={`admin-${campo}`}
                                name={campo}
                                type={tipo}
                                value={formulario[campo]}
                                onChange={cambiar}
                                min={tipo === 'number' ? 0 : undefined}
                                max={campo === 'descuento' ? 100 : undefined}
                                step={tipo === 'number' ? 1 : undefined}
                            />
                        </div>
                    ))}
                    <div className="col-12 col-md-6 campo">
                        <label htmlFor="admin-imagen">Imagen del producto</label>
                        <select
                            id="admin-imagen"
                            name="imagen"
                            value={formulario.imagen}
                            onChange={cambiar}
                        >
                            {imagenes.map(([archivo, nombre]) => (
                                <option key={archivo} value={`/imagenes/${archivo}`}>
                                    {nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="campo">
                    <label htmlFor="admin-descripcion">Descripción</label>
                    <textarea
                        id="admin-descripcion"
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={cambiar}
                    />
                </div>
                <div className="acciones">
                    <button className="boton" type="submit">
                        {formulario.id ? 'Actualizar' : 'Crear'} producto
                    </button>
                    {formulario.id && (
                        <button
                            className="boton boton-secundario"
                            type="button"
                            onClick={() => setFormulario(productoVacio)}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
                {mensaje && (
                    <p
                        className={error ? 'mensaje-error' : 'mensaje-exito'}
                        role={error ? 'alert' : 'status'}
                    >
                        {mensaje}
                    </p>
                )}
            </form>
            <div className="table-responsive">
                <table className="tabla">
                    <caption>Productos disponibles para administrar</caption>
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td>${producto.precio.toLocaleString('es-CL')}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <div className="acciones">
                                        <button
                                            className="boton boton-secundario"
                                            onClick={() => {
                                                setFormulario({ ...producto });
                                                setMensaje('Editando producto seleccionado.');
                                                setError(false);
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="boton"
                                            onClick={() => quitar(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
