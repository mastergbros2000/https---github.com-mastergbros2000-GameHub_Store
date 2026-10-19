import { imagenProducto } from '../services/imagenesService.js';

export default function ProductImage({ producto, className }) {
    return <img className={className} src={imagenProducto(producto)} alt={producto.nombre} />;
}
