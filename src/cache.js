export function guardarCache(key, value) {
    try {
        // convertir objeto js en string json
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        // avisar por la consola
        console.warn(`No se han podido guardar los datos en caché: ${error}`)
    }
}

export function consultarCache(key) {
    try {
        // obtener datos guardados
        const data = localStorage.getItem(key)

        if (data === null) return null

        // convertir string json en objeto js
        return JSON.parse(data)          
    } catch (error) {
        // eliminar datos corruptos
        localStorage.removeItem(key)
        return null
    }
}
