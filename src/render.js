// numero de decimales diametro 
const DIAMETRO_DECIMALES = 3

// mostrar estado
export function mostrarEstado(mensaje) {
    const estado = document.querySelector("#estado")
    estado.textContent = mensaje
}

// mostrar informacion semanal
export function mostrarInformacion(asteroides, distanciaMinima) {
    const numero = document.querySelector("#numero")
    const distancia = document.querySelector("#distancia")

    // numero de asteroides
    numero.textContent = asteroides.length

    // distancia minima
    distancia.textContent = formatear(distanciaMinima, "km")
}

// formatear valores y unidades
function formatear(valor, unidad, decimales = 0) {
    return Number.isFinite(valor)
        ? `${valor.toFixed(decimales)} ${unidad}`
        : "Sin datos" 
}

// mostar asteroides
export function mostrarAsteroides(asteroides) {
    const logica = document.querySelector("#logica")

    // limpiar logica
    logica.textContent = ""

    if (asteroides.length === 0) {
        logica.textContent = "Sin datos"
        return
    }

    const items = asteroides.map(asteroide => crearAsteroide(asteroide))

    // añadir al contenedor
    logica.append(...items)
}

// crear asteroide html
function crearAsteroide(asteroide) {
    const item = document.createElement("div")
    item.classList.add("asteroide")
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

    // asignar clase según peligrosidad    
    peligroso.classList.add(asteroide.peligroso ? "peligroso" : "seguro")

    item.append(nombre, distancia, velocidad, diametro, peligroso)

    return item
}
