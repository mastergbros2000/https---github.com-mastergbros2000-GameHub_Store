import { useState } from 'react';

// Formulario reutilizado para categorías y usuarios de demostración.
export default function AdminEntityManager({
    titulo,
    campos,
    registros,
    guardar,
    eliminar,
    verHistorial,
}) {
    const vacio = Object.fromEntries(campos.map(([campo]) => [campo, '']));
    const [formulario, setFormulario] = useState(vacio);
    const [mensaje, setMensaje] = useState('');
    const enviar = (e) => {
        e.preventDefault();
        const error = guardar(formulario);
        setMensaje(error || 'Registro guardado.');
        if (!error) setFormulario(vacio);
    };
    return (
        <section>
            <h1>{titulo}</h1>
            <form className="formulario mb-4" onSubmit={enviar} noValidate>
                {campos.map(([campo, etiqueta]) => (
                    <div className="campo" key={campo}>
                        <label htmlFor={`entidad-${campo}`}>{etiqueta}</label>
                        <input
                            id={`entidad-${campo}`}
                            value={formulario[campo]}
                            onChange={(e) =>
                                setFormulario({ ...formulario, [campo]: e.target.value })
                            }
                        />
                    </div>
                ))}
                <button className="boton">
                    {formulario.id ? 'Actualizar registro' : 'Crear registro'}
                </button>
                {formulario.id && (
                    <button
                        className="boton boton-secundario ms-2"
                        type="button"
                        onClick={() => setFormulario(vacio)}
                    >
                        Cancelar
                    </button>
                )}
                {mensaje && <p role="status">{mensaje}</p>}
            </form>
            <div className="table-responsive">
                <table className="tabla">
                    <thead>
                        <tr>
                            {campos.map(([campo, etiqueta]) => (
                                <th key={campo}>{etiqueta}</th>
                            ))}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((item) => (
                            <tr key={item.id}>
                                {campos.map(([campo]) => (
                                    <td key={campo}>{item[campo]}</td>
                                ))}
                                <td>
                                    <div className="acciones">
                                        <button
                                            className="boton boton-secundario"
                                            onClick={() => setFormulario({ ...item })}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="boton"
                                            onClick={() => {
                                                const error = eliminar(item);
                                                setMensaje(error || 'Registro eliminado.');
                                                if (!error && formulario.id === item.id)
                                                    setFormulario(vacio);
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                        {verHistorial && (
                                            <button
                                                className="boton boton-secundario"
                                                onClick={() => verHistorial(item)}
                                            >
                                                Historial
                                            </button>
                                        )}
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
