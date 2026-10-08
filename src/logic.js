const umbral = 70000

// aplanar arrays por fecha
export function aplanarAsteroides(asteroides) {
    // Object.values(), obtener arrays fecha
    // flat, unir arrays en uno solo
    return Object.values(asteroides?.near_earth_objects ?? {}).flat()
}

// crear array de objetos con propiedades tipo clave valor
export function transformarAsteroides(asteroides) {
    return asteroides.map(asteroide => ({
        // distancia a tierra km
        distancia: Number(asteroide.close_approach_data?.[0]?.miss_distance?.kilometers ?? NaN),
        // velocidad km/h
        velocidad: Number(asteroide.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour ?? NaN),
        // diametro maximo km
        diametro: asteroide.estimated_diameter?.kilometers?.estimated_diameter_max ?? null,
        id: asteroide.id,
        peligroso: asteroide.is_potentially_hazardous_asteroid,
        nombre: asteroide.name
    }))
}

export function filtrarPeligrosos(asteroides) {
    return asteroides.filter(asteroide => asteroide.peligroso)
}

// filtrar asteroides con velocidad superior al umbral 
export function filtrarRapidos(asteroides) {
    return asteroides.filter(asteroide => asteroide.velocidad > umbral)
}

// calcular distancia minima a tierra
export function calcularDistanciaMinima(asteroides) {
    // descartar NaN
    const validos = asteroides.filter(asteroide => Number.isFinite(asteroide.distancia))

    if (validos.length === 0) return null

    // comparar distancias y conservar menor
    return validos.reduce((minimo, asteroide) => Math.min(minimo, asteroide.distancia), Infinity)
}