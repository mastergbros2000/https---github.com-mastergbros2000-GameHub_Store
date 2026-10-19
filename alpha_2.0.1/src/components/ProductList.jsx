import { useContext, useMemo, useState } from 'react';
import { CartContext } from '../context/cartContext.js';
import { filtrarProductos } from '../services/productosService.js';
import ProductCard from './ProductCard.jsx';

export default function ProductList({
    productos,
    mostrarFiltros = true,
    soloDestacados = false,
    soloOfertas = false,
    categoriaInicial = 'Todas',
}) {
    const { agregarAlCarrito } = useContext(CartContext);
    const [categoria, setCategoria] = useState(categoriaInicial);
    const [marca, setMarca] = useState('Todas');
    const [orden, setOrden] = useState('Sin ordenar');
    const [busqueda, setBusqueda] = useState('');
    const [mensaje, setMensaje] = useState('');
    const categorias = [...new Set(productos.map((producto) => producto.categoria))];
    const marcas = [...new Set(productos.map((producto) => producto.marca))];

    const visibles = useMemo(() => {
        let base = productos;
        if (soloDestacados) base = base.slice(0, 3);
        if (soloOfertas) base = base.filter((producto) => producto.descuento > 0);
        return filtrarProductos(base, categoria, marca, orden, busqueda);
    }, [productos, soloDestacados, soloOfertas, categoria, marca, orden, busqueda]);

    const limpiar = () => {
        setBusqueda('');
        setCategoria('Todas');
        setMarca('Todas');
        setOrden('Sin ordenar');
    };

    const agregar = (producto, cantidad) => {
        agregarAlCarrito(producto, cantidad);
        setMensaje(`${producto.nombre} agregado al carrito. La cantidad respeta el stock.`);
    };

    return (
        <div>
            {mostrarFiltros && (
                <div className="filtros-productos">
                    <label>
                        Buscar
                        <input
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Nombre del producto"
                        />
                    </label>
                    <label>
                        Categoría
                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option>Todas</option>
                            {categorias.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Marca
                        <select value={marca} onChange={(e) => setMarca(e.target.value)}>
                            <option>Todas</option>
                            {marcas.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Orden
                        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                            <option>Sin ordenar</option>
                            <option>Menor precio</option>
                            <option>Mayor precio</option>
                            <option>Alfabético</option>
                        </select>
                    </label>
                    <button className="boton" onClick={limpiar}>
                        Limpiar
                    </button>
                </div>
            )}
            {mensaje && (
                <p className="mensaje-exito" role="status">
                    {mensaje}
                </p>
            )}
            {visibles.length === 0 ? (
                <p className="mensaje-error" role="status">
                    No se encontraron productos.
                </p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {visibles.map((producto) => (
                        <div className="col" key={producto.id}>
                            <ProductCard producto={producto} agregar={agregar} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
