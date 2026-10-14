# Misión 2
La idea es una aplicación que consulta la API NeoWs de la NASA para mostrar los asteroides que se han acercado a la tierra la última semana.

## Cómo probarlo
Al abrir la aplicación aparecerá el número total de asteroides y la distancia mínima registrada y se mostrarán todos los asteroides que se han acercado a la tierra ordenados de menor a mayor distancia. 

Se puede pulsar "Todos", "Peligrosos" o "Rápidos" para filtrar los asteroides. El filtro de rápidos muestra aquellos que superan los 70000 km/h.

Los datos se guardan en `localStorage`. Al recargar la página se recuperan datos de la caché si ya estaban guardados para esas fechas. 

## Uso de IA
Utilicé claude para resolver dudas sobre cómo aplicar lo requerido.   

Prompt 1. "diferencia entre respuesta.json(), JSON.stringify() y JSON.parse()"

Con el ejemplo de la teoría no me quedó muy claro por qué se usaban estos métodos. `respuesta.json()` obtiene los datos como objeto de js, mientras que `JSON.stringify()` y `JSON.parse()` permiten convertirlos a string y recuperarlos (`localStorage` solo guarda strings).

Prompt 2. "configurarFiltros añade un listener cada vez que se llama (ahora solo se llama una vez, pero no es idempotente)"

Copié una de las correcciones de webi porque no entendía qué significaba. Había creado una función que registraba un nuevo listener cada vez que se ejecutaba, por lo que podían acumularse varios. Saqué `addEventListener()` fuera de la función y utilicé `filtros` para actualizar los datos.

Comprobé los cambios en el navegador y los posibles errores que podían surgir.

## Autopsia
Decisión 1. Utilizar API key de la NASA.

Por defecto se usa DEMO_KEY para acceder a la API, pero como tiene un límite de peticiones, creé una API key para desarrollar. La guardé en `.env.local` como `VITE_NASA_API_KEY` para no incluirla directamente en el código.

Decisión 2. Formatear fecha sin usar toISOString().

Como `toISOString()` utiliza UTC (Coordinated Universal Time), podría devolver una fecha diferente a la local por la diferencia horaria.   

Decisión 3. Guardar la respuesta de la NASA en la caché.

Al implementar la caché consideré guardar los datos de la NASA o los asteroides ya transformados. Sin embargo, me pareció más útil almacenar los datos de la API por si en el futuro cambian las transformaciones.
