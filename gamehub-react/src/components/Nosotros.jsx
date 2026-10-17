import React from 'react';

const Nosotros = () => {
  return (
    <div style={{ width: '90%', maxWidth: '1200px', margin: '40px auto', color: 'white' }}>
      <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>Nosotros</h2>
      <div style={{ backgroundColor: '#1E1730', border: '1px solid #D6236A', borderRadius: '8px', padding: '30px' }}>
        <h4 style={{ fontWeight: 'bold' }}>GameHub Store</h4>
        <p style={{ color: '#ccc', marginBottom: '20px' }}>Somos una tienda académica dedicada a computadores, consolas, componentes y periféricos gamer.</p>
        
        <h4 style={{ fontWeight: 'bold' }}>Equipo de desarrollo</h4>
        <p style={{ color: '#ccc', marginBottom: '10px' }}>Este frontend fue construido colaborativamente por estudiantes de Desarrollo Fullstack II.</p>
        <p style={{ color: '#ccc', margin: 0 }}>Nuestra meta es ofrecer una navegación clara, productos con información útil y un proceso de compra sencillo.</p>
      </div>
    </div>
  );
};
export default Nosotros;