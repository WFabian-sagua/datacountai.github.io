// Simulación de la animación de escritura en la consola
const outputElement = document.querySelector('.console .output span');
const outputText = [
    "<span class='keyword'>import</span> <span class='variable'>pandas</span> <span class='keyword'>as</span> <span class='variable'>pd</span>\n",
    "<span class='keyword'>import</span> <span class='variable'>duckdb</span>\n",
    "<span class='keyword'>import</span> <span class='variable'>plotly.express</span> <span class='keyword'>as</span> <span class='variable'>px</span>\n",
    "<span class='keyword'>from</span> <span class='variable'>dbfread</span> <span class='keyword'>import</span> <span class='variable'>DBF</span>\n",
    "\n",
    "<span class='comment'># Extrayendo datos de DBF</span>\n",
    "<span class='variable'>data</span> = <span class='variable'>DBF</span>(<span class='string'>'data.dbf'</span>)\n",
    "<span class='function'>print</span>(<span class='string'>'Extrayendo datos de DBF...'</span>)\n",
    "\n",
    "<span class='comment'># Manipulando datos con Pandas</span>\n",
    "<span class='variable'>data</span> = <span class='variable'>pd</span>.<span class='function'>DataFrame</span>(<span class='variable'>data</span>)\n",
    "<span class='variable'>data</span>[<span class='string'>'new_column'</span>] = <span class='variable'>data</span>[<span class='string'>'existing_column'</span>] * <span class='number'>2</span>\n",
    "<span class='function'>print</span>(<span class='string'>'Manipulando datos con Pandas...'</span>)\n",
    "\n",
    "<span class='comment'># Almacenando en DuckDB</span>\n",
    "<span class='variable'>con</span> = <span class='variable'>duckdb</span>.<span class='function'>connect</span>(<span class='string'>'database=':memory:'</span>)\n",
    "<span class='variable'>con</span>.<span class='function'>execute</span>(<span class='string'>'CREATE TABLE data AS SELECT * FROM data'</span>)\n",
    "<span class='function'>print</span>(<span class='string'>'Almacenando en DuckDB...'</span>)\n",
    "\n",
    "<span class='comment'># Generando visualización con Plotly</span>\n",
    "<span class='variable'>fig</span> = <span class='variable'>px</span>.<span class='function'>bar</span>(<span class='variable'>data</span>, <span class='variable'>x</span>=<span class='string'>'category'</span>, <span class='variable'>y</span>=<span class='string'>'value'</span>)\n",
    "<span class='variable'>fig</span>.<span class='function'>show</span>()\n",
    "<span class='function'>print</span>(<span class='string'>'Generando visualización con Plotly...'</span>)\n",
    "\n",
    "<span class='function'>print</span>(<span class='string'>'Proceso completado.'</span>)\n"
];

function typeWriter() {
    let index = 0;
    let output = '';
    let isHTMLTag = false;

    function type() {
        if (index < outputText.join('').length) {
            let char = outputText.join('').charAt(index);

            if (char === '<') {
                isHTMLTag = true;
            }

            if (isHTMLTag) {
                output += char;
            } else {
                output += char;
                outputElement.innerHTML = output; // Usar innerHTML para reconocer las etiquetas HTML
            }

            if (char === '>') {
                isHTMLTag = false;
                outputElement.innerHTML = output; // Actualizar después de completar una etiqueta
            }

            index++;
            setTimeout(type, isHTMLTag ? 0 : 10); // Aumentar la velocidad de escritura
        }
    }

    type(); // Inicia la animación
}

// Inicia la animación al cargar la página
window.addEventListener('load', () => {
    typeWriter();
});

// Obtener todos los elementos <li> dentro de la lista
const items = document.querySelectorAll('.vertical-list li');

// Función para activar el efecto de desplazamiento
function showItemsWithSlideEffect() {
    items.forEach((item, index) => {
        // Agregar una pequeña demora escalonada para cada elemento
        setTimeout(() => {
            item.style.opacity = '1'; // Hace visible el elemento
            item.style.transform = 'translateX(0)'; // Lo desplaza a su posición original
        }, index * 400); // Ajusta el valor de la demora según sea necesario
    });
}

// Llamar a la función cuando se cargue completamente el contenido de la página
document.addEventListener('DOMContentLoaded', showItemsWithSlideEffect);
