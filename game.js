const questions = {
    basico: [
        {
            question: "¿Cuál es el objetivo principal de la Directiva N° 001-2024-EF/51.01?",
            answers: [
                "Establecer lineamientos generales para la transición al Marco NICSP",
                "Desarrollar nuevas políticas fiscales",
                "Incrementar la eficiencia en la recaudación de impuestos",
                "Mejorar las relaciones laborales en el sector público"
            ],
            correct: "Establecer lineamientos generales para la transición al Marco NICSP"
        },
        {
            question: "¿A partir de qué fecha es aplicable el Marco NICSP?",
            answers: [
                "1 de enero de 2024",
                "1 de enero de 2023",
                "1 de julio de 2024",
                "1 de julio de 2023"
            ],
            correct: "1 de enero de 2024"
        },
        {
            question: "¿Cuál es el tiempo máximo permitido para el periodo de transición al Marco NICSP?",
            answers: [
                "3 años",
                "2 años",
                "4 años",
                "5 años"
            ],
            correct: "3 años"
        },
        {
            question: "¿Quién tiene la responsabilidad principal de la transición al Marco NICSP en una entidad adoptante?",
            answers: [
                "El titular de la entidad adoptante",
                "El jefe de contabilidad",
                "El director de finanzas",
                "El auditor interno"
            ],
            correct: "El titular de la entidad adoptante"
        },
        {
            question: "¿Qué deben preparar las entidades adoptantes sin excepción durante la transición al Marco NICSP?",
            answers: [
                "Un diagnóstico de brechas contables",
                "Un informe de sostenibilidad",
                "Un análisis de riesgo",
                "Un plan de inversión"
            ],
            correct: "Un diagnóstico de brechas contables"
        }
    ],
    intermedio: [
        {
            question: "¿En qué año fueron emitidos los Capítulos 1 a 4 del Marco Conceptual?",
            answers: [
                "2013",
                "2014",
                "2012",
                "2015"
            ],
            correct: "2013"
        },
        {
            question: "¿Cuál es el objetivo principal de la mayoría de las entidades del sector público?",
            answers: [
                "Prestar servicios al público",
                "Generar beneficios económicos",
                "Aumentar la eficiencia operativa",
                "Reducir los costos de operación"
            ],
            correct: "Prestar servicios al público"
        },
        {
            question: "¿Qué tipo de transacciones son comunes en el sector público según el Marco Conceptual?",
            answers: [
                "Transacciones sin contraprestación",
                "Transacciones comerciales",
                "Transacciones financieras",
                "Transacciones de inversión"
            ],
            correct: "Transacciones sin contraprestación"
        },
        {
            question: "¿Cuál es la razón principal para mantener propiedades, planta y equipo en el sector público?",
            answers: [
                "Por su potencial de servicio",
                "Por su capacidad de generar ingresos",
                "Por su valor de reventa",
                "Por su valor histórico"
            ],
            correct: "Por su potencial de servicio"
        },
        {
            question: "¿Qué respaldo es esencial para la preparación de los estados financieros en el sector público?",
            answers: [
                "El principio de negocio en marcha",
                "El principio de prudencia",
                "El principio de devengo",
                "El principio de materialidad"
            ],
            correct: "El principio de negocio en marcha"
        }
    ],
    avanzado: [
        {
            question: "¿Qué capítulo del Marco Conceptual destaca la importancia del presupuesto aprobado?",
            answers: [
                "Capítulo 2",
                "Capítulo 5",
                "Capítulo 7",
                "Capítulo 3"
            ],
            correct: "Capítulo 2"
        },
        {
            question: "¿Qué incluye el Marco Conceptual además de las NICSP y Guías de Prácticas Recomendadas?",
            answers: [
                "Informes Financieros con Propósito General",
                "Normas Internacionales de Auditoría",
                "Normas Internacionales de Información Financiera",
                "Normas de Gobernanza Corporativa"
            ],
            correct: "Informes Financieros con Propósito General"
        },
        {
            question: "¿Qué se destaca en las características del sector público en el Marco Conceptual?",
            answers: [
                "El volumen e importancia financiera de las transacciones sin contraprestación",
                "La eficiencia en la generación de ingresos",
                "La capacidad para atraer inversión extranjera",
                "El desarrollo de nuevas tecnologías"
            ],
            correct: "El volumen e importancia financiera de las transacciones sin contraprestación"
        },
        {
            question: "¿Por qué los compromisos de prestación de servicios pueden no reconocerse en los estados financieros?",
            answers: [
                "Porque no cumplen con las definiciones de un pasivo y un activo",
                "Porque son irrelevantes para los usuarios de la información financiera",
                "Porque siempre son a corto plazo",
                "Porque no afectan la situación financiera de la entidad"
            ],
            correct: "Porque no cumplen con las definiciones de un pasivo y un activo"
        },
        {
            question: "¿Qué tipo de activos pueden tener los gobiernos que no se mantienen generalmente para la venta?",
            answers: [
                "Tesoros de arte y edificios históricos",
                "Inversiones en bolsa",
                "Propiedades comerciales",
                "Reservas de efectivo"
            ],
            correct: "Tesoros de arte y edificios históricos"
        }
    ]
};

