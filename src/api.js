const BASE_URL = "https://api.nasa.gov/neo/rest/v1/feed"

// obtener key desde .env.local o usar DEMO_KEY
const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY"

// funcion asincrona, obtener asteroides entre dos fechas
export async function obtenerAsteroides(inicio, fin) {
    
    // URLSearchParams, construir parametros
    const parametros = new URLSearchParams({
        start_date: inicio,
        end_date: fin,
        api_key: API_KEY
    })
    
    // realizar peticion http
    const respuesta = await fetch(`${BASE_URL}?${parametros}`)

    // si respuesta no correcta, lanzar error
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`)

    // devolver json convertido en objeto js
    return await respuesta.json()
}
