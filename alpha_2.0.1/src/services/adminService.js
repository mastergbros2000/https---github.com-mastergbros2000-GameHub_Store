import { leerJSON, guardarJSON } from './storageService.js';

export function leerColeccion(clave) {
    const datos = leerJSON(clave, []);
    return Array.isArray(datos) ? datos : [];
}

export function guardarPerfil(perfil) {
    const usuarios = leerColeccion('gamehub_usuarios_ev2');
    const existente = usuarios.find((item) => item.correo === perfil.correo);
    const registro = {
        ...perfil,
        id: existente?.id || Date.now(),
        rol: existente?.rol || 'Cliente',
    };
    const nuevos = existente
        ? usuarios.map((item) => (item.id === registro.id ? registro : item))
        : [...usuarios, registro];
    return guardarJSON('gamehub_perfil_ev2', perfil) && guardarJSON('gamehub_usuarios_ev2', nuevos);
}

export function registrarOrden(orden) {
    return guardarJSON('gamehub_ordenes_ev2', [...leerColeccion('gamehub_ordenes_ev2'), orden]);
}
