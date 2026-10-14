import './style.css'

import { obtenerAsteroides } from './api.js'

import { 
    obtenerFechas,
    aplanarAsteroides, 
    transformarAsteroides,
    ordenarAsteroides,
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

        const ordenado = ordenarAsteroides(transformado) 

        // calcular distancia minima
        const distanciaMinima = calcularDistanciaMinima(ordenado)

        // mostrar informacion semanal
        mostrarInformacion(ordenado, distanciaMinima)

        // filtrar asteroides        
        const filtros = {
            todos: ordenado,
            peligrosos: filtrarPeligrosos(ordenado),
            rapidos: filtrarRapidos(ordenado)
        }

        // mostrar inicialmente todos
        mostrarAsteroides(ordenado)

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
