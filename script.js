const questions = [
  {
    question:
      "What year did Nigeria gain independence?",
    correct_answer: "1960",
    incorrect_answers: ["1922", "1980", "1935"],
  },
  {
    question:
      "Who danced like a butterfly and stung like a bee?",
    correct_answer: "Mohammed Ali",
    incorrect_answers: ["Mike Tyson", "Idi Amin", "Evander Hollifield"],
  },
  {
    question: "Where did Corona Virus emanate from?",
    correct_answer: "Wuhan",
    incorrect_answers: ["Beirut", "Kiev", "Shanghai"],
  },
  {
    question: "How many months make a year?",
    correct_answer: " 12 Months",
    incorrect_answers: ["8 months", "14 months", "7 months"],
  },
  {
    question:
      "Who is the co-founder of Start.ng?",
    correct_answer: "Seyi Onifade",
    incorrect_answers: ["Adolphus Chris", "Austin Azoluka", "Abasifreke Ekwere"],
  },
];

let currentIndex = 0;
let numberOfCorrect = 0; 
let questionsLeft = 5; 
let selectedAnswer, correctAnswer, answerElement;
let answered = false;


function displayQuestion(obj, index) {
  let answers = document.getElementById("answers");
  let questionContainer = document.getElementById("Currentquestion");
  answers.innerHTML = "";
  let shuffledAnswers = shuffle(obj, index);
  let answerText = displayAnswers(shuffledAnswers);
  answers.innerHTML = answerText;
  answerText = "";
  questionContainer.textContent = obj[index].question;
}


function shuffle(obj, index) {
  let array = [...obj[index].incorrect_answers, obj[index].correct_answer];
  const length = array.length;
  if (!length) {
    return [];
  }
  let i = -1;
  const lastIndex = length - 1;
  const result = [...array];
  while (++i < length) {
    const rand = i + Math.floor(Math.random() * (lastIndex - i + 1));
    const value = result[rand];
    result[rand] = result[i];
    result[i] = value;
  }
  return result;
}


function getCorrectAnswer(obj, index) {
  return obj[index].correct_answer;
}


function displayAnswers(arr) {
  let answerText = "";
  for (let item of arr) {
    answerText += `<li onclick="getAnswer()">${item}</li>`;
  }
  return answerText;
}


function selectAnswer() {
  let answersArr = [...document.getElementsByTagName("li")];
  for (let item of answersArr) {
    if ([...item.classList].includes("selected")) {
      item.classList.remove("selected");
    }
  }
  event.target.classList.add("selected");
  return event.target;
}


function displayCorrectAnswer(correctAnswer) {
  let answersArr = [...document.getElementsByTagName("li")];
  for (let item of answersArr) {
    if (item.textContent === correctAnswer) {
      item.classList.add("correct");
    }
  }
}


function getAnswer() {
  submitAnswer.classList.remove("disabled");
  answerElement = selectAnswer();
  selectedAnswer = answerElement.textContent;
}


function resetgame() {
  correctDisplay.textContent = numberOfCorrect;
  modal.style.display = "block";
  modalContent.textContent = `Your new score is : ${numberOfCorrect}`;
  currentIndex = 0;
  numberOfCorrect = 0;
  questionsLeft = 5;
  correctDisplay.textContent = numberOfCorrect;
  numOfQuestions.textContent = questionsLeft;
}


let next = document.getElementById("next"); 
let submitAnswer = document.getElementById("submit"); 
let numOfQuestions = document.getElementById("numOfQuestion"); 
let correctDisplay = document.getElementById("counter"); 
let span = document.getElementsByClassName("close")[0]; 
let modal = document.getElementById("myModal"); 
let modalContent = document.getElementById("modalContent"); 
correctAnswer = getCorrectAnswer(questions, currentIndex); 
displayQuestion(questions, currentIndex); 
numOfQuestions.textContent = questionsLeft; 
span.onclick = function () {
modal.style.display = "none";
                }
                
next.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (answered) {
                        questionsLeft--
                        numOfQuestions.textContent = questionsLeft
                        next.classList.add('disabled')
                        submitAnswer.classList.add('disabled')
                        currentIndex++;
                        if (currentIndex >= questions.length) {
                            resetgame()
                        }
                        displayQuestion(questions, currentIndex);
                        correctAnswer = getCorrectAnswer(questions, currentIndex);
                        answered = false;
                    }
        
                })
        
                submitAnswer.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (selectedAnswer) {
                        next.classList.remove('disabled')
                        if (selectedAnswer === correctAnswer) {
                            numberOfCorrect++
                            correctDisplay.textContent = numberOfCorrect;
                        } else {
                            answerElement.classList.add('incorrect')
                        }
                        displayCorrectAnswer(correctAnswer)
                        answered = true;
                        selectedAnswer = false;
                    }
                })
        



