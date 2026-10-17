import React from 'react';

const Contacto = () => {
  const inputStyle = { width: '100%', backgroundColor: '#120E1A', border: '1px solid #D6236A', color: 'white', padding: '10px', borderRadius: '4px', marginBottom: '20px' };

  return (
    <div style={{ width: '90%', maxWidth: '600px', margin: '40px auto', color: 'white' }}>
      <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>Contacto</h2>
      <div style={{ backgroundColor: '#1E1730', padding: '30px', borderRadius: '8px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Nombre *</label>
        <input type="text" style={inputStyle} />

        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Correo *</label>
        <input type="email" style={inputStyle} />

        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Comentario *</label>
        <textarea rows="4" style={inputStyle}></textarea>

        <button style={{ backgroundColor: '#D6236A', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold' }}>Enviar mensaje</button>
      </div>
    </div>
  );
};
export default Contacto;