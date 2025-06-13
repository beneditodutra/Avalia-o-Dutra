const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Belo Horizonte"],
        answer: "Brasília"
    },
    {
        question: "Quanto é 7 x 8?",
        options: ["49", "56", "64", "72"],
        answer: "56"
    },
    {
        question: "Quem descobriu o Brasil?",
        options: ["Cristóvão Colombo", "Pedro Álvares Cabral", "Vasco da Gama", "Fernão de Magalhães"],
        answer: "Pedro Álvares Cabral"
    },
    {
        question: "Qual o maior planeta do sistema solar?",
        options: ["Marte", "Terra", "Júpiter", "Saturno"],
        answer: "Júpiter"
    },
    {
        question: "Qual o elemento químico mais abundante na crosta terrestre?",
        options: ["Ferro", "Oxigênio", "Silício", "Alumínio"],
        answer: "Oxigênio"
    }
];

const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-quiz");

let quizSubmitted = false; // Flag to prevent multiple submissions

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuiz() {
    shuffleArray(questions);
    quizContainer.innerHTML = "";
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="options">
                ${q.options.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label>
                `).join("")}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

function submitQuiz() {
    if (quizSubmitted) return; // Prevent multiple submissions
    quizSubmitted = true;

    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    
    quizContainer.innerHTML = `<p>Prova finalizada! Você acertou ${score} de ${questions.length} perguntas.</p>`;
    submitButton.style.display = "none"; // Hide the submit button
}

submitButton.addEventListener("click", submitQuiz);

// Anti-cheating measures

document.documentElement.requestFullscreen();

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        alert("Você saiu do modo de tela cheia. A prova será finalizada.");
        submitQuiz();
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        alert("Você trocou de aba ou minimizou a janela. A prova será finalizada.");
        submitQuiz();
    }
});

window.addEventListener("blur", () => {
    alert("Você perdeu o foco da janela. A prova será finalizada.");
    submitQuiz();
});

loadQuiz();

