const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("ans-container");
const currentQuestionSpan = document.getElementById("curr-ques");
const totalQuestionsSpan = document.getElementById("total-ques");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("res-score");
const maxScoreSpan = document.getElementById("totalscore");
const resultMessage = document.getElementById("message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "Which keyword is used to create a class in Java?",
    answers: [
      { text: "class", correct: true },
      { text: "ClassName", correct: false },
      { text: "define", correct: false },
      { text: "object", correct: false },
    ],
  },
  {
    question: "Which of the following is not a Java primitive type?",
    answers: [
      { text: "int", correct: false },
      { text: "float", correct: false },
      { text: "String", correct: true },
      { text: "double", correct: false },
    ],
  },
  {
    question: "What is the size of an int data type in Java?",
    answers: [
      { text: "8 bits", correct: false },
      { text: "16 bits", correct: false },
      { text: "32 bits", correct: true },
      { text: "64 bits", correct: false },
    ],
  },
  {
    question: "Which method is the entry point of a Java program?",
    answers: [
      { text: "start()", correct: false },
      { text: "main()", correct: true },
      { text: "run()", correct: false },
      { text: "execute()", correct: false },
    ],
  },
  {
    question: "Which of the following is used to inherit a class in Java?",
    answers: [
      { text: "inherits", correct: false },
      { text: "extends", correct: true },
      { text: "implements", correct: false },
      { text: "super", correct: false },
    ],
  },
  {
    question: "What is the default value of a boolean variable in Java?",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "0", correct: false },
      { text: "null", correct: false },
    ],
  },
  {
    question: "Which of the following is not a Java access modifier?",
    answers: [
      { text: "private", correct: false },
      { text: "protected", correct: false },
      { text: "public", correct: false },
      { text: "friendly", correct: true },
    ],
  },
  {
    question: "Which exception is thrown when dividing by zero in Java?",
    answers: [
      { text: "IOException", correct: false },
      { text: "NullPointerException", correct: false },
      { text: "ArithmeticException", correct: true },
      { text: "IndexOutOfBoundsException", correct: false },
    ],
  },
  {
    question: "Which of the following is a valid declaration of a Java array?",
    answers: [
      { text: "int[] arr = new int(5);", correct: false },
      { text: "int arr[] = new int[5];", correct: true },
      { text: "array arr = new array[5];", correct: false },
      { text: "int arr = int[5];", correct: false },
    ],
  },
  {
    question: "Which of these is not part of Java's OOP features?",
    answers: [
      { text: "Encapsulation", correct: false },
      { text: "Abstraction", correct: false },
      { text: "Polymorphism", correct: false },
      { text: "Compilation", correct: true },
    ],
  },
];

let currentQuestionIndex=0;
let score=0;
let answersDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// startButton.addEventListener('click',startQuiz);
startButton.addEventListener('click', () => {
  const ready = prompt("Are you ready? yes or no only").toLowerCase();

  if (ready === "yes") {
    startQuiz();
  } else {
    alert("Please come back when you are ready!");
  }
});


function startQuiz() {
  // reset vars
  
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
  
}
function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex  / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("ans-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;
    answersContainer.appendChild(button);

    button.addEventListener("click", selectAnswer);

    
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

 if (percentage === 100) {
  resultMessage.textContent = "Perfect score! Well done!";
} else if (percentage >= 80) {
  resultMessage.textContent = "Great job! You did very well.";
} else if (percentage >= 60) {
  resultMessage.textContent = "Good effort! Keep practicing.";
} else if (percentage >= 40) {
  resultMessage.textContent = "Not bad! Try again to improve.";
} else {
  resultMessage.textContent = "Keep trying! You’ll get better.";
}

}


restartButton.addEventListener("click",()=>{
    console.log("resart-quiz");
     resultScreen.classList.remove("active");

  startQuiz();
});