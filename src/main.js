import './style.css'
import { obtenerAsteroides } from './api.js'
import { 
    aplanarAsteroides, 
    transformarAsteroides,
    filtrarPeligrosos,
    filtrarRapidos,
    calcularDistanciaMinima
} from './logic.js'
import {
    mostrarEstado,
    mostrarInformacion,
    mostrarAsteroides
} from './render.js'

// obtener fecha actual
const fechaFin = new Date()
const fechaInicio = new Date(fechaFin)

fechaInicio.setDate(fechaFin.getDate() - 6)

// convertir fecha al formato yyyy-mm-dd
const fin = fechaFin.toISOString().split("T")[0]
const inicio = fechaInicio.toISOString().split("T")[0]

async function main() {
    mostrarEstado("Cargando...")

    try {
        // obtener datos nasa
        const asteroides = await obtenerAsteroides(inicio, fin)

        // json por consola
        // console.log(asteroides)

        const aplanado = aplanarAsteroides(asteroides)

        const transformado = transformarAsteroides(aplanado)
        const distanciaMinima = calcularDistanciaMinima(transformado)

        mostrarInformacion(transformado, distanciaMinima)

        mostrarEstado("Cargado correctamente")

        // console.log(transformado)

        // filtrar
        const peligrosos = filtrarPeligrosos(transformado)
        const rapidos = filtrarRapidos(transformado)

        mostrarAsteroides(transformado)


        // console.log("peligrosos: ", peligrosos)
        // console.log("rapidos: ", rapidos)
        // console.log("distancia minima: ", distanciaMinima)
    } catch (error) {
        // console.error(error.message)
        mostrarEstado(error.message)
    }
}

main()
