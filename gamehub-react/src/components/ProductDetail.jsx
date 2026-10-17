import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = ({ producto }) => {
  // 1. Importación correcta del contexto del carrito
  const { agregarAlCarrito } = useContext(CartContext);
  
  // 2. Estado local para manejar el selector de cantidad
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState('');

  // Si el usuario entra directamente a /detalle sin seleccionar producto, mostramos un fallback
  if (!producto) {
    return (
      <div className="text-center mt-5" style={{ color: 'white', padding: '50px 0' }}>
        <h2 style={{ color: '#D6236A', fontWeight: 'bold' }}>No se ha seleccionado ningún producto</h2>
        <p>Vuelve al catálogo para elegir tu próximo equipo.</p>
        <Link 
          to="/productos" 
          style={{ backgroundColor: '#D6236A', color: 'white', padding: '10px 25px', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginTop: '15px' }}
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  // 3. Función para formatear el precio
  const formatoPrecio = (valor) => {
    return '$' + Math.round(valor).toLocaleString('es-CL');
  };

  // 4. Calculadora de precio final con descuento
  const precioFinal = producto.precio - (producto.precio * (producto.descuento || 0) / 100);

  // 5. Manejador para agregar al carrito con validación de stock
  const handleAgregar = () => {
    const cant = Number(cantidad);
    if (!Number.isInteger(cant) || cant < 1 || cant > producto.stock) {
      setError(`Ingresa una cantidad válida entre 1 y ${producto.stock}.`);
      return;
    }
    setError('');
    
    // Llamamos a la función de tu CartContext (asegúrate de que tu contexto exponga esta función)
    if(agregarAlCarrito) {
       agregarAlCarrito(producto, cant);
    } else {
       alert("Funcionalidad de carrito en construcción");
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '40px auto', color: 'white' }}>
      <Link to="/productos" style={{ color: '#00D2FF', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontWeight: 'bold' }}>
        ← Volver al catálogo
      </Link>
      
      <div style={{ backgroundColor: '#1E1730', border: '1px solid #D6236A', borderRadius: '8px', padding: '30px', display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* Columna Izquierda: Imagen */}
        <div style={{ flex: '1 1 400px', backgroundColor: '#0F172A', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} 
          />
        </div>

        {/* Columna Derecha: Detalles e Interacción */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          <small style={{ color: '#00D2FF', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            {producto.categoria} / {producto.marca}
          </small>
          
          <h2 style={{ color: 'white', fontWeight: 'bold', marginTop: '10px', fontSize: '2rem' }}>
            {producto.nombre}
          </h2>
          
          <p style={{ color: '#ccc', fontSize: '1.05rem', lineHeight: '1.6', marginTop: '15px' }}>
            {producto.descripcion || 'Producto de alto rendimiento diseñado para ofrecer la mejor experiencia gamer.'}
          </p>

          <div style={{ marginTop: '20px', marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(214, 35, 106, 0.1)', borderRadius: '6px', borderLeft: '4px solid #D6236A' }}>
            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>Especificaciones principales</h4>
            <ul style={{ color: '#ddd', margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li>Producto nuevo y sellado</li>
              <li>Garantía directa de 12 meses</li>
              <li>Despacho express disponible</li>
            </ul>
          </div>

          {/* Precios */}
          <div style={{ marginBottom: '20px' }}>
            {producto.descuento > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                <span style={{ backgroundColor: '#D6236A', color: 'white', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  Oferta -{producto.descuento}%
                </span>
                <span style={{ textDecoration: 'line-through', color: '#FF7A7A', fontSize: '0.95rem' }}>
                  Normal: {formatoPrecio(producto.precio)}
                </span>
              </div>
            )}
            <p style={{ color: '#00D2FF', fontSize: '2.2rem', fontWeight: 'bold', margin: 0 }}>
              {formatoPrecio(precioFinal)}
            </p>
            <p style={{ color: producto.stock > 0 ? '#25d366' : '#FF7A7A', fontWeight: 'bold', margin: '5px 0 0 0' }}>
              {producto.stock > 0 ? `Stock disponible: ${producto.stock} unidades` : 'Producto temporalmente agotado'}
            </p>
          </div>

          {/* Selector de cantidad y Agregar */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginTop: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <input 
                type="number" 
                min="1" 
                max={producto.stock} 
                value={cantidad} 
                onChange={(e) => setCantidad(e.target.value)}
                disabled={producto.stock === 0}
                style={{ width: '80px', padding: '12px 10px', borderRadius: '4px', border: '1px solid #D6236A', backgroundColor: '#120E1A', color: 'white', fontSize: '1.1rem', textAlign: 'center' }}
              />
            </div>
            
            <button 
              onClick={handleAgregar}
              disabled={producto.stock === 0}
              style={{ 
                flex: 1,
                backgroundColor: producto.stock > 0 ? '#D6236A' : '#4B2A63', 
                color: 'white', 
                border: 'none', 
                padding: '12px 20px', 
                borderRadius: '4px', 
                fontWeight: 'bold', 
                fontSize: '1.1rem',
                cursor: producto.stock > 0 ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s'
              }}
            >
              {producto.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
            </button>
          </div>
          {error && <p style={{ color: '#FF7A7A', fontWeight: 'bold', marginTop: '10px' }}>{error}</p>}

        </div>
      </div>

      {/* Zona de Reseñas */}
      <div style={{ marginTop: '40px', backgroundColor: '#1E1730', borderRadius: '8px', padding: '30px' }}>
        <h3 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px' }}>Reseñas de compradores</h3>
        <div style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '15px' }}>
          <p style={{ color: '#FFD700', margin: '0 0 5px 0', fontSize: '1.2rem' }}>★★★★★</p>
          <p style={{ color: '#ddd', margin: 0 }}>"Excelente producto, llegó impecable y el despacho fue súper rápido. 100% recomendado."</p>
          <small style={{ color: '#888' }}>- Juan Pérez, Valparaíso</small>
        </div>
        <div>
          <p style={{ color: '#FFD700', margin: '0 0 5px 0', fontSize: '1.2rem' }}>★★★★☆</p>
          <p style={{ color: '#ddd', margin: 0 }}>"Buena relación entre precio y calidad. El embalaje podría mejorar, pero el equipo funciona perfecto."</p>
          <small style={{ color: '#888' }}>- María Gómez, Santiago</small>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;