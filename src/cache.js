export function guardarCache(key, value) {
    // convertir objeto js en string json
    localStorage.setItem(key, JSON.stringify(value))
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
