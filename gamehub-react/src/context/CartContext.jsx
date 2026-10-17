import React, { createContext, useState } from 'react';

// 1. Creamos el contexto
export const CartContext = createContext();

// 2. Creamos el proveedor que envolverá nuestra App
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar un producto (o sumar cantidad si ya existe)
  const agregarAlCarrito = (producto, cantidadSeleccionada) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find(item => item.id === producto.id);
      
      if (itemExistente) {
        // Si ya está, actualizamos la cantidad asegurando no pasar el stock
        return prevCarrito.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: Math.min(item.cantidad + cantidadSeleccionada, producto.stock) } 
            : item
        );
      } else {
        // Si es nuevo, lo agregamos con la cantidad inicial
        return [...prevCarrito, { ...producto, cantidad: cantidadSeleccionada }];
      }
    });
  };

  // Actualizar la cantidad directamente desde el input del carrito
  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarrito((prevCarrito) => 
      prevCarrito.map(item => 
        item.id === id 
          ? { ...item, cantidad: nuevaCantidad } 
          : item
      )
    );
  };

  // Eliminar un producto por completo
  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider value={{ 
      carrito, 
      agregarAlCarrito, 
      actualizarCantidad, 
      eliminarProducto, 
      vaciarCarrito 
    }}>
      {children}
    </CartContext.Provider>
  );
};