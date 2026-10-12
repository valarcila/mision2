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
const FECHA_FIN = new Date()
const FECHA_INICIO = new Date(FECHA_FIN)

// intervalo de una semana
FECHA_INICIO.setDate(FECHA_FIN.getDate() - 6)

// formatear yyyy-mm-dd
const FIN = FECHA_FIN.toISOString().split("T")[0]
const INICIO = FECHA_INICIO.toISOString().split("T")[0]

// coordinar aplicacion
async function main() {
    mostrarEstado("Cargando...")

    try {
        // obtener datos nasa
        const asteroides = await obtenerAsteroides(INICIO, FIN)

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
        // mostrarAsteroides(transformado)

        configurarFiltros(filtros)

        mostrarEstado("Cargado correctamente")
    } catch (error) {
        // console.error(error.message)
        mostrarEstado(`Error: ${error.message}`)
    }
}

function configurarFiltros(filtros) {
    const botones = document.querySelectorAll(".filtros button")

    document.querySelector(".filtros").addEventListener("click", event => {
        const boton = event.target.id

        if (filtros[boton]) {
            // mostrar asteroides del filtro seleccionado
            mostrarAsteroides(filtros[boton])

            // activar boton seleccionado y desactivar los demas
            botones.forEach(b => {
                b.classList.toggle("activo", b.id === boton)
            })
        }    
    })    
}

main()
