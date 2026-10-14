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
    configurarFiltros,
    ocultarReintentar,
    reintentarMain
} from './render.js'

const CARGANDO_MENSAJE = "Cargando..." 
const CARGADO_MENSAJE = "Cargado correctamente" 

// coordinar aplicacion
async function main() {
    ocultarReintentar(true)
    mostrarEstado(CARGANDO_MENSAJE, true)

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

        mostrarEstado(CARGADO_MENSAJE)
    } catch (error) {
        ocultarReintentar(false)
        mostrarEstado(error.message)
    }
}

// activar reiniciar una sola vez
reintentarMain(main)

main()
