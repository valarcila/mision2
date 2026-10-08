import './style.css'
import { obtenerAsteroides } from './api.js'

async function main() {
    try {
        
        // obtener datos nasa
        const asteroides = await obtenerAsteroides("2026-10-01", "2026-10-07")

        // json por consola
        console.log(asteroides)
    } catch (error) {
        console.error(error.message)
    }
}

main()