// Una lectura dañada no debe dejar toda la aplicación en blanco.
export function leerJSON(clave, respaldo) {
    try {
        const texto = localStorage.getItem(clave);
        return texto === null ? respaldo : JSON.parse(texto);
    } catch {
        return respaldo;
    }
}

export function guardarJSON(clave, valor) {
    try {
        localStorage.setItem(clave, JSON.stringify(valor));
        return true;
    } catch {
        return false;
    }
}