let currentLevel = 'basico';
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtons = Array.from(document.getElementsByClassName('answer'));
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const levelIndicator = document.getElementById('level-indicator');
const scoreElement = document.getElementById('score');

function setLevel(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;
    updateLevelIndicator();
    updateScore();
    showQuestion();
}

function updateLevelIndicator() {
    levelIndicator.innerText = `Nivel: ${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}`;
}

function updateScore() {
    scoreElement.innerText = `Puntaje: ${score}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    resultElement.classList.add('hidden');
    nextButton.classList.add('hidden');

    const questionSet = questions[currentLevel];
    if (currentQuestionIndex >= questionSet.length) {
        evaluateLevel();
        return;
    }

    const questionData = questionSet[currentQuestionIndex];
    questionElement.innerText = questionData.question;

    let answers = [...questionData.answers];
    shuffleArray(answers);
    answerButtons.forEach((button, index) => {
        button.innerText = answers[index];
        button.onclick = () => selectAnswer(answers[index] === questionData.correct, button, questionData.correct);
    });
}

function selectAnswer(isCorrect, selectedButton, correctAnswer) {
    if (isCorrect) {
        score++;
        document.body.style.backgroundColor = 'green';
    } else {
        document.body.style.backgroundColor = 'red';
    }
    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, 500);

    answerButtons.forEach(button => {
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
        } else if (button === selectedButton) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    resultElement.innerText = isCorrect ? 'Correcto!' : 'Incorrecto!';
    resultElement.classList.remove('hidden');
    nextButton.classList.remove('hidden');
    updateScore();
}

function nextQuestion() {
    currentQuestionIndex++;
    answerButtons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
    });
    showQuestion();
}

function evaluateLevel() {
    const totalQuestions = questions[currentLevel].length;
    const correctPercentage = (score / totalQuestions) * 100;

    if (correctPercentage >= 70) {
        if (currentLevel === 'basico') {
            setLevel('intermedio');
        } else if (currentLevel === 'intermedio') {
            setLevel('avanzado');
        } else {
            resultElement.innerText = `¡Felicidades! Has completado todos los niveles con éxito. Tu puntuación final es ${score}/${totalQuestions}.`;
        }
    } else {
        resultElement.innerText = `No has logrado el porcentaje requerido para pasar al siguiente nivel. Tu puntuación final es ${score}/${totalQuestions}. Debes volver a jugar este nivel hasta completar un mínimo del 70% de respuestas correctas.`;
        setLevel(currentLevel);
    }

    resultElement.classList.remove('hidden');
    nextButton.classList.add('hidden');
}

nextButton.addEventListener('click', nextQuestion);

setLevel('basico');
