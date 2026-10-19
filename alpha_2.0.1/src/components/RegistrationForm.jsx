import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validarRegistro } from '../services/validaciones.js';
import { guardarPerfil } from '../services/adminService.js';

const datosVacios = {
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',
    direccion: '',
    region: '',
};

export default function RegistrationForm() {
    const [datos, setDatos] = useState(datosVacios);
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState('');
    const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

    const enviar = (e) => {
        e.preventDefault();
        const encontrado = validarRegistro(datos);
        setError(encontrado);
        setEnviado(false);
        if (encontrado) return;
        // Solo se conserva el perfil de demostración, nunca la contraseña.
        const guardado = guardarPerfil({
            nombre: datos.nombre.trim(),
            correo: datos.correo.trim(),
            direccion: datos.direccion.trim(),
            region: datos.region,
        });
        if (!guardado) {
            setError('El navegador no pudo guardar el perfil.');
            return;
        }
        setEnviado(true);
        setDatos(datosVacios);
    };

    return (
        <section className="seccion formulario-centrado">
            <h1>Crear cuenta nueva</h1>
            <p>
                Registro de demostración. Valida los campos, pero no crea una cuenta en un servidor
                ni guarda tu contraseña.
            </p>
            <form className="formulario" onSubmit={enviar} noValidate>
                {[
                    ['nombre', 'Nombre completo', 'text'],
                    ['correo', 'Correo electrónico', 'email'],
                    ['password', 'Contraseña', 'password'],
                    ['confirmPassword', 'Confirmar contraseña', 'password'],
                    ['direccion', 'Dirección opcional para la compra', 'text'],
                ].map(([campo, etiqueta, tipo]) => (
                    <div className="campo" key={campo}>
                        <label htmlFor={`registro-${campo}`}>{etiqueta}</label>
                        <input
                            id={`registro-${campo}`}
                            name={campo}
                            type={tipo}
                            value={datos[campo]}
                            onChange={cambiar}
                            autoComplete={tipo === 'password' ? 'new-password' : undefined}
                        />
                    </div>
                ))}
                <div className="campo">
                    <label htmlFor="registro-region">Región opcional</label>
                    <select
                        id="registro-region"
                        name="region"
                        value={datos.region}
                        onChange={cambiar}
                    >
                        <option value="">Selecciona una región</option>
                        <option>Valparaíso</option>
                        <option>Metropolitana</option>
                        <option>Biobío</option>
                    </select>
                </div>
                {error && (
                    <p className="mensaje-error" role="alert">
                        {error}
                    </p>
                )}
                {enviado && (
                    <p className="mensaje-exito" role="status">
                        Registro de demostración guardado. Puedes{' '}
                        <Link to="/ingresar">iniciar sesión de demostración</Link>.
                    </p>
                )}
                <button className="boton" type="submit">
                    Registrarme
                </button>
            </form>
        </section>
    );
}
