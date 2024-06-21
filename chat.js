document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    let faq = [];

    // Cargar preguntas y respuestas desde el archivo JSON
    fetch('faq.json')
        .then(response => response.json())
        .then(data => {
            faq = data;
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    // Variable para almacenar el timeout del mensaje de "Escribiendo..."
    let writingMessageTimeout;

    // Función para enviar mensaje del usuario y recibir respuesta
    function sendMessage(message) {
        // Mostrar mensaje de "Escribiendo..."
        showWritingMessage();

        // Simular respuesta después de un breve tiempo (en una implementación real, sería una respuesta real o desde el servidor)
        setTimeout(() => {
            // Eliminar el mensaje de "Escribiendo..." antes de mostrar la respuesta
            hideWritingMessage();
            const answer = findAnswer(message);
            if (answer === '') {
                showHelpMenu();
            } else {
                appendMessage(answer, 'received'); // Mostrar la respuesta recibida
            }
        }, 1000); // Ejemplo de tiempo de espera
    }

    // Función para buscar la respuesta a una pregunta en el array faq
    function findAnswer(question) {
        const lowerQuestion = question.toLowerCase();
        const faqEntry = faq.find(entry => {
            // Convertir la pregunta almacenada y la pregunta del usuario a minúsculas para una comparación sin distinción de mayúsculas y minúsculas
            const lowerStoredQuestion = entry.question.toLowerCase();
            // Verificar si la pregunta almacenada incluye alguna palabra clave de la pregunta del usuario
            return lowerStoredQuestion.split(' ').some(word => lowerQuestion.includes(word));
        });
        return faqEntry ? faqEntry.answer : '';
    }

    // Función para agregar mensajes al chat
    function appendMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type === 'sent' ? 'sent' : 'received');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo automáticamente
    }

    // Función para mostrar el mensaje de "Escribiendo..."
    function showWritingMessage() {
        writingMessageTimeout = setTimeout(() => {
            const writingMessage = document.createElement('div');
            writingMessage.classList.add('message', 'received', 'writing');
            writingMessage.textContent = 'Escribiendo...';
            chatBox.appendChild(writingMessage);
            chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo automáticamente
        }, 500); // Mostrar "Escribiendo..." después de medio segundo
    }

    // Función para ocultar el mensaje de "Escribiendo..."
    function hideWritingMessage() {
        if (writingMessageTimeout) {
            clearTimeout(writingMessageTimeout);
            writingMessageTimeout = null;
            const writingMessage = chatBox.querySelector('.message.received.writing');
            if (writingMessage) {
                chatBox.removeChild(writingMessage);
            }
        }
    }

    // Mostrar un menú de ayuda cuando no se encuentra una respuesta adecuada
	function showHelpMenu() {
		const helpMessage = 'Lo siento, no tengo información sobre eso. ¿Cómo puedo ayudarte?';
		appendMessage(helpMessage, 'received');

    // Mostrar un menú de ayuda con opciones interactivas
		const helpMenu = document.createElement('div');
		helpMenu.classList.add('help-menu');

    // Mostrar botones dinámicos según categorías
		const categories = [
			{ name: 'Información General', buttons: ['Horario de Atención', 'Contactar Soporte', 'Métodos de Pago'], className: 'category-info-general' },
			{ name: 'Videos', buttons: ['Ver Videos en YouTube', 'Ver Videos en Facebook'], className: 'category-videos' },
			{ name: 'Quiz', buttons: ['Iniciar Quiz'], className: 'category-quiz' },
			{ name: 'Chistes', buttons: ['Contables'], className: 'category-jokes' }
		];

		categories.forEach(category => {
			const categoryWrapper = document.createElement('div');
			categoryWrapper.classList.add(category.className);

			const categoryTitle = document.createElement('div');
			categoryTitle.textContent = category.name;
			categoryTitle.classList.add('category-title');
			categoryWrapper.appendChild(categoryTitle);

			category.buttons.forEach(buttonText => {
				const button = createButton(buttonText);
				button.addEventListener('click', function() {
					handleButtonClick(buttonText);
				});
				categoryWrapper.appendChild(button);
			});

			helpMenu.appendChild(categoryWrapper);
		});

		chatBox.appendChild(helpMenu);
		chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo automáticamente
	}


    // Función para crear botones interactivos
    function createButton(text) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('help-menu-btn');
        return button;
    }

    // Función para manejar el clic en un botón del menú de ayuda
    function handleButtonClick(buttonText) {
        let response = '';
        switch (buttonText) {
            case 'Horario de Atención':
                response = 'Nuestro horario de atención es de lunes a viernes de 9am a 6pm.';
                break;
            case 'Contactar Soporte':
                response = 'Puedes contactar a nuestro soporte técnico al correo soporte@ejemplo.com.';
                break;
            case 'Métodos de Pago':
                response = 'Aceptamos pagos con tarjeta de crédito, transferencia bancaria y PayPal.';
                break;
            case 'Ver Videos en YouTube':
                response = 'Aquí tienes el enlace a nuestro canal de YouTube...'; // Aquí colocarías el enlace real
                break;
            case 'Ver Videos en Facebook':
                response = 'Puedes ver nuestros videos en Facebook aquí...'; // Aquí colocarías el enlace real
                break;
            case 'Iniciar Quiz':
                response = '¡Vamos a comenzar el quiz!'; // Lógica para iniciar el quiz
                break;
            case 'Contables':
                response = '¿Por qué los contadores no llevan paraguas? Porque prefieren llevar libros mayores.'; // Chiste contable
                break;
            default:
                response = 'Lo siento, no tengo información sobre eso. ¿Cómo más puedo ayudarte?';
        }
        appendMessage(response, 'received');
    }

    // Evento para enviar mensaje al hacer clic en el botón de enviar
    sendBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage(message, 'sent'); // Mostrar el mensaje enviado por el usuario
            sendMessage(message); // Enviar el mensaje para obtener una respuesta
            userInput.value = ''; // Limpiar el campo de entrada
        }
    });

    // Evento para enviar mensaje al presionar Enter en el campo de entrada
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendBtn.click(); // Simular clic en el botón de enviar
        }
    });

    // Mensaje de bienvenida inicial
    appendMessage('¡Hola! Soy FabianBot, tu Asistente Virtual. Bienvenido al chat bot promocionado por Data Count AI y desarrollado por Fabian Sagua. Mi propósito es guiarte en el fascinante mundo de la ciencia de datos y contabilidad para el sector público en Perú.', 'received');
    appendMessage('No almacenamos tus datos ni se genera una copia de los chats que tienes conmigo, garantizando así tu privacidad. Espero poder proporcionarte información útil y resolver tus consultas.', 'received');
    appendMessage('Por favor, selecciona una opción del menú o escribe tu pregunta para comenzar.', 'received');
});
