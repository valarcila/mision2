// numero de decimales diametro 
const DIAMETRO_DECIMALES = 3

const reintentar = document.querySelector("#reintentar")
const logica = document.querySelector("#logica")
let filtros
const botones = document.querySelectorAll(".filtros button")

export function ocultarReintentar(oculto = true) {
    reintentar.classList.toggle("oculto", oculto)
}

export function reintentarMain(event) {
    reintentar.addEventListener("click", event)
} 

// mostrar estado
export function mostrarEstado(mensaje, cargando = false) {
    const estado = document.querySelector("#estado")
    estado.textContent = mensaje

    // activar animacion si esta cargando
    estado.classList.toggle("cargando", cargando)
}

// mostrar informacion semanal
export function mostrarInformacion(asteroides, distanciaMinima) {
    const numero = document.querySelector("#numero")
    const distancia = document.querySelector("#distancia")

    // numero de asteroides
    numero.textContent = asteroides.length

    // distancia minima
    distancia.textContent = formatearNumero(distanciaMinima, "km")
}

// formatear valores y unidades
function formatearNumero(valor, unidad, decimales = 0) {
    return Number.isFinite(valor)
        ? `${valor.toFixed(decimales)} ${unidad}`
        : "Sin datos" 
}

// mostar asteroides
export function mostrarAsteroides(asteroides) {
    limpiarAsteroides()

    if (asteroides.length === 0) {
        logica.textContent = "Sin datos"
        return
    }

    const items = asteroides.map(asteroide => crearAsteroide(asteroide))

    // añadir a items
    logica.append(...items)
}

export function limpiarAsteroides() {
    // limpiar logica
    logica.textContent = ""
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
    distancia.textContent = `Distancia: ${formatearNumero(asteroide.distancia, "km")}`
    velocidad.textContent = `Velocidad: ${formatearNumero(asteroide.velocidad, "km/h")}`
    diametro.textContent = `Diámetro: ${formatearNumero(asteroide.diametro, "km", DIAMETRO_DECIMALES)}`
    peligroso.textContent = asteroide.peligroso
        ? "Potencialmente peligroso"
        : "No peligroso"

    // asignar clase según peligrosidad    
    peligroso.classList.add(asteroide.peligroso ? "peligroso" : "seguro")

    item.append(nombre, distancia, velocidad, diametro, peligroso)

    return item
}

// actualizar diccionario filters
export function configurarFiltros(filters) {
    filtros = filters
}

// registrar event una sola vez
document.querySelector(".filtros").addEventListener("click", event => {
    const boton = event.target.id

    if (filtros?.[boton]) {
        // mostrar asteroides del filtro seleccionado
        mostrarAsteroides(filtros[boton])

        // activar boton seleccionado y desactivar los demas
        botones.forEach(b => {
            b.classList.toggle("activo", b.id === boton)
        })
    }    
})    
