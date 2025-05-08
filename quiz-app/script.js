let questions = [];
let currentAnswers = {};
let timer;
let timeLeft = 60;

// Fetch the questions from the JSON file
fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    displayQuestions();
    startTimer();
  });

// Function to display all questions and options
function displayQuestions() {
  const quizBox = document.getElementById('quiz-box');
  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    q.options.forEach(option => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${index}`;
      input.value = option;

      // Save user's selected answer
      input.addEventListener('change', () => {
        currentAnswers[index] = input.value;
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(optionsDiv);
    quizBox.appendChild(questionDiv);
  });
}

// Submit button click
document.getElementById('submit-btn').addEventListener('click', showResults);

// Timer function
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

// Show quiz results
function showResults() {
  clearInterval(timer);
  let score = 0;
  questions.forEach((q, index) => {
    if (currentAnswers[index] === q.answer) {
      score++;
    }
  });

  const scoreBox = document.getElementById('score-box');
  scoreBox.innerHTML = `You scored ${score} out of ${questions.length}`;
  scoreBox.classList.remove('hidden');

  // Optional: Highlight correct answers
  const allQuestions = document.querySelectorAll('.question');
  allQuestions.forEach((qDiv, index) => {
    const correctAnswer = questions[index].answer;
    const options = qDiv.querySelectorAll('input');
    options.forEach(opt => {
      if (opt.value === correctAnswer) {
        opt.parentElement.style.color = 'green';
      }
      opt.disabled = true;
    });
  });

  document.getElementById('submit-btn').disabled = true;
}
