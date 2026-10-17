import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ShoppingCart = () => {
  // 1. Extraemos el carrito y las funciones desde el contexto global
  // *Asegúrate de que 'actualizarCantidad' esté definida en tu CartContext*
  const { carrito, eliminarProducto, vaciarCarrito, actualizarCantidad } = useContext(CartContext);
  const navigate = useNavigate();

  // Estados locales exclusivos para el cupón
  const [cupon, setCupon] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [mensajeCupon, setMensajeCupon] = useState('');

  // 2. Lógica de cálculos matemáticos
  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const descuento = descuentoAplicado ? subtotal * 0.10 : 0;
  const total = subtotal - descuento;

  // 3. Función de interacción del cupón
  const aplicarCupon = () => {
    if (cupon.toUpperCase() === 'GAME10') {
      setDescuentoAplicado(true);
      setMensajeCupon('¡Cupón GAME10 aplicado! 10% de descuento.');
    } else {
      setDescuentoAplicado(false);
      setMensajeCupon('Cupón inválido o expirado.');
    }
  };

  // Manejador para el botón de pago
  const handlePagar = () => {
    if (carrito.length > 0) {
      alert(`Iniciando proceso de pago por un total de $${total.toLocaleString('es-CL')}`);
      // Aquí a futuro navegaremos al checkout: navigate('/checkout');
    }
  };

  // 4. Estilos reutilizables (Gamer)
  const btnStyle = { backgroundColor: '#D6236A', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' };
  const btnOutlineStyle = { backgroundColor: 'transparent', color: '#D6236A', border: '1px solid #D6236A', padding: '10px 15px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' };

  return (
    <div style={{ width: '90%', maxWidth: '1000px', margin: '40px auto', color: 'white' }}>
      <h2 style={{ color: '#D6236A', fontWeight: 'bold', marginBottom: '20px', borderBottom: '2px solid #D6236A', paddingBottom: '10px' }}>
        <i className="bi bi-cart3 me-2"></i> Tu Carrito Gamer
      </h2>

      {carrito.length === 0 ? (
        // Vista cuando el carrito está vacío
        <div style={{ backgroundColor: '#1E1730', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid #D6236A' }}>
          <h3 style={{ color: '#00D2FF', marginBottom: '20px' }}>Tu carrito está vacío</h3>
          <p>Aún no has agregado equipamiento para tu setup.</p>
          <Link to="/productos" style={{ ...btnStyle, display: 'inline-block', textDecoration: 'none', marginTop: '15px' }}>
            Volver al Catálogo
          </Link>
        </div>
      ) : (
        // Vista cuando hay productos
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* Lista de Productos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {carrito.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', backgroundColor: '#1E1730', padding: '15px', borderRadius: '8px', border: '1px solid #4B2A63' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={item.imagen} alt={item.nombre} style={{ width: '80px', height: '80px', objectFit: 'contain', backgroundColor: '#0F172A', borderRadius: '4px' }} />
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#F3EFFA', fontSize: '1.1rem' }}>{item.nombre}</h4>
                    <p style={{ margin: 0, color: '#00D2FF', fontWeight: 'bold' }}>${item.precio.toLocaleString('es-CL')}</p>
                    
                    {/* Selector interactivo de cantidad */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                      <label style={{ color: '#C7B9D4', fontSize: '0.9rem' }}>Cant:</label>
                      <input 
                        type="number" 
                        min="1" 
                        max={item.stock || 99}
                        value={item.cantidad}
                        onChange={(e) => {
                          const nuevaCantidad = parseInt(e.target.value);
                          if (nuevaCantidad > 0 && actualizarCantidad) {
                            actualizarCantidad(item.id, nuevaCantidad);
                          }
                        }}
                        style={{ width: '60px', padding: '4px', borderRadius: '4px', border: '1px solid #D6236A', backgroundColor: '#120E1A', color: 'white', textAlign: 'center' }}
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => eliminarProducto(item.id)} 
                  style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
                >
                  <i className="bi bi-trash"></i> Quitar
                </button>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button onClick={vaciarCarrito} style={btnOutlineStyle}>Vaciar Carrito</button>
              <Link to="/productos" style={{ ...btnOutlineStyle, textDecoration: 'none', textAlign: 'center' }}>Seguir Comprando</Link>
            </div>
          </div>

          {/* Panel de Resumen y Cupón */}
          <div style={{ backgroundColor: '#1E1730', padding: '25px', borderRadius: '8px', border: '1px solid #D6236A', position: 'sticky', top: '20px' }}>
            <h3 style={{ borderBottom: '1px solid #4B2A63', paddingBottom: '10px', marginBottom: '20px', color: 'white' }}>Resumen de Compra</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#ccc' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString('es-CL')}</span>
            </div>
            
            {descuentoAplicado && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#00D2FF' }}>
                <span>Descuento (10%):</span>
                <span>-${descuento.toLocaleString('es-CL')}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', paddingTop: '15px', borderTop: '1px solid #4B2A63', fontSize: '1.3rem', fontWeight: 'bold', color: '#D6236A' }}>
              <span>Total:</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>

            {/* Zona del Cupón */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#C7B9D4' }}>¿Tienes un cupón?</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={cupon} 
                  onChange={(e) => setCupon(e.target.value)} 
                  placeholder="Ej: GAME10" 
                  style={{ flex: 1, padding: '10px', backgroundColor: '#120E1A', border: '1px solid #64748B', color: 'white', borderRadius: '4px' }}
                />
                <button onClick={aplicarCupon} style={{ backgroundColor: '#00D2FF', color: '#120E1A', border: 'none', padding: '10px 15px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Aplicar
                </button>
              </div>
              {mensajeCupon && (
                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: descuentoAplicado ? '#25d366' : '#FF7A7A', fontWeight: 'bold' }}>
                  {mensajeCupon}
                </p>
              )}
            </div>

            <button onClick={handlePagar} style={{ ...btnStyle, width: '100%', fontSize: '1.1rem', padding: '15px' }}>
              Ir a Pagar
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ShoppingCart;