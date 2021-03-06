//index.js is primarily used for the quiz, everything in this are for the quiz.
//These scripts are lifted from an open source tutorial
//I will attempt to explain what's going on.
// Functions
function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each subsequent question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            //answers is defined here, and used when creating the questions. 
            //The variable answers is actually an array with each possible answer
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {

                // ...add an HTML radio button
                answers.push(
                    `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults() {

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question akin to a loop
    myQuestions.forEach((currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
        previousButton.style.display = 'none'; //if you are slide 1, it is impossible to go back to the previous slide. So the previousButton will not show up.
    }
    else {
        previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "What is International Humanitarian Law?",
        answers: { //answers to the quiz
            a: "A famous restaurant",
            b: "a set of laws put in place to protect those who aren't fighting",
            c: "a private organization to protect human rights"
        },
        correctAnswer: "b"
    },
    {
        question: "Who do medics in war treat?",
        answers: {
            a: "their own side's soldiers",
            b: "the opposing side's soldiers",
            c: "both sides"
        },
        correctAnswer: "c"
    },
    {
        question: "Where does someone go if they are convicted of a war crime?",
        answers: {
            a: "the timeout corner",
            b: "the International Criminal Court",
            c: "a normal courtroom",
            d: "the War Crime Association"
        },
        correctAnswer: "b"
    },
    {
        question: "If someone finds a civlian in war, do they...",
        answers: {
            a: "take them hostage",
            b: "leave them alone",
            c: "eliminate them"
        },
        correctAnswer: "b"
    },
    {
        question: "How should a prisoner of war be treated?",
        answers: {
            a: "give them food, water, and communication with their family",
            b: "torture them to the brink of death",
            c: "give them a million dollar mansion to roam around in"
        },
        correctAnswer: "b"
    }
];

// Kick things off
buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

