import { useState } from 'react';

export default function Contacto() {
    const [datos, setDatos] = useState({
        nombre: '',
        correo: '',
        comentario: '',
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(false);
    const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    const enviar = (e) => {
        e.preventDefault();
        const invalido =
            !datos.nombre.trim() ||
            !/^\S+@\S+\.\S+$/.test(datos.correo.trim()) ||
            !datos.comentario.trim();
        setError(invalido);
        setMensaje(
            invalido
                ? 'Completa nombre, correo válido y comentario.'
                : 'Mensaje validado en la demostración. No se envió a un servidor.',
        );
        if (!invalido) setDatos({ nombre: '', correo: '', comentario: '' });
    };

    return (
        <section className="seccion formulario-centrado">
            <h1>Contacto</h1>
            <form className="formulario" onSubmit={enviar} noValidate>
                <div className="campo">
                    <label htmlFor="contacto-nombre">Nombre</label>
                    <input
                        id="contacto-nombre"
                        name="nombre"
                        value={datos.nombre}
                        onChange={cambiar}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="contacto-correo">Correo</label>
                    <input
                        id="contacto-correo"
                        name="correo"
                        type="email"
                        value={datos.correo}
                        onChange={cambiar}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="contacto-comentario">Comentario</label>
                    <textarea
                        id="contacto-comentario"
                        name="comentario"
                        value={datos.comentario}
                        onChange={cambiar}
                    />
                </div>
                {mensaje && (
                    <p
                        className={error ? 'mensaje-error' : 'mensaje-exito'}
                        role={error ? 'alert' : 'status'}
                    >
                        {mensaje}
                    </p>
                )}
                <button className="boton" type="submit">
                    Enviar mensaje
                </button>
            </form>
        </section>
    );
}
