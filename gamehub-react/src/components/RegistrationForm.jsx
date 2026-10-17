import React, { useState } from 'react';

const RegistrationForm = () => {
  // 1. Mantenemos tu excelente lógica de estado unificado
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(''); // Agregamos un estado para errores

  // 2. Tu función para manejar cambios dinámicamente
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  // 3. Función de envío con validaciones básicas
  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Validar que no haya campos vacíos
    if (!datos.nombre || !datos.correo || !datos.password || !datos.confirmPassword) {
      setError('Por favor, completa todos los campos.');
      setEnviado(false);
      return;
    }

    // Validar que las contraseñas coincidan
    if (datos.password !== datos.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setEnviado(false);
      return;
    }

    setError('');
    setEnviado(true);
    console.log('Datos listos para enviar a la base de datos:', datos);
    
    // Limpiamos el formulario tras el éxito
    setDatos({ nombre: '', correo: '', password: '', confirmPassword: '' });
  };

  // Estilo base para los inputs (Gamer oscuro/fucsia)
  const inputStyle = { 
    width: '100%', 
    backgroundColor: '#120E1A', 
    border: '1px solid #D6236A', 
    color: 'white', 
    padding: '10px', 
    borderRadius: '4px', 
    marginBottom: '20px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ width: '90%', maxWidth: '500px', margin: '40px auto', color: 'white' }}>
      <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>
        <i className="bi bi-person-plus me-2"></i> Crear Cuenta Nueva
      </h2>
      
      {/* Contenedor tipo "Card" pero con nuestros colores */}
      <div style={{ backgroundColor: '#1E1730', border: '1px solid #D6236A', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
        
        {/* Alertas personalizadas */}
        {enviado && (
          <div style={{ backgroundColor: 'rgba(0, 210, 255, 0.1)', border: '1px solid #00D2FF', color: '#00D2FF', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontWeight: 'bold' }}>
            ¡Registro exitoso! Abre la consola (F12) para ver los datos capturados.
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        <form onSubmit={manejarEnvio}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Nombre Completo</label>
          <input 
            type="text" 
            name="nombre"
            placeholder="Ingresa tu nombre" 
            value={datos.nombre}
            onChange={manejarCambio}
            style={inputStyle} 
          />

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Correo Electrónico</label>
          <input 
            type="email" 
            name="correo"
            placeholder="nombre@ejemplo.com" 
            value={datos.correo}
            onChange={manejarCambio}
            style={inputStyle} 
          />

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Contraseña</label>
          <input 
            type="password" 
            name="password"
            placeholder="Crea una contraseña" 
            value={datos.password}
            onChange={manejarCambio}
            style={inputStyle} 
          />

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Confirmar Contraseña</label>
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Repite la contraseña" 
            value={datos.confirmPassword}
            onChange={manejarCambio}
            style={inputStyle} 
          />

          <button 
            type="submit" 
            style={{ width: '100%', backgroundColor: '#D6236A', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;