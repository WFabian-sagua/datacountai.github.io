document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    let faq = [];

    // Variable para almacenar el timeout del mensaje de "Escribiendo..."
    let writingMessageTimeout;

    // Definir el key secreto que se espera recibir del usuario
    const key = 'dca301793-24t'; // Reemplaza con tu key secreto

    // Función para enviar mensaje del usuario y recibir respuesta
    function sendMessage(message) {
        // Mostrar mensaje de "Escribiendo..."
        showWritingMessage();

        // Verificar si el mensaje contiene el key y procesar en consecuencia
        if (message.toLowerCase().includes(key)) {
            handleKeyMessage();
        } else {
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
    }

    // Función para manejar el mensaje especial cuando se envía el key
    function handleKeyMessage() {
        // Limpiar el chatBox antes de agregar nuevos elementos
        clearChatBox();

        // Mostrar mensaje específico para el key
		const keyResponse = `¡Bienvenidos, señores de la Municipalidad Provincial de Jorge Basadre - Locumba! Somos Data Count Ai, y estamos aquí para brindarles todo nuestro apoyo y soluciones.<br><br>
		Para acceder a los entregables de los servicios brindados por nuestra empresa, por favor haz clic en el siguiente enlace:<br>
		📁 <a href="https://1drv.ms/f/s!Apyb12AgJeK03QGP4X3wXcjmqZ8K?e=8rU3yw" target="_blank">Repositorio de Entregables</a>.<br><br>
		Para más información o consultas específicas, no duden en contactarnos a través de nuestro correo electrónico: <a href="mailto:info@datacountai.digital">info@datacountai.digital</a>. Estamos aquí para servirles con excelencia y compromiso.`;
		appendMessage(keyResponse, 'received');


        // Detener la simulación de "Escribiendo..."
        hideWritingMessage();
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
        messageElement.innerHTML = message; // Cambiado a innerHTML para permitir HTML
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
        // Limpiar el chatBox antes de agregar nuevos elementos
        clearChatBox();

        // Mostrar el mensaje de disculpa inicial
        const helpMessage = 'Lo siento, mi lógica aún no permite entender ciertas cosas por ahora. Por favor, selecciona una de las siguientes opciones:';
        appendMessage(helpMessage, 'received');

        // Crear el menú de ayuda y agregarlo al chatBox
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
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo automáticamente
    }

    // Función para limpiar el chatBox
    function clearChatBox() {
        while (chatBox.firstChild) {
            chatBox.removeChild(chatBox.firstChild);
        }
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
        // Mostrar el mensaje del usuario
        appendMessage(buttonText, 'sent');

        // Mostrar "Escribiendo..." antes de la respuesta del bot
        showWritingMessage();

        // Ocultar el mensaje de "Escribiendo..." y mostrar la respuesta después de un breve tiempo
        setTimeout(() => {
            hideWritingMessage();
            let response = '';
            switch (buttonText) {
                case '📅 Horario de Atención':
                    response = `Si necesitas contactarnos, estamos disponibles vía <a href="https://api.whatsapp.com/send?phone=51931555720" target="_blank">WhatsApp</a> y por correo electrónico a <a href="mailto:info@datacountai.digital">info@datacountai.digital</a>. El <strong>horario de atención es de Lunes a Viernes de 9am a 7pm.</strong><br><br>Para cualquier contacto fuera de este horario, puedes coordinar y agendar una reunión presencial o virtual según disponibilidad de tiempo por vía WhatsApp y/o correo electrónico. Te responderemos en un tiempo prudente.`;
                    break;
                case '📧 Soporte y Contacto':
					response = 'La opción de Soporte y Contacto está destinada a nuestros clientes actuales para proporcionar asistencia personalizada y acceso a material exclusivo.<br><br>';
					response += 'Si eres cliente nuevo, te recomendamos explorar nuestras opciones de servicios y otras funcionalidades disponibles para entender cómo podemos ayudarte mejor. Si ya eres cliente y tienes tu Key, por favor ingrésalo a continuación para acceder al material exclusivo.';
					break;
                case 'ℹ️ Data Count Ai':
                    response = `¡Hola! En Data Count Ai, no solo ofrecemos servicios contables y de ciencia de datos. Nos dedicamos apasionadamente a transformar la gestión pública en Perú, ayudando a entidades públicas, auditores, periodistas y profesionales independientes a utilizar datos precisos y tecnología innovadora. Simplificamos procesos y facilitamos la toma de decisiones estratégicas y transparentes.<br><br>Te invitamos a explorar otras opciones del menú para descubrir más sobre nuestros servicios y cómo podemos ayudarte. ¡Estamos aquí para brindarte la mejor asistencia posible!`;
                    break;
                case 'Nuestro Propósito':
                    response = 'Impulsamos la ciencia de datos para automatizar procesos presupuestales y financieros en el Perú. Contribuimos con innovación y promovemos un cambio significativo en la gestión pública.';
                    break;
                case '🔧 Automatización de Reportes':
                    response = 'Ofrecemos servicios como automatización de reportes: Utilizando herramientas como Power BI y Python, gestión de inventarios y activos para entidades gubernamentales, y soporte técnico para aplicativos estatales como SIAF y SIGA.';
                    break;
                case '🗂️ Inventarios y Gestión de Bienes':
                    response = 'Nos especializamos en la gestión de inventarios para entidades gubernamentales en Perú. También ofrecemos soluciones de software para facilitar el seguimiento de activos.';
                    break;
                case '💼 Soporte SIAF - SIGA':
                    response = 'Brindamos asistencia técnica y normativa para aplicativos estatales como SIAF y SIGA.';
                    break;
                case '📈 Transición de NICSP':
                    response = 'La transición a las Normas Internacionales de Contabilidad del Sector Público (NICSP) es crucial para mejorar la transparencia y eficiencia en la gestión de recursos del sector público en Perú. Aquí te dejo una explicación más detallada:'
                        + '<br><br>'
                        + '<b>Directiva General:</b> La directiva establece lineamientos generales para la transición al marco NICSP, facilitando la generación de información financiera y presupuestaria que ayuda en la rendición de cuentas y toma de decisiones.'
                        + '<br><br>'
                        + '<b>Marco NICSP:</b> Desde el 1 de enero de 2024, todas las entidades del sector público deben preparar su información financiera según las NICSP de acumulación (o devengo), basadas en la edición 2022 del marco conceptual.'
                        + '<br><br>'
                        + '<b>Transición al Marco NICSP:</b>'
                        + '<ul>'
                        + '<li>La transición permite a las entidades aplicar exenciones para adoptar el marco NICSP por primera vez, conforme a la NICSP 33.</li>'
                        + '<li>El periodo de transición comienza el 1 de enero de 2024 y dura un máximo de tres años.</li>'
                        + '<li>Durante este periodo, las entidades deben seguir un instructivo para planificar, ejecutar y culminar la transición.</li>'
                        + '<li>Las entidades deben preparar un diagnóstico de brechas contables y presentar informes financieros y presupuestarios periódicos a la DGCP.</li>'
                        + '</ul>'
                        + '<b>Obligaciones y Responsabilidades:</b>'
                        + '<ul>'
                        + '<li>El titular de cada entidad es responsable de la transición.</li>'
                        + '<li>Las áreas competentes deben proporcionar información económica relevante.</li>'
                        + '<li>Las jefaturas de contabilidad deben ejecutar el proceso contable.</li>'
                        + '</ul>'
                        + '<b>Disposiciones Complementarias:</b>'
                        + '<ul>'
                        + '<li>La DGCP puede solicitar información adicional en cualquier momento.</li>'
                        + '<li>Se pueden implementar adecuaciones informáticas progresivamente según sea necesario.</li>'
                        + '</ul>'
                        + 'Espero esta explicación te sea útil. Próximamente, podré responder preguntas sobre cualquier tema contable, técnico y normativo de la gestión pública. ¡Estamos aquí para ayudarte!';
                    break;
                case '📑 EF4':
                    response = 'Actualmente estamos desarrollando el reporte EF4 para optimizar la gestión financiera en el sector público. Estará disponible próximamente para su uso.';
                    break;
                case '🎮 Trivia Contable':
				response = `¡Bienvenido/a al juego "Trivia Contable" de Data Count Ai! Esta amenidad está diseñada para promover el aprendizaje interactivo en temas contables, específicamente enfocado en las Normas Internacionales de Contabilidad del Sector Público (NICSP). En su versión inicial, cubrimos el marco conceptual y el prólogo a las NICSP.<br><br>
				Nuestro juego está en constante actualización y transformación para asegurarnos de que sea accesible y divertido, al mismo tiempo que educativo. Estamos comprometidos a proporcionar contenido que sea comprensible tanto para contadores experimentados como para aquellos que están comenzando en este campo.<br><br>
				Adelantamos que próximamente lanzaremos un juego de casos prácticos basados en NICSP, diseñado para brindar un mayor expertise a los contadores en el ámbito de la contabilidad pública.<br><br>
				¿Estás listo/a para poner a prueba tus conocimientos contables? ¡Diviértete y aprende con nuestra Trivia Contable!<br><br>
				Accede al juego aquí: <a href="https://datacountai.digital" target="_blank">Trivia Contable</a>`;
					break;

            }
            appendMessage(response, 'received');
        }, 1000); // Tiempo de espera antes de mostrar la respuesta
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
    appendMessage('No almacenamos tus datos ni se genera una copia de los chats que tienes conmigo, garantizando así tu privacidad. Espero poder proporcionarte información útil y resolver tus consultas.', 'received');
    appendMessage('Por favor, selecciona una opción del menú o escribe tu pregunta para comenzar.', 'received');
});
