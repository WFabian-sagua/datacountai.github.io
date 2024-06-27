// Mostrar el anuncio de novedades al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const novedadesElement = document.getElementById('novedades');
    novedadesElement.classList.add('show');
  
    // Agregar clase al cuerpo para ajustar el margen superior
    document.body.classList.add('show-novedades');
  
    // Ocultar el anuncio después de 5 segundos
    setTimeout(function() {
        novedadesElement.classList.remove('show');
      
        // Remover clase del cuerpo para restaurar el margen superior
        document.body.classList.remove('show-novedades');
    }, 5000); // Mostrar el anuncio durante 5 segundos
});

// Cambiar dinámicamente el texto en el banner cada 5 segundos
document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("dynamic-text");
    const texts = [
         "Transforma tus datos<br>en decisiones inteligentes",
	 "Innovación que impulsa tu futuro",
         "Descubre el poder<br>de la ciencia de datos",
         "Optimiza tus recursos<br>con nuestra tecnología",
         "Tu aliado en la era digital",
         "Soluciones que<br>impulsan el progreso",
         "Conéctate al futuro con nosotros"
    ];
    let index = 0;

    function changeText() {
        textElement.classList.remove("fade-in");
        setTimeout(() => {
            textElement.innerHTML = texts[index];
            index = (index + 1) % texts.length;
            textElement.classList.add("fade-in");
        }, 500); // Time to fade out the text
    }

    setInterval(changeText, 5000); // Change text every 5 seconds
    changeText(); // Initial call to set the first text
});
