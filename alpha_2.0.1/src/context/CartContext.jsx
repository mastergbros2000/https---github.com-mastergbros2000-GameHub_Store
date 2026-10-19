import { useEffect, useState } from 'react';
import {
    agregarProducto,
    limitarCantidad,
    sincronizarCarrito,
} from '../services/carritoService.js';
import { leerProductos } from '../services/productosService.js';
import { guardarJSON, leerJSON } from '../services/storageService.js';
import { CartContext } from './cartContext.js';

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(() =>
        sincronizarCarrito(leerJSON('gamehub_carrito_ev2', []), leerProductos()),
    );
    const [cuponAplicado, setCuponAplicado] = useState(false);

    useEffect(() => {
        guardarJSON('gamehub_carrito_ev2', carrito);
    }, [carrito]);

    const agregarAlCarrito = (producto, cantidad = 1) => {
        setCarrito((actual) => agregarProducto(actual, producto, cantidad));
    };

    const actualizarCantidad = (id, cantidad) => {
        setCarrito((actual) =>
            actual.map((item) =>
                item.id === id
                    ? { ...item, cantidad: limitarCantidad(cantidad, item.stock) }
                    : item,
            ),
        );
    };

    const eliminarProducto = (id) => {
        setCarrito((actual) => actual.filter((item) => item.id !== id));
    };

    const sincronizarCatalogo = (productos) => {
        setCarrito((actual) => sincronizarCarrito(actual, productos));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
        setCuponAplicado(false);
    };

    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                actualizarCantidad,
                eliminarProducto,
                sincronizarCatalogo,
                vaciarCarrito,
                cuponAplicado,
                setCuponAplicado,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
