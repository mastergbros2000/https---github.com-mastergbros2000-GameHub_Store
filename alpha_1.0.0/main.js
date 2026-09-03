/* ==========================================================================
   GameHub Store - Lógica Principal y Carga Dinámica de Productos (EP1)
   ========================================================================== */

// Base de datos simulada de productos destacados (Datos Mock)
const productosDestacados = [
    {
        id: 1,
        nombre: "Notebook Gamer Asus TUF F15",
        categoria: "Notebooks Gamer",
        precio: "$899.990",
        imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80",
        stock: 5
    },
    {
        id: 2,
        nombre: "Tarjeta Gráfica RTX 4070 Ti",
        categoria: "Tarjetas Gráficas",
        precio: "$749.990",
        imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80",
        stock: 2
    },
    {
        id: 3,
        nombre: "Consola PlayStation 5 Slim",
        categoria: "Consolas",
        precio: "$549.990",
        imagen: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80",
        stock: 0 // Producto agotado para probar validación de stock
    },
    {
        id: 4,
        nombre: "Teclado Mecánico RGB Switch Red",
        categoria: "Periféricos",
        precio: "$49.990",
        imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
        stock: 10
    }
];

// Función para renderizar dinámicamente los productos destacados
function renderizarDestacados(productos) {
    const contenedor = document.getElementById('contenedor-destacados');

    if (!contenedor) return;

    // Limpia el contenido previo
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        // Determina la disponibilidad de stock
        const sinStock = producto.stock === 0;
        const textoBoton = sinStock ? "Agotado" : "Ver Detalle";
        const estadoBoton = sinStock ? "disabled" : "";

        // Construcción del bloque HTML de la tarjeta
        const tarjetaHTML = `
            <article class="tarjeta-categoria ${sinStock ? 'agotado' : ''}">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--radio-borde); margin-bottom: 0.8rem;">
                <span style="font-size: 0.8rem; color: var(--color-acento); font-weight: bold;">${producto.categoria}</span>
                <h3 style="font-size: 1.1rem; color: var(--color-texto-brillante); margin: 0.4rem 0;">${producto.nombre}</h3>
                <p style="font-size: 1.2rem; font-weight: bold; color: var(--color-acento); margin-bottom: 0.8rem;">${producto.precio}</p>
                <button class="boton-acento" style="width: 100%;" ${estadoBoton}>
                    ${textoBoton}
                </button>
            </article>
        `;

        contenedor.innerHTML += tarjetaHTML;
    });
}

// Ejecución al cargar completamente el DOM
document.addEventListener('DOMContentLoaded', () => {
    renderizarDestacados(productosDestacados);
});