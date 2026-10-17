import React, { useState } from 'react';

const Blog = () => {
  const [articuloActivo, setArticuloActivo] = useState(null);

  const publicaciones = [
    {
      id: 1,
      titulo: 'Cómo elegir un notebook gamer',
      resumen: 'Revisa qué componentes debes comparar antes de escoger un equipo portátil.',
      contenido: 'Antes de comprar un notebook gamer conviene revisar el procesador, la tarjeta gráfica, la memoria RAM, el almacenamiento y la pantalla. También es importante comprobar su refrigeración y autonomía. La mejor alternativa depende de los juegos y programas que utilizará cada persona.',
      imagen: '/imagenes/notebook_asus_tuf.png'
    },
    {
      id: 2,
      titulo: 'Periféricos para mejorar tu espacio',
      resumen: 'Conoce la función del teclado, mouse y audífonos dentro de una configuración gamer.',
      contenido: 'Los periféricos permiten controlar los juegos y comunicarse con otras personas. Un teclado cómodo, un mouse preciso y audífonos con micrófono pueden mejorar la experiencia. No siempre es necesario comprar el producto más costoso: primero se deben considerar la comodidad y el uso real.',
      imagen: '/imagenes/teclado_rgb.png'
    }
  ];

  if (articuloActivo) {
    return (
      <div style={{ width: '90%', maxWidth: '900px', margin: '40px auto', color: 'white' }}>
        <div style={{ backgroundColor: '#1E1730', border: '1px solid #D6236A', borderRadius: '8px', padding: '30px' }}>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', textAlign: 'center', marginBottom: '25px' }}>
            <img src={articuloActivo.imagen} alt={articuloActivo.titulo} style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain' }} />
          </div>
          <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>{articuloActivo.titulo}</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#ddd', marginBottom: '30px' }}>{articuloActivo.contenido}</p>
          <button 
            onClick={() => setArticuloActivo(null)}
            style={{ backgroundColor: '#D6236A', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Volver al blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '90%', maxWidth: '1200px', margin: '40px auto', color: 'white' }}>
      <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '30px' }}>Blog gamer</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {publicaciones.map(pub => (
          <article key={pub.id} style={{ backgroundColor: '#1E1730', border: '1px solid #D6236A', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '4px', padding: '10px', textAlign: 'center', marginBottom: '15px' }}>
              <img src={pub.imagen} alt={pub.titulo} style={{ width: '100%', height: '160px', objectFit: 'contain' }} />
            </div>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>{pub.titulo}</h3>
            <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '20px' }}>{pub.resumen}</p>
            <button 
              onClick={() => setArticuloActivo(pub)}
              style={{ backgroundColor: '#D6236A', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', marginTop: 'auto', cursor: 'pointer', width: 'fit-content' }}
            >
              Leer publicación
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;