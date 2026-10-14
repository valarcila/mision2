import {
    guardarCache,
    consultarCache
} from './cache.js' 

const BASE_URL = "https://api.nasa.gov/neo/rest/v1/feed"

// obtener key desde .env.local o usar DEMO_KEY
const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY"

// funcion asincrona, obtener asteroides entre dos fechas
export async function obtenerAsteroides(inicio, fin) {
    // crear key segun fechas
    const key = `asteroides-${inicio}-${fin}`
    let respuesta 

    // consultar cache
    const consulta = consultarCache(key)
    
    if (consulta !== null) return consulta

    // URLSearchParams, construir parametros
    const parametros = new URLSearchParams({
        start_date: inicio,
        end_date: fin,
        api_key: API_KEY
    })

    // intentar conectar con la api
    try {
        respuesta = await fetch(`${BASE_URL}?${parametros}`)
    } catch (error) {
        throw new Error("No se ha podido conectar con la NASA")
    }

    // limite de peticiones
    if (respuesta.status === 429) throw new Error("Se ha superado el límite de peticiones")

    // otros errores http
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`)

    let value 

    // intentar devolver json convertido en objeto js
    try {
        value = await respuesta.json()
    } catch (error) {
        throw new Error("No se han podido parsear los datos de la NASA")
    }

    // guardar cache   
    guardarCache(key, value)

    return value
}
