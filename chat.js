document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Ejemplo de preguntas y respuestas (pueden venir de una base de datos o archivo JSON)
    const faq = [
        { question: '¿Cuál es el horario de atención?', answer: 'Nuestro horario de atención es de lunes a viernes de 9am a 6pm.' },
        { question: '¿Cómo puedo contactar soporte?', answer: 'Puedes contactar a nuestro soporte técnico al correo soporte@ejemplo.com.' },
        { question: '¿Cuáles son los métodos de pago aceptados?', answer: 'Aceptamos pagos con tarjeta de crédito, transferencia bancaria y PayPal.' }
    ];

    // Categorías y botones dinámicos
    const categories = [
        { name: 'Información General', buttons: ['Horario de Atención', 'Contactar Soporte', 'Métodos de Pago'] },
        { name: 'Videos', buttons: ['Ver Videos en YouTube', 'Ver Videos en Facebook'] },
        { name: 'Quiz', buttons: ['Iniciar Quiz'] },
        { name: 'Chistes', buttons: ['Contables'] }
    ];

    // Función para enviar mensaje del usuario y recibir respuesta
    function sendMessage(message) {
        appendMessage(message, 'sent');
        
        // Simular respuesta después de un breve tiempo (en una implementación real, sería una respuesta real o desde el servidor)
        setTimeout(() => {
            const answer = findAnswer(message);
            if (answer === '') {
                showHelpMenu();
            } else {
                appendMessage(answer, 'received');
            }
        }, 500); // Ejemplo de tiempo de espera
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

    // Mostrar un menú de ayuda cuando no se encuentra una respuesta adecuada
    function showHelpMenu() {
        const helpMessage = 'Lo siento, no tengo información sobre eso. ¿Cómo puedo ayudarte?';
        appendMessage(helpMessage, 'received');

        // Mostrar un menú de ayuda con opciones interactivas
        const helpMenu = document.createElement('div');
        helpMenu.classList.add('help-menu');

        // Mostrar botones dinámicos según categorías
        categories.forEach(category => {
            const categoryTitle = document.createElement('div');
            categoryTitle.textContent = category.name;
            categoryTitle.classList.add('category-title');
            helpMenu.appendChild(categoryTitle);

            category.buttons.forEach(buttonText => {
                const button = createButton(buttonText);
                button.addEventListener('click', function() {
                    handleButtonClick(buttonText);
                });
                helpMenu.appendChild(button);
            });
        });

        chatBox.appendChild(helpMenu);
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo automáticamente
    }

    // Función para crear botones interactivos
    function createButton(text, value) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('help-button');
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
            sendMessage(message);
            userInput.value = ''; // Limpiar el campo de entrada
        }
    });

    // Evento para enviar mensaje al presionar Enter en el campo de entrada
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendBtn.click(); // Simular clic en el botón de enviar
        }
    });

    // Mostrar mensaje inicial de bienvenida y menú inicial
	appendMessage('¡Hola! Soy FabianBot, tu Asistente Virtual. Bienvenido al chat bot promocionado por Data Count AI y desarrollado por Fabian Sagua. Mi propósito es guiarte en el fascinante mundo de la ciencia de datos y contabilidad para el sector público en Perú.', 'received');
	appendMessage('No almacenamos tus datos ni se genera una copia de los chats que tienes conmigo, garantizando así tu privacidad. Espero poder proporcionarte información útil y resolver tus consultas.', 'received');
	appendMessage('Por favor, selecciona una opción del menú o escribe tu pregunta para comenzar.', 'received');

});
