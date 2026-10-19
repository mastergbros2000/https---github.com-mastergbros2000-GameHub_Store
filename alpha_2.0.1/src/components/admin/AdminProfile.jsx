import { useState } from 'react';
import { guardarJSON, leerJSON } from '../../services/storageService.js';

export default function AdminProfile() {
    const [perfil, setPerfil] = useState(() =>
        leerJSON('gamehub_perfil_admin_ev2', { nombre: '', correo: '' }),
    );
    const [mensaje, setMensaje] = useState('');
    const enviar = (e) => {
        e.preventDefault();
        if (!perfil?.nombre?.trim() || !/^\S+@\S+\.\S+$/.test(perfil.correo)) {
            setMensaje('Ingresa nombre y correo válido.');
            return;
        }
        setMensaje(
            guardarJSON('gamehub_perfil_admin_ev2', perfil)
                ? 'Perfil de demostración guardado.'
                : 'No se pudo guardar el perfil.',
        );
    };
    return (
        <section>
            <h1>Perfil administrativo de demostración</h1>
            <form className="formulario" onSubmit={enviar} noValidate>
                <div className="campo">
                    <label htmlFor="perfil-nombre">Nombre</label>
                    <input
                        id="perfil-nombre"
                        value={perfil?.nombre || ''}
                        onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="perfil-correo">Correo</label>
                    <input
                        id="perfil-correo"
                        value={perfil?.correo || ''}
                        onChange={(e) => setPerfil({ ...perfil, correo: e.target.value })}
                    />
                </div>
                <button className="boton">Guardar perfil</button>
                {mensaje && <p role="status">{mensaje}</p>}
            </form>
        </section>
    );
}
