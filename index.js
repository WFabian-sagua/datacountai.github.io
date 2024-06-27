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

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("subscribe-form");
    const validationMessage = document.getElementById("validation-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío automático del formulario
        
        var formData = new FormData(form);
        
        fetch('https://script.google.com/macros/s/AKfycbyKGqkrQKq0HyVdekNIntM6Ql0R2dsR7RUoQA13-NKs_foCdHiRYfeOA-nC-jJFBF95wA/exec', {
            method: 'POST',
            body: new URLSearchParams(formData) // Convertir FormData a URLSearchParams
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                showMessage('Formulario enviado correctamente', 'success');
                form.reset(); // Limpiar el formulario después del envío exitoso
            } else {
                showMessage('Error al enviar el formulario', 'error');
            }
        })
        .catch(error => showMessage('Error en la solicitud: ' + error, 'error'));
    });

    function showMessage(message, type) {
        validationMessage.textContent = message;
        validationMessage.classList.add('show');
        setTimeout(() => {
            validationMessage.classList.add('hide');
            setTimeout(() => {
                validationMessage.classList.remove('show', 'hide');
            }, 500); // Match this duration with the CSS transition duration
        }, 3000); // Message display duration
    }
});
