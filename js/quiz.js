const questions = [
  {
    question: "Apa fungsi matahari bagi tumbuhan?",
    answers: [
      { text: "Sumber cahaya", correct: true },
      { text: "Sumber suara", correct: false },
      { text: "Sumber angin", correct: false },
      { text: "Sumber hujan", correct: false },
    ],
  },

  {
    question: "Fotosintesis terjadi pada?",
    answers: [
      { text: "Akar", correct: false },
      { text: "Daun", correct: true },
      { text: "Bunga", correct: false },
      { text: "Buah", correct: false },
    ],
  },

  {
    question: "Warna daun umumnya?",
    answers: [
      { text: "Merah", correct: false },
      { text: "Hijau", correct: true },
      { text: "Hitam", correct: false },
      { text: "Biru", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");

const progressElement = document.getElementById("progress");
const timerElement = document.getElementById("timer");

const quizContainer = document.getElementById("quiz-container");
const startContainer = document.getElementById("start-container");

const studentNameInput = document.getElementById("student-name");
const finalName = document.getElementById("final-name");

const startBtn = document.getElementById("start-btn");

let currentQuestionIndex = 0;
let score = 0;

let timeLeft = 30;
let timer;

let studentName = "";

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

startBtn.addEventListener("click", () => {
  studentName = studentNameInput.value;

  if (studentName === "") {
    alert("Masukkan nama terlebih dahulu");
    return;
  }

  startContainer.style.display = "none";

  quizContainer.style.display = "block";

  shuffleQuestions();

  startQuiz();
});

function startQuiz() {
  currentQuestionIndex = 0;

  score = 0;

  timeLeft = 30;

  startTimer();

  showQuestion();
}

function startTimer() {
  timerElement.innerText = `Waktu: ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;

    timerElement.innerText = `Waktu: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timer);

      showScore();
    }
  }, 1000);
}

function showQuestion() {
  resetState();

  progressElement.innerText = `Soal ${currentQuestionIndex + 1} dari ${questions.length}`;

  let currentQuestion = questions[currentQuestionIndex];

  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.innerText = answer.text;

    button.classList.add("answer-btn");

    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;

  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    score++;
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "green";
    } else {
      button.style.backgroundColor = "red";
    }

    button.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  clearInterval(timer);

  quizContainer.style.display = "none";

  resultContainer.style.display = "block";

  finalName.innerText = `Nama: ${studentName}`;

  scoreElement.innerText = `Skor Anda: ${score} dari ${questions.length}`;
}

function restartQuiz() {
  resultContainer.style.display = "none";

  startContainer.style.display = "block";

  studentNameInput.value = "";
}
