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
    limpiarAsteroides,
    configurarFiltros,
    ocultarReintentar,
    reintentarMain
} from './render.js'

const CARGANDO_MENSAJE = "Cargando..." 
const CARGADO_MENSAJE = "Cargado correctamente" 
let cargando = false

// coordinar aplicacion
async function main() {
    // evitar cargas simultaneas
    if (cargando) return

    cargando = true

    mostrarEstado(CARGANDO_MENSAJE, cargando)

    ocultarReintentar(true)

    limpiarAsteroides()

    // desactivar filtros anteriores 
    configurarFiltros(null)

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
    } finally {
        cargando = false 
    }
}

// activar reiniciar una sola vez
reintentarMain(main)

main()
