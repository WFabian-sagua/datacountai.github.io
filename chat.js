document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    let faq = [];
    let writingMessageTimeout;
    const key = 'dca301793-24t'; // Reemplaza con tu key secreto
    let fuse; // Variable para Fuse.js

    // Cargar el archivo JSON con las preguntas y respuestas
    fetch('faq.json')
        .then(response => response.json())
        .then(data => {
            faq = data;
            // Inicializar Fuse.js con las preguntas frecuentes
            fuse = new Fuse(faq, {
                keys: ['question'],
                threshold: 0.4 // Ajusta el umbral de coincidencia según sea necesario
            });
        })
        .catch(error => console.error('Error cargando el FAQ:', error));

    function sendMessage(message) {
        showWritingMessage();

        if (message.toLowerCase().includes(key)) {
            handleKeyMessage();
        } else if (message.toLowerCase().includes('ayuda') || message.toLowerCase().includes('menú')) {
            showHelpMenu();
        } else {
            setTimeout(() => {
                hideWritingMessage();
                const answer = findAnswer(message);
                if (answer === '') {
                    showDefaultResponse();
                } else {
                    showTypingEffect(answer);
                }
            }, 1000);
        }
    }

    function handleKeyMessage() {
        clearChatBox();
        const keyResponse = `¡Bienvenidos, señores de la Municipalidad Provincial de Jorge Basadre - Locumba! Somos Data Count Ai, y estamos aquí para brindarles todo nuestro apoyo y soluciones.<br><br>
        Para acceder a los entregables de los servicios brindados por nuestra empresa, por favor haz clic en el siguiente enlace:<br>
        📁 <a href="https://1drv.ms/f/s!Apyb12AgJeK03QGP4X3wXcjmqZ8K?e=8rU3yw" target="_blank">Repositorio de Entregables</a>.<br><br>
        Para más información o consultas específicas, no duden en contactarnos a través de nuestro correo electrónico: <a href="mailto:info@datacountai.digital">info@datacountai.digital</a>. Estamos aquí para servirles con excelencia y compromiso.`;
        showTypingEffect(keyResponse);
    }

    function findAnswer(question) {
        if (!fuse) return ''; // Asegúrate de que Fuse.js esté inicializado

        const results = fuse.search(question);
        return results.length > 0 ? results[0].item.answer : '';
    }

    function showTypingEffect(message) {
		hideWritingMessage(); // Asegúrate de que el mensaje de "escribiendo" se oculte

		const typingDelay = 5; // Milisegundos por carácter
		let index = 0;

		const typingMessage = document.createElement('div');
		typingMessage.classList.add('message', 'received', 'typing');
		chatBox.appendChild(typingMessage);
		chatBox.scrollTop = chatBox.scrollHeight;

		function typeCharacter() {
			if (index < message.length) {
				typingMessage.innerHTML += message.charAt(index); // Usa innerHTML para interpretar HTML
				index++;
				setTimeout(typeCharacter, typingDelay);
			} else {
				typingMessage.classList.remove('typing');
				hideWritingMessage(); // Asegúrate de ocultar el mensaje de "escribiendo" después de completar la escritura
			}
		}

		typeCharacter();
	}


    function appendMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type === 'sent' ? 'sent' : 'received');
        messageElement.innerHTML = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showWritingMessage() {
        writingMessageTimeout = setTimeout(() => {
            const writingMessage = document.createElement('div');
            writingMessage.classList.add('message', 'received', 'writing');
            writingMessage.textContent = 'Escribiendo...';
            chatBox.appendChild(writingMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
    }

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

    function showHelpMenu() {
        hideWritingMessage();
        
        clearChatBox();
        const helpMessage = 'Por favor, selecciona una de las siguientes opciones:';
        appendMessage(helpMessage, 'received');

        const helpMenu = document.createElement('div');
        helpMenu.classList.add('help-menu');

        const categories = [
            { name: 'INFORMACION GENERAL', buttons: ['ℹ️ Data Count Ai', '📅 Horario de Atención', '📧 Soporte y Contacto'] },
            { name: 'SERVICIOS', buttons: ['🔧 Automatización de Reportes', '🗂️ Inventarios y Gestión de Bienes', '💼 Soporte SIAF - SIGA'] },
            { name: 'CONTABILIDAD', buttons: ['📈 Transición de NICSP'] },
            { name: 'REPORTES', buttons: ['📑 EF4'] },
            { name: 'JUEGOS', buttons: ['🎮 Trivia Contable'] }
        ];

        categories.forEach(category => {
            const categoryWrapper = document.createElement('div');
            categoryWrapper.classList.add('category');

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
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showDefaultResponse() {
        const defaultResponse = 'Lo siento, no entiendo esta pregunta por ahora. Por favor, escribe "ayuda" o "menú" para ver las opciones disponibles.';
        showTypingEffect(defaultResponse);
    }

    function clearChatBox() {
        while (chatBox.firstChild) {
            chatBox.removeChild(chatBox.firstChild);
        }
    }

    function createButton(text) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('help-menu-btn');
        return button;
    }

    function handleButtonClick(buttonText) {
        appendMessage(buttonText, 'sent');
        showWritingMessage();

        setTimeout(() => {
            hideWritingMessage();
            let response = '';
            switch (buttonText) {
                case '📅 Horario de Atención':
                    response = `Si necesitas contactarnos, estamos disponibles vía WhatsApp al número 931555720 y por correo electrónico a info@datacountai.digital. El horario de atención es de Lunes a Viernes de 9am a 7pm. Para cualquier contacto fuera de este horario, puedes coordinar y agendar una reunión presencial o virtual según disponibilidad de tiempo por vía WhatsApp y/o correo electrónico. Te responderemos en un tiempo prudente.`;
                    break;
                case '📧 Soporte y Contacto':
                    response = 'La opción de Soporte y Contacto está destinada a nuestros clientes actuales para proporcionar asistencia personalizada y acceso a material exclusivo.';
                    response += 'Si eres cliente nuevo, te recomendamos explorar nuestras opciones de servicios y otras funcionalidades disponibles para entender cómo podemos ayudarte mejor. Si ya eres cliente y tienes tu Key, por favor ingrésalo a continuación para acceder al material exclusivo.';
                    break;
                case 'ℹ️ Data Count Ai':
                    response = `Data Count Ai, no solo ofrece servicios contables y de ciencia de datos. Se dedican apasionadamente a transformar la gestión pública en Perú, ayudando a entidades públicas, auditores, periodistas y profesionales independientes a utilizar datos precisos y tecnología innovadora. Simplificamos procesos y facilitamos la toma de decisiones estratégicas y transparentes.<br><br>Te invitamos a conocer más sobre nuestros servicios y explorar cómo podemos apoyarte en tu camino hacia una gestión pública más eficiente y eficaz.`;
                    break;
                case '🔧 Automatización de Reportes':
                    response = `La automatización de reportes permite optimizar el proceso de generación y distribución de informes. Utilizamos tecnologías avanzadas para integrar datos, aplicar algoritmos complejos y generar informes precisos y actualizados automáticamente.<br><br>Beneficios:<br>• Reducción de errores humanos<br>• Ahorro de tiempo<br>• Mejora en la calidad de la información<br>• Entrega oportuna y precisa`;
                    break;
                case '🗂️ Inventarios y Gestión de Bienes':
                    response = `Ofrecemos soluciones para la gestión eficiente de inventarios y bienes. Nuestra tecnología permite un seguimiento detallado, control de activos y generación de informes precisos para una mejor administración.<br><br>Beneficios:<br>• Monitoreo en tiempo real<br>• Reducción de pérdidas<br>• Mejora en la toma de decisiones<br>• Optimización de recursos`;
                    break;
                case '💼 Soporte SIAF - SIGA':
                    response = `Brindamos soporte especializado para los sistemas SIAF (Sistema Integrado de Administración Financiera) y SIGA (Sistema Integrado de Gestión Administrativa). Nuestra experiencia garantiza un uso eficiente y resolución de problemas específicos de estos sistemas.<br><br>Beneficios:<br>• Resolución de incidencias técnicas<br>• Capacitación personalizada<br>• Asesoría en la implementación de procesos`;
                    break;
                case '📈 Transición de NICSP':
                    response = `Estamos aquí para ayudarte en la transición a las Normas Internacionales de Contabilidad para el Sector Público (NICSP). Nuestro enfoque es apoyar a las entidades en la adaptación a estos estándares, asegurando un proceso fluido y eficiente.<br><br>Beneficios:<br>• Asesoría en la implementación<br>• Capacitación y formación<br>• Adaptación a nuevos requerimientos y prácticas contables`;
                    break;
                case '📑 EF4':
                    response = `La opción EF4 se refiere a un formato específico de reporte que hemos diseñado para facilitar el cumplimiento de requisitos contables y auditoría. Este reporte incluye datos clave y métricas relevantes para el análisis y evaluación de la información.<br><br>Beneficios:<br>• Simplificación del cumplimiento normativo<br>• Claridad en la presentación de datos<br>• Facilita el proceso de auditoría y revisión`;
                    break;
                case '🎮 Trivia Contable':
                    response = `¡Diviértete y aprende con nuestra trivia contable! Responde preguntas relacionadas con contabilidad y finanzas para poner a prueba tus conocimientos.<br><br>Participa y desafía a tus amigos. ¡La contabilidad nunca fue tan entretenida!`;
                    break;
				default:
                    response = 'Opción no reconocida. Por favor, elige una opción válida del menú.';
                    break;
            }

            showTypingEffect(response);
        }, 1000);
    }

    sendBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage(message, 'sent');
            userInput.value = '';
            sendMessage(message);
        }
    });

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const message = userInput.value.trim();
            if (message) {
                appendMessage(message, 'sent');
                userInput.value = '';
                sendMessage(message);
            }
        }
    });
});

