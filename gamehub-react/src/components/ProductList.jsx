import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// 1. Agregamos mostrarFiltros y soloDestacados
const ProductList = ({ seleccionarProducto, mostrarFiltros = true, soloDestacados = false }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CartContext);

  // Los 9 productos originales exactos de tu EP1
  const productosOriginales = [
    { id: 1, nombre: 'Notebook ASUS TUF Gaming', categoria: 'Notebooks', marca: 'ASUS', precio: 1099990, descuento: 12, stock: 6, imagen: '/imagenes/notebook_asus_tuf.png' },
    { id: 2, nombre: 'Mouse Gamer HP', categoria: 'Periféricos', marca: 'HP', precio: 24990, descuento: 0, stock: 18, imagen: '/imagenes/mouse_hp.png' },
    { id: 3, nombre: 'MSI GeForce RTX 5060', categoria: 'Componentes', marca: 'MSI', precio: 429990, descuento: 8, stock: 4, imagen: '/imagenes/rtx_5060.png' },
    { id: 4, nombre: 'Teclado mecánico RGB Pro', categoria: 'Periféricos', marca: 'Redragon', precio: 64990, descuento: 0, stock: 14, imagen: '/imagenes/teclado_rgb.png' },
    { id: 5, nombre: 'Monitor Master-G 27 pulgadas', categoria: 'Monitores', marca: 'Master-G', precio: 219990, descuento: 0, stock: 8, imagen: '/imagenes/monitor_masterg.png' },
    { id: 6, nombre: 'Nintendo Switch 2', categoria: 'Consolas', marca: 'Nintendo', precio: 599990, descuento: 0, stock: 5, imagen: '/imagenes/nintendo_switch_2.png' },
    { id: 7, nombre: 'PlayStation 5', categoria: 'Consolas', marca: 'Sony', precio: 649900, descuento: 0, stock: 7, imagen: '/imagenes/playstation_5.png' },
    { id: 8, nombre: 'PC Gamer AORUS', categoria: 'Computadores', marca: 'Gigabyte', precio: 2499990, descuento: 0, stock: 2, imagen: '/imagenes/pc_gamer_aorus.png' },
    { id: 9, nombre: 'Audífonos Gamer JBL', categoria: 'Periféricos', marca: 'JBL', precio: 89990, descuento: 15, stock: 10, imagen: '/imagenes/audifonos_jbl.png' }
  ];

  // Estados para los filtros
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [marcaFiltro, setMarcaFiltro] = useState('Todas');
  const [orden, setOrden] = useState('Sin ordenar');

  const formatoPrecio = (valor) => '$' + Math.round(valor).toLocaleString('es-CL');
  const precioFinal = (producto) => producto.precio - (producto.precio * producto.descuento / 100);

  // Lógica de filtrado y ordenamiento
  const productosFiltrados = productosOriginales.filter(p => {
    // 2. Si soloDestacados es true, filtramos para que solo pasen los IDs 1, 2 y 3
    if (soloDestacados) {
      if (p.id !== 1 && p.id !== 2 && p.id !== 3) return false;
    }

    // Lógica normal de filtros para el resto de los casos
    const coincideCat = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
    const coincideMarca = marcaFiltro === 'Todas' || p.marca === marcaFiltro;
    return coincideCat && coincideMarca;
  }).sort((a, b) => {
    if (orden === 'Menor precio') return precioFinal(a) - precioFinal(b);
    if (orden === 'Mayor precio') return precioFinal(b) - precioFinal(a);
    if (orden === 'Alfabético') return a.nombre.localeCompare(b.nombre);
    return 0;
  });

  const irADetalle = (producto) => {
    seleccionarProducto(producto);
    navigate('/detalle');
  };

  return (
    <div>
      {/* 3. Envolvemos la barra de filtros con la condición */}
      {mostrarFiltros && (
        <div style={{ backgroundColor: '#1E1730', padding: '15px', borderRadius: '8px', border: '1px solid #D6236A', marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} style={{ backgroundColor: '#120E1A', color: 'white', border: '1px solid #D6236A', padding: '8px', borderRadius: '4px', flex: '1 1 150px' }}>
            <option value="Todas">Todas las categorías</option>
            <option value="Notebooks">Notebooks</option>
            <option value="Periféricos">Periféricos</option>
            <option value="Componentes">Componentes</option>
            <option value="Monitores">Monitores</option>
            <option value="Consolas">Consolas</option>
            <option value="Computadores">Computadores</option>
          </select>

          <select value={marcaFiltro} onChange={(e) => setMarcaFiltro(e.target.value)} style={{ backgroundColor: '#120E1A', color: 'white', border: '1px solid #D6236A', padding: '8px', borderRadius: '4px', flex: '1 1 150px' }}>
            <option value="Todas">Todas las marcas</option>
            <option value="ASUS">ASUS</option>
            <option value="HP">HP</option>
            <option value="MSI">MSI</option>
            <option value="Redragon">Redragon</option>
            <option value="Master-G">Master-G</option>
            <option value="Nintendo">Nintendo</option>
            <option value="Sony">Sony</option>
            <option value="Gigabyte">Gigabyte</option>
            <option value="JBL">JBL</option>
          </select>

          <select value={orden} onChange={(e) => setOrden(e.target.value)} style={{ backgroundColor: '#120E1A', color: 'white', border: '1px solid #D6236A', padding: '8px', borderRadius: '4px', flex: '1 1 150px' }}>
            <option value="Sin ordenar">Sin ordenar</option>
            <option value="Menor precio">Menor precio</option>
            <option value="Mayor precio">Mayor precio</option>
            <option value="Alfabético">Alfabético</option>
          </select>

          <button onClick={() => { setCategoriaFiltro('Todas'); setMarcaFiltro('Todas'); setOrden('Sin ordenar'); }} style={{ backgroundColor: '#D6236A', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Limpiar
          </button>
        </div>
      )}

      {/* GRILLA DE PRODUCTOS (Siempre visible) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {productosFiltrados.map((producto) => (
          <article key={producto.id} className="tarjeta" style={{ backgroundColor: '#1E1730', border: '1px solid #D6236A', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '10px', textAlign: 'center', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={producto.imagen} alt={producto.nombre} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            
            <h3 style={{ color: 'white', marginTop: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>{producto.nombre}</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>{producto.marca} - {producto.categoria}</p>
            
            <div style={{ height: '45px' }}>
              {producto.descuento > 0 ? (
                <>
                  <p style={{ color: '#00D2FF', fontWeight: 'bold', margin: 0 }}>Oferta -{producto.descuento}%</p>
                  <p style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.9rem', margin: 0 }}>Precio normal: {formatoPrecio(producto.precio)}</p>
                </>
              ) : null}
            </div>
            
            <p style={{ color: '#D6236A', fontSize: '1.6rem', fontWeight: 'bold', margin: '10px 0' }}>
              {formatoPrecio(precioFinal(producto))}
            </p>
            
            <p style={{ color: 'white', fontSize: '0.9rem', marginBottom: '15px' }}>Stock disponible: {producto.stock}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button 
                onClick={() => irADetalle(producto)}
                style={{ flex: 1, backgroundColor: 'transparent', color: '#D6236A', border: '1px solid #D6236A', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Ver detalle
              </button>
              <button 
                onClick={() => agregarAlCarrito(producto)}
                style={{ flex: 1, backgroundColor: '#D6236A', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Agregar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProductList;