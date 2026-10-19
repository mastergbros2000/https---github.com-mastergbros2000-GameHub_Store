export function validarCheckout(datos) {
    const errores = {};
    if (!datos.nombre.trim()) errores.nombre = 'Ingresa tu nombre.';
    if (!/^\S+@\S+\.\S+$/.test(datos.correo.trim())) errores.correo = 'Ingresa un correo válido.';
    if (!datos.direccion.trim()) errores.direccion = 'Ingresa una dirección.';
    if (!datos.region) errores.region = 'Selecciona una región.';
    return errores;
}

export function productoValido(producto) {
    return Boolean(
        producto.nombre.trim() &&
        producto.categoria.trim() &&
        Number.isFinite(Number(producto.precio)) &&
        Number(producto.precio) > 0 &&
        producto.stock !== '' &&
        Number.isInteger(Number(producto.stock)) &&
        Number(producto.stock) >= 0 &&
        Number.isFinite(Number(producto.descuento ?? 0)) &&
        Number(producto.descuento ?? 0) >= 0 &&
        Number(producto.descuento ?? 0) <= 100,
    );
}

export function validarRegistro(datos) {
    if (!datos.nombre.trim() || !datos.correo.trim() || !datos.password || !datos.confirmPassword) {
        return 'Por favor, completa todos los campos.';
    }
    if (!/^\S+@\S+\.\S+$/.test(datos.correo.trim())) return 'Ingresa un correo válido.';
    if (datos.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    if (datos.password !== datos.confirmPassword) return 'Las contraseñas no coinciden.';
    return '';
}
