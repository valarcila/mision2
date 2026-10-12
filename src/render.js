const DIAMETRO_DECIMALES = 3

export function mostrarEstado(mensaje) {
    const estado = document.querySelector("#estado")
    estado.textContent = mensaje
}

export function mostrarInformacion(asteroides, distanciaMinima) {
    const numero = document.querySelector("#numero")
    const distancia = document.querySelector("#distancia")

    numero.textContent = asteroides.length

    distancia.textContent = formatear(distanciaMinima, "km")
}

function formatear(valor, unidad, decimales = 0) {
    return Number.isFinite(valor)
        ? `${valor.toFixed(decimales)} ${unidad}`
        : "Sin datos" 
}

export function mostrarAsteroides(asteroides) {
    const logica = document.querySelector("#logica")

    logica.textContent = ""

    if(asteroides.length === 0) {
        logica.textContent = "Sin datos"
        return
    }

    const items = asteroides.map(asteroide => crearAsteroide(asteroide))

    logica.append(...items)
}

function crearAsteroide(asteroide) {
    const item = document.createElement("div")
    const nombre = document.createElement("h3")
    const distancia = document.createElement("p")
    const velocidad = document.createElement("p")
    const diametro = document.createElement("p")
    const peligroso = document.createElement("p")

    nombre.textContent = asteroide.nombre
    distancia.textContent = `Distancia: ${formatear(asteroide.distancia, "km")}`
    velocidad.textContent = `Velocidad: ${formatear(asteroide.velocidad, "km/h")}`
    diametro.textContent = `Diámetro: ${formatear(asteroide.diametro, "km", DIAMETRO_DECIMALES)}`
    peligroso.textContent = asteroide.peligroso
        ? "Potencialmente peligroso"
        : "No peligroso"

    item.append(nombre, distancia, velocidad, diametro, peligroso)

    return item
}
