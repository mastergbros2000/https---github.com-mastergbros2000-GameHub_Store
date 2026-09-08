/* =========================================================
   DATOS SIMULADOS DEL PROYECTO
   En EP1 estos datos reemplazan temporalmente una base de datos.
   ========================================================= */

const productos = [
    {
        id: 7,
        codigo: 'NB-ASUS-001',
        nombre: 'Notebook ASUS TUF Gaming',
        categoria: 'Notebooks',
        marca: 'ASUS',
        precio: 1099990,
        descuento: 12,
        stock: 6,
        stockCritico: 3,
        imagen: 'img/productos/notebook_asus_tuf.png',
        descripcion: 'Notebook ASUS TUF Gaming con gráficos dedicados y teclado retroiluminado.'
    },
    {
        id: 8,
        codigo: 'PER-HP-002',
        nombre: 'Mouse Gamer HP',
        categoria: 'Periféricos',
        marca: 'HP',
        precio: 24990,
        descuento: 0,
        stock: 18,
        stockCritico: 5,
        imagen: 'img/productos/mouse_hp.png',
        descripcion: 'Mouse HP con cable, rueda central y botones laterales.'
    },
    {
        id: 9,
        codigo: 'GPU-MSI-003',
        nombre: 'MSI GeForce RTX 5060',
        categoria: 'Componentes',
        marca: 'MSI',
        precio: 429990,
        descuento: 8,
        stock: 4,
        stockCritico: 4,
        imagen: 'img/productos/rtx_5060.png',
        descripcion: 'Tarjeta gráfica MSI GeForce RTX 5060 Shadow 2X con 8 GB GDDR7.'
    },
    {
        id: 10,
        codigo: 'PER-RED-004',
        nombre: 'Teclado mecánico RGB Pro',
        categoria: 'Periféricos',
        marca: 'Redragon',
        precio: 64990,
        descuento: 0,
        stock: 14,
        stockCritico: 5,
        imagen: 'img/productos/teclado_rgb.png',
        descripcion: 'Teclado mecánico de tamaño completo con iluminación RGB.'
    },
    {
        id: 11,
        codigo: 'MON-MG-005',
        nombre: 'Monitor Master-G 27 pulgadas',
        categoria: 'Monitores',
        marca: 'Master-G',
        precio: 219990,
        descuento: 0,
        stock: 8,
        stockCritico: 3,
        imagen: 'img/productos/monitor_masterg.png',
        descripcion: 'Monitor gamer Full HD de 27 pulgadas, 180 Hz y respuesta de 1 ms.'
    },
    {
        id: 12,
        codigo: 'CON-NIN-006',
        nombre: 'Nintendo Switch 2',
        categoria: 'Consolas',
        marca: 'Nintendo',
        precio: 599990,
        descuento: 0,
        stock: 5,
        stockCritico: 3,
        imagen: 'img/productos/nintendo_switch_2.png',
        descripcion: 'Consola Nintendo Switch 2 con controles Joy-Con y modo portátil.'
    },
    {
        id: 13,
        codigo: 'CON-SONY-007',
        nombre: 'PlayStation 5',
        categoria: 'Consolas',
        marca: 'Sony',
        precio: 649990,
        descuento: 0,
        stock: 7,
        stockCritico: 3,
        imagen: 'img/productos/playstation_5.png',
        descripcion: 'Consola PlayStation 5 con control inalámbrico DualSense.'
    },
    {
        id: 14,
        codigo: 'PC-GIG-008',
        nombre: 'PC Gamer AORUS',
        categoria: 'Computadores',
        marca: 'Gigabyte',
        precio: 2499990,
        descuento: 0,
        stock: 2,
        stockCritico: 3,
        imagen: 'img/productos/pc_gamer_aorus.png',
        descripcion: 'Computador gamer AORUS con procesador Ryzen 9 y tarjeta gráfica de alto rendimiento.'
    },
    {
        id: 15,
        codigo: 'PER-JBL-009',
        nombre: 'Audífonos Gamer JBL',
        categoria: 'Periféricos',
        marca: 'JBL',
        precio: 89990,
        descuento: 15,
        stock: 10,
        stockCritico: 4,
        imagen: 'img/productos/audifonos_jbl.png',
        descripcion: 'Audífonos JBL con micrófono integrado para juegos y comunicación.'
    }
];

const regionesComunas = {
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
    'Metropolitana': ['Santiago', 'Providencia', 'Maipú', 'Puente Alto'],
    'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chiguayante']
};

const publicaciones = [
    {
        id: 1,
        titulo: 'Cómo elegir un notebook gamer',
        imagen: 'img/productos/notebook_asus_tuf.png',
        resumen: 'Revisa qué componentes debes comparar antes de escoger un equipo portátil.',
        contenido: 'Antes de comprar un notebook gamer conviene revisar el procesador, la tarjeta gráfica, la memoria RAM, el almacenamiento y la pantalla. También es importante comprobar su refrigeración y autonomía. La mejor alternativa depende de los juegos y programas que utilizará cada persona.'
    },
    {
        id: 2,
        titulo: 'Periféricos para mejorar tu espacio',
        imagen: 'img/productos/teclado_rgb.png',
        resumen: 'Conoce la función del teclado, mouse y audífonos dentro de una configuración gamer.',
        contenido: 'Los periféricos permiten controlar los juegos y comunicarse con otras personas. Un teclado cómodo, un mouse preciso y audífonos con micrófono pueden mejorar la experiencia. No siempre es necesario comprar el producto más costoso: primero se deben considerar la comodidad y el uso real.'
    }
];
