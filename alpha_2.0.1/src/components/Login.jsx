import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { leerJSON } from '../services/storageService.js';

export default function Login({ iniciarSesion }) {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const enviar = (e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(correo.trim()) || password.length < 6) {
            setError('Ingresa un correo válido y una contraseña de al menos 6 caracteres.');
            return;
        }
        const perfil = leerJSON('gamehub_perfil_ev2', null);
        if (
            !perfil ||
            typeof perfil.correo !== 'string' ||
            perfil.correo.toLowerCase() !== correo.trim().toLowerCase()
        ) {
            setError('Primero registra un perfil de demostración con este correo.');
            return;
        }
        // No existe autenticación real en esta versión frontend.
        iniciarSesion(perfil);
        setPassword('');
        navigate('/checkout');
    };

    return (
        <section className="seccion formulario-centrado">
            <h1>Iniciar sesión</h1>
            <p>
                Acceso de demostración: recupera el perfil registrado para autocompletar el
                checkout. No verifica contraseñas contra un servidor.
            </p>
            <form className="formulario" onSubmit={enviar} noValidate>
                <div className="campo">
                    <label htmlFor="login-correo">Correo</label>
                    <input
                        id="login-correo"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        autoComplete="email"
                    />
                </div>
                <div className="campo">
                    <label htmlFor="login-password">Contraseña de demostración</label>
                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                {error && (
                    <p className="mensaje-error" role="alert">
                        {error}
                    </p>
                )}
                <button className="boton" type="submit">
                    Ingresar a la demostración
                </button>
                <p className="mt-3">
                    ¿No tienes perfil? <Link to="/registro">Crear cuenta</Link>
                </p>
            </form>
        </section>
    );
}
