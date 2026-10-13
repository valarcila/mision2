// velocidad minima para considerar rápido un asteroide, km/h 
const UMBRAL_VELOCIDAD = 70000

// obtener intervalo de fechas
export function obtenerFechas() {
    // obtener fecha actual
    const fechaFin = new Date()
    const fechaInicio = new Date(fechaFin)

    fechaInicio.setDate(fechaFin.getDate() - 6)

    // formatear yyyy-mm-dd
    const fin = fechaFin.toISOString().split("T")[0]
    const inicio = fechaInicio.toISOString().split("T")[0]

    return {inicio, fin}
}

// aplanar arrays por fecha
export function aplanarAsteroides(asteroides) {
    // Object.values(), obtener arrays fecha
    // flat, unir arrays en uno solo
    return Object.values(asteroides?.near_earth_objects ?? {}).flat()
}

// crear array de objetos con propiedades tipo clave valor
export function transformarAsteroides(asteroides) {
    return asteroides.map(asteroide => ({
        // distancia a tierra, km
        distancia: Number(asteroide.close_approach_data?.[0]?.miss_distance?.kilometers ?? NaN),
        // velocidad, km/h
        velocidad: Number(asteroide.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour ?? NaN),
        // diametro maximo, km
        diametro: asteroide.estimated_diameter?.kilometers?.estimated_diameter_max ?? null,
        id: asteroide.id,
        peligroso: asteroide.is_potentially_hazardous_asteroid,
        nombre: asteroide.name
    }))
}

// calcular distancia minima a tierra
export function calcularDistanciaMinima(asteroides) {
    // descartar NaN
    const validos = asteroides.filter(asteroide => Number.isFinite(asteroide.distancia))

    if (validos.length === 0) return null

    // comparar distancias y conservar menor
    // return Math.min(...validos.map(asteroide => asteroide.distancia))
    return validos.reduce((minimo, asteroide) => Math.min(minimo, asteroide.distancia), Infinity)   
}

// filtrar asteroides peligrosos
export function filtrarPeligrosos(asteroides) {
    return asteroides.filter(asteroide => asteroide.peligroso)
}

// filtrar asteroides con velocidad superior al umbral de velocidad
export function filtrarRapidos(asteroides) {
    return asteroides.filter(asteroide => asteroide.velocidad > UMBRAL_VELOCIDAD)
}
