import './style.css'
import { obtenerAsteroides } from './api.js'
import { 
    obtenerFechas,
    aplanarAsteroides, 
    transformarAsteroides,
    filtrarPeligrosos,
    filtrarRapidos,
    calcularDistanciaMinima
} from './logic.js'
import {
    mostrarEstado,
    mostrarInformacion,
    mostrarAsteroides,
    configurarFiltros
} from './render.js'

// coordinar aplicacion
async function main() {
    mostrarEstado("Cargando...")

    // desestructurar objeto
    const { inicio, fin } = obtenerFechas()

    try {
        // obtener datos nasa
        const asteroides = await obtenerAsteroides(inicio, fin)

        // transformar datos
        const aplanado = aplanarAsteroides(asteroides)
        const transformado = transformarAsteroides(aplanado)

        // calcular distancia minima
        const distanciaMinima = calcularDistanciaMinima(transformado)

        // mostrar informacion semanal
        mostrarInformacion(transformado, distanciaMinima)

        // filtrar asteroides        
        const filtros = {
            todos: transformado,
            peligrosos: filtrarPeligrosos(transformado),
            rapidos: filtrarRapidos(transformado)
        }

        // mostrar inicialmente todos
        mostrarAsteroides(transformado)

        configurarFiltros(filtros)

        mostrarEstado("Cargado correctamente")
    } catch (error) {
        // console.error(error.message)
        mostrarEstado(`Error: ${error.message}`)
    }
}

main()
